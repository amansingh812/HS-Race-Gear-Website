import React from "react";
import Link from "next/link";

export default function VsK1Content() {
  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="container">
          <p className="contact-breadcrumb">
            <Link href="/">Home</Link>
            <span className="contact-breadcrumb-sep">/</span>
            <span className="contact-breadcrumb-current">HS Racegear vs K1 RaceGear</span>
          </p>
          <span className="contact-hero-tag">Compare</span>
          <h1 className="contact-hero-title">
            HS Racegear<br /><span>vs K1 RaceGear</span>
          </h1>
          <p className="contact-hero-subtitle">
            Looking at K1 racing suits? Here's how HS Racegear compares — custom SFI-certified race suits from $289, faster turnaround, deeper customization, and better value without compromising safety.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="hs-doc-section">
        <div className="container">
          <div className="hs-doc-content">

            {/* INTRO */}
            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Considering K1 Racing Suits? Here's a Better-Value Custom Alternative</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  If you've been pricing out K1 racing suits, you already know what you're after: custom-fit SFI-certified racewear from a brand racers actually trust. HS Racegear builds the same caliber suit — premium Nomex®, SFI 3.2A/1 and 3.2A/5 certified, custom-measured to your body, any color or design — starting at $289, on a faster production timeline. Below is the head-to-head, in plain English.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Built for Safety. Designed for Performance.</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  HS Racegear focuses exclusively on <strong>custom SFI-certified racewear</strong>, giving racers professional-grade protection with a tailored fit. From Nomex® fabrics to precision patterning, every suit is built to perform under real racing conditions.
                </p>
                <p className="hs-doc-card-text">
                  While K1 RaceGear is a well-known brand, HS Racegear delivers <strong>faster turnaround, deeper customization, and better overall value</strong> — without compromising SFI safety standards.
                </p>
              </div>
            </div>

            {/* SIDE BY SIDE COMPARISON */}
            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Side-by-Side Comparison</h2>

              {/* PRICING */}
              <div className="hs-doc-card vs-compare-card">
                <div className="vs-compare-header">
                  <span className="vs-compare-icon">💰</span>
                  <h3 className="vs-compare-title">Pricing</h3>
                </div>
                <div className="vs-compare-grid">
                  <div className="vs-compare-col vs-compare-col--hs">
                    <div className="vs-compare-brand">HS Racegear</div>
                    <p className="vs-compare-value">Custom suits starting at <strong style={{ color: "#e21b1b" }}>$289</strong></p>
                  </div>
                  <div className="vs-compare-col vs-compare-col--them">
                    <div className="vs-compare-brand">K1 RaceGear</div>
                    <p className="vs-compare-value">Custom suits starting at <strong>$599.95</strong></p>
                  </div>
                </div>
                <p className="vs-compare-verdict">
                  HS Racegear offers competitive custom pricing with premium materials included.
                </p>
              </div>

              {/* CUSTOMIZATION */}
              <div className="hs-doc-card vs-compare-card">
                <div className="vs-compare-header">
                  <span className="vs-compare-icon">🎨</span>
                  <h3 className="vs-compare-title">Customization &amp; Design</h3>
                </div>
                <div className="vs-compare-grid">
                  <div className="vs-compare-col vs-compare-col--hs">
                    <div className="vs-compare-brand">HS Racegear</div>
                    <ul className="hs-doc-list">
                      <li>Fully custom sizing</li>
                      <li>Advanced panel layouts</li>
                      <li>Driver name, flag &amp; sponsor logos</li>
                      <li>Unlimited design revisions included</li>
                    </ul>
                  </div>
                  <div className="vs-compare-col vs-compare-col--them">
                    <div className="vs-compare-brand">K1 RaceGear</div>
                    <ul className="hs-doc-list">
                      <li>Limited customization options</li>
                      <li>Additional charges for upgrades</li>
                      <li>Extra fees for design changes</li>
                    </ul>
                  </div>
                </div>
                <p className="vs-compare-verdict">
                  With HS Racegear, what you see in the design mockup is exactly what you get — no surprise fees.
                </p>
              </div>

              {/* PRODUCTION TIME */}
              <div className="hs-doc-card vs-compare-card">
                <div className="vs-compare-header">
                  <span className="vs-compare-icon">⏱️</span>
                  <h3 className="vs-compare-title">Production &amp; Delivery Time</h3>
                </div>
                <div className="vs-compare-grid">
                  <div className="vs-compare-col vs-compare-col--hs">
                    <div className="vs-compare-brand">HS Racegear</div>
                    <p className="vs-compare-value"><strong style={{ color: "#e21b1b" }}>2–3 weeks guaranteed</strong></p>
                  </div>
                  <div className="vs-compare-col vs-compare-col--them">
                    <div className="vs-compare-brand">K1 RaceGear</div>
                    <p className="vs-compare-value"><strong>5–6 weeks average</strong></p>
                  </div>
                </div>
                <p className="vs-compare-verdict">
                  HS Racegear is ideal for racers who need gear fast — without sacrificing quality.
                </p>
              </div>

              {/* MATERIALS */}
              <div className="hs-doc-card vs-compare-card">
                <div className="vs-compare-header">
                  <span className="vs-compare-icon">🧵</span>
                  <h3 className="vs-compare-title">Materials &amp; Build Quality</h3>
                </div>
                <div className="vs-compare-grid">
                  <div className="vs-compare-col vs-compare-col--hs">
                    <div className="vs-compare-brand">HS Racegear</div>
                    <ul className="hs-doc-list">
                      <li>Premium Nomex® meta-aramid fabric (standard)</li>
                      <li>Fire-resistant linings</li>
                      <li>Reinforced seams &amp; stretch panels</li>
                    </ul>
                  </div>
                  <div className="vs-compare-col vs-compare-col--them">
                    <div className="vs-compare-brand">K1 RaceGear</div>
                    <ul className="hs-doc-list">
                      <li>Premium materials available</li>
                      <li>Often as paid upgrades</li>
                    </ul>
                  </div>
                </div>
                <p className="vs-compare-verdict">
                  HS Racegear includes premium construction as standard — not optional.
                </p>
              </div>

              {/* GLOVES & SHOES */}
              <div className="hs-doc-card vs-compare-card">
                <div className="vs-compare-header">
                  <span className="vs-compare-icon">🧤</span>
                  <h3 className="vs-compare-title">Gloves &amp; Shoes</h3>
                </div>
                <div className="vs-compare-grid">
                  <div className="vs-compare-col vs-compare-col--hs">
                    <div className="vs-compare-brand">HS Racegear</div>
                    <p className="vs-compare-value">Free matching gloves and shoes with select racewear packages</p>
                  </div>
                  <div className="vs-compare-col vs-compare-col--them">
                    <div className="vs-compare-brand">K1 RaceGear</div>
                    <p className="vs-compare-value">Gloves and shoes sold separately</p>
                  </div>
                </div>
                <p className="vs-compare-verdict">
                  HS Racegear bundles more value into every order.
                </p>
              </div>
            </div>

            {/* WHY CHOOSE HS */}
            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Why Racers Choose HS Racegear Over K1 RaceGear</h2>
              <div className="hs-doc-card">
                <ul className="hs-doc-list hs-doc-list--checkmarks">
                  <li>Faster 2–3 week turnaround</li>
                  <li>Fully custom SFI-certified suits</li>
                  <li>Unlimited design revisions</li>
                  <li>Competitive custom pricing from $289</li>
                  <li>Premium Nomex® materials included as standard</li>
                  <li>Matching gloves &amp; shoes available in bundles</li>
                </ul>
              </div>
            </div>

            {/* DISCIPLINES */}
            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Built for Every Racing Discipline</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">Whether you race sprint cars, dirt track, drag racing, or stock cars, HS Racegear delivers custom SFI racewear built for safety, comfort, and confidence.</p>
                <ul className="hs-doc-list">
                  <li>Sprint cars &amp; dirt track racing</li>
                  <li>Drag racing &amp; NHRA events</li>
                  <li>Stock car &amp; oval track racing</li>
                  <li>Road racing &amp; endurance events</li>
                  <li>Karting &amp; amateur motorsports</li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="hs-doc-block">
              <div className="hs-doc-card hs-doc-card-note vs-cta-card">
                <h3 className="vs-cta-title">Ready to Upgrade Your Racewear?</h3>
                <p className="hs-doc-card-text">
                  Upgrade to faster delivery, better fit, and true customization with HS Racegear. Get a fully custom SFI-certified suit built to your exact specifications.
                </p>
                <div className="vs-cta-buttons">
                  <Link href="/custom-race-suit" className="tf-btn btn-fill animate-btn">
                    Build Your Custom Suit
                  </Link>
                  <Link href="/contact-us" className="tf-btn animate-btn" style={{ border: "1px solid rgba(226,27,27,0.5)", color: "#fff" }}>
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
