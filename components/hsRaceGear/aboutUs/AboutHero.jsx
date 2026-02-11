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
          <h1 className="about-hero-title">
            Driven by Safety.<br />Fueled by Passion.
          </h1>
          <p className="about-hero-subtitle">
            Premium SFI Custom Racegear for Champions
          </p>
          <p className="about-hero-desc">
            At <strong>HS Race Gear</strong>, we build custom SFI-certified racing suits, gloves,
            and shoes for drivers who demand safety, performance, and style at every corner.
            With over 10 years of experience, we serve drag racers, sprint car drivers, late model
            competitors, and road racers across the USA and worldwide.
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
