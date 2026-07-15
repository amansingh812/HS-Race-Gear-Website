import React from "react";

// "Custom Made" replaced with "Made in USA" 2026-05-16 — the GSC query
// "racewear USA" gets 28 impressions/3mo with 0 clicks, signalling buyers
// who specifically want an American maker. The custom-made angle is
// already covered by the rest of the homepage.
const trustItems = [
  {
    icon: "icon-shipping",
    title: "Free Shipping",
    subtitle: "for custom suits",
  },
  {
    icon: "icon-return",
    title: "SFI Certified",
    subtitle: "All gear meets SFI standards",
  },
  {
    icon: "icon-support",
    title: "24/7 Support",
    subtitle: "Expert help anytime",
  },
];

export default function AnnouncementStrip() {
  return (
    <section className="announcement-strip">
      <div className="container">
        <div className="announcement-strip__grid">
          {trustItems.map((item, index) => (
            <div key={index} className="announcement-strip__item">
              <div className="announcement-strip__icon">
                <i className={`icon ${item.icon}`} />
              </div>
              <div className="announcement-strip__text">
                {item.title}
                <small>{item.subtitle}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
