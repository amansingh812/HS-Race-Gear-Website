"use client";
import React, { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import "@/public/css/custom-order.css";

/* ============================================
   DATA
   ============================================ */

const PACKAGES = [
  {
    category: "SUIT ONLY",
    items: [
      { id: "single-suit", name: "Single Layer Custom SFI Rated Suit", price: 549, includes: ["suit"] },
      { id: "double-suit", name: "Double Layer Custom SFI Rated Suit", price: 649, includes: ["suit"] },
      { id: "triple-suit", name: "Triple Layer Custom SFI Rated Suit", price: 749, includes: ["suit"] },
    ],
  },
  {
    category: "SUIT + GLOVES",
    items: [
      { id: "single-suit-gloves", name: "Single Layer Custom SFI Rated Suit + Custom Gloves", price: 649, includes: ["suit", "gloves"] },
      { id: "double-suit-gloves", name: "Double Layer Custom SFI Rated Suit + Custom Gloves", price: 749, includes: ["suit", "gloves"] },
      { id: "triple-suit-gloves", name: "Triple Layer Custom SFI Rated Suit + Custom Gloves", price: 849, includes: ["suit", "gloves"] },
    ],
  },
  {
    category: "SUIT + GLOVES + SHOES",
    items: [
      { id: "single-suit-gloves-shoes", name: "Single Layer Custom SFI Rated Suit + Custom Gloves + Custom Shoes", price: 729, includes: ["suit", "gloves", "shoes"] },
      { id: "double-suit-gloves-shoes", name: "Double Layer Custom SFI Rated Suit + Custom Gloves + Custom Shoes", price: 829, includes: ["suit", "gloves", "shoes"] },
      { id: "triple-suit-gloves-shoes", name: "Triple Layer Custom SFI Rated Suit + Custom Gloves + Custom Shoes", price: 929, includes: ["suit", "gloves", "shoes"] },
    ],
  },
];

const SUIT_MOCKUPS = Array.from({ length: 29 }, (_, i) => ({
  id: `suit-${i + 1}`,
  name: `Design ${i + 1}`,
  number: i + 1,
}));

const GLOVES_MOCKUPS = Array.from({ length: 5 }, (_, i) => ({
  id: `gloves-${i + 1}`,
  name: `Gloves Design ${i + 1}`,
  number: i + 1,
  image: `/images/gloves/mockup-${i + 1}.webp`,
}));

const SHOES_MOCKUPS = Array.from({ length: 7 }, (_, i) => ({
  id: `shoes-${i + 1}`,
  name: `Shoes Design ${i + 1}`,
  number: i + 1,
  image: `/images/shoes/mockup-${i + 1}.webp`,
}));

const COLORS = [
  { name: "Bright Red",    hex: "#dc2626" },
  { name: "Maroon",        hex: "#7f1d1d" },
  { name: "Black",         hex: "#000000" },
  { name: "Teal",          hex: "#14b8a6" },
  { name: "White",         hex: "#ffffff", light: true },
  { name: "Royal Blue",    hex: "#0d3e92" },
  { name: "Sky Blue",      hex: "#327eec" },
  { name: "Navy Blue",     hex: "#00054f" },
  { name: "Orange",        hex: "#ea580c" },
  { name: "Flo Orange",    hex: "#fe360f" },
  { name: "Yellow",        hex: "#facc15", light: true },
  { name: "Flo Yellow",    hex: "#c6f700", light: true },
  { name: "Green",         hex: "#16a34a" },
  { name: "Flo Green",     hex: "#6beb0c", light: true },
  { name: "Pink",          hex: "#f511b7" },
  { name: "Purple",        hex: "#8b428f" },
  { name: "Golden",        hex: "#d4a017" },
  { name: "Grey",          hex: "#808080" },
  { name: "Dark Grey",     hex: "#374151" },
  { name: "Medium Grey",   hex: "#6b7280" },
  { name: "Filament Grey", hex: "#d4d4d4", light: true },
];

/* ============================================
   ICONS
   ============================================ */
const CheckIcon = ({ size = 18, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

/* ============================================
   STEP COMPONENTS
   ============================================ */

/* ---- Step 1: Package Selection ---- */
function PackageSelection({ selected, onSelect }) {
  return (
    <div className="step-content">
      <div className="step-header">
        <div className="step-badge">Step 1 of 4</div>
        <h2 className="step-title">Choose Your Package</h2>
        <p className="step-subtitle">Select your custom racing gear combination. All suits are SFI certified and crafted from premium Nomex fabric.</p>
      </div>
      <div className="package-categories">
        {PACKAGES.map((cat) => (
          <div key={cat.category}>
            <div className="package-category-title">{cat.category}</div>
            <div className="package-cards">
              {cat.items.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`package-card ${selected?.id === pkg.id ? "selected" : ""}`}
                  onClick={() => onSelect(pkg)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && onSelect(pkg)}
                >
                  <div className="package-card-info">
                    <div className="package-radio">
                      <div className="package-radio-dot" />
                    </div>
                    <div className="package-card-name" dangerouslySetInnerHTML={{
                      __html: pkg.name
                        .replace(/(Single|Double|Triple)/g, "<strong>$1</strong>")
                        .replace(/(Gloves|Shoes)/g, "<strong>$1</strong>")
                    }} />
                  </div>
                  <div className="package-card-price">
                    ${pkg.price}<span>USD</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Step 2: Mockup Selection (Suit / Gloves / Shoes) ---- */
function MockupSelection({ type, mockups, selected, onSelect, stepLabel, totalSteps, currentStep }) {
  const typeLabels = { suit: "Suit Design", gloves: "Gloves Design", shoes: "Shoes Design" };
  const typeDescriptions = {
    suit: "Browse our collection of 29 custom suit designs. Select the one that matches your racing style.",
    gloves: "Choose your preferred gloves design to complement your suit.",
    shoes: "Select your racing shoes design to complete the look.",
  };

  return (
    <div className="step-content" key={type}>
      <div className="step-header">
        <div className="step-badge">Step {currentStep} of {totalSteps}</div>
        <h2 className="step-title">Select Your {typeLabels[type]}</h2>
        <p className="step-subtitle">{typeDescriptions[type]}</p>
      </div>
      <div className="mockup-grid">
        {mockups.map((mockup) => (
          <div
            key={mockup.id}
            className={`mockup-card ${selected?.id === mockup.id ? "selected" : ""}`}
            onClick={() => onSelect(mockup)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onSelect(mockup)}
          >
            <div className="mockup-card-image">
              {mockup.image ? (
                <img src={mockup.image} alt={mockup.name} loading="lazy" />
              ) : (
                <span>{String(mockup.number).padStart(2, "0")}</span>
              )}
            </div>
            <div className="mockup-card-label">{mockup.name}</div>
            <div className="mockup-card-check">
              <CheckIcon size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Color Selection ---- */
const MAX_PRIMARY_COLORS = 4;

function ColorSelection({ selections, onChange, currentStep, totalSteps }) {
  const selected = selections.primary || [];

  // Build preview gradient from selected colors
  const previewStyle = () => {
    if (selected.length === 0) return "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)";
    if (selected.length === 1) return selected[0].hex;
    const step = 100 / selected.length;
    const stops = selected.map((c, i) => `${c.hex} ${i * step}%, ${c.hex} ${(i + 1) * step}%`).join(", ");
    return `linear-gradient(135deg, ${stops})`;
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <div className="step-badge">Step {currentStep} of {totalSteps}</div>
        <h2 className="step-title">Choose Your Colors</h2>
        <p className="step-subtitle">
          Select up to <strong>{MAX_PRIMARY_COLORS} primary colors</strong> for your custom gear. Our designer will create a mockup based on your choices.
        </p>
      </div>
      <div className="color-selection-area">
        {/* Color Preview */}
        <div className="color-preview" style={{ background: previewStyle() }}>
          {selected.length === 0 && (
            <div className="color-preview-label">Select colors below</div>
          )}
        </div>

        {/* Selected swatches row */}
        {selected.length > 0 && (
          <div className="color-selected-row">
            <span className="color-selected-label">Selected ({selected.length}/{MAX_PRIMARY_COLORS}):</span>
            <div className="color-selected-chips">
              {selected.map((c) => (
                <div key={c.hex} className="color-chip">
                  <span className="color-chip-dot" style={{ backgroundColor: c.hex }} />
                  <span className="color-chip-name">{c.name}</span>
                  <button
                    className="color-chip-remove"
                    onClick={() => onChange("primary", c)}
                    title={`Remove ${c.name}`}
                  >✕</button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="color-sections">
          <div>
            <div className="color-section-title">
              Primary Color
              {selected.length >= MAX_PRIMARY_COLORS && (
                <span className="color-name-tag" style={{ marginLeft: 12, color: "#e21b1b" }}>
                  Max {MAX_PRIMARY_COLORS} selected
                </span>
              )}
            </div>
            <div className="color-swatches">
              {COLORS.map((color) => {
                const isSelected = selected.some((c) => c.hex === color.hex);
                const isDisabled = !isSelected && selected.length >= MAX_PRIMARY_COLORS;
                return (
                  <div
                    key={color.hex}
                    className={`color-swatch ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
                    style={{ backgroundColor: color.hex, opacity: isDisabled ? 0.35 : 1, cursor: isDisabled ? "not-allowed" : "pointer" }}
                    onClick={() => !isDisabled && onChange("primary", color)}
                    title={isDisabled ? `Max ${MAX_PRIMARY_COLORS} colors reached` : color.name}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && !isDisabled && onChange("primary", color)}
                  >
                    <div className="color-swatch-check">
                      <CheckIcon size={14} color={color.light ? "#000" : "#fff"} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Customer Info Form ---- */
function CustomerInfoForm({ info, onChange, errors, onSubmit, isSubmitting, currentStep, totalSteps, orderData }) {
  return (
    <div className="step-content">
      <div className="step-header">
        <div className="step-badge">Step {currentStep} of {totalSteps}</div>
        <h2 className="step-title">Your Information</h2>
        <p className="step-subtitle">Enter your contact details. A dedicated designer will reach out within 24 hours with your custom mockup.</p>
      </div>
      <div className="customer-form">
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className={`form-input ${errors.name ? "error" : ""}`}
            placeholder="Enter your full name"
            value={info.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
          {errors.name && <div className="form-error">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className={`form-input ${errors.email ? "error" : ""}`}
            placeholder="Enter your email address"
            value={info.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
          {errors.email && <div className="form-error">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Contact Number</label>
          <input
            type="tel"
            className={`form-input ${errors.phone ? "error" : ""}`}
            placeholder="Enter your phone number"
            value={info.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
          {errors.phone && <div className="form-error">{errors.phone}</div>}
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <div className="order-summary-title">Order Summary</div>
          <div className="order-summary-item">
            <span className="order-summary-label">Package</span>
            <span className="order-summary-value">{orderData.package?.name || "—"}</span>
          </div>
          <div className="order-summary-item">
            <span className="order-summary-label">Suit Design</span>
            <span className="order-summary-value">{orderData.suitMockup?.name || "—"}</span>
          </div>
          {orderData.glovesMockup && (
            <div className="order-summary-item">
              <span className="order-summary-label">Gloves Design</span>
              <span className="order-summary-value">{orderData.glovesMockup.name}</span>
            </div>
          )}
          {orderData.shoesMockup && (
            <div className="order-summary-item">
              <span className="order-summary-label">Shoes Design</span>
              <span className="order-summary-value">{orderData.shoesMockup.name}</span>
            </div>
          )}
          <div className="order-summary-item">
            <span className="order-summary-label">Colors</span>
            <span className="order-summary-value" style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
              {(orderData.colors?.primary || []).map((c) => (
                <span key={c.hex} title={c.name} style={{ width: 18, height: 18, borderRadius: 4, background: c.hex, display: "inline-block", border: "1px solid rgba(255,255,255,0.2)" }} />
              ))}
              {(!orderData.colors?.primary || orderData.colors.primary.length === 0) && (
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>None selected</span>
              )}
            </span>
          </div>
          <div className="order-summary-total">
            <span className="order-summary-total-label">Total</span>
            <span className="order-summary-total-price">${orderData.package?.price || 0} USD</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Success Screen ---- */
function SuccessScreen() {
  return (
    <div className="success-screen">
      <div className="success-icon">
        <CheckIcon size={42} color="#16a34a" />
      </div>
      <h2 className="success-title">Order Submitted!</h2>
      <p className="success-message">
        Thank you for your custom order! A dedicated designer will contact you within 24 hours with a mockup of your product. Check your email for confirmation details.
      </p>
      <Link
        href="/custom-race-suit"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "16px 32px",
          background: "#dc2626",
          borderRadius: 10,
          color: "#fff",
          fontWeight: 700,
          fontSize: 15,
          textDecoration: "none",
          transition: "all 0.3s ease",
        }}
      >
        Back to Custom Suits
      </Link>
    </div>
  );
}

/* ============================================
   MAIN COMPONENT
   ============================================ */
export default function CustomOrderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [suitMockup, setSuitMockup] = useState(null);
  const [glovesMockup, setGlovesMockup] = useState(null);
  const [shoesMockup, setShoesMockup] = useState(null);
  const [colors, setColors] = useState({ primary: [] });
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "", phone: "" });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Determine which steps are needed based on the selected package
  const steps = useMemo(() => {
    const s = [
      { id: "package", label: "Package" },
      { id: "suit", label: "Suit Design" },
    ];
    if (selectedPackage?.includes?.includes("gloves")) {
      s.push({ id: "gloves", label: "Gloves" });
    }
    if (selectedPackage?.includes?.includes("shoes")) {
      s.push({ id: "shoes", label: "Shoes" });
    }
    s.push({ id: "colors", label: "Colors" });
    s.push({ id: "info", label: "Your Info" });
    return s;
  }, [selectedPackage]);

  const totalSteps = steps.length;
  const currentStepId = steps[currentStep]?.id;

  const handleColorChange = useCallback((area, color) => {
    if (area !== "primary") return;
    setColors((prev) => {
      const current = prev.primary || [];
      const alreadySelected = current.some((c) => c.hex === color.hex);
      if (alreadySelected) {
        // Deselect — remove it
        return { primary: current.filter((c) => c.hex !== color.hex) };
      }
      if (current.length >= MAX_PRIMARY_COLORS) return prev; // max reached
      return { primary: [...current, color] };
    });
  }, []);

  const handleCustomerInfoChange = useCallback((field, value) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: null }));
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!customerInfo.name.trim()) errors.name = "Please enter your name";
    if (!customerInfo.email.trim()) errors.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) errors.email = "Please enter a valid email";
    if (!customerInfo.phone.trim()) errors.phone = "Please enter your phone number";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const canProceed = () => {
    switch (currentStepId) {
      case "package": return !!selectedPackage;
      case "suit": return !!suitMockup;
      case "gloves": return !!glovesMockup;
      case "shoes": return !!shoesMockup;
      case "colors": return colors.primary.length > 0;
      case "info": return true;
      default: return false;
    }
  };

  const handleNext = async () => {
    if (currentStepId === "info") {
      if (!validateForm()) return;
      await handleSubmit();
      return;
    }
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const orderData = {
        package: selectedPackage,
        suitMockup,
        glovesMockup: selectedPackage?.includes?.includes("gloves") ? glovesMockup : null,
        shoesMockup: selectedPackage?.includes?.includes("shoes") ? shoesMockup : null,
        colors,
        customer: customerInfo,
      };

      const res = await fetch("/api/custom-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Failed to submit order");

      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Order submission error:", err);
      alert("There was an error submitting your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // When package changes and we're past step 1, reset to step 1
  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    // Reset dependent selections if package type changed
    if (selectedPackage && !pkg.includes.includes("gloves")) setGlovesMockup(null);
    if (selectedPackage && !pkg.includes.includes("shoes")) setShoesMockup(null);
  };

  if (isSuccess) {
    return (
      <div className="custom-order-page">
        <SuccessScreen />
      </div>
    );
  }

  const orderDataForSummary = {
    package: selectedPackage,
    suitMockup,
    glovesMockup,
    shoesMockup,
    colors,
  };

  return (
    <div className="custom-order-page">
      {/* Progress Bar */}
      <div className="order-progress-bar">
        <div className="progress-steps">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div
                className="progress-step"
                onClick={() => {
                  // Only allow going to completed steps
                  if (index < currentStep) setCurrentStep(index);
                }}
                style={{ cursor: index < currentStep ? "pointer" : "default" }}
              >
                <div
                  className={`progress-step-number ${
                    index === currentStep ? "active" : index < currentStep ? "completed" : ""
                  }`}
                >
                  {index < currentStep ? <CheckIcon size={16} /> : index + 1}
                </div>
                <span
                  className={`progress-step-label ${
                    index === currentStep ? "active" : index < currentStep ? "completed" : ""
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`progress-connector ${index < currentStep ? "completed" : ""}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="custom-order-container">
        {currentStepId === "package" && (
          <PackageSelection selected={selectedPackage} onSelect={handlePackageSelect} />
        )}

        {currentStepId === "suit" && (
          <MockupSelection
            type="suit"
            mockups={SUIT_MOCKUPS}
            selected={suitMockup}
            onSelect={setSuitMockup}
            currentStep={currentStep + 1}
            totalSteps={totalSteps}
          />
        )}

        {currentStepId === "gloves" && (
          <MockupSelection
            type="gloves"
            mockups={GLOVES_MOCKUPS}
            selected={glovesMockup}
            onSelect={setGlovesMockup}
            currentStep={currentStep + 1}
            totalSteps={totalSteps}
          />
        )}

        {currentStepId === "shoes" && (
          <MockupSelection
            type="shoes"
            mockups={SHOES_MOCKUPS}
            selected={shoesMockup}
            onSelect={setShoesMockup}
            currentStep={currentStep + 1}
            totalSteps={totalSteps}
          />
        )}

        {currentStepId === "colors" && (
          <ColorSelection
            selections={colors}
            onChange={handleColorChange}
            currentStep={currentStep + 1}
            totalSteps={totalSteps}
          />
        )}

        {currentStepId === "info" && (
          <CustomerInfoForm
            info={customerInfo}
            onChange={handleCustomerInfoChange}
            errors={formErrors}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            currentStep={currentStep + 1}
            totalSteps={totalSteps}
            orderData={orderDataForSummary}
          />
        )}

        {/* Navigation Buttons */}
        <div className="step-navigation">
          {currentStep > 0 ? (
            <button className="btn-back" onClick={handleBack}>
              <ArrowLeft /> Back
            </button>
          ) : (
            <div />
          )}

          <button
            className={`btn-next ${currentStepId === "info" ? "btn-submit" : ""}`}
            onClick={handleNext}
            disabled={!canProceed() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="spinner" /> Submitting...
              </>
            ) : currentStepId === "info" ? (
              <>
                Submit Order <ArrowRight />
              </>
            ) : (
              <>
                Continue <ArrowRight />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
