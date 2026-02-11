import React from "react";

const stats = [
  { value: "10+", label: "Years in Racing" },
  { value: "5K+", label: "Suits Delivered" },
  { value: "40+", label: "Countries Served" },
  { value: "100%", label: "SFI Certified" },
];

export default function AboutStats() {
  return (
    <section className="about-stats-section">
      <div className="container">
        <div className="about-stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="about-stat-card">
              <div className="about-stat-value">{stat.value}</div>
              <div className="about-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
