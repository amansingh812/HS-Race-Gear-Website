import React from "react";
import Link from "next/link";

export default function MoreMockups() {
    return (
        <>
            {/* HERO */}
            <section className="contact-hero">
                <div className="container">
                    <p className="contact-breadcrumb">
                        <Link href="/">Home</Link>
                        <span className="contact-breadcrumb-sep">/</span>
                        <span className="contact-breadcrumb-current">More Mockups</span>
                    </p>
                    <span className="contact-hero-tag">Downloads</span>
                    <h1 className="contact-hero-title">
                        Racing Suit<br /><span>Mockups</span>
                    </h1>
                    <p className="contact-hero-subtitle">
                        Download additional mockup templates to visualize your custom racing suit design before ordering. See exactly how your design will look on the finished suit.
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section className="hs-doc-section">
                <div className="container">
                    <div className="hs-doc-content">

                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">Available Mockups</h2>

                            <div className="hs-doc-card">
                                <h3 className="hs-doc-card-title">Racing Suit Front &amp; Back View</h3>
                                <p className="hs-doc-card-text">
                                    A full front and back mockup template showing all panels, seams, and design areas.
                                    Perfect for placing your custom graphics, sponsor logos, and color scheme.
                                </p>
                            </div>

                            <div className="hs-doc-card">
                                <h3 className="hs-doc-card-title">Sleeve Detail Mockup</h3>
                                <p className="hs-doc-card-text">
                                    Detailed sleeve and arm area mockup for precise logo and sponsor placement on the
                                    left and right sleeves of your custom racing suit.
                                </p>
                            </div>

                            <div className="hs-doc-card">
                                <h3 className="hs-doc-card-title">Collar &amp; Chest Zone</h3>
                                <p className="hs-doc-card-text">
                                    Close-up mockup of the collar, chest, and upper body zone. Ideal for placing
                                    driver name, team branding, and primary sponsor logos.
                                </p>
                            </div>
                        </div>

                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">How to Use</h2>

                            <div className="hs-doc-card">
                                <h3 className="hs-doc-card-title">Step 1: Download the Template</h3>
                                <p className="hs-doc-card-text">
                                    Download the mockup files in high-resolution format. Templates are available in
                                    PDF and PNG formats for maximum compatibility.
                                </p>
                            </div>

                            <div className="hs-doc-card">
                                <h3 className="hs-doc-card-title">Step 2: Add Your Design</h3>
                                <p className="hs-doc-card-text">
                                    Open the template in your preferred design software (Adobe Illustrator, Photoshop,
                                    or any vector editor) and place your graphics, logos, and color selections.
                                </p>
                            </div>

                            <div className="hs-doc-card">
                                <h3 className="hs-doc-card-title">Step 3: Submit for Review</h3>
                                <p className="hs-doc-card-text">
                                    Send your completed design to our team for review. We&apos;ll confirm your design,
                                    ensure print accuracy, and proceed with production.
                                </p>
                            </div>
                        </div>

                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">Need Help?</h2>

                            <div className="hs-doc-card hs-doc-card-note">
                                <p className="hs-doc-card-text">
                                    If you need assistance with mockup templates or design placement, contact our team
                                    at <a href="mailto:info@hsracegear.com" style={{ color: '#e21b1b' }}>info@hsracegear.com</a> or
                                    call us at <a href="tel:+16173196993" style={{ color: '#e21b1b' }}>+1 (617) 319 6993</a>.
                                    We&apos;re happy to help you create the perfect design.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
