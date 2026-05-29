"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import RelatedBlogPosts from "@/components/hsRaceGear/blog/RelatedBlogPosts";

export default function BlogPost7DragRacing() {
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
            <span className="contact-breadcrumb-current">Drag Racing Suit Requirements</span>
          </p>
          <span className="contact-hero-tag">Discipline Guide</span>
          <h1 className="contact-hero-title">
            Drag Racing Suit<br /><span>Requirements</span>
          </h1>
          <p className="contact-hero-subtitle">
            NHRA, IHRA, and street strip fire suit rules — exactly which SFI rating you need, by class and elapsed time, so you never fail tech inspection.
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

            {/* META */}
            <div className="blog-post-meta">
              <span className="blog-post-tag">Discipline Guide</span>
              <span className="blog-post-date">May 2026 · 8 min read</span>
            </div>

            {/* TITLE BLOCK */}
            <div className="blog-post-title-block">
              <h2 className="blog-post-main-title">Drag Racing Suit Requirements — NHRA, IHRA &amp; Street Strip Fire Suit Rules (2026)</h2>
              <p className="blog-post-subtitle">Which SFI rating you need by elapsed time, class, and sanctioning body — plus what to look for in a drag racing fire suit</p>
            </div>

            {/* INTRO */}
            <div className="blog-body-block">
              <div className="blog-body-card">
                <p className="blog-body-text">
                  Drag racing has some of the clearest — and strictest — fire suit requirements in motorsport. Unlike road racing or karting, where rules can vary widely by series, the major drag sanctioning bodies (NHRA, IHRA, and most NHRA-affiliated bracket tracks) publish specific SFI rating thresholds tied directly to your car's elapsed time (ET) and speed.
                </p>
                <p className="blog-body-text">
                  Get the wrong rating and you will fail tech, plain and simple. Get the right rating — in a suit that fits correctly and meets your series' exact spec — and you can focus on what actually matters: going fast.
                </p>
              </div>
              <div className="blog-highlight-box">
                <p><strong>Quick Answer:</strong> Most NHRA bracket racers running 11.99 or quicker need at minimum an <strong>SFI 3.2A/1</strong> single-layer suit. Cars running 9.99 or quicker require an <strong>SFI 3.2A/5</strong> multi-layer suit. Top Fuel, Funny Car, and Pro Mod require <strong>SFI 3.2A/15 or higher</strong>.</p>
              </div>
            </div>

            {/* IMAGE 1 */}
            <div className="blog-body-block">
              <div style={{ borderRadius: "12px", overflow: "hidden", margin: "0 0 8px 0", lineHeight: 0 }}>
                <Image
                  src="/images/home/blog2.webp"
                  alt="Drag racing fire suit — SFI-certified custom racing suit for NHRA and bracket racing"
                  width={900}
                  height={480}
                  style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "12px" }}
                  priority
                />
              </div>
              <p style={{ fontSize: "13px", color: "#888", textAlign: "center", marginTop: "8px" }}>
                SFI-certified drag racing fire suits are mandatory at NHRA and IHRA events once your car breaks into the 11s.
              </p>
            </div>

            {/* SECTION 1 — Why SFI Ratings Matter in Drag Racing */}
            <div className="blog-body-block">
              <h2 className="blog-section-title">Why SFI Ratings Are Non-Negotiable in Drag Racing</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  The SFI Foundation sets the safety standards that NHRA, IHRA, and most local tracks adopt. An SFI rating on a fire suit tells you two critical things: the number of layers of fire-resistant material, and the Thermal Protective Performance (TPP) score — a lab measurement of how many seconds of protection you get before suffering a second-degree burn at a given heat exposure.
                </p>
                <p className="blog-body-text">
                  For drag racing specifically, the fire risk comes from fuel fires during crashes or fuel system failures. Nitro, methanol, and even pump gas can ignite in a fraction of a second. The faster and more powerful your car, the higher the fuel load — and the more protection you need.
                </p>
                <p className="blog-body-text">
                  The key SFI standard for drag racing suits is <strong>SFI 3.2A</strong>, with the number after the slash indicating protection level:
                </p>
              </div>

              {/* TPP Table */}
              <div className="hs-table-wrap" style={{ marginTop: "24px" }}>
                <table className="hs-compare-table">
                  <thead>
                    <tr>
                      <th>SFI Rating</th>
                      <th>Layers</th>
                      <th>TPP Score</th>
                      <th>Protection Time</th>
                      <th>Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>SFI 3.2A/1</strong></td>
                      <td>Single layer</td>
                      <td>6</td>
                      <td>~3 seconds</td>
                      <td>Street/strip, bracket racing, 10.00–11.99 ET</td>
                    </tr>
                    <tr>
                      <td><strong>SFI 3.2A/5</strong></td>
                      <td>Multi-layer</td>
                      <td>19</td>
                      <td>~7–10 seconds</td>
                      <td>9.99 and quicker, Super Street, Pro classes</td>
                    </tr>
                    <tr>
                      <td><strong>SFI 3.2A/10</strong></td>
                      <td>Multi-layer</td>
                      <td>19+</td>
                      <td>~10–14 seconds</td>
                      <td>Pro Mod, Outlaw drag classes</td>
                    </tr>
                    <tr>
                      <td><strong>SFI 3.2A/15</strong></td>
                      <td>Multi-layer</td>
                      <td>19+</td>
                      <td>~14+ seconds</td>
                      <td>Top Fuel, Funny Car, NHRA Pro classes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 2 — NHRA Requirements by Class */}
            <div className="blog-body-block">
              <h2 className="blog-section-title">NHRA Fire Suit Requirements by Elapsed Time &amp; Class</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  The NHRA Rulebook organizes fire suit requirements primarily around elapsed time (ET) and, for professional classes, around the class itself. Here is the breakdown as it applies to the vast majority of NHRA-sanctioned events and member tracks:
                </p>
              </div>

              <div className="hs-table-wrap" style={{ marginTop: "24px" }}>
                <table className="hs-compare-table">
                  <thead>
                    <tr>
                      <th>ET / Class</th>
                      <th>Minimum SFI Rating</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>13.99 and slower</td>
                      <td>No suit required</td>
                      <td>Many tracks still strongly recommend one</td>
                    </tr>
                    <tr>
                      <td>11.00 – 13.99</td>
                      <td><strong>SFI 3.2A/1</strong> (recommended)</td>
                      <td>Required at most NHRA member tracks even if not explicitly mandated nationally</td>
                    </tr>
                    <tr>
                      <td>10.00 – 10.99</td>
                      <td><strong>SFI 3.2A/1</strong></td>
                      <td>Full suit, gloves, and shoes required</td>
                    </tr>
                    <tr>
                      <td>9.99 and quicker</td>
                      <td><strong>SFI 3.2A/5</strong></td>
                      <td>Multi-layer suit mandatory; helmet with SFI or Snell rating required</td>
                    </tr>
                    <tr>
                      <td>Super Street, Super Gas, Super Comp</td>
                      <td><strong>SFI 3.2A/5</strong></td>
                      <td>These bracket classes have additional safety equipment requirements</td>
                    </tr>
                    <tr>
                      <td>Stock, Super Stock, Comp</td>
                      <td><strong>SFI 3.2A/1 or 3.2A/5</strong></td>
                      <td>Depends on vehicle ET — check your current NHRA rulebook</td>
                    </tr>
                    <tr>
                      <td>Pro Stock, Pro Modified</td>
                      <td><strong>SFI 3.2A/5 minimum</strong></td>
                      <td>Many Pro Mod promoters require SFI 3.2A/10</td>
                    </tr>
                    <tr>
                      <td>Top Fuel &amp; Funny Car</td>
                      <td><strong>SFI 3.2A/15</strong></td>
                      <td>Full NHRA Pro driver safety package required</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="blog-body-card" style={{ marginTop: "20px" }}>
                <p className="blog-body-text">
                  <strong>Important:</strong> Always verify requirements directly with your track and the current NHRA General Regulations. Local tracks often add requirements on top of the national baseline — especially for bracket events with large payouts or for cars using power adders (nitrous, supercharger, turbo).
                </p>
              </div>
            </div>

            {/* IMAGE 2 */}
            <div className="blog-body-block">
              <div style={{ borderRadius: "12px", overflow: "hidden", margin: "0 0 8px 0", lineHeight: 0 }}>
                <Image
                  src="/images/home/blog_1.webp"
                  alt="Custom multi-layer SFI 3.2A/5 drag racing fire suit for NHRA competition"
                  width={900}
                  height={480}
                  style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "12px" }}
                />
              </div>
              <p style={{ fontSize: "13px", color: "#888", textAlign: "center", marginTop: "8px" }}>
                Multi-layer SFI 3.2A/5 suits are mandatory for any NHRA competitor running 9.99 or quicker.
              </p>
            </div>

            {/* SECTION 3 — IHRA Requirements */}
            <div className="blog-body-block">
              <h2 className="blog-section-title">IHRA Fire Suit Requirements</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  The International Hot Rod Association (IHRA) follows a similar framework to NHRA with SFI 3.2A standards, though there are differences in specific class rules. For most bracket racing and sportsman classes:
                </p>
                <ul className="blog-body-list">
                  <li><strong>11.00 and quicker:</strong> SFI 3.2A/1 minimum — fire suit, SFI-rated gloves, and shoes required</li>
                  <li><strong>9.99 and quicker:</strong> SFI 3.2A/5 minimum — multi-layer suit required</li>
                  <li><strong>Pro classes:</strong> SFI 3.2A/5 or higher depending on class and sanctioned event requirements</li>
                </ul>
                <p className="blog-body-text">
                  If you race at IHRA-sanctioned events exclusively, the suits and standards are largely interchangeable with NHRA gear — a suit that passes NHRA tech will pass IHRA tech in equivalent classes.
                </p>
              </div>
            </div>

            {/* SECTION 4 — Street Strip / Local Track */}
            <div className="blog-body-block">
              <h2 className="blog-section-title">Street Strip &amp; Local Track Requirements</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  Non-NHRA member tracks — commonly called "street strip" or independent tracks — set their own rules. The majority adopt NHRA standards as their baseline because it simplifies tech inspection and drivers already know what to expect. A few general patterns:
                </p>
                <ul className="blog-body-list">
                  <li><strong>No cage, no suit required at most tracks</strong> for cars running 13.99 or slower in the street/high-performance class</li>
                  <li><strong>Once you break into the 11s:</strong> expect SFI 3.2A/1 to be required even at independent tracks</li>
                  <li><strong>Power adders often trigger a lower ET threshold</strong> — a turbocharged street car running 12.50 may be required to have a fire suit where a naturally aspirated car at the same ET is not</li>
                  <li><strong>Some tracks require fire suits for all competitors in certain events</strong> regardless of ET, particularly big-money bracket races</li>
                </ul>
                <p className="blog-body-text">
                  When in doubt, call your track's tech director before race day. A 10-minute phone call is far better than showing up without the right gear.
                </p>
              </div>
            </div>

            {/* SECTION 5 — Single vs Multi Layer */}
            <div className="blog-body-block">
              <h2 className="blog-section-title">Single-Layer (SFI 3.2A/1) vs. Multi-Layer (SFI 3.2A/5) — Which Do You Actually Need?</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  This is the most common question drag racers ask when shopping for a fire suit. The answer depends entirely on your car's ET, but understanding the practical difference helps you make a smarter decision.
                </p>
              </div>

              <div className="hs-table-wrap" style={{ marginTop: "20px" }}>
                <table className="hs-compare-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>SFI 3.2A/1 (Single Layer)</th>
                      <th>SFI 3.2A/5 (Multi-Layer)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Protection time</strong></td>
                      <td>~3 seconds</td>
                      <td>~7–10 seconds</td>
                    </tr>
                    <tr>
                      <td><strong>Weight</strong></td>
                      <td>Lighter, more comfortable</td>
                      <td>Heavier, warmer</td>
                    </tr>
                    <tr>
                      <td><strong>Best for</strong></td>
                      <td>10.00–11.99 bracket racers, street/strip</td>
                      <td>9.99 and quicker, Pro classes, fuel cars</td>
                    </tr>
                    <tr>
                      <td><strong>Price range</strong></td>
                      <td>~$329–$499 (HS Race Gear)</td>
                      <td>~$499–$799 (HS Race Gear)</td>
                    </tr>
                    <tr>
                      <td><strong>Custom fit available</strong></td>
                      <td>Yes</td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <td><strong>SFI expiry</strong></td>
                      <td>5 years from manufacture date</td>
                      <td>5 years from manufacture date</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="blog-body-card" style={{ marginTop: "20px" }}>
                <p className="blog-body-text">
                  If you're on the boundary — say, you currently run 10.30s but are building toward a 9-second pass — buy the SFI 3.2A/5 now. There is no downside to having more protection, and you won't need to replace the suit when you get quicker.
                </p>
              </div>
            </div>

            {/* HIGHLIGHT — CTA */}
            <div className="blog-highlight-box" style={{ margin: "32px 0" }}>
              <p style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "8px" }}>Ready to order your drag racing fire suit?</p>
              <p style={{ marginBottom: "16px" }}>HS Race Gear builds custom SFI 3.2A/1 and SFI 3.2A/5 drag racing suits to your exact measurements — with unlimited color combinations, name embroidery, and sponsor logos. Made in the USA, ships free.</p>
              <Link
                href="/custom-race-suit"
                style={{
                  display: "inline-block",
                  background: "#e21b1b",
                  color: "#fff",
                  padding: "12px 28px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "0.95rem",
                }}
              >
                Design Your Custom Drag Racing Suit →
              </Link>
            </div>

            {/* SECTION 6 — Gloves and Shoes */}
            <div className="blog-body-block">
              <h2 className="blog-section-title">Don't Forget: Gloves &amp; Shoes Are Required Too</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  At NHRA and most sanctioned drag events, a fire suit alone is not enough once you break into the 10s. You also need:
                </p>
                <ul className="blog-body-list">
                  <li><strong>SFI-rated fire gloves</strong> — required for 10.99 and quicker at NHRA events. SFI 3.3/1 is the standard for most sportsman classes. Pro classes require SFI 3.3/5.</li>
                  <li><strong>Fire-resistant shoes</strong> — leather-soled or SFI-rated shoes required for 10.99 and quicker. High-top construction that covers the ankle is strongly recommended and required at some tracks.</li>
                  <li><strong>Fire-resistant underwear</strong> — not always mandated in sportsman classes, but required for Pro Stock and above. Adds meaningful TPP without bulk.</li>
                  <li><strong>Helmet</strong> — SFI 31.1 or Snell rating required, with the model year requirements varying by class and track.</li>
                </ul>
                <p className="blog-body-text">
                  HS Race Gear makes custom fire gloves and shoes to match your suit — same colors, same logos, delivered together as a complete package.
                </p>
              </div>
            </div>

            {/* IMAGE 3 */}
            <div className="blog-body-block">
              <div style={{ borderRadius: "12px", overflow: "hidden", margin: "0 0 8px 0", lineHeight: 0 }}>
                <Image
                  src="/images/home/blog3.png"
                  alt="Custom drag racing fire suit gloves and shoes — complete SFI safety package for NHRA"
                  width={900}
                  height={480}
                  style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "12px" }}
                />
              </div>
              <p style={{ fontSize: "13px", color: "#888", textAlign: "center", marginTop: "8px" }}>
                A complete drag racing safety package: SFI-rated suit, gloves, and shoes matched to your team's colors.
              </p>
            </div>

            {/* SECTION 7 — SFI Label and Expiry */}
            <div className="blog-body-block">
              <h2 className="blog-section-title">The SFI Label: What Tech Inspectors Check</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  Every SFI-certified fire suit has a permanently sewn-in label listing the SFI standard, manufacture date, and the certifying organization's name. Tech inspectors at NHRA events will check:
                </p>
                <ul className="blog-body-list">
                  <li><strong>SFI rating number</strong> — must meet the minimum for your class/ET</li>
                  <li><strong>Manufacture date</strong> — SFI certifications expire 5 years from the date of manufacture (not the date of purchase). A suit made in January 2020 is expired for NHRA competition in January 2025 regardless of how little it's been worn.</li>
                  <li><strong>Label integrity</strong> — the label must be legible and not removed or defaced. A suit with a missing or altered label will fail tech every time.</li>
                </ul>
                <p className="blog-body-text">
                  This is one of the biggest arguments for buying a <Link href="/custom-race-suit" style={{ color: "#e21b1b", textDecoration: "none", fontWeight: 600 }}>custom race suit</Link> directly from the manufacturer — you know exactly when it was made, and you have the documentation to prove it.
                </p>
              </div>
            </div>

            {/* SECTION 8 — Custom vs Off-the-Rack */}
            <div className="blog-body-block">
              <h2 className="blog-section-title">Custom vs. Off-the-Rack Drag Racing Suits</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  Stock suits from major brands come in standard sizes that rarely fit most drivers perfectly. A suit that bunches at the knees, gaps at the wrists, or binds across the shoulders isn't just uncomfortable — it can reduce effective protection because the Nomex layers aren't sitting flush against the body.
                </p>
                <p className="blog-body-text">
                  A custom-fit drag racing suit, built to your exact measurements, solves all of that. At HS Race Gear, the custom suit process works like this:
                </p>
                <ul className="blog-body-list">
                  <li>You submit 14 body measurements using our measurement guide</li>
                  <li>We send a digital mockup with your chosen colors and logos within a few days</li>
                  <li>You approve or request revisions — unlimited changes, no charge</li>
                  <li>Production takes 3–4 weeks; the suit ships free to anywhere in the USA</li>
                </ul>
                <p className="blog-body-text">
                  Custom SFI 3.2A/1 suits start at <strong>$329</strong>. Custom SFI 3.2A/5 suits start at <strong>$499</strong>. Both are built from Nomex-blend fire-resistant fabrics and carry a valid SFI certification label.
                </p>
              </div>
              <div style={{ textAlign: "center", marginTop: "24px" }}>
                <Link
                  href="/custom-race-suit/order"
                  style={{
                    display: "inline-block",
                    background: "transparent",
                    color: "#e21b1b",
                    border: "2px solid #e21b1b",
                    padding: "12px 28px",
                    borderRadius: "8px",
                    fontWeight: 700,
                    textDecoration: "none",
                    fontSize: "0.95rem",
                  }}
                >
                  Start Your Custom Suit Order →
                </Link>
              </div>
            </div>

            {/* FAQ */}
            <div className="blog-body-block">
              <h2 className="blog-section-title">Frequently Asked Questions</h2>

              <div className="blog-faq-item">
                <h3 className="blog-faq-question">What SFI rating do I need for NHRA bracket racing?</h3>
                <p className="blog-faq-answer">
                  For NHRA bracket racing, you need a minimum SFI 3.2A/1 single-layer suit if your car runs 10.00–11.99. If you run 9.99 or quicker, an SFI 3.2A/5 multi-layer suit is mandatory. Always check the current NHRA General Regulations and your specific track's tech rules, as local requirements sometimes exceed the national baseline.
                </p>
              </div>

              <div className="blog-faq-item">
                <h3 className="blog-faq-question">Do I need a fire suit for street/strip nights?</h3>
                <p className="blog-faq-answer">
                  It depends on the track and your ET. Most independent tracks don't require a fire suit for cars running 13.99 or slower, but once you break into the 11s (or sometimes the 12s with power adders), most tracks require at minimum an SFI 3.2A/1 suit. Call your track to confirm before race day.
                </p>
              </div>

              <div className="blog-faq-item">
                <h3 className="blog-faq-question">How long is an SFI fire suit good for?</h3>
                <p className="blog-faq-answer">
                  SFI certifications on fire suits expire 5 years from the manufacture date printed on the sewn-in label. This applies regardless of how often the suit has been worn. NHRA tech inspectors check the manufacture date, not the purchase date, so factor this in when budgeting for a new suit.
                </p>
              </div>

              <div className="blog-faq-item">
                <h3 className="blog-faq-question">Can I use the same fire suit for drag racing and circle track?</h3>
                <p className="blog-faq-answer">
                  Yes — an SFI 3.2A/5 suit is legal for both NHRA drag racing (9.99 and quicker) and most circle-track sanctioning bodies. SFI 3.2A/1 is generally sufficient for circle-track classes that don't require a higher rating. The SFI 3.2A standard is the universal drag and circle-track fire suit specification.
                </p>
              </div>

              <div className="blog-faq-item">
                <h3 className="blog-faq-question">What's the difference between SFI 3.2A/1 and SFI 3.2A/5?</h3>
                <p className="blog-faq-answer">
                  SFI 3.2A/1 is a single-layer suit with a TPP score of 6, providing approximately 3 seconds of protection before a second-degree burn. SFI 3.2A/5 is a multi-layer suit with a TPP score of 19, providing approximately 7–10 seconds of protection. The higher rating is heavier and warmer but provides significantly more time to escape a burning car.
                </p>
              </div>
            </div>

            {/* CLOSING CTA */}
            <div className="blog-body-block">
              <h2 className="blog-section-title">Get a Custom Drag Racing Suit Built to Your Specs</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  HS Race Gear has been building custom SFI-certified fire suits for drag racers for over 10 years. Every suit is made to your exact measurements, built with Nomex-blend fire-resistant fabrics, and carries a current SFI certification label that will pass tech inspection at any NHRA or IHRA sanctioned event.
                </p>
                <p className="blog-body-text">
                  Whether you need a lightweight SFI 3.2A/1 for bracket racing or a full multi-layer SFI 3.2A/5 package with matching gloves and shoes, we build it in your colors, with your name and sponsors, shipped free to your door.
                </p>
                <div style={{ marginTop: "20px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <Link
                    href="/custom-race-suit"
                    style={{
                      display: "inline-block",
                      background: "#e21b1b",
                      color: "#fff",
                      padding: "12px 28px",
                      borderRadius: "8px",
                      fontWeight: 700,
                      textDecoration: "none",
                      fontSize: "0.95rem",
                    }}
                  >
                    Design Your Custom Suit →
                  </Link>
                  <Link
                    href="/StandardPricing"
                    style={{
                      display: "inline-block",
                      background: "transparent",
                      color: "#e21b1b",
                      border: "2px solid #e21b1b",
                      padding: "12px 28px",
                      borderRadius: "8px",
                      fontWeight: 700,
                      textDecoration: "none",
                      fontSize: "0.95rem",
                    }}
                  >
                    View Pricing →
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RELATED POSTS */}
      <RelatedBlogPosts
        excludeSlug="drag-racing-suit-requirements"
        heading="More Racing Suit Guides"
        subtitle="Everything you need to know about SFI ratings, custom fit, and choosing the right gear."
      />
    </>
  );
}
