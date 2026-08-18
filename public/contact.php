<?php
/**
 * Contact form -> Resend bridge.
 *
 * The site is a Next.js static export, so there is no Node server to run an API
 * route on. This PHP endpoint ships in the export and runs on the cPanel host.
 *
 * Configuration: copy contact-config.example.php to contact-config.php and fill
 * it in (that file is gitignored). Environment variables are used as a fallback.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');

$config = [];
$configFile = __DIR__ . '/contact-config.php';
if (is_readable($configFile)) {
  $loaded = require $configFile;
  if (is_array($loaded)) {
    $config = $loaded;
  }
}

function config_value(array $config, string $key, string $default = ''): string {
  if (!empty($config[$key])) {
    return (string)$config[$key];
  }
  $fromEnv = getenv($key);
  if ($fromEnv !== false && $fromEnv !== '') {
    return (string)$fromEnv;
  }
  if (!empty($_SERVER[$key])) {
    return (string)$_SERVER[$key];
  }
  return $default;
}

$allowedOrigins = isset($config['ALLOWED_ORIGINS']) && is_array($config['ALLOWED_ORIGINS'])
  ? $config['ALLOWED_ORIGINS']
  : ['https://orbitwelve.com', 'https://www.orbitwelve.com'];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && in_array($origin, $allowedOrigins, true)) {
  header('Access-Control-Allow-Origin: ' . $origin);
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

$apiKey = config_value($config, 'RESEND_API_KEY');

/**
 * Transport: 'resend' calls the Resend HTTP API, 'php' hands the message to the
 * server's own mail server via mail(). Left unset, we use Resend when a key is
 * present and fall back to PHP mail otherwise.
 */
$transport = strtolower(config_value($config, 'MAIL_TRANSPORT', ''));
if ($transport !== 'resend' && $transport !== 'php') {
  $transport = $apiKey !== '' ? 'resend' : 'php';
}

if ($transport === 'resend') {
  if ($apiKey === '') {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Email service is not configured.']);
    exit;
  }
  if (!function_exists('curl_init')) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'cURL extension is not enabled on server']);
    exit;
  }
} elseif (!function_exists('mail')) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Email is not available on this server.']);
  exit;
}

$mailFrom = config_value($config, 'CONTACT_EMAIL_FROM', 'Orbitwelve <content@orbitwelve.com>');
$mailTo = config_value($config, 'CONTACT_EMAIL_TO', 'contact@orbitwelve.com');
$recipients = array_values(array_filter(array_map('trim', explode(',', $mailTo))));

if (!$recipients) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Email service is not configured.']);
  exit;
}

// Basic per-IP throttle so the endpoint cannot be used as a mail cannon.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$throttleFile = sys_get_temp_dir() . '/ow-contact-' . sha1($ip) . '.txt';
$windowSeconds = 600;
$maxPerWindow = 5;
$hits = [];
if (is_readable($throttleFile)) {
  $decoded = json_decode((string)file_get_contents($throttleFile), true);
  if (is_array($decoded)) {
    $hits = $decoded;
  }
}
$now = time();
$hits = array_values(array_filter($hits, static fn($t) => is_int($t) && $t > $now - $windowSeconds));
if (count($hits) >= $maxPerWindow) {
  http_response_code(429);
  echo json_encode(['ok' => false, 'error' => 'Too many messages. Please try again later.']);
  exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
  exit;
}

// Strip newlines from single-line fields so they cannot smuggle content into
// the subject line.
function clean_line($value): string {
  return trim(str_replace(["\r", "\n"], ' ', (string)$value));
}

/** Pull the bare address out of `Name <a@b.com>`, or return it as-is. */
function extract_address(string $value): string {
  if (preg_match('/<([^>]+)>/', $value, $m)) {
    $value = $m[1];
  }
  $value = trim($value);
  return filter_var($value, FILTER_VALIDATE_EMAIL) ? $value : '';
}

/** RFC 2047 encode a header value when it contains non-ASCII characters. */
function encode_header(string $value): string {
  if (preg_match('/[^\x20-\x7E]/', $value)) {
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
  }
  return $value;
}

$name = clean_line($data['name'] ?? '');
$email = clean_line($data['email'] ?? '');
$phone = clean_line($data['phone'] ?? '');
$service = clean_line($data['service'] ?? '');
$message = trim((string)($data['message'] ?? ''));
$honeypot = trim((string)($data['company'] ?? ''));

// Bots fill in every field, including the hidden one. Pretend it worked.
if ($honeypot !== '') {
  echo json_encode(['ok' => true]);
  exit;
}

if ($name === '' || $email === '' || $phone === '' || $service === '' || $message === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Please fill in all fields.']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Please enter a valid email address.']);
  exit;
}

if (mb_strlen($name) > 120 || mb_strlen($phone) > 40 || mb_strlen($service) > 120 || mb_strlen($message) > 5000) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'One of the fields is too long.']);
  exit;
}

$subject = 'New inquiry from ' . $name . ' (' . $service . ')';
$text = "Name: {$name}\nEmail: {$email}\nPhone: {$phone}\nService: {$service}\n\nMessage:\n{$message}";

$e = static fn(string $v): string => htmlspecialchars($v, ENT_QUOTES, 'UTF-8');
$html = '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#111">'
  . '<h2 style="margin:0 0 16px;color:#1098D5">New contact form submission</h2>'
  . '<p style="margin:4px 0"><strong>Name:</strong> ' . $e($name) . '</p>'
  . '<p style="margin:4px 0"><strong>Email:</strong> <a href="mailto:' . $e($email) . '">' . $e($email) . '</a></p>'
  . '<p style="margin:4px 0"><strong>Phone:</strong> ' . $e($phone) . '</p>'
  . '<p style="margin:4px 0"><strong>Service:</strong> ' . $e($service) . '</p>'
  . '<p style="margin:16px 0 4px"><strong>Message:</strong></p>'
  . '<p style="margin:0;white-space:pre-wrap">' . nl2br($e($message)) . '</p>'
  . '</div>';

if ($transport === 'resend') {
  $payload = [
    'from' => $mailFrom,
    'to' => $recipients,
    'reply_to' => $email,
    'subject' => $subject,
    'text' => $text,
    'html' => $html,
  ];

  $ch = curl_init('https://api.resend.com/emails');
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_TIMEOUT, 15);
  curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json',
  ]);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

  $response = curl_exec($ch);
  $errno = curl_errno($ch);
  $curlError = curl_error($ch);
  $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);

  if ($errno) {
    error_log('[contact.php] cURL error: ' . $curlError);
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Failed to send. Please try again.']);
    exit;
  }

  if ($httpCode < 200 || $httpCode >= 300) {
    error_log('[contact.php] Resend HTTP ' . $httpCode . ': ' . (string)$response);
    $decoded = json_decode((string)$response, true);
    $errMsg = 'Failed to send. Please try again.';
    if (is_array($decoded)) {
      if (isset($decoded['message'])) {
        $errMsg = (string)$decoded['message'];
      } elseif (isset($decoded['error']['message'])) {
        $errMsg = (string)$decoded['error']['message'];
      }
    }
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => $errMsg]);
    exit;
  }
} else {
  // Hand the message to the server's own mail server. Because the destination
  // mailbox lives on this same cPanel account, this is a local delivery and
  // never leaves the box.
  $envelope = extract_address($mailFrom);
  if ($envelope === '') {
    error_log('[contact.php] CONTACT_EMAIL_FROM is not a usable address: ' . $mailFrom);
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Email service is not configured.']);
    exit;
  }

  $boundary = 'ow-' . bin2hex(random_bytes(12));

  $headers = implode("\r\n", [
    'From: ' . $mailFrom,
    'Reply-To: ' . encode_header(str_replace(['<', '>', ',', ';'], ' ', $name)) . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
    'X-Mailer: Orbitwelve contact form',
  ]);

  $body = "--{$boundary}\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\n"
    . "Content-Transfer-Encoding: 8bit\r\n\r\n"
    . preg_replace('/\R/u', "\r\n", $text) . "\r\n\r\n"
    . "--{$boundary}\r\n"
    . "Content-Type: text/html; charset=UTF-8\r\n"
    . "Content-Transfer-Encoding: 8bit\r\n\r\n"
    . $html . "\r\n\r\n"
    . "--{$boundary}--\r\n";

  // -f sets the envelope sender so the message passes SPF. Some hosts disable
  // the parameter, so retry without it rather than failing outright.
  $sent = @mail(implode(', ', $recipients), encode_header($subject), $body, $headers, '-f' . $envelope);
  if (!$sent) {
    $sent = @mail(implode(', ', $recipients), encode_header($subject), $body, $headers);
  }

  if (!$sent) {
    error_log('[contact.php] mail() returned false for ' . implode(', ', $recipients));
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Failed to send. Please try again.']);
    exit;
  }
}

$hits[] = $now;
@file_put_contents($throttleFile, json_encode($hits), LOCK_EX);

echo json_encode(['ok' => true]);
