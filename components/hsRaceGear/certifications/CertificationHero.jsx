import React from "react";
import Link from "next/link";

export default function CertificationHero() {
  return (
    <>
      {/* HERO — matching Contact Us dark theme */}
      <section className="contact-hero">
        <div className="container">
          <p className="contact-breadcrumb">
            <Link href="/">Home</Link>
            <span className="contact-breadcrumb-sep">/</span>
            <span className="contact-breadcrumb-current">Certifications</span>
          </p>
          <span className="contact-hero-tag">SFI Certification Guide (2026)</span>
          {/* H1 rewritten 2026-07-16 — was "SFI Approved Certification" which
              missed the top GSC query "sfi ratings" (37 imp/28d). Now leads
              with exact-match "SFI Ratings" for on-page keyword alignment. */}
          <h1 className="contact-hero-title">
            SFI Ratings<br /><span>Explained</span>
          </h1>
          <p className="contact-hero-subtitle">
            Every SFI rating decoded — 3.2A/1 (single-layer, 3-second protection), 3.2A/5 (multi-layer, 10-second protection), 3.2A/15 (drag racing top-tier), and 3.3/5 (gloves & shoes). Learn which rating your sanctioning body requires and shop SFI-certified gear from HS Race Gear.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '28px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 20px', borderRadius: '30px', fontWeight: 600,
              fontSize: '0.9rem', background: '#e21b1b', color: '#fff',
              fontFamily: 'Poppins, sans-serif', letterSpacing: '0.5px'
            }}>
              ✓ SFI 3.2A/5 Certified
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 20px', borderRadius: '30px', fontWeight: 600,
              fontSize: '0.9rem', background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)', color: '#fff',
              fontFamily: 'Poppins, sans-serif', letterSpacing: '0.5px'
            }}>
              ✓ SFI 3.2A/1 Certified
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
