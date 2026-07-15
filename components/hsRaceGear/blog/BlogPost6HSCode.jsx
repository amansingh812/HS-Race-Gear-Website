"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import RelatedBlogPosts from "@/components/hsRaceGear/blog/RelatedBlogPosts";

export default function BlogPost6HSCode() {
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
            <span className="contact-breadcrumb-current">Racing Suit HS Code</span>
          </p>
          <span className="contact-hero-tag">Import & Customs</span>
          <h1 className="contact-hero-title">
            Racing Suit<br /><span>HS Code</span>
          </h1>
          <p className="contact-hero-subtitle">
            Importing a racing suit across international borders? Here's exactly how fire-resistant Nomex suits, gloves, and shoes are classified — and what duty rates to expect.
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
              <span className="blog-post-tag">Import Guide</span>
              <span className="blog-post-date">May 2026 · 5 min read</span>
            </div>

            {/* TITLE BLOCK */}
            <div className="blog-post-title-block">
              <h2 className="blog-post-main-title">What Is the HS Code for a Racing Suit? (Import &amp; Customs Guide)</h2>
              <p className="blog-post-subtitle">HS Code 6210.40 — How Fire-Resistant Race Suits, Gloves &amp; Shoes Are Classified at Customs</p>
            </div>

            {/* INTRO */}
            <div className="blog-body-block">
              <div className="blog-body-card">
                <p className="blog-body-text">
                  If you're ordering a custom racing suit from the United States and having it shipped internationally — or if you're an importer handling motorsport gear in bulk — you'll need the correct Harmonized System (HS) code to clear customs without delays or misclassification penalties.
                </p>
                <p className="blog-body-text">
                  The short answer: <strong>fire-resistant racing suits (Nomex or equivalent) are classified under HS heading 6210, subheading 6210.40</strong>. But the full picture is a little more nuanced, because the 8–10 digit code varies by country, and different pieces of racing gear fall under different headings.
                </p>
              </div>
              <div className="blog-highlight-box">
                <p><strong>Quick Reference — Racing Suit HS Code:</strong> 6210.40 (fire-resistant garments, man-made fibres). For the US HTS: 6210.40.9090. For EU CN: 6210.40.00.</p>
              </div>
            </div>

            {/* IMAGE 1 — Racing suit */}
            <div className="blog-body-block">
              <div style={{ borderRadius: "12px", overflow: "hidden", margin: "0 0 8px 0", lineHeight: 0 }}>
                <Image
                  src="/images/home/SuitBanner.webp"
                  alt="Custom SFI-certified Nomex racing suit — classified under HS code 6210.40 for international import"
                  width={900}
                  height={480}
                  style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "12px" }}
                  priority
                />
              </div>
              <p style={{ fontSize: "13px", color: "#888", textAlign: "center", marginTop: "8px" }}>
                Fire-resistant Nomex racing suits fall under HS heading 6210 — garments made of fire-resistant or flame-retardant fabrics.
              </p>
            </div>

            {/* WHAT IS AN HS CODE */}
            <div className="blog-body-block">
              <h2 className="blog-body-heading">What Is an HS Code?</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  The Harmonized System (HS) is a standardized international classification framework developed by the World Customs Organization (WCO). It assigns a numerical code to virtually every type of traded good — from raw materials to finished apparel — so that customs authorities in different countries can communicate using a common language.
                </p>
                <p className="blog-body-text">
                  HS codes are structured in layers:
                </p>
                <ul className="blog-body-list">
                  <li><strong>2 digits</strong> — Chapter (e.g., Chapter 62: Articles of apparel, not knitted or crocheted)</li>
                  <li><strong>4 digits</strong> — Heading (e.g., 6210: Garments made of fire-resistant fabrics)</li>
                  <li><strong>6 digits</strong> — International subheading (e.g., 6210.40: Fire-resistant garments, men/boys, man-made fibres)</li>
                  <li><strong>8–10 digits</strong> — Country-specific tariff code (varies by importing nation)</li>
                </ul>
                <p className="blog-body-text">
                  The first 6 digits are identical in every WCO member country. The last 2–4 digits are set by the importing country's national tariff schedule.
                </p>
              </div>
            </div>

            {/* HS CODE FOR RACING SUITS */}
            <div className="blog-body-block">
              <h2 className="blog-body-heading">The HS Code for Racing Suits — 6210.40 Explained</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  Racing suits are classified under <strong>Chapter 62</strong> of the HS (Articles of apparel and clothing accessories, not knitted or crocheted). Within Chapter 62, fire-resistant garments fall under <strong>Heading 6210</strong>:
                </p>
              </div>

              <div className="blog-highlight-box">
                <p><strong>Heading 6210:</strong> Garments made up of fabrics of heading 5602, 5603, 5903, 5906 or 5907, or of fire-resistant fabrics.</p>
              </div>

              <div className="blog-body-card">
                <p className="blog-body-text">
                  Nomex® (meta-aramid) is an inherently flame-resistant fibre — it does not require chemical treatment to be fire-resistant, which is exactly what makes it ideal for SFI-rated race suits. This qualifies Nomex suits as "made of fire-resistant fabrics" under the heading 6210 definition.
                </p>
                <p className="blog-body-text">
                  The 6-digit subheadings under 6210 break down by gender and fibre type:
                </p>
                <ul className="blog-body-list blog-body-list--check">
                  <li><strong>6210.10</strong> — Garments of fabrics coated, covered, or laminated with plastic/rubber</li>
                  <li><strong>6210.20</strong> — Other garments, of the type worn by women/girls, of wool or fine animal hair</li>
                  <li><strong>6210.30</strong> — Other garments, of the type worn by women/girls, of man-made fibres</li>
                  <li><strong style={{ color: "#e21b1b" }}>6210.40</strong> — <strong>Other garments, of the type worn by men/boys, of man-made fibres ← Racing suits</strong></li>
                  <li><strong>6210.50</strong> — Other garments, of other textile materials</li>
                </ul>
                <p className="blog-body-text">
                  Most SFI-certified racing suits — including one-piece and two-piece Nomex fire suits — are worn by male drivers and made from man-made aramid fibres. <strong>6210.40 is the correct 6-digit subheading in virtually all cases.</strong>
                </p>
              </div>
            </div>

            {/* COUNTRY-BY-COUNTRY TABLE */}
            <div className="blog-body-block">
              <h2 className="blog-body-heading">Racing Suit Tariff Codes by Country</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  The 10-digit tariff code and applicable duty rate vary by importing country. Below are the most common destinations for international racing gear orders:
                </p>
              </div>

              <div style={{
                overflowX: "auto",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.08)",
                margin: "16px 0"
              }}>
                <table style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14px",
                  minWidth: "560px"
                }}>
                  <thead>
                    <tr style={{ background: "#e21b1b", color: "#fff" }}>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Country</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Tariff Code</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Duty Rate (Approx.)</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["United States", "6210.40.9090", "4.3% – 16%", "HTS code; rate depends on fibre content"],
                      ["European Union", "6210.40.00", "12%", "Combined Nomenclature (CN); + VAT on import"],
                      ["United Kingdom", "6210.40.00", "12%", "UK Global Tariff post-Brexit; + VAT on import"],
                      ["Canada", "6210.40.90", "18%", "Schedule of Tariff; reduced under CETA/CUSMA for eligible goods"],
                      ["Australia", "6210.40.00", "10%", "Goods & Services Tax (GST) applies on top of duty"],
                      ["New Zealand", "6210.40.00", "10%", "General duty rate; lower under FTAs"],
                      ["UAE / Middle East", "6210.40", "5%", "GCC Unified Customs Tariff; duty at point of import"],
                    ].map(([country, code, rate, notes], i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <td style={{ padding: "11px 16px", fontWeight: 600 }}>{country}</td>
                        <td style={{ padding: "11px 16px", fontFamily: "monospace", color: "#e21b1b" }}>{code}</td>
                        <td style={{ padding: "11px 16px" }}>{rate}</td>
                        <td style={{ padding: "11px 16px", color: "#aaa", fontSize: "13px" }}>{notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: "13px", color: "#888", marginTop: "8px" }}>
                * Duty rates are approximate and subject to change. Always verify with your country's customs authority or a licensed customs broker before importing.
              </p>
            </div>

            {/* IMAGE 2 — Suits on display / ready to ship */}
            <div className="blog-body-block">
              <div style={{ borderRadius: "12px", overflow: "hidden", margin: "0 0 8px 0", lineHeight: 0 }}>
                <Image
                  src="/images/deals/off_the_rack_race_suits.webp"
                  alt="Off-the-rack SFI race suits ready for shipping — international customs classification under HS 6210.40"
                  width={900}
                  height={500}
                  style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "12px" }}
                />
              </div>
              <p style={{ fontSize: "13px", color: "#888", textAlign: "center", marginTop: "8px" }}>
                Pre-built race suits ship within days — customs classification as HS 6210.40 applies to both off-the-rack and custom-built suits.
              </p>
            </div>

            {/* GLOVES & SHOES */}
            <div className="blog-body-block">
              <h2 className="blog-body-heading">HS Codes for Racing Gloves and Racing Shoes</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  Racing gloves and shoes are classified under different headings from the suit itself. Here's how they break down:
                </p>
              </div>

              <div className="blog-body-card">
                <p className="blog-body-text"><strong style={{ color: "#e21b1b" }}>Racing Gloves — HS 6216.00</strong></p>
                <p className="blog-body-text">
                  Fire-resistant racing gloves fall under <strong>Heading 6216</strong> (Gloves, mittens and mitts). The applicable subheading depends on the material — Nomex/aramid gloves are typically classified as:
                </p>
                <ul className="blog-body-list">
                  <li><strong>6216.00.46</strong> — Gloves of man-made fibres (US HTS)</li>
                  <li><strong>6216.00.00</strong> — General gloves subheading (EU/UK CN)</li>
                </ul>
              </div>

              <div className="blog-body-card">
                <p className="blog-body-text"><strong style={{ color: "#e21b1b" }}>Racing Shoes — HS 6402 / 6405</strong></p>
                <p className="blog-body-text">
                  Racing shoes — even fire-resistant ones — are classified under Chapter 64 (Footwear), not Chapter 62. Leather-soled racing boots typically fall under:
                </p>
                <ul className="blog-body-list">
                  <li><strong>6402.99</strong> — Other footwear with outer soles and uppers of rubber/plastics</li>
                  <li><strong>6403.99</strong> — Footwear with uppers of leather (applicable to cowhide racing shoes)</li>
                  <li><strong>6405.20</strong> — Other footwear, uppers of textile materials</li>
                </ul>
                <p className="blog-body-text">
                  The classification hinges on the upper material and sole material. HS Race Gear's racing shoes use genuine cowhide leather uppers — most importers classify them under <strong>6403.99</strong>.
                </p>
              </div>
            </div>

            {/* DE MINIMIS */}
            <div className="blog-body-block">
              <h2 className="blog-body-heading">De Minimis Thresholds — When No Duty Applies</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  Many countries have a <em>de minimis</em> threshold — a value below which imported goods are cleared without customs duty or formal entry. If your racing suit order falls below this threshold, you may pay no import duty at all:
                </p>
                <ul className="blog-body-list blog-body-list--check">
                  <li><strong>United States:</strong> USD $800 de minimis — most individual racing suit orders clear duty-free</li>
                  <li><strong>Canada:</strong> CAD $20 formal entry threshold (very low — most orders attract duty)</li>
                  <li><strong>Australia:</strong> AUD $1,000 — GST still applies below this threshold from 2018</li>
                  <li><strong>European Union:</strong> EUR €150 — VAT applies on all imports regardless of value</li>
                  <li><strong>United Kingdom:</strong> GBP £135 — VAT is collected at point of sale for goods below this value</li>
                </ul>
              </div>
              <div className="blog-highlight-box">
                <p>US buyers ordering a single custom racing suit from HS Race Gear (priced from $299) will typically clear customs duty-free under the $800 de minimis threshold — even when ordering internationally.</p>
              </div>
            </div>

            {/* IMAGE 3 — Custom suit mockup */}
            <div className="blog-body-block">
              <div style={{ borderRadius: "12px", overflow: "hidden", margin: "0 0 8px 0", lineHeight: 0 }}>
                <Image
                  src="/images/karting/mockup-1.webp"
                  alt="Custom racing suit design mockup — built to order and shipped worldwide with proper customs documentation"
                  width={900}
                  height={500}
                  style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "12px" }}
                />
              </div>
              <p style={{ fontSize: "13px", color: "#888", textAlign: "center", marginTop: "8px" }}>
                Every custom suit is built to your measurements and shipped with a commercial invoice showing the correct HS code and declared value.
              </p>
            </div>

            {/* DOCUMENTATION */}
            <div className="blog-body-block">
              <h2 className="blog-body-heading">What to Include on the Commercial Invoice</h2>
              <div className="blog-body-card">
                <p className="blog-body-text">
                  When ordering racing gear internationally, the commercial invoice included with your shipment should clearly state the following to help customs clearance go smoothly:
                </p>
                <ul className="blog-body-list blog-body-list--check">
                  <li><strong>HS / HTS code:</strong> 6210.40 (or country-specific full code)</li>
                  <li><strong>Product description:</strong> "Fire-resistant racing suit, Nomex aramid fibre, SFI 3.2A/X certified, one piece" (or two-piece as applicable)</li>
                  <li><strong>Country of origin:</strong> United States</li>
                  <li><strong>Declared value:</strong> The actual transaction price paid in USD</li>
                  <li><strong>Quantity and weight:</strong> Number of units, gross weight in kg</li>
                  <li><strong>Intended end use:</strong> Motorsport safety equipment (not for resale, if applicable)</li>
                </ul>
              </div>
              <div className="blog-highlight-box">
                <p>Never undervalue declared goods on a customs invoice. Customs authorities can assess penalties, confiscate goods, or add significant delays for misrepresented shipments.</p>
              </div>
            </div>

            {/* FAQ */}
            <div className="blog-body-block">
              <h2 className="blog-body-heading">Frequently Asked Questions</h2>

              <div className="blog-body-card">
                <p className="blog-body-text"><strong>Is the HS code for a one-piece suit different from a two-piece?</strong></p>
                <p className="blog-body-text">
                  No — both one-piece and two-piece fire-resistant racing suits classify under HS 6210.40. The distinction that matters for classification is the material (fire-resistant fabric) and the wearer type (men/boys), not the number of pieces.
                </p>
                <hr style={{ margin: "20px 0", borderColor: "#222" }} />
                <p className="blog-body-text"><strong>Are custom-fitted racing suits classified differently than standard sizes?</strong></p>
                <p className="blog-body-text">
                  No. Customs classification is based on the material composition (e.g., woven synthetic fibres) and the specific protective features of the garment (SFI or FIA label) rather than whether it is tailored to measurements or off-the-rack.
                </p>
              </div>

              <div className="blog-body-card">
                <p className="blog-body-text"><strong>What if my racing suit is made of cotton or polyester (not Nomex)?</strong></p>
                <p className="blog-body-text">
                  If the suit is made of chemically-treated fire-retardant fabric rather than inherently flame-resistant Nomex, it may still classify under 6210.40 as long as the fabric meets the "fire-resistant" criteria. However, if the suit is a standard cotton or polyester suit with no fire-resistant treatment, it would more likely fall under 6211 (track suits and special purpose garments) rather than 6210.
                </p>
              </div>

              <div className="blog-body-card">
                <p className="blog-body-text"><strong>Do I need a customs broker to import racing gear?</strong></p>
                <p className="blog-body-text">
                  For a single personal-use purchase, a licensed customs broker is rarely required — postal and courier services (FedEx, DHL, UPS) typically handle customs clearance for individual parcels. For commercial imports — bulk orders for a team or retailer — a licensed customs broker is strongly recommended.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="blog-body-block">
              <div className="blog-body-card" style={{ borderLeft: "4px solid #e21b1b" }}>
                <p className="blog-body-text">
                  <strong>HS Race Gear ships custom SFI-certified racing suits worldwide</strong>. Every order ships with a commercial invoice that includes the correct HS code, declared value, and country of origin — making customs clearance as straightforward as possible for international buyers.
                </p>
                <p style={{ marginTop: "16px" }}>
                  <Link
                    href="/custom-race-suit"
                    style={{
                      display: "inline-block",
                      background: "#e21b1b",
                      color: "#fff",
                      padding: "12px 28px",
                      borderRadius: "8px",
                      fontWeight: 600,
                      fontSize: "15px",
                      textDecoration: "none",
                    }}
                  >
                    Build Your Custom Racing Suit →
                  </Link>
                </p>
              </div>
            </div>

            <RelatedBlogPosts excludeSlug="racing-suit-hs-code" />

          </div>
        </div>
      </section>
    </>
  );
}
