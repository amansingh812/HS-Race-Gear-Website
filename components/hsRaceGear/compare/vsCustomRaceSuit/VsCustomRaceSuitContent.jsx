import React from "react";
import Link from "next/link";

export default function VsCustomRaceSuitContent() {
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
            <span className="contact-breadcrumb-current">Custom Race Suit Comparison</span>
          </p>
          <span className="contact-hero-tag">Compare</span>
          <h1 className="contact-hero-title">
            Custom Race Suits<br /><span>What to Compare Before You Buy</span>
          </h1>
          <p className="contact-hero-subtitle">
            Every custom race suit shop promises a perfect fit and a great price. Here&apos;s how to tell them apart on the four things that actually decide whether you&apos;re happy in twelve months — SFI rating, fit process, all-in price, and lead time.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="hs-doc-section">
        <div className="container">
          <div className="hs-doc-content">

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">The Four Things That Actually Matter</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Custom race suit listings tend to blur together — everyone claims Nomex®, everyone claims custom fit, everyone shows a nice render. The differences that show up later are narrower than the marketing suggests:
                </p>
                <ul className="hs-doc-list">
                  <li><strong>The SFI tag, and its expiry date.</strong> Certification lapses five years from date of manufacture, not date of purchase.</li>
                  <li><strong>Whether &quot;custom&quot; means measured or just sized.</strong> Some shops call a size chart with a name embroidered on it &quot;custom.&quot;</li>
                  <li><strong>The all-in price, not the headline price.</strong> Design fees, logo setup, and rush shipping are where quotes diverge.</li>
                  <li><strong>Realistic lead time.</strong> A suit that arrives after your race weekend is worth nothing that weekend.</li>
                </ul>
                <p className="hs-doc-card-text">
                  Whatever you end up buying, ask those four questions of every shop you&apos;re considering. Below is how HS Race Gear answers them.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">SFI Certification — Get the Right Tier</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Every HS Race Gear suit carries a valid SFI Foundation certification tag. The tier you need is set by your sanctioning body, not by preference:
                </p>
                <ul className="hs-doc-list">
                  <li><strong>SFI 3.2A/1</strong> — single-layer, roughly 3 seconds of thermal protection. Entry-level classes, karting, sportsman drag.</li>
                  <li><strong>SFI 3.2A/5</strong> — multi-layer, roughly 7–10 seconds. Required by USAC, World of Outlaws, ASCS, and most dirt late model and sprint car sanctioning bodies.</li>
                  <li><strong>SFI 3.3/5</strong> — matching gloves and shoes.</li>
                </ul>
                <p className="hs-doc-card-text">
                  Confirm the current requirement with your specific series before ordering — rules change between seasons. Our{" "}
                  <Link href="/blog/understanding-sfi-certifications">SFI ratings explainer</Link>{" "}
                  covers what each rating means, and the{" "}
                  <Link href="/blog/sfi-rated-racing-suit-by-class">rating-by-class breakdown</Link>{" "}
                  maps tiers to common series.
                </p>
              </div>
              <div className="hs-doc-card hs-doc-card-note">
                <p className="hs-doc-card-text">
                  Buying used or heavily discounted? Check the manufacture date on the tag. A suit two years from expiry is worth materially less than the price difference usually reflects.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Measured, Not Sized</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Every HS Race Gear custom suit is built from your own measurement sheet — chest, waist, inseam, sleeve, torso rise, and neck. The suit is cut to fit you <em>seated in the car</em>, which is a different shape than standing.
                </p>
                <p className="hs-doc-card-text">
                  This is where the practical difference shows up. A suit that binds at the shoulders costs you steering range over a long run. Excess fabric at the knees catches on the cage during an egress test. Neither problem is fixable after the fact, and neither shows up in a fitting room where you&apos;re standing still.
                </p>
                <p className="hs-doc-card-text">
                  Our{" "}
                  <Link href="/blog/perfect-custom-fit-racing-suit">measurement guide</Link>{" "}
                  walks through taking your numbers correctly, and the{" "}
                  <Link href="/custom-measurement">measurement form</Link>{" "}
                  is what we build from.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Pricing — Compare the All-In Number</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  HS Race Gear custom SFI-certified suits start at{" "}
                  <strong style={{ color: '#e21b1b' }}>$329</strong>, with free shipping on custom orders.
                </p>
                <p className="hs-doc-card-text">
                  Included at that price, not billed separately:
                </p>
                <ul className="hs-doc-list">
                  <li>Custom measurement and pattern</li>
                  <li>Unlimited colours and panel layouts</li>
                  <li>Sponsor logo placement</li>
                  <li>Driver name, team name, and country flag embroidery</li>
                  <li>Unlimited design revisions before production starts</li>
                  <li>Shipping</li>
                </ul>
                <p className="hs-doc-card-text">
                  See{" "}
                  <Link href="/StandardPricing">full pricing</Link>{" "}
                  for package options, or the{" "}
                  <Link href="/shop">off-the-rack range</Link>{" "}
                  if you need a certified suit immediately rather than in a few weeks.
                </p>
              </div>
              <div className="hs-doc-card hs-doc-card-note">
                <p className="hs-doc-card-text">
                  When you compare quotes, ask for the delivered total including design work, embroidery, and shipping. Headline prices are rarely comparable on their own.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Lead Time — 2–3 Weeks, Domestic</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  HS Race Gear runs a <strong style={{ color: '#e21b1b' }}>2–3 week production timeline</strong> on custom suits. The flow is: measurement form → digital mockup → your revisions → production → quality control → ship.
                </p>
                <p className="hs-doc-card-text">
                  You approve the mockup before anything is cut. Revisions at that stage are unlimited and free — it costs us nothing to change a design file and a great deal to remake a finished suit.
                </p>
                <p className="hs-doc-card-text">
                  Suits are manufactured in the United States at our Watertown, Massachusetts facility. For US racers that means no customs delays, direct contact with the people building your suit, and domestic support if a tech inspector questions your certification.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Materials &amp; Construction</h2>
              <div className="hs-doc-card">
                <ul className="hs-doc-list">
                  <li>Genuine Nomex® meta-aramid outer shell — not FR-treated cotton</li>
                  <li>Fire-resistant quilted inner liner on multi-layer 3.2A/5 builds</li>
                  <li>Reinforced stitching at shoulders, knees, and seat</li>
                  <li>Stretch panels at elbow, underarm, and knee for pedal and steering range</li>
                  <li>Moisture-wicking liner options for endurance and hot-climate racing</li>
                  <li>Arm-restraint-compatible shoulder construction for sprint car applications</li>
                  <li>Sublimated graphics — no cracking or peeling like heat-pressed vinyl</li>
                </ul>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Build for Your Discipline</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Requirements differ by discipline — layer count, restraint compatibility, and cut all change with the car:
                </p>
                <ul className="hs-doc-list">
                  <li><Link href="/custom-race-suit">Custom race suits</Link> — circle track, sprint, dirt late model, drag</li>
                  <li><Link href="/custom-karting-suit">Custom karting suits</Link> — junior and senior</li>
                  <li><Link href="/custom-powerboat-suit">Custom powerboat suits</Link></li>
                  <li><Link href="/custom-gloves">Custom gloves</Link> — SFI 3.3/5</li>
                  <li><Link href="/custom-shoes">Custom shoes</Link> — SFI 3.3/5</li>
                </ul>
                <p className="hs-doc-card-text">
                  Not sure which rating or construction your class needs? The{" "}
                  <Link href="/blog/choose-right-racing-suit">discipline-by-discipline buyer&apos;s guide</Link>{" "}
                  covers it, or{" "}
                  <Link href="/contact-us">ask us directly</Link>{" "}
                  — we&apos;d rather answer a question than sell you the wrong tier.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Common Questions</h2>
              <div className="hs-doc-card">
                <h3 className="hs-doc-card-title">How much does a custom race suit cost?</h3>
                <p className="hs-doc-card-text">
                  Ours start at $329 with free shipping, including measurement, design, embroidery, and unlimited revisions. Industry-wide, custom SFI suits range widely depending on layer count and how much of the design work is billed separately.
                </p>

                <h3 className="hs-doc-card-title">How long does a custom suit take?</h3>
                <p className="hs-doc-card-text">
                  2–3 weeks for us, from approved mockup to shipped. If you need certified gear sooner, the{" "}
                  <Link href="/shop">off-the-rack range</Link>{" "}
                  ships immediately.
                </p>

                <h3 className="hs-doc-card-title">What SFI rating do I need?</h3>
                <p className="hs-doc-card-text">
                  Set by your sanctioning body. 3.2A/1 for entry-level, karting and sportsman drag; 3.2A/5 for USAC, World of Outlaws, ASCS, and most dirt late model and sprint car series. Confirm with your series — rules change between seasons.
                </p>

                <h3 className="hs-doc-card-title">Is custom actually better than off-the-rack?</h3>
                <p className="hs-doc-card-text">
                  For fit and control, yes — it&apos;s cut for you seated. But off-the-rack is a genuinely good answer if the sizing matches your proportions or you need a certified suit this week. Both pass tech; only one waits three weeks.
                </p>

                <h3 className="hs-doc-card-title">Can I match gloves, shoes, and crew apparel?</h3>
                <p className="hs-doc-card-text">
                  Yes — gloves and shoes to SFI 3.3/5, plus{" "}
                  <Link href="/shop?category=crew-shirts">crew shirts</Link>{" "}
                  and{" "}
                  <Link href="/shop?category=hoodies">sublimated hoodies</Link>{" "}
                  in the same design.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Ready to Build?</h2>
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
              <h2 className="hs-doc-heading">Compare Specific Brands</h2>
              <div className="hs-doc-card">
                <ul className="hs-doc-list">
                  <li><Link href="/compare/vs-k1">HS Racegear vs K1 RaceGear</Link></li>
                  <li><Link href="/compare/vs-rush">HS Racegear vs RUSH Racegear</Link></li>
                  <li><Link href="/compare/vs-velocity">HS Racegear vs Velocita</Link></li>
                  <li><Link href="/compare/vs-pyrotect">HS Racegear vs Pyrotect</Link></li>
                  <li><Link href="/compare/vs-simpson">HS Racegear vs Simpson Race Products</Link></li>
                  <li><Link href="/compare/vs-hrx">HS Racegear vs HRX</Link></li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
