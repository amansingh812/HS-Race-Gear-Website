import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import PaymentLink from "@/models/PaymentLink";
import {
  BRAND,
  CONTACT,
  escapeHtml,
  money,
  getTransporter,
} from "@/lib/orderEmail";

/**
 * POST /api/pay/create
 *
 * Team-facing endpoint. Creates a PaymentLink record and optionally
 * emails the customer a branded payment link.
 *
 * Body: { amount (dollars), customerName, customerEmail, description?, sendEmail? }
 * Returns: { paymentId, paymentUrl }
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, description, sendEmail = true } = body;
    let { amount } = body;

    // ── Validation ──
    if (!customerName || !customerEmail || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: amount, customerName, customerEmail" },
        { status: 400 }
      );
    }

    // Amount comes in as dollars from the form — convert to cents
    amount = Math.round(parseFloat(amount) * 100);
    if (!Number.isFinite(amount) || amount < 100) {
      return NextResponse.json(
        { error: "Amount must be at least $1.00" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // ── Create PaymentLink ──
    await dbConnect();
    const paymentLink = await PaymentLink.create({
      amount,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      description: description?.trim() || "Custom Racing Gear",
    });

    const paymentUrl = `${BRAND.site}/pay/${paymentLink.paymentId}`;

    // ── Send email to customer ──
    if (sendEmail) {
      try {
        const mail = await getTransporter();
        if (!mail.ok) {
          console.error("[pay/create] mailer unavailable:", mail.error);
          // Don't fail the request — the link is still created and can be copied
          throw new Error(mail.error);
        }
        const { transporter, smtpUser, businessEmail } = mail;
        const from = `"HS Race Gear" <${smtpUser}>`;
        const displayAmount = money(amount / 100);
        const safeDesc = escapeHtml(paymentLink.description);
        const safeName = escapeHtml(customerName);

        await transporter.sendMail({
          from,
          to: customerEmail,
          subject: `HS Race Gear — Payment Request for ${displayAmount}`,
          html: buildPaymentEmail({
            name: safeName,
            amount: displayAmount,
            description: safeDesc,
            paymentUrl,
          }),
        });

        // Also notify admin
        await transporter.sendMail({
          from,
          to: businessEmail,
          subject: `[Payment Link Created] ${displayAmount} — ${customerName}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
              <h2 style="color:${BRAND.red};">Payment Link Created</h2>
              <p><strong>Customer:</strong> ${safeName} (${escapeHtml(customerEmail)})</p>
              <p><strong>Amount:</strong> ${displayAmount}</p>
              <p><strong>Description:</strong> ${safeDesc}</p>
              <p><strong>Link:</strong> <a href="${paymentUrl}">${paymentUrl}</a></p>
              <p><strong>Status:</strong> Pending</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("[pay/create] Failed to send email:", emailErr.message);
        // Don't fail the request — the link is still created and can be copied
      }
    }

    return NextResponse.json({
      success: true,
      paymentId: paymentLink.paymentId,
      paymentUrl,
    });
  } catch (err) {
    console.error("[pay/create] Error:", err);
    return NextResponse.json(
      { error: "Failed to create payment link" },
      { status: 500 }
    );
  }
}

/**
 * Build the branded payment request email.
 */
function buildPaymentEmail({ name, amount, description, paymentUrl }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:${BRAND.blush};font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.blush};padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background-color:${BRAND.card};border-radius:12px;overflow:hidden;">

  <!-- Header -->
  <tr>
    <td style="background-color:${BRAND.red};padding:32px 40px;text-align:center;">
      <h1 style="margin:0;font-size:24px;color:#ffffff;font-weight:800;letter-spacing:1px;">
        HS RACE GEAR
      </h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">
        Payment Request
      </p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="padding:40px;">
      <p style="color:${BRAND.ink};font-size:16px;line-height:1.6;margin:0 0 20px;">
        Hi ${name},
      </p>
      <p style="color:${BRAND.ink};font-size:16px;line-height:1.6;margin:0 0 24px;">
        We've prepared a payment request for your custom order. Please review the details below and click the button to complete your payment securely via Stripe.
      </p>

      <!-- Amount Box -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
        <tr>
          <td style="background-color:${BRAND.blush};border-radius:8px;padding:24px;border:1px solid ${BRAND.rule};">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="color:${BRAND.inkSoft};font-size:14px;padding-bottom:8px;">Description</td>
                <td style="color:${BRAND.ink};font-size:14px;padding-bottom:8px;text-align:right;font-weight:600;">${description}</td>
              </tr>
              <tr>
                <td colspan="2" style="border-top:1px solid ${BRAND.rule};padding-top:12px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="color:${BRAND.ink};font-size:20px;font-weight:800;">Amount Due</td>
                      <td style="color:${BRAND.red};font-size:28px;font-weight:800;text-align:right;">${amount}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- CTA Button -->
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <a href="${paymentUrl}" style="display:inline-block;background-color:${BRAND.red};color:#ffffff;text-decoration:none;padding:16px 48px;border-radius:8px;font-size:16px;font-weight:700;letter-spacing:0.5px;">
              Pay ${amount} Now
            </a>
          </td>
        </tr>
      </table>

      <p style="color:${BRAND.inkSoft};font-size:13px;line-height:1.6;margin:24px 0 0;text-align:center;">
        Or copy this link into your browser:<br>
        <a href="${paymentUrl}" style="color:${BRAND.red};word-break:break-all;">${paymentUrl}</a>
      </p>

      <hr style="border:none;border-top:1px solid ${BRAND.rule};margin:32px 0;">

      <p style="color:${BRAND.inkSoft};font-size:13px;line-height:1.6;margin:0;">
        Payment is processed securely by Stripe. We accept all major credit cards and PayPal.
        If you have questions about this request, contact us at
        <a href="mailto:${CONTACT.email}" style="color:${BRAND.red};">${CONTACT.email}</a>
        or call <a href="tel:${CONTACT.phoneHref}" style="color:${BRAND.red};">${CONTACT.phone}</a>.
      </p>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background-color:${BRAND.redDark};padding:24px 40px;text-align:center;">
      <p style="margin:0;color:rgba(255,255,255,0.7);font-size:12px;">
        HS Race Gear · ${CONTACT.address}
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
