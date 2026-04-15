"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const products = [
  {
    title: "Racing Suit",
    image: "/images/home/suit.png",
    link: "/custom-race-suit",
    sfi: "SFI 3.2A/1 & 3.2A/5",
    specs: [
      "Durable Meta Para Aramid Nomex® outer shell for top-tier protection",
      "SFI 3.2A/1 & 5 Certified",
      "Premium Nomex® inner lining for maximum safety and fire resistance",
      "Tailored fit for comfort and precision on every body type",
      "Enhanced lower back stretch panel for extra support during long races",
      "Stretch panels at crotch, side, knee, elbow & inseam for full flexibility",
      "Unlimited color options so your suit perfectly matches your style",
      "Unlimited logo and embroidery options for full personalization",
    ],
  },
  {
    title: "Racing Shoes",
    image: "/images/home/shoes.png",
    link: "/custom-shoes",
    sfi: "SFI 3.3/5",
    specs: [
      "Premium cowhide leather outer shell for durability and classic style",
      "Meta Aramid Nomex® inner lining for fire-resistant protection",
      "Comfortable rubber sole designed for long-lasting support",
      "High-grip rubber outsole for precise control on pedals",
      "Included size label for easy sizing and identification",
      "SFI 3.3/5 Certified",
      "Available in multiple colors to match your style or suit",
      "Unlimited logo options for personal or team branding",
    ],
  },
  {
    title: "Racing Gloves",
    image: "/images/home/gloves.png",
    link: "/custom-gloves",
    sfi: "SFI 3.3/5",
    specs: [
      "2-layer Nomex® construction with inner and outer fire-resistant layers",
      "Front silicone palm for superior grip and pedal control",
      "Customizable stitching on inner or outer layer per your preference",
      "Back palm with DTF, digital, or vinyl sticker and screen printing",
      "Elastic cuff for secure and comfortable fit",
      "Available in multiple colors to match your style or racing suit",
      "SFI 3.3/5 Certified",
      "Included size label for easy sizing and identification",
    ],
  },
];

export default function ProductSpecsSection() {
  const [active, setActive] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  /* Detect touch/mobile — auto-open first card on mobile */
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth <= 600;
      setIsMobile(mobile);
      if (mobile) setActive((prev) => (prev === null ? 0 : prev));
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleToggle = (index) => {
    if (isMobile) {
      /* On mobile: tap to switch card; keep at least one open */
      setActive(index);
    } else {
      setActive(active === index ? null : index);
    }
  };

  return (
    <section className="gear-section">
      <div className="container">
        <div className="gear-section__header">
          <span className="gear-section__label">Premium Gear</span>
          <h2 className="gear-section__title">
            Race-Ready <span>Equipment</span>
          </h2>
          <p className="gear-section__sub">
            SFI certified gear engineered for performance and protection
          </p>
        </div>

        <div className="gear-grid">
          {products.map((item, index) => {
            const isActive = active === index;

            return (
              <div
                key={index}
                className={`gear-card${isActive ? " gear-card--active" : ""}`}
                onClick={() => handleToggle(index)}
                onMouseEnter={() => !isMobile && setActive(index)}
                onMouseLeave={() => !isMobile && setActive(null)}
              >
                {/* Base title (always visible when overlay is closed) */}
                <div className="gear-card__default">
                  <h3 className="gear-card__name">{item.title}</h3>
                </div>

                {/* Background image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="gear-image"
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                />

                {/* Glass overlay on hover/tap */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="gear-overlay"
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "100%", opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      {/* Top block: title + badge */}
                      <div className="gear-overlay__header">
                        <h3 className="gear-overlay__title">{item.title}</h3>
                        <div className="sfi-badge">{item.sfi}</div>
                      </div>

                      {/* Middle block: specs list — scrolls if needed */}
                      <ul className="gear-specs">
                        {item.specs.map((spec, i) => (
                          <li key={i}>
                            <span className="gear-specs__icon">✓</span>
                            {spec}
                          </li>
                        ))}
                      </ul>

                      {/* Bottom block: CTA — always pinned */}
                      <Link href={item.link} className="gear-cta-btn">
                        View Details →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
