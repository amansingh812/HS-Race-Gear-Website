"use client";
import React, { useState } from "react";

export default function PaymentPage({ data }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const amountDisplay = `$${(data.amount / 100).toFixed(2)}`;

  const handlePay = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/pay/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId: data.paymentId }),
      });
      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Something went wrong");
        setLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = result.url;
    } catch (err) {
      setError("Network error — please try again");
      setLoading(false);
    }
  };

  const isPaid = data.status === "paid";
  const isExpired = data.status === "expired";

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      fontFamily: "Poppins, Arial, sans-serif",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "480px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "16px",
        padding: "40px",
        backdropFilter: "blur(10px)",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 4px",
            letterSpacing: "1px",
          }}>
            <span style={{ color: "#dc2626" }}>HS</span> RACE GEAR
          </h1>
        </div>

        {isPaid ? (
          /* Already Paid */
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "rgba(34,197,94,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: "32px",
            }}>
              ✓
            </div>
            <h2 style={{ color: "#22c55e", fontSize: "1.3rem", fontWeight: 700, margin: "0 0 8px" }}>
              Payment Complete
            </h2>
            <p style={{ color: "#9ca3af", fontSize: "0.9rem", margin: "0 0 4px" }}>
              {amountDisplay} has been paid successfully.
            </p>
            {data.paidAt && (
              <p style={{ color: "#6b7280", fontSize: "0.8rem", margin: "0" }}>
                {new Date(data.paidAt).toLocaleDateString("en-US", {
                  dateStyle: "long",
                })}
              </p>
            )}
          </div>
        ) : isExpired ? (
          /* Expired */
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "rgba(234,179,8,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: "32px",
            }}>
              ⏳
            </div>
            <h2 style={{ color: "#eab308", fontSize: "1.3rem", fontWeight: 700, margin: "0 0 8px" }}>
              Link Expired
            </h2>
            <p style={{ color: "#9ca3af", fontSize: "0.9rem", margin: 0 }}>
              This payment link has expired. Please contact HS Race Gear for a new link.
            </p>
            <a
              href="mailto:info@hsracegear.com"
              style={{
                display: "inline-block",
                marginTop: "20px",
                color: "#dc2626",
                fontSize: "0.9rem",
                textDecoration: "underline",
              }}
            >
              info@hsracegear.com
            </a>
          </div>
        ) : (
          /* Pending — show payment details + Pay button */
          <>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <p style={{ color: "#9ca3af", fontSize: "0.85rem", margin: "0 0 4px" }}>
                Payment request for
              </p>
              <p style={{ color: "#fff", fontSize: "1rem", fontWeight: 600, margin: "0" }}>
                {data.customerName}
              </p>
            </div>

            {/* Amount card */}
            <div style={{
              background: "rgba(0,0,0,0.3)",
              borderRadius: "12px",
              padding: "28px",
              marginBottom: "24px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
                paddingBottom: "16px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}>
                <span style={{ color: "#9ca3af", fontSize: "0.9rem" }}>Description</span>
                <span style={{ color: "#e5e7eb", fontSize: "0.9rem", fontWeight: 600 }}>
                  {data.description}
                </span>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 700 }}>
                  Amount Due
                </span>
                <span style={{ color: "#dc2626", fontSize: "2rem", fontWeight: 800 }}>
                  {amountDisplay}
                </span>
              </div>
            </div>

            {error && (
              <div style={{
                padding: "12px 16px",
                borderRadius: "8px",
                background: "rgba(220,38,38,0.15)",
                border: "1px solid rgba(220,38,38,0.3)",
                color: "#fca5a5",
                fontSize: "0.85rem",
                marginBottom: "16px",
              }}>
                {error}
              </div>
            )}

            <button
              onClick={handlePay}
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "8px",
                border: "none",
                background: loading ? "#666" : "#dc2626",
                color: "#fff",
                fontSize: "1.1rem",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                letterSpacing: "0.5px",
                transition: "background 0.2s",
                marginBottom: "16px",
              }}
            >
              {loading ? "Redirecting to Stripe..." : `Pay ${amountDisplay}`}
            </button>

            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#6b7280", fontSize: "0.75rem", margin: 0 }}>
                Secure payment powered by Stripe. We accept all major credit cards and PayPal.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
