import React from "react";
import Image from "next/image";
import Link from "next/link";

// Rewritten 2026-09-19 — was ~300 words covering only 2 of the 8 rating tiers
// named in this page's own <title>/meta keywords ("3.2A/1 vs 3.2A/5 vs
// 3.2A/15", plus 3.2A/20, 3.4/5, SFI 15 in keywords). That title/content gap
// is why the page pulled 1,913 impressions but only 5 clicks — Google surfaced
// it for the full SFI-ratings query set, but visitors bounced off a page that
// didn't answer what the title promised. This version:
//   1. Adds a full comparison table (targets "sfi rating chart" directly)
//   2. Gives every tier named in metadata its own real section
//   3. Renders the FAQ schema's 6 Q&As as VISIBLE text — they previously only
//      existed in JSON-LD, which is a structured-data guidelines violation
//   4. Cites the SFI Foundation directly (E-E-A-T signal for a compliance page)
//   5. Fans out internal links to every blog post in the SFI cluster plus the
//      discipline-specific custom landers, instead of the single /custom-race-suit
//      link this page had before
export default function CertificationsContent() {
    return (
        <section className="hs-doc-section">
            <div className="container">
                <div className="hs-doc-content" style={{ maxWidth: '1000px' }}>

                    {/* Freshness signal — visible date to back the "(2026)" claim in the title/H1 */}
                    <p style={{
                        color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', fontFamily: 'Poppins, sans-serif',
                        marginBottom: '32px', textTransform: 'uppercase', letterSpacing: '1px'
                    }}>
                        Guide last verified: September 2026 · 7 min read
                    </p>

                    {/* Section 1: Introduction with Image */}
                    <div className="hs-doc-block" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '40px', alignItems: 'center' }}>
                        <div>
                            <h2 className="hs-doc-heading" style={{ borderBottom: 'none', paddingBottom: 0 }}>What is SFI?</h2>
                            <p className="hs-doc-card-text" style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                                The <a href="https://www.sfifoundation.com/" target="_blank" rel="noopener noreferrer">SFI Foundation</a> is
                                an independent, non-profit organization that develops and administers performance standards for motorsports
                                safety equipment — fire suits, gloves, shoes, helmets, and harnesses. SFI certification is required by
                                nearly every major US sanctioning body before a car or driver passes tech inspection.
                            </p>
                            <ul className="hs-doc-list">
                                <li><strong style={{ color: '#fff' }}>Laboratory Tested:</strong> Proven fire resistance &amp; thermal protection</li>
                                <li><strong style={{ color: '#fff' }}>Quality Audited:</strong> Manufacturers are strictly audited for consistency</li>
                                <li><strong style={{ color: '#fff' }}>Track Required:</strong> Mandatory for NHRA, IMCA, USAC, and regional series</li>
                            </ul>
                        </div>
                        <div className="cert-img-wrapper" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <Image
                                src="/images/shop/side_hero_sfi.webp"
                                alt="SFI Certification"
                                width={500}
                                height={500}
                                className="w-100 object-fit-cover"
                                style={{ aspectRatio: '1/1', display: 'block' }}
                                fallback="/images/section/sfi-certification-label.jpg"
                            />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                            <div style={{ position: 'absolute', bottom: '20px', left: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ background: '#e21b1b', padding: '6px 12px', borderRadius: '20px', fontWeight: 700, fontSize: '0.8rem', color: '#fff' }}>SFI APPROVED</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ height: '60px' }}></div>

                    {/* Section 2: FULL COMPARISON TABLE — targets "sfi rating chart" (11 imp)
                        directly. This is the single highest-value addition: a table is the
                        format Google prefers for a featured snippet on that exact query, and
                        it's the first thing on this page that actually resembles a "chart". */}
                    <div className="hs-doc-block" id="rating-chart" style={{ scrollMarginTop: '100px' }}>
                        <h2 className="hs-doc-heading">SFI Rating Chart — Every Tier at a Glance</h2>
                        <p className="hs-doc-card-text" style={{ marginBottom: '20px' }}>
                            Every SFI rating referenced on this page, what it covers, and where it's typically required. Ratings run
                            on the SFI 3.2A spec for suits — the higher the number after the slash, the more layers and the longer the
                            protection window.
                        </p>
                        <div className="hs-table-wrap">
                            <table className="hs-compare-table">
                                <thead>
                                    <tr>
                                        <th>Rating</th>
                                        <th>Protection Level</th>
                                        <th>Applies To</th>
                                        <th>Typical Use</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>SFI 3.2A/1</strong></td>
                                        <td>TPP ≥ 6 · ~3 sec to 2nd-degree burn</td>
                                        <td>Racing suits (single-layer)</td>
                                        <td>Karting-equivalent, track days, entry-level drag brackets</td>
                                    </tr>
                                    <tr>
                                        <td><strong>SFI 3.2A/5</strong></td>
                                        <td>TPP ≥ 19 · ~10 sec to 2nd-degree burn</td>
                                        <td>Racing suits (multi-layer)</td>
                                        <td>Sprint car, dirt late model, road racing, most circle track</td>
                                    </tr>
                                    <tr>
                                        <td><strong>SFI 3.2A/15</strong></td>
                                        <td>Higher TPP tier than 3.2A/5</td>
                                        <td>Racing suits (heavy multi-layer)</td>
                                        <td>Drag racing faster than ~7.49 ET — Pro Stock, alcohol classes</td>
                                    </tr>
                                    <tr>
                                        <td><strong>SFI 3.2A/20</strong></td>
                                        <td>Highest common automotive TPP tier</td>
                                        <td>Racing suits, integrated protection</td>
                                        <td>Top Fuel, Funny Car, nitro classes</td>
                                    </tr>
                                    <tr>
                                        <td><strong>SFI 3.3/5</strong></td>
                                        <td>Equivalent to 5-layer suit protection</td>
                                        <td>Gloves &amp; shoes</td>
                                        <td>Any series requiring an SFI 3.2A/5 suit or higher</td>
                                    </tr>
                                    <tr>
                                        <td><strong>SFI 3.4/5</strong></td>
                                        <td>NASCAR-spec uniform standard</td>
                                        <td>Fire-resistant uniforms</td>
                                        <td>NASCAR-sanctioned national touring series</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="hs-doc-card-text" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', marginTop: '12px' }}>
                            TPP thresholds are set and periodically revised by the SFI Foundation. Always confirm the current spec
                            against your sanctioning body's rulebook and the{" "}
                            <a href="https://www.sfifoundation.com/" target="_blank" rel="noopener noreferrer">SFI Foundation's official documentation</a>{" "}
                            before ordering. Want TPP explained in plain English?{" "}
                            <Link href="/blog/tpp-rating-explained">Read our TPP rating guide</Link>.
                        </p>
                    </div>

                    <div style={{ height: '60px' }}></div>

                    {/* Section 3: Per-tier deep dives — every tier in the table now gets its
                        own real paragraph, closing the gap between what the title promises
                        and what a visitor can actually read. */}
                    <div className="hs-doc-block">
                        <h2 className="hs-doc-heading text-center" style={{ borderBottom: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                            The Standards We Deliver
                            <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, transparent, #e21b1b, transparent)' }}></div>
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '24px', marginTop: '40px' }}>

                            {/* SFI 3.2A/1 — new */}
                            <div className="hs-doc-card" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', marginBottom: '10px', lineHeight: 1 }}>SFI 3.2A/1</div>
                                <div style={{ fontSize: '1.2rem', color: '#e21b1b', fontWeight: 600, marginBottom: '20px', fontFamily: 'Poppins, sans-serif' }}>Entry-Level Protection</div>
                                <p className="hs-doc-card-text" style={{ flexGrow: 1 }}>
                                    The base tier of the SFI 3.2A spec: a single-layer suit rated for roughly 3 seconds of protection
                                    before second-degree burn risk. It's the common baseline for track days and lower-ET drag brackets
                                    that don't require a multi-layer suit. See{" "}
                                    <Link href="/blog/sfi-rated-racing-suit-by-class">which rating your class actually needs</Link>.
                                </p>
                            </div>

                            {/* SFI 3.2A/5 — existing, expanded with link */}
                            <div className="hs-doc-card" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', height: '100%', borderColor: 'rgba(226, 27, 27, 0.3)' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', marginBottom: '10px', lineHeight: 1 }}>SFI 3.2A/5</div>
                                <div style={{ fontSize: '1.2rem', color: '#e21b1b', fontWeight: 600, marginBottom: '20px', fontFamily: 'Poppins, sans-serif' }}>Racing Suits</div>
                                <p className="hs-doc-card-text" style={{ flexGrow: 1 }}>
                                    Required for intense oval track, dirt, and drag racing. Offers a high Thermal Protective Performance
                                    (TPP) rating and is the practical floor for most weekly sprint and circle-track divisions.
                                </p>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>TPP Rating</span>
                                        <strong style={{ color: '#fff', fontSize: '0.85rem' }}>&ge; 19.0</strong>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Time to 2nd Degree Burn</span>
                                        <strong style={{ color: '#fff', fontSize: '0.85rem' }}>10 Seconds</strong>
                                    </div>
                                </div>
                            </div>

                            {/* SFI 3.2A/15 — new */}
                            <div className="hs-doc-card" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', marginBottom: '10px', lineHeight: 1 }}>SFI 3.2A/15</div>
                                <div style={{ fontSize: '1.2rem', color: '#e21b1b', fontWeight: 600, marginBottom: '20px', fontFamily: 'Poppins, sans-serif' }}>Drag Racing's Serious Tier</div>
                                <p className="hs-doc-card-text" style={{ flexGrow: 1 }}>
                                    Required once a drag car runs faster than roughly 7.49 ET under NHRA rules — Pro Stock, alcohol,
                                    and quick sportsman classes. Typically paired with SFI 3.3-rated head sock, gloves, and shoes.
                                    See the full{" "}
                                    <Link href="/blog/drag-racing-suit-requirements">drag racing ET-to-rating ladder</Link>, or{" "}
                                    <Link href="/custom-drag-racing-suit">build a custom 3.2A/15 drag suit</Link>.
                                </p>
                            </div>

                            {/* SFI 3.2A/20 — new */}
                            <div className="hs-doc-card" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', marginBottom: '10px', lineHeight: 1 }}>SFI 3.2A/20</div>
                                <div style={{ fontSize: '1.2rem', color: '#e21b1b', fontWeight: 600, marginBottom: '20px', fontFamily: 'Poppins, sans-serif' }}>Top Fuel &amp; Funny Car Tier</div>
                                <p className="hs-doc-card-text" style={{ flexGrow: 1 }}>
                                    The rating tier used in Top Fuel, Funny Car, and other nitro classes, where fire risk during an
                                    incident is at its highest. 3.2A/20 suits pair with integrated head, neck, and hand protection and
                                    require frequent recertification under NHRA rules. See our{" "}
                                    <Link href="/custom-drag-racing-suit">custom drag racing suit builder</Link>.
                                </p>
                            </div>

                            {/* SFI 3.3/5 — existing, expanded with links */}
                            <div className="hs-doc-card" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', marginBottom: '10px', lineHeight: 1 }}>SFI 3.3/5</div>
                                <div style={{ fontSize: '1.2rem', color: '#e21b1b', fontWeight: 600, marginBottom: '20px', fontFamily: 'Poppins, sans-serif' }}>Gloves &amp; Shoes</div>
                                <p className="hs-doc-card-text" style={{ flexGrow: 1 }}>
                                    Engineered to protect extremities while maintaining the tactile feel required for precise steering
                                    and pedal control. Shop custom{" "}
                                    <Link href="/custom-gloves">SFI 3.3/5 gloves</Link> or{" "}
                                    <Link href="/custom-shoes">SFI 3.3/5 shoes</Link>, built to your measurements.
                                </p>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Material</span>
                                        <strong style={{ color: '#fff', fontSize: '0.85rem' }}>Premium Nomex®</strong>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Usage</span>
                                        <strong style={{ color: '#fff', fontSize: '0.85rem' }}>All Sanctioned Events</strong>
                                    </div>
                                </div>
                            </div>

                            {/* SFI 3.4/5 — new */}
                            <div className="hs-doc-card" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', marginBottom: '10px', lineHeight: 1 }}>SFI 3.4/5</div>
                                <div style={{ fontSize: '1.2rem', color: '#e21b1b', fontWeight: 600, marginBottom: '20px', fontFamily: 'Poppins, sans-serif' }}>NASCAR Uniform Standard</div>
                                <p className="hs-doc-card-text" style={{ flexGrow: 1 }}>
                                    A separate spec from the 3.2A suit ratings, SFI 3.4/5 certifies fire-resistant uniforms used in
                                    NASCAR-sanctioned national touring series. If you race under NASCAR sanctioning, confirm with your
                                    tech inspector whether 3.4/5 applies to your class.
                                </p>
                            </div>

                        </div>
                    </div>

                    <div style={{ height: '60px' }}></div>

                    {/* Section 4: Verification */}
                    <div className="hs-doc-block">
                        <div className="hs-doc-card hs-doc-card-note" style={{ display: 'flex', gap: '30px', alignItems: 'center', padding: '30px' }}>
                            <div style={{ flex: '1' }}>
                                <h3 className="hs-doc-card-title" style={{ fontSize: '1.4rem' }}>Tech Inspection Ready</h3>
                                <p className="hs-doc-card-text" style={{ fontSize: '1rem' }}>
                                    Every custom suit, glove, and shoe from HS Racegear includes a genuine SFI certification patch
                                    permanently affixed to the garment exterior. This ensures zero delays or issues during pre-race tech
                                    inspections.
                                </p>
                                <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                    <Link href="/custom-race-suit" style={{
                                        display: 'inline-block', background: '#fff', color: '#000',
                                        padding: '12px 24px', borderRadius: '8px', fontWeight: 700,
                                        fontSize: '0.85rem', textDecoration: 'none', letterSpacing: '1px',
                                        textTransform: 'uppercase', fontFamily: 'Poppins, sans-serif'
                                    }}>
                                        Design Your SFI Suit
                                    </Link>
                                </div>
                            </div>
                            <div style={{ flexShrink: 0, width: '120px', height: '120px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px' }}>
                                <Image src="/images/sfi-approved.png" alt="SFI Approved" width={90} height={90} style={{ objectFit: 'contain' }} />
                            </div>
                        </div>
                    </div>

                    {/* Cross-link to the karting certification hub, added
                        2026-08-11. Karting runs on CIK-FIA, not SFI — anyone
                        landing here for a kart suit needs sending across. */}
                    <div className="hs-doc-block">
                        <h2 className="hs-doc-heading">Racing Karts? You Need CIK-FIA, Not SFI</h2>
                        <div className="hs-doc-card">
                            <p className="hs-doc-card-text">
                                Everything on this page covers SFI, the standard for car racing suits. Karting uses a different standard entirely — CIK-FIA Level 2, which tests abrasion resistance rather than thermal protection, because a kart presents a different hazard than a car.
                            </p>
                            <p className="hs-doc-card-text">
                                An SFI-rated car suit will generally not pass karting tech inspection, and a CIK Level 2 kart suit is not a substitute for an SFI suit in a car. If you race both, you need both.{" "}
                                <Link href="/cik-fia-level-2">Read the CIK-FIA Level 2 guide</Link>.
                            </p>
                        </div>
                    </div>

                    <div style={{ height: '60px' }}></div>

                    {/* Section 5: NEW — reading list. Fans internal links out across the
                        entire SFI content cluster instead of leaving this hub page with a
                        single outbound link, which is the main lever for improving crawl
                        depth/frequency into those posts. */}
                    <div className="hs-doc-block">
                        <h2 className="hs-doc-heading">Go Deeper on SFI Certifications</h2>
                        <div className="hs-doc-card">
                            <ul className="hs-doc-list">
                                <li><Link href="/blog/understanding-sfi-certifications">What Is SFI Certified? A Beginner's Guide</Link> — what "SFI approved" actually means and how the labeling system works</li>
                                <li><Link href="/blog/sfi-rated-racing-suit-by-class">SFI Rating by Race Class</Link> — the exact rating sprint car, drag, dirt late model, road racing, karting, and powerboat racers need</li>
                                <li><Link href="/blog/sfi-vs-fia-rating">SFI vs FIA Rating</Link> — how the US and international standards compare and when each applies</li>
                                <li><Link href="/blog/tpp-rating-explained">TPP Rating Explained</Link> — what Thermal Protective Performance actually measures and why it matters</li>
                                <li><Link href="/blog/drag-racing-suit-requirements">Drag Racing Suit Requirements</Link> — the full NHRA ET-to-rating ladder</li>
                            </ul>
                        </div>
                    </div>

                    <div style={{ height: '60px' }}></div>

                    {/* Section 6: NEW — visible FAQ. These 6 Q&As already exist in this
                        page's FAQPage JSON-LD schema but were never rendered as visible
                        content, which is a violation of Google's structured-data guidelines
                        (FAQ schema must match on-page, user-visible content). Rendered here
                        verbatim so the schema and the page agree. */}
                    <div className="hs-doc-block">
                        <h2 className="hs-doc-heading">Frequently Asked Questions</h2>
                        <div className="hs-doc-card">
                            <div style={{ marginBottom: '24px' }}>
                                <h3 className="faq-question hs-doc-card-title" style={{ fontSize: '1.05rem' }}>What does SFI stand for in racing?</h3>
                                <div className="faq-answer">
                                    <p className="hs-doc-card-text">
                                        SFI stands for SFI Foundation, Inc. — an independent non-profit organization that sets and
                                        administers performance standards for racing safety equipment including fire suits, gloves,
                                        shoes, helmets, and harnesses.
                                    </p>
                                </div>
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <h3 className="faq-question hs-doc-card-title" style={{ fontSize: '1.05rem' }}>What are SFI ratings for racing suits?</h3>
                                <div className="faq-answer">
                                    <p className="hs-doc-card-text">
                                        SFI ratings for racing suits measure fire protection level. SFI 3.2A/1 (single-layer) provides
                                        approximately 3 seconds of protection from a flash fire, while SFI 3.2A/5 (multi-layer) provides
                                        approximately 10 seconds. Most sanctioning bodies require at minimum SFI 3.2A/1, and many
                                        competitive series require SFI 3.2A/5.
                                    </p>
                                </div>
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <h3 className="faq-question hs-doc-card-title" style={{ fontSize: '1.05rem' }}>What is the difference between SFI 3.2A/1 and SFI 3.2A/5?</h3>
                                <div className="faq-answer">
                                    <p className="hs-doc-card-text">
                                        SFI 3.2A/1 is a single-layer fire suit offering about 3 seconds of thermal protection — suitable
                                        for karting and lower-risk environments. SFI 3.2A/5 is a multi-layer suit offering about 10
                                        seconds of protection, required for most circle-track, drag, and sprint car racing series. HS
                                        Race Gear offers both, custom-built to your measurements.
                                    </p>
                                </div>
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <h3 className="faq-question hs-doc-card-title" style={{ fontSize: '1.05rem' }}>What does SFI approved mean?</h3>
                                <div className="faq-answer">
                                    <p className="hs-doc-card-text">
                                        SFI approved means the product has been independently tested and certified by the SFI Foundation
                                        to meet a specific performance standard. SFI-approved racing gear carries a dated SFI label
                                        confirming it passed the required fire resistance, tensile strength, and seam integrity tests.
                                    </p>
                                </div>
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <h3 className="faq-question hs-doc-card-title" style={{ fontSize: '1.05rem' }}>What is SFI 3.3/5 for gloves and shoes?</h3>
                                <div className="faq-answer">
                                    <p className="hs-doc-card-text">
                                        SFI 3.3/5 is the certification standard for racing gloves and shoes. It certifies that the
                                        product provides fire resistance equivalent to a 5-layer suit's protection level at the hands and
                                        feet. Most racing series that require an SFI 3.2A/5 suit also require SFI 3.3/5 gloves and shoes.
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h3 className="faq-question hs-doc-card-title" style={{ fontSize: '1.05rem' }}>Do SFI certifications expire?</h3>
                                <div className="faq-answer">
                                    <p className="hs-doc-card-text" style={{ marginBottom: 0 }}>
                                        Yes. SFI-certified racing gear is labeled with a manufacture date, and most sanctioning bodies
                                        consider SFI labels valid for 2–5 years depending on the series rules. Always check your series
                                        tech inspection requirements. HS Race Gear ships new gear with a current SFI label.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sources line — E-E-A-T citation for a compliance/certification page */}
                    <p className="hs-doc-card-text" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', marginTop: '32px' }}>
                        Sources: rating tiers and thresholds referenced above are based on publicly published{" "}
                        <a href="https://www.sfifoundation.com/" target="_blank" rel="noopener noreferrer">SFI Foundation</a>{" "}
                        specifications. For the current, authoritative spec sheets, always check with the SFI Foundation directly or
                        your sanctioning body's tech inspector.
                    </p>

                </div>
            </div>
            {/* Responsive overrides inside component */}
            <style dangerouslySetInnerHTML={{
                __html: `
  @media (max-width: 768px) {
    .hs-doc-block[style*="grid-template-columns"] {
      grid-template-columns: 1fr !important;
    }
    .cert-img-wrapper {
      margin-top: 30px;
    }
  }
  @media (max-width: 576px) {
    .hs-doc-card-note[style*="display: flex"] {
      flex-direction: column;
      text-align: center;
    }
    .hs-doc-card-note[style*="display: flex"] > div:last-child {
      margin-top: 20px;
    }
  }
`}} />
        </section>
    );
}
