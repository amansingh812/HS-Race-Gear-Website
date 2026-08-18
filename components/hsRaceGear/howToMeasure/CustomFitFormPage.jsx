"use client";
import React, { useState } from "react";
import Link from "next/link";
import { measurementSteps, customFitBenefits } from "@/data/measurementSteps";
import CustomFitBenefitsSection from "./CustomFitBenefitsSection";
import "@/public/css/custom-fit-form.css";

/**
 * How to Measure form (/custom-fit).
 *
 * REBUILT 2026-08-11 — the form was impossible to submit.
 *
 * What was wrong:
 *   1. There were NO measurement inputs. Each of the 15 steps rendered an
 *      image, a label and instruction text, then stopped. `handleMeasurementChange`
 *      was defined on line 39 and never called from anywhere.
 *   2. There were no inputs for total height or weight either, though both
 *      were in state and in the validation check.
 *   3. Validation required all 15 measurements + height + weight + name +
 *      email. Since 17 of those 19 fields had no input, the condition could
 *      never be satisfied — every submit hit the generic alert. That is
 *      exactly the bug the client reported.
 *   4. Even had it passed, handleSubmit only console.logged the data and
 *      showed a success screen. There was no API call. Nothing was ever
 *      emailed to anyone.
 *
 * Now: real inputs for every field, per-field error highlighting instead of
 * one generic alert, and a POST to /api/measurement-form which emails
 * info@hsracegear.com (and confirms to the customer).
 */
export default function CustomFitFormPage() {
    const [measurements, setMeasurements] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
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
        // Clear this field's error as soon as the user types into it.
        setErrors(prev => (prev[id] ? { ...prev, [id]: false } : prev));
    };

    const handleAdditionalChange = (field, value) => {
        setAdditionalInfo(prev => ({
            ...prev,
            [field]: value
        }));
        setErrors(prev => (prev[field] ? { ...prev, [field]: false } : prev));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");

        // Build a per-field error map rather than a single generic alert, so
        // the customer can see exactly which measurement they missed.
        const nextErrors = {};
        if (!additionalInfo.name.trim()) nextErrors.name = true;
        if (!additionalInfo.email.trim()) nextErrors.email = true;
        if (!String(additionalInfo.totalHeight).trim()) nextErrors.totalHeight = true;
        if (!String(additionalInfo.weight).trim()) nextErrors.weight = true;
        measurementSteps.forEach(step => {
            if (!String(measurements[step.id] ?? "").trim()) nextErrors[step.id] = true;
        });

        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            const count = Object.keys(nextErrors).length;
            setSubmitError(
                `${count} field${count === 1 ? " still needs" : "s still need"} filling in — they're highlighted in red above.`
            );
            // Jump to the first thing that's missing.
            const firstId = Object.keys(nextErrors)[0];
            const el = document.getElementById(`cf-field-${firstId}`);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
                el.focus({ preventScroll: true });
            }
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch("/api/measurement-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    measurements,
                    ...additionalInfo,
                    unit: "in", // the page instructs inches throughout
                }),
            });
            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                // Server-side validation can also return which fields are missing.
                if (Array.isArray(data.missing) && data.missing.length) {
                    setErrors(Object.fromEntries(data.missing.map(k => [k, true])));
                }
                setSubmitError(data.error || "Something went wrong. Please email info@hsracegear.com.");
                return;
            }

            setFormSubmitted(true);
        } catch (err) {
            console.error("[CustomFitFormPage] submit failed:", err);
            setSubmitError(
                "Couldn't reach the server. Check your connection, or email your measurements to info@hsracegear.com."
            );
        } finally {
            setSubmitting(false);
        }
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
                            {/* Replaced the A–Q labelled body-diagram (Custom_form.png) with the
                                "How to Measure" tips banner, 2026-08-06 (client request).
                                Dropped the `lazyload` class and `data-src`: lazysizes is not a
                                dependency of this project, so that attribute never did anything —
                                only `src` was ever loaded. Keeping it would imply lazy loading
                                that isn't happening. Native loading="lazy" does the job instead.
                                Source PNG was 1.06 MB; this WebP is 99 KB for the same pixels. */}
                            <div className="img-custom-fit radius-10 overflow-hidden">
                                <img
                                    className="w-100 custom-fit-hero-img"
                                    src="/images/shop/how-to-measure.webp"
                                    width={1451}
                                    height={1084}
                                    loading="lazy"
                                    decoding="async"
                                    alt="How to measure for a race suit: wear light fitted clothing, use a soft flexible tape measure kept parallel to the ground, measure yourself rather than having someone else do it, keep the tape snug but not tight, and measure each dimension twice to confirm accuracy."
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

                                                {/* The measurement input. This did not exist before
                                                    2026-08-11 — the step rendered image, label and
                                                    text, then stopped, so `measurements` was always
                                                    empty and validation could never pass. */}
                                                <div className="form-group">
                                                    <label className="fw-6 mb_10 d-block" htmlFor={`cf-field-${step.id}`}>
                                                        Point {step.id} measurement <span className="text-danger">*</span>
                                                    </label>
                                                    <div style={{ position: "relative", maxWidth: 260 }}>
                                                        <input
                                                            id={`cf-field-${step.id}`}
                                                            type="number"
                                                            inputMode="decimal"
                                                            step="0.25"
                                                            min="0"
                                                            placeholder="0.00"
                                                            value={measurements[step.id] ?? ""}
                                                            onChange={(e) => handleMeasurementChange(step.id, e.target.value)}
                                                            aria-invalid={errors[step.id] ? "true" : "false"}
                                                            className="form-control cf-form-input"
                                                            style={{
                                                                paddingRight: 54,
                                                                borderColor: errors[step.id] ? "#e21b1b" : undefined,
                                                            }}
                                                        />
                                                        <span style={{
                                                            position: "absolute", right: 14, top: "50%",
                                                            transform: "translateY(-50%)", opacity: 0.6,
                                                            fontSize: "0.9rem", pointerEvents: "none",
                                                        }}>
                                                            in
                                                        </span>
                                                    </div>
                                                    {errors[step.id] && (
                                                        <p className="text-danger mb-0 mt_10" style={{ fontSize: "0.85rem" }}>
                                                            Please enter your Point {step.id} measurement.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <CustomFitBenefitsSection />

                            {/* Height & Weight — both were in state and in the
                                validation check but had no inputs before
                                2026-08-11, which is part of why the form could
                                never be submitted. */}
                            <div className="cf-form-card mb_40">
                                <h4 className="mb_20">📏 Height &amp; Weight</h4>
                                <div className="tf-grid-layout md-col-2 gap-30">
                                    <div className="form-group">
                                        <label className="fw-6 mb_10 d-block" htmlFor="cf-field-totalHeight">
                                            Total Height <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="cf-field-totalHeight"
                                            type="text"
                                            placeholder={`e.g. 5'11" or 71 in`}
                                            value={additionalInfo.totalHeight}
                                            onChange={(e) => handleAdditionalChange("totalHeight", e.target.value)}
                                            aria-invalid={errors.totalHeight ? "true" : "false"}
                                            className="form-control cf-form-input"
                                            style={{ borderColor: errors.totalHeight ? "#e21b1b" : undefined }}
                                        />
                                        {errors.totalHeight && (
                                            <p className="text-danger mb-0 mt_10" style={{ fontSize: "0.85rem" }}>Please enter your height.</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="fw-6 mb_10 d-block" htmlFor="cf-field-weight">
                                            Weight <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="cf-field-weight"
                                            type="text"
                                            placeholder="e.g. 175 lbs"
                                            value={additionalInfo.weight}
                                            onChange={(e) => handleAdditionalChange("weight", e.target.value)}
                                            aria-invalid={errors.weight ? "true" : "false"}
                                            className="form-control cf-form-input"
                                            style={{ borderColor: errors.weight ? "#e21b1b" : undefined }}
                                        />
                                        {errors.weight && (
                                            <p className="text-danger mb-0 mt_10" style={{ fontSize: "0.85rem" }}>Please enter your weight.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="cf-form-card mb_40">
                                <h4 className="mb_20">📞 Contact Information</h4>
                                <div className="tf-grid-layout md-col-2 gap-30">
                                    <div className="form-group">
                                        <label className="fw-6 mb_10 d-block" htmlFor="cf-field-name">
                                            Full Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="cf-field-name"
                                            type="text"
                                            placeholder="Enter your full name"
                                            value={additionalInfo.name}
                                            onChange={(e) => handleAdditionalChange("name", e.target.value)}
                                            aria-invalid={errors.name ? "true" : "false"}
                                            className="form-control cf-form-input"
                                            style={{ borderColor: errors.name ? "#e21b1b" : undefined }}
                                        />
                                        {errors.name && (
                                            <p className="text-danger mb-0 mt_10" style={{ fontSize: "0.85rem" }}>Please enter your name.</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="fw-6 mb_10 d-block" htmlFor="cf-field-email">
                                            Email Address <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="cf-field-email"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={additionalInfo.email}
                                            onChange={(e) => handleAdditionalChange("email", e.target.value)}
                                            aria-invalid={errors.email ? "true" : "false"}
                                            className="form-control cf-form-input"
                                            style={{ borderColor: errors.email ? "#e21b1b" : undefined }}
                                        />
                                        {errors.email && (
                                            <p className="text-danger mb-0 mt_10" style={{ fontSize: "0.85rem" }}>Please enter a valid email address.</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="fw-6 mb_10 d-block" htmlFor="cf-field-phone">
                                            Phone Number
                                        </label>
                                        <input
                                            id="cf-field-phone"
                                            type="tel"
                                            placeholder="Enter your phone number"
                                            value={additionalInfo.phone}
                                            onChange={(e) => handleAdditionalChange("phone", e.target.value)}
                                            className="form-control cf-form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="fw-6 mb_10 d-block" htmlFor="cf-field-notes">
                                            Additional Notes
                                        </label>
                                        <textarea
                                            id="cf-field-notes"
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
                                {submitError && (
                                    <p className="text-danger mb_20" style={{ fontWeight: 600 }}>{submitError}</p>
                                )}
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="tf-btn btn-fill animate-hover-btn radius-3 btn-lg"
                                    style={{ opacity: submitting ? 0.6 : 1, cursor: submitting ? "not-allowed" : undefined }}
                                >
                                    <span>{submitting ? "Sending…" : "Submit"}</span>
                                    {!submitting && <i className="icon icon-arrow-right" />}
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
                                        <a href="mailto:info@hsracegear.com" className="text_black-2">info@hsracegear.com</a>
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
