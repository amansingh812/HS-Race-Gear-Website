// Tests the GoDaddy "secureserver.net" SMTP host as an alternative to
// smtp.titan.email — some GoDaddy mailboxes (Workspace Email, wrapped in
// the Titan UI) authenticate here instead.
// Run with: node test-smtp-alt.mjs
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import nodemailer from 'nodemailer';

const hostsToTry = [
  { host: 'smtpout.secureserver.net', port: 465, secure: true },
  { host: 'smtpout.secureserver.net', port: 587, secure: false },
  { host: 'smtp.secureserver.net', port: 465, secure: true },
];

for (const cfg of hostsToTry) {
  const transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 8000,
  });

  try {
    await transporter.verify();
    console.log(`✅ SUCCESS with ${cfg.host}:${cfg.port} (secure=${cfg.secure})`);
    console.log(`   → Update .env.local: SMTP_HOST=${cfg.host}  SMTP_PORT=${cfg.port}`);
  } catch (err) {
    console.log(`❌ Failed with ${cfg.host}:${cfg.port} — ${err.message}`);
  }
}
