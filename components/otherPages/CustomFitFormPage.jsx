"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { measurementSteps, customFitBenefits } from "@/data/measurementSteps";
import CustomFitBenefitsSection from "./CustomFitBenefitsSection";

export default function CustomFitFormPage() {
    const [measurements, setMeasurements] = useState({});
    const [torsoError, setTorsoError] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [additionalInfo, setAdditionalInfo] = useState({
        totalHeight: "",
        weight: "",
        name: "",
        email: "",
        phone: "",
        notes: ""
    });

    // Validate torso length: L + M + N must equal O
    useEffect(() => {
        const L = parseFloat(measurements.L) || 0;
        const M = parseFloat(measurements.M) || 0;
        const N = parseFloat(measurements.N) || 0;
        const O = parseFloat(measurements.O) || 0;

        if (L > 0 && M > 0 && N > 0 && O > 0) {
            const calculatedSum = L + M + N;
            const difference = Math.abs(calculatedSum - O);

            if (difference > 2) {
                setTorsoError(`⚠️ Measurement Error: L (${L}cm) + M (${M}cm) + N (${N}cm) = ${calculatedSum}cm, but O is ${O}cm. The sum of L+M+N should equal O. Please re-check your measurements.`);
            } else {
                setTorsoError("");
            }
        } else {
            setTorsoError("");
        }
    }, [measurements.L, measurements.M, measurements.N, measurements.O]);

    const handleMeasurementChange = (id, value) => {
        setMeasurements(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleAdditionalChange = (field, value) => {
        setAdditionalInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all measurements are filled
        const allMeasurementsFilled = measurementSteps.every(step => measurements[step.id]);
        const additionalFilled = additionalInfo.totalHeight && additionalInfo.weight && additionalInfo.name && additionalInfo.email;

        if (!allMeasurementsFilled || !additionalFilled) {
            alert("Please fill in all required measurements and contact information.");
            return;
        }

        if (torsoError) {
            alert("Please correct the torso measurement error before submitting.");
            return;
        }

        // Submit logic would go here
        console.log("Measurements:", measurements);
        console.log("Additional Info:", additionalInfo);
        setFormSubmitted(true);
    };

    return (
        <>
            {/* Hero Section */}
            <section className="flat-spacing-9 bg_grey-7">
                <div className="container">
                    <div className="tf-grid-layout md-col-2 gap-30 align-items-center">
                        <div className="tf-content-left">
                            <div className="heading">
                                <span className="tf-badge bg-dark text-white mb_15">Custom Fit Information</span>
                                <h2 className="heading-title mb_20">
                                    What Is Custom Fit?
                                </h2>
                                <p className="text_black-2 mb_20">
                                    Custom Gear means your racing suit is designed and tailored to your <strong>exact body measurements</strong>—not based on generic size charts or standard patterns. This is critical for professional motorsports including Sprint Car, Drag Racing, Circle Track, and any discipline requiring SFI compliance.
                                </p>
                                <p className="text_black-2 mb_20">
                                    Unlike off-the-rack suits that use approximate sizes, a custom-fit suit ensures every seam, panel, and contour is positioned perfectly for your body. This eliminates bunching, gaps, and restrictions that can affect your performance and safety on the track.
                                </p>
                                <div className="d-flex gap-15 flex-wrap">
                                    <Link href="/custom-measurement" className="tf-btn btn-fill animate-hover-btn radius-3 btn-xl">
                                        <span>📋 Open Measurement Form</span>
                                        <i className="icon icon-arrow-right" />
                                    </Link>
                                    <a href="#measurement-guide" className="tf-btn btn-outline-dark animate-hover-btn radius-3 btn-xl">
                                        <span>📏 View Measurement Guide</span>
                                        <i className="icon icon-arrow-down" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="tf-content-right">
                            <div className="img-custom-fit radius-10 overflow-hidden">
                                <img
                                    className="lazyload w-100"
                                    data-src="/images/shop/custom-fit-hero.jpg"
                                    src="/images/shop/custom-fit-hero.jpg"
                                    alt="Custom Fit Racing Suit Measurement"
                                    style={{ objectFit: "cover", height: "100%" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Grid - New Section */}
            <CustomFitBenefitsSection />

            {/* Warning Banner & Measurement Form */}
            <section id="measurement-form" className="flat-spacing-9 bg_grey-7">
                <div className="container">
                    <div className="flat-title">
                        <span className="title">Custom Race Suit Measurement Form</span>
                        <p className="sub-title text-center">
                            Complete all measurements accurately to ensure a perfect fit
                        </p>
                    </div>

                    {/* Important Warning Banner */}
                    <div className="warning-banner mb_40" style={{
                        background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%)",
                        color: "#fff",
                        padding: "25px 30px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 15px rgba(238, 90, 90, 0.3)"
                    }}>
                        <div className="d-flex align-items-start gap-15">
                            <span style={{ fontSize: "2rem" }}>⚠️</span>
                            <div>
                                <h5 className="mb_10" style={{ color: "#fff" }}>Important Measurement Guidelines</h5>
                                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                    <li className="mb_5">• <strong>Get someone else to measure you</strong> – Self-measurements are often inaccurate</li>
                                    <li className="mb_5">• <strong>Do NOT add any allowance</strong> – Take exact measurements only</li>
                                    <li className="mb_5">• <strong>All measurements must be in Centimeters (CM)</strong></li>
                                    <li className="mb_5">• <strong>Wear form-fitting clothes</strong> (underwear recommended) while measuring</li>
                                    <li>• <strong>HS Racegear will not be responsible for measurement errors</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {formSubmitted ? (
                        <div className="success-message text-center p-5" style={{
                            background: "#d4edda",
                            border: "1px solid #c3e6cb",
                            borderRadius: "10px"
                        }}>
                            <span style={{ fontSize: "4rem" }}>✅</span>
                            <h3 className="mt_20 mb_15">Measurements Submitted Successfully!</h3>
                            <p className="mb_20">Thank you for submitting your measurements. Our team will review them and contact you within 24 hours.</p>
                            <Link href="/shop" className="tf-btn btn-fill animate-hover-btn radius-3">
                                <span>Continue to Design Your Suit</span>
                                <i className="icon icon-arrow-right" />
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {/* Measurement Points A-O */}
                            <div className="measurement-steps">
                                {measurementSteps.map((step, index) => (
                                    <div
                                        key={step.id}
                                        className="measurement-item mb_40"
                                        style={{
                                            background: "#fff",
                                            borderRadius: "12px",
                                            overflow: "hidden",
                                            boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
                                        }}
                                    >
                                        <div className="tf-grid-layout md-col-2">
                                            {/* Left Column - Image Placeholder */}
                                            <div
                                                className="measurement-image"
                                                style={{
                                                    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    minHeight: "280px",
                                                    padding: "30px"
                                                }}
                                            >
                                                <div className="image-placeholder text-center">
                                                    <div
                                                        style={{
                                                            width: "180px",
                                                            height: "180px",
                                                            background: "#dee2e6",
                                                            borderRadius: "10px",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            margin: "0 auto 15px",
                                                            border: "2px dashed #adb5bd"
                                                        }}
                                                    >
                                                        <span style={{ fontSize: "3rem", color: "#6c757d" }}>📏</span>
                                                    </div>
                                                    <p className="text_black-3" style={{ fontSize: "14px" }}>
                                                        Image Placeholder for Point {step.id}
                                                    </p>
                                                    <small className="text-muted">{step.imageAlt}</small>
                                                </div>
                                            </div>

                                            {/* Right Column - Instructions & Input */}
                                            <div className="measurement-content p-4">
                                                <div className="step-badge mb_15" style={{
                                                    display: "inline-block",
                                                    background: "#000",
                                                    color: "#fff",
                                                    padding: "5px 15px",
                                                    borderRadius: "20px",
                                                    fontSize: "14px",
                                                    fontWeight: "600"
                                                }}>
                                                    Point {step.id}
                                                </div>
                                                <h4 className="mb_15">{step.label}</h4>
                                                <p className="text_black-3 mb_20" style={{ lineHeight: "1.7" }}>
                                                    {step.text}
                                                </p>

                                                <div className="measurement-input-group">
                                                    <label className="fw-6 mb_10 d-block">
                                                        Enter Measurement (CM) <span className="text-danger">*</span>
                                                    </label>
                                                    <div className="d-flex align-items-center gap-10">
                                                        <input
                                                            type="number"
                                                            step="0.1"
                                                            min="0"
                                                            placeholder="0.0"
                                                            value={measurements[step.id] || ""}
                                                            onChange={(e) => handleMeasurementChange(step.id, e.target.value)}
                                                            required
                                                            className="form-control"
                                                            style={{
                                                                maxWidth: "150px",
                                                                padding: "12px 15px",
                                                                fontSize: "18px",
                                                                fontWeight: "600",
                                                                border: "2px solid #dee2e6",
                                                                borderRadius: "8px"
                                                            }}
                                                        />
                                                        <span className="text_black-3 fw-6">CM</span>
                                                    </div>
                                                </div>

                                                {/* Show torso validation error after Point O */}
                                                {step.id === "O" && torsoError && (
                                                    <div className="mt_20 p-3" style={{
                                                        background: "#fff3cd",
                                                        border: "1px solid #ffc107",
                                                        borderRadius: "8px",
                                                        color: "#856404"
                                                    }}>
                                                        <strong>{torsoError}</strong>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Torso Validation Summary */}
                            {(measurements.L || measurements.M || measurements.N || measurements.O) && (
                                <div className="torso-validation mb_40 p-4" style={{
                                    background: torsoError ? "#fff3cd" : "#d4edda",
                                    border: `1px solid ${torsoError ? "#ffc107" : "#c3e6cb"}`,
                                    borderRadius: "10px"
                                }}>
                                    <h5 className="mb_15">📐 Torso Length Validation Check</h5>
                                    <div className="d-flex flex-wrap gap-20 align-items-center">
                                        <div>
                                            <span className="fw-6">L (Neck to Belly):</span> {measurements.L || "—"} cm
                                        </div>
                                        <span>+</span>
                                        <div>
                                            <span className="fw-6">M (Belly to Crotch):</span> {measurements.M || "—"} cm
                                        </div>
                                        <span>+</span>
                                        <div>
                                            <span className="fw-6">N (Inseam):</span> {measurements.N || "—"} cm
                                        </div>
                                        <span>=</span>
                                        <div>
                                            <span className="fw-6">Sum:</span> {((parseFloat(measurements.L) || 0) + (parseFloat(measurements.M) || 0) + (parseFloat(measurements.N) || 0)).toFixed(1)} cm
                                        </div>
                                        <span className="mx-2">vs</span>
                                        <div>
                                            <span className="fw-6">O (Suit Height):</span> {measurements.O || "—"} cm
                                        </div>
                                    </div>
                                    {torsoError ? (
                                        <p className="mt_15 mb-0" style={{ color: "#856404" }}>
                                            <strong>⚠️ Please verify your measurements. L + M + N should equal O.</strong>
                                        </p>
                                    ) : (measurements.L && measurements.M && measurements.N && measurements.O) && (
                                        <p className="mt_15 mb-0" style={{ color: "#155724" }}>
                                            <strong>✅ Torso measurements validated successfully!</strong>
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Additional Fields */}
                            <div className="additional-measurements mb_40" style={{
                                background: "#fff",
                                borderRadius: "12px",
                                padding: "30px",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
                            }}>
                                <h4 className="mb_20">📋 Additional Required Information</h4>

                                <div className="tf-grid-layout md-col-2 gap-30">
                                    <div className="form-group">
                                        <label className="fw-6 mb_10 d-block">
                                            Q. Total Height (Head to Ankle) <span className="text-danger">*</span>
                                        </label>
                                        <p className="text_black-3 mb_10" style={{ fontSize: "14px" }}>
                                            Stand straight against a wall and measure from the top of your head to your ankle.
                                        </p>
                                        <div className="d-flex align-items-center gap-10">
                                            <input
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                placeholder="0.0"
                                                value={additionalInfo.totalHeight}
                                                onChange={(e) => handleAdditionalChange("totalHeight", e.target.value)}
                                                required
                                                className="form-control"
                                                style={{
                                                    maxWidth: "150px",
                                                    padding: "12px 15px",
                                                    fontSize: "18px",
                                                    fontWeight: "600",
                                                    border: "2px solid #dee2e6",
                                                    borderRadius: "8px"
                                                }}
                                            />
                                            <span className="text_black-3 fw-6">CM</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="fw-6 mb_10 d-block">
                                            Weight (Current Body Weight) <span className="text-danger">*</span>
                                        </label>
                                        <p className="text_black-3 mb_10" style={{ fontSize: "14px" }}>
                                            Your current body weight helps us fine-tune the suit fit.
                                        </p>
                                        <div className="d-flex align-items-center gap-10">
                                            <input
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                placeholder="0.0"
                                                value={additionalInfo.weight}
                                                onChange={(e) => handleAdditionalChange("weight", e.target.value)}
                                                required
                                                className="form-control"
                                                style={{
                                                    maxWidth: "150px",
                                                    padding: "12px 15px",
                                                    fontSize: "18px",
                                                    fontWeight: "600",
                                                    border: "2px solid #dee2e6",
                                                    borderRadius: "8px"
                                                }}
                                            />
                                            <span className="text_black-3 fw-6">KG</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="contact-info-section mb_40" style={{
                                background: "#fff",
                                borderRadius: "12px",
                                padding: "30px",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
                            }}>
                                <h4 className="mb_20">📞 Contact Information</h4>

                                <div className="tf-grid-layout md-col-2 gap-30">
                                    <div className="form-group">
                                        <label className="fw-6 mb_10 d-block">
                                            Full Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            value={additionalInfo.name}
                                            onChange={(e) => handleAdditionalChange("name", e.target.value)}
                                            required
                                            className="form-control"
                                            style={{
                                                padding: "12px 15px",
                                                border: "2px solid #dee2e6",
                                                borderRadius: "8px"
                                            }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="fw-6 mb_10 d-block">
                                            Email Address <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={additionalInfo.email}
                                            onChange={(e) => handleAdditionalChange("email", e.target.value)}
                                            required
                                            className="form-control"
                                            style={{
                                                padding: "12px 15px",
                                                border: "2px solid #dee2e6",
                                                borderRadius: "8px"
                                            }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="fw-6 mb_10 d-block">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="Enter your phone number"
                                            value={additionalInfo.phone}
                                            onChange={(e) => handleAdditionalChange("phone", e.target.value)}
                                            className="form-control"
                                            style={{
                                                padding: "12px 15px",
                                                border: "2px solid #dee2e6",
                                                borderRadius: "8px"
                                            }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="fw-6 mb_10 d-block">
                                            Additional Notes
                                        </label>
                                        <textarea
                                            placeholder="Any special requirements or notes..."
                                            value={additionalInfo.notes}
                                            onChange={(e) => handleAdditionalChange("notes", e.target.value)}
                                            rows="3"
                                            className="form-control"
                                            style={{
                                                padding: "12px 15px",
                                                border: "2px solid #dee2e6",
                                                borderRadius: "8px",
                                                resize: "vertical"
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="tf-btn btn-fill animate-hover-btn radius-3 btn-xl"
                                    disabled={!!torsoError}
                                    style={{
                                        opacity: torsoError ? 0.6 : 1,
                                        cursor: torsoError ? "not-allowed" : "pointer"
                                    }}
                                >
                                    <span>📤 Submit Measurements</span>
                                    <i className="icon icon-arrow-right" />
                                </button>
                                <p className="mt_20 text_black-3">
                                    By submitting, you confirm that all measurements are accurate.
                                    <br />Our team will contact you within 24 hours.
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </section>

            {/* Help Section */}
            <section className="flat-spacing-7">
                <div className="container">
                    <div className="tf-grid-layout md-col-2 gap-30 align-items-center">
                        <div className="help-content">
                            <h3 className="mb_20">Need Help With Measurements?</h3>
                            <p className="text_black-2 mb_20">
                                Our experts are here to guide you through the measurement process. Don't hesitate to reach out if you have any questions or need assistance.
                            </p>
                            <div className="contact-options">
                                <div className="contact-item d-flex align-items-center gap-15 mb_15">
                                    <span style={{ fontSize: "1.5rem" }}>📞</span>
                                    <div>
                                        <p className="fw-6 mb-0">Call Us</p>
                                        <a href="tel:+14094040962" className="text_black-2">+1 (409) 404-0962</a>
                                    </div>
                                </div>
                                <div className="contact-item d-flex align-items-center gap-15 mb_15">
                                    <span style={{ fontSize: "1.5rem" }}>📧</span>
                                    <div>
                                        <p className="fw-6 mb-0">Email Us</p>
                                        <a href="mailto:support@hsracegear.com" className="text_black-2">support@hsracegear.com</a>
                                    </div>
                                </div>
                                <div className="contact-item d-flex align-items-center gap-15">
                                    <span style={{ fontSize: "1.5rem" }}>💬</span>
                                    <div>
                                        <p className="fw-6 mb-0">Live Chat</p>
                                        <span className="text_black-2">Available 9AM - 6PM EST</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt_30">
                                <Link href="/contact-us" className="tf-btn btn-outline-dark radius-3">
                                    Contact Support
                                </Link>
                            </div>
                        </div>
                        <div className="help-video">
                            <div
                                className="video-placeholder radius-10"
                                style={{
                                    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                                    padding: "60px 30px",
                                    textAlign: "center",
                                    border: "2px dashed #dee2e6"
                                }}
                            >
                                <span style={{ fontSize: "4rem" }}>🎥</span>
                                <h5 className="mt_20 mb_10">Measurement Video Guide</h5>
                                <p className="text_black-3 mb_20">Watch our step-by-step video tutorial</p>
                                <a href="#" className="tf-btn btn-fill radius-3">
                                    <span>▶️ Watch Video</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
