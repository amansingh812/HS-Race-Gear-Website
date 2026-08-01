// Rebuilt 2026-07-06 to replace the template <Compare /> component which
// linked to /product-detail/1 (broken demo). Now serves as an index of the
// five brand comparison pages that already rank on GSC.
import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Link from "next/link";
import "@/public/css/compare.css";
import React from "react";

export const metadata = {
  alternates: { canonical: "/compare" },
  title: "Compare HS Race Gear vs K1, Rush, Velocita, Pyrotect, Simpson | HS Race Gear",
  description:
    "Side-by-side comparisons of HS Race Gear against the 5 biggest custom racing suit brands. See where we win on price, customization, and lead time — and where we don't.",
  keywords:
    "compare racing suits, HS Race Gear vs K1, HS Race Gear vs Rush, HS Race Gear vs Simpson, HS Race Gear vs Pyrotect, racing suit comparison",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.hsracegear.com" },
    { "@type": "ListItem", "position": 2, "name": "Compare", "item": "https://www.hsracegear.com/compare" }
  ]
};

const compareLinks = [
  { slug: "vs-customracesuit", title: "Custom Race Suit Buyer's Guide", blurb: "What to compare across any custom suit shop: SFI tier, fit process, all-in price, lead time." },
  { slug: "vs-k1", title: "HS Race Gear vs K1 RaceGear", blurb: "K1 sells volume, we sell custom fit at a lower price point." },
  { slug: "vs-rush", title: "HS Race Gear vs Rush Racewear", blurb: "Both target amateur racers. Compare custom-fit process, SFI tier, and price." },
  { slug: "vs-velocity", title: "HS Race Gear vs Velocita-USA", blurb: "Both Made in USA. Compare on customization depth and lead time." },
  { slug: "vs-pyrotect", title: "HS Race Gear vs Pyrotect", blurb: "Pyrotect is the incumbent. Compare on price, custom process, and mockup revisions." },
  { slug: "vs-simpson", title: "HS Race Gear vs Simpson Race Products", blurb: "Simpson is legacy premium. We're custom-fit premium at half the price." },
  { slug: "vs-hrx", title: "HS Race Gear vs HRX", blurb: "HRX ships from overseas. We build in the USA with a 2–3 week turnaround." },
];

export default function page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Topbar1 />
      <Header3 />
      {/* Breadcrumb */}
      <div className="tf-breadcrumb">
        <div className="container">
          <ul className="breadcrumb-list">
            <li className="item-breadcrumb">
              <Link href={`/`} className="text">Home</Link>
            </li>
            <li className="item-breadcrumb dot"><span /></li>
            <li className="item-breadcrumb">
              <span className="text">Compare Racing Suit Brands</span>
            </li>
          </ul>
        </div>
      </div>

      <section className="blog-post-section" style={{ padding: "60px 0" }}>
        <div className="container">
          <h1 className="blog-body-heading" style={{ textAlign: "center", marginBottom: 12 }}>
            Compare HS Race Gear vs the Big Names
          </h1>
          <p className="blog-body-text" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 40px" }}>
            Honest, side-by-side breakdowns of how HS Race Gear stacks up against the five most-searched competitor brands. Every comparison covers SFI certification, custom-fit process, price tier, and lead time.
          </p>
          <div className="row g-3">
            {compareLinks.map(c => (
              <div key={c.slug} className="col-md-6 col-lg-4">
                <Link href={`/compare/${c.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="blog-body-card" style={{ height: "100%", cursor: "pointer" }}>
                    <h3 className="blog-body-heading" style={{ fontSize: 20, marginBottom: 8, color: "#e21b1b" }}>{c.title}</h3>
                    <p className="blog-body-text" style={{ marginBottom: 0 }}>{c.blurb}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer3 />
    </>
  );
}
