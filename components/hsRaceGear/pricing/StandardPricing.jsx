"use client";

import { useState, useEffect, useRef } from "react";
import "@/public/css/standard-pricing.css";

/* ───────────────────────── SVG Icons ───────────────────────── */

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke="#e21b1b" strokeWidth="1.2" fill="rgba(226,27,27,0.06)" />
    <path d="M5 8.2L7.2 10.4L11 5.6" stroke="#e21b1b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SpecDot = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="3" y="3" width="8" height="8" rx="2" fill="rgba(226,27,27,0.15)" stroke="rgba(226,27,27,0.4)" strokeWidth="0.8" />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const TagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e21b1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const SuitIcon = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
    <path d="M24 4C20 4 16 7 15 10L12 20V40C12 42 14 44 16 44H32C34 44 36 42 36 40V20L33 10C32 7 28 4 24 4Z" stroke="rgba(226,27,27,0.35)" strokeWidth="1.5" fill="rgba(226,27,27,0.04)" />
    <path d="M18 10C18 10 20 14 24 14C28 14 30 10 30 10" stroke="rgba(226,27,27,0.25)" strokeWidth="1.2" fill="none" />
    <path d="M20 24H28M20 30H28M20 36H28" stroke="rgba(226,27,27,0.15)" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const GloveIcon = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
    <path d="M16 44V28L12 16C11 13 13 10 16 10V6C16 4 18 2 20 4V10H22V4C22 2 24 0 26 2V10H28V6C28 4 30 2 32 4V10C35 10 37 13 36 16L32 28V44H16Z" stroke="rgba(226,27,27,0.35)" strokeWidth="1.5" fill="rgba(226,27,27,0.04)" />
  </svg>
);

const ShoeIcon = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
    <path d="M8 32C8 32 10 24 14 22C18 20 22 18 24 16C26 14 30 12 34 14C38 16 42 22 42 26V32C42 34 40 36 38 36H12C10 36 8 34 8 32Z" stroke="rgba(226,27,27,0.35)" strokeWidth="1.5" fill="rgba(226,27,27,0.04)" />
    <path d="M14 32H38" stroke="rgba(226,27,27,0.2)" strokeWidth="1" strokeDasharray="2 3" />
  </svg>
);

const KartIcon = () => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
    <circle cx="12" cy="38" r="5" stroke="rgba(226,27,27,0.35)" strokeWidth="1.5" fill="rgba(226,27,27,0.04)" />
    <circle cx="36" cy="38" r="5" stroke="rgba(226,27,27,0.35)" strokeWidth="1.5" fill="rgba(226,27,27,0.04)" />
    <path d="M8 30H40L38 22H28L24 12H18L14 22H10L8 30Z" stroke="rgba(226,27,27,0.35)" strokeWidth="1.5" fill="rgba(226,27,27,0.04)" />
    <path d="M22 22L24 12" stroke="rgba(226,27,27,0.2)" strokeWidth="1" />
  </svg>
);

const LayerIcon = ({ layers = 1 }) => (
  <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
    {layers >= 1 && <path d="M24 8L6 18L24 28L42 18L24 8Z" stroke="rgba(226,27,27,0.35)" strokeWidth="1.5" fill="rgba(226,27,27,0.04)" />}
    {layers >= 2 && <path d="M6 24L24 34L42 24" stroke="rgba(226,27,27,0.25)" strokeWidth="1.3" fill="none" />}
    {layers >= 3 && <path d="M6 30L24 40L42 30" stroke="rgba(226,27,27,0.18)" strokeWidth="1.1" fill="none" />}
  </svg>
);

/* ───────────────────────── Data ───────────────────────── */

const pricingData = [
  {
    id: "single-layer",
    label: "SINGLE LAYER SUIT",
    title: "SINGLE LAYER NOMEX CUSTOM SFI CERTIFIED RACE SUIT",
    price: 549,
    icon: "suit",
    imagePlaceholder: "/images/pricing/single-layer-suit.jpg",
    certification: "SFI 3.2A/1",
    included: [
      "SFI 3.2A/1 certified single-layer fire suit",
      "Free Unlimited custom logo embroidery",
      "Free Unlimited custom suit colors (including white)",
      "Free worldwide shipping",
      "Free Unlimited mockup revisions",
      "Free Boot Cuff Included",
    ],
    specs: [
      "Tailored for a perfect custom fit",
      "Free Enhanced lower-back comfort panel",
      "Strategic stretch panels for flexibility",
      "Nomex® inner lining for safety",
      "Durable Meta-Para Aramid Nomex® outer shell",
    ],
  },
  {
    id: "double-layer",
    label: "DOUBLE LAYER SUIT",
    title: "DOUBLE LAYER NOMEX CUSTOM SFI CERTIFIED RACE SUIT",
    price: 649,
    icon: "layer2",
    imagePlaceholder: "/images/pricing/double-layer-suit.jpg",
    certification: "SFI 3.2A/5",
    popular: true,
    included: [
      "SFI 3.2A/5 certified double-layer fire suit",
      "Free & unlimited custom logo embroidery",
      "Free custom suit unlimited colors (including white)",
      "Free shipping worldwide",
      "Free Unlimited mockup revisions for you",
      "Free Boot Cuff Included",
    ],
    specs: [
      "Tailored for a perfect and seamless custom fit",
      "Free Enhanced lower-back comfort panel",
      "Strategic stretch panels for added flexibility",
      "Nomex® inner lining for safety",
      "Durable Meta-Para Aramid Nomex® outer shell",
    ],
  },
  {
    id: "triple-layer",
    label: "TRIPLE LAYER SUIT",
    title: "TRIPLE LAYER NOMEX CUSTOM SFI CERTIFIED RACE SUIT",
    price: 749,
    icon: "layer3",
    imagePlaceholder: "/images/pricing/triple-layer-suit.jpg",
    certification: "SFI 3.2A/5",
    included: [
      "SFI 3.2A/5 certified triple-layer fire suit",
      "Free & unlimited custom logo embroidery",
      "Free custom suit unlimited colors (including white)",
      "Free shipping worldwide",
      "Free Unlimited mockup changes for you",
      "Free Boot Cuff Included",
    ],
    specs: [
      "Made to your measurements",
      "Free Enhanced lower-back comfort panel",
      "Strategic stretch panels for extra flexibility",
      "Nomex® inner lining for safety",
      "Durable Meta-Para Aramid Nomex® outer shell",
    ],
  },
  {
    id: "gloves",
    label: "RACING GLOVES",
    title: "CUSTOM SFI RATED NOMEX GLOVES",
    price: 189,
    icon: "glove",
    imagePlaceholder: "/images/pricing/racing-gloves.jpg",
    certification: "SFI 3.3/5",
    included: [
      "2-layer Nomex® fire-resistant construction",
      "Front silicone palm for ultimate grip",
      "Customizable stitching options",
      "Elastic cuff for secure fit",
      "Multiple color options (including white)",
      "SFI 3.3/5 certified",
      "Included size label",
      "Free Shipping",
    ],
    specs: [
      "Back palm personalization (DTF, digital, vinyl, or screen print)",
    ],
  },
  {
    id: "shoes",
    label: "RACING SHOES",
    title: "CUSTOM SFI RATED NOMEX SHOES",
    price: 285,
    icon: "shoe",
    imagePlaceholder: "/images/pricing/racing-shoes.jpg",
    certification: "SFI 3.3/5",
    included: [
      "Premium cowhide leather shell",
      "Meta Aramid Nomex® fire lining",
      "Comfort rubber sole",
      "High-grip outsole for pedal control",
      "Included size label",
      "SFI 3.3/5 certified",
      "Multiple color options (including white)",
      "Unlimited logo customization",
      "Free Shipping",
    ],
    specs: [],
  },
  {
    id: "karting",
    label: "KARTING SUIT",
    title: "CUSTOM KARTING SUIT",
    price: 289,
    icon: "kart",
    imagePlaceholder: "/images/pricing/karting-suit.jpg",
    certification: null,
    included: [
      "Unlimited color options (including white)",
      "Free shipping",
      "Sublimation",
      "Unlimited embroidery",
    ],
    specs: [
      "Unlimited mockup changes",
      "Lightweight construction",
      "Made to your measurements",
      "Comfort-focused lower back",
    ],
  },
];

/* ───────────────────────── Icon Map ───────────────────────── */

function ProductIcon({ type }) {
  switch (type) {
    case "suit": return <LayerIcon layers={1} />;
    case "layer2": return <LayerIcon layers={2} />;
    case "layer3": return <LayerIcon layers={3} />;
    case "glove": return <GloveIcon />;
    case "shoe": return <ShoeIcon />;
    case "kart": return <KartIcon />;
    default: return <SuitIcon />;
  }
}

/* ───────────────────────── Animated Counter ───────────────────────── */

function AnimatedPrice({ price, isVisible }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const end = price;
    const duration = 800;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [price, isVisible]);

  return <>{display}</>;
}

/* ───────────────────────── Pricing Card ───────────────────────── */

function PricingCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isSuit = ["single-layer", "double-layer", "triple-layer"].includes(item.id);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? "translateY(-10px) scale(1.01)"
            : "translateY(0) scale(1)"
          : "translateY(40px) scale(0.97)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s`,
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        background: item.popular
          ? "linear-gradient(170deg, #141414 0%, #0d0804 60%, #1a0a00 100%)"
          : "linear-gradient(170deg, #111111 0%, #0a0a0a 100%)",
        border: item.popular
          ? "1px solid rgba(226,27,27,0.35)"
          : "1px solid rgba(255,255,255,0.05)",
        boxShadow: hovered
          ? item.popular
            ? "0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(226,27,27,0.08), inset 0 1px 0 rgba(226,27,27,0.1)"
            : "0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)"
          : "0 8px 40px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Popular ribbon */}
      {item.popular && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, transparent, #e21b1b, #a01010, #e21b1b, transparent)",
          zIndex: 10,
        }} />
      )}

      {/* Popular badge */}
      {item.popular && (
        <div style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "linear-gradient(135deg, #e21b1b, #c41515)",
          color: "#fff",
          fontSize: "11px",
          fontWeight: "800",
          letterSpacing: "2px",
          padding: "6px 16px",
          borderRadius: "100px",
          zIndex: 10,
          fontFamily: "'Poppins', sans-serif",
          boxShadow: "0 4px 24px rgba(226,27,27,0.4)",
          textTransform: "uppercase",
        }}>
          Most Popular
        </div>
      )}

      {/* ─── IMAGE PLACEHOLDER ─── */}
      <div style={{
        width: "100%",
        height: isSuit ? "260px" : "220px",
        background: "linear-gradient(160deg, #181818, #0c0c0c)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {/* Subtle animated diagonal lines */}
        <div style={{
          position: "absolute",
          inset: "-50%",
          background: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            rgba(226,27,27,0.015) 40px,
            rgba(226,27,27,0.015) 41px
          )`,
          transform: hovered ? "translate(10px, -10px)" : "translate(0, 0)",
          transition: "transform 1.2s ease",
        }} />

        {/* Center icon placeholder */}
        <div style={{
          textAlign: "center",
          zIndex: 1,
          transform: hovered ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            border: "1px solid rgba(226,27,27,0.12)",
            background: "rgba(226,27,27,0.03)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 14px",
            backdropFilter: "blur(10px)",
          }}>
            <ProductIcon type={item.icon} />
          </div>
          <p style={{
            color: "rgba(255,255,255,0.35)",
            fontSize: "12px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            fontFamily: "'Poppins', sans-serif",
            margin: 0,
          }}>
            Product Image
          </p>
          {/* 
            Replace placeholder with your image:
            <img src={item.imagePlaceholder} alt={item.title} 
              style={{ width:'100%', height:'100%', objectFit:'cover', position:'absolute', inset:0 }} />
          */}
        </div>

        {/* Gradient fade */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "100px",
          background: item.popular
            ? "linear-gradient(to top, #0d0804, transparent)"
            : "linear-gradient(to top, #0a0a0a, transparent)",
          pointerEvents: "none",
        }} />

        {/* SFI Certification badge */}
        {item.certification && (
          <div style={{
            position: "absolute",
            bottom: "16px",
            left: "20px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(226,27,27,0.15)",
            borderRadius: "8px",
            padding: "6px 12px",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7V12C3 17.25 6.75 22.13 12 23C17.25 22.13 21 17.25 21 12V7L12 2Z" stroke="#e21b1b" strokeWidth="1.5" fill="none" />
              <path d="M9 12L11 14L15 10" stroke="#e21b1b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{
              color: "#e21b1b",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "1.5px",
              fontFamily: "'Poppins', sans-serif",
            }}>
              {item.certification}
            </span>
          </div>
        )}
      </div>

      {/* ─── CONTENT ─── */}
      <div style={{
        padding: "28px 28px 32px",
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}>
        {/* Category tag */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "10px",
          alignSelf: "flex-start",
        }}>
          <TagIcon />
          <span style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "2.5px",
            fontFamily: "'Poppins', sans-serif",
            textTransform: "uppercase",
          }}>
            {item.label}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          color: "#ffffff",
          fontSize: "17px",
          fontWeight: "700",
          lineHeight: "1.4",
          margin: "0 0 20px 0",
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: "0.3px",
          textTransform: "uppercase",
        }}>
          {item.title}
        </h3>

        {/* Price Block */}
        <div style={{
          display: "flex",
          alignItems: "baseline",
          gap: "2px",
          marginBottom: "24px",
        }}>
          <span style={{
            color: item.popular ? "#e21b1b" : "rgba(255,255,255,0.5)",
            fontSize: "22px",
            fontWeight: "600",
            fontFamily: "'Poppins', sans-serif",
          }}>$</span>
          <span style={{
            color: "#fff",
            fontSize: "52px",
            fontWeight: "700",
            fontFamily: "'Poppins', sans-serif",
            lineHeight: 1,
            letterSpacing: "-2px",
            background: item.popular
              ? "linear-gradient(135deg, #fff 40%, #c41515)"
              : "none",
            WebkitBackgroundClip: item.popular ? "text" : "unset",
            WebkitTextFillColor: item.popular ? "transparent" : "#fff",
          }}>
            <AnimatedPrice price={item.price} isVisible={visible} />
          </span>
          <span style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "16px",
            fontWeight: "500",
            fontFamily: "'Poppins', sans-serif",
            marginLeft: "6px",
            letterSpacing: "1.5px",
          }}>USD</span>
        </div>

        {/* Divider with label */}
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <div style={{
            height: "1px",
            background: item.popular
              ? "linear-gradient(to right, rgba(226,27,27,0.25), rgba(226,27,27,0.05), transparent)"
              : "linear-gradient(to right, rgba(255,255,255,0.06), transparent)",
          }} />
          <span style={{
            position: "absolute",
            top: "-8px",
            left: "0",
            background: item.popular ? "#0d0804" : "#0a0a0a",
            paddingRight: "12px",
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "2.5px",
            color: item.popular ? "#e21b1b" : "rgba(255,255,255,0.35)",
            fontFamily: "'Poppins', sans-serif",
            textTransform: "uppercase",
          }}>
            Included
          </span>
        </div>

        {/* Features */}
        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 6px 0",
          display: "flex",
          flexDirection: "column",
          gap: "9px",
          flex: 1,
        }}>
          {item.included.map((feat, idx) => (
            <li key={idx} style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              fontSize: "14px",
              color: "#ffffff",
              lineHeight: "1.5",
              fontFamily: "'Poppins', sans-serif",
            }}>
              <span style={{ flexShrink: 0, marginTop: "1px" }}><CheckIcon /></span>
              {feat}
            </li>
          ))}
        </ul>

        {/* Specs section */}
        {item.specs.length > 0 && (
          <>
            <div style={{ position: "relative", margin: "16px 0 14px" }}>
              <div style={{
                height: "1px",
                background: "linear-gradient(to right, rgba(255,255,255,0.04), transparent)",
              }} />
              <span style={{
                position: "absolute",
                top: "-8px",
                left: "0",
                background: item.popular ? "#0d0804" : "#0a0a0a",
                paddingRight: "12px",
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "2.5px",
                color: "rgba(255,255,255,0.3)",
                fontFamily: "'Poppins', sans-serif",
                textTransform: "uppercase",
              }}>
                Specs
              </span>
            </div>
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 0 0",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}>
              {item.specs.map((spec, idx) => (
                <li key={idx} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  fontSize: "13px",
                  color: "#e0e0e0",
                  lineHeight: "1.5",
                  fontFamily: "'Poppins', sans-serif",
                }}>
                  <span style={{ flexShrink: 0, marginTop: "1px" }}><SpecDot /></span>
                  {spec}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* CTA Button */}
        <button style={{
          width: "100%",
          marginTop: "28px",
          padding: "16px 24px",
          background: item.popular
            ? "linear-gradient(135deg, #e21b1b, #c41515)"
            : "transparent",
          border: item.popular ? "none" : "1.5px solid rgba(226,27,27,0.4)",
          borderRadius: "12px",
          color: item.popular ? "#fff" : "#e21b1b",
          fontSize: "14px",
          fontWeight: "700",
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          cursor: "pointer",
          fontFamily: "'Poppins', sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          transition: "all 0.3s ease",
          boxShadow: item.popular ? "0 8px 36px rgba(226,27,27,0.25)" : "none",
        }}>
          Customize Now <ArrowRight />
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── Quick Compare Bar ───────────────────────── */

function CompareBar() {
  return (
    <div style={{
      maxWidth: "1100px",
      margin: "0 auto 80px",
      padding: "0 24px",
    }}>
      <div style={{
        background: "linear-gradient(170deg, rgba(226,27,27,0.04), rgba(226,27,27,0.02))",
        border: "1px solid rgba(226,27,27,0.08)",
        borderRadius: "16px",
        padding: "32px 40px",
        display: "flex",
        gap: "16px",
        justifyContent: "space-between",
        flexWrap: "wrap",
        alignItems: "center",
      }}>
        <div>
          <h3 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "22px",
            fontWeight: "700",
            textTransform: "uppercase",
            margin: "0 0 6px 0",
            color: "#ffffff",
          }}>Not sure which suit?</h3>
          <p style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "15px",
            margin: 0,
            fontFamily: "'Poppins', sans-serif",
          }}>
            Single Layer for drag & short tracks · Double Layer for most racing · Triple Layer for maximum protection
          </p>
        </div>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {[
            { label: "Single", layers: "3.2A/1", temp: "~3 sec" },
            { label: "Double", layers: "3.2A/5", temp: "~10 sec" },
            { label: "Triple", layers: "3.2A/5+", temp: "~15 sec" },
          ].map((item) => (
            <div key={item.label} style={{
              textAlign: "center",
              minWidth: "90px",
            }}>
              <div style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#e21b1b",
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "1.5px",
                marginBottom: "4px",
              }}>{item.label}</div>
              <div style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "'Poppins', sans-serif",
              }}>SFI {item.layers}</div>
              <div style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.35)",
                fontFamily: "'Poppins', sans-serif",
              }}>Protection: {item.temp}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Main Page Component ───────────────────────── */

export default function StandardPricing() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const suits = pricingData.filter((p) =>
    ["single-layer", "double-layer", "triple-layer"].includes(p.id)
  );
  const accessories = pricingData.filter((p) =>
    ["gloves", "shoes"].includes(p.id)
  );
  const karting = pricingData.filter((p) => p.id === "karting");

  return (
    <div style={{
      minHeight: "100vh",
      background: "#070707",
      color: "#ffffff",
      fontFamily: "'Poppins', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Fonts */}
      <style>{`
        * { box-sizing: border-box; margin: 0; }
        html { scroll-behavior: smooth; }
        body { background: #070707; color: #fff; }
        button:hover { filter: brightness(1.15) !important; }
        ::selection { background: rgba(226,27,27,0.3); color: #fff; }
        h1, h2, h3, h4, h5, h6 { color: #ffffff; }
        a { color: #e21b1b; text-decoration: none; }
        a:hover { color: #c41515; }
      `}</style>

      {/* ─── Background layers ─── */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle at 50% 0%, rgba(226,27,27,0.03) 0%, transparent 50%)",
      }} />
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(255,255,255,0.012) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      {/* ═════════════════════ HERO ═════════════════════ */}
      <section style={{
        padding: "120px 24px 80px",
        textAlign: "center",
        maxWidth: "960px",
        margin: "0 auto",
        position: "relative",
      }}>
        {/* Floating accent */}
        <div style={{
          position: "absolute",
          top: "60px",
          left: "50%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(226,27,27,0.04) 0%, transparent 70%)",
          transform: `translateX(-50%) translateY(${scrollY * 0.1}px)`,
          pointerEvents: "none",
        }} />

        {/* Top line */}
        <div style={{
          width: "48px",
          height: "2px",
          background: "linear-gradient(to right, #e21b1b, #c41515)",
          margin: "0 auto 36px",
        }} />

        {/* Pill badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(226,27,27,0.06)",
          border: "1px solid rgba(226,27,27,0.12)",
          borderRadius: "100px",
          padding: "8px 24px",
          marginBottom: "32px",
        }}>
          <TagIcon />
          <span style={{
            color: "#e21b1b",
            fontSize: "14px",
            fontWeight: "700",
            letterSpacing: "3px",
            textTransform: "uppercase",
            fontFamily: "'Poppins', sans-serif",
          }}>Standard Pricing</span>
        </div>

        {/* <h1 style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "clamp(38px, 6.5vw, 72px)",
          fontWeight: "700",
          lineHeight: "1.02",
          textTransform: "uppercase",
          margin: "0 0 24px 0",
          letterSpacing: "-1px",
        }}>
          <span style={{ color: "#fff" }}>HS Racegear</span>
          <br />
          <span style={{
            background: "linear-gradient(135deg, #e21b1b 0%, #a01010 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>Pricing</span>
        </h1> */}

        <p style={{
          color: "rgba(255,255,255,0.65)",
          fontSize: "18px",
          lineHeight: "1.75",
          maxWidth: "700px",
          margin: "0 auto 48px",
          fontWeight: "400",
        }}>
          Explore our affordable race gear options designed for every racer.
          From SFI-certified suits to gloves and racing shoes — fully customizable
          with unlimited colors, logos, and designs.
        </p>

        {/* Quick nav anchors */}
        <div style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
          {[
            { label: "Race Suits", href: "#suits" },
            { label: "Gloves & Shoes", href: "#accessories" },
            { label: "Karting", href: "#karting" },
          ].map((nav) => (
            <a key={nav.label} href={nav.href} style={{
              padding: "10px 22px",
              borderRadius: "100px",
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.02)",
              color: "rgba(255,255,255,0.6)",
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}>
              {nav.label}
            </a>
          ))}
        </div>
      </section>

      {/* ═════════ SECTION: RACE SUITS (3 column) ═════════ */}
      <section id="suits" style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 24px 60px",
      }}>
        <SectionHeader title="SFI Race Suits" subtitle="Custom Nomex® fire-rated suits built to your exact measurements" />
        <div style={{
          display: "grid",
          color: "#ffffff",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "24px",
        }}>
          {suits.map((item, i) => (
            <PricingCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ═════════ COMPARE BAR ═════════ */}
      <CompareBar />

      {/* ═════════ SECTION: ACCESSORIES (2 column) ═════════ */}
      <section id="accessories" style={{
        maxWidth: "880px",
        margin: "0 auto",
        padding: "0 24px 80px",
      }}>
        <SectionHeader title="Racing Accessories" subtitle="SFI-certified gloves and shoes to complete your setup" />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
        }}>
          {accessories.map((item, i) => (
            <PricingCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ═════════ SECTION: KARTING (single centered) ═════════ */}
      <section id="karting" style={{
        maxWidth: "480px",
        margin: "0 auto",
        padding: "0 24px 80px",
      }}>
        <SectionHeader title="Karting" subtitle="Lightweight custom suits built for speed" />
        {karting.map((item, i) => (
          <PricingCard key={item.id} item={item} index={i} />
        ))}
      </section>

      {/* ═════════ BOTTOM CTA ═════════ */}
      <section style={{
        padding: "80px 24px 120px",
        textAlign: "center",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at center bottom, rgba(226,27,27,0.05) 0%, transparent 60%)",
        }} />

        <div style={{
          maxWidth: "600px",
          margin: "0 auto",
          position: "relative",
        }}>
          <div style={{
            width: "48px", height: "2px",
            background: "linear-gradient(to right, #e21b1b, #c41515)",
            margin: "0 auto 28px",
          }} />

          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(30px, 4vw, 46px)",
            fontWeight: "700",
            textTransform: "uppercase",
            margin: "0 0 14px 0",
            color: "#ffffff",
          }}>
            Build Your Custom Setup
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "17px",
            maxWidth: "460px",
            margin: "0 auto 36px",
            lineHeight: "1.7",
          }}>
            Every piece is made to your exact measurements with unlimited revisions.
            Free worldwide shipping on all orders.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{
              padding: "17px 44px",
              background: "linear-gradient(135deg, #e21b1b, #c41515)",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 8px 40px rgba(226,27,27,0.3)",
            }}>
              Start Customizing <ArrowRight />
            </button>
            <a href="/RacegearDeals" style={{
              padding: "17px 36px",
              background: "transparent",
              border: "1.5px solid rgba(226,27,27,0.3)",
              borderRadius: "12px",
              color: "#e21b1b",
              fontSize: "15px",
              fontWeight: "700",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}>
              View Deals
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ───────────────────────── Section Header ───────────────────────── */

function SectionHeader({ title, subtitle }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      gap: "16px",
      marginBottom: "44px",
    }}>
      <div style={{
        width: "4px",
        height: "36px",
        background: "linear-gradient(to bottom, #e21b1b, #c41515)",
        borderRadius: "2px",
        flexShrink: 0,
        marginTop: "2px",
      }} />
      <div>
        <h2 style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "32px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "1px",
          margin: "0 0 4px 0",
          color: "#ffffff",
        }}>
          {title}
        </h2>
        <p style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: "16px",
          margin: 0,
          fontFamily: "'Poppins', sans-serif",
        }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}
