"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function CustomRaceSuitPage() {
    const features = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "SFI Certified",
            description: "Fully compliant with SFI 3.2A/1 & 5 standards. Ready for Sprint car, Drag, Modified, Late model, and Stock racing."
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
            title: "100% Custom Fit",
            description: "Precision-tailored to your exact body measurements. We ensure a professional fit that moves with you in the driver's seat."
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
            ),
            title: "Nomex Protection",
            description: "Constructed from premium meta-aramid fabrics. Delivers fire resistance without sacrificing breathability or flexibility."
        }
    ];

    const steps = [
        {
            number: "1",
            title: "Select Your Style",
            description: "1-Piece or 2-Piece configurations.",
            active: true
        },
        {
            number: "2",
            title: "Submit Measurements",
            description: "Use our video guide for accuracy.",
            active: false
        },
        {
            number: "3",
            title: "Race Ready",
            description: "Delivery to your door.",
            active: false
        }
    ];

    return (
        <>
            {/* Custom CSS */}
            <style jsx>{`
        .hero-section {
          background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url('/images/shop/cleaned-custom_gear_Hero.png');
          background-size: cover;
          background-position: center;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .glass-panel:hover {
          border-color: rgba(220, 38, 38, 0.5);
        }
        .gradient-text {
          background: linear-gradient(to right, #ef4444, #ea580c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .red-glow {
          background: linear-gradient(to left, rgba(127, 29, 29, 0.2), transparent);
        }
        .feature-icon {
          background: rgba(220, 38, 38, 0.2);
          transition: all 0.3s ease;
        }
        .feature-card:hover .feature-icon {
          background: #dc2626;
        }
        .feature-card:hover .feature-icon svg {
          color: white;
        }
        .step-circle {
          transition: all 0.3s ease;
        }
        .step-circle.active {
          background: #dc2626;
        }
        .step-circle:not(.active) {
          background: #404040;
        }
      `}</style>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="container" style={{ maxWidth: "1200px", padding: "0 24px" }}>
                    <div style={{ textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
                        {/* Badge */}
                        <div style={{
                            display: "inline-block",
                            padding: "6px 16px",
                            marginBottom: "20px",
                            border: "1px solid rgba(239, 68, 68, 0.5)",
                            borderRadius: "9999px",
                            backgroundColor: "rgba(239, 68, 68, 0.1)",
                            color: "#f87171",
                            fontSize: "12px",
                            fontWeight: "700",
                            letterSpacing: "2px",
                            textTransform: "uppercase"
                        }}>
                            SFI 3.2A/1 & 5 Certified
                        </div>

                        {/* Heading */}
                        <h1 style={{
                            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                            fontWeight: "800",
                            marginBottom: "24px",
                            lineHeight: "1.1",
                            color: "#fff",
                            textTransform: "uppercase"
                        }}>
                            Precision Tailored.<br />
                            Maximum <span className="gradient-text">Safety.</span>
                        </h1>

                        {/* Subheading */}
                        <p style={{
                            fontSize: "clamp(1rem, 2vw, 1.25rem)",
                            color: "#d1d5db",
                            marginBottom: "40px",
                            maxWidth: "700px",
                            margin: "0 auto 40px",
                            lineHeight: "1.7"
                        }}>
                            Custom auto racing suits built for drivers who demand performance. Crafted from high-quality meta-aramid fire-retardant fabric.
                        </p>

                        {/* CTA Buttons */}
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                            justifyContent: "center",
                            alignItems: "center"
                        }} className="hero-cta-buttons">
                            <Link href="/custom-measurement" style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "10px",
                                backgroundColor: "#dc2626",
                                color: "#fff",
                                padding: "16px 32px",
                                borderRadius: "6px",
                                fontWeight: "700",
                                fontSize: "16px",
                                textDecoration: "none",
                                transition: "background-color 0.3s ease"
                            }}>
                                Start Custom Order
                                <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                            <Link href="/custom-fit" className="glass-panel" style={{
                                display: "inline-block",
                                color: "#fff",
                                padding: "16px 32px",
                                borderRadius: "6px",
                                fontWeight: "700",
                                fontSize: "16px",
                                textDecoration: "none",
                                transition: "background-color 0.3s ease"
                            }}>
                                View Size Chart
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={{ padding: "96px 0", backgroundColor: "#171717" }}>
                <div className="container" style={{ maxWidth: "1200px", padding: "0 24px", margin: "0 auto" }}>
                    {/* Section Header */}
                    <div style={{ textAlign: "center", marginBottom: "64px" }}>
                        <h2 style={{
                            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                            fontWeight: "700",
                            color: "#fff",
                            marginBottom: "16px"
                        }}>
                            Engineered for the Track
                        </h2>
                        <div style={{
                            height: "4px",
                            width: "80px",
                            backgroundColor: "#dc2626",
                            margin: "0 auto"
                        }}></div>
                    </div>

                    {/* Features Grid */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "32px"
                    }}>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="glass-panel feature-card"
                                style={{
                                    padding: "32px",
                                    borderRadius: "16px",
                                    transition: "all 0.3s ease"
                                }}
                            >
                                <div className="feature-icon" style={{
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "24px",
                                    color: "#ef4444"
                                }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{
                                    fontSize: "1.25rem",
                                    fontWeight: "600",
                                    color: "#fff",
                                    marginBottom: "12px"
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{
                                    color: "#9ca3af",
                                    lineHeight: "1.7"
                                }}>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Suit Showcase Section */}
            <section style={{ padding: "96px 0", backgroundColor: "#0a0a0a", position: "relative", overflow: "hidden" }}>
                {/* Background Gradient */}
                <div className="red-glow" style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "50%",
                    height: "100%"
                }}></div>

                <div className="container" style={{ maxWidth: "1200px", padding: "0 24px", margin: "0 auto", position: "relative", zIndex: 10 }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "64px",
                        alignItems: "center"
                    }}>
                        {/* Image Placeholder */}
                        <div style={{
                            aspectRatio: "4/5",
                            backgroundColor: "#262626",
                            borderRadius: "12px",
                            border: "1px solid #404040",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden"
                        }}>
                            <Image
                                src="/images/shop/suit_tailor.png"
                                alt="Custom Race Suit Showcase"
                                width={400}
                                height={500}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                }}
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <h2 style={{
                                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                                fontWeight: "700",
                                color: "#fff",
                                marginBottom: "24px"
                            }}>
                                Designed for Your Style
                            </h2>
                            <p style={{
                                color: "#9ca3af",
                                fontSize: "1.125rem",
                                marginBottom: "32px",
                                lineHeight: "1.7"
                            }}>
                                Choose from 1-piece suits or 2-piece jacket-style designs. We offer complete customization for teams and individual drivers.
                            </p>

                            {/* Steps */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                {steps.map((step, index) => (
                                    <div key={index} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                        <div
                                            className={`step-circle ${step.active ? 'active' : ''}`}
                                            style={{
                                                width: "44px",
                                                height: "44px",
                                                borderRadius: "50%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontWeight: "700",
                                                color: "#fff",
                                                fontSize: "16px"
                                            }}
                                        >
                                            {step.number}
                                        </div>
                                        <div>
                                            <h4 style={{ fontWeight: "700", color: "#fff", marginBottom: "4px" }}>
                                                {step.title}
                                            </h4>
                                            <p style={{ fontSize: "14px", color: "#9ca3af" }}>
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div style={{ marginTop: "40px" }}>
                                <Link href="/custom-fit" style={{
                                    display: "inline-block",
                                    padding: "14px 28px",
                                    border: "2px solid #fff",
                                    borderRadius: "6px",
                                    color: "#fff",
                                    fontWeight: "700",
                                    textDecoration: "none",
                                    transition: "all 0.3s ease"
                                }}>
                                    Watch Measurement Video
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fabric Technology Section */}
            <section style={{ padding: "96px 0", backgroundColor: "#171717" }}>
                <div className="container" style={{ maxWidth: "1200px", padding: "0 24px", margin: "0 auto" }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "64px",
                        alignItems: "center"
                    }}>
                        {/* Content */}
                        <div>
                            <div style={{
                                display: "inline-block",
                                padding: "6px 16px",
                                marginBottom: "20px",
                                backgroundColor: "rgba(239, 68, 68, 0.1)",
                                borderRadius: "6px",
                                color: "#f87171",
                                fontSize: "12px",
                                fontWeight: "700",
                                letterSpacing: "2px",
                                textTransform: "uppercase"
                            }}>
                                Premium Materials
                            </div>
                            <h2 style={{
                                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                                fontWeight: "700",
                                color: "#fff",
                                marginBottom: "24px"
                            }}>
                                Nomex Fire Protection Technology
                            </h2>
                            <p style={{
                                color: "#9ca3af",
                                fontSize: "1.125rem",
                                marginBottom: "24px",
                                lineHeight: "1.7"
                            }}>
                                Our racing suits are constructed from high-quality meta-aramid fire-retardant fabric, providing superior protection without compromising comfort or mobility.
                            </p>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {[
                                    "Fire-resistant meta-aramid construction",
                                    "Lightweight and breathable design",
                                    "Superior thermal protection",
                                    "Exceptional durability and longevity"
                                ].map((item, index) => (
                                    <li key={index} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        marginBottom: "12px",
                                        color: "#d1d5db"
                                    }}>
                                        <svg style={{ width: "20px", height: "20px", color: "#22c55e", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Image Placeholder */}
                        <div style={{
                            aspectRatio: "1/1",
                            backgroundColor: "#262626",
                            borderRadius: "12px",
                            border: "1px solid #404040",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden"
                        }}>
                            <Image
                                src="/images/shop/side_hero_sfi.png"
                                alt="Custom Race Suit Showcase"
                                width={400}
                                height={500}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: "96px 0",
                backgroundColor: "#0a0a0a",
                backgroundImage: "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url('/images/shop/action-racing.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
                <div className="container" style={{ maxWidth: "800px", padding: "0 24px", margin: "0 auto", textAlign: "center" }}>
                    <h2 style={{
                        fontSize: "clamp(1.75rem, 4vw, 3rem)",
                        fontWeight: "700",
                        color: "#fff",
                        marginBottom: "24px"
                    }}>
                        Ready to Get Your Custom Suit?
                    </h2>
                    <p style={{
                        color: "#9ca3af",
                        fontSize: "1.125rem",
                        marginBottom: "40px",
                        lineHeight: "1.7"
                    }}>
                        Join thousands of professional drivers who trust HS Race Gear for their custom racing suits. Start your order today.
                    </p>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link href="/custom-measurement" style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            backgroundColor: "#dc2626",
                            color: "#fff",
                            padding: "18px 40px",
                            borderRadius: "6px",
                            fontWeight: "700",
                            fontSize: "18px",
                            textDecoration: "none",
                            transition: "background-color 0.3s ease"
                        }}>
                            Order Now
                            <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                        <Link href="/contact-us" style={{
                            color: "#9ca3af",
                            textDecoration: "none",
                            fontSize: "14px"
                        }}>
                            Have questions? Contact our team
                        </Link>
                    </div>
                </div>
            </section>

            {/* Responsive Styles */}
            <style jsx global>{`
        @media (min-width: 768px) {
          .hero-cta-buttons {
            flex-direction: row !important;
          }
        }
      `}</style>
        </>
    );
}
