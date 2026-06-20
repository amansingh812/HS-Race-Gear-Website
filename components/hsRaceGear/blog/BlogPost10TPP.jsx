import React from "react";
import Link from "next/link";
import Image from "next/image";
import RelatedBlogPosts from "@/components/hsRaceGear/blog/RelatedBlogPosts";

export default function BlogPost10TPP() {
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
            <span className="contact-breadcrumb-current">TPP Rating Explained</span>
          </p>
          <span className="contact-hero-tag">Safety Standards</span>
          <h1 className="contact-hero-title">
            TPP Rating<br /><span>Explained</span>
          </h1>
          <p className="contact-hero-subtitle">
            Thermal Protective Performance — what the number actually measures, why two SFI 3.2A/5 suits can have wildly different TPP scores, and how to read TPP when comparing racing suits.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="blog-post-section">
        <div className="container">
          <div className="blog-post-content">

            <Link href="/blog" className="blog-back-link">
              ← Back to Blog
            </Link>

            <div className="blog-post-meta">
              <span className="blog-post-tag">Safety Standards</span>
              <span className="blog-post-date">June 2026 · 7 min read</span>
            </div>

            <div className="blog-post-title-block">
              <h2 className="blog-post-main-title">TPP Rating Explained — What Thermal Protective Performance Actually Measures (And Why It Matters More Than SFI)</h2>
              <p className="blog-post-subtitle">The hidden number behind every SFI rating, broken down for racers who want to know what's really protecting them.</p>
            </div>

            {/* INTRO */}
            <div className="blog-body-block">
              <div className="blog-body-card">
                <p className="blog-body-text">
                  Every racing suit has an SFI rating. SFI 3.2A/1. SFI 3.2A/5. SFI 3.2A/15. Most racers know what these mean: higher number, more protection. What most racers don't know — including some sanctioning body tech inspectors — is that the SFI number isn't actually the measurement. It's a classification tier based on another number called <strong>TPP, or Thermal Protective Performance</strong>. TPP is what's really being tested. SFI is just the label.
                </p>
                <p className="blog-body-text">
                  This matters because two suits with the same SFI rating can have meaningfully different TPP scores — and therefore meaningfully different real-world protection. This guide explains exactly what TPP measures, how it's calculated, why it varies within an SFI tier, and what to look for when comparing racing suits at the spec-sheet level. If you've already read our{" "}
                  <Link href="/blog/understanding-sfi-certifications" style={{ color: "#e21b1b", textDecoration: "underline" }}>
                    SFI Ratings Explained guide
                  </Link>
                  , this is the next layer down — what's inside that label.
                </p>
              </div>
            </div>

            {/* WHAT IS TPP */}
            <div className="blog-body-block">
              <h2 className="blog-body-heading">What Is TPP (Thermal Protective Performance)?</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  Thermal Protective Performance is a laboratory measurement of how long a fabric or garment can protect human skin from second-degree burns when exposed to a controlled heat source. The test was originally developed for firefighter turnout gear in the 1970s and adopted by the SFI Foundation for motorsport applications shortly after.
                </p>
                <p className="blog-body-text">
                  Here's the test, simplified:
                </p>
                <ul className="blog-body-list">
                  <li>A fabric sample is mounted in a test stand</li>
                  <li>A propane-burner heat flux of 2.0 cal/cm²/sec is applied to one side</li>
                  <li>A copper calorimeter behind the fabric records the time it takes for enough heat to pass through to cause a second-degree burn on human skin</li>
                  <li>That time, in seconds × 2, is the TPP value</li>
                </ul>
                <p className="blog-body-text" style={{ marginTop: "14px" }}>
                  A TPP of 6 means roughly 3 seconds of protection. A TPP of 20 means roughly 10 seconds. <strong style={{ color: "#e21b1b" }}>Higher TPP = more time before serious injury.</strong>
                </p>
              </div>
              <div className="blog-highlight-box">
                <p>Three seconds doesn't sound like much. But in a real cockpit fire, three seconds is the difference between getting your harness off and not. SFI 3.2A/1 with TPP 6 has saved racers' lives. SFI 3.2A/5 with TPP 20 has saved many more.</p>
              </div>
            </div>

            {/* SFI VS TPP */}
            <div className="blog-body-block">
              <h2 className="blog-body-heading">SFI Rating vs TPP — How They Relate</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  SFI ratings are tiers. TPP is the underlying score. The SFI Foundation sets a minimum TPP for each tier:
                </p>
                <ul className="blog-body-list">
                  <li><strong style={{ color: "#e21b1b" }}>SFI 3.2A/1</strong> — minimum TPP of 6 (roughly 3 seconds of protection)</li>
                  <li><strong style={{ color: "#e21b1b" }}>SFI 3.2A/3</strong> — minimum TPP of 14 (roughly 7 seconds of protection)</li>
                  <li><strong style={{ color: "#e21b1b" }}>SFI 3.2A/5</strong> — minimum TPP of 19 (roughly 9–10 seconds)</li>
                  <li><strong style={{ color: "#e21b1b" }}>SFI 3.2A/10</strong> — minimum TPP of 38 (roughly 19 seconds)</li>
                  <li><strong style={{ color: "#e21b1b" }}>SFI 3.2A/15</strong> — minimum TPP of 60 (roughly 30 seconds)</li>
                  <li><strong style={{ color: "#e21b1b" }}>SFI 3.2A/20</strong> — minimum TPP of 80 (roughly 40 seconds)</li>
                </ul>
                <p className="blog-body-text" style={{ marginTop: "14px" }}>
                  Here's the key point most racers miss: <strong>these are minimums, not exact values</strong>. A suit can be SFI 3.2A/5 certified with a TPP score of 19, 22, 25, or even higher. The SFI tier is the floor; the actual TPP can be anywhere above it.
                </p>
              </div>
            </div>

            {/* WHY TPP VARIES */}
            <div className="blog-body-block">
              <h2 className="blog-body-heading">Why Two SFI 3.2A/5 Suits Can Have Different TPP Scores</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  Three factors drive how much TPP a suit actually delivers above its SFI minimum:
                </p>
                <ul className="blog-body-list">
                  <li><strong style={{ color: "#e21b1b" }}>Material choice.</strong> Genuine Nomex® meta-aramid has higher inherent TPP than fire-retardant treated Proban cotton or polyester blends, even at the same layer count. A two-layer Nomex® suit can hit TPP 26+ where a two-layer Proban suit just clears 19.</li>
                  <li><strong style={{ color: "#e21b1b" }}>Layer construction and air gaps.</strong> Multi-layer construction with deliberate air gaps between layers traps insulating air, which raises TPP. Tightly-bonded multi-layer construction can actually score lower.</li>
                  <li><strong style={{ color: "#e21b1b" }}>Inner liner.</strong> A breathable knit inner liner adds TPP at the cost of weight. Some performance-focused suits skip the inner liner to save weight, which means they barely clear the SFI 3.2A/5 minimum.</li>
                </ul>
                <p className="blog-body-text" style={{ marginTop: "14px" }}>
                  This is why a $300 SFI 3.2A/5 suit and a $1,500 SFI 3.2A/5 suit are not the same product. The SFI label confirms both meet the minimum. The TPP score — when manufacturers publish it — tells you which one over-performs.
                </p>
              </div>
              <div className="blog-tip-card" style={{ marginTop: "14px" }}>
                <p className="blog-tip-label">Buyer Tip</p>
                <p className="blog-body-text" style={{ margin: 0 }}>
                  When comparing suits at the same SFI rating, ask the manufacturer for the actual TPP score. If they can't or won't tell you, the suit probably just clears the minimum.
                </p>
              </div>
            </div>

            {/* TPP BY DISCIPLINE */}
            <div className="blog-body-block">
              <h2 className="blog-body-heading">What TPP Do You Actually Need For Your Discipline?</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  TPP needed for survival depends on fire risk — fuel type, fuel quantity, cockpit enclosure, and how long it takes to bail out. Practical TPP recommendations by discipline:
                </p>
                <ul className="blog-body-list">
                  <li><strong style={{ color: "#e21b1b" }}>Local autocross, track day:</strong> TPP 6+ (SFI 3.2A/1 minimum). Low fuel exposure, quick egress.</li>
                  <li><strong style={{ color: "#e21b1b" }}>Sprint car, dirt late model:</strong> TPP 19+ (SFI 3.2A/5 minimum). Methanol risk, open cockpit, sustained heat exposure.</li>
                  <li><strong style={{ color: "#e21b1b" }}>Drag racing (10.00+ ET):</strong> TPP 19+ (SFI 3.2A/5 minimum).</li>
                  <li><strong style={{ color: "#e21b1b" }}>Drag racing (9.99 ET and quicker):</strong> TPP 60+ (SFI 3.2A/15 minimum). Nitromethane risk, high-cone fire potential.</li>
                  <li><strong style={{ color: "#e21b1b" }}>Top Fuel / nitro classes:</strong> TPP 80+ (SFI 3.2A/20 minimum). Catastrophic fuel risk.</li>
                  <li><strong style={{ color: "#e21b1b" }}>Karting:</strong> TPP 6+ (SFI 3.2A/1 baseline via CIK Level 2). Abrasion is the primary risk, not fire.</li>
                  <li><strong style={{ color: "#e21b1b" }}>Road racing (SCCA/NASA):</strong> TPP 19+ (SFI 3.2A/5 minimum or FIA 8856-2018 equivalent).</li>
                </ul>
                <p className="blog-body-text" style={{ marginTop: "14px" }}>
                  For the full SFI rating breakdown by series and class, see our{" "}
                  <Link href="/blog/sfi-rated-racing-suit-by-class" style={{ color: "#e21b1b", textDecoration: "underline" }}>
                    rating-by-discipline guide
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* HOW TO FIND TPP */}
            <div className="blog-body-block">
              <h2 className="blog-body-heading">How to Find the Actual TPP Score of a Racing Suit</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  Most retailers list only the SFI rating. The actual TPP value is usually buried in the manufacturer's spec sheet or test report. Three places to check:
                </p>
                <ul className="blog-body-list blog-body-list--check">
                  <li><strong>Manufacturer spec sheet.</strong> Premium brands publish TPP. Budget brands omit it.</li>
                  <li><strong>SFI Foundation certification report.</strong> Available via the SFI website for some manufacturers. Confirms the lab-tested TPP at certification.</li>
                  <li><strong>Direct ask.</strong> Email or call the manufacturer. If they can't produce the number, that's information too.</li>
                </ul>
                <p className="blog-body-text" style={{ marginTop: "14px" }}>
                  At HS Race Gear, every custom suit ships with documentation listing the SFI rating, the TPP score, and the date of manufacture. Custom orders also let you specify materials (genuine Nomex® vs treated alternatives) which directly drives the final TPP.
                </p>
              </div>
            </div>

            {/* HOW TPP DEGRADES */}
            <div className="blog-body-block">
              <h2 className="blog-body-heading">How TPP Degrades Over Time (And What Reduces It)</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  The TPP a suit has on day one is not the TPP it has after a season of racing. Real-world TPP drops because of:
                </p>
                <ul className="blog-body-list">
                  <li><strong>UV exposure.</strong> Sunlight degrades Nomex® fibres slowly but measurably. A suit kept in a sunlit garage loses TPP faster than one stored in a closet.</li>
                  <li><strong>Repeated washing.</strong> Each wash cycle removes some fire-retardant treatment from treated fabrics. Genuine Nomex® is inherently fire-resistant and doesn't have this problem.</li>
                  <li><strong>Fuel and oil contamination.</strong> Hydrocarbons soaked into the fabric act as accelerants. Methanol specifically degrades Nomex® bonding agents.</li>
                  <li><strong>Heat cycling.</strong> Repeated cockpit-temperature cycles (cold start → hot session → cool down) accelerate fabric breakdown over many cycles.</li>
                  <li><strong>Abrasion.</strong> Worn shoulder panels and knee patches mean thinner fabric, lower TPP, more risk.</li>
                </ul>
              </div>
              <div className="blog-highlight-box">
                <p>A 5-year-old suit with a valid SFI label still passes tech. Whether it still has its original TPP is a different question. If your suit has seen heavy use or contamination, the certification date doesn't tell the whole story.</p>
              </div>
            </div>

            {/* FIA COMPARISON */}
            <div className="blog-body-block">
              <h2 className="blog-body-heading">TPP in FIA 8856-2018 — How the International Standard Compares</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  The FIA 8856-2018 standard — the international equivalent used by World Endurance Championship, IMSA, and SRO series — measures protection slightly differently than SFI. The FIA standard requires roughly TPP 35+ for compliance (in their HTI methodology, equivalent to about 12 seconds of protection), with the 2026 update increasing this from the previous 11-second standard.
                </p>
                <p className="blog-body-text">
                  Rough equivalence:
                </p>
                <ul className="blog-body-list">
                  <li>FIA 8856-2018 ≈ SFI 3.2A/5 to SFI 3.2A/10 depending on manufacturer</li>
                  <li>FIA 8856-2018 has stricter manufacturer documentation requirements</li>
                  <li>FIA 8856-2018 includes thread strength and wash-durability testing that SFI doesn't</li>
                </ul>
                <p className="blog-body-text" style={{ marginTop: "14px" }}>
                  For amateur endurance racers comparing SFI vs FIA, see our{" "}
                  <Link href="/blog/endurance-racing-suit-guide" style={{ color: "#e21b1b", textDecoration: "underline" }}>
                    endurance racing suit guide
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* CITATIONS */}
            <div className="blog-body-block">
              <h2 className="blog-body-heading">References &amp; Standards</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  This guide draws on the following authoritative sources. Always verify against the current versions of these standards before competing:
                </p>
                <ul className="blog-body-list">
                  <li><strong>SFI Foundation</strong> — official SFI Spec 3.2A documentation (sfifoundation.com)</li>
                  <li><strong>NHRA Rulebook</strong> — current-year ET-to-rating ladder for drag racing</li>
                  <li><strong>FIA Sporting Regulations</strong> — Article 14 driver equipment requirements (FIA 8856-2018)</li>
                  <li><strong>USAC Technical Bulletin</strong> — Sprint Car, Silver Crown, and Midget series specifications</li>
                  <li><strong>NFPA 1971</strong> — original TPP testing methodology (firefighter standard, adapted by SFI)</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RELATED READING */}
      <RelatedBlogPosts excludeSlug="tpp-rating-explained" />

      {/* CTA */}
      <section className="blog-cta-section">
        <div className="container">
          <div className="blog-cta-inner">
            <span className="blog-cta-tag">Custom · SFI Certified · TPP-Documented</span>
            <h2 className="blog-cta-title">Custom Racing Suits with Documented TPP Scores</h2>
            <p className="blog-cta-subtitle">
              Every HS Race Gear custom suit ships with full documentation — SFI rating, TPP score, material breakdown, manufacture date. Built with genuine Nomex® for higher TPP at the same SFI tier. Starting at $329, made in Watertown, MA. Free shipping on custom suits.
            </p>
            <div className="blog-cta-buttons">
              <Link href="/custom-race-suit" className="tf-btn btn-fill animate-btn">
                Design Your Suit
              </Link>
              <Link href="/certifications" className="tf-btn animate-btn" style={{ border: "1px solid rgba(226,27,27,0.5)", color: "#fff" }}>
                View Our Certifications
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
