import React from "react";
import Link from "next/link";

// Women's racing suit lander — created 2026-08-22.
//
// The clearest gap in the client keyword list: 10 women's/female terms with
// ZERO coverage anywhere on the site.
//   custom womens racing fire suits          made to measure womens sfi race suit
//   custom sfi 3.2a/5 racing suit women      bespoke women's motorsport fire suit
//   custom tailored female race suits        women's custom auto racing fire suits
//   buy custom female drag racing suit       custom fit women's fireproof race gear
//   female racing fire suits                 women's racing suit
//
// Confirmed with the client that female-specific patterns are cut (not just
// a unisex pattern measured smaller), so the page is written around that.
// If that ever changes, this copy has to change with it — the differentiator
// claimed here is the pattern, not just the measurement.
export default function WomensRaceSuitContent() {
  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="container">
          <p className="contact-breadcrumb">
            <Link href="/">Home</Link>
            <span className="contact-breadcrumb-sep">/</span>
            <span className="contact-breadcrumb-current">Women&rsquo;s Racing Suits</span>
          </p>
          <span className="contact-hero-tag">SFI Approved &bull; Female-Specific Patterns</span>
          <h1 className="contact-hero-title">
            Custom Female<br /><span>Race Suits — SFI Approved</span>
          </h1>
          <p className="contact-hero-subtitle">
            Custom female race suit, SFI approved and cut from a female-specific pattern — not a men&rsquo;s suit in a smaller size. SFI 3.2A/1 and 3.2A/5 certified Nomex, made to your exact measurements in the USA, in any color and layout you want. From $329 with free shipping.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '28px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 20px', borderRadius: '30px', fontWeight: 600,
              fontSize: '0.9rem', background: '#e21b1b', color: '#fff',
              fontFamily: 'Poppins, sans-serif', letterSpacing: '0.5px'
            }}>
              ✓ Female-Specific Pattern
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 20px', borderRadius: '30px', fontWeight: 600,
              fontSize: '0.9rem', background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)', color: '#fff',
              fontFamily: 'Poppins, sans-serif', letterSpacing: '0.5px'
            }}>
              ✓ SFI 3.2A/1 &amp; 3.2A/5
            </span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="hs-doc-section">
        <div className="container">
          <div className="hs-doc-content" style={{ maxWidth: '1000px' }}>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Why a Women&rsquo;s Pattern Actually Matters</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Most manufacturers sell women a men&rsquo;s suit in a smaller size. It technically fits, in the sense that you can zip it up. What it doesn&rsquo;t do is sit correctly — because the proportions a men&rsquo;s pattern assumes aren&rsquo;t the ones you have.
                </p>
                <p className="hs-doc-card-text">The result is familiar to anyone who has raced in one:</p>
                <ul className="hs-doc-list">
                  <li><strong style={{ color: '#fff' }}>Excess fabric across the chest and shoulders</strong> that bunches under a harness every time you turn the wheel.</li>
                  <li><strong style={{ color: '#fff' }}>A waist that sits too low and too wide</strong>, so the suit twists on its own axis rather than moving with you.</li>
                  <li><strong style={{ color: '#fff' }}>Torso length cut for a longer back</strong>, which drags the crotch seam down and restricts pedal reach.</li>
                  <li><strong style={{ color: '#fff' }}>Sleeves and legs shortened but not re-proportioned</strong> — narrower limbs in a suit still cut for wider ones.</li>
                </ul>
                <p className="hs-doc-card-text">
                  None of that is cosmetic. A suit that bunches at the shoulder costs you movement, and a suit that shifts under load is a suit whose fire-resistant layer isn&rsquo;t sitting where it was tested to sit.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">What We Cut Differently</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Every HS Race Gear women&rsquo;s suit starts from a female-specific base pattern and is then built to your own measurements — so you get both the right shape and the right size, rather than one or the other.
                </p>
                <ul className="hs-doc-list">
                  <li><strong style={{ color: '#fff' }}>Bust shaping</strong> built into the panel construction rather than added as an afterthought, so the chest has room without adding width at the shoulder.</li>
                  <li><strong style={{ color: '#fff' }}>Waist-to-hip ratio</strong> drafted separately from the men&rsquo;s pattern instead of graded down from it.</li>
                  <li><strong style={{ color: '#fff' }}>Shorter back rise and torso length</strong>, adjustable to your measurement, so the seat seam sits where it should.</li>
                  <li><strong style={{ color: '#fff' }}>Proportional sleeve and leg taper</strong> — narrowed along the whole limb, not just cut shorter.</li>
                  <li><strong style={{ color: '#fff' }}>Harness-aware shoulder construction</strong> so belt routing sits flat over the collarbone.</li>
                </ul>
                <p className="hs-doc-card-text">
                  The safety specification is identical to our men&rsquo;s suits — same genuine Nomex&reg; meta-aramid, same SFI certification, same construction standards. The pattern is what changes, not the protection.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Certification &amp; Layer Options</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Women&rsquo;s suits are available across the same range as the rest of our line. Which one you need depends on your class, not your size:
                </p>
                <ul className="hs-doc-list">
                  <li><strong style={{ color: '#fff' }}>SFI 3.2A/1 — single layer.</strong> Roughly 3 seconds of thermal protection. Accepted in karting, sportsman drag and many grassroots classes.</li>
                  <li><strong style={{ color: '#fff' }}>SFI 3.2A/5 — double layer.</strong> Roughly 7&ndash;10 seconds. Required by USAC, World of Outlaws, ASCS and most sprint car and dirt late model series.</li>
                  <li><strong style={{ color: '#fff' }}>Higher tiers on request</strong> for drag classes that specify them.</li>
                  <li><strong style={{ color: '#fff' }}>One-piece or two-piece</strong> construction, whichever your series allows.</li>
                </ul>
                <p className="hs-doc-card-text">
                  Not sure which rating applies to you?{" "}
                  <Link href="/certifications" style={{ color: '#e21b1b', textDecoration: 'underline' }}>See the full SFI ratings guide</Link>{" "}
                  or the{" "}
                  <Link href="/blog/sfi-rated-racing-suit-by-class" style={{ color: '#e21b1b', textDecoration: 'underline' }}>rating-by-class breakdown</Link>.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Measuring for a Women&rsquo;s Suit</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  The measurement process is the same 15 points as any custom suit, with a few worth taking extra care over:
                </p>
                <ul className="hs-doc-list">
                  <li><strong style={{ color: '#fff' }}>Chest</strong> — measure at the fullest point, wearing the base layer you actually race in. Fire-resistant underwear changes this measurement.</li>
                  <li><strong style={{ color: '#fff' }}>Waist</strong> — at your natural waist, which is usually higher than where a men&rsquo;s pattern places it.</li>
                  <li><strong style={{ color: '#fff' }}>Torso length</strong> — the measurement most often taken wrong, and the one that determines whether the suit pulls at the shoulders.</li>
                </ul>
                <p className="hs-doc-card-text">
                  Full instructions with diagrams are on the{" "}
                  <Link href="/custom-fit" style={{ color: '#e21b1b', textDecoration: 'underline' }}>how to measure page</Link>{" "}
                  — measure twice, and send the numbers through the form there.
                </p>
              </div>
              <div className="hs-doc-card hs-doc-card-note">
                <p className="hs-doc-card-text">
                  Unsure about any measurement? Send what you have and note where you&rsquo;re uncertain. We&rsquo;d rather ask a question before cutting than build a suit around a number that was guessed.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Design It However You Want</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Colour choice isn&rsquo;t a women&rsquo;s range with three options. It&rsquo;s the same unlimited customisation as every suit we build:
                </p>
                <ul className="hs-doc-list">
                  <li>Any colour combination, any panel layout, fully sublimated</li>
                  <li>Sponsor logos, team branding, driver name and country flag included</li>
                  <li>Digital mockup before anything is cut, with unlimited revisions</li>
                  <li>Matching{" "}
                    <Link href="/custom-gloves" style={{ color: '#e21b1b', textDecoration: 'underline' }}>gloves</Link>{" "}and{" "}
                    <Link href="/custom-shoes" style={{ color: '#e21b1b', textDecoration: 'underline' }}>shoes</Link>{" "}available
                  </li>
                </ul>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Order Your Women&rsquo;s Race Suit</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  From <strong style={{ color: '#e21b1b' }}>$329</strong> with free shipping, made in Watertown, Massachusetts, with a 2&ndash;3 week production time. Order ahead of your season rather than the week before a race weekend.
                </p>
              </div>
              <div className="hs-doc-card" style={{ textAlign: 'center', paddingTop: '32px', paddingBottom: '32px' }}>
                <Link href="/custom-race-suit/order" style={{
                  display: 'inline-block', background: '#e21b1b', color: '#fff',
                  padding: '14px 32px', borderRadius: '8px', fontWeight: 700,
                  fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '1.5px',
                  textTransform: 'uppercase', fontFamily: 'Poppins, sans-serif'
                }}>
                  Design Your Women&rsquo;s Race Suit
                </Link>
                <p className="hs-doc-card-text" style={{ marginTop: '12px', marginBottom: 0 }}>
                  Female-specific pattern, custom-measured, SFI certified.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
