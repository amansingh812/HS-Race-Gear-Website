import React from "react";
import Link from "next/link";

export default function BlogPost11SfiVsFia() {
  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="container">
          <p className="contact-breadcrumb">
            <Link href="/">Home</Link>
            <span className="contact-breadcrumb-sep">/</span>
            <Link href="/blog">Blog</Link>
            <span className="contact-breadcrumb-sep">/</span>
            <span className="contact-breadcrumb-current">SFI vs FIA</span>
          </p>
          <span className="contact-hero-tag">Certification Guide</span>
          <h1 className="contact-hero-title">
            SFI vs FIA<br /><span>Which Rating Do You Need?</span>
          </h1>
          <p className="contact-hero-subtitle">
            Two different certification bodies, two different test methods, and almost no overlap in who accepts what. Here&apos;s the practical difference between SFI 3.2A and FIA 8856-2018 — and how to tell which one your series actually requires.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="hs-doc-section">
        <div className="container">
          <div className="hs-doc-content">

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">The Short Answer</h2>
              <div className="hs-doc-card hs-doc-card-note">
                <p className="hs-doc-card-text">
                  <strong>If you race in the United States,</strong> you almost certainly need SFI. NHRA, IHRA, USAC, World of Outlaws, ASCS, POWRi, and virtually every weekly oval and drag track in the country write their rulebooks around SFI specs.
                </p>
                <p className="hs-doc-card-text">
                  <strong>If you race internationally or in FIA-sanctioned events,</strong> you need FIA 8856-2018. That includes most European circuit racing, international rally, and any event running under an FIA International Sporting Code appendix.
                </p>
                <p className="hs-doc-card-text">
                  <strong>A suit certified to one is not automatically accepted by the other.</strong> They are separate certifications from separate organizations. Some manufacturers dual-certify; most do not.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Who Are SFI and FIA?</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  <strong>SFI Foundation, Inc.</strong> is a non-profit US organization that issues specifications for motorsport safety equipment. It doesn&apos;t manufacture anything — it writes the spec, and manufacturers self-certify against it under SFI&apos;s program, with periodic audit. SFI specs cover everything from driveshaft loops to helmets. For driver apparel, the relevant family is <strong>SFI 3.2A</strong>.
                </p>
                <p className="hs-doc-card-text">
                  <strong>FIA (Fédération Internationale de l&apos;Automobile)</strong> is the international governing body for world motorsport. Its homologation standards are tested by FIA-approved laboratories rather than self-certified, and the current driver apparel standard is <strong>FIA 8856-2018</strong> (which superseded FIA 8856-2000).
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">How the Two Standards Actually Differ</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  The most important structural difference: <strong>SFI 3.2A is tiered, FIA 8856-2018 is a single pass/fail standard.</strong>
                </p>
                <p className="hs-doc-card-text">
                  SFI 3.2A uses a numeric suffix that corresponds to a TPP (Thermal Protective Performance) rating — the number after the slash. Higher number, more thermal protection:
                </p>
                <ul className="hs-doc-list">
                  <li><strong>SFI 3.2A/1</strong> — TPP 6 minimum, roughly 3 seconds before second-degree burn. Single layer.</li>
                  <li><strong>SFI 3.2A/5</strong> — TPP 19 minimum, roughly 7–10 seconds. Multi-layer.</li>
                  <li><strong>SFI 3.2A/15</strong> — TPP 60 minimum, roughly 30 seconds. Heavy multi-layer, top fuel and funny car territory.</li>
                  <li><strong>SFI 3.2A/20</strong> and above exist for the most extreme fuel-load classes.</li>
                </ul>
                <p className="hs-doc-card-text">
                  FIA 8856-2018 has no tiers. A suit either meets the standard or it doesn&apos;t. The standard specifies heat transfer index (HTI) thresholds, flame-resistance behaviour, seam strength, and shrinkage limits, tested as a complete garment rather than as fabric alone.
                </p>
                <p className="hs-doc-card-text">
                  In practical protection terms, FIA 8856-2018 sits broadly in the same territory as a good SFI 3.2A/5 — but the two aren&apos;t directly convertible, because they measure different things under different test conditions. Anyone telling you &quot;FIA 8856 equals SFI 3.2A/5&quot; is approximating.
                </p>
                <p className="hs-doc-card-text">
                  For a deeper explanation of what the TPP number means and why two suits at the same SFI tier can protect differently, see our{" "}
                  <Link href="/blog/tpp-rating-explained">TPP rating explainer</Link>.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Side-by-Side Comparison</h2>
              <div className="hs-doc-card">
                <ul className="hs-doc-list">
                  <li><strong>Governing body</strong> — SFI: SFI Foundation (US, non-profit). FIA: Fédération Internationale de l&apos;Automobile (international).</li>
                  <li><strong>Structure</strong> — SFI: tiered (3.2A/1, /5, /15, /20). FIA: single pass/fail standard.</li>
                  <li><strong>Certification route</strong> — SFI: manufacturer self-certification under SFI program with audit. FIA: testing at FIA-approved laboratories.</li>
                  <li><strong>Primary measure</strong> — SFI: TPP (Thermal Protective Performance). FIA: HTI (Heat Transfer Index) plus garment-level criteria.</li>
                  <li><strong>Tested as</strong> — SFI: fabric assembly. FIA: complete garment including seams and closures.</li>
                  <li><strong>Expiry</strong> — SFI: 5 years from date of manufacture, printed on the tag. FIA: 10 years from date of homologation label for 8856-2018.</li>
                  <li><strong>Where accepted</strong> — SFI: US sanctioning bodies (NHRA, IHRA, USAC, WoO, ASCS, POWRi, weekly tracks). FIA: international and FIA-sanctioned competition, most European circuit racing.</li>
                  <li><strong>Typical cost</strong> — FIA-homologated suits generally carry a price premium, driven largely by lab testing and homologation cost rather than material difference.</li>
                </ul>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Where SCCA and Club Racing Land</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  This is the genuinely confusing middle ground. <strong>SCCA accepts either</strong> for most club racing classes — SFI 3.2A/5 or FIA 8856-2018 will generally satisfy a road racing tech inspection, and the GCR specifies the acceptable options by class.
                </p>
                <p className="hs-doc-card-text">
                  NASA, vintage groups, and regional road racing organizations vary. Some mirror SCCA and accept both; some specify one. Because these rules are revised annually, always confirm against the current-season rulebook for your specific class before ordering, not against what was true last year or what a forum post says.
                </p>
                <p className="hs-doc-card-text">
                  Our{" "}
                  <Link href="/blog/sfi-rated-racing-suit-by-class">SFI rating by racing class guide</Link>{" "}
                  breaks down the requirements discipline by discipline, and the{" "}
                  <Link href="/custom-road-racing-suit">road racing suit page</Link>{" "}
                  covers SCCA and NASA specifically.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Common Misconceptions</h2>
              <div className="hs-doc-card">
                <ul className="hs-doc-list">
                  <li><strong>&quot;FIA is stricter, so it&apos;s always better.&quot;</strong> FIA testing is more rigorous procedurally — full-garment, independent lab. But an SFI 3.2A/15 suit provides considerably more thermal protection than the FIA 8856-2018 minimum. &quot;Stricter process&quot; and &quot;more protection&quot; are different claims.</li>
                  <li><strong>&quot;My FIA suit will pass US tech.&quot;</strong> Not reliably. A drag racing tech inspector looking for an SFI 3.2A/5 tag will not accept an FIA label as a substitute unless the rulebook explicitly permits it.</li>
                  <li><strong>&quot;Certification lasts forever.&quot;</strong> No. SFI tags expire 5 years from manufacture; FIA 8856-2018 labels run 10 years from homologation. An expired tag fails inspection regardless of the suit&apos;s physical condition.</li>
                  <li><strong>&quot;Higher SFI number is always the right choice.&quot;</strong> A 3.2A/15 suit is heavier and hotter than a 3.2A/1. If your class only requires 3.2A/1, over-buying costs you comfort and cooling for protection you statistically won&apos;t need at that fuel load. Buy for the car you intend to run.</li>
                </ul>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">How to Decide — Three Questions</h2>
              <div className="hs-doc-card">
                <ul className="hs-doc-list">
                  <li><strong>1. Where do you compete?</strong> US-only means SFI. International or FIA-sanctioned means FIA 8856-2018. Both means you may need two suits, or one dual-certified suit.</li>
                  <li><strong>2. What does your current-season rulebook say, by class?</strong> Not the series generally — your specific class. Requirements often step up with elapsed time, speed, or engine configuration.</li>
                  <li><strong>3. What are you building toward?</strong> If you plan to move up a class this season, certify for the class you&apos;re moving into. Suits aren&apos;t upgradeable.</li>
                </ul>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">What HS Race Gear Builds</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  HS Race Gear builds custom SFI-certified suits to <strong>SFI 3.2A/1</strong> and <strong>SFI 3.2A/5</strong>, with higher tiers available on request. Every suit is made to your measurements in the USA, from genuine Nomex® meta-aramid, with a 2–3 week production timeline.
                </p>
                <p className="hs-doc-card-text">
                  If you&apos;re unsure which certification your series requires, contact us with your series and class and we&apos;ll confirm against the current rulebook before you order — it&apos;s a five-minute conversation that prevents an expensive mistake.
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
                  Design Your Custom SFI Suit
                </Link>
                <p className="hs-doc-card-text" style={{ marginTop: '12px', marginBottom: 0 }}>
                  SFI 3.2A/1 and 3.2A/5. Made in the USA. Custom-measured.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Related Reading</h2>
              <div className="hs-doc-card">
                <ul className="hs-doc-list">
                  <li><Link href="/blog/understanding-sfi-certifications">Understanding SFI Certifications — the full ratings explainer</Link></li>
                  <li><Link href="/blog/sfi-rated-racing-suit-by-class">SFI Rated Racing Suit by Class — discipline-by-discipline requirements</Link></li>
                  <li><Link href="/blog/tpp-rating-explained">TPP Rating Explained — what the number behind the slash means</Link></li>
                  <li><Link href="/blog/endurance-racing-suit-guide">Endurance Racing Suits — where FIA standards matter most</Link></li>
                  <li><Link href="/certifications">HS Race Gear certifications overview</Link></li>
                </ul>
              </div>
            </div>

            <div className="hs-doc-block">
              <div className="hs-doc-card hs-doc-card-note">
                <p className="hs-doc-card-text" style={{ fontSize: '0.85rem' }}>
                  <strong>Verify before you order.</strong> Sanctioning body rules are revised annually and this guide reflects the 2026 season. Always confirm the current requirement for your specific class with your series&apos; official rulebook or tech director. Certification thresholds referenced here are the published minimums for each standard.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
