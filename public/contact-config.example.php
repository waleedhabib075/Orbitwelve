<?php
/**
 * Copy this file to contact-config.php (same folder) and fill in the values.
 *
 * contact-config.php is gitignored — the API key must never be committed.
 * Because it is a .php file, requesting it directly returns nothing: PHP
 * executes it and the returned array is never printed.
 */

return [
  // How the mail is sent:
  //   'php'    - hand it to this server's own mail server. No signup, no DNS,
  //              no API key. Delivery to a mailbox on this same cPanel account
  //              is local and very reliable.
  //   'resend' - call the Resend HTTP API. Requires a verified domain.
  // Leave empty to auto-pick: Resend when a key is set below, otherwise PHP.
  'MAIL_TRANSPORT' => 'php',

  // Only used when MAIL_TRANSPORT is 'resend'.
  // Resend API key: https://resend.com/api-keys
  'RESEND_API_KEY' => '',

  // The sender address. Must be on your own domain — never the visitor's.
  // For 'php' it should be a mailbox that exists in cPanel; for 'resend' it
  // must be on a domain verified there.
  'CONTACT_EMAIL_FROM' => 'Orbitwelve Website <contact@orbitwelve.com>',

  // Where submissions land. Comma-separate for multiple recipients.
  'CONTACT_EMAIL_TO' => 'contact@orbitwelve.com',

  // Browser origins allowed to POST to this endpoint.
  'ALLOWED_ORIGINS' => [
    'https://orbitwelve.com',
    'https://www.orbitwelve.com',
    'http://localhost:3000',
  ],
];
