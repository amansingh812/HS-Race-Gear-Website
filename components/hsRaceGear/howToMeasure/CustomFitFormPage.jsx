"use client";
import React, { useState } from "react";
import Link from "next/link";
import { measurementSteps, customFitBenefits } from "@/data/measurementSteps";
import CustomFitBenefitsSection from "./CustomFitBenefitsSection";
import "@/public/css/custom-fit-form.css";

export default function CustomFitFormPage() {
    const [measurements, setMeasurements] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [additionalInfo, setAdditionalInfo] = useState({
        totalHeight: "",
        weight: "",
        name: "",
        email: "",
        phone: "",
        notes: ""
    });

    // Map measurement points to their corresponding images
    const measurementImages = {
        "A": "1. Chest - A.webp",
        "B": "2. Waist - B.webp",
        "C": "3. Hip - C.webp",
        "D": "4. Thigh - D.webp",
        "E": "5. Neck - E.webp",
        "F": "6. Shoulder - F.webp",
        "G": "7. Back - G.webp",
        "H": "8. Sleeve - H.webp",
        "I": "9. Bicep - I.webp",
        "J": "10. Forearm - J.webp",
        "K": "11. Calf - K.webp",
        "L": "12. Torso Length 1 - Neck to belly Button - L.webp",
        "M": "13. Torso Length 2 - From Belly Button to Crotch - M.webp",
        "N": "14. Inseam - From Crotch to Ankle - N.webp",
        "O": "15. Suit Height - From Shoulder to Ankle - O.webp"
    };

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

        // Submit logic would go here
        console.log("Measurements:", measurements);
        console.log("Additional Info:", additionalInfo);
        setFormSubmitted(true);
    };

    return (
        <>
            {/* Hero Section */}
            <section className="flat-spacing-9 bg_grey-7 cf-section-hero">
                <div className="container">
                    <div className="tf-grid-layout md-col-2 gap-30 align-items-center">
                        <div className="tf-content-left">
                            <div className="heading">
                                <h2 className="heading-title mb_20">
                                    What Is Custom Gear?
                                </h2>
                                <p className="text_black-2 mb_20">
                                    Custom Gear means your racing suit is designed and tailored to your <strong>exact body measurements</strong>—not based on generic size charts or standard patterns. This is critical for professional motorsports including Sprint Car, Drag Racing, Circle Track, and any discipline requiring SFI compliance.
                                </p>
                                <p className="text_black-2 mb_20">
                                    Unlike off-the-rack suits that use approximate sizes, a custom-fit suit ensures every seam, panel, and contour is positioned perfectly for your body. This eliminates bunching, gaps, and restrictions that can affect your performance and safety on the track.
                                </p>
                            </div>
                        </div>
                        <div className="tf-content-right">
                            <div className="img-custom-fit radius-10 overflow-hidden">
                                <img
                                    className="lazyload w-100 custom-fit-hero-img"
                                    data-src="/images/shop/custom-fit-hero.webp"
                                    src="/images/shop/Custom_form.png"
                                    alt="Custom Fit Racing Suit Measurement"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Warning Banner */}
            <section className="flat-spacing-9 bg_grey-7 cf-section-warning">
                <div className="container">
                    <div className="cf-warning-banner mb_50">
                        {/* Header */}
                        <div className="cf-warning-header">
                            <div className="d-flex align-items-center gap-12">
                                <div className="cf-warning-icon">⚠️</div>
                                <h5 className="cf-warning-title mb-0">
                                    Important Measurement Guidelines
                                </h5>
                            </div>
                        </div>

                        <div className="cf-warning-body">
                            <div className="tf-grid-layout md-col-2 gap-20">
                                <div className="d-flex gap-16 align-items-start">
                                    <div className="cf-guideline-icon">👥</div>
                                    <div className="cf-guideline-text">
                                        <p className="cf-guideline-title">Get Someone to Measure You</p>
                                        <p className="cf-guideline-desc">Self-measurements are often inaccurate</p>
                                    </div>
                                </div>

                                <div className="d-flex gap-16 align-items-start">
                                    <div className="cf-guideline-icon">✂️</div>
                                    <div className="cf-guideline-text">
                                        <p className="cf-guideline-title">Do NOT Add Any Allowance</p>
                                        <p className="cf-guideline-desc">Take exact measurements only</p>
                                    </div>
                                </div>
                                <div className="d-flex gap-16 align-items-start">
                                    <div className="cf-guideline-icon">📏</div>
                                    <div className="cf-guideline-text">
                                        <p className="cf-guideline-title">Use inches
                                            Only</p>
                                        <p className="cf-guideline-desc">All measurements must be in inches</p>
                                    </div>
                                </div>
                                <div className="d-flex gap-16 align-items-start">
                                    <div className="cf-guideline-icon">👕</div>
                                    <div className="cf-guideline-text">
                                        <p className="cf-guideline-title">Wear Form-Fitting Clothes</p>
                                        <p className="cf-guideline-desc">Underwear recommended while measuring</p>
                                    </div>
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <div className="cf-disclaimer mt_28">
                                <p className="cf-disclaimer-text">
                                    <strong>Note:</strong> HS Racegear will not be responsible for measurement errors. Please double-check all measurements before submitting.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Measurement Form */}
            <section id="measurement-form" className="flat-spacing-1 bg_grey-7 cf-section-form">
                <div className="container">
                    {formSubmitted ? (
                        <div className="cf-success-message text-center pt-10">
                            <span className="cf-success-icon">✅</span>
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
                                        className="cf-measurement-item mb_40"
                                    >
                                        <div className="tf-grid-layout md-col-2">
                                            {/* Left Column - Measurement Image */}
                                            <div className="cf-measurement-image">
                                                <div className="measurement-image-wrapper radius-10 overflow-hidden">
                                                    <img
                                                        className="lazyload w-100"
                                                        data-src={`/images/measurement/${measurementImages[step.id]}`}
                                                        src={`/images/measurement/${measurementImages[step.id]}`}
                                                        alt={step.imageAlt}
                                                    />
                                                </div>
                                            </div>

                                            {/* Right Column - Instructions & Input */}
                                            <div className="measurement-content p-4">
                                                <div className="cf-step-badge mb_15">
                                                    Point {step.id}
                                                </div>
                                                <h4 className="mb_15">{step.label}</h4>
                                                <p className="text_black-3 mb_20 cf-step-text">
                                                    {step.text}
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <CustomFitBenefitsSection />
                            {/* Contact Information */}
                            <div className="cf-form-card mb_40">
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
                                            className="form-control cf-form-input"
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
                                            className="form-control cf-form-input"
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
                                            className="form-control cf-form-input"
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
                                            className="form-control cf-form-textarea"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="text-center flat-spacing">
                                <button
                                    type="submit"
                                    className="tf-btn btn-fill animate-hover-btn radius-3 btn-lg"
                                >
                                    <span>Submit</span>
                                    <i className="icon icon-arrow-right" />
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </section>



            {/* Help Section */}
            {/* <section className="flat-spacing-7">
                <div className="container">
                    <div className="tf-grid-layout md-col-2 gap-30 align-items-center">
                        <div className="help-content">
                            <h3 className="mb_20">Need Help With Measurements?</h3>
                            <p className="text_black-2 mb_20">
                                Our experts are here to guide you through the measurement process. Don't hesitate to reach out if you have any questions or need assistance.
                            </p>
                            <div className="contact-options">
                                <div className="contact-item d-flex align-items-center gap-15 mb_15">
                                    <span className="cf-contact-icon">📞</span>
                                    <div>
                                        <p className="fw-6 mb-0">Call Us</p>
                                        <a href="tel:+14094040962" className="text_black-2">+1 (409) 404-0962</a>
                                    </div>
                                </div>
                                <div className="contact-item d-flex align-items-center gap-15 mb_15">
                                    <span className="cf-contact-icon">📧</span>
                                    <div>
                                        <p className="fw-6 mb-0">Email Us</p>
                                        <a href="mailto:support@hsracegear.com" className="text_black-2">support@hsracegear.com</a>
                                    </div>
                                </div>
                                <div className="contact-item d-flex align-items-center gap-15">
                                    <span className="cf-contact-icon">💬</span>
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
                            <div className="cf-video-placeholder radius-10">
                                <span className="cf-video-icon">🎥</span>
                                <h5 className="mt_20 mb_10">Measurement Video Guide</h5>
                                <p className="text_black-3 mb_20">Watch our step-by-step video tutorial</p>
                                <a href="#" className="tf-btn btn-fill radius-3">
                                    <span>▶️ Watch Video</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    );
}
