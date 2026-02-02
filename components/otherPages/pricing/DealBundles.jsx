"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { dealBundles } from "@/data/pricingData";

export default function DealBundles() {
    const formatPrice = (value) => {
        return value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    };

    return (
        <section className="deal-bundles-section" id="bundles">
            <div className="container">
                {/* Section Header */}
                <div className="pricing-section-header">
                    <span className="section-subtitle">Save More with Bundles</span>
                    <h2 className="section-title">Complete Racing Gear Packages</h2>
                    <p className="section-description">
                        Get everything you need to race safely with our specially curated
                        bundles. Save significantly compared to buying items separately.
                    </p>
                </div>

                {/* Bundles Grid */}
                <div className="row g-4">
                    {dealBundles.map((bundle) => (
                        <div key={bundle.id} className="col-lg-4 col-md-6">
                            <div
                                className={`bundle-card ${bundle.isFeatured ? "featured" : ""}`}
                            >
                                {/* Bundle Badge */}
                                {bundle.badge && (
                                    <div
                                        className={`bundle-badge ${bundle.isFeatured ? "badge-featured" : ""
                                            }`}
                                    >
                                        <span>{bundle.badge}</span>
                                    </div>
                                )}

                                {/* Bundle Header */}
                                <div className="bundle-header">
                                    <div className="bundle-image-wrapper">
                                        <Image
                                            src={bundle.image}
                                            alt={bundle.name}
                                            width={280}
                                            height={200}
                                            className="bundle-img"
                                        />
                                    </div>
                                    <h3 className="bundle-title">{bundle.name}</h3>
                                </div>

                                {/* Bundle Pricing */}
                                <div className="bundle-pricing">
                                    <div className="bundle-price-main">
                                        <span className="bundle-price">{formatPrice(bundle.price)}</span>
                                        <span className="bundle-original">
                                            {formatPrice(bundle.originalValue)}
                                        </span>
                                    </div>
                                    <div className="bundle-savings">
                                        <i className="icon-tag"></i>
                                        <span>Save {formatPrice(bundle.savings)}</span>
                                    </div>
                                </div>

                                {/* Bundle Description */}
                                <p className="bundle-description">{bundle.description}</p>

                                {/* Bundle Includes */}
                                <div className="bundle-includes">
                                    <h6>Bundle Includes:</h6>
                                    <ul className="bundle-items-list">
                                        {bundle.includes.map((item, index) => (
                                            <li key={index}>
                                                <span className="item-check">
                                                    <i className="icon-check"></i>
                                                </span>
                                                <span className="item-name">{item.name}</span>
                                                {item.certification && item.certification !== "N/A" && (
                                                    <span className="item-cert">{item.certification}</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Bundle CTA */}
                                <div className="bundle-footer">
                                    <Link
                                        href={bundle.ctaLink}
                                        className={`tf-btn ${bundle.isFeatured ? "btn-fill" : "btn-outline"
                                            } btn-lg radius-60 w-100`}
                                    >
                                        <span>{bundle.ctaText}</span>
                                        <i className="icon-arrow-right"></i>
                                    </Link>
                                    {bundle.inStock && (
                                        <span className="bundle-stock">
                                            <i className="icon-check-circle"></i>
                                            All items in stock
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bundle Benefits */}
                <div className="bundle-benefits">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="benefit-item">
                                <div className="benefit-icon">
                                    <i className="icon-percent"></i>
                                </div>
                                <h5>Save Up to 20%</h5>
                                <p>Bundled pricing saves you more than buying separately</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="benefit-item">
                                <div className="benefit-icon">
                                    <i className="icon-package"></i>
                                </div>
                                <h5>Complete Package</h5>
                                <p>Everything coordinated and ready to race immediately</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="benefit-item">
                                <div className="benefit-icon">
                                    <i className="icon-shield"></i>
                                </div>
                                <h5>Full SFI Compliance</h5>
                                <p>All items meet required SFI certification standards</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
