"use client";
import React, { useState } from "react";

export default function PaymentLinkForm() {
  const [form, setForm] = useState({
    amount: "",
    customerName: "",
    customerEmail: "",
    description: "Custom Racing Gear",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/pay/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setResult(data);
    } catch (err) {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result?.paymentUrl) return;
    try {
      await navigator.clipboard.writeText(result.paymentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = result.paymentUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNewLink = () => {
    setResult(null);
    setForm({
      amount: "",
      customerName: "",
      customerEmail: "",
      description: "Custom Racing Gear",
    });
  };

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
        maxWidth: "520px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "16px",
        padding: "40px",
        backdropFilter: "blur(10px)",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 8px",
            letterSpacing: "1px",
          }}>
            <span style={{ color: "#dc2626" }}>HS</span> RACE GEAR
          </h1>
          <p style={{
            fontSize: "0.9rem",
            color: "#9ca3af",
            margin: 0,
          }}>
            Create Payment Link
          </p>
        </div>

        {!result ? (
          <form onSubmit={handleSubmit}>
            {/* Amount */}
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Amount (USD) *</label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                }}>$</span>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="549.00"
                  min="1"
                  step="0.01"
                  required
                  style={{ ...inputStyle, paddingLeft: "32px" }}
                />
              </div>
            </div>

            {/* Customer Name */}
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Customer Name *</label>
              <input
                type="text"
                name="customerName"
                value={form.customerName}
                onChange={handleChange}
                placeholder="John Smith"
                required
                style={inputStyle}
              />
            </div>

            {/* Customer Email */}
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Customer Email *</label>
              <input
                type="email"
                name="customerEmail"
                value={form.customerEmail}
                onChange={handleChange}
                placeholder="customer@example.com"
                required
                style={inputStyle}
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: "28px" }}>
              <label style={labelStyle}>Description (optional)</label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Custom SFI 3.2A/5 Racing Suit"
                style={inputStyle}
              />
            </div>

            {error && (
              <div style={{
                padding: "12px 16px",
                borderRadius: "8px",
                background: "rgba(220,38,38,0.15)",
                border: "1px solid rgba(220,38,38,0.3)",
                color: "#fca5a5",
                fontSize: "0.85rem",
                marginBottom: "20px",
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "8px",
                border: "none",
                background: loading ? "#666" : "#dc2626",
                color: "#fff",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                letterSpacing: "0.5px",
                transition: "background 0.2s",
              }}
            >
              {loading ? "Creating..." : "Create Payment Link & Send Email"}
            </button>
          </form>
        ) : (
          /* Success State */
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "rgba(34,197,94,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: "28px",
            }}>
              ✓
            </div>
            <h2 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 700, margin: "0 0 8px" }}>
              Payment Link Created!
            </h2>
            <p style={{ color: "#9ca3af", fontSize: "0.85rem", margin: "0 0 24px" }}>
              Email sent to {form.customerEmail}
            </p>

            {/* Link display */}
            <div style={{
              background: "rgba(0,0,0,0.3)",
              borderRadius: "8px",
              padding: "14px",
              marginBottom: "16px",
              wordBreak: "break-all",
              fontSize: "0.85rem",
              color: "#dc2626",
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              {result.paymentUrl}
            </div>

            <button
              onClick={handleCopy}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(220,38,38,0.5)",
                background: copied ? "rgba(34,197,94,0.15)" : "transparent",
                color: copied ? "#22c55e" : "#dc2626",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                marginBottom: "12px",
                transition: "all 0.2s",
              }}
            >
              {copied ? "✓ Copied!" : "Copy Link"}
            </button>

            <button
              onClick={handleNewLink}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "transparent",
                color: "#9ca3af",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Create Another Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  color: "#d1d5db",
  fontSize: "0.85rem",
  fontWeight: 600,
  marginBottom: "6px",
  letterSpacing: "0.3px",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(255,255,255,0.05)",
  color: "#fff",
  fontSize: "1rem",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};
