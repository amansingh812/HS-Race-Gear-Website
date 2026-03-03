"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import "@/public/css/custom-powerboat-suit.css";

export default function CustomPowerboatSuitPage() {
    const features = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "SFI 3.2A/1 & 3.2A/5 Certified",
            description: "Dual certification options — entry-level 3 seconds or advanced 10 seconds of direct flame protection. Choose the rating that matches your competition level."
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
            ),
            title: "Nomex® Protection",
            description: "Built with Meta Para Aramid Nomex® — the industry gold standard for fire-resistant motorsports apparel. Multi-layer construction for maximum thermal protection."
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
            title: "Ergonomic Marine Design",
            description: "Tailored anatomical fit with stretch panels at crotch, side panels, knees, elbows, and inside arms — designed for G-forces, vibration, and wave impact."
        }
    ];

    const processSteps = [
        {
            number: "1",
            title: "Order Placement",
            description: "Submit your measurements and choose your design preferences.",
            icon: (
                <svg style={{ width: "28px", height: "28px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            )
        },
        {
            number: "2",
            title: "Design Changes",
            description: "Review and refine your design with unlimited mockup revisions.",
            icon: (
                <svg style={{ width: "28px", height: "28px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            )
        },
        {
            number: "3",
            title: "Production",
            description: "Your suit goes into production with our skilled team.",
            icon: (
                <svg style={{ width: "28px", height: "28px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            )
        },
        {
            number: "4",
            title: "Shipping",
            description: "Your finished power boat racing suit is shipped to your door.",
            icon: (
                <svg style={{ width: "28px", height: "28px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
            )
        }
    ];

    const constructionFeatures = [
        {
            title: "Meta Para Aramid Nomex® Outer Shell",
            description: "Superior flame resistance and abrasion protection against cockpit surfaces and harness friction.",
            icon: (
                <svg style={{ width: "32px", height: "32px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            )
        },
        {
            title: "Premium Nomex® Inner Lining",
            description: "Enhances thermal insulation and prevents heat transfer during fire exposure for maximum driver safety.",
            icon: (
                <svg style={{ width: "32px", height: "32px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
            )
        },
        {
            title: "Multi-Layer Construction (3.2A/5)",
            description: "Additional Nomex® layers increase Thermal Protective Performance (TPP) without restricting movement.",
            icon: (
                <svg style={{ width: "32px", height: "32px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
            )
        }
    ];

    const suitMockups = [
        { src: "/images/powerboat/mockup-1.webp", alt: "Custom Power Boat Suit Design 1" },
        { src: "/images/powerboat/mockup-2.webp", alt: "Custom Power Boat Suit Design 2" },
        { src: "/images/powerboat/mockup-3.webp", alt: "Custom Power Boat Suit Design 3" },
        { src: "/images/powerboat/mockup-4.webp", alt: "Custom Power Boat Suit Design 4" },
        { src: "/images/powerboat/mockup-5.webp", alt: "Custom Power Boat Suit Design 5" },
        { src: "/images/powerboat/mockup-6.webp", alt: "Custom Power Boat Suit Design 6" },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="powerboat-hero-section">
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
                            SFI 3.2A/1 & SFI 3.2A/5 Certified
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
                            Custom Power Boat<br />
                            Racing <span className="powerboat-gradient-text">Suits.</span>
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
                            Custom Nomex® suits engineered specifically for power boat racing. Elite-level thermal protection and performance ergonomics trusted by professional teams worldwide.
                        </p>

                        {/* CTA Buttons */}
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                            justifyContent: "center",
                            alignItems: "center"
                        }} className="powerboat-hero-cta-buttons">
                            <Link href="/custom-powerboat-suit/order" style={{
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
                            <Link href="/custom-measurement" className="glass-panel" style={{
                                display: "inline-block",
                                color: "#fff",
                                padding: "16px 32px",
                                borderRadius: "6px",
                                fontWeight: "700",
                                fontSize: "16px",
                                textDecoration: "none",
                                transition: "background-color 0.3s ease"
                            }}>
                                Custom Measurement
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sliding Mockups Section */}
            <section className="powerboat-mockup-slider">
                <div className="powerboat-mockup-track">
                    {[...suitMockups, ...suitMockups].map((mockup, index) => (
                        <div key={index} className="powerboat-mockup-item">
                            <Image
                                src={mockup.src}
                                alt={mockup.alt}
                                width={220}
                                height={300}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section style={{ padding: "96px 0", backgroundColor: "#171717" }}>
                <div className="container" style={{ maxWidth: "1200px", padding: "0 24px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "64px" }}>
                        <h2 style={{
                            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                            fontWeight: "700",
                            color: "#fff",
                            marginBottom: "16px"
                        }}>
                            Engineered for Open Water
                        </h2>
                        <div style={{
                            height: "4px",
                            width: "80px",
                            backgroundColor: "#dc2626",
                            margin: "0 auto"
                        }}></div>
                    </div>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "32px"
                    }}>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="powerboat-glass-panel powerboat-feature-card"
                                style={{
                                    padding: "32px",
                                    borderRadius: "16px",
                                    transition: "all 0.3s ease"
                                }}
                            >
                                <div className="powerboat-feature-icon" style={{
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

            {/* Detail Description Section */}
            <section style={{ padding: "96px 0", backgroundColor: "#0a0a0a", position: "relative", overflow: "hidden" }}>
                <div className="powerboat-red-glow" style={{
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
                        {/* Image */}
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
                                src="/images/powerboat/powerboat-detail.webp"
                                alt="Custom Power Boat Racing Suit Detail"
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
                                Built for the Water
                            </div>
                            <h2 style={{
                                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                                fontWeight: "700",
                                color: "#fff",
                                marginBottom: "24px"
                            }}>
                                Custom Nomex® Power Boat Racing Suits
                            </h2>
                            <p style={{
                                color: "#9ca3af",
                                fontSize: "1.05rem",
                                marginBottom: "20px",
                                lineHeight: "1.8"
                            }}>
                                When racing at extreme speeds across open water, fire protection, mobility, and comfort are non-negotiable. Our SFI certified custom Nomex® suits are engineered specifically for power boat racing, delivering elite-level thermal protection and performance ergonomics.
                            </p>
                            <p style={{
                                color: "#9ca3af",
                                fontSize: "1.05rem",
                                marginBottom: "24px",
                                lineHeight: "1.8"
                            }}>
                                Power boat cockpits demand constant bracing against G-forces, vibration, and impact from waves. Our suits integrate ergonomic enhancements for endurance and control.
                            </p>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {[
                                    "Tailored anatomical fit under life jackets & harnesses",
                                    "Enhanced lower back stretch panel for long runs",
                                    "Stretch zones at crotch, side panels, knees & elbows",
                                    "Inside arm panels for steering precision"
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
                    </div>
                </div>
            </section>

            {/* SFI Rating Comparison Section */}
            <section style={{ padding: "96px 0", backgroundColor: "#171717" }}>
                <div className="container" style={{ maxWidth: "1200px", padding: "0 24px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "64px" }}>
                        <h2 style={{
                            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                            fontWeight: "700",
                            color: "#fff",
                            marginBottom: "16px"
                        }}>
                            Choose Your Protection Level
                        </h2>
                        <div style={{
                            height: "4px",
                            width: "80px",
                            backgroundColor: "#dc2626",
                            margin: "0 auto 24px"
                        }}></div>
                        <p style={{
                            color: "#9ca3af",
                            fontSize: "1.1rem",
                            maxWidth: "600px",
                            margin: "0 auto"
                        }}>
                            Two SFI certification levels to match your competition requirements.
                        </p>
                    </div>

                    <div className="powerboat-rating-grid">
                        {/* SFI 3.2A/1 */}
                        <div className="powerboat-rating-card">
                            <div style={{
                                display: "inline-block",
                                padding: "4px 12px",
                                marginBottom: "16px",
                                backgroundColor: "rgba(239, 68, 68, 0.1)",
                                borderRadius: "6px",
                                color: "#f87171",
                                fontSize: "11px",
                                fontWeight: "700",
                                letterSpacing: "1px",
                                textTransform: "uppercase"
                            }}>
                                Entry Level
                            </div>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>
                                SFI 3.2A/1
                            </h3>
                            <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "24px", lineHeight: "1.6" }}>
                                Minimum 3 seconds of direct flame protection. Entry-level fire protection for motorsports.
                            </p>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {[
                                    "Local & club-level offshore racing",
                                    "River racing events",
                                    "Jet sprint competitions",
                                    "Training sessions & test runs"
                                ].map((item, index) => (
                                    <li key={index} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        marginBottom: "10px",
                                        color: "#d1d5db",
                                        fontSize: "14px"
                                    }}>
                                        <svg style={{ width: "16px", height: "16px", color: "#22c55e", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* SFI 3.2A/5 */}
                        <div className="powerboat-rating-card advanced">
                            <div style={{
                                display: "inline-block",
                                padding: "4px 12px",
                                marginBottom: "16px",
                                backgroundColor: "rgba(220, 38, 38, 0.2)",
                                borderRadius: "6px",
                                color: "#f87171",
                                fontSize: "11px",
                                fontWeight: "700",
                                letterSpacing: "1px",
                                textTransform: "uppercase"
                            }}>
                                Advanced — Recommended
                            </div>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>
                                SFI 3.2A/5
                            </h3>
                            <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "24px", lineHeight: "1.6" }}>
                                Minimum 10 seconds of flame protection. Advanced multi-layer Nomex® construction.
                            </p>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {[
                                    "Professional offshore endurance races",
                                    "High-horsepower turbine boat classes",
                                    "International competitions",
                                    "Extreme performance categories"
                                ].map((item, index) => (
                                    <li key={index} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        marginBottom: "10px",
                                        color: "#d1d5db",
                                        fontSize: "14px"
                                    }}>
                                        <svg style={{ width: "16px", height: "16px", color: "#22c55e", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Construction & Materials Section */}
            <section style={{ padding: "96px 0", backgroundColor: "#0a0a0a" }}>
                <div className="container" style={{ maxWidth: "1200px", padding: "0 24px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "64px" }}>
                        <h2 style={{
                            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                            fontWeight: "700",
                            color: "#fff",
                            marginBottom: "16px"
                        }}>
                            Construction & Materials
                        </h2>
                        <div style={{
                            height: "4px",
                            width: "80px",
                            backgroundColor: "#dc2626",
                            margin: "0 auto 24px"
                        }}></div>
                        <p style={{
                            color: "#9ca3af",
                            fontSize: "1.1rem",
                            maxWidth: "600px",
                            margin: "0 auto"
                        }}>
                            Built using Meta Para Aramid Nomex® — the industry gold standard for fire-resistant motorsports apparel.
                        </p>
                    </div>

                    <div className="powerboat-material-grid">
                        {constructionFeatures.map((material, index) => (
                            <div key={index} className="powerboat-material-card">
                                <div style={{ color: "#ef4444", marginBottom: "16px" }}>
                                    {material.icon}
                                </div>
                                <h3 style={{
                                    fontSize: "1.15rem",
                                    fontWeight: "700",
                                    color: "#fff",
                                    marginBottom: "10px"
                                }}>
                                    {material.title}
                                </h3>
                                <p style={{
                                    color: "#9ca3af",
                                    fontSize: "14px",
                                    lineHeight: "1.7"
                                }}>
                                    {material.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Customization Section */}
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
                                Team Branding
                            </div>
                            <h2 style={{
                                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                                fontWeight: "700",
                                color: "#fff",
                                marginBottom: "24px"
                            }}>
                                Fully Customizable for Teams & Sponsors
                            </h2>
                            <p style={{
                                color: "#9ca3af",
                                fontSize: "1.05rem",
                                marginBottom: "24px",
                                lineHeight: "1.8"
                            }}>
                                Stand out on the water with unlimited customization options designed for professional branding and team identity.
                            </p>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {[
                                    "Unlimited color combinations",
                                    "Sponsor logos & embroidery",
                                    "Team names & national flags",
                                    "Driver name personalization",
                                    "Unlimited mockup revisions for perfect design"
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

                        {/* Image */}
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
                                src="/images/powerboat/powerboat-custom.webp"
                                alt="Custom power boat suit branding options"
                                width={400}
                                height={400}
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

            {/* Why Fire-Resistant Suits Matter Section */}
            <section style={{ padding: "96px 0", backgroundColor: "#0a0a0a", position: "relative", overflow: "hidden" }}>
                <div className="powerboat-red-glow" style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "50%",
                    height: "100%",
                    transform: "scaleX(-1)"
                }}></div>

                <div className="container" style={{ maxWidth: "1200px", padding: "0 24px", margin: "0 auto", position: "relative", zIndex: 10 }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "64px",
                        alignItems: "center"
                    }}>
                        <div>
                            <h2 style={{
                                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                                fontWeight: "700",
                                color: "#fff",
                                marginBottom: "24px"
                            }}>
                                Why Fire-Resistant Suits Matter
                            </h2>
                            <p style={{
                                color: "#9ca3af",
                                fontSize: "1.05rem",
                                marginBottom: "24px",
                                lineHeight: "1.8"
                            }}>
                                Unlike land motorsports, power boat racing combines fuel volatility, confined cockpits, and high-speed impacts. Fire-resistant suits are critical because they:
                            </p>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {[
                                    "Protect against flash fires during fuel system failures",
                                    "Provide thermal shielding in engine compartment breaches",
                                    "Reduce burn severity during post-crash ignition",
                                    "Buy crucial escape time in submerged or overturned vessels"
                                ].map((item, index) => (
                                    <li key={index} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        marginBottom: "14px",
                                        color: "#d1d5db"
                                    }}>
                                        <svg style={{ width: "20px", height: "20px", color: "#ef4444", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Image */}
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
                                src="/images/powerboat/powerboat-safety.webp"
                                alt="Power boat racing fire safety"
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

            {/* Where These Suits Are Used */}
            <section style={{ padding: "96px 0", backgroundColor: "#171717" }}>
                <div className="container" style={{ maxWidth: "1200px", padding: "0 24px", margin: "0 auto" }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "64px",
                        alignItems: "center"
                    }}>
                        {/* Image */}
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
                                src="/images/powerboat/powerboat-events.webp"
                                alt="Power boat racing events worldwide"
                                width={400}
                                height={400}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                }}
                            />
                        </div>

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
                                Events & Circuits
                            </div>
                            <h2 style={{
                                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                                fontWeight: "700",
                                color: "#fff",
                                marginBottom: "24px"
                            }}>
                                Where Our Suits Compete
                            </h2>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {[
                                    "UIM Offshore World Championship",
                                    "Class 1 World Powerboat Championship",
                                    "Super Boat International (SBI) Series",
                                    "P1 Offshore Championship",
                                    "Cowes–Torquay–Cowes Offshore Race",
                                    "Key West World Championship",
                                    "Dubai International Marine Club Offshore Races",
                                    "Endurance offshore & tunnel hull racing",
                                    "Jet sprint & drag boat racing",
                                    "Circuit powerboat racing"
                                ].map((item, index) => (
                                    <li key={index} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        marginBottom: "12px",
                                        color: "#d1d5db"
                                    }}>
                                        <svg style={{ width: "20px", height: "20px", color: "#ef4444", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section - How It Works */}
            <section style={{ padding: "96px 0", backgroundColor: "#0a0a0a" }}>
                <div className="container" style={{ maxWidth: "1200px", padding: "0 24px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "64px" }}>
                        <h2 style={{
                            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                            fontWeight: "700",
                            color: "#fff",
                            marginBottom: "16px"
                        }}>
                            How It Works
                        </h2>
                        <div style={{
                            height: "4px",
                            width: "80px",
                            backgroundColor: "#dc2626",
                            margin: "0 auto 24px"
                        }}></div>
                        <p style={{
                            color: "#9ca3af",
                            fontSize: "1.1rem",
                            maxWidth: "600px",
                            margin: "0 auto"
                        }}>
                            From design to delivery — your custom power boat racing suit in four simple steps.
                        </p>
                    </div>

                    <div className="powerboat-process-grid">
                        {processSteps.map((step, index) => (
                            <div key={index} className="powerboat-process-card">
                                <div className="powerboat-process-number">
                                    {step.number}
                                </div>
                                <div style={{ marginBottom: "12px", color: "#ef4444" }}>
                                    {step.icon}
                                </div>
                                <h3 style={{
                                    fontSize: "1.1rem",
                                    fontWeight: "700",
                                    color: "#fff",
                                    marginBottom: "8px"
                                }}>
                                    {step.title}
                                </h3>
                                <p style={{
                                    color: "#9ca3af",
                                    fontSize: "14px",
                                    lineHeight: "1.6"
                                }}>
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How To Measure CTA Section */}
            <section style={{ padding: "96px 0", backgroundColor: "#171717" }}>
                <div className="container" style={{ maxWidth: "900px", padding: "0 24px", margin: "0 auto" }}>
                    <div className="powerboat-measure-cta">
                        <svg style={{ width: "48px", height: "48px", color: "#dc2626", marginBottom: "24px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <h2 style={{
                            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                            fontWeight: "700",
                            color: "#fff",
                            marginBottom: "16px"
                        }}>
                            Need Help With Measurements?
                        </h2>
                        <p style={{
                            color: "#9ca3af",
                            fontSize: "1.1rem",
                            marginBottom: "32px",
                            maxWidth: "600px",
                            margin: "0 auto 32px",
                            lineHeight: "1.7"
                        }}>
                            Getting the right measurements is key to a perfect fit. Follow our step-by-step measurement guide to ensure your power boat racing suit fits perfectly under life jackets and harnesses.
                        </p>
                        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link href="/custom-fit" style={{
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
                                How To Measure
                                <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                            <Link href="/custom-powerboat-suit/order" style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "16px 32px",
                                border: "2px solid #fff",
                                borderRadius: "6px",
                                color: "#fff",
                                fontWeight: "700",
                                fontSize: "16px",
                                textDecoration: "none",
                                transition: "all 0.3s ease"
                            }}>
                                Submit Measurements
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section style={{
                padding: "96px 0",
                backgroundColor: "#0a0a0a",
                backgroundImage: "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url('/images/shop/action-racing.webp')",
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
                        Ready to Get Your Custom Power Boat Suit?
                    </h2>
                    <p style={{
                        color: "#9ca3af",
                        fontSize: "1.125rem",
                        marginBottom: "40px",
                        lineHeight: "1.7"
                    }}>
                        Join professional power boat racers worldwide who trust HS Race Gear for their custom racing suits. Start your order today.
                    </p>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link href="/custom-powerboat-suit/order" style={{
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
        </>
    );
}
