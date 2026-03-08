"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "@/public/css/standard-pricing.css";

/* ── Highlight every occurrence of "Free" in green ── */
const highlightFree = (text) => {
  const parts = text.split(/(free)/i);
  return parts.map((part, i) =>
    /^free$/i.test(part) ? (
      <span
        key={i}
        style={{
          color: "#00e676",
          fontWeight: "800",
          background: "rgba(0,230,118,0.10)",
          borderRadius: "4px",
          padding: "0 4px",
          letterSpacing: "0.4px",
          textTransform: "uppercase",
          fontSize: "12px",
        }}
      >
        FREE
      </span>
    ) : (
      part
    )
  );
};

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


/* ───────────────────────── Data ───────────────────────── */

const pricingData = [
  {
    id: "single-layer",
    label: "SINGLE LAYER SUIT",
    title: "SINGLE LAYER NOMEX CUSTOM SFI CERTIFIED RACE SUIT",
    packageId: "single-suit",
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
    packageId: "double-suit",
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
    packageId: "triple-suit",
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
    packageId: "single-suit-gloves",
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
    packageId: "single-suit-gloves-shoes",
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
    packageId: "karting-suit-gloves",
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
              {highlightFree(feat)}
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
                  {highlightFree(spec)}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* CTA Button — uniform red for all cards */}
        <Link
          href={`/custom-race-suit/order?package=${item.packageId}`}
          style={{
            width: "100%",
            marginTop: "28px",
            padding: "16px 24px",
            background: "linear-gradient(135deg, #e21b1b, #c41515)",
            border: "none",
            borderRadius: "12px",
            color: "#ffffff",
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
            boxShadow: "0 8px 36px rgba(226,27,27,0.25)",
            textDecoration: "none",
            minHeight: "56px",
          }}
        >
          Customize Now <ArrowRight />
        </Link>
      </div>
    </div>
  );
}

/* ───────────────────────── Quick Compare Bar ───────────────────────── */

// function CompareBar() {
//   return (
//     <div style={{
//       maxWidth: "1100px",
//       margin: "0 auto 80px",
//       padding: "0 24px",
//     }}>
//       <div style={{
//         background: "linear-gradient(170deg, rgba(226,27,27,0.04), rgba(226,27,27,0.02))",
//         border: "1px solid rgba(226,27,27,0.08)",
//         borderRadius: "16px",
//         padding: "32px 40px",
//         display: "flex",
//         gap: "16px",
//         justifyContent: "space-between",
//         flexWrap: "wrap",
//         alignItems: "center",
//       }}>
//         <div>
//           <h3 style={{
//             fontFamily: "'Poppins', sans-serif",
//             fontSize: "22px",
//             fontWeight: "700",
//             textTransform: "uppercase",
//             margin: "0 0 6px 0",
//             color: "#ffffff",
//           }}>Not sure which suit?</h3>
//           <p style={{
//             color: "rgba(255,255,255,0.6)",
//             fontSize: "15px",
//             margin: 0,
//             fontFamily: "'Poppins', sans-serif",
//           }}>
//             Single Layer for drag & short tracks · Double Layer for most racing · Triple Layer for maximum protection
//           </p>
//         </div>
//         <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
//           {[
//             { label: "Single", layers: "3.2A/1", temp: "~3 sec" },
//             { label: "Double", layers: "3.2A/5", temp: "~10 sec" },
//             { label: "Triple", layers: "3.2A/5+", temp: "~15 sec" },
//           ].map((item) => (
//             <div key={item.label} style={{
//               textAlign: "center",
//               minWidth: "90px",
//             }}>
//               <div style={{
//                 fontSize: "14px",
//                 fontWeight: "700",
//                 color: "#e21b1b",
//                 fontFamily: "'Poppins', sans-serif",
//                 letterSpacing: "1.5px",
//                 marginBottom: "4px",
//               }}>{item.label}</div>
//               <div style={{
//                 fontSize: "13px",
//                 color: "rgba(255,255,255,0.5)",
//                 fontFamily: "'Poppins', sans-serif",
//               }}>SFI {item.layers}</div>
//               <div style={{
//                 fontSize: "12px",
//                 color: "rgba(255,255,255,0.35)",
//                 fontFamily: "'Poppins', sans-serif",
//               }}>Protection: {item.temp}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

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
    <div className="standard-pricing-page" style={{
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
      {/* <CompareBar /> */}

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

      {/* ═════════ BUNDLE & SAVE + CONTACT ═════════ */}
      <section style={{ padding: "60px 24px 120px", position: "relative" }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at center, rgba(226,27,27,0.03) 0%, transparent 65%)",
        }} />

        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          position: "relative",
        }}>

          {/* ── Bundle & Save card ── */}
          <div style={{
            background: "linear-gradient(155deg, #141414 0%, #0d0804 60%, #1a0a00 100%)",
            border: "1px solid rgba(226,27,27,0.3)",
            borderRadius: "20px",
            padding: "40px 36px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>
            <div style={{
              width: "44px", height: "44px",
              borderRadius: "12px",
              background: "rgba(226,27,27,0.1)",
              border: "1px solid rgba(226,27,27,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e21b1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
            </div>
            <h3 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "22px", fontWeight: "700",
              textTransform: "uppercase", letterSpacing: "0.5px",
              color: "#fff", margin: 0,
            }}>
              Bundle &amp; Save More
            </h3>
            <p style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "15px", lineHeight: "1.7",
              fontFamily: "'Poppins', sans-serif", margin: 0,
            }}>
              Pair your suit with SFI-certified gloves and shoes in one order and save. Our deal packages include {highlightFree("free")} shipping, {highlightFree("free")} mockups, and {highlightFree("free")} embroidery — all bundled at a lower price.
            </p>
            <Link href="/RacegearDeals" style={{
              marginTop: "8px",
              padding: "14px 28px",
              background: "linear-gradient(135deg, #e21b1b, #c41515)",
              borderRadius: "10px",
              color: "#fff",
              fontSize: "14px", fontWeight: "700",
              letterSpacing: "2px", textTransform: "uppercase",
              fontFamily: "'Poppins', sans-serif",
              display: "inline-flex", alignItems: "center", gap: "8px",
              textDecoration: "none",
              boxShadow: "0 6px 28px rgba(226,27,27,0.25)",
              alignSelf: "flex-start",
            }}>
              View Bundle Deals <ArrowRight />
            </Link>
          </div>

          {/* ── Have Questions card ── */}
          <div style={{
            background: "linear-gradient(155deg, #111111 0%, #0a0a0a 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "20px",
            padding: "40px 36px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>
            <div style={{
              width: "44px", height: "44px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </div>
            <h3 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "22px", fontWeight: "700",
              textTransform: "uppercase", letterSpacing: "0.5px",
              color: "#fff", margin: 0,
            }}>
              Have Questions?
            </h3>
            <p style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "15px", lineHeight: "1.7",
              fontFamily: "'Poppins', sans-serif", margin: 0,
            }}>
              Not sure which suit or package is right for your racing discipline? Our team is happy to help you choose the right gear, certifications, and fit for your needs.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "8px" }}>
              <Link href="/faqs" style={{
                padding: "14px 28px",
                background: "transparent",
                border: "1.5px solid rgba(255,255,255,0.12)",
                borderRadius: "10px",
                color: "rgba(255,255,255,0.75)",
                fontSize: "14px", fontWeight: "700",
                letterSpacing: "2px", textTransform: "uppercase",
                fontFamily: "'Poppins', sans-serif",
                display: "inline-flex", alignItems: "center", gap: "8px",
                textDecoration: "none",
              }}>
                Browse FAQs <ArrowRight />
              </Link>
              <Link href="/about-us" style={{
                padding: "14px 28px",
                background: "transparent",
                border: "1.5px solid rgba(255,255,255,0.12)",
                borderRadius: "10px",
                color: "rgba(255,255,255,0.75)",
                fontSize: "14px", fontWeight: "700",
                letterSpacing: "2px", textTransform: "uppercase",
                fontFamily: "'Poppins', sans-serif",
                display: "inline-flex", alignItems: "center", gap: "8px",
                textDecoration: "none",
              }}>
                About Us <ArrowRight />
              </Link>
            </div>
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
