"use client";
import React from "react";
import PricingCard from "./PricingCard";

export default function PricingSection({
    id,
    title,
    subtitle,
    description,
    products,
    columns = 3,
    variant = "default",
    showCertificationInfo = false,
}) {
    const getColumnClass = () => {
        switch (columns) {
            case 2:
                return "col-lg-6";
            case 3:
                return "col-lg-4";
            case 4:
                return "col-lg-3";
            default:
                return "col-lg-4";
        }
    };

    return (
        <section className={`pricing-section ${variant}`} id={id}>
            <div className="container">
                {/* Section Header */}
                <div className="pricing-section-header">
                    {subtitle && <span className="section-subtitle">{subtitle}</span>}
                    <h2 className="section-title">{title}</h2>
                    {description && <p className="section-description">{description}</p>}
                </div>

                {/* Certification Info Banner (optional) */}
                {showCertificationInfo && (
                    <div className="certification-info-banner">
                        <div className="cert-info-icon">
                            <i className="icon-shield"></i>
                        </div>
                        <div className="cert-info-content">
                            <h5>All Products SFI Foundation Certified</h5>
                            <p>
                                Every racing suit, glove, and safety gear we sell meets strict
                                SFI safety standards. Look for the SFI certification tag on
                                each product.
                            </p>
                        </div>
                        <a href="/certifications" className="cert-info-link">
                            Learn About SFI Certification
                            <i className="icon-arrow-right"></i>
                        </a>
                    </div>
                )}

                {/* Products Grid */}
                <div className="row g-4 pricing-products-grid">
                    {products.map((product) => (
                        <div key={product.id} className={`${getColumnClass()} col-md-6`}>
                            <PricingCard product={product} variant={variant} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
