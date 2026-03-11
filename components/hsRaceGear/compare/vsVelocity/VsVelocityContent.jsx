import React from "react";
import Link from "next/link";

export default function VsVelocityContent() {
    return (
        <>
            {/* HERO */}
            <section className="contact-hero">
                <div className="container">
                    <p className="contact-breadcrumb">
                        <Link href="/">Home</Link>
                        <span className="contact-breadcrumb-sep">/</span>
                        <span className="contact-breadcrumb-current">HS Racegear vs Velocita</span>
                    </p>
                    <span className="contact-hero-tag">Compare</span>
                    <h1 className="contact-hero-title">
                        HS Racegear<br /><span>vs Velocita Racing Gear</span>
                    </h1>
                    <p className="contact-hero-subtitle">
                        Drivers comparing racing suit options deserve clear, honest answers. See how HS Racegear stacks up against Velocita Racing Gear for custom SFI-certified suits.
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section className="hs-doc-section">
                <div className="container">
                    <div className="hs-doc-content">

                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">What Drivers Are Really Looking For</h2>
                            <div className="hs-doc-card">
                                <p className="hs-doc-card-text">When comparing racing suit brands, most drivers care about:</p>
                                <ul className="hs-doc-list">
                                    <li>SFI certification that passes tech inspection</li>
                                    <li>Custom sizing for a proper, safe fit</li>
                                    <li>Reasonable pricing without hidden costs</li>
                                    <li>Fast production to meet race schedules</li>
                                    <li>Real design freedom — not just color options</li>
                                </ul>
                                <p className="hs-doc-card-text">HS Racegear is built to deliver exactly these things for drivers across all racing disciplines.</p>
                            </div>
                        </div>

                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">Pricing</h2>
                            <div className="hs-doc-card">
                                <ul className="hs-doc-list">
                                    <li><strong>HS Racegear:</strong> Custom SFI race suits start at $289</li>
                                    <li><strong>Velocita Racing Gear:</strong> Pricing varies by product line and region</li>
                                </ul>
                                <p className="hs-doc-card-text">HS Racegear offers transparent, accessible pricing with custom sizing included — no surprises at checkout.</p>
                            </div>
                        </div>

                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">Custom Design</h2>
                            <div className="hs-doc-card">
                                <h3 className="hs-doc-card-title">HS Racegear</h3>
                                <ul className="hs-doc-list">
                                    <li>Fully custom sizing based on driver measurements</li>
                                    <li>Open design process — your vision, your suit</li>
                                    <li>Unlimited revisions during design</li>
                                    <li>Driver name, flag, number, and sponsor logos included</li>
                                </ul>
                            </div>
                            <div className="hs-doc-card hs-doc-card-note">
                                <p className="hs-doc-card-text">For drivers who want full sponsor visibility and a unique look, HS Racegear provides the most creative freedom at the lowest cost.</p>
                            </div>
                        </div>

                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">Production Timeline</h2>
                            <div className="hs-doc-card">
                                <p className="hs-doc-card-text">HS Racegear delivers a <strong style={{ color: '#e21b1b' }}>guaranteed 2–3 week production timeline</strong>. Whether you need a replacement mid-season or are preparing for a major event, HS Racegear keeps your schedule on track.</p>
                            </div>
                        </div>

                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">Materials &amp; Safety</h2>
                            <div className="hs-doc-card">
                                <p className="hs-doc-card-text">Every HS Racegear suit uses:</p>
                                <ul className="hs-doc-list">
                                    <li>Premium Nomex® meta-aramid fabric</li>
                                    <li>Fire-resistant inner linings (standard, not an upgrade)</li>
                                    <li>Reinforced stitching at high-stress zones</li>
                                    <li>Stretch panels for cockpit mobility and pedal control</li>
                                </ul>
                            </div>
                        </div>

                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">Complete Racewear Ecosystem</h2>
                            <div className="hs-doc-card">
                                <p className="hs-doc-card-text">HS Racegear is your single source for a full coordinated kit:</p>
                                <ul className="hs-doc-list">
                                    <li>Custom SFI racing suits</li>
                                    <li>Matching SFI racing gloves</li>
                                    <li>Coordinated racing shoes</li>
                                </ul>
                                <p className="hs-doc-card-text">One supplier, consistent branding, no compromise on safety.</p>
                            </div>
                        </div>

                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">Ready to Gear Up?</h2>
                            <div className="hs-doc-card" style={{ textAlign: 'center', paddingTop: '32px', paddingBottom: '32px' }}>
                                <Link href="/custom-race-suit" style={{
                                    display: 'inline-block', background: '#e21b1b', color: '#fff',
                                    padding: '14px 32px', borderRadius: '8px', fontWeight: 700,
                                    fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '1.5px',
                                    textTransform: 'uppercase', fontFamily: 'Poppins, sans-serif'
                                }}>
                                    Design Your Custom HS Racegear Suit Today
                                </Link>
                                <p className="hs-doc-card-text" style={{ marginTop: '12px', marginBottom: 0 }}>Race protected, compliant, and confident.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
