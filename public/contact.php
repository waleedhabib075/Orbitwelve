<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

$apiKey = getenv('RESEND_API_KEY');
if (!$apiKey) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Missing RESEND_API_KEY']);
  exit;
}

if (!function_exists('curl_init')) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'cURL extension is not enabled on server']);
  exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
  exit;
}

$name = trim((string)($data['name'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$phone = trim((string)($data['phone'] ?? ''));
$service = trim((string)($data['service'] ?? ''));
$message = trim((string)($data['message'] ?? ''));

if ($name === '' || $email === '' || $phone === '' || $service === '' || $message === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Missing required fields']);
  exit;
}

$subject = 'New inquiry from ' . $name;
$text = "Name: {$name}\nEmail: {$email}\nPhone: {$phone}\nService: {$service}\n\nMessage:\n{$message}";

$payload = [
  'from' => 'Orbitwelve <content@orbitwelve.com>',
  'to' => ['contact@orbitwelve.com'],
  'reply_to' => $email,
  'subject' => $subject,
  'text' => $text,
];

$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  'Authorization: Bearer ' . $apiKey,
  'Content-Type: application/json',
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

$response = curl_exec($ch);
$errno = curl_errno($ch);
$httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($errno) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Failed to send']);
  exit;
}

if ($httpCode < 200 || $httpCode >= 300) {
  http_response_code(500);
  $decoded = json_decode($response, true);
  $errMsg = 'Failed to send';
  if (is_array($decoded)) {
    if (isset($decoded['message'])) {
      $errMsg = (string)$decoded['message'];
    } elseif (isset($decoded['error']) && is_array($decoded['error']) && isset($decoded['error']['message'])) {
      $errMsg = (string)$decoded['error']['message'];
    }
  }
  echo json_encode(['ok' => false, 'error' => $errMsg]);
  exit;
}

echo json_encode(['ok' => true]);
