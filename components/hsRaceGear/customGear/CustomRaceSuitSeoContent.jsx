import Link from "next/link";

/*
 * Server-rendered SEO/AEO content for /custom-race-suit — added 2026-11-13.
 *
 * Why: the page sat at position ~24 for "custom racing suit", "custom race
 * suits", "custom race suit". Every page ranking above it (K1, Zamp, Pyrotect
 * via Wesco, Impact, Velocita) shows a PRICE in the SERP snippet, offers a
 * layer/rating choice, and explains the order steps. This page had no price,
 * no FAQ, and no comparison. This block adds all three, written answer-first
 * so Google snippets and AI assistants can quote it.
 *
 * Prices must match components/hsRaceGear/pricing/StandardPricing.jsx and the
 * PACKAGES list in CustomOrderPage.jsx. Competitor prices are the published
 * list prices checked 2026-11-13 — re-check before relying on them.
 */

export const RACE_SUIT_PACKAGES = [
  { id: "single-suit", name: "Single Layer", rating: "SFI 3.2A/1", price: 549, tpp: "~3 sec", bestFor: "Club racing, street stock, hobby stock, autocross, track days" },
  { id: "double-suit", name: "Double Layer", rating: "SFI 3.2A/5", price: 649, tpp: "~10 sec", bestFor: "Sprint car, late model, modifieds, most drag classes, national series", popular: true },
  { id: "triple-suit", name: "Triple Layer", rating: "SFI 3.2A/5", price: 749, tpp: "Highest in 3.2A/5", bestFor: "Methanol cars, long races, drivers who want the most margin" },
];

export const RACE_SUIT_FAQS = [
  {
    q: "How much does a custom race suit cost?",
    a: "An HS Race Gear custom race suit costs $549 for a single-layer SFI 3.2A/1 suit, $649 for a double-layer SFI 3.2A/5 suit and $749 for a triple-layer SFI 3.2A/5 suit. Unlimited embroidery, unlimited colors, mockup revisions and worldwide shipping are included in that price.",
  },
  {
    q: "What is the difference between a single layer and double layer race suit?",
    a: "A single-layer suit is rated SFI 3.2A/1 and gives about 3 seconds of protection from a direct flame before a second-degree burn. A double-layer suit is rated SFI 3.2A/5 and gives about 10 seconds. More layers add protection time, and slightly more weight and heat.",
  },
  {
    q: "Which SFI rating do I need for my race suit?",
    a: "Your sanctioning body decides. SFI 3.2A/1 is the minimum for many local and club classes. SFI 3.2A/5 is the common requirement for sprint cars, late models and many drag classes. Always check your series rulebook before ordering.",
    link: { href: "/blog/sfi-rated-racing-suit-by-class", text: "SFI rating by racing class" },
  },
  {
    q: "How long does a custom racing suit take?",
    a: "You get your first digital mockup within about 24 hours of ordering. Production takes about 4–5 weeks after you approve the final design, then the suit ships with tracking.",
  },
  {
    q: "How do I measure for a custom race suit?",
    a: "You take 15 body measurements plus height and weight, ideally with someone helping you. Our video guide shows each point, and our team reviews every set of measurements before the suit is cut.",
    link: { href: "/custom-fit", text: "How to measure for a race suit" },
  },
  {
    q: "Can I put my own sponsor logos and name on the suit?",
    a: "Yes. Sponsor logos, driver name, number and flag are embroidered at no extra charge, with no limit on the number of logos or colors. Upload your artwork with the order and our designers place it on your mockup.",
  },
  {
    q: "Do you make one-piece and two-piece race suits?",
    a: "Yes. We build one-piece suits and two-piece jacket-and-pant suits. Two-piece suits are popular with drag racers and drivers who want to remove the jacket between rounds.",
  },
  {
    q: "Is an SFI race suit accepted for karting or FIA events?",
    a: "No. Karting uses CIK-FIA Level 2 / FIA 8877-2022 suits, and FIA circuit events require FIA 8856 homologation. Our race suits are SFI certified, which is what US oval, drag and most club racing require.",
    link: { href: "/blog/sfi-vs-fia-rating", text: "SFI vs FIA explained" },
  },
];

const COMPETITORS = [
  { brand: "HS Race Gear", product: "Custom double-layer Nomex", rating: "SFI 3.2A/5", price: "$649", note: "Embroidery, colors, design and shipping included", hs: true },
  { brand: "HS Race Gear", product: "Custom single-layer Nomex", rating: "SFI 3.2A/1", price: "$549", note: "Embroidery, colors, design and shipping included", hs: true },
  { brand: "K1 RaceGear", product: "Custom SFI-5 Nomex, 2-layer", rating: "SFI 3.2A/5", price: "$1,599.95", note: "Published base price" },
  { brand: "K1 RaceGear", product: "Custom SFI-1 Proban (FR cotton)", rating: "SFI 3.2A/1", price: "$599.95", note: "+$100 design fee" },
  { brand: "Zamp", product: "Custom ZR-40", rating: "SFI 3.2A/5", price: "$659.95–$739.95", note: "Published price range" },
];

const cell = { padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)", color: "#d1d5db", fontSize: "0.95rem", verticalAlign: "top" };
const head = { ...cell, color: "#fff", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "1px", background: "rgba(226,27,27,0.12)" };
const wrap = { overflowX: "auto", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, marginTop: 16 };

export default function CustomRaceSuitSeoContent() {
  return (
    <section className="blog-post-section" style={{ padding: "64px 0 24px", background: "#0a0a0a" }}>
      <div className="container" style={{ maxWidth: 1000 }}>

        {/* Answer-first block — quoted by Google snippets and AI assistants */}
        <div className="blog-body-block">
          <h2 className="blog-body-heading">What Is a Custom Race Suit?</h2>
          <p className="blog-body-text">
            A custom race suit is an SFI-certified fire suit cut to your own body measurements instead of a
            standard size, in your colors with your sponsor logos. HS Race Gear custom racing suits are made
            from Nomex® meta-aramid fabric, certified to SFI 3.2A/1 (single layer) or SFI 3.2A/5 (double or
            triple layer), and start at <strong>$549</strong> with embroidery, unlimited colors and shipping included.
          </p>
          <ul className="hs-doc-list--checkmarks" style={{ color: "#d1d5db", lineHeight: 1.9, paddingLeft: 0, listStyle: "none" }}>
            <li><strong>Price:</strong> $549 single layer · $649 double layer · $749 triple layer</li>
            <li><strong>Certification:</strong> SFI 3.2A/1 and SFI 3.2A/5, labeled for tech inspection</li>
            <li><strong>Fit:</strong> made to 15 body measurements, one-piece or two-piece</li>
            <li><strong>Design:</strong> free mockup within about 24 hours, unlimited revisions</li>
            <li><strong>Lead time:</strong> about 4–5 weeks after design approval</li>
          </ul>
        </div>

        {/* Pricing table */}
        <div className="blog-body-block">
          <h2 className="blog-body-heading">Custom Racing Suit Prices</h2>
          <p className="blog-body-text">
            One price per suit, with no design fee and no per-logo charge. Pick the layer count your series
            requires; everything else is included.
          </p>
          <div style={wrap}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
              <thead>
                <tr>
                  <th style={head} scope="col">Suit</th>
                  <th style={head} scope="col">SFI rating</th>
                  <th style={head} scope="col">Protection</th>
                  <th style={head} scope="col">Best for</th>
                  <th style={head} scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {RACE_SUIT_PACKAGES.map((p) => (
                  <tr key={p.id}>
                    <td style={{ ...cell, color: "#fff", fontWeight: 700 }}>
                      {p.name}{p.popular && <span style={{ marginLeft: 8, fontSize: 11, color: "#f87171", textTransform: "uppercase" }}>Most popular</span>}
                    </td>
                    <td style={cell}>{p.rating}</td>
                    <td style={cell}>{p.tpp}</td>
                    <td style={cell}>{p.bestFor}</td>
                    <td style={{ ...cell, whiteSpace: "nowrap" }}>
                      <strong style={{ color: "#fff", fontSize: "1.1rem" }}>${p.price}</strong><br />
                      <Link href={`/custom-race-suit/order?package=${p.id}`} style={{ color: "#f87171", fontSize: 13 }}>
                        Order this suit →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="blog-body-text" style={{ fontSize: 14, marginTop: 12 }}>
            Every suit includes: unlimited embroidery, unlimited colors (including white), boot cuff, lower-back
            comfort panel, stretch panels, Nomex inner lining and free worldwide shipping. Add gloves and shoes as a
            package on the <Link href="/StandardPricing" style={{ color: "#f87171" }}>pricing page</Link>.
          </p>
        </div>

        {/* Price comparison */}
        <div className="blog-body-block">
          <h2 className="blog-body-heading">How Our Price Compares</h2>
          <p className="blog-body-text">
            Published custom-suit prices from the brands racers compare us with most. A custom SFI 3.2A/5 Nomex suit
            from HS Race Gear costs less than half of K1&rsquo;s published 2-layer price.
          </p>
          <div style={wrap}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
              <thead>
                <tr>
                  <th style={head} scope="col">Brand</th>
                  <th style={head} scope="col">Custom suit</th>
                  <th style={head} scope="col">Rating</th>
                  <th style={head} scope="col">Price</th>
                  <th style={head} scope="col">Notes</th>
                </tr>
              </thead>
              <tbody>
                {COMPETITORS.map((c, i) => (
                  <tr key={i} style={c.hs ? { background: "rgba(226,27,27,0.06)" } : undefined}>
                    <td style={{ ...cell, color: c.hs ? "#f87171" : "#fff", fontWeight: 700 }}>{c.brand}</td>
                    <td style={cell}>{c.product}</td>
                    <td style={cell}>{c.rating}</td>
                    <td style={{ ...cell, color: "#fff", fontWeight: 700, whiteSpace: "nowrap" }}>{c.price}</td>
                    <td style={cell}>{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="blog-body-text" style={{ fontSize: 13, marginTop: 10, color: "#9ca3af" }}>
            Competitor prices are their published base prices as of November 2026 and may change; options and
            shipping vary. Full side-by-side reviews: <Link href="/compare/vs-k1" style={{ color: "#f87171" }}>HS vs K1</Link>,{" "}
            <Link href="/compare/vs-simpson" style={{ color: "#f87171" }}>HS vs Simpson</Link>,{" "}
            <Link href="/compare/vs-pyrotect" style={{ color: "#f87171" }}>HS vs Pyrotect</Link>,{" "}
            <Link href="/compare/vs-velocita" style={{ color: "#f87171" }}>HS vs Velocita</Link>.
          </p>
        </div>

        {/* How ordering works */}
        <div className="blog-body-block">
          <h2 className="blog-body-heading">How to Order a Custom Race Suit</h2>
          <ol style={{ color: "#d1d5db", lineHeight: 1.9, paddingLeft: 20 }}>
            <li><strong style={{ color: "#fff" }}>Choose your suit</strong> — single, double or triple layer, one-piece or two-piece.</li>
            <li><strong style={{ color: "#fff" }}>Pick a design and colors</strong> — start from one of 50 layouts or send your own idea and logos.</li>
            <li><strong style={{ color: "#fff" }}>Get your mockup</strong> — a digital mockup within about 24 hours; revise it as many times as you need.</li>
            <li><strong style={{ color: "#fff" }}>Send measurements</strong> — 15 points using our <Link href="/custom-fit" style={{ color: "#f87171" }}>measuring guide</Link>; we check them before cutting.</li>
            <li><strong style={{ color: "#fff" }}>Production and shipping</strong> — about 4–5 weeks, quality checked, shipped free with tracking.</li>
          </ol>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
            <Link href="/custom-race-suit/order" className="tf-btn animate-btn" style={{ background: "#dc2626", color: "#fff", padding: "14px 28px", borderRadius: 6, fontWeight: 700 }}>
              Start Your Custom Suit
            </Link>
            <Link href="/contact-us" className="tf-btn animate-btn" style={{ border: "1px solid rgba(226,27,27,0.5)", color: "#fff", padding: "14px 28px", borderRadius: 6, fontWeight: 700 }}>
              Ask a Question First
            </Link>
          </div>
        </div>

        {/* FAQ — mirrored in FAQPage JSON-LD in app/(otherPages)/custom-race-suit/page.jsx */}
        <div className="blog-body-block">
          <h2 className="blog-body-heading">Custom Race Suit FAQs</h2>
          {RACE_SUIT_FAQS.map((f, i) => (
            <div key={i} className="blog-faq-item">
              <h3 className="blog-faq-question" style={{ fontSize: "1.05rem" }}>{f.q}</h3>
              <p className="blog-body-text" style={{ marginBottom: 0 }}>
                {f.a}
                {f.link && (
                  <> {" "}<Link href={f.link.href} style={{ color: "#f87171" }}>{f.link.text} →</Link></>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
