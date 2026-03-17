import React from "react";

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
    icon: "icon-gift",
    title: "Custom Made",
    subtitle: "Built to your measurements",
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
