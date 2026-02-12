"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const products = [
  {
    title: "Racing Suit",
    image: "images/home/suit_desc.png",
    link: "/custom-race-suit",
    sfi: "SFI 3.2A/5",
    specs: [
      "Durable Meta Para Aramid Nomex® outer shell",
      "Premium fire-resistant Nomex® inner lining",
      "Tailored fit for all body types",
      "Stretch lower back for long-race support",
      "Multi-zone stretch panels for full mobility",
      "Unlimited color customization",
      "Custom logos & embroidery available",
      "Unlimited design mockup revisions"
    ],
  },
  {
    title: "Racing Shoes",
    image: "/images/home/shose.png",
    link: "/shop?category=shoes",
    sfi: "SFI 3.3/5",
    specs: [
      "Premium cowhide leather outer shell",
      "Fire-resistant Nomex® inner lining",
      "Comfortable long-lasting rubber sole",
      "High-grip outsole for precise pedal control",
      "SFI 3.3/5 certified for safety",
      "Available in multiple color options",
      "Size label for easy identification",
      "Custom logo branding available"
    ],
  },
  {
    title: "Racing Gloves",
    image: "/images/home/globes.png",
    link: "/shop?category=gloves",
    sfi: "SFI 3.3/5",
    specs: [
      "2-layer Nomex® construction for fire protection",
      "Silicone palm for superior grip and control",
      "Custom stitching options available",
      "Multiple personalization print options",
      "Elastic cuff for secure, comfortable fit",
      "Available in multiple color options",
      "SFI 3.3/5 certified for safety",
      "Size label for easy identification"
    ],
  },
];

export default function ProductSpecsSection() {
  const [active, setActive] = useState(null);

  const handleToggle = (index) => {
    setActive(active === index ? null : index);
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
            SFI & FIA certified gear engineered for performance and protection
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
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
              >
                {/* Base title (always visible) */}
                <div className="gear-card__default">
                  <h3 className="gear-card__name">{item.title}</h3>
                </div>

                {/* Background image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="gear-image"
                  sizes="(max-width: 900px) 100vw, 33vw"
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
                      <h3 className="gear-overlay__title">{item.title}</h3>

                      <div className="sfi-badge">{item.sfi}</div>

                      <ul className="gear-specs">
                        {item.specs.map((spec, i) => (
                          <li key={i}>
                            <span className="gear-specs__icon">✓</span>
                            {spec}
                          </li>
                        ))}
                      </ul>

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
