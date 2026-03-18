"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import "@/public/css/custom-karting-suit.css";

export default function CustomKartingSuitPage() {
    const features = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            ),
            title: "Full Sublimation Printing",
            description: "Unlimited color combinations, sharp graphics, and personalized designs infused directly into fabric fibers — never cracks, peels, or fades."
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
            title: "100% Custom Fit",
            description: "Tailored to your exact body measurements for a precise fit that supports full mobility in the kart and maximum comfort during long sessions."
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Lightweight & Breathable",
            description: "Engineered with breathable fabrics that regulate body temperature during intense sessions, with reinforced stitching and stretch panels."
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
            description: "Review and refine your design until it's exactly what you want.",
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
            description: "Your finished karting suit is shipped directly to your door.",
            icon: (
                <svg style={{ width: "28px", height: "28px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
            )
        }
    ];

    const suitMockups = [
        { src: "/images/karting/mockup-1.webp", alt: "Custom Karting Suit Design 1" },
        { src: "/images/karting/mockup-2.webp", alt: "Custom Karting Suit Design 2" },
        { src: "/images/karting/mockup-3.webp", alt: "Custom Karting Suit Design 3" },
        { src: "/images/karting/mockup-4.webp", alt: "Custom Karting Suit Design 4" },
        { src: "/images/karting/mockup-5.webp", alt: "Custom Karting Suit Design 5" },
        { src: "/images/karting/mockup-6.webp", alt: "Custom Karting Suit Design 6" },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="karting-hero-section">
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
                            Non SFI — Sublimated Karting Suits
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
                            Performance &<br />
                            Maximum <span style={{ color: "#dc2626" }}>Safety.</span>
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
                            Custom-made karting suits designed to deliver comfort, performance, and personal style. Full-coverage sublimation printing with unlimited colors and sharp graphics.
                        </p>

                        {/* CTA Buttons */}
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                            justifyContent: "center",
                            alignItems: "center"
                        }} className="karting-hero-cta-buttons">
                            <Link href="/custom-karting-suit/order" style={{
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
                            <Link href="/custom-measurement" className="karting-glass-panel karting-secondary-btn" style={{
                                display: "inline-block",
                                color: "#fff",
                                padding: "16px 32px",
                                borderRadius: "6px",
                                fontWeight: "700",
                                fontSize: "16px",
                                textDecoration: "none",
                                transition: "all 0.3s ease"
                            }}>
                                Custom Measurement Form
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sliding Mockups Section */}
            <section className="karting-mockup-slider">
                <div className="karting-mockup-track">
                    {/* Duplicate mockups for seamless infinite scroll */}
                    {[...suitMockups, ...suitMockups].map((mockup, index) => (
                        <div key={index} className="karting-mockup-item">
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
                    {/* Section Header */}
                    <div style={{ textAlign: "center", marginBottom: "64px" }}>
                        <h2 style={{
                            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                            fontWeight: "700",
                            color: "#fff",
                            marginBottom: "16px"
                        }}>
                            Built for Karting Performance
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
                                className="karting-glass-panel karting-feature-card"
                                style={{
                                    padding: "32px",
                                    borderRadius: "16px",
                                    transition: "all 0.3s ease"
                                }}
                            >
                                <div className="karting-feature-icon" style={{
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
                <div className="karting-red-glow" style={{
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
                                src="/images/karting/karting-detail.webp"
                                alt="Custom Karting Suit Detail"
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
                                Important
                            </div>
                            <h2 style={{
                                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                                fontWeight: "700",
                                color: "#fff",
                                marginBottom: "24px"
                            }}>
                                Non SFI Rated Sublimated Karting Suits
                            </h2>
                            <p style={{
                                color: "#9ca3af",
                                fontSize: "1.05rem",
                                marginBottom: "20px",
                                lineHeight: "1.8"
                            }}>
                                These custom-made karting suits are designed to deliver comfort, performance, and personal style for drivers who want a professional look without SFI certification requirements. Each suit is tailored to your measurements, ensuring a precise fit that supports full mobility in the kart.
                            </p>
                            <p style={{
                                color: "#9ca3af",
                                fontSize: "1.05rem",
                                marginBottom: "24px",
                                lineHeight: "1.8"
                            }}>
                                Ideal for practice, club racing, indoor karting, and promotional motorsport events where professional appearance and comfort matter most.
                            </p>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {[
                                    "Full-coverage sublimation printing",
                                    "Lightweight and breathable design",
                                    "Reinforced stitching & stretch panels",
                                    "Vibrant colors that never fade or peel"
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

            {/* Sublimation Technology Section */}
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
                                Sublimation Technology
                            </div>
                            <h2 style={{
                                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                                fontWeight: "700",
                                color: "#fff",
                                marginBottom: "24px"
                            }}>
                                Total Creative Freedom
                            </h2>
                            <p style={{
                                color: "#9ca3af",
                                fontSize: "1.05rem",
                                marginBottom: "24px",
                                lineHeight: "1.8"
                            }}>
                                All designs are created using full-coverage sublimation printing, which allows unlimited color combinations, sharp graphics, and detailed personalization. The design is infused directly into the fabric fibers, keeping the suit lightweight and flexible while maintaining vibrant color over time.
                            </p>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {[
                                    "Gradients, textures & layered graphics",
                                    "Names, numbers & sponsor-style graphics",
                                    "Full-panel artwork without added weight",
                                    "Seamless, high-end finish collar to ankle"
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
                                src="/images/karting/karting-sublimation.webp"
                                alt="Sublimation Printing on Karting Suit"
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

            {/* Process Section - Choosing Design Infographic */}
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
                            From design to delivery — your custom karting suit in four simple steps.
                        </p>
                    </div>

                    {/* Process Grid */}
                    <div className="karting-process-grid">
                        {processSteps.map((step, index) => (
                            <div key={index} className="karting-process-card">
                                <div className="karting-process-number">
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
                            Karting Suit Pricing
                        </h2>
                        <div style={{
                            height: "4px",
                            width: "80px",
                            backgroundColor: "#dc2626",
                            margin: "0 auto 24px"
                        }}></div>
                    </div>

                    {/* Pricing Cards */}
                    <div className="karting-pricing-grid">
                        {/* Standard Karting Suit */}
                        <div className="karting-pricing-card featured">
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
                                Standard Package
                            </div>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>
                                Custom Karting Suit
                            </h3>
                            <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "24px", lineHeight: "1.6" }}>
                                Full sublimation custom karting suit with your design, tailored to your measurements.
                            </p>
                            <ul style={{ listStyle: "none", padding: 0, marginBottom: "24px" }}>
                                {[
                                    "Full sublimation printing",
                                    "Custom fit to your measurements",
                                    "Breathable & lightweight fabric",
                                    "Reinforced stitching",
                                    "Unlimited color options"
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
                            <Link href="/StandardPricing" style={{
                                display: "block",
                                textAlign: "center",
                                padding: "14px 28px",
                                backgroundColor: "#dc2626",
                                borderRadius: "6px",
                                color: "#fff",
                                fontWeight: "700",
                                textDecoration: "none",
                                transition: "background-color 0.3s ease"
                            }}>
                                View Full Pricing
                            </Link>
                        </div>

                        {/* Offer 1 */}
                        <div className="karting-pricing-card">
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
                                Karting Offer 1
                            </div>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>
                                Team Package
                            </h3>
                            <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "24px", lineHeight: "1.6" }}>
                                Perfect for karting teams and academies. Bulk pricing with matching team designs.
                            </p>
                            <ul style={{ listStyle: "none", padding: 0, marginBottom: "24px" }}>
                                {[
                                    "Matching team design",
                                    "Individual driver customization",
                                    "Bulk team pricing",
                                    "Consistent branding across team"
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
                            <Link href="/RacegearDeals" style={{
                                display: "block",
                                textAlign: "center",
                                padding: "14px 28px",
                                border: "2px solid #fff",
                                borderRadius: "6px",
                                color: "#fff",
                                fontWeight: "700",
                                textDecoration: "none",
                                transition: "all 0.3s ease"
                            }}>
                                View Deals
                            </Link>
                        </div>

                        {/* Offer 2 */}
                        <div className="karting-pricing-card">
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
                                Karting Offer 2
                            </div>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>
                                Junior Karting Suit
                            </h3>
                            <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "24px", lineHeight: "1.6" }}>
                                Designed for young drivers in junior development leagues and youth karting programs.
                            </p>
                            <ul style={{ listStyle: "none", padding: 0, marginBottom: "24px" }}>
                                {[
                                    "Youth-sized custom fit",
                                    "Full sublimation design",
                                    "Lightweight & comfortable",
                                    "Growth-friendly sizing options"
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
                            <Link href="/RacegearDeals" style={{
                                display: "block",
                                textAlign: "center",
                                padding: "14px 28px",
                                border: "2px solid #fff",
                                borderRadius: "6px",
                                color: "#fff",
                                fontWeight: "700",
                                textDecoration: "none",
                                transition: "all 0.3s ease"
                            }}>
                                View Deals
                            </Link>
                        </div>
                    </div>
                </div>
            </section>


            <section style={{ padding: "96px 0", backgroundColor: "#0a0a0a", position: "relative", overflow: "hidden" }}>
                <div className="karting-red-glow" style={{
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
                                Where Our Suits Compete
                            </h2>
                            <p style={{
                                color: "#9ca3af",
                                fontSize: "1.05rem",
                                marginBottom: "24px",
                                lineHeight: "1.8"
                            }}>
                                These custom non-SFI karting suits are worn across a wide range of competitive and recreational karting environments worldwide.
                            </p>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {[
                                    "Rotax Max Challenge",
                                    "IAME X30 Series",
                                    "WSK Super Master Series",
                                    "Club championships & practice sessions",
                                    "Junior development leagues",
                                    "Indoor kart racing centers",
                                    "Arrive-and-drive competitions"
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
                                src="/images/karting/karting-action.webp"
                                alt="Karting suit in action on track"
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


        </>
    );
}
