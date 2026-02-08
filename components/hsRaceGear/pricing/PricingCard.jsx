"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function PricingCard({ product, variant = "default" }) {
    const {
        id,
        name,
        certification,
        badge,
        isFeatured,
        price,
        originalPrice,
        image,
        description,
        features,
        specifications,
        ctaText,
        ctaLink,
        inStock,
    } = product;

    const formatPrice = (value) => {
        return value.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    };

    const discountPercentage = originalPrice
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : null;

    return (
        <div className={`pricing-card ${isFeatured ? "featured" : ""} ${variant}`}>
            {/* Badge */}
            {badge && (
                <div className={`pricing-badge ${isFeatured ? "badge-featured" : ""}`}>
                    <span>{badge}</span>
                </div>
            )}

            {/* Card Header */}
            <div className="pricing-card-header">
                <div className="product-image-wrapper">
                    <Image
                        src={image}
                        alt={name}
                        width={300}
                        height={350}
                        className="pricing-product-img"
                    />
                    {/* Certification Tag */}
                    <div className="certification-tag">
                        <i className="icon-shield"></i>
                        <span>{certification}</span>
                    </div>
                </div>
            </div>

            {/* Card Body */}
            <div className="pricing-card-body">
                {/* Title */}
                <h3 className="pricing-card-title">{name}</h3>

                {/* Price */}
                <div className="pricing-price-wrapper">
                    <span className="pricing-price-current">{formatPrice(price)}</span>
                    {originalPrice && (
                        <>
                            <span className="pricing-price-original">
                                {formatPrice(originalPrice)}
                            </span>
                            <span className="pricing-discount-badge">
                                Save {discountPercentage}%
                            </span>
                        </>
                    )}
                </div>

                {/* Description */}
                <p className="pricing-card-description">{description}</p>

                {/* Features List */}
                <ul className="pricing-features-list">
                    {features.slice(0, 6).map((feature, index) => (
                        <li key={index}>
                            <span className="feature-check">
                                <i className="icon-check"></i>
                            </span>
                            <span className="feature-text">{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* Specifications (if variant is detailed) */}
                {variant === "detailed" && specifications && (
                    <div className="pricing-specs">
                        {Object.entries(specifications).map(([key, value]) => (
                            <div className="spec-item" key={key}>
                                <span className="spec-label">{key}:</span>
                                <span className="spec-value">{value}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Card Footer */}
            <div className="pricing-card-footer">
                <Link
                    href={ctaLink || "/custom-fit"}
                    className={`tf-btn ${isFeatured ? "btn-fill" : "btn-outline"
                        } btn-lg radius-60 w-100`}
                >
                    <span>{ctaText || "Customize Now"}</span>
                    <i className="icon-arrow-right"></i>
                </Link>
                {inStock ? (
                    <span className="stock-status in-stock">
                        <i className="icon-check-circle"></i>
                        In Stock - Ships in 2-3 Weeks
                    </span>
                ) : (
                    <span className="stock-status out-stock">
                        <i className="icon-clock"></i>
                        Made to Order - 3-4 Weeks
                    </span>
                )}
            </div>
        </div>
    );
}
