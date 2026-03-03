import React from "react";
import Link from "next/link";

export default function ReturnPolicy() {
    return (
        <>
            {/* HERO */}
            <section className="contact-hero">
                <div className="container">
                    <p className="contact-breadcrumb">
                        <Link href="/">Home</Link>
                        <span className="contact-breadcrumb-sep">/</span>
                        <span className="contact-breadcrumb-current">Return Policy</span>
                    </p>
                    <span className="contact-hero-tag">Legal</span>
                    <h1 className="contact-hero-title">
                        Return<br /><span>Policy</span>
                    </h1>
                    <p className="contact-hero-subtitle">
                        Learn about our return and exchange process for custom racing suits, gloves, and shoes. All orders are custom-built to your specifications.
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section className="hs-doc-section">
                <div className="container">
                    <div className="hs-doc-content">

                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">Custom Order Policy</h2>
                            <div className="hs-doc-card hs-doc-card-warning">
                                <h3 className="hs-doc-card-title">Important — All Orders Are Custom Made</h3>
                                <p className="hs-doc-card-text">
                                    Every HS RaceGear product is custom-built to your exact specifications, including your measurements, design selections, and personalization. Because of this, <strong>all sales are final</strong> once production has begun.
                                </p>
                            </div>
                            <div className="hs-doc-card">
                                <p className="hs-doc-card-text">
                                    We do not accept returns or exchanges on custom-made items unless the product has a manufacturing defect or there was an error on our part during production. This policy applies to all custom racing suits, gloves, and shoes.
                                </p>
                            </div>
                        </div>

                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">When Returns Are Accepted</h2>
                            <div className="hs-doc-card">
                                <p className="hs-doc-card-text">HS RaceGear will accept a return or provide a replacement if:</p>
                                <ul className="hs-doc-list">
                                    <li>The product has a manufacturing defect</li>
                                    <li>The product does not match the confirmed design proof</li>
                                    <li>There was a production error on our part</li>
                                    <li>The product was damaged during shipping</li>
                                </ul>
                                <p className="hs-doc-card-text">In these cases, please contact us within <strong>7 days</strong> of receiving your order with clear photos of the issue.</p>
                            </div>
                        </div>

                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">Measurements &amp; Sizing Responsibility</h2>
                            <div className="hs-doc-card hs-doc-card-note">
                                <p className="hs-doc-card-text">
                                    HS RaceGear is not responsible for incorrect measurements provided by the customer. We strongly recommend using our <Link href="/custom-fit" style={{ color: '#e21b1b' }}>How to Measure</Link> guide and having someone assist you when taking measurements. Double-check all measurements before submitting your order.
                                </p>
                            </div>
                        </div>

                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">Design Approval</h2>
                            <div className="hs-doc-card">
                                <p className="hs-doc-card-text">Before production begins, you will receive a <strong>digital design proof</strong> for your approval. Carefully review all design elements including:</p>
                                <ul className="hs-doc-list">
                                    <li>Colors and color placement</li>
                                    <li>Text, driver name, and number accuracy</li>
                                    <li>Logo and sponsor placement</li>
                                    <li>Overall layout and design structure</li>
                                </ul>
                                <p className="hs-doc-card-text">Once you approve the design, production begins immediately. No changes can be made after approval.</p>
                            </div>
                        </div>

                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">Cancellations</h2>
                            <div className="hs-doc-card">
                                <p className="hs-doc-card-text">Cancellations may be accepted if requested <strong>before production has begun</strong>. Once your design is approved and production starts, cancellations will not be possible. Please contact us as soon as possible if you need to cancel an order.</p>
                            </div>
                        </div>

                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">Contact Us</h2>
                            <div className="hs-doc-card hs-doc-card-note">
                                <p className="hs-doc-card-text">
                                    If you have a return or exchange inquiry, please contact our team:<br /><br />
                                    📧 Email: <a href="mailto:admin@hsracegear.com" style={{ color: '#e21b1b' }}>admin@hsracegear.com</a><br />
                                    📞 Phone: <a href="tel:+16173196993" style={{ color: '#e21b1b' }}>+1 (617) 319 6993</a><br /><br />
                                    Please include your order number and photos when reporting an issue.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
