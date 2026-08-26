import React from "react";
import Link from "next/link";

// Australian speedway lander — created 2026-08-25.
//
// WHY SPEEDWAY AND NOT "AUSTRALIA" GENERALLY
// Motorsport Australia (circuit racing, the main national body) requires
// FIA 8856-2000 or 8856-2018. HS Race Gear is SFI-certified only and holds no
// FIA homologation, so Australian circuit racing cannot legally be served and
// this page must not imply otherwise.
//
// Australian SPEEDWAY does accept SFI. Verified against the Victorian
// Speedway Council 2025 Sprintcar Specification Manual, which sets the driving
// suit minimum at "either SFI 3.2A/1 or FIA 8856-2000". Same pattern appears
// across VSC Formula 500, Super Rods, Limited Sportsman and Standard Saloons
// manuals. That is the deliverable Australian market.
//
// Australian English throughout (colour, personalised, metres, tyre) — the
// rest of the site is US English, and that is correct for its market, but a
// page written for Australians should read like it.
//
// SEASON: Australian speedway runs roughly September to April, so late August
// is pre-season buying. This page should go live before the season opens.
export default function AustraliaSpeedwayContent() {
  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="container">
          <p className="contact-breadcrumb">
            <Link href="/">Home</Link>
            <span className="contact-breadcrumb-sep">/</span>
            <span className="contact-breadcrumb-current">Australia — Speedway Suits</span>
          </p>
          <span className="contact-hero-tag">Shipping to Australia</span>
          <h1 className="contact-hero-title">
            Race Suits<br /><span>Australia</span>
          </h1>
          <p className="contact-hero-subtitle">
            Custom SFI-certified speedway suits shipped to Australia — sprintcars, late models, wingless, speedcars, Formula 500 and sedans. Built to your measurements in the USA, in your colours, from USD $329.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '28px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 20px', borderRadius: '30px', fontWeight: 600,
              fontSize: '0.9rem', background: '#e21b1b', color: '#fff',
              fontFamily: 'Poppins, sans-serif', letterSpacing: '0.5px'
            }}>
              ✓ SFI 3.2A/1 &amp; 3.2A/5
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 20px', borderRadius: '30px', fontWeight: 600,
              fontSize: '0.9rem', background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)', color: '#fff',
              fontFamily: 'Poppins, sans-serif', letterSpacing: '0.5px'
            }}>
              ✓ Worldwide Shipping
            </span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="hs-doc-section">
        <div className="container">
          <div className="hs-doc-content" style={{ maxWidth: '1000px' }}>

            {/* The honesty block goes FIRST, deliberately. Anyone arriving
                here for circuit racing needs to know immediately, not after
                scrolling a sales pitch. */}
            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Read This First: Speedway Yes, Circuit Racing No</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Australia runs two different rulebooks for driver apparel, and it decides whether we can help you.
                </p>
                <ul className="hs-doc-list">
                  <li>
                    <strong style={{ color: '#e21b1b' }}>Speedway — yes.</strong> Australian speedway accepts SFI. The Victorian Speedway Council sprintcar manual, for example, sets the driving suit minimum at <em>&ldquo;either SFI 3.2A/1 or FIA 8856-2000&rdquo;</em>, and the same wording runs through the Formula 500, Super Rods, Limited Sportsman and Standard Saloons manuals. Our suits meet and exceed that.
                  </li>
                  <li>
                    <strong style={{ color: '#fff' }}>Motorsport Australia circuit racing — no.</strong> Motorsport Australia requires FIA 8856-2000 or 8856-2018 homologated apparel. <strong style={{ color: '#fff' }}>We build to SFI only and hold no FIA homologation</strong>, so our suits will not pass Motorsport Australia scrutineering. If you race circuit under a Motorsport Australia licence, you need an FIA-listed manufacturer — not us.
                  </li>
                </ul>
                <p className="hs-doc-card-text">
                  We&rsquo;d rather tell you that on the first screen than take an order you can&rsquo;t use. If you&rsquo;re unsure which applies to you, check your club&rsquo;s current-season specification manual before ordering anything from anyone.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Built for Australian Speedway</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Australian speedway and American dirt racing are close cousins — same cars, same clay, largely the same safety standards. That&rsquo;s why SFI carries here when it doesn&rsquo;t on the circuit side. We build for:
                </p>
                <ul className="hs-doc-list">
                  <li><strong style={{ color: '#fff' }}>Sprintcars</strong> — 410 and 360, winged and wingless. Arm-restraint-compatible shoulders and a dust-seal collar as standard.</li>
                  <li><strong style={{ color: '#fff' }}>Late models and Super Sedans</strong> — abrasion panels where the slide happens.</li>
                  <li><strong style={{ color: '#fff' }}>Speedcars and Formula 500</strong> — tight cockpits, so fit through the shoulder matters more than usual.</li>
                  <li><strong style={{ color: '#fff' }}>Wingless sprints, Super Rods, Limited Sportsman</strong></li>
                  <li><strong style={{ color: '#fff' }}>Junior sedans and production sedans</strong> — including{" "}
                    <Link href="/custom-race-suit" style={{ color: '#e21b1b', textDecoration: 'underline' }}>youth sizing</Link>.
                  </li>
                </ul>
                <p className="hs-doc-card-text">
                  Every suit is cut from your own measurements rather than a size run, in whatever colours and sponsor layout you want, with a digital mockup before anything is cut.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Which SFI Rating for Australian Speedway?</h2>
              <div className="hs-doc-card">
                <ul className="hs-doc-list">
                  <li><strong style={{ color: '#fff' }}>SFI 3.2A/1</strong> — single layer, roughly 3 seconds of thermal protection. This is the <em>minimum</em> in the VSC manuals, and it is genuinely a minimum.</li>
                  <li><strong style={{ color: '#fff' }}>SFI 3.2A/5</strong> — double layer, roughly 7&ndash;10 seconds. What most serious sprintcar and late model drivers actually run, and what we&rsquo;d recommend if you&rsquo;re running methanol.</li>
                </ul>
                <p className="hs-doc-card-text">
                  Methanol burns with an almost invisible flame and is common in Australian speedway. The extra seconds a double-layer suit buys you matter more in a methanol car than the price difference suggests.
                </p>
                <p className="hs-doc-card-text">
                  Full breakdown on the{" "}
                  <Link href="/certifications" style={{ color: '#e21b1b', textDecoration: 'underline' }}>SFI ratings page</Link>, and the{" "}
                  <Link href="/blog/sfi-vs-fia-rating" style={{ color: '#e21b1b', textDecoration: 'underline' }}>SFI vs FIA guide</Link>{" "}
                  explains why the two standards aren&rsquo;t interchangeable.
                </p>
              </div>
              <div className="hs-doc-card hs-doc-card-note">
                <p className="hs-doc-card-text">
                  Requirements differ between state bodies and are revised between seasons. Confirm against your own club or state association&rsquo;s current specification manual — not against a supplier&rsquo;s website, including ours.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Ordering from Australia</h2>
              <div className="hs-doc-card">
                <ul className="hs-doc-list">
                  <li><strong style={{ color: '#fff' }}>Order before the season, not during it.</strong> Australian speedway runs roughly September to April. Production is 2&ndash;3 weeks plus international shipping, so order in the off-season or early in it.</li>
                  <li><strong style={{ color: '#fff' }}>Measure in centimetres or inches</strong> — tell us which and we&rsquo;ll work from either. The{" "}
                    <Link href="/custom-fit" style={{ color: '#e21b1b', textDecoration: 'underline' }}>measurement guide</Link>{" "}
                    walks through all 15 points.
                  </li>
                  <li><strong style={{ color: '#fff' }}>Pricing is in USD.</strong> Suits start at USD $329. Check the current exchange rate — the price in AUD moves with it.</li>
                  <li><strong style={{ color: '#fff' }}>Import duty and GST apply on arrival.</strong> Australian GST is charged on imported goods, and duty may apply depending on value. That&rsquo;s payable by you at the border, not included in our price. Our{" "}
                    <Link href="/blog/racing-suit-hs-code" style={{ color: '#e21b1b', textDecoration: 'underline' }}>HS code guide</Link>{" "}
                    covers the tariff classification if your customs broker asks.
                  </li>
                </ul>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Karting in Australia</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Australian karting runs on the FIA karting standard rather than SFI — the same system used worldwide, currently transitioning from CIK-FIA Level 2 to FIA 8877-2022.
                </p>
                <p className="hs-doc-card-text">
                  If you&rsquo;re buying a kart suit for an Australian season, read the{" "}
                  <Link href="/cik-fia-level-2" style={{ color: '#e21b1b', textDecoration: 'underline' }}>CIK-FIA Level 2 and FIA 8877-2022 guide</Link>{" "}
                  first — there&rsquo;s a 2029 cut-off that affects how much useful life a suit bought today actually has, and it applies in Australia as everywhere else.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Order Your Australian Speedway Suit</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Custom-measured, SFI certified, made in Watertown, Massachusetts and shipped to Australia. Unlimited colours, sponsor logos, driver name and flag included. From USD $329.
                </p>
              </div>
              <div className="hs-doc-card" style={{ textAlign: 'center', paddingTop: '32px', paddingBottom: '32px' }}>
                <Link href="/custom-race-suit/order" style={{
                  display: 'inline-block', background: '#e21b1b', color: '#fff',
                  padding: '14px 32px', borderRadius: '8px', fontWeight: 700,
                  fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '1.5px',
                  textTransform: 'uppercase', fontFamily: 'Poppins, sans-serif'
                }}>
                  Design Your Speedway Suit
                </Link>
                <p className="hs-doc-card-text" style={{ marginTop: '12px', marginBottom: 0 }}>
                  Questions about shipping or sizing?{" "}
                  <Link href="/contact-us" style={{ color: '#e21b1b', textDecoration: 'underline' }}>Get in touch</Link>.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
