import React from "react";
import Link from "next/link";

// Rebuilt 2026-09-19 — the original hero used the shared .contact-hero
// single-column layout (borrowed from /contact-us), which left the entire
// right half of the viewport empty on desktop. Added a two-column grid with
// a "Rating Ladder" visual on the right: a quick preview of the full
// comparison table further down the page (#rating-chart), so the empty space
// now does real work instead of just decoration.
const LADDER_TIERS = [
  { rating: "3.2A/1", label: "Entry-Level", width: "30%" },
  { rating: "3.2A/5", label: "Multi-Layer", width: "58%" },
  { rating: "3.2A/15", label: "Drag Racing", width: "82%" },
  { rating: "3.2A/20", label: "Top Fuel / Funny Car", width: "100%" },
];

export default function CertificationHero() {
  return (
    <>
      {/* HERO — matching Contact Us dark theme */}
      <section className="contact-hero">
        <div className="container">
          <div className="cert-hero-grid">

            <div>
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

            {/* RIGHT VISUAL — rating ladder preview, links to the full table */}
            <div className="cert-hero-visual">
              <div className="cert-ladder-card">
                <div className="cert-ladder-header">
                  <span className="cert-ladder-title">Protection Level by Rating</span>
                  <span className="cert-ladder-sub">Higher rating = more layers, longer protection</span>
                </div>

                <div className="cert-ladder-bars">
                  {LADDER_TIERS.map((tier) => (
                    <div className="cert-ladder-row" key={tier.rating}>
                      <div className="cert-ladder-row-label">
                        <strong>SFI {tier.rating}</strong>
                        <span>{tier.label}</span>
                      </div>
                      <div className="cert-ladder-track">
                        <div className="cert-ladder-fill" style={{ width: tier.width }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cert-ladder-pills">
                  <span className="cert-ladder-pill">SFI 3.3/5 · Gloves &amp; Shoes</span>
                  <span className="cert-ladder-pill">SFI 3.4/5 · NASCAR Uniforms</span>
                </div>

                <a href="#rating-chart" className="cert-ladder-link">
                  See the full comparison chart ↓
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
  .cert-hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: 48px;
    align-items: center;
  }

  .cert-hero-visual { display: flex; justify-content: center; }

  .cert-ladder-card {
    width: 100%;
    max-width: 420px;
    background: #0f0f0f;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 28px 26px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    position: relative;
    overflow: hidden;
  }

  .cert-ladder-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #e21b1b, transparent);
  }

  .cert-ladder-header { margin-bottom: 22px; }

  .cert-ladder-title {
    display: block;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 6px;
  }

  .cert-ladder-sub {
    display: block;
    color: rgba(255,255,255,0.4);
    font-family: 'Poppins', sans-serif;
    font-size: 0.78rem;
  }

  .cert-ladder-row { margin-bottom: 16px; }
  .cert-ladder-row:last-child { margin-bottom: 0; }

  .cert-ladder-row-label {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 6px;
    font-family: 'Poppins', sans-serif;
  }

  .cert-ladder-row-label strong {
    color: #fff;
    font-size: 0.85rem;
  }

  .cert-ladder-row-label span {
    color: rgba(255,255,255,0.4);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .cert-ladder-track {
    height: 8px;
    background: rgba(255,255,255,0.06);
    border-radius: 6px;
    overflow: hidden;
  }

  .cert-ladder-fill {
    height: 100%;
    border-radius: 6px;
    background: linear-gradient(90deg, #c41515, #e21b1b);
  }

  .cert-ladder-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 22px 0 20px;
    padding-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.06);
  }

  .cert-ladder-pill {
    font-family: 'Poppins', sans-serif;
    font-size: 0.72rem;
    color: rgba(255,255,255,0.65);
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    padding: 6px 12px;
    border-radius: 20px;
  }

  .cert-ladder-link {
    display: inline-block;
    color: #ff4d4d;
    font-family: 'Poppins', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: rgba(255,77,77,0.4);
    transition: color 0.2s ease;
  }

  .cert-ladder-link:hover {
    color: #ffffff;
    text-decoration-color: #ffffff;
  }

  @media (max-width: 992px) {
    .cert-hero-grid {
      grid-template-columns: 1fr;
    }
    .cert-hero-visual {
      margin-top: 40px;
    }
  }
`}} />
    </>
  );
}
