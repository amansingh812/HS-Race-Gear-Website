import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

/**
 * GET /api/stripe/session?session_id=cs_...
 *
 * Called by the /order-confirmation page to display order details.
 * Returns minimal order info — never exposes full session or payment data.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Missing session_id parameter" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    // First try to find the order by stripeSessionId (webhook may have already created it)
    const order = await Order.findOne({
      "payment.stripeSessionId": sessionId,
    }).lean();

    if (order) {
      return NextResponse.json({
        orderNumber: order.orderNumber,
        customerEmail: order.customer?.email || order.guestEmail || "",
        total: (order.total || 0) / 100, // Order stores in cents, return dollars for display
        paymentBrand: order.payment?.brand || "",
        paymentLast4: order.payment?.last4 || "",
        status: order.status,
        itemCount: order.items?.length || 0,
      });
    }

    // Fallback: webhook hasn't fired yet — read from Stripe directly
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment has not been completed." },
        { status: 400 }
      );
    }

    // Return what we can from the session
    let paymentBrand = "";
    let paymentLast4 = "";
    if (session.payment_intent) {
      try {
        const pi = await stripe.paymentIntents.retrieve(session.payment_intent);
        // Get the charge object for payment method details
        let pmd = null;
        if (pi.latest_charge) {
          const chargeId = typeof pi.latest_charge === "string" ? pi.latest_charge : pi.latest_charge.id;
          const charge = typeof pi.latest_charge === "object" ? pi.latest_charge : await stripe.charges.retrieve(chargeId);
          pmd = charge.payment_method_details;
        }
        if (!pmd) {
          pmd = pi.charges?.data?.[0]?.payment_method_details;
        }
        if (pmd?.type === "paypal" || pmd?.paypal) {
          paymentBrand = "paypal";
        } else if (pmd?.card) {
          paymentBrand = pmd.card.brand || "";
          paymentLast4 = pmd.card.last4 || "";
        }
      } catch (e) {
        // Non-critical — continue without payment details
      }
    }

    return NextResponse.json({
      orderNumber: null, // webhook hasn't created the order yet
      customerEmail: session.customer_email || "",
      total: (session.amount_total || 0) / 100,
      paymentBrand,
      paymentLast4,
      status: "processing",
      itemCount: 0,
    });
  } catch (error) {
    console.error("[stripe/session] Error:", error.message);
    return NextResponse.json(
      { error: "Unable to retrieve session details." },
      { status: 500 }
    );
  }
}
