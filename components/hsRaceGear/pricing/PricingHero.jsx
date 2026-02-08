"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function PricingHero() {
    return (
        <section className="pricing-hero">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7">
                        <div className="pricing-hero-content">
                            <div className="hero-badge">
                                <span className="badge-icon">
                                    <i className="icon-check-circle"></i>
                                </span>
                                <span>SFI Foundation Approved</span>
                            </div>
                            <h1 className="pricing-hero-title">
                                Professional Racing Gear
                                <span className="text-accent"> Pricing</span>
                            </h1>
                            <p className="pricing-hero-subtitle">
                                Premium SFI-certified motorsport equipment engineered for safety,
                                comfort, and performance. Every suit is custom-made to your exact
                                measurements at no additional cost.
                            </p>
                            <div className="pricing-hero-highlights">
                                <div className="highlight-item">
                                    <span className="highlight-icon">
                                        <i className="icon-shield"></i>
                                    </span>
                                    <div className="highlight-text">
                                        <strong>SFI 3.2A/1 & 3.2A/5</strong>
                                        <span>Certified Protection</span>
                                    </div>
                                </div>
                                <div className="highlight-item">
                                    <span className="highlight-icon">
                                        <i className="icon-ruler"></i>
                                    </span>
                                    <div className="highlight-text">
                                        <strong>Custom Fit</strong>
                                        <span>Made to Your Measurements</span>
                                    </div>
                                </div>
                                <div className="highlight-item">
                                    <span className="highlight-icon">
                                        <i className="icon-truck"></i>
                                    </span>
                                    <div className="highlight-text">
                                        <strong>Free Shipping</strong>
                                        <span>Orders Over $300</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pricing-hero-cta">
                                <Link href="#racing-suits" className="tf-btn btn-fill btn-xl radius-60">
                                    <span>View Racing Suits</span>
                                    <i className="icon-arrow-down"></i>
                                </Link>
                                <Link href="#bundles" className="tf-btn btn-outline btn-xl radius-60">
                                    <span>See Deal Bundles</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="pricing-hero-image">
                            <div className="hero-image-wrapper">
                                <Image
                                    src="/images/pricing/hero-racing-suit.jpg"
                                    alt="Professional Racing Suit"
                                    width={500}
                                    height={600}
                                    className="main-hero-img"
                                    priority
                                />
                                <div className="hero-price-tag">
                                    <span className="price-label">Starting at</span>
                                    <span className="price-value">$299</span>
                                    <span className="price-note">Custom Fit Included</span>
                                </div>
                            </div>
                            <div className="hero-certification-badge">
                                <Image
                                    src="/images/certifications/sfi-logo.png"
                                    alt="SFI Certified"
                                    width={80}
                                    height={80}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pricing-hero-bg"></div>
        </section>
    );
}
