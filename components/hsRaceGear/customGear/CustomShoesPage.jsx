"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import "@/public/css/custom-shoes.css";

export default function CustomShoesPage() {
    const features = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "SFI 3.3A/5 Certified",
            description: "Approximately 10 seconds of direct flame protection before second-degree burn risk. Required for sanctioned motorsport events."
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Precision Pedal Control",
            description: "Thin-profile high-grip outsole engineered for precise throttle and brake modulation, heel-toe downshifting, and clutch control."
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            ),
            title: "Custom Colors & Logos",
            description: "Available in multiple colors to match racing suits or team liveries, with unlimited logo options for sponsors and personal branding."
        }
    ];

    const processSteps = [
        {
            number: "1",
            title: "Order Placement",
            description: "Select your size, color, and customization preferences.",
            icon: (
                <svg style={{ width: "28px", height: "28px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            )
        },
        {
            number: "2",
            title: "Design Changes",
            description: "Review and approve your custom design with color and logo placement.",
            icon: (
                <svg style={{ width: "28px", height: "28px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            )
        },
        {
            number: "3",
            title: "Production",
            description: "Your shoes are handcrafted by our skilled team using premium materials.",
            icon: (
                <svg style={{ width: "28px", height: "28px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            )
        },
        {
            number: "4",
            title: "Shipping",
            description: "Your finished racing shoes are shipped directly to your door.",
            icon: (
                <svg style={{ width: "28px", height: "28px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
            )
        }
    ];

    const materials = [
        {
            title: "Cowhide Leather Outer",
            description: "Premium cowhide leather provides abrasion resistance, structural strength, and a classic racing aesthetic suitable for professional paddocks.",
            icon: (
                <svg style={{ width: "32px", height: "32px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            )
        },
        {
            title: "Nomex® Inner Lining",
            description: "Meta-aramid Nomex® fibers provide fire resistance without melting or dripping. Provides thermal insulation against cockpit heat.",
            icon: (
                <svg style={{ width: "32px", height: "32px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
            )
        },
        {
            title: "Rubber Midsole & Support",
            description: "Designed for long-duration wear in endurance races. Absorbs vibration from pedals and chassis, reducing foot fatigue during extended stints.",
            icon: (
                <svg style={{ width: "32px", height: "32px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
            )
        },
        {
            title: "High-Grip Outsole",
            description: "Anti-slip compound ensures traction on metal or carbon-fiber pedal surfaces. Thin-profile design improves throttle and brake modulation.",
            icon: (
                <svg style={{ width: "32px", height: "32px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        }
    ];

    const shoeMockups = [
        { src: "/images/shoes/mockup-1.webp", alt: "Custom Racing Shoe Design 1" },
        { src: "/images/shoes/mockup-2.webp", alt: "Custom Racing Shoe Design 2" },
        { src: "/images/shoes/mockup-3.webp", alt: "Custom Racing Shoe Design 3" },
        { src: "/images/shoes/mockup-4.webp", alt: "Custom Racing Shoe Design 4" },
        { src: "/images/shoes/mockup-5.webp", alt: "Custom Racing Shoe Design 5" },
        { src: "/images/shoes/mockup-6.webp", alt: "Custom Racing Shoe Design 6" },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="shoes-hero-section" style={{
                backgroundImage: "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('/images/shoes/hero_shoes.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed"
            }}>
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
                            SFI 3.3A/5 Certified
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
                            Custom Racing<br />
                            <span className="shoes-gradient-text">Shoes.</span>
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
                            Professional fire-resistant Nomex® racing shoes engineered for pedal precision, endurance comfort, and heat protection. Custom colors and logos available.
                        </p>

                        {/* CTA Buttons */}
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                            justifyContent: "center",
                            alignItems: "center"
                        }} className="shoes-hero-cta-buttons">
                            <Link href="/custom-shoes/order" style={{
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
                            <Link href="/custom-fit" className="shoes-glass-panel" style={{
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

            {/* Sliding Mockups Section */}
            <section className="shoes-mockup-slider">
                <div className="shoes-mockup-track">
                    {[...shoeMockups, ...shoeMockups].map((mockup, index) => (
                        <div key={index} className="shoes-mockup-item">
                            <Image
                                src={mockup.src}
                                alt={mockup.alt}
                                width={260}
                                height={220}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </div>
                    ))}
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
                            Engineered for the Cockpit
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
                                className="shoes-glass-panel shoes-feature-card"
                                style={{
                                    padding: "32px",
                                    borderRadius: "16px",
                                    transition: "all 0.3s ease"
                                }}
                            >
                                <div className="shoes-feature-icon" style={{
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

            {/* Detail Description Section - SFI Rating */}
            <section style={{ padding: "96px 0", backgroundColor: "#0a0a0a", position: "relative", overflow: "hidden" }}>
                <div className="shoes-red-glow" style={{
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
                                src="/images/shoes/shoes-detail.webp"
                                alt="SFI Certified Racing Shoes Detail"
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
                                Fire Protection
                            </div>
                            <h2 style={{
                                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                                fontWeight: "700",
                                color: "#fff",
                                marginBottom: "24px"
                            }}>
                                SFI 3.3A/5 Nomex® Racing Shoes
                            </h2>
                            <p style={{
                                color: "#9ca3af",
                                fontSize: "1.05rem",
                                marginBottom: "20px",
                                lineHeight: "1.8"
                            }}>
                                Professional fire-resistant footwear engineered for motorsports where heat exposure, pedal precision, and endurance comfort are critical. The SFI 3.3A/5 rating certifies approximately 10 seconds of direct flame protection.
                            </p>
                            <p style={{
                                color: "#9ca3af",
                                fontSize: "1.05rem",
                                marginBottom: "24px",
                                lineHeight: "1.8"
                            }}>
                                Required or recommended across NHRA drag racing, stock car & oval racing, time attack events, endurance and GT racing, and drift competitions.
                            </p>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {[
                                    "SFI 3.3A/5 fire protection rating",
                                    "Durable cowhide leather outer shell",
                                    "Nomex® fire-resistant inner lining",
                                    "High-grip outsole for pedal precision",
                                    "Comfort for endurance racing"
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

            {/* Materials & Construction Section */}
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
                            Materials & Construction
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
                            Every component is engineered for safety, comfort, and performance in the cockpit.
                        </p>
                    </div>

                    {/* Materials Grid */}
                    <div className="shoes-material-grid">
                        {materials.map((material, index) => (
                            <div key={index} className="shoes-material-card">
                                <div style={{
                                    color: "#ef4444",
                                    marginBottom: "16px"
                                }}>
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

            {/* Why These Shoes Are Needed Section */}
            <section style={{ padding: "96px 0", backgroundColor: "#0a0a0a", position: "relative", overflow: "hidden" }}>
                <div className="shoes-red-glow" style={{
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
                        {/* Content */}
                        <div>
                            <h2 style={{
                                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                                fontWeight: "700",
                                color: "#fff",
                                marginBottom: "24px"
                            }}>
                                Why You Need Racing Shoes
                            </h2>
                            <div style={{ marginBottom: "32px" }}>
                                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f87171", marginBottom: "12px" }}>
                                    Fire & Heat Protection
                                </h3>
                                <p style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: "1.8", marginBottom: "8px" }}>
                                    Motorsport cockpits expose drivers to fuel fires, heat from exhaust tunnels and drivetrains, and electrical fires. Nomex-lined shoes provide critical protection for safe evacuation.
                                </p>
                            </div>
                            <div style={{ marginBottom: "32px" }}>
                                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f87171", marginBottom: "12px" }}>
                                    Precision Pedal Control
                                </h3>
                                <p style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: "1.8", marginBottom: "8px" }}>
                                    Essential for Formula racing throttle modulation, rally brake/throttle transitions, drag racing launch consistency, and sustained pedal accuracy in endurance races.
                                </p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#f87171", marginBottom: "12px" }}>
                                    Regulatory Compliance
                                </h3>
                                <p style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: "1.8" }}>
                                    Many sanctioning bodies require SFI-rated footwear. Non-compliant gear can lead to disqualification, failed safety inspections, and increased injury risk.
                                </p>
                            </div>
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
                                src="/images/shoes/shoes-action.webp"
                                alt="Racing shoes in action on pedals"
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

            {/* Typical Users Section */}
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
                                src="/images/shoes/shoes-users.webp"
                                alt="Racing shoe customization options"
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
                                Who Wears Them
                            </div>
                            <h2 style={{
                                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                                fontWeight: "700",
                                color: "#fff",
                                marginBottom: "24px"
                            }}>
                                Built for Every Driver
                            </h2>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {[
                                    "Professional race car drivers",
                                    "Amateur track-day drivers",
                                    "Rally and drift competitors",
                                    "Karting graduates entering professional motorsports",
                                    "Pit crew in high-heat zones",
                                    "GT3 championship competitors",
                                    "NHRA drag racing professionals"
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
                    {/* Section Header */}
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
                            From design to delivery — your custom racing shoes in four simple steps.
                        </p>
                    </div>

                    {/* Process Grid */}
                    <div className="shoes-process-grid">
                        {processSteps.map((step, index) => (
                            <div key={index} className="shoes-process-card">
                                <div className="shoes-process-number">
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

            {/* Pricing Section */}
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
                            Custom Racing Shoes Pricing
                        </h2>
                        <div style={{
                            height: "4px",
                            width: "80px",
                            backgroundColor: "#dc2626",
                            margin: "0 auto 24px"
                        }}></div>
                    </div>

                    {/* Single Pricing Card */}
                    <div className="shoes-pricing-card featured">
                        <div style={{ textAlign: "center" }}>
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
                                SFI 3.3A/5 Certified
                            </div>
                            <h3 style={{ fontSize: "1.75rem", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>
                                Custom Racing Shoes
                            </h3>
                            <p style={{ color: "#9ca3af", fontSize: "15px", marginBottom: "32px", lineHeight: "1.6", maxWidth: "450px", margin: "0 auto 32px" }}>
                                SFI certified Nomex® racing shoes with cowhide leather outer, custom colors, and logo placement — tailored for your racing needs.
                            </p>
                        </div>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "12px",
                            marginBottom: "32px"
                        }}>
                            {[
                                "SFI 3.3A/5 fire protection",
                                "Premium cowhide leather",
                                "Nomex® inner lining",
                                "High-grip rubber outsole",
                                "Custom color options",
                                "Logo & branding placement",
                                "Ergonomic ankle support",
                                "Certification tag included"
                            ].map((item, index) => (
                                <div key={index} style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    color: "#d1d5db",
                                    fontSize: "14px"
                                }}>
                                    <svg style={{ width: "16px", height: "16px", color: "#22c55e", flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <Link href="/StandardPricing" style={{
                                display: "inline-block",
                                padding: "14px 36px",
                                backgroundColor: "#dc2626",
                                borderRadius: "6px",
                                color: "#fff",
                                fontWeight: "700",
                                fontSize: "16px",
                                textDecoration: "none",
                                transition: "background-color 0.3s ease"
                            }}>
                                View Full Pricing
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
                        Ready to Get Your Custom Racing Shoes?
                    </h2>
                    <p style={{
                        color: "#9ca3af",
                        fontSize: "1.125rem",
                        marginBottom: "40px",
                        lineHeight: "1.7"
                    }}>
                        Join professional drivers who trust HS Race Gear for their custom racing footwear. Start your order today.
                    </p>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Link href="/custom-shoes/order" style={{
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
