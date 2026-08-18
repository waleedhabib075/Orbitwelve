<?php
/**
 * Token-gated SMTP diagnostic.
 *
 * The host's error log is unreadable from cPanel, so this reports what the
 * server can actually reach. It probes several host/port/encryption
 * combinations and prints how far each one gets.
 *
 * Open: https://orbitwelve.com/smtp-check.php?token=YOUR_DEBUG_TOKEN
 *
 * Delete this file once the contact form works. It is inert without the
 * DEBUG_TOKEN value, but there is no reason to leave a probe in place.
 */

header('Content-Type: text/plain; charset=utf-8');

$config = [];
$configFile = __DIR__ . '/contact-config.php';
if (is_readable($configFile)) {
  $loaded = require $configFile;
  if (is_array($loaded)) {
    $config = $loaded;
  }
}

$expected = (string)($config['DEBUG_TOKEN'] ?? '');
$given = (string)($_GET['token'] ?? '');

if ($expected === '' || !hash_equals($expected, $given)) {
  http_response_code(404);
  echo "Not found\n";
  exit;
}

$user = (string)($config['SMTP_USER'] ?? '');
$pass = (string)($config['SMTP_PASS'] ?? '');
$from = (string)($config['CONTACT_EMAIL_FROM'] ?? '');
$to = (string)($config['CONTACT_EMAIL_TO'] ?? '');

echo "PHP " . PHP_VERSION . " on " . php_uname('n') . "\n";
echo "mail() available: " . (function_exists('mail') ? 'yes' : 'NO (disabled by host)') . "\n";
echo "openssl loaded:   " . (extension_loaded('openssl') ? 'yes' : 'NO') . "\n";
echo "curl available:   " . (function_exists('curl_init') ? 'yes' : 'no') . "\n";
echo "SMTP_USER:        " . ($user !== '' ? $user : '(empty)') . "\n";
echo "SMTP_PASS:        " . ($pass !== '' ? '(set, ' . strlen($pass) . ' chars)' : '(EMPTY)') . "\n";
echo str_repeat('-', 64) . "\n\n";

/** Read one SMTP reply, following multi-line continuations. */
function rd($sock) {
  $out = '';
  while (($line = fgets($sock, 2048)) !== false) {
    $out .= $line;
    if (strlen($line) < 4 || $line[3] === ' ') {
      break;
    }
  }
  return rtrim($out);
}

function probe(string $host, int $port, string $secure, string $user, string $pass): void {
  echo "=== {$host}:{$port} (" . ($secure ?: 'plain') . ") ===\n";

  $target = ($secure === 'ssl' ? 'ssl://' : '') . $host . ':' . $port;
  $ctx = stream_context_create([
    'ssl' => ['verify_peer' => false, 'verify_peer_name' => false, 'allow_self_signed' => true],
  ]);

  $t0 = microtime(true);
  $sock = @stream_socket_client($target, $errno, $errstr, 10, STREAM_CLIENT_CONNECT, $ctx);
  $ms = (int)((microtime(true) - $t0) * 1000);

  if (!$sock) {
    echo "  CONNECT FAILED after {$ms}ms: {$errstr} (errno {$errno})\n\n";
    return;
  }
  echo "  connect ok ({$ms}ms)\n";
  stream_set_timeout($sock, 10);

  $greet = rd($sock);
  echo "  greeting: " . substr($greet, 0, 90) . "\n";

  fwrite($sock, "EHLO orbitwelve.com\r\n");
  $ehlo = rd($sock);
  echo "  EHLO: " . (str_contains($ehlo, '250') ? 'ok' : 'FAILED') . "\n";

  if ($secure === 'tls') {
    if (!str_contains($ehlo, 'STARTTLS')) {
      echo "  STARTTLS not offered\n\n";
      fclose($sock);
      return;
    }
    fwrite($sock, "STARTTLS\r\n");
    $st = rd($sock);
    if (!str_starts_with($st, '220')) {
      echo "  STARTTLS refused: {$st}\n\n";
      fclose($sock);
      return;
    }
    if (!@stream_socket_enable_crypto($sock, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
      echo "  TLS handshake FAILED\n\n";
      fclose($sock);
      return;
    }
    echo "  STARTTLS ok\n";
    fwrite($sock, "EHLO orbitwelve.com\r\n");
    $ehlo = rd($sock);
  }

  if (preg_match('/AUTH ([A-Z0-9 =-]+)/i', $ehlo, $m)) {
    echo "  auth offered: " . trim($m[1]) . "\n";
  } else {
    echo "  auth offered: (none advertised)\n";
  }

  if ($user !== '' && $pass !== '') {
    fwrite($sock, "AUTH LOGIN\r\n");
    $r = rd($sock);
    if (str_starts_with($r, '334')) {
      fwrite($sock, base64_encode($user) . "\r\n");
      $r = rd($sock);
      fwrite($sock, base64_encode($pass) . "\r\n");
      $r = rd($sock);
      echo "  AUTH result: " . (str_starts_with($r, '235') ? 'SUCCESS' : 'FAILED -> ' . $r) . "\n";
    } else {
      echo "  AUTH LOGIN refused: {$r}\n";
    }
  }

  fwrite($sock, "QUIT\r\n");
  fclose($sock);
  echo "\n";
}

$candidates = [
  ['localhost', 465, 'ssl'],
  ['localhost', 587, 'tls'],
  ['localhost', 25, ''],
  ['mail.orbitwelve.com', 465, 'ssl'],
  ['mail.orbitwelve.com', 587, 'tls'],
];

foreach ($candidates as [$h, $p, $s]) {
  probe($h, $p, $s, $user, $pass);
}

echo str_repeat('-', 64) . "\n";
echo "Use the first combination that reaches AUTH result: SUCCESS.\n";
