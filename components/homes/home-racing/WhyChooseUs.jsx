"use client";
import React from "react";

const features = [
    {
        id: 1,
        title: "SFI Certified",
        description: "All our racing gear meets rigorous SFI safety standards",
        icon: "icon-return",
        bgColor: "#e8f5e9",
        iconColor: "#2e7d32",
    },
    {
        id: 2,
        title: "Fastest Delivery",
        description: "Quick turnaround times without compromising quality",
        icon: "icon-shipping",
        bgColor: "#fff3e0",
        iconColor: "#e65100",
    },
    {
        id: 3,
        title: "24/7 Support",
        description: "Our racing experts are always available to assist you",
        icon: "icon-support",
        bgColor: "#e3f2fd",
        iconColor: "#1565c0",
    },
    {
        id: 4,
        title: "Confirm Before You Pay",
        description: "No card details online — we confirm your order first, then arrange payment",
        icon: "icon-gift",
        bgColor: "#f3e5f5",
        iconColor: "#7b1fa2",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="flat-spacing-3">
            <div className="container">
                {/* Section Title */}
                <div className="flat-title text-center wow fadeInUp mb-5">
                    <h3 className="title font-7 fw-bold">Why Choose Us</h3>
                    <p className="text-main text-md">
                        Trusted by racers worldwide for quality, safety, and reliability
                    </p>
                </div>

                {/* Features Grid */}
                <div className="row g-4">
                    {features.map((feature) => (
                        <div key={feature.id} className="col-6 col-lg-3">
                            <div className="tf-icon-box style-3 text-center h-100 p-4 bg-light rounded-3 hover-shadow transition-all position-relative overflow-hidden">
                                {/* Icon */}
                                <div
                                    className="box-icon mx-auto mb-4 d-flex align-items-center justify-content-center rounded-3"
                                    style={{
                                        width: "64px",
                                        height: "64px",
                                        backgroundColor: feature.bgColor,
                                        transition: "transform 0.3s ease"
                                    }}
                                >
                                    <i
                                        className={`icon ${feature.icon} fs-3`}
                                        style={{ color: feature.iconColor }}
                                    />
                                </div>

                                {/* Title */}
                                <div className="content">
                                    <h5 className="fw-bold mb-2">{feature.title}</h5>
                                    <p className="text-main small mb-0">{feature.description}</p>
                                </div>

                                {/* Decorative Element */}
                                <div
                                    className="position-absolute bottom-0 start-50 translate-middle-x rounded-pill"
                                    style={{
                                        width: "48px",
                                        height: "4px",
                                        backgroundColor: "#ff6f00",
                                        opacity: 0,
                                        transform: "translateY(8px)",
                                        transition: "all 0.3s ease"
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .hover-shadow {
          transition: all 0.3s ease;
        }
        .hover-shadow:hover {
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          background-color: #fff !important;
        }
        .hover-shadow:hover .box-icon {
          transform: scale(1.1);
        }
        .hover-shadow:hover > div:last-child {
          opacity: 1 !important;
          transform: translateX(-50%) translateY(0) !important;
        }
      `}</style>
        </section>
    );
}
