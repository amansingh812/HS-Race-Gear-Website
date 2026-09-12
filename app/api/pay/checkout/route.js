import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import dbConnect from "@/lib/mongodb";
import PaymentLink from "@/models/PaymentLink";

/**
 * POST /api/pay/checkout
 *
 * Customer-facing. Takes a paymentId, looks up the PaymentLink,
 * creates a Stripe Checkout session, and returns the Stripe URL.
 *
 * Body: { paymentId }
 * Returns: { url } (Stripe Checkout URL)
 */
export async function POST(request) {
  try {
    const { paymentId } = await request.json();

    if (!paymentId) {
      return NextResponse.json(
        { error: "Missing paymentId" },
        { status: 400 }
      );
    }

    await dbConnect();
    const paymentLink = await PaymentLink.findOne({ paymentId });

    if (!paymentLink) {
      return NextResponse.json(
        { error: "Payment link not found" },
        { status: 404 }
      );
    }

    if (paymentLink.status === "paid") {
      return NextResponse.json(
        { error: "This payment has already been completed" },
        { status: 400 }
      );
    }

    if (paymentLink.status === "expired") {
      return NextResponse.json(
        { error: "This payment link has expired. Please contact HS Race Gear for a new link." },
        { status: 400 }
      );
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "paypal"],
      customer_email: paymentLink.customerEmail,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: paymentLink.description || "Custom Racing Gear",
              description: `Payment for ${paymentLink.customerName}`,
            },
            unit_amount: paymentLink.amount, // already in cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        orderType: "payment-link",
        paymentLinkId: paymentLink._id.toString(),
        paymentId: paymentLink.paymentId,
        customerName: paymentLink.customerName,
        customerEmail: paymentLink.customerEmail,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.hsracegear.com"}/pay/success?id=${paymentId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.hsracegear.com"}/pay/${paymentId}`,
    });

    // Store the session ID for webhook reconciliation
    paymentLink.stripeSessionId = session.id;
    await paymentLink.save();

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[pay/checkout] Error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
