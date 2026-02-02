"use client";
import React from "react";
import { customizationAddons } from "@/data/pricingData";

export default function CustomizationAddons() {
    const formatPrice = (value) => {
        if (value === 0) return "Free";
        return `+$${value}`;
    };

    return (
        <section className="customization-addons-section">
            <div className="container">
                {/* Section Header */}
                <div className="pricing-section-header">
                    <span className="section-subtitle">Personalize Your Gear</span>
                    <h2 className="section-title">Customization Options</h2>
                    <p className="section-description">
                        Make your racing gear uniquely yours with our customization options.
                        Express your style and represent your team on the track.
                    </p>
                </div>

                {/* Addons Grid */}
                <div className="row g-4">
                    {customizationAddons.map((addon) => (
                        <div key={addon.id} className="col-lg-4 col-md-6">
                            <div className={`addon-card ${addon.isFree ? "addon-free" : ""}`}>
                                <div className="addon-header">
                                    <h4 className="addon-name">{addon.name}</h4>
                                    <span
                                        className={`addon-price ${addon.isFree ? "price-free" : ""
                                            }`}
                                    >
                                        {formatPrice(addon.price)}
                                    </span>
                                </div>
                                <p className="addon-description">{addon.description}</p>
                                {addon.isFree && (
                                    <div className="addon-badge">
                                        <i className="icon-gift"></i>
                                        <span>Included with every order</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Custom Design CTA */}
                <div className="custom-design-cta">
                    <div className="custom-design-content">
                        <h4>Need a Completely Custom Design?</h4>
                        <p>
                            Our design team can create a fully custom racing suit with your
                            team colors, sponsors, and unique graphics. Contact us for a
                            custom quote.
                        </p>
                    </div>
                    <a href="/contact-us" className="tf-btn btn-outline btn-lg radius-60">
                        <span>Request Custom Quote</span>
                        <i className="icon-arrow-right"></i>
                    </a>
                </div>
            </div>
        </section>
    );
}
