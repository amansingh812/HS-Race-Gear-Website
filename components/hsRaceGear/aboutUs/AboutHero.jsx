"use client";
import React from "react";
import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="about-hero">
      <div className="about-hero-bg" />
      <div className="about-hero-dots" />
      <div className="container">
        <div className="about-hero-inner">
          <div className="about-hero-badge">
            <span className="about-badge-dot" />
            OUR STORY
          </div>
          {/* H1 rewritten 2026-08-11 — "Driven by Safety. Fueled by Passion."
              is brand poetry with no keyword surface. This page had 97
              impressions at position 7.3 and zero clicks. Now leads with the
              Made-in-USA angle, which is both the real differentiator and the
              answer to "racewear usa" (98 imp, position 37.5, unclaimed). */}
          <h1 className="about-hero-title">
            Racewear Made<br />in the USA.
          </h1>
          <p className="about-hero-subtitle">
            Custom SFI Racegear, Built to Your Measurements Since 2014
          </p>
          <p className="about-hero-desc">
            <strong>HS Race Gear</strong> builds custom SFI-certified racing suits, gloves,
            and shoes in Watertown, Massachusetts — cut to each driver&rsquo;s own measurements
            rather than pulled from a size run. Over 10 years serving drag racers, sprint car
            drivers, late model competitors, karters, and road racers across the USA and worldwide.
          </p>
          <div className="about-hero-actions">
            <Link href="/custom-race-suit" className="about-btn-primary">
              Design Your Suit
            </Link>
            <Link href="/certifications" className="about-btn-outline">
              Our Certifications
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
