"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import "@/public/css/racegear-deals.css";

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#e21b1b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FireIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 23C16.5 23 20 19.5 20 15C20 11 17 8.5 15 7C14.5 10 13 11.5 11.5 11.5C11.5 11.5 12.5 8 10 4C8.5 6 6 8 5 10.5C4 13 4 15 4 15C4 19.5 7.5 23 12 23Z" fill="url(#fire)" stroke="none" />
    <path d="M12 23C14.5 23 16.5 21 16.5 18.5C16.5 16 15 14.5 14 13.5C13.7 15 13 16 12 16C12 16 12.5 14.5 11 12C10 13.5 9 14.5 8.5 16C8 17.5 8 18.5 8 18.5C8 21 9.5 23 12 23Z" fill="url(#fire2)" stroke="none" />
    <defs>
      <linearGradient id="fire" x1="12" y1="4" x2="12" y2="23" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF4D00" />
        <stop offset="1" stopColor="#FF4D00" />
      </linearGradient>
      <linearGradient id="fire2" x1="12" y1="12" x2="12" y2="23" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF4D00" />
        <stop offset="1" stopColor="#FF4D00" />
      </linearGradient>
    </defs>
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3 7V12C3 17.25 6.75 22.13 12 23C17.25 22.13 21 17.25 21 12V7L12 2Z" stroke="#e21b1b" strokeWidth="1.5" fill="none" />
    <path d="M9 12L11 14L15 10" stroke="#e21b1b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// Wraps every occurrence of "Free" (case-insensitive) with a green highlight
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

const dealsData = [
  {
    category: "CUSTOM SINGLE LAYER SUIT",
    offers: [
      {
        id: "offer-1",
        tag: "OFFER 1",
        title: "SINGLE LAYER NOMEX CUSTOM SFI CERTIFIED RACE SUIT + CUSTOM NOMEX SFI CERTIFIED GLOVES",
        price: 649,
        badge: null,
        packageId: "single-suit-gloves",
        image: "/images/deals/offeer-1.webp",
        features: [
          "SFI 3.2A/1 certified single-layer fire suit",
          "SFI 3.3/5 Free gloves included",
          "Free Unlimited custom logo embroidery",
          "Free Unlimited custom suit colors",
          "Free worldwide shipping",
          "Free Unlimited mockup revisions",
          "Tailored for a perfect custom fit",
          "Free Enhanced lower-back comfort panel",
          "Free Strategic stretch panels for flexibility",
          "Free Boot Cuff Included",
          "Nomex® inner lining for safety",
          "Durable Meta-Para Aramid Nomex® outer shell",
        ],
      },
      {
        id: "offer-2",
        tag: "OFFER 2",
        title: "SINGLE LAYER NOMEX CUSTOM SFI CERTIFIED RACE SUIT + CUSTOM NOMEX SFI CERTIFIED GLOVES + NOMEX SFI CERTIFIED SHOES",
        price: 729,
        badge: "BEST VALUE",
        packageId: "single-suit-gloves-shoes",
        image: "/images/deals/offer-2.webp",
        features: [
          "SFI 3.2A/1 certified single-layer fire suit",
          "SFI 3.3/5 Free gloves included",
          "SFI 3.3/5 Free shoes included",
          "Free Unlimited custom logo embroidery",
          "Free Unlimited custom suit colors",
          "Free worldwide shipping",
          "Free Unlimited mockup revisions",
          "Tailored for a perfect custom fit",
          "Free Enhanced lower-back comfort panel",
          "Free Boot Cuff Included",
          "Strategic stretch panels for flexibility",
          "Nomex® inner lining for safety",
          "Durable Meta-Para Aramid Nomex® outer shell",
        ],
      },
    ],
  },
  {
    category: "CUSTOM DOUBLE LAYER SUIT",
    offers: [
      {
        id: "offer-3",
        tag: "OFFER 3",
        title: "DOUBLE LAYER NOMEX CUSTOM SFI CERTIFIED RACE SUIT + CUSTOM NOMEX GLOVES",
        price: 749,
        badge: null,
        packageId: "double-suit-gloves",
        image: "/images/deals/offer-3.webp",
        features: [
          "SFI 3.2A/5 certified double-layer suit",
          "SFI 3.3/5 Free gloves included",
          "Free Unlimited logo embroidery",
          "Unlimited color options",
          "Free shipping",
          "Free Unlimited mockup changes",
          "Made to your measurements",
          "Free Boot Cut Included",
          "Free Comfort-focused lower back",
          "Stretch panels for mobility",
          "Premium Nomex® lining",
          "Meta-Para Aramid Nomex® shell",
        ],
      },
      {
        id: "offer-4",
        tag: "OFFER 4",
        title: "DOUBLE LAYER NOMEX CUSTOM SFI CERTIFIED RACE SUIT + CUSTOM NOMEX GLOVES + CUSTOM NOMEX SHOES",
        price: 829,
        badge: "MOST POPULAR",
        packageId: "double-suit-gloves-shoes",
        image: "/images/deals/offer-4.webp",
        features: [
          "SFI 3.2A/5 certified double-layer fire suit",
          "SFI 3.3/5 Free gloves included",
          "SFI 3.3/5 Free shoes included",
          "Free Unlimited custom logo embroidery",
          "Free Unlimited custom suit colors",
          "Free worldwide shipping",
          "Free Unlimited mockup revisions",
          "Tailored for a perfect custom fit",
          "Free Enhanced lower-back comfort panel",
          "Free Boot Cuff Included",
          "Strategic stretch panels for flexibility",
          "Nomex® inner lining for safety",
          "Durable Meta-Para Aramid Nomex® outer shell",
        ],
      },
    ],
  },
  {
    category: "CUSTOM TRIPLE LAYER SUIT",
    offers: [
      {
        id: "offer-5",
        tag: "OFFER 5",
        title: "TRIPLE LAYER NOMEX CUSTOM SFI CERTIFIED RACE SUIT + CUSTOM NOMEX GLOVES",
        price: 849,
        badge: null,
        packageId: "triple-suit-gloves",
        image: "/images/deals/offer-5.webp",
        features: [
          "SFI 3.2A/5 certified triple-layer suit",
          "SFI 3.3/5 Free gloves included",
          "Free Unlimited logo embroidery",
          "Unlimited color options",
          "Free shipping",
          "Free Unlimited mockup changes",
          "Made to your measurements",
          "Free Boot Cut Included",
          "Free Comfort-focused lower back",
          "Stretch panels for mobility",
          "Premium Nomex® lining",
          "Meta-Para Aramid Nomex® shell",
        ],
      },
      {
        id: "offer-6",
        tag: "OFFER 6",
        title: "TRIPLE LAYER NOMEX CUSTOM SFI CERTIFIED RACE SUIT + CUSTOM NOMEX GLOVES + CUSTOM NOMEX SHOES",
        price: 929,
        badge: "PRO CHOICE",
        packageId: "triple-suit-gloves-shoes",
        image: "/images/deals/offer-6.webp",
        features: [
          "SFI 3.2A/5 certified triple-layer fire suit",
          "SFI 3.3/5 Free gloves included",
          "SFI 3.3/5 Free shoes included",
          "Free Unlimited custom logo embroidery",
          "Free Unlimited custom suit colors",
          "Free worldwide shipping",
          "Free Unlimited mockup revisions",
          "Tailored for a perfect custom fit",
          "Free Enhanced lower-back comfort panel",
          "Free Boot Cuff Included",
          "Strategic stretch panels for flexibility",
          "Nomex® inner lining for safety",
          "Durable Meta-Para Aramid Nomex® outer shell",
        ],
      },
    ],
  },
  {
    category: "CUSTOM KARTING SUIT",
    offers: [
      {
        id: "offer-7",
        tag: "OFFER 7",
        title: "CUSTOM KARTING SUIT + CUSTOM GLOVES",
        price: 315,
        badge: null,
        packageId: "karting-suit-gloves",
        image: "/images/deals/offer-7.webp",
        features: [
          "Unlimited color options",
          "Free Karting Gloves Included",
          "Free shipping",
          "Free Unlimited Sublimation",
          "Free Unlimited embroidery",
          "Free Unlimited mockup changes",
          "Lightweight construction",
          "Made to your measurements",
          "Comfort-focused lower back",
        ],
      },
      {
        id: "offer-8",
        tag: "OFFER 8",
        title: "CUSTOM KARTING SUIT + CUSTOM GLOVES + CUSTOM SHOES",
        price: 415,
        badge: "BUNDLE DEAL",
        packageId: "karting-suit-gloves-shoes",
        image: "/images/deals/offer-8.webp",
        features: [
          "Unlimited color options",
          "Free Karting Gloves Included",
          "Free Karting Shoes Included",
          "Free shipping",
          "Free Unlimited Sublimation",
          "Free Unlimited embroidery",
          "Free Unlimited mockup changes",
          "Lightweight construction",
          "Made to your measurements",
          "Comfort-focused lower back",
        ],
      },
    ],
  },
];


function DealCard({ offer }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: offer.badge
          ? "linear-gradient(165deg, #1a1a1a 0%, #0d0d0d 50%, #1a0000 100%)"
          : "linear-gradient(165deg, #141414 0%, #0a0a0a 100%)",
        borderRadius: "16px",
        border: offer.badge
          ? "1px solid rgba(226, 27, 27, 0.4)"
          : "1px solid rgba(255, 255, 255, 0.06)",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 10px 30px rgba(0,0,0,0.5)"
          : "0 4px 15px rgba(0,0,0,0.3)",
        flex: "1 1 380px",
        maxWidth: "480px",
        minWidth: "340px",
      }}
    >
      {/* Badge */}
      {offer.badge && (
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "linear-gradient(135deg, #e21b1b, #c41515)",
            color: "#fff",
            fontSize: "11px",
            fontWeight: "800",
            letterSpacing: "1.5px",
            padding: "6px 14px",
            borderRadius: "100px",
            zIndex: 10,
            fontFamily: "'Poppins', sans-serif",
            boxShadow: "0 4px 20px rgba(226,27,27,0.4)",
          }}
        >
          {offer.badge}
        </div>
      )}

      {/* Image */}
      <div
        className="deal-card-img-wrap"
        style={{
          width: "100%",
          height: "280px",
          background: "linear-gradient(145deg, #1f1f1f, #0f0f0f)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {offer.image ? (
          <img
            src={offer.image}
            alt={offer.tag}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <>
            {/* Decorative grid overlay (fallback) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(226,27,27,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(226,27,27,0.03) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* Placeholder content (fallback) */}
            <div style={{ textAlign: "center", zIndex: 1, padding: "20px" }}>
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  border: "2px solid rgba(226,27,27,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  background: "rgba(226,27,27,0.05)",
                }}
              >
                <ShieldIcon />
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,0.25)",
                  fontSize: "11px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  margin: 0,
                }}
              >
                Product Image
              </p>
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "28px 28px 32px" }}>
        {/* Offer Tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "12px",
          }}
        >
          <FireIcon />
          <span
            style={{
              color: "#e21b1b",
              fontSize: "14px",
              fontWeight: "700",
              letterSpacing: "2px",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {offer.tag}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            color: "#ffffff",
            fontSize: "17px",
            fontWeight: "700",
            lineHeight: "1.5",
            margin: "0 0 20px 0",
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "0.3px",
            textTransform: "uppercase",
            minHeight: "68px",
          }}
        >
          {offer.title}
        </h3>

        {/* Price */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
            <span
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "22px",
                fontWeight: "600",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              $
            </span>
            <span
              style={{
                color: "#ffffff",
                fontSize: "52px",
                fontWeight: "700",
                fontFamily: "'Poppins', sans-serif",
                lineHeight: 1,
                letterSpacing: "-1px",
              }}
            >
              {offer.price}
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "16px",
                fontWeight: "500",
                fontFamily: "'Poppins', sans-serif",
                marginLeft: "4px",
                letterSpacing: "1px",
              }}
            >
              USD
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: offer.badge
              ? "linear-gradient(to right, rgba(226,27,27,0.3), transparent)"
              : "linear-gradient(to right, rgba(255,255,255,0.08), transparent)",
            marginBottom: "20px",
          }}
        />

        {/* Features */}
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "0 0 28px 0",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {offer.features.map((feature, idx) => (
            <li
              key={idx}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                fontSize: "14px",
                color: "rgba(255,255,255,0.75)",
                lineHeight: "1.5",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <span style={{ flexShrink: 0, marginTop: "2px" }}>
                <CheckIcon />
              </span>
              {highlightFree(feature)}
            </li>
          ))}
        </ul>

        {/* CTA Button — uniform red for all cards */}
        <Link
          href={`/custom-race-suit/order?package=${offer.packageId}`}
          style={{
            width: "100%",
            padding: "16px 24px",
            background: "linear-gradient(135deg, #e21b1b, #c41515)",
            border: "none",
            borderRadius: "10px",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "700",
            letterSpacing: "2px",
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "'Poppins', sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.3s ease",
            boxShadow: "0 8px 30px rgba(226,27,27,0.25)",
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

export default function RacegearDeals() {
  const [activeCategory, setActiveCategory] = useState(0);
  const searchParams = useSearchParams();

  const categories = dealsData.map((d) => d.category);

  // Set active category from URL query param on mount
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const categoryIndex = categories.indexOf(categoryParam);
      if (categoryIndex !== -1) {
        setActiveCategory(categoryIndex);
      }
    }
  }, [searchParams, categories]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#070707",
        color: "#fff",
        fontFamily: "'Poppins', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        * { box-sizing: border-box; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        button:hover {
          filter: brightness(1.15) !important;
          transform: translateY(-1px);
        }
      `}</style>

      {/* Background texture */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(226,27,27,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }}
      />

      {/* Hero Section */}
      <section
        style={{
          padding: "100px 24px 60px",
          textAlign: "center",
          maxWidth: "900px",
          margin: "0 auto",
          position: "relative",
          animation: "fadeInUp 0.8s ease-out",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            width: "60px",
            height: "3px",
            background: "linear-gradient(to right, #e21b1b, #c41515)",
            margin: "0 auto 32px",
            borderRadius: "2px",
          }}
        />

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(226,27,27,0.08)",
            border: "1px solid rgba(226,27,27,0.2)",
            borderRadius: "100px",
            padding: "8px 20px",
            marginBottom: "28px",
          }}
        >
          <FireIcon />
          <span
            style={{
              color: "#e21b1b",
              fontSize: "14px",
              fontWeight: "700",
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Fire Deals
          </span>
        </div>



        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: "18px",
            lineHeight: "1.7",
            maxWidth: "680px",
            margin: "0 auto 40px",
            fontWeight: "400",
          }}
        >
          Grab the best racegear deals and build your complete race-ready
          outfit. SFI-certified suits, premium gloves, and racing shoes — fully
          customizable with unlimited colors, logos, and designs.
        </p>

        {/* Trust Badges */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            flexWrap: "wrap",
          }}
        >
          {["SFI Certified", "Free Shipping", "Custom Fit", "Unlimited Colors"].map(
            (badge) => (
              <div
                key={badge}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "13px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "600",
                }}
              >
                <ShieldIcon />
                {highlightFree(badge)}
              </div>
            )
          )}
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px 48px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(i)}
              style={{
                padding: "12px 24px",
                borderRadius: "100px",
                border:
                  activeCategory === i
                    ? "1px solid rgba(226,27,27,0.5)"
                    : "1px solid rgba(255,255,255,0.08)",
                background:
                  activeCategory === i
                    ? "rgba(226,27,27,0.1)"
                    : "rgba(255,255,255,0.02)",
                color:
                  activeCategory === i
                    ? "#e21b1b"
                    : "rgba(255,255,255,0.5)",
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "'Poppins', sans-serif",
                transition: "all 0.3s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Deals Grid - Show all categories */}
      {dealsData.map((section, sectionIdx) => (
        <section
          key={section.category}
          id={section.category.toLowerCase().replace(/\s+/g, "-")}
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px 80px",
            display: activeCategory === sectionIdx || activeCategory === -1 ? "block" : "none",
            animation: "fadeInUp 0.6s ease-out",
          }}
        >
          {/* Section Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                width: "4px",
                height: "32px",
                background: "linear-gradient(to bottom, #e21b1b, #a01010)",
                borderRadius: "2px",
              }}
            />
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "30px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1px",
                margin: 0,
                color: "#ffffff",
              }}
            >
              {section.category}
            </h2>
          </div>

          {/* Cards */}
          <div
            style={{
              display: "flex",
              gap: "24px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {section.offers.map((offer) => (
              <DealCard
                key={offer.id}
                offer={offer}
              />
            ))}
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section
        style={{
          padding: "80px 24px 100px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center bottom, rgba(226,27,27,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <h2
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(30px, 4vw, 46px)",
            fontWeight: "700",
            textTransform: "uppercase",
            margin: "0 0 16px 0",
            position: "relative",
            color: "#ffffff",
          }}
        >
          Ready to Hit the Track?
        </h2>
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "17px",
            maxWidth: "500px",
            margin: "0 auto 32px",
            lineHeight: "1.7",
            position: "relative",
          }}
        >
          Get your fully customized, SFI-certified racegear today.{" "}
          {highlightFree("Free")} unlimited mockup revisions included.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            style={{
              padding: "18px 48px",
              background: "linear-gradient(135deg, #e21b1b, #c41515)",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 8px 40px rgba(226,27,27,0.3)",
              position: "relative",
            }}
          >
            Start Customizing <ArrowRight />
          </button>
          <a href="/StandardPricing" style={{
            padding: "18px 36px",
            background: "transparent",
            border: "1.5px solid rgba(226,27,27,0.5)",
            borderRadius: "10px",
            color: "#e21b1b",
            fontSize: "15px",
            fontWeight: "700",
            letterSpacing: "2px",
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "'Poppins', sans-serif",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}>
            View Pricing <ArrowRight />
          </a>
        </div>
      </section>
    </div>
  );
}
