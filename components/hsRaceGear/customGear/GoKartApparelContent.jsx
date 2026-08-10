import React from "react";
import Link from "next/link";

// Go-kart apparel collection page — created 2026-08-11.
//
// Targets a 2,150/mo cluster with full-kit intent that had no page:
//   gokart outfit (500), go kart racing outfit (500),
//   go kart racing apparel (500), go kart racing jackets (500),
//   go kart driving suit (500), kart overalls / go karting overalls /
//   go kart racing overalls (50 each)
//
// Note the language: "outfit", "apparel", "overalls", "jackets" — this is
// someone assembling a whole kit, not buying a single suit. Higher basket
// than the suit-only searcher. "Overalls" also captures the British and
// Commonwealth phrasing the site was invisible for.
export default function GoKartApparelContent() {
  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="container">
          <p className="contact-breadcrumb">
            <Link href="/">Home</Link>
            <span className="contact-breadcrumb-sep">/</span>
            <span className="contact-breadcrumb-current">Go Kart Racing Apparel</span>
          </p>
          <span className="contact-hero-tag">Complete Karting Kit</span>
          <h1 className="contact-hero-title">
            Go Kart Racing<br /><span>Apparel &amp; Outfits</span>
          </h1>
          <p className="contact-hero-subtitle">
            Everything you wear on the grid — kart racing suit, gloves, shoes, and the protection that goes underneath. Custom-made to your measurements in the USA, CIK Level 2 certified, with your colors and sponsor logos included. Suits from $329.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="hs-doc-section">
        <div className="container">
          <div className="hs-doc-content" style={{ maxWidth: '1000px' }}>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">What You Actually Need to Race a Kart</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  If you&rsquo;re putting a karting outfit together for the first time, the list is shorter than it looks — and most of it is required by tech, not optional. Here&rsquo;s the full kit, in the order it matters.
                </p>
                <ul className="hs-doc-list">
                  <li><strong style={{ color: '#fff' }}>Kart racing suit (overalls)</strong> — CIK Level 2 homologated. Required at every sanctioned event. This is the piece you should not compromise on.</li>
                  <li><strong style={{ color: '#fff' }}>Gloves</strong> — abrasion protection for the part of you most likely to hit the ground first.</li>
                  <li><strong style={{ color: '#fff' }}>Shoes</strong> — high-ankle, thin-soled for pedal feel, with a smooth outer so they don&rsquo;t catch on the pedals.</li>
                  <li><strong style={{ color: '#fff' }}>Helmet</strong> — Snell or FIA rated per your series. We don&rsquo;t make helmets; buy from a specialist and check the rating against your rulebook.</li>
                  <li><strong style={{ color: '#fff' }}>Rib protector</strong> — not usually mandated, but karts transmit a lot through the seat. Most drivers who race more than a handful of weekends end up wearing one.</li>
                  <li><strong style={{ color: '#fff' }}>Neck brace or collar</strong> — required by some series for junior classes. Check your rulebook.</li>
                </ul>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Custom Kart Racing Suits &amp; Overalls</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Kart overalls are the centerpiece of the outfit and the only piece with a hard certification requirement. Every HS Race Gear kart suit is built to{" "}
                  <Link href="/cik-fia-level-2" style={{ color: '#e21b1b', textDecoration: 'underline' }}>CIK-FIA Level 2</Link>{" "}
                  specification and cut to your measurements rather than pulled from a size run — which matters more in karting than most people expect, because a loose suit bunches at the shoulders every time you turn the wheel.
                </p>
                <p className="hs-doc-card-text">Choose the suit built for how you race:</p>
                <ul className="hs-doc-list">
                  <li><Link href="/custom-karting-suit" style={{ color: '#e21b1b', textDecoration: 'underline' }}>Custom kart racing suits</Link> — senior and adult classes, unlimited color and logo options.</li>
                  <li><Link href="/custom-junior-karting-suit" style={{ color: '#e21b1b', textDecoration: 'underline' }}>Youth &amp; kids karting suits</Link> — ages 8&ndash;15, with growth room built into the knees and cuffs.</li>
                  <li><Link href="/custom-shifter-kart-suit" style={{ color: '#e21b1b', textDecoration: 'underline' }}>Shifter kart suits</Link> — KZ, IAME X30 Shifter, Stock Honda, with a reinforced right shoulder.</li>
                </ul>
                <p className="hs-doc-card-text">
                  Every suit includes a digital mockup before production, unlimited revisions, driver name, country flag, and sponsor logos. From <strong style={{ color: '#e21b1b' }}>$329</strong> with free shipping.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Karting Gloves</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Karting gloves take more abuse than car racing gloves — you&rsquo;re gripping a small wheel with a lot of feedback for long stints, and your hands lead in a slide. Look for reinforced palms, pre-curved fingers, and a cuff that overlaps the suit sleeve rather than leaving a gap at the wrist.
                </p>
                <p className="hs-doc-card-text">
                  <Link href="/custom-gloves" style={{ color: '#e21b1b', textDecoration: 'underline' }}>Custom racing gloves</Link> — matched to your suit design, in your team colors.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Karting Shoes &amp; Boots</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Kart shoes are a different shape from car racing shoes. You want a high ankle for abrasion coverage, a thin sole for pedal feel, and a smooth, rounded outer edge so the shoe slides off the pedal cleanly instead of snagging. Bulky soles cost you throttle modulation.
                </p>
                <p className="hs-doc-card-text">
                  <Link href="/custom-shoes" style={{ color: '#e21b1b', textDecoration: 'underline' }}>Custom racing shoes</Link> — designed to match your suit and gloves.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Team &amp; Crew Apparel</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  If you&rsquo;re running a kart team or a family programme, matching crew apparel does more work than it sounds — it makes the tent look organised and gives sponsors something to be on that isn&rsquo;t the driver.
                </p>
                <p className="hs-doc-card-text">
                  We produce sublimated crew hoodies and shirts in the same artwork as your suit, so the whole paddock setup matches.{" "}
                  <Link href="/shop" style={{ color: '#e21b1b', textDecoration: 'underline' }}>Browse crew apparel</Link>.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Buying a Full Karting Outfit — What to Get Right</h2>
              <div className="hs-doc-card">
                <ul className="hs-doc-list">
                  <li><strong style={{ color: '#fff' }}>Check certification before anything else.</strong> A suit that fails tech is worthless regardless of price. Confirm CIK Level 2 and check the homologation validity date.</li>
                  <li><strong style={{ color: '#fff' }}>Fit the chest and shoulders, not the length.</strong> Cuffs and stretch panels adjust length. Chest and shoulders don&rsquo;t. This is the most common sizing mistake.</li>
                  <li><strong style={{ color: '#fff' }}>Buy the suit and the accessories together</strong> if you want them to match — retrofitting a color scheme later rarely comes out right.</li>
                  <li><strong style={{ color: '#fff' }}>Think about what dirt looks like on your color choice.</strong> White looks superb in the paddock on Saturday morning and rough by Sunday afternoon.</li>
                  <li><strong style={{ color: '#fff' }}>Order ahead of the season.</strong> Custom production runs 2&ndash;3 weeks. Ordering the week before a national event is how people end up in a rental suit.</li>
                </ul>
              </div>
              <div className="hs-doc-card hs-doc-card-note">
                <p className="hs-doc-card-text">
                  Not sure what your series requires? Start with the{" "}
                  <Link href="/cik-fia-level-2" style={{ color: '#e21b1b', textDecoration: 'underline' }}>CIK-FIA Level 2 guide</Link>{" "}
                  — it covers WKA, SKUSA, Rotax Max, IAME and the regional series in one place.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <div className="hs-doc-card" style={{ textAlign: 'center', paddingTop: '32px', paddingBottom: '32px' }}>
                <Link href="/custom-karting-suit/order" style={{
                  display: 'inline-block', background: '#e21b1b', color: '#fff',
                  padding: '14px 32px', borderRadius: '8px', fontWeight: 700,
                  fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '1.5px',
                  textTransform: 'uppercase', fontFamily: 'Poppins, sans-serif'
                }}>
                  Build Your Karting Outfit
                </Link>
                <p className="hs-doc-card-text" style={{ marginTop: '12px', marginBottom: 0 }}>Custom-measured, made in the USA, free shipping.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
