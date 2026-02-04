"use client";
import React from "react";
import Link from "next/link";

const specsData = {
  suits: {
    title: "Suit Specifications",
    icon: "icon-user",
    specs: [
      "Constructed with a durable Meta Para Aramid Nomex® outer shell for top-tier protection",
      "SFI 3.2A/1 Certified",
      "SFI 3.2A/5 Certified",
      "Premium Nomex® inner lining designed for maximum safety and fire resistance",
      "Tailored fit for comfort and precision on every body type",
      "Enhanced lower back/ stretch panel to provide extra support during long races",
      "Strategically placed stretch panels for optimal flexibility and movement (crotch, side, knee, elbow, inseam stretch panel and inside arm stretch panel)",
      "Unlimited color options so your suit perfectly matches your style",
      "Unlimited logo and embroidery options for full personalization",
      "Unlimited mockup revisions to ensure your suit design is exactly how you wanted.",
    ],
  },
  shoes: {
    title: "Shoes Specifications",
    icon: "icon-box",
    specs: [
      "Premium cowhide leather outer shell for durability and classic style",
      "Meta Aramid Nomex® inner lining for fire-resistant protection",
      "Comfortable rubber sole designed for long-lasting support",
      "High-grip rubber outsole for precise control on pedals",
      "Included size label for easy sizing and identification",
      "SFI 3.3/5 certification tag for verified safety compliance",
      "Available in multiple colors to match your style or suit",
      "Unlimited logo options for personal or team branding",
    ],
  },
  gloves: {
    title: "Gloves Specifications",
    icon: "icon-delivery",
    specs: [
      "2-layer Nomex® construction with both inner and outer layers for fire-resistant protection",
      "Front silicone palm for superior grip and pedal control",
      "Customizable stitching on inner or outer layer according to your preference",
      "Back palm with DTF, digital, or vinyl sticker and screen printing for personalization options",
      "Elastic cuff for secure and comfortable fit",
      "Available in multiple colors to match your style or racing suit",
      "SFI 3.3/5 certification tag for verified safety compliance",
      "Included size label for easy sizing and identification",
    ],
  },
};

export default function DriversSection() {
  return (
    <section className="drivers-section" style={{ backgroundColor: "#000", color: "#fff", }}>
      <div className="container">
        {/* Specs Grid */}
        <div className="row">
          {Object.entries(specsData).map(([key, data]) => (
            <div key={key} className="col-12 col-md-6 col-lg-4">
              <div
                className="spec-card h-100 p-4"
                style={{
                  backgroundColor: "#111",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  border: "1px solid #222"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1a1a1a";
                  e.currentTarget.style.borderColor = "#ff0000";
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#111";
                  e.currentTarget.style.borderColor = "#222";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Header */}
                <div className="d-flex align-items-center gap-3 mb-4 pb-3" style={{ borderBottom: "1px solid #333" }}>
                  {/* <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: "#ff0000",
                      flexShrink: 0
                    }}
                  >
                    <i className={`icon ${data.icon} fs-4`} style={{ color: "#fff" }} />
                  </div> */}
                  <h4 className="fw-bold mb-0" style={{ color: "#fff", fontSize: "1.25rem" }}>
                    {data.title}
                  </h4>
                </div>

                {/* Specs List */}
                <ul className="list-unstyled mb-0">
                  {data.specs.map((spec, index) => (
                    <li key={index} className="d-flex align-items-start gap-2 mb-3">
                      <i
                        className="icon icon-check mt-1"
                        style={{ fontSize: "14px", color: "#ff0000", flexShrink: 0 }}
                      />
                      <span style={{ color: "#ccc", fontSize: "0.9rem", lineHeight: "1.5" }}>
                        {spec}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}