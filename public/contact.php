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
$smtpHost = config_value($config, 'SMTP_HOST');

$transport = strtolower(config_value($config, 'MAIL_TRANSPORT', ''));
if (!in_array($transport, ['resend', 'smtp', 'php'], true)) {
  if ($apiKey !== '') {
    $transport = 'resend';
  } elseif ($smtpHost !== '') {
    $transport = 'smtp';
  } else {
    $transport = 'php';
  }
}

// Many shared hosts disable mail() outright. Fall back to SMTP rather than
// failing, when SMTP is configured.
if ($transport === 'php' && !function_exists('mail') && $smtpHost !== '') {
  $transport = 'smtp';
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
} elseif ($transport === 'smtp') {
  if ($smtpHost === '') {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Email service is not configured.']);
    exit;
  }
} elseif (!function_exists('mail')) {
  error_log('[contact.php] mail() is disabled on this server and no SMTP_HOST is configured.');
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

/** Character length that does not require the optional mbstring extension. */
function text_len(string $v): int {
  return function_exists('mb_strlen') ? mb_strlen($v) : strlen($v);
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

/** Read one SMTP reply, following multi-line continuations. */
function smtp_read($socket): string {
  $reply = '';
  while (($line = fgets($socket, 1024)) !== false) {
    $reply .= $line;
    // A final line has a space in position 4; continuations have a hyphen.
    if (strlen($line) < 4 || $line[3] === ' ') {
      break;
    }
  }
  return $reply;
}

/**
 * Send one command and require a reply code. Returns '' on success or a
 * human-readable error.
 */
function smtp_cmd($socket, ?string $command, array $expected, string $label): string {
  if ($command !== null) {
    fwrite($socket, $command . "\r\n");
  }
  $reply = smtp_read($socket);
  $code = (int)substr($reply, 0, 3);
  if (!in_array($code, $expected, true)) {
    return $label . ' failed: ' . trim($reply);
  }
  return '';
}

/**
 * Deliver a message over authenticated SMTP. Written against raw sockets so
 * the endpoint stays dependency-free — shared hosting has no Composer.
 *
 * Returns '' on success, or an error message for the log.
 */
function smtp_send(
  array $opts,
  string $envelopeFrom,
  array $recipients,
  string $headers,
  string $body
): string {
  $host = $opts['host'];
  $port = (int)$opts['port'];
  $secure = strtolower($opts['secure']);

  $transport = $secure === 'ssl' ? 'ssl://' . $host : $host;

  // Shared hosts often present a certificate for the physical server rather
  // than mail.<domain>, which fails strict verification. Verification stays on
  // by default; SMTP_VERIFY=false relaxes it when that mismatch is the cause.
  $verify = $opts['verify'];
  $context = stream_context_create([
    'ssl' => [
      'verify_peer' => $verify,
      'verify_peer_name' => $verify,
      'allow_self_signed' => !$verify,
      'SNI_enabled' => true,
    ],
  ]);

  $socket = @stream_socket_client(
    $transport . ':' . $port,
    $errno,
    $errstr,
    15,
    STREAM_CLIENT_CONNECT,
    $context
  );

  if (!$socket) {
    return "connect to {$host}:{$port} failed: {$errstr} ({$errno})";
  }

  stream_set_timeout($socket, 15);

  $helo = $opts['helo'] !== '' ? $opts['helo'] : 'localhost';

  if ($err = smtp_cmd($socket, null, [220], 'greeting')) { fclose($socket); return $err; }
  if ($err = smtp_cmd($socket, 'EHLO ' . $helo, [250], 'EHLO')) { fclose($socket); return $err; }

  if ($secure === 'tls') {
    if ($err = smtp_cmd($socket, 'STARTTLS', [220], 'STARTTLS')) { fclose($socket); return $err; }
    if (!@stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
      fclose($socket);
      return 'TLS negotiation failed';
    }
    // The session resets after STARTTLS, so greet again.
    if ($err = smtp_cmd($socket, 'EHLO ' . $helo, [250], 'EHLO after STARTTLS')) { fclose($socket); return $err; }
  }

  if ($opts['user'] !== '') {
    if ($err = smtp_cmd($socket, 'AUTH LOGIN', [334], 'AUTH LOGIN')) { fclose($socket); return $err; }
    if ($err = smtp_cmd($socket, base64_encode($opts['user']), [334], 'username')) { fclose($socket); return $err; }
    if ($err = smtp_cmd($socket, base64_encode($opts['pass']), [235], 'password')) { fclose($socket); return $err; }
  }

  if ($err = smtp_cmd($socket, 'MAIL FROM:<' . $envelopeFrom . '>', [250], 'MAIL FROM')) { fclose($socket); return $err; }

  foreach ($recipients as $rcpt) {
    $addr = extract_address($rcpt);
    if ($addr === '') {
      continue;
    }
    if ($err = smtp_cmd($socket, 'RCPT TO:<' . $addr . '>', [250, 251], 'RCPT TO')) { fclose($socket); return $err; }
  }

  if ($err = smtp_cmd($socket, 'DATA', [354], 'DATA')) { fclose($socket); return $err; }

  // Dot-stuff: a line of just "." would otherwise terminate the message early.
  $data = $headers . "\r\n\r\n" . $body;
  $data = preg_replace('/^\./m', '..', $data);
  fwrite($socket, $data . "\r\n.\r\n");

  if ($err = smtp_cmd($socket, null, [250], 'message body')) { fclose($socket); return $err; }

  @smtp_cmd($socket, 'QUIT', [221], 'QUIT');
  fclose($socket);

  return '';
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

if (text_len($name) > 120 || text_len($phone) > 40 || text_len($service) > 120 || text_len($message) > 5000) {
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
  // Both remaining transports send the same MIME message; they differ only in
  // how it is handed off.
  $envelope = extract_address($mailFrom);
  if ($envelope === '') {
    error_log('[contact.php] CONTACT_EMAIL_FROM is not a usable address: ' . $mailFrom);
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Email service is not configured.']);
    exit;
  }

  $boundary = 'ow-' . bin2hex(random_bytes(12));
  $replyTo = encode_header(str_replace(['<', '>', ',', ';'], ' ', $name)) . ' <' . $email . '>';

  $body = "--{$boundary}\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\n"
    . "Content-Transfer-Encoding: 8bit\r\n\r\n"
    . preg_replace('/\R/u', "\r\n", $text) . "\r\n\r\n"
    . "--{$boundary}\r\n"
    . "Content-Type: text/html; charset=UTF-8\r\n"
    . "Content-Transfer-Encoding: 8bit\r\n\r\n"
    . preg_replace('/\R/u', "\r\n", $html) . "\r\n\r\n"
    . "--{$boundary}--\r\n";

  if ($transport === 'smtp') {
    // mail() is unavailable or unwanted, so speak SMTP to the mail server
    // directly using the mailbox credentials.
    $smtpHeaders = implode("\r\n", [
      'Date: ' . date('r'),
      'From: ' . $mailFrom,
      'To: ' . implode(', ', $recipients),
      'Reply-To: ' . $replyTo,
      'Subject: ' . encode_header($subject),
      'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . (explode('@', $envelope)[1] ?? 'localhost') . '>',
      'MIME-Version: 1.0',
      'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
      'X-Mailer: Orbitwelve contact form',
    ]);

    $smtpError = smtp_send(
      [
        'host' => $smtpHost,
        'port' => config_value($config, 'SMTP_PORT', '465'),
        'secure' => config_value($config, 'SMTP_SECURE', 'ssl'),
        'user' => config_value($config, 'SMTP_USER', $envelope),
        'pass' => config_value($config, 'SMTP_PASS'),
        'helo' => config_value($config, 'SMTP_HELO', $_SERVER['SERVER_NAME'] ?? 'localhost'),
        'verify' => strtolower(config_value($config, 'SMTP_VERIFY', 'true')) !== 'false',
      ],
      $envelope,
      $recipients,
      $smtpHeaders,
      $body
    );

    if ($smtpError !== '') {
      error_log('[contact.php] SMTP ' . $smtpError);
      http_response_code(502);
      echo json_encode(['ok' => false, 'error' => 'Failed to send. Please try again.']);
      exit;
    }
  } else {
    $headers = implode("\r\n", [
      'From: ' . $mailFrom,
      'Reply-To: ' . $replyTo,
      'MIME-Version: 1.0',
      'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
      'X-Mailer: Orbitwelve contact form',
    ]);

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
}

$hits[] = $now;
@file_put_contents($throttleFile, json_encode($hits), LOCK_EX);

echo json_encode(['ok' => true]);
