import React from "react";

const steps = [
  {
    step: "01",
    title: "Place Your Order",
    desc: "Choose your suit type and place your order directly on our website. Our team reviews every order personally.",
  },
  {
    step: "02",
    title: "Submit Measurements",
    desc: "Use our detailed measurement guide to send us your body measurements. We review and verify them before production begins.",
  },
  {
    step: "03",
    title: "Design & Approval",
    desc: "Our designers create a digital mockup of your suit with your colors, logos, and layout. Unlimited revisions until you approve.",
  },
  {
    step: "04",
    title: "Production",
    desc: "Once you approve the design, we begin crafting your suit using premium Nomex® materials and SFI-certified construction.",
  },
  {
    step: "05",
    title: "Quality Inspection",
    desc: "Every suit goes through a full quality check before packaging — fit, stitching, certification labels, and finish.",
  },
  {
    step: "06",
    title: "Shipped to You",
    desc: "Your gear is packed in dedicated HS suit bags and shipped worldwide with tracking. Ready for the track.",
  },
];

export default function AboutProcess() {
  return (
    <section className="about-process-section">
      <div className="container">
        <div className="about-section-header">
          <div className="about-section-tag">HOW IT WORKS</div>
          <h2 className="about-section-title">From Order to Track</h2>
          <p className="about-section-desc">
            Six steps from your order to a fully custom, SFI-certified racing suit at your door.
          </p>
        </div>
        <div className="about-process-grid">
          {steps.map((s, i) => (
            <div key={i} className="about-process-card">
              <div className="about-process-step">{s.step}</div>
              <h3 className="about-process-title">{s.title}</h3>
              <p className="about-process-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
