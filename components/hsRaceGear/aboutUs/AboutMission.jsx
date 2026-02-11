import React from "react";

const pillars = [
  {
    icon: "🛡️",
    title: "Safety First",
    desc: "Every suit we produce meets or exceeds SFI 3.2A certification standards. Safety is non-negotiable — at every price point.",
  },
  {
    icon: "✂️",
    title: "Custom Built",
    desc: "No stock sizes. Every suit is cut to your measurements, ensuring a fit that works with your harness, helmet, and driving position.",
  },
  {
    icon: "🔥",
    title: "Race-Proven Materials",
    desc: "We use premium Nomex® meta-aramid fabrics, fire-resistant inner linings, and Kevlar® stitching across every product we build.",
  },
  {
    icon: "💰",
    title: "Accessible Pricing",
    desc: "SFI-certified custom racewear starting at $289. We believe every driver deserves professional protection — not just factory teams.",
  },
];

export default function AboutMission() {
  return (
    <section className="about-mission-section">
      <div className="container">
        <div className="about-section-header">
          <div className="about-section-tag">WHAT WE STAND FOR</div>
          <h2 className="about-section-title">Our Mission</h2>
          <p className="about-section-desc">
            HS Race Gear was built around one idea: every racer deserves certified protection,
            a perfect fit, and a suit they're proud to wear — without paying a fortune.
          </p>
        </div>
        <div className="about-pillars-grid">
          {pillars.map((p, i) => (
            <div key={i} className="about-pillar-card">
              <div className="about-pillar-icon">{p.icon}</div>
              <h3 className="about-pillar-title">{p.title}</h3>
              <p className="about-pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
