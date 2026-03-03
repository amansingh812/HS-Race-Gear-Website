import React from "react";
import Link from "next/link";

export default function VsSimpsonContent() {
  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="container">
          <p className="contact-breadcrumb">
            <Link href="/">Home</Link>
            <span className="contact-breadcrumb-sep">/</span>
            <span className="contact-breadcrumb-current">HS Racegear vs Simpson</span>
          </p>
          <span className="contact-hero-tag">Compare</span>
          <h1 className="contact-hero-title">
            HS Racegear<br /><span>vs Simpson Racing</span>
          </h1>
          <p className="contact-hero-subtitle">
            Modern custom SFI racewear vs legacy brand pricing. More flexibility, faster production, and significantly lower cost — without sacrificing protection.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="hs-doc-section">
        <div className="container">
          <div className="hs-doc-content">

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Purpose-Built SFI Suits for Today's Racers</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">HS Racegear suits are engineered for drivers competing in:</p>
                <ul className="hs-doc-list">
                  <li>Drag racing classes requiring SFI 3.2A/5</li>
                  <li>Super Late Models and Pro Late Models</li>
                  <li>Modifieds, winged and non-wing sprint cars</li>
                  <li>High-performance road course racing</li>
                  <li>SFI-regulated powerboat and offshore racing</li>
                </ul>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Cost of Entry</h2>
              <div className="hs-doc-card">
                <ul className="hs-doc-list">
                  <li><strong>HS Racegear:</strong> Custom SFI race suits start at $289</li>
                  <li><strong>Simpson Racing:</strong> Custom SFI race suits start at $1,049 USD</li>
                </ul>
              </div>
              <div className="hs-doc-card hs-doc-card-note">
                <p className="hs-doc-card-text">HS Racegear delivers SFI-compliant protection without the premium pricing tied to legacy branding.</p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Design Control &amp; Customization</h2>
              <div className="hs-doc-card">
                <h3 className="hs-doc-card-title">HS Racegear</h3>
                <ul className="hs-doc-list">
                  <li>Fully custom sizing using driver measurements</li>
                  <li>Open design process from concept to final approval</li>
                  <li>Unlimited design revisions before production</li>
                  <li>Included name embroidery, numbers, flags, and sponsor logos</li>
                </ul>
              </div>
              <div className="hs-doc-card">
                <h3 className="hs-doc-card-title">Simpson Racing</h3>
                <ul className="hs-doc-list">
                  <li>Custom designs available at higher price tiers</li>
                  <li>Many suits based on existing patterns</li>
                  <li>Branding options vary by model and certification level</li>
                </ul>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Manufacturing Speed</h2>
              <div className="hs-doc-card">
                <ul className="hs-doc-list">
                  <li><strong>HS Racegear:</strong> Average 2–3 week production timeline</li>
                  <li><strong>Simpson Racing:</strong> Custom builds may require longer lead times</li>
                </ul>
                <p className="hs-doc-card-text">HS Racegear is well suited for mid-season suit replacements, drivers racing multiple classes, and teams preparing for major drag events or offshore race weekends.</p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Fabric &amp; Construction</h2>
              <div className="hs-doc-card">
                <h3 className="hs-doc-card-title">HS Racegear</h3>
                <ul className="hs-doc-list">
                  <li>Premium Nomex® meta-aramid outer shell</li>
                  <li>Fire-resistant inner linings included as standard</li>
                  <li>Reinforced stitching in high-stress zones</li>
                  <li>Stretch panels for pedal, steering, and throttle control</li>
                </ul>
              </div>
              <div className="hs-doc-card hs-doc-card-note">
                <p className="hs-doc-card-text">HS Racegear includes race-ready materials across all custom suits — not just flagship options.</p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Why Racers Are Choosing HS Racegear Over Simpson</h2>
              <div className="hs-doc-card">
                <ul className="hs-doc-list">
                  <li>SFI-certified protection at a lower cost</li>
                  <li>Faster turnaround for race schedules</li>
                  <li>Unlimited design revisions</li>
                  <li>Premium Nomex® materials included</li>
                  <li>Greater flexibility for sponsor branding</li>
                  <li>One supplier for suits, gloves, and shoes</li>
                </ul>
              </div>
              <div className="hs-doc-card" style={{ textAlign: 'center', paddingTop: '32px', paddingBottom: '32px' }}>
                <Link href="/custom-race-suit" style={{
                  display: 'inline-block', background: '#e21b1b', color: '#fff',
                  padding: '14px 32px', borderRadius: '8px', fontWeight: 700,
                  fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '1.5px',
                  textTransform: 'uppercase', fontFamily: 'Poppins, sans-serif'
                }}>
                  Design Your Custom HS Racegear Suit Today
                </Link>
                <p className="hs-doc-card-text" style={{ marginTop: '12px', marginBottom: 0 }}>Race protected, compliant, and confident.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
