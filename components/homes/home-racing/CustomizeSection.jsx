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
                  background: "#1a1a1a",
                  border: "1px solid rgba(220,38,38,0.6)",
                  color: "#dc2626",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                  borderRadius: "6px",
                  fontSize: "22px",
                  fontWeight: "bold",
                  lineHeight: 1,
                }}
              >
                ✕
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
          background: #2a1010 !important;
          border-color: #ef4444 !important;
          color: #f87171 !important;
          box-shadow: 0 0 12px rgba(220,38,38,0.3);
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
            className="customize-grid"
          >
            {customizeCategories.map((category, index) => {
              const hasSubs = !!(category.subOptions && category.subOptions.length);

              /* Angled-panel card, rebuilt 2026-08-06 to the client's reference.
                 The image now IS the shape: the panel is skewed and clipped, and
                 the photo fills it edge to edge — no padding, no border, no card
                 background behind it.

                 The panel is skewed -9deg and the image wrapper counter-skewed
                 +9deg so the photo itself stays upright inside a slanted frame.
                 A counter-skewed child is an upright rectangle inside a
                 parallelogram, so its corners would leave triangular gaps — the
                 wrapper is inset -14% left and right to overfill horizontally.
                 Overfilling sideways rather than scaling up avoids cropping the
                 top and bottom of the garment.

                 Alternate cards are nudged vertically (see .customize-card in
                 the style block) for the staggered baseline in the reference. */
              const cardInner = (
                <div
                  className={`customize-card ${index % 2 === 1 ? "is-raised" : ""}`}
                  style={{ position: "relative", cursor: "pointer" }}
                  {...(hasSubs
                    ? {
                      onClick: (e) => { e.preventDefault(); setModalOpen(true); },
                    }
                    : {})}
                >
                  {/* Skewed panel — the image fills this entirely */}
                  <div className="card-panel">
                    <div className="card-img-inner">
                      <Image
                        src={category.img}
                        alt={category.name}
                        width={400}
                        height={533}
                        className="card-image"
                        sizes="(max-width: 576px) 70vw, (max-width: 768px) 33vw, (max-width: 992px) 25vw, 20vw"
                      />
                    </div>

                    {/* Suits badge — counter-skewed so it reads level */}
                    {hasSubs && (
                      <div className="card-badge">4 Types</div>
                    )}

                    {/* Index stamp — counter-skewed */}
                    <div className="card-index">0{index + 1}</div>
                  </div>

                  {/* Label sits below the panel, unskewed */}
                  <div className="card-label">
                    <h3 className="card-title">{category.name}</h3>

                    {hasSubs ? (
                      <svg className="card-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    ) : (
                      <svg className="card-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    )}
                  </div>
                </div>
              );

              /* Suits → button, others → Link */
              const isLastItem = index === customizeCategories.length - 1;
              const lastClass = isLastItem ? 'last-grid-item' : '';
              return hasSubs ? (
                <div key={index} className={lastClass} style={{ textDecoration: "none", display: "block" }}>
                  {cardInner}
                </div>
              ) : (
                <Link key={index} href={category.href} className={lastClass} style={{ textDecoration: "none", display: "block" }}>
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

          /* Default desktop grid.
             The gap has to absorb the skew: a skewed panel extends sideways by
             height x tan(9deg) (~16% of its height) beyond its grid column, so
             the old 20px gap left the panels visibly touching. 52px gives a
             clean separation at this column width. */
          .customize-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 52px;
            align-items: start;
          }

          /* ── Angled panel card ──────────────────────────────────────
             The image is the shape: no padding, no border, no card
             background. Skew lives on .card-panel; .card-img-inner
             counter-skews so the photo stays upright. */
          .customize-card {
            transform: translateY(10px);
            transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          /* Staggered baseline — alternate cards ride higher */
          .customize-card.is-raised {
            transform: translateY(-10px);
          }

          /* --cut drives the notched corners. clip-path is resolved in the
             element's own coordinate space and the skew is applied after, so
             the cut edges lean with the panel instead of reading as flat
             chamfers stuck on a slanted shape. */
          .card-panel {
            --cut: 34px;
            position: relative;
            aspect-ratio: 5 / 7;
            overflow: hidden;
            transform: skewX(-9deg);
            clip-path: polygon(
              var(--cut) 0,
              100% 0,
              100% calc(100% - var(--cut)),
              calc(100% - var(--cut)) 100%,
              0 100%,
              0 var(--cut)
            );
            transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          /* Inset left/right so the counter-skewed rectangle overfills the
             parallelogram — otherwise the corners leave triangular gaps.
             14% covers a 9deg skew on a 5:7 panel with margin to spare. */
          .card-img-inner {
            position: absolute;
            top: 0;
            bottom: 0;
            left: -14%;
            right: -14%;
            transform: skewX(9deg);
          }

          .card-panel :global(.card-image) {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          /* Top scrim. Product photos vary — the t-shirt shot has a pale grey
             backdrop that swallowed the index number entirely. This keeps the
             badge and index legible whatever the photo behind them. */
          .card-panel::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 68px;
            background: linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, transparent 100%);
            pointer-events: none;
            z-index: 2;
          }

          /* Pushed right of the top-left notch — at y=14 the cut edge sits at
             x=20, so 44px clears it. Sitting at the old left:14px put the badge
             inside the clipped triangle and sliced it in half. */
          .card-badge {
            position: absolute;
            top: 14px;
            left: 44px;
            z-index: 3;
            transform: skewX(9deg);
            background: #dc2626;
            color: #fff;
            font-size: 9px;
            font-weight: 800;
            letter-spacing: 2px;
            text-transform: uppercase;
            padding: 4px 9px;
          }

          .card-index {
            position: absolute;
            top: 12px;
            right: 16px;
            z-index: 3;
            transform: skewX(9deg);
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 1px;
            font-family: monospace;
            color: rgba(255, 255, 255, 0.45);
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
          }

          .card-label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            margin-top: 16px;
          }

          .card-title {
            color: #ccc;
            font-size: 15px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin: 0;
            white-space: nowrap;
            transition: color 0.3s ease;
          }

          .card-arrow {
            flex-shrink: 0;
            transition: all 0.3s ease;
          }

          /* Desktop: 5 columns */
          @media (max-width: 1200px) {
            .customize-grid {
              grid-template-columns: repeat(5, 1fr) !important;
              gap: 38px !important;
            }
          }

          /* Tablet: 3 columns */
          @media (max-width: 991px) {
            .customize-grid {
              grid-template-columns: repeat(3, 1fr) !important;
              gap: 40px !important;
            }
          }

          /* Mobile: 2-column fixed grid, 2-2-1 with last centered */
          @media (max-width: 767px) {
            .customize-section {
              padding: 50px 0 60px !important;
              overflow: visible !important;
            }
            .customize-header {
              margin-bottom: 32px !important;
            }
            .customize-grid {
              display: grid !important;
              grid-template-columns: repeat(2, 1fr) !important;
              justify-content: center !important;
              gap: 26px !important;
              margin: 0 !important;
              padding: 0 !important;
              overflow: visible !important;
            }
            .customize-grid > * {
              width: 100% !important;
            }
            .customize-grid > .last-grid-item {
              grid-column: 1 / -1;
              width: 50% !important;
              margin: 0 auto !important;
            }
            /* A 9deg skew eats too much width on a narrow card — ease it off
               and drop the stagger so the two columns stay level. */
            .card-panel {
              transform: skewX(-5deg) !important;
              --cut: 20px;
            }
            .card-badge {
              left: 28px !important;
            }
            .card-img-inner {
              transform: skewX(5deg) !important;
              left: -9% !important;
              right: -9% !important;
            }
            .card-badge,
            .card-index {
              transform: skewX(5deg) !important;
            }
            .customize-card,
            .customize-card.is-raised {
              transform: none !important;
            }
            .card-label {
              margin-top: 11px !important;
            }
            .card-title {
              font-size: 11px !important;
              letter-spacing: 1px !important;
            }
            .card-arrow {
              width: 14px !important;
              height: 14px !important;
            }
            .scroll-hint-bar {
              display: none !important;
            }
          }

          /* Small mobile — skew off entirely, it reads as a mistake this narrow */
          @media (max-width: 400px) {
            .customize-grid {
              gap: 10px !important;
            }
            .card-panel {
              transform: none !important;
              --cut: 16px;
            }
            .card-badge {
              left: 22px !important;
            }
            .card-img-inner {
              transform: none !important;
              left: 0 !important;
              right: 0 !important;
            }
            .card-badge,
            .card-index {
              transform: none !important;
            }
          }

          /* Card hover — the panel leans a touch further and the photo pushes in */
          .customize-card:hover .card-panel {
            transform: skewX(-11deg);
          }
          .customize-card:hover :global(.card-image) {
            transform: scale(1.07);
          }
          .customize-card:hover .card-title {
            color: #fff;
          }
          .customize-card:hover .card-arrow {
            stroke: #f87171;
            transform: translateX(4px);
          }

          /* Honour reduced-motion: keep the shape, drop the movement */
          @media (prefers-reduced-motion: reduce) {
            .customize-card,
            .card-panel,
            .card-arrow,
            .customize-card :global(.card-image) {
              transition: none !important;
            }
            .customize-card:hover .card-panel {
              transform: skewX(-9deg);
            }
            .customize-card:hover :global(.card-image) {
              transform: none;
            }
          }
        `}</style>
      </section>
    </>
  );
}
