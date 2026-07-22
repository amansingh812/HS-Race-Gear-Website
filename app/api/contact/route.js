import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Contact form API.
 * Sends TWO emails:
 *   1. Internal notification → BUSINESS_EMAIL (default: info@hsracegear.com)
 *   2. Auto-reply confirmation → the customer
 *
 * Required env vars (set in .env.local and Vercel project settings):
 *   SMTP_HOST         (e.g. smtp.gmail.com, smtp.zoho.com, smtp.sendgrid.net)
 *   SMTP_PORT         (default 587)
 *   SMTP_USER         (the mailbox that sends — e.g. info@hsracegear.com)
 *   SMTP_PASS         (SMTP password or app-specific password)
 *   BUSINESS_EMAIL    (optional — defaults to info@hsracegear.com)
 *
 * IMPORTANT: If SMTP vars are missing, this route now returns HTTP 500 so
 * the frontend shows the error banner (rather than pretending to succeed).
 */
export async function POST(request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    // Basic email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const businessEmail = process.env.BUSINESS_EMAIL || "info@hsracegear.com";

    // Fail loud if SMTP is not configured — so the frontend surfaces the
    // error instead of silently pretending to succeed.
    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("[/api/contact] SMTP env vars missing — cannot send email.", {
        smtpHost: !!smtpHost,
        smtpUser: !!smtpUser,
        smtpPass: !!smtpPass,
      });
      return NextResponse.json(
        { error: "Email service is not configured. Please contact us directly at info@hsracegear.com." },
        { status: 500 }
      );
    }

    const internalEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #dc2626, #991b1b); padding: 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase;">New Contact Enquiry</h1>
        <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">Someone submitted the contact form on hsracegear.com</p>
      </div>
      <div style="padding: 32px;">
        <h2 style="color: #f87171; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px;">Sender Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #888; width: 100px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0; font-weight: 600;"><a href="mailto:${escapeHtml(email)}" style="color: #f87171;">${escapeHtml(email)}</a></td></tr>
          ${phone ? `<tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0; font-weight: 600;"><a href="tel:${escapeHtml(phone)}" style="color: #f87171;">${escapeHtml(phone)}</a></td></tr>` : ""}
          ${subject ? `<tr><td style="padding: 8px 0; color: #888;">Subject</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(subject)}</td></tr>` : ""}
        </table>
        <hr style="border: none; border-top: 1px solid #222; margin: 24px 0;">
        <h2 style="color: #f87171; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px;">Message</h2>
        <p style="color: #d1d5db; line-height: 1.7; background: rgba(255,255,255,0.05); border-radius: 8px; padding: 16px; margin: 0;">${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        <hr style="border: none; border-top: 1px solid #222; margin: 24px 0;">
        <p style="color: #666; font-size: 12px; margin: 0;">Reply to this email to respond directly to ${escapeHtml(name)}.</p>
      </div>
    </div>`;

    const customerEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #dc2626, #991b1b); padding: 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase;">Message Received!</h1>
        <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">HS Race Gear — We'll be in touch soon</p>
      </div>
      <div style="padding: 32px;">
        <p style="font-size: 16px; line-height: 1.7; color: #d1d5db;">Hi ${escapeHtml(name)},</p>
        <p style="font-size: 16px; line-height: 1.7; color: #d1d5db;">
          Thank you for reaching out to HS Race Gear! We've received your message and will get back to you
          <strong style="color: #fff;">within 24 hours</strong>.
        </p>
        <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; margin: 24px 0;">
          <h3 style="color: #f87171; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 12px;">Your Message</h3>
          <p style="color: #ccc; line-height: 1.7; margin: 0;">${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        </div>
        <p style="font-size: 14px; color: #888; line-height: 1.6;">
          Need an urgent response? Call us at <a href="tel:+16173196993" style="color: #f87171;">+1 (617) 319 6993</a> or email us directly at
          <a href="mailto:info@hsracegear.com" style="color: #f87171;">info@hsracegear.com</a>.
        </p>
        <p style="font-size: 14px; color: #888; margin-top: 24px;">— The HS Race Gear Team</p>
      </div>
    </div>`;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: Number(smtpPort) === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    // Verify SMTP connection before attempting to send — gives a clean
    // error if creds are bad instead of a cryptic send failure.
    try {
      await transporter.verify();
    } catch (verifyErr) {
      console.error("[/api/contact] SMTP verify failed:", verifyErr?.message || verifyErr);
      return NextResponse.json(
        { error: "Email service authentication failed. Please contact us directly at info@hsracegear.com." },
        { status: 500 }
      );
    }

    // Send internal notification (to info@hsracegear.com by default)
    await transporter.sendMail({
      from: `"HS Race Gear Website" <${smtpUser}>`,
      to: businessEmail,
      replyTo: email, // replies from Aman go straight back to the customer
      subject: `New Contact Enquiry from ${name}${subject ? ` — ${subject}` : ""}`,
      html: internalEmailHtml,
    });

    // Send customer auto-reply
    await transporter.sendMail({
      from: `"HS Race Gear" <${smtpUser}>`,
      to: email,
      replyTo: businessEmail,
      subject: "We received your message | HS Race Gear",
      html: customerEmailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[/api/contact] Uncaught error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please email us at info@hsracegear.com." },
      { status: 500 }
    );
  }
}

// Minimal HTML escape to avoid injection in the rendered email
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
