import React from "react";
import Link from "next/link";

// Shared renderer for the three kart competitor compare pages.
// Data lives in ./kartCompareData.js — one entry per brand.
//
// Built as a shared component rather than three copies of a 140-line file
// because the existing vs-* pages have already drifted apart in structure,
// which makes site-wide changes (schema, CTA, internal links) a per-file chore.
export default function KartCompareContent({ data }) {
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
            <span className="contact-breadcrumb-current">{data.breadcrumb}</span>
          </p>
          <span className="contact-hero-tag">Compare · Karting</span>
          <h1 className="contact-hero-title">
            {data.h1First}<br /><span>{data.h1Second}</span>
          </h1>
          <p className="contact-hero-subtitle">{data.heroText}</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="hs-doc-section">
        <div className="container">
          <div className="hs-doc-content" style={{ maxWidth: '1000px' }}>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Considering {data.brandFull}?</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">{data.intro}</p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">What {data.brand} Is Known For</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">Credit where it&rsquo;s due — {data.brand} brings real strengths:</p>
                <ul className="hs-doc-list">
                  {data.knownFor.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">{data.differenceHeading}</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">{data.differenceBody}</p>
              </div>
              <div className="hs-doc-card hs-doc-card-note">
                <p className="hs-doc-card-text">{data.modelNote}</p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Side by Side</h2>
              <div className="hs-doc-card">
                <ul className="hs-doc-list">
                  <li><strong style={{ color: '#fff' }}>Certification</strong> — both meet CIK-FIA Level 2, the standard required by WKA, SKUSA, Rotax Max and IAME.{" "}
                    <Link href="/cik-fia-level-2" style={{ color: '#e21b1b', textDecoration: 'underline' }}>What Level 2 actually means</Link>.
                  </li>
                  <li><strong style={{ color: '#fff' }}>Fit</strong> — {data.brand} sells standard size runs. HS Race Gear cuts from your measurements.</li>
                  <li><strong style={{ color: '#fff' }}>Design</strong> — {data.brand} offers set colorways. HS Race Gear includes unlimited colors, sponsor logos, driver name and flag.</li>
                  <li><strong style={{ color: '#fff' }}>Price</strong> — HS Race Gear custom kart suits start at <strong style={{ color: '#e21b1b' }}>$329</strong>, which is competitive with off-the-rack pricing from the major brands.</li>
                  <li><strong style={{ color: '#fff' }}>Lead time</strong> — off-the-shelf ships immediately; custom production runs 2&ndash;3 weeks.</li>
                  <li><strong style={{ color: '#fff' }}>Made in</strong> — HS Race Gear suits are made in the USA.</li>
                </ul>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">When {data.brand} Is the Better Choice</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  We&rsquo;d rather be straight with you than win a sale you&rsquo;ll regret. Buy off the shelf from {data.brand} or any established dealer if:
                </p>
                <ul className="hs-doc-list">
                  <li>You need a suit for a race weekend that&rsquo;s sooner than three weeks away.</li>
                  <li>You want to try a suit on physically before buying and have a dealer nearby.</li>
                  <li>You&rsquo;re racing a single arrive-and-drive event and don&rsquo;t need gear that lasts a season.</li>
                </ul>
                <p className="hs-doc-card-text">
                  Custom is the better route when you&rsquo;re racing a full season, when standard sizes have never quite fit you, or when you have a team livery and sponsors that need to be on the suit.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Choose Your Kart Suit</h2>
              <div className="hs-doc-card">
                <ul className="hs-doc-list">
                  <li><Link href="/custom-karting-suit" style={{ color: '#e21b1b', textDecoration: 'underline' }}>Custom kart racing suits</Link> — senior and adult classes.</li>
                  <li><Link href="/custom-junior-karting-suit" style={{ color: '#e21b1b', textDecoration: 'underline' }}>Youth &amp; kids karting suits</Link> — ages 8&ndash;15, built with growth room.</li>
                  <li><Link href="/custom-shifter-kart-suit" style={{ color: '#e21b1b', textDecoration: 'underline' }}>Shifter kart suits</Link> — KZ, IAME X30 Shifter, Stock Honda.</li>
                  <li><Link href="/go-kart-racing-apparel" style={{ color: '#e21b1b', textDecoration: 'underline' }}>Full karting kit</Link> — suit, gloves, shoes and crew apparel.</li>
                </ul>
              </div>
              <div className="hs-doc-card" style={{ textAlign: 'center', paddingTop: '32px', paddingBottom: '32px' }}>
                <Link href="/custom-karting-suit/order" style={{
                  display: 'inline-block', background: '#e21b1b', color: '#fff',
                  padding: '14px 32px', borderRadius: '8px', fontWeight: 700,
                  fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '1.5px',
                  textTransform: 'uppercase', fontFamily: 'Poppins, sans-serif'
                }}>
                  Design Your Custom Kart Suit
                </Link>
                <p className="hs-doc-card-text" style={{ marginTop: '12px', marginBottom: 0 }}>CIK Level 2, custom-measured, from $329.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
