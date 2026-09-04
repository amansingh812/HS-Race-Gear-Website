"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useContextElement } from "@/context/Context";

/**
 * Order confirmation page — shown after successful Stripe Checkout.
 *
 * Reads `session_id` from the URL, fetches the session details from
 * our API, and displays the order summary. Also clears the cart
 * (client-side) since the webhook already cleared it server-side.
 *
 * URL: /order-confirmation?session_id=cs_...&type=custom (optional)
 */
export default function OrderConfirmation() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const orderType = searchParams.get("type") || "shop";
  const { clearCart } = useContextElement();

  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Clear the cart on the client side
    if (clearCart) {
      clearCart();
    }

    if (!sessionId) {
      setError("No session ID found. Please check your order email for confirmation.");
      setLoading(false);
      return;
    }

    // Fetch session details
    fetch(`/api/stripe/session?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setOrderData(data);
        }
      })
      .catch(() => {
        setError("Unable to load order details. You should receive a confirmation email shortly.");
      })
      .finally(() => setLoading(false));
  }, [sessionId]);

  // ── Loading state ──
  if (loading) {
    return (
      <section className="flat-spacing-9">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-danger mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted">Loading your order details...</p>
          </div>
        </div>
      </section>
    );
  }

  // ── Error state ──
  if (error && !orderData) {
    return (
      <section className="flat-spacing-9">
        <div className="container">
          <div className="text-center py-5" style={{ maxWidth: 600, margin: "0 auto" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#fff3cd",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <span style={{ fontSize: 28 }}>⚠</span>
            </div>
            <h4 className="mb-3">Order Status Pending</h4>
            <p className="text-muted mb-4">{error}</p>
            <p className="text-muted mb-4">
              If you completed payment, your order has been received. Check your email
              at the address you provided for a confirmation with your order number.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link href="/shop" className="tf-btn btn-fill radius-4">
                <span className="text text-button fw-6">Continue Shopping</span>
              </Link>
              <Link href="/contact-us" className="tf-btn btn-outline radius-4">
                <span className="text text-button fw-6">Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Success state ──
  const isCustom = orderType === "custom";

  return (
    <section className="flat-spacing-9">
      <div className="container">
        <div className="text-center py-4" style={{ maxWidth: 640, margin: "0 auto" }}>
          {/* Success icon */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "#e6f4ea",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#34a853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h3 className="mb-2" style={{ color: "#1e7e34" }}>
            Payment Received!
          </h3>
          <p className="text-muted mb-4">
            Thank you for your order. A confirmation email has been sent to{" "}
            <strong>{orderData?.customerEmail || "your email address"}</strong>.
          </p>

          {/* Order reference card */}
          {orderData?.orderNumber && (
            <div
              style={{
                display: "inline-block",
                border: "1px solid #e2cdc6",
                borderRadius: 8,
                padding: "16px 28px",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  color: "#6f5a52",
                  marginBottom: 4,
                }}
              >
                Order Reference
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  color: "#8f1717",
                  letterSpacing: 1,
                }}
              >
                {orderData.orderNumber}
              </div>
            </div>
          )}

          {/* Payment details */}
          {orderData?.paymentBrand && (
            <p className="text-muted mb-4" style={{ fontSize: 14 }}>
              Paid with{" "}
              {orderData.paymentBrand === "paypal"
                ? "PayPal"
                : `${orderData.paymentBrand}${orderData.paymentLast4 ? ` ending ${orderData.paymentLast4}` : ""}`}
              {orderData?.total && ` — $${Number(orderData.total).toFixed(2)} USD`}
            </p>
          )}

          {/* What happens next */}
          <div
            style={{
              textAlign: "left",
              background: "#fffaf8",
              border: "1px solid #e2cdc6",
              borderRadius: 8,
              padding: "20px 24px",
              marginBottom: 28,
            }}
          >
            <h5 className="mb-3" style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: 1, color: "#2b1a17" }}>
              What Happens Next
            </h5>
            {isCustom ? (
              <ol style={{ paddingLeft: 18, margin: 0, lineHeight: 2, color: "#2b1a17", fontSize: 14 }}>
                <li>A designer emails you a digital mockup within 24 hours.</li>
                <li>Revisions are unlimited and free — nothing is cut until you approve.</li>
                <li>Production takes 2–3 weeks after mockup approval.</li>
                <li>You'll get tracking once it ships.</li>
              </ol>
            ) : (
              <ol style={{ paddingLeft: 18, margin: 0, lineHeight: 2, color: "#2b1a17", fontSize: 14 }}>
                <li>We process and prepare your order.</li>
                <li>Your gear ships and you'll receive tracking via email.</li>
                <li>Enjoy the race!</li>
              </ol>
            )}
          </div>

          {isCustom && (
            <p className="text-muted mb-4" style={{ fontSize: 13, background: "#f8f8f8", padding: "12px 16px", borderRadius: 6 }}>
              If we can't produce exactly what you want, we'll refund in full — no questions asked.
            </p>
          )}

          {/* Actions */}
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link href="/shop" className="tf-btn btn-fill radius-4">
              <span className="text text-button fw-6">Continue Shopping</span>
            </Link>
            <Link href="/contact-us" className="tf-btn btn-outline radius-4">
              <span className="text text-button fw-6">Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
