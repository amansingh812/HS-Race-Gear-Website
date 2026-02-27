"use client";
import React, { useEffect } from "react";
import Link from "next/link";

const PDF_URL = "/pdf/custom-measurements-form.pdf";
// API route returns PDF with Content-Disposition: attachment — bypasses browser download blocker
const DOWNLOAD_URL = "/api/download-measurement-form";

export default function CustomMeasurementForm() {

  // Auto-download: window.location.href pointing to an attachment response
  // is the only method that reliably triggers a download without a user gesture
  // across all modern browsers (Chrome, Firefox, Safari, Edge).
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = DOWNLOAD_URL;
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    window.location.href = DOWNLOAD_URL;
  };

  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      {/* Header Section */}
      <section
        style={{
          padding: "48px 0 32px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "6px 18px",
              border: "1px solid rgba(220, 38, 38, 0.4)",
              borderRadius: "9999px",
              background: "rgba(220, 38, 38, 0.1)",
              color: "#f87171",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            Measurement Form
          </div>

          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: "800",
              color: "#fff",
              marginBottom: "16px",
              textTransform: "uppercase",
              lineHeight: "1.1",
            }}
          >
            Custom Measurements Form
          </h1>

          <p
            style={{
              color: "#9ca3af",
              fontSize: "1.05rem",
              maxWidth: "600px",
              margin: "0 auto 32px",
              lineHeight: "1.7",
            }}
          >
            Your form is downloading automatically. Print it out, fill in your
            measurements, and send it back to us to get your perfect custom fit.
          </p>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "16px",
            }}
          >
            <button
              onClick={handleDownload}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "#dc2626",
                color: "#fff",
                padding: "16px 32px",
                borderRadius: "10px",
                fontWeight: "700",
                fontSize: "15px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#b91c1c";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 25px rgba(220, 38, 38, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#dc2626";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </button>

            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 32px",
                borderRadius: "10px",
                fontWeight: "700",
                fontSize: "15px",
                border: "2px solid #333",
                color: "#aaa",
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#555";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#333";
                e.currentTarget.style.color = "#aaa";
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Open in New Tab
            </a>
          </div>

          {/* Auto-download notice */}
          <p
            style={{
              fontSize: "13px",
              color: "#555",
              marginBottom: "0",
            }}
          >
            Didn&apos;t start? Click &quot;Download PDF&quot; above.
          </p>
        </div>
      </section>

      {/* PDF Viewer */}
      <section
        style={{
          padding: "0 24px 64px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            borderRadius: "14px",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            background: "rgba(255, 255, 255, 0.03)",
          }}
        >
          {/* Viewer toolbar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 20px",
              background: "rgba(255, 255, 255, 0.04)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f87171"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#ccc",
                }}
              >
                HS-Race-Gear-Custom-Measurements-Form.pdf
              </span>
            </div>
            <button
              onClick={handleDownload}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "#aaa",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(220, 38, 38, 0.15)";
                e.currentTarget.style.color = "#f87171";
                e.currentTarget.style.borderColor = "rgba(220, 38, 38, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.color = "#aaa";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </button>
          </div>

          {/* Embedded PDF */}
          <div
            style={{
              width: "100%",
              height: "85vh",
              minHeight: "600px",
              background: "#1a1a1a",
            }}
          >
            <iframe
              src={`${PDF_URL}#toolbar=1&navpanes=0&scrollbar=1`}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
              title="Custom Measurements Form"
            />
          </div>
        </div>

        {/* Instructions Below Viewer */}
        <div
          style={{
            marginTop: "40px",
            padding: "28px",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: "14px",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "#fff",
              marginBottom: "16px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            How to Submit Your Measurements
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {[
              {
                num: "1",
                title: "Download & Print",
                desc: "Download the PDF and print it out.",
              },
              {
                num: "2",
                title: "Fill In Measurements",
                desc: "Use a measuring tape and fill in all fields accurately in CM.",
              },
              {
                num: "3",
                title: "Send It Back",
                desc: "Email the completed form to info@hsracegear.com",
              },
            ].map((step) => (
              <div
                key={step.num}
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#dc2626",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "800",
                    fontSize: "14px",
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  {step.num}
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: "700",
                      color: "#e5e5e5",
                      marginBottom: "4px",
                      fontSize: "14px",
                    }}
                  >
                    {step.title}
                  </div>
                  <div style={{ fontSize: "13px", color: "#777", lineHeight: "1.5" }}>
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div
          style={{
            textAlign: "center",
            marginTop: "48px",
            paddingBottom: "32px",
          }}
        >
          <p
            style={{
              color: "#666",
              fontSize: "14px",
              marginBottom: "20px",
            }}
          >
            Need help with your measurements?
          </p>
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/custom-fit"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                background: "transparent",
                border: "2px solid #333",
                borderRadius: "10px",
                color: "#aaa",
                fontWeight: "700",
                fontSize: "14px",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
            >
              View Measurement Guide
            </Link>
            <Link
              href="/contact-us"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                background: "transparent",
                border: "2px solid #333",
                borderRadius: "10px",
                color: "#aaa",
                fontWeight: "700",
                fontSize: "14px",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
