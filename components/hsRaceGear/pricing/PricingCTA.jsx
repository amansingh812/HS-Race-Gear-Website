"use client";
import React from "react";
import Link from "next/link";

export default function PricingCTA() {
    return (
        <section className="pricing-cta-section">
            <div className="container">
                <div className="pricing-cta-wrapper">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <div className="cta-content">
                                <h2 className="cta-title">
                                    Ready to Get Your Custom Racing Gear?
                                </h2>
                                <p className="cta-description">
                                    Every racing suit is custom-made to your exact measurements at
                                    no additional cost. Our expert team ensures a perfect fit for
                                    maximum comfort and safety.
                                </p>
                                <div className="cta-highlights">
                                    <div className="cta-highlight-item">
                                        <i className="icon-check-circle"></i>
                                        <span>Free Custom Measurements</span>
                                    </div>
                                    <div className="cta-highlight-item">
                                        <i className="icon-check-circle"></i>
                                        <span>2-3 Week Production</span>
                                    </div>
                                    <div className="cta-highlight-item">
                                        <i className="icon-check-circle"></i>
                                        <span>Free Shipping Over $300</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="cta-buttons">
                                <Link
                                    href="/custom-fit"
                                    className="tf-btn btn-fill btn-xl radius-60 w-100"
                                >
                                    <span>Start Custom Order</span>
                                    <i className="icon-arrow-right"></i>
                                </Link>
                                <Link
                                    href="/contact-us"
                                    className="tf-btn btn-outline btn-lg radius-60 w-100"
                                >
                                    <span>Contact Us</span>
                                </Link>
                                <div className="cta-contact-info">
                                    <p>Questions? Call our experts:</p>
                                    <a href="tel:+1-555-RACING" className="cta-phone">
                                        <i className="icon-phone"></i>
                                        1-555-RACING
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
