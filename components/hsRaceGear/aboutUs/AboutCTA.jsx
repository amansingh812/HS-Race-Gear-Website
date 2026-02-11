import React from "react";
import Link from "next/link";

export default function AboutCTA() {
  return (
    <section className="about-cta-section">
      <div className="about-cta-glow" />
      <div className="container">
        <div className="about-cta-inner">
          <h2 className="about-cta-title">Ready to Build Your Custom Suit?</h2>
          <p className="about-cta-desc">
            SFI-certified. Fully custom. Starting at $289. Free worldwide shipping.
            Unlimited design revisions. Your gear. Your identity. Your race.
          </p>
          <div className="about-cta-actions">
            <Link href="/custom-race-suit" className="about-btn-primary">
              Start Customizing
            </Link>
            <Link href="/RacegearDeals" className="about-btn-outline">
              View Deals
            </Link>
          </div>
          <div className="about-cta-badges">
            {["SFI Certified", "Free Shipping", "Unlimited Revisions", "Custom Fit"].map((b, i) => (
              <span key={i} className="about-cta-badge">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
