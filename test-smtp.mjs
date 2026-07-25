// Quick SMTP test — run with: node test-smtp.mjs
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.titan.email',
  port: Number(process.env.SMTP_PORT || 465),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

try {
  await transporter.verify();
  console.log('✅ SMTP login successful! Email is working.');
} catch (err) {
  console.error('❌ SMTP failed:', err.message);
  console.error('Check your SMTP_USER and SMTP_PASS in .env.local');
}
