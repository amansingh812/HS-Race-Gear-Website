"use client";
import React, { useState } from "react";

const specsData = {
    suits: {
        title: "Suit Specifications",
        icon: "icon-user",
        specs: [
            "SFI 3.2A/5 Certified",
            "Premium Nomex® or similar fire-resistant fabric",
            "Multi-layer construction (2-layer to 5-layer options)",
            "Custom Gear tailored to your measurements",
            "Personalized embroidery & custom designs",
            "Floating arm design for enhanced mobility",
            "Pre-curved sleeves for natural driving position",
            "Anti-static properties for safety",
        ],
    },
    shoes: {
        title: "Shoes Specifications",
        icon: "icon-box",
        specs: [
            "SFI 3.3/5 Certified",
            "Lightweight construction (under 300g)",
            "Fire-resistant suede & leather upper",
            "Thin rubber sole for pedal sensitivity",
            "Reinforced heel for durability",
            "Breathable interior lining",
            "Custom color options available",
            "Sizes available from EU 36 to EU 48",
        ],
    },
    gloves: {
        title: "Gloves Specifications",
        icon: "icon-delivery",
        specs: [
            "SFI 3.3/5 Certified",
            "External seams for maximum comfort",
            "Silicone grip pattern on palm & fingers",
            "Pre-curved finger design",
            "Breathable mesh panels",
            "Elastic wrist closure for secure fit",
            "Touchscreen compatible fingertips",
            "Multiple color & design options",
        ],
    },
};

export default function DetailedSpecs() {
    const [activeTab, setActiveTab] = useState("suits");

    return (
        <section className="flat-spacing-3 bg-light">
            <div className="container">
                {/* Section Title */}
                <div className="flat-title text-center wow fadeInUp mb-5">
                    <h3 className="title font-7 fw-bold">Detailed Specifications</h3>
                    <p className="text-main text-md">
                        Every piece of gear is crafted with precision and certified for safety
                    </p>
                </div>

                {/* Desktop: 3-Column Grid */}
                <div className="row g-4 d-none d-lg-flex">
                    {Object.entries(specsData).map(([key, data]) => (
                        <div key={key} className="col-lg-4">
                            <div className="bg-white rounded-3 p-4 p-xl-5 h-100 shadow-sm hover-shadow-lg transition-all">
                                {/* Header */}
                                <div className="d-flex align-items-center gap-3 mb-4 pb-4 border-bottom">
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-3"
                                        style={{ width: "56px", height: "56px", backgroundColor: "#fff3e0" }}
                                    >
                                        <i className={`icon ${data.icon} fs-4`} style={{ color: "#ff6f00" }} />
                                    </div>
                                    <h4 className="fw-bold mb-0">{data.title}</h4>
                                </div>

                                {/* Specs List */}
                                <ul className="list-unstyled mb-0">
                                    {data.specs.map((spec, index) => (
                                        <li key={index} className="d-flex align-items-start gap-2 mb-3">
                                            <i className="icon icon-check text-warning mt-1" style={{ fontSize: "14px" }} />
                                            <span className="text-main small">{spec}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile/Tablet: Accordion */}
                <div className="d-lg-none">
                    <div className="accordion" id="specsAccordion">
                        {Object.entries(specsData).map(([key, data], idx) => (
                            <div key={key} className="accordion-item border rounded-3 mb-3 overflow-hidden">
                                <h2 className="accordion-header">
                                    <button
                                        className={`accordion-button ${activeTab !== key ? "collapsed" : ""}`}
                                        type="button"
                                        onClick={() => setActiveTab(activeTab === key ? "" : key)}
                                    >
                                        <div className="d-flex align-items-center gap-3">
                                            <div
                                                className="d-flex align-items-center justify-content-center rounded-3"
                                                style={{ width: "48px", height: "48px", backgroundColor: "#fff3e0" }}
                                            >
                                                <i className={`icon ${data.icon} fs-5`} style={{ color: "#ff6f00" }} />
                                            </div>
                                            <span className="fw-bold">{data.title}</span>
                                        </div>
                                    </button>
                                </h2>
                                <div className={`accordion-collapse collapse ${activeTab === key ? "show" : ""}`}>
                                    <div className="accordion-body">
                                        <ul className="list-unstyled mb-0">
                                            {data.specs.map((spec, index) => (
                                                <li key={index} className="d-flex align-items-start gap-2 mb-3">
                                                    <i className="icon icon-check text-warning mt-1" style={{ fontSize: "14px" }} />
                                                    <span className="text-main small">{spec}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .hover-shadow-lg {
          transition: box-shadow 0.3s ease;
        }
        .hover-shadow-lg:hover {
          box-shadow: 0 10px 40px rgba(0,0,0,0.1) !important;
        }
        .accordion-button:not(.collapsed) {
          background-color: #fff3e0;
          color: #ff6f00;
        }
        .accordion-button:focus {
          box-shadow: none;
          border-color: rgba(0,0,0,.125);
        }
      `}</style>
        </section>
    );
}
