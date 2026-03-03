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
          <span className="contact-hero-tag">Safety Standards</span>
          <h1 className="contact-hero-title">
            SFI Approved<br /><span>Certification</span>
          </h1>
          <p className="contact-hero-subtitle">
            Every fire suit sold by HS Race Gear is engineered to meet SFI Foundation–approved standards — specifically SFI 3.2A/5 and SFI 3.2A/1. Trusted globally by sanctioning bodies, race teams, and drivers.
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
