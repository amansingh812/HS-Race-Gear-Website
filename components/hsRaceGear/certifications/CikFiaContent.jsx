import React from "react";
import Link from "next/link";

// CIK-FIA Level 2 hub page — created 2026-08-11.
//
// Strategic role: this is the karting twin of /certifications. The site had
// 11 pages about SFI and zero about CIK-FIA, but karting doesn't run on SFI.
// Three kart landers were claiming "CIK Level 2" with nothing on the site
// backing the claim. This page backs it, and becomes the top-of-funnel hub
// that feeds link equity down to the kart landers.
//
// Target keywords (Google Ads Keyword Planner, US, ~350/mo combined):
//   cik fia level 2, cik level 2, cik fia level 2 suit,
//   cik fia level 2 approved, cik fia level 2 fireproof,
//   cik level 2 kart suit, cik kart suit
export default function CikFiaContent() {
  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="container">
          <p className="contact-breadcrumb">
            <Link href="/">Home</Link>
            <span className="contact-breadcrumb-sep">/</span>
            <span className="contact-breadcrumb-current">CIK-FIA Level 2</span>
          </p>
          <span className="contact-hero-tag">Karting Certification Guide (2026)</span>
          <h1 className="contact-hero-title">
            CIK-FIA Level 2<br /><span>Explained</span>
          </h1>
          <p className="contact-hero-subtitle">
            The certification standard every karting suit is measured against — what CIK-FIA Level 2 actually tests, how it differs from Level 1 and from SFI, how to read a homologation tag before it expires, and which US series require it.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '28px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 20px', borderRadius: '30px', fontWeight: 600,
              fontSize: '0.9rem', background: '#e21b1b', color: '#fff',
              fontFamily: 'Poppins, sans-serif', letterSpacing: '0.5px'
            }}>
              ✓ CIK-FIA Level 2
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 20px', borderRadius: '30px', fontWeight: 600,
              fontSize: '0.9rem', background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)', color: '#fff',
              fontFamily: 'Poppins, sans-serif', letterSpacing: '0.5px'
            }}>
              ✓ WKA · SKUSA · Rotax · IAME
            </span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="hs-doc-section">
        <div className="container">
          <div className="hs-doc-content" style={{ maxWidth: '1000px' }}>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">What Is CIK-FIA Level 2?</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  CIK-FIA Level 2 is the homologation standard for karting suits published by the Commission Internationale de Karting, the karting arm of the FIA. A suit carrying a valid Level 2 homologation has been submitted to an FIA-accredited laboratory, tested against a defined set of performance criteria, and issued a homologation number tied to that specific suit model and manufacturer.
                </p>
                <p className="hs-doc-card-text">
                  It is the baseline requirement at every major US national karting series and at essentially all CIK-sanctioned international events. If you race karts at a sanctioned event, this is the standard your suit is checked against at tech.
                </p>
                <p className="hs-doc-card-text">
                  The critical point most buyers miss: <strong style={{ color: '#fff' }}>homologation belongs to the suit model, not to the manufacturer</strong>. A brand can sell both homologated and non-homologated suits side by side. The tag is what counts.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">CIK-FIA Level 2 vs Level 1 — Which One Do You Need?</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  CIK-FIA publishes two levels for karting suits, and the numbering runs the opposite way to what most people assume.
                </p>
                <ul className="hs-doc-list">
                  <li><strong style={{ color: '#fff' }}>Level 2</strong> — the standard specification, and the one written into the rulebooks of the major US series. This is what the overwhelming majority of karting drivers need, from cadet through senior.</li>
                  <li><strong style={{ color: '#fff' }}>Level 1</strong> — a higher-specification homologation, generally seen on suits built for CIK international competition and top-tier events. Higher abrasion performance, correspondingly higher price.</li>
                </ul>
                <p className="hs-doc-card-text">
                  In short: <strong style={{ color: '#e21b1b' }}>Level 2 is the working standard; Level 1 exceeds it.</strong> A Level 1 suit satisfies a Level 2 requirement. A Level 2 suit is what almost every US karter should be buying — paying for Level 1 at club or regional level buys protection your rulebook doesn't ask for.
                </p>
              </div>
              <div className="hs-doc-card hs-doc-card-note">
                <p className="hs-doc-card-text">
                  Always confirm against your own series rulebook for the current season. Requirements are revised, and tech inspectors work from the rulebook in front of them, not from what was true last year.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">CIK-FIA vs SFI — Why a Karting Suit Isn&rsquo;t a Car Racing Suit</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  This is the single most common point of confusion, and it costs people money. CIK-FIA and SFI are not two brands of the same thing — they test for fundamentally different hazards, because karting and car racing fail in different ways.
                </p>
                <ul className="hs-doc-list">
                  <li><strong style={{ color: '#fff' }}>SFI 3.2A tests thermal protection.</strong> A closed-cockpit or open-wheel car carries fuel and can burn. The SFI rating measures TPP — how many seconds of protection the fabric gives against direct flame. That&rsquo;s the whole design problem.</li>
                  <li><strong style={{ color: '#fff' }}>CIK-FIA Level 2 tests abrasion resistance.</strong> A kart carries very little fuel and sits inches off the tarmac. The realistic failure mode is not fire — it&rsquo;s a driver leaving the kart and sliding along the track surface. Level 2 is built around impact abrasion, tear strength, and seam integrity.</li>
                </ul>
                <p className="hs-doc-card-text">
                  Which is why <strong style={{ color: '#fff' }}>an SFI-rated car racing suit will generally not pass karting tech</strong>, even though it may be a far more expensive garment. It was engineered for a hazard the kart track doesn&rsquo;t present, and not engineered for the one it does.
                </p>
                <p className="hs-doc-card-text">
                  It runs the other way too. A CIK Level 2 karting suit is not a substitute for an SFI-rated suit in a car. If you race both — a lot of drivers do — you need both.{" "}
                  <Link href="/certifications" style={{ color: '#e21b1b', textDecoration: 'underline' }}>See our full SFI ratings guide</Link>{" "}
                  for the car side, and{" "}
                  <Link href="/blog/sfi-vs-fia-rating" style={{ color: '#e21b1b', textDecoration: 'underline' }}>SFI vs FIA 8856-2018</Link>{" "}
                  if you&rsquo;re comparing car-racing certifications.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">How to Read a CIK-FIA Homologation Tag</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Every homologated karting suit carries a label with the information a tech inspector will look for. Learn to read it before you buy — particularly if you&rsquo;re buying used.
                </p>
                <ul className="hs-doc-list">
                  <li><strong style={{ color: '#fff' }}>Homologation number</strong> — identifies the specific approved suit model and the issuing authority.</li>
                  <li><strong style={{ color: '#fff' }}>Level designation</strong> — Level 1 or Level 2, printed explicitly.</li>
                  <li><strong style={{ color: '#fff' }}>Validity period</strong> — the reason to read the tag at all. See below.</li>
                  <li><strong style={{ color: '#fff' }}>Manufacturer identification</strong> and the suit model name.</li>
                </ul>
                <p className="hs-doc-card-text">
                  <strong style={{ color: '#e21b1b' }}>Homologations expire.</strong> This is what catches people out. A CIK-FIA homologation is issued with a validity period, and once it lapses, that suit is no longer compliant no matter how good the fabric still looks. Buy a three-year-old suit secondhand and you may be buying a garment that will not pass tech next season.
                </p>
                <p className="hs-doc-card-text">
                  Two habits worth building: photograph your tag when the suit is new, so you have the number and dates if the label wears; and check the validity date before every season rather than the morning of a race weekend.
                </p>
              </div>
              <div className="hs-doc-card hs-doc-card-note">
                <p className="hs-doc-card-text">
                  Buying used to save money on a fast-growing junior driver is understandable — but check the homologation validity before you hand over cash. A cheap suit that fails tech at the first national event isn&rsquo;t cheap.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Which US Karting Series Require CIK-FIA Level 2?</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Every major US national karting body specifies CIK-FIA Level 2 as the baseline for sanctioned competition:
                </p>
                <ul className="hs-doc-list">
                  <li><strong style={{ color: '#fff' }}>WKA</strong> (World Karting Association) — Level 2 minimum across cadet, junior, and senior classes at national events.</li>
                  <li><strong style={{ color: '#fff' }}>SKUSA</strong> (Superkarts! USA) — Level 2 for all sanctioned events, including Micro Swift, Mini Swift, Junior, and the shifter classes. SuperNationals carries additional equipment requirements.</li>
                  <li><strong style={{ color: '#fff' }}>Rotax Max Challenge USA</strong> — Level 2, with a fit check at registration for junior classes.</li>
                  <li><strong style={{ color: '#fff' }}>IAME USA East / West</strong> — Level 2; inspectors are notably strict on suit condition as well as certification.</li>
                  <li><strong style={{ color: '#fff' }}>USPKS and most regional series</strong> — Level 2 minimum.</li>
                </ul>
                <p className="hs-doc-card-text">
                  Club-level and arrive-and-drive rental karting are the exception — many clubs accept any abrasion-resistant suit. But the moment you enter a sanctioned regional or national event, Level 2 is the floor.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">What Level 2 Actually Tests For</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Unlike SFI, there is no single headline number — no karting equivalent of &ldquo;10 seconds of protection.&rdquo; Level 2 homologation assesses the garment as a complete system:
                </p>
                <ul className="hs-doc-list">
                  <li><strong style={{ color: '#fff' }}>Abrasion resistance</strong> — how the outer shell survives contact with track surface under load. The primary criterion.</li>
                  <li><strong style={{ color: '#fff' }}>Tear and tensile strength</strong> — whether the material propagates a tear once one starts.</li>
                  <li><strong style={{ color: '#fff' }}>Seam integrity</strong> — seams are where suits fail in a slide, so construction is assessed, not just fabric.</li>
                  <li><strong style={{ color: '#fff' }}>Coverage and design</strong> — cuff, collar, and closure requirements so the suit stays closed under load.</li>
                </ul>
                <p className="hs-doc-card-text">
                  So if you&rsquo;re looking for a TPP number on a karting suit, you won&rsquo;t find one — TPP is an SFI thermal measurement and doesn&rsquo;t apply here.{" "}
                  <Link href="/blog/tpp-rating-explained" style={{ color: '#e21b1b', textDecoration: 'underline' }}>More on what TPP measures</Link>.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Shop CIK Level 2 Karting Suits</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Every HS Race Gear karting suit is built to CIK Level 2 specification and made to your exact measurements — not pulled from a size run. Custom colors, sponsor logos, and driver name included, with a digital mockup before anything is cut.
                </p>
                <ul className="hs-doc-list">
                  <li><Link href="/custom-karting-suit" style={{ color: '#e21b1b', textDecoration: 'underline' }}>Custom kart racing suits</Link> — senior and adult classes, full custom design.</li>
                  <li><Link href="/custom-junior-karting-suit" style={{ color: '#e21b1b', textDecoration: 'underline' }}>Youth &amp; kids karting suits</Link> — ages 8&ndash;15, built with growth room for cadet, micro, mini and junior classes.</li>
                  <li><Link href="/custom-shifter-kart-suit" style={{ color: '#e21b1b', textDecoration: 'underline' }}>Shifter kart suits</Link> — KZ, IAME X30 Shifter and Stock Honda, with reinforced right shoulder.</li>
                  <li><Link href="/go-kart-racing-apparel" style={{ color: '#e21b1b', textDecoration: 'underline' }}>Full karting kit</Link> — suit, gloves, shoes and what else you need to get to the grid.</li>
                </ul>
              </div>
              <div className="hs-doc-card" style={{ textAlign: 'center', paddingTop: '32px', paddingBottom: '32px' }}>
                <Link href="/custom-karting-suit/order" style={{
                  display: 'inline-block', background: '#e21b1b', color: '#fff',
                  padding: '14px 32px', borderRadius: '8px', fontWeight: 700,
                  fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '1.5px',
                  textTransform: 'uppercase', fontFamily: 'Poppins, sans-serif'
                }}>
                  Design Your CIK Level 2 Karting Suit
                </Link>
                <p className="hs-doc-card-text" style={{ marginTop: '12px', marginBottom: 0 }}>Custom-measured, made in the USA, from $329.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
