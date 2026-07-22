import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function BlanketTemplate() {
    return (
        <>
            {/* HERO */}
            <section className="contact-hero">
                <div className="container">
                    <p className="contact-breadcrumb">
                        <Link href="/">Home</Link>
                        <span className="contact-breadcrumb-sep">/</span>
                        <span className="contact-breadcrumb-current">Blank Template</span>
                    </p>
                    <span className="contact-hero-tag">Downloads</span>
                    <h1 className="contact-hero-title">
                        Blank Design<br /><span>Template</span>
                    </h1>
                    <p className="contact-hero-subtitle">
                        Download our blank racing suit template to start designing your custom suit from scratch.
                        A clean canvas for your creativity.
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section className="hs-doc-section">
                <div className="container">
                    <div className="hs-doc-content">

                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">About the Blank Template</h2>

                            <div className="hs-doc-card">
                                <p className="hs-doc-card-text">
                                    The Blank Template is a clean, blank design layout of our racing suit. It includes
                                    all panel outlines, seam lines, and design zones without any pre-applied graphics.
                                    Use this template to create your custom design from the ground up.
                                </p>
                            </div>

                            <div className="hs-doc-card">
                                <h3 className="hs-doc-card-title">What&apos;s Included</h3>
                                <ul className="hs-doc-list">
                                    <li>Full suit front view outline</li>
                                    <li>Full suit back view outline</li>
                                    <li>Individual panel breakdowns</li>
                                    <li>Sleeve templates (left &amp; right)</li>
                                    <li>Collar and chest zone detail</li>
                                    <li>Design placement guidelines</li>
                                </ul>
                            </div>
                        </div>

                        {/* Mockup Image */}
                        <div className="hs-doc-block">
                            <div style={{
                                textAlign: "center",
                                padding: "40px 0"
                            }}>
                                <Image
                                    src="/assets/images/customize/mockup_blanket.jpeg"
                                    alt="Blank Template Mockup"
                                    width={600}
                                    height={400}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: "8px",
                                        maxWidth: "600px"
                                    }}
                                    priority
                                />
                            </div>
                        </div>

                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">Design Guidelines</h2>

                            <div className="hs-doc-card">
                                <h3 className="hs-doc-card-title">File Format</h3>
                                <p className="hs-doc-card-text">
                                    Templates are provided in vector format (AI/PDF) for maximum quality. Raster versions
                                    (PNG at 300 DPI) are also available for basic design software.
                                </p>
                            </div>

                            <div className="hs-doc-card">
                                <h3 className="hs-doc-card-title">Color Mode</h3>
                                <p className="hs-doc-card-text">
                                    Please use CMYK color mode for print accuracy. RGB colors may appear different on the
                                    final printed suit. Our team can assist with color matching if needed.
                                </p>
                            </div>

                            <div className="hs-doc-card hs-doc-card-warning">
                                <h3 className="hs-doc-card-title">Important</h3>
                                <p className="hs-doc-card-text">
                                    Do not modify the panel outlines or seam lines in the template. These are precise
                                    production guides and altering them may result in design misalignment on the final suit.
                                </p>
                            </div>
                        </div>

                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">Submit Your Design</h2>

                            <div className="hs-doc-card hs-doc-card-note">
                                <p className="hs-doc-card-text">
                                    Once your design is complete, email it to{" "}
                                    <a href="mailto:info@hsracegear.com" style={{ color: '#e21b1b' }}>info@hsracegear.com</a> or
                                    contact us at <a href="tel:+16173196993" style={{ color: '#e21b1b' }}>+1 (617) 319 6993</a>.
                                    Our design team will review your submission and provide a digital proof before production begins.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
