import React from "react";

const series = [
  "NHRA Drag Racing",
  "IMCA Dirt Track",
  "USAC Sprint Cars",
  "IHRA Competition",
  "Super Late Models",
  "Pro Late Models",
  "Modifieds",
  "Winged Sprint Cars",
  "Non-Wing Sprint Cars",
  "Road Course Racing",
  "Offshore Boat Racing",
  "Regional Short-Track Series",
];

export default function AboutRacingSeries() {
  return (
    <section className="about-series-section">
      <div className="container">
        <div className="about-section-header">
          <div className="about-section-tag">WHERE WE RACE</div>
          <h2 className="about-section-title">Built for Every Series</h2>
          <p className="about-section-desc">
            HS Race Gear suits are raced across sanctioned series worldwide — from local short tracks
            to national-level events.
          </p>
        </div>
        <div className="about-series-grid">
          {series.map((s, i) => (
            <div key={i} className="about-series-tag">
              <span className="about-series-dot" />
              {s}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
