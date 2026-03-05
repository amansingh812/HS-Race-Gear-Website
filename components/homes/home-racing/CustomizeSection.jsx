"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { customizeCategories } from "@/data/collections";

/* ─────────────────────────────────────────────
   SUITS MODAL
───────────────────────────────────────────── */
function SuitsModal({ isOpen, onClose, options }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  /* Animate in/out */
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      const t = setTimeout(() => {
        setMounted(false);
        document.body.style.overflow = "";
      }, 420);
      return () => clearTimeout(t);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return (
    <>
      {/* ── Overlay ── */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.92)",
          zIndex: 9998,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.4s ease",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* ── Panel ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "720px",
            background: "#0d0d0d",
            border: "1px solid rgba(255,255,255,0.07)",
            position: "relative",
            clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1) translateY(0)" : "scale(0.96) translateY(24px)",
            transition: "opacity 0.42s cubic-bezier(0.22,1,0.36,1), transform 0.42s cubic-bezier(0.22,1,0.36,1)",
            pointerEvents: "all",
            /* subtle diagonal pattern */
            backgroundImage:
              "linear-gradient(#0d0d0d, #0d0d0d), repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(220,38,38,0.018) 40px, rgba(220,38,38,0.018) 42px)",
            backgroundBlendMode: "normal",
          }}
        >
          {/* Red top bar */}
          <div style={{ height: "3px", background: "linear-gradient(90deg, #dc2626 0%, rgba(220,38,38,0.3) 100%)" }} />

          {/* Inner padding */}
          <div style={{ padding: "40px 48px 48px" }} className="modal-inner">

            {/* Header row */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "40px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                  <div style={{ width: "28px", height: "2px", background: "#dc2626" }} />
                  <span style={{ color: "#f87171", fontSize: "10px", fontWeight: "700", letterSpacing: "4px", textTransform: "uppercase" }}>
                    Choose Category
                  </span>
                </div>
                <h2 style={{ color: "#fff", fontSize: "clamp(1.5rem, 4vw, 2.4rem)", fontWeight: "900", textTransform: "uppercase", letterSpacing: "-0.5px", margin: 0, lineHeight: 1 }}>
                  Select Your Suit
                </h2>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#888",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                  clipPath: "polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px)",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                className="modal-close-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Suit option rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {options.map((opt, i) => (
                <Link
                  key={i}
                  href={opt.href}
                  onClick={onClose}
                  style={{ textDecoration: "none" }}
                  className={`suit-option suit-option-${i}`}
                >
                  <div
                    className="suit-option-row"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "24px",
                      padding: "20px 24px",
                      border: "1px solid rgba(255,255,255,0.05)",
                      background: "rgba(255,255,255,0.02)",
                      position: "relative",
                      overflow: "hidden",
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateX(0)" : "translateX(40px)",
                      transition: `opacity 0.45s cubic-bezier(0.22,1,0.36,1) ${0.08 + i * 0.07}s, transform 0.45s cubic-bezier(0.22,1,0.36,1) ${0.08 + i * 0.07}s`,
                    }}
                  >
                    {/* Red hover fill */}
                    <div className="row-fill" style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(90deg, rgba(220,38,38,0.08) 0%, transparent 100%)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }} />

                    {/* Left red accent bar */}
                    <div className="row-left-bar" style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: "3px",
                      background: "#dc2626",
                      transform: "scaleY(0)",
                      transformOrigin: "bottom",
                      transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
                    }} />

                    {/* Index */}
                    <span style={{
                      color: "#dc2626",
                      fontSize: "11px",
                      fontWeight: "800",
                      letterSpacing: "2px",
                      fontFamily: "monospace",
                      minWidth: "28px",
                      position: "relative",
                      zIndex: 1,
                    }}>
                      0{i + 1}
                    </span>

                    {/* Divider */}
                    <div style={{ width: "1px", height: "28px", background: "rgba(255,255,255,0.08)", flexShrink: 0 }} />

                    {/* Name */}
                    <span className="row-name" style={{
                      color: "#bbb",
                      fontSize: "clamp(0.9rem, 2.5vw, 1.15rem)",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      flex: 1,
                      position: "relative",
                      zIndex: 1,
                      transition: "color 0.25s ease",
                    }}>
                      {opt.name}
                    </span>

                    {/* Arrow */}
                    <svg
                      className="row-arrow"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#444"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        flexShrink: 0,
                        transition: "all 0.3s ease",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            {/* Footer hint */}
            <p style={{ color: "#333", fontSize: "11px", marginTop: "28px", marginBottom: 0, letterSpacing: "1px", textTransform: "uppercase" }}>
              Press <kbd style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "3px", padding: "1px 6px", fontSize: "10px", color: "#555" }}>ESC</kbd> to close
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-close-btn:hover {
          border-color: rgba(220,38,38,0.5) !important;
          color: #fff !important;
        }
        .suit-option-row:hover .row-fill {
          opacity: 1 !important;
        }
        .suit-option-row:hover .row-left-bar {
          transform: scaleY(1) !important;
        }
        .suit-option-row:hover .row-name {
          color: #fff !important;
        }
        .suit-option-row:hover .row-arrow {
          stroke: #f87171 !important;
          transform: translateX(5px) !important;
        }
        /* Mobile */
        @media (max-width: 600px) {
          .modal-inner {
            padding: 28px 24px 36px !important;
          }
          .suit-option-row {
            padding: 16px 16px !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export default function CustomizeSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const suitsData = customizeCategories.find((c) => c.name === "Suits");

  return (
    <>
      <SuitsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        options={suitsData?.subOptions ?? []}
      />

      <section
        className="customize-section"
        style={{
          background: "#0a0a0a",
          padding: "80px 0 90px",
          position: "relative",
          overflow: "clip",
        }}
      >
        {/* Subtle diagonal racing stripes */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage:
              "repeating-linear-gradient(135deg, transparent, transparent 60px, rgba(220,38,38,0.015) 60px, rgba(220,38,38,0.015) 62px)",
            pointerEvents: "none",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "3px",
            background: "linear-gradient(90deg, transparent 0%, #dc2626 30%, #dc2626 70%, transparent 100%)",
          }}
        />

        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "0 24px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* ── Header ── */}
          <div style={{ marginBottom: "52px" }} className="customize-header">
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
              <div style={{ width: "40px", height: "3px", background: "#dc2626" }} />
              <span style={{ color: "#f87171", fontSize: "11px", fontWeight: "700", letterSpacing: "4px", textTransform: "uppercase" }}>
                Build Your Kit
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                fontWeight: "900",
                color: "#fff",
                textTransform: "uppercase",
                lineHeight: "1.05",
                margin: 0,
                letterSpacing: "-0.5px",
              }}
            >
              Customize Your Own
            </h2>
            <p style={{ color: "#666", fontSize: "1rem", marginTop: "12px", maxWidth: "520px", lineHeight: "1.6" }}>
              Choose colors, logos, and graphics. Build racing gear that&apos;s uniquely yours.
            </p>
          </div>

          {/* ── Cards ── */}
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "20px" }}
            className="customize-grid"
          >
            {customizeCategories.map((category, index) => {
              const hasSubs = !!(category.subOptions && category.subOptions.length);

              const cardInner = (
                <div
                  className="customize-card"
                  style={{ position: "relative", overflow: "visible", cursor: "pointer", height: "100%" }}
                  {...(hasSubs
                    ? {
                      onClick: (e) => { e.preventDefault(); setModalOpen(true); },
                    }
                    : {})}
                >
                  {/* Skewed background */}
                  <div
                    className="card-skew-bg"
                    style={{
                      position: "absolute",
                      top: 0, left: 0, right: 0, bottom: 0,
                      background: "linear-gradient(180deg, #141414 0%, #111 100%)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      transform: "skewX(-3deg)",
                      clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
                      transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      zIndex: 0,
                    }}
                  />

                  {/* Red accent stripe */}
                  <div
                    className="card-accent-stripe"
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "-1px",
                      width: "3px",
                      height: "0%",
                      background: "#dc2626",
                      transform: "skewX(-3deg)",
                      transition: "height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      zIndex: 2,
                    }}
                  />

                  {/* Suits badge */}
                  {hasSubs && (
                    <div style={{
                      position: "absolute",
                      top: "10px",
                      left: "14px",
                      background: "#dc2626",
                      color: "#fff",
                      fontSize: "9px",
                      fontWeight: "800",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      padding: "3px 7px",
                      clipPath: "polygon(4px 0,100% 0,calc(100% - 4px) 100%,0 100%)",
                      zIndex: 3,
                    }}>
                      4 Types
                    </div>
                  )}

                  {/* Content */}
                  <div
                    style={{
                      position: "relative",
                      zIndex: 1,
                      padding: "28px 20px 24px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {/* Index stamp */}
                    <div style={{
                      position: "absolute",
                      top: "10px",
                      right: "14px",
                      fontSize: "11px",
                      fontWeight: "800",
                      color: "rgba(255,255,255,0.08)",
                      letterSpacing: "1px",
                      fontFamily: "monospace",
                    }}>
                      0{index + 1}
                    </div>

                    {/* Image */}
                    <div className="card-img-wrap" style={{ width: "100%", aspectRatio: "3/4", position: "relative", marginBottom: "20px", overflow: "hidden" }}>
                      <Image
                        src={category.img}
                        alt={category.name}
                        width={400}
                        height={533}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        }}
                        className="card-image"
                        sizes="(max-width: 576px) 70vw, (max-width: 768px) 33vw, (max-width: 992px) 25vw, 20vw"
                      />
                    </div>

                    {/* Name + icon */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                      <h3
                        className="card-title"
                        style={{
                          color: "#ccc",
                          fontSize: "15px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                          margin: 0,
                          whiteSpace: "nowrap",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {category.name}
                      </h3>

                      {/* Chevrons icon for suits, arrow for others */}
                      {hasSubs ? (
                        <svg className="card-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "all 0.3s ease" }}>
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      ) : (
                        <svg className="card-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "all 0.3s ease", transform: "translateX(0)" }}>
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              );

              /* Suits → button, others → Link */
              return hasSubs ? (
                <div key={index} style={{ textDecoration: "none", display: "block", width: "100%" }}>
                  {cardInner}
                </div>
              ) : (
                <Link key={index} href={category.href} style={{ textDecoration: "none", display: "block", width: "100%" }}>
                  {cardInner}
                </Link>
              );
            })}
          </div>

          {/* Mobile scroll hint */}
          <div className="scroll-hint-bar">
            <span style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "2px",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              Swipe to explore
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
        </div>

        {/* ── Styles ── */}
        <style jsx>{`
          /* Scroll hint - hidden on desktop */
          .scroll-hint-bar {
            display: none;
          }

          /* Desktop: 5 columns */
          @media (max-width: 1200px) {
            .customize-grid {
              grid-template-columns: repeat(5, 1fr) !important;
              gap: 16px !important;
            }
          }

          /* Tablet: 3 columns */
          @media (max-width: 991px) {
            .customize-grid {
              grid-template-columns: repeat(3, 1fr) !important;
              gap: 16px !important;
            }
          }

          /* Mobile: horizontal scroll */
          @media (max-width: 767px) {
            .customize-section {
              padding: 50px 0 60px !important;
              overflow: visible !important;
            }
            .customize-header {
              margin-bottom: 32px !important;
            }
            .customize-grid {
              display: flex !important;
              overflow-x: auto !important;
              overflow-y: visible !important;
              scroll-snap-type: x mandatory;
              gap: 12px !important;
              margin: 0 -24px !important;
              padding: 0 24px 16px 24px !important;
              -webkit-overflow-scrolling: touch;
              scrollbar-width: none;
              -ms-overflow-style: none;
              touch-action: pan-x;
            }
            .customize-grid::-webkit-scrollbar {
              display: none;
            }
            .customize-grid > * {
              flex: 0 0 44%;
              min-width: 155px;
              max-width: 200px;
              scroll-snap-align: start;
            }
            .customize-card .card-skew-bg {
              transform: skewX(-2deg) !important;
            }
            .customize-card .card-accent-stripe {
              transform: skewX(-2deg) !important;
            }
            /* Mobile card content adjustments — force uniform card size */
            .customize-card > div:last-child {
              padding: 16px 12px 14px !important;
            }
            .customize-card .card-img-wrap {
              aspect-ratio: unset !important;
              height: 130px !important;
              margin-bottom: 12px !important;
            }
            .customize-card .card-title {
              font-size: 11px !important;
              letter-spacing: 1px !important;
            }
            .customize-card .card-arrow {
              width: 14px !important;
              height: 14px !important;
            }
            .scroll-hint-bar {
              display: flex !important;
              justify-content: center;
              padding-top: 16px;
            }
          }

          /* Small mobile: slightly larger cards */
          @media (max-width: 400px) {
            .customize-grid > * {
              flex: 0 0 46% !important;
              min-width: 145px !important;
            }
          }

          /* Card hover effects */
          .customize-card:hover .card-skew-bg {
            background: linear-gradient(180deg, #1a1a1a 0%, #161616 100%) !important;
            border-color: rgba(220, 38, 38, 0.28) !important;
            box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(220,38,38,0.08);
          }
          .customize-card:hover .card-accent-stripe {
            height: calc(100% - 24px) !important;
          }
          .customize-card:hover .card-image {
            transform: scale(1.06) !important;
          }
          .customize-card:hover .card-title {
            color: #fff !important;
          }
          .customize-card:hover .card-arrow {
            stroke: #f87171 !important;
            transform: translateX(4px) !important;
          }
        `}</style>
      </section>
    </>
  );
}
