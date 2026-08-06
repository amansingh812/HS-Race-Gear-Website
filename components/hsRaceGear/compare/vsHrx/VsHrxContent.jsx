import React from "react";
import Link from "next/link";

export default function VsHrxContent() {
  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="container">
          <p className="contact-breadcrumb">
            <Link href="/">Home</Link>
            <span className="contact-breadcrumb-sep">/</span>
            <Link href="/compare">Compare</Link>
            <span className="contact-breadcrumb-sep">/</span>
            <span className="contact-breadcrumb-current">HS Racegear vs HRX</span>
          </p>
          <span className="contact-hero-tag">Compare</span>
          <h1 className="contact-hero-title">
            HS Racegear<br /><span>vs HRX Race Suits</span>
          </h1>
          <p className="contact-hero-subtitle">
            Comparing HRX racing suits? Here&apos;s the head-to-head — HS Race Gear builds custom SFI-certified race suits from $329, made in the USA, measured to your body, with unlimited design revisions and a 2–3 week production timeline.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="hs-doc-section">
        <div className="container">
          <div className="hs-doc-content">

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Looking at HRX Race Suits? Here&apos;s How HS Race Gear Compares</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  If you&apos;ve been researching HRX racing suits, you&apos;re looking for custom-fit, SFI-certified racewear that passes tech inspection and actually fits. HS Race Gear builds to the same safety standards — genuine Nomex® meta-aramid, SFI 3.2A/1 and SFI 3.2A/5 certified — with every suit made to your exact measurements right here in the USA. Below is the honest comparison so you can decide what matters most for your program.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Made in the USA vs Overseas Production</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  This is the clearest difference. HS Race Gear suits are manufactured in the United States at our Watertown, Massachusetts facility. That means:
                </p>
                <ul className="hs-doc-list">
                  <li>Shorter shipping times for US-based racers — no international customs delays</li>
                  <li>Direct communication with the people actually building your suit</li>
                  <li>Easier revisions, repairs, and warranty handling</li>
                  <li>US-based support when a tech inspector questions your certification</li>
                </ul>
                <p className="hs-doc-card-text">
                  For drivers running weekly regional schedules, the difference between a 2–3 week domestic turnaround and an extended overseas timeline can decide whether you race the next event or sit it out.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">SFI Certification &amp; Safety Standards</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Every HS Race Gear suit carries a valid SFI Foundation certification tag:
                </p>
                <ul className="hs-doc-list">
                  <li><strong>SFI 3.2A/1</strong> — single-layer, ~3 seconds of thermal protection. Entry-level classes, karting, sportsman drag.</li>
                  <li><strong>SFI 3.2A/5</strong> — multi-layer, ~7–10 seconds. Required by USAC, World of Outlaws, ASCS, most dirt late model and sprint car sanctioning bodies.</li>
                  <li><strong>SFI 3.3/5</strong> — gloves and shoes to match.</li>
                </ul>
                <p className="hs-doc-card-text">
                  Whatever you&apos;re comparing, always verify the actual SFI tag and its expiry — certification lapses after five years from the date of manufacture. Read our{" "}
                  <Link href="/blog/understanding-sfi-certifications">full SFI ratings explainer</Link>{" "}
                  or the{" "}
                  <Link href="/blog/sfi-rated-racing-suit-by-class">SFI rating by racing class breakdown</Link>{" "}
                  to confirm which tier your series requires.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Custom Fit — Measured, Not Sized</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Off-the-rack sizing forces you into someone else&apos;s proportions. Every HS Race Gear custom suit is built from your own measurement sheet — chest, waist, inseam, sleeve, torso rise, and neck — so the suit fits seated in the car, not standing in a fitting room.
                </p>
                <p className="hs-doc-card-text">
                  That matters more than most drivers expect: a suit that binds at the shoulders costs you steering range, and excess fabric at the knees catches on the cage during an egress test. See our{" "}
                  <Link href="/blog/perfect-custom-fit-racing-suit">measurement guide</Link>{" "}
                  for how to take your numbers correctly the first time.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Pricing</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  HS Race Gear custom SFI-certified suits start at{" "}
                  <strong style={{ color: '#e21b1b' }}>$329</strong>, with free shipping on custom orders.
                </p>
                <p className="hs-doc-card-text">
                  That price includes custom measurement, your choice of colors and layout, sponsor logos, driver name, country flag, and unlimited design revisions before production starts. There&apos;s no separate charge for design work or embroidery.
                </p>
              </div>
              <div className="hs-doc-card hs-doc-card-note">
                <p className="hs-doc-card-text">
                  When comparing quotes, check what&apos;s actually included. Design fees, logo setup charges, and expedited shipping are common add-ons that can move a headline price considerably.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Production Timeline</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  HS Race Gear runs a <strong style={{ color: '#e21b1b' }}>2–3 week production timeline</strong> on custom suits. The full flow is: measurement form → digital mockup → your revisions → production → quality control → ship.
                </p>
                <p className="hs-doc-card-text">
                  You approve the mockup before anything is cut, and revisions at that stage are unlimited and free.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Materials &amp; Construction</h2>
              <div className="hs-doc-card">
                <ul className="hs-doc-list">
                  <li>Genuine Nomex® meta-aramid outer shell — not a generic FR-treated cotton</li>
                  <li>Fire-resistant quilted inner liner on multi-layer 3.2A/5 builds</li>
                  <li>Reinforced stitching at shoulders, knees, and seat</li>
                  <li>Stretch panels at the elbow, underarm, and knee for pedal and steering range</li>
                  <li>Moisture-wicking liner options for endurance and hot-climate racing</li>
                  <li>Arm-restraint-compatible shoulder construction for sprint car applications</li>
                </ul>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Design Freedom</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">Full customization is standard, not an upcharge:</p>
                <ul className="hs-doc-list">
                  <li>Unlimited colors and panel layouts</li>
                  <li>Sublimated graphics — no cracking or peeling like heat-pressed vinyl</li>
                  <li>Embroidered driver name, team name, and country flag</li>
                  <li>Sponsor logo placement anywhere on the suit</li>
                  <li>Matching gloves, shoes, and crew apparel available</li>
                </ul>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Which Should You Choose?</h2>
              <div className="hs-doc-card hs-doc-card-note">
                <p className="hs-doc-card-text">
                  If you&apos;re a US-based racer who wants a custom-measured SFI-certified suit with domestic production, direct support, unlimited design revisions, and a predictable 2–3 week timeline — HS Race Gear is built for exactly that. Compare the SFI tag, the fit process, and the all-in price rather than the headline number, and the decision usually makes itself.
                </p>
              </div>
              <div className="hs-doc-card" style={{ textAlign: 'center', paddingTop: '32px', paddingBottom: '32px' }}>
                <Link href="/custom-race-suit/order" style={{
                  display: 'inline-block', background: '#e21b1b', color: '#fff',
                  padding: '14px 32px', borderRadius: '8px', fontWeight: 700,
                  fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '1.5px',
                  textTransform: 'uppercase', fontFamily: 'Poppins, sans-serif',
                  transition: 'background 0.2s ease'
                }}>
                  Design Your Custom Race Suit
                </Link>
                <p className="hs-doc-card-text" style={{ marginTop: '12px', marginBottom: 0 }}>
                  SFI-certified. Made in the USA. From $329 with free shipping.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Related Comparisons</h2>
              <div className="hs-doc-card">
                <ul className="hs-doc-list">
                  <li><Link href="/compare/vs-k1">HS Racegear vs K1 RaceGear</Link></li>
                  <li><Link href="/compare/vs-rush">HS Racegear vs RUSH Racegear</Link></li>
                  <li><Link href="/compare/vs-velocita">HS Racegear vs Velocita</Link></li>
                  <li><Link href="/compare/vs-pyrotect">HS Racegear vs Pyrotect</Link></li>
                  <li><Link href="/compare/vs-simpson">HS Racegear vs Simpson Race Products</Link></li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
