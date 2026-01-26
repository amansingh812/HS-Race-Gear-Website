"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Form Data
const stitchingStyles = [
    { id: "cross-stitch", name: "Cross Stitch", image: "/images/placeholder-stitch.png" },
    { id: "v-angle-stitch", name: "V & Angle Stitch", image: "/images/placeholder-stitch.png" },
    { id: "diagonal-stitch", name: "Diagonal Stitch", image: "/images/placeholder-stitch.png" },
    { id: "straight-stitch", name: "Straight Stitch", image: "/images/placeholder-stitch.png" },
];

const collarStyles = [
    { id: "large-velcro", name: "Large w/ Velcro", image: "/images/placeholder-collar.png" },
    { id: "banded-v-velcro", name: "Banded V w/ Velcro", image: "/images/placeholder-collar.png" },
    { id: "tapered-v", name: "Tapered V", image: "/images/placeholder-collar.png" },
    { id: "euro-collar", name: "Euro Collar", image: "/images/placeholder-collar.png" },
];

const legCuffOptions = [
    { id: "boot-cut", name: "Boot Cut" },
    { id: "euro-cut", name: "Euro Cut" },
];

const measurementFields = [
    { id: "chest", label: "Chest Circumference", placeholder: "CM" },
    { id: "waist", label: "Waist Circumference", placeholder: "CM" },
    { id: "hip", label: "Hip Circumference", placeholder: "CM" },
    { id: "thigh", label: "Thigh Circumference", placeholder: "CM" },
    { id: "neck", label: "Neck Circumference", placeholder: "CM" },
    { id: "shoulder", label: "Shoulder Width", placeholder: "CM" },
    { id: "backWidth", label: "Back Width", placeholder: "CM" },
    { id: "sleeve", label: "Sleeve Length", placeholder: "CM" },
    { id: "bicep", label: "Bicep Circumference", placeholder: "CM" },
    { id: "forearm", label: "Forearm Circumference", placeholder: "CM" },
    { id: "calf", label: "Calf Circumference", placeholder: "CM" },
    { id: "neckToBelly", label: "Neck to Belly Button", placeholder: "CM" },
    { id: "bellyToCrotch", label: "Belly to Crotch", placeholder: "CM" },
    { id: "inseam", label: "Inseam Length", placeholder: "CM" },
    { id: "suitHeight", label: "Full Suit Height", placeholder: "CM" },
    { id: "height", label: "Total Height (Head to Ankle)", placeholder: "CM" },
    { id: "weight", label: "Weight", placeholder: "KG" },
];

export default function CustomMeasurementForm() {
    const [formData, setFormData] = useState({
        // Customer Info
        fullName: "",
        email: "",
        phone: "",
        // Options
        suitType: "one-piece",
        stitchingStyle: "",
        collarStyle: "",
        legCuff: "boot-cut",
        // Measurements
        measurements: {},
        // Notes
        specialNotes: "",
    });

    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (formErrors[field]) {
            setFormErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const handleMeasurementChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            measurements: { ...prev.measurements, [field]: value }
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.fullName.trim()) errors.fullName = "Full name is required";
        if (!formData.email.trim()) errors.email = "Email is required";
        if (!formData.stitchingStyle) errors.stitchingStyle = "Please select a stitching style";
        if (!formData.collarStyle) errors.collarStyle = "Please select a collar style";

        // Check required measurements
        const requiredMeasurements = ["chest", "waist", "hip", "neck", "shoulder", "sleeve", "height", "weight"];
        requiredMeasurements.forEach(field => {
            if (!formData.measurements[field]) {
                errors[`measurement_${field}`] = "Required";
            }
        });

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            alert("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log("Form Data:", formData);
        setSubmitted(true);
        setIsSubmitting(false);
    };

    if (submitted) {
        return (
            <section className="flat-spacing-9">
                <div className="container">
                    <div className="text-center p-5" style={{
                        background: "#d4edda",
                        border: "1px solid #c3e6cb",
                        borderRadius: "12px",
                        maxWidth: "600px",
                        margin: "0 auto"
                    }}>
                        <span style={{ fontSize: "4rem" }}>✅</span>
                        <h3 className="mt_20 mb_15">Measurements Submitted Successfully!</h3>
                        <p className="text_black-3 mb_20">
                            Thank you for submitting your custom suit measurements. Our team will review them and contact you within 24 hours.
                        </p>
                        <Link href="/shop" className="tf-btn btn-fill animate-hover-btn radius-3">
                            <span>Continue Shopping</span>
                            <i className="icon icon-arrow-right" />
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <div className="flat-spacing-9">
            <div className="container">
                <form onSubmit={handleSubmit}>

                    {/* Form Header */}
                    <div className="form-header mb_40" style={{
                        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                        padding: "40px",
                        borderRadius: "12px",
                        color: "#fff"
                    }}>
                        <h1 style={{ color: "#b0302b", marginBottom: "20px", fontSize: "28px" }}>
                            🏁 Custom Racing Suit Measurement Form
                        </h1>
                        <p className="mb_30" style={{ opacity: 0.9 }}>
                            Complete this form with accurate measurements for your custom-tailored racing suit.
                        </p>

                        <div className="tf-grid-layout md-col-3 gap-20">
                            <fieldset className="tf-field style-2 style-3">
                                <input
                                    className={`tf-field-input tf-input ${formErrors.fullName ? "is-invalid" : ""}`}
                                    type="text"
                                    placeholder=" "
                                    value={formData.fullName}
                                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                                    style={{ background: "#fff" }}
                                />
                                <label className="tf-field-label">Full Name *</label>
                            </fieldset>

                            <fieldset className="tf-field style-2 style-3">
                                <input
                                    className={`tf-field-input tf-input ${formErrors.email ? "is-invalid" : ""}`}
                                    type="email"
                                    placeholder=" "
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    style={{ background: "#fff" }}
                                />
                                <label className="tf-field-label">Email Address *</label>
                            </fieldset>

                            <fieldset className="tf-field style-2 style-3">
                                <input
                                    className="tf-field-input tf-input"
                                    type="tel"
                                    placeholder=" "
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                    style={{ background: "#fff" }}
                                />
                                <label className="tf-field-label">Phone Number</label>
                            </fieldset>
                        </div>
                    </div>

                    {/* Suit Type Selection */}
                    <div className="option-section mb_30" style={{
                        background: "#b0302b",
                        color: "#fff",
                        borderRadius: "8px",
                        overflow: "hidden"
                    }}>
                        <div className="option-header" style={{
                            padding: "20px 25px",
                            borderBottom: "1px solid rgba(255,255,255,0.2)"
                        }}>
                            <h3 style={{ margin: 0, fontSize: "18px" }}>Suit Configuration</h3>
                        </div>

                        <div className="option-row" style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "15px 25px",
                            borderBottom: "1px solid rgba(255,255,255,0.2)"
                        }}>
                            <span>Suit Type</span>
                            <div className="d-flex gap-20">
                                <label className="d-flex align-items-center gap-10" style={{ cursor: "pointer" }}>
                                    <input
                                        type="radio"
                                        name="suitType"
                                        value="one-piece"
                                        checked={formData.suitType === "one-piece"}
                                        onChange={(e) => handleInputChange("suitType", e.target.value)}
                                    />
                                    <span>1-Piece</span>
                                </label>
                                <label className="d-flex align-items-center gap-10" style={{ cursor: "pointer" }}>
                                    <input
                                        type="radio"
                                        name="suitType"
                                        value="two-piece"
                                        checked={formData.suitType === "two-piece"}
                                        onChange={(e) => handleInputChange("suitType", e.target.value)}
                                    />
                                    <span>2-Piece</span>
                                </label>
                                <label className="d-flex align-items-center gap-10" style={{ cursor: "pointer" }}>
                                    <input
                                        type="radio"
                                        name="suitType"
                                        value="jacket"
                                        checked={formData.suitType === "jacket"}
                                        onChange={(e) => handleInputChange("suitType", e.target.value)}
                                    />
                                    <span>Jacket Only</span>
                                </label>
                            </div>
                        </div>

                        <div className="option-row" style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "15px 25px"
                        }}>
                            <span>Leg Cuff Style</span>
                            <div className="d-flex gap-20">
                                {legCuffOptions.map((option) => (
                                    <label key={option.id} className="d-flex align-items-center gap-10" style={{ cursor: "pointer" }}>
                                        <input
                                            type="radio"
                                            name="legCuff"
                                            value={option.id}
                                            checked={formData.legCuff === option.id}
                                            onChange={(e) => handleInputChange("legCuff", e.target.value)}
                                        />
                                        <span>{option.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stitching Style */}
                    <section className="section mb_40">
                        <h2 className="mb_20" style={{ fontSize: "22px", fontWeight: "700" }}>
                            Stitching Style <span style={{ color: "#b0302b" }}>*</span>
                        </h2>
                        {formErrors.stitchingStyle && (
                            <p className="text-danger mb_15">{formErrors.stitchingStyle}</p>
                        )}

                        <div className="stitch-grid" style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                            gap: "20px"
                        }}>
                            {stitchingStyles.map((style) => (
                                <label
                                    key={style.id}
                                    className="stitch-card"
                                    style={{
                                        border: formData.stitchingStyle === style.id ? "3px solid #b0302b" : "2px solid #dee2e6",
                                        borderRadius: "12px",
                                        padding: "20px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                        background: formData.stitchingStyle === style.id ? "#fff5f5" : "#fff",
                                        boxShadow: formData.stitchingStyle === style.id ? "0 4px 15px rgba(176, 48, 43, 0.2)" : "0 2px 8px rgba(0,0,0,0.05)"
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "140px",
                                            background: "#f8f9fa",
                                            borderRadius: "8px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginBottom: "12px",
                                            border: "1px dashed #dee2e6"
                                        }}
                                    >
                                        <span style={{ fontSize: "2.5rem" }}>🧵</span>
                                    </div>
                                    <input
                                        type="radio"
                                        name="stitchingStyle"
                                        value={style.id}
                                        checked={formData.stitchingStyle === style.id}
                                        onChange={(e) => handleInputChange("stitchingStyle", e.target.value)}
                                        style={{ display: "none" }}
                                    />
                                    <span style={{
                                        fontWeight: "600",
                                        fontSize: "14px",
                                        color: formData.stitchingStyle === style.id ? "#b0302b" : "#333"
                                    }}>
                                        {style.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </section>

                    {/* Collar Style */}
                    <section className="section mb_40">
                        <h2 className="mb_20" style={{ fontSize: "22px", fontWeight: "700" }}>
                            Collar Style <span style={{ color: "#b0302b" }}>*</span>
                        </h2>
                        {formErrors.collarStyle && (
                            <p className="text-danger mb_15">{formErrors.collarStyle}</p>
                        )}

                        <div className="collar-grid" style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                            gap: "20px"
                        }}>
                            {collarStyles.map((collar) => (
                                <label
                                    key={collar.id}
                                    className="collar-card"
                                    style={{
                                        border: formData.collarStyle === collar.id ? "3px solid #b0302b" : "2px solid #dee2e6",
                                        borderRadius: "12px",
                                        padding: "20px",
                                        textAlign: "center",
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                        background: formData.collarStyle === collar.id ? "#fff5f5" : "#fff",
                                        boxShadow: formData.collarStyle === collar.id ? "0 4px 15px rgba(176, 48, 43, 0.2)" : "0 2px 8px rgba(0,0,0,0.05)"
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "100px",
                                            background: "#f8f9fa",
                                            borderRadius: "8px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginBottom: "12px",
                                            border: "1px dashed #dee2e6"
                                        }}
                                    >
                                        <span style={{ fontSize: "2rem" }}>👔</span>
                                    </div>
                                    <input
                                        type="radio"
                                        name="collarStyle"
                                        value={collar.id}
                                        checked={formData.collarStyle === collar.id}
                                        onChange={(e) => handleInputChange("collarStyle", e.target.value)}
                                        style={{ display: "none" }}
                                    />
                                    <span style={{
                                        fontWeight: "600",
                                        fontSize: "14px",
                                        color: formData.collarStyle === collar.id ? "#b0302b" : "#333"
                                    }}>
                                        {collar.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </section>

                    {/* Measurement Guide Image */}
                    <section className="measurement-guide mb_40">
                        <h2 className="mb_20 text-center" style={{ fontSize: "22px", fontWeight: "700" }}>
                            📏 Measurement Guide
                        </h2>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "30px"
                        }}>
                            <div style={{
                                width: "100%",
                                maxWidth: "700px",
                                height: "450px",
                                background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                                borderRadius: "12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                border: "2px dashed #dee2e6"
                            }}>
                                <span style={{ fontSize: "5rem", marginBottom: "20px" }}>📐</span>
                                <p style={{ fontSize: "18px", fontWeight: "600", color: "#6c757d" }}>
                                    Measurement Guide Image
                                </p>
                                <p style={{ fontSize: "14px", color: "#adb5bd" }}>
                                    600 × 500 px
                                </p>
                            </div>
                        </div>

                        {/* Warning Banner */}
                        <div style={{
                            background: "linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)",
                            border: "1px solid #ffc107",
                            borderRadius: "10px",
                            padding: "20px 25px",
                            marginBottom: "30px"
                        }}>
                            <div className="d-flex gap-15 align-items-start">
                                <span style={{ fontSize: "1.5rem" }}>⚠️</span>
                                <div>
                                    <strong style={{ color: "#856404" }}>Important Measurement Guidelines:</strong>
                                    <ul style={{ margin: "10px 0 0 0", paddingLeft: "20px", color: "#856404" }}>
                                        <li>Have someone else take your measurements for accuracy</li>
                                        <li>All measurements must be in <strong>Centimeters (CM)</strong></li>
                                        <li>Do NOT add any allowance – we will do that for you</li>
                                        <li>HS Racegear is not responsible for measurement errors</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Measurements Grid */}
                    <section className="measurements-section mb_40">
                        <h2 className="mb_30 text-center" style={{ fontSize: "22px", fontWeight: "700" }}>
                            📋 Body Measurements
                        </h2>

                        <div className="measurements-grid" style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "20px"
                        }}>
                            {measurementFields.map((field) => (
                                <div
                                    key={field.id}
                                    className="input-group"
                                    style={{
                                        background: "#fff",
                                        padding: "20px",
                                        borderRadius: "10px",
                                        border: formErrors[`measurement_${field.id}`] ? "2px solid #dc3545" : "1px solid #dee2e6",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
                                    }}
                                >
                                    <label style={{
                                        display: "block",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        marginBottom: "10px",
                                        color: "#333"
                                    }}>
                                        {field.label}
                                        {["chest", "waist", "hip", "neck", "shoulder", "sleeve", "height", "weight"].includes(field.id) && (
                                            <span style={{ color: "#b0302b" }}> *</span>
                                        )}
                                    </label>
                                    <div className="d-flex align-items-center gap-10">
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            placeholder="0.0"
                                            value={formData.measurements[field.id] || ""}
                                            onChange={(e) => handleMeasurementChange(field.id, e.target.value)}
                                            style={{
                                                flex: 1,
                                                padding: "12px 15px",
                                                fontSize: "16px",
                                                fontWeight: "600",
                                                border: "2px solid #e9ecef",
                                                borderRadius: "8px",
                                                transition: "border-color 0.3s ease"
                                            }}
                                        />
                                        <span style={{
                                            padding: "12px 15px",
                                            background: "#f8f9fa",
                                            borderRadius: "8px",
                                            fontWeight: "600",
                                            color: "#6c757d",
                                            minWidth: "50px",
                                            textAlign: "center"
                                        }}>
                                            {field.placeholder}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Special Notes */}
                    <section className="notes-section mb_40">
                        <h2 className="mb_20" style={{ fontSize: "22px", fontWeight: "700" }}>
                            📝 Special Notes / Requirements
                        </h2>
                        <textarea
                            placeholder="Any special requirements, preferences, or notes for your custom suit..."
                            value={formData.specialNotes}
                            onChange={(e) => handleInputChange("specialNotes", e.target.value)}
                            rows="4"
                            style={{
                                width: "100%",
                                padding: "15px 20px",
                                fontSize: "15px",
                                border: "2px solid #e9ecef",
                                borderRadius: "10px",
                                resize: "vertical"
                            }}
                        />
                    </section>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="tf-btn btn-fill animate-hover-btn radius-3"
                            style={{
                                background: "#b0302b",
                                padding: "18px 60px",
                                fontSize: "18px",
                                fontWeight: "700",
                                opacity: isSubmitting ? 0.7 : 1,
                                cursor: isSubmitting ? "not-allowed" : "pointer"
                            }}
                        >
                            {isSubmitting ? (
                                <span>Submitting...</span>
                            ) : (
                                <>
                                    <span>🏁 Submit Measurements</span>
                                    <i className="icon icon-arrow-right" />
                                </>
                            )}
                        </button>
                        <p className="mt_20 text_black-3" style={{ fontSize: "14px" }}>
                            By submitting, you confirm all measurements are accurate. Our team will contact you within 24 hours.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
