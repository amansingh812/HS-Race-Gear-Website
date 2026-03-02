"use client";
import React, { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import "@/public/css/custom-order.css";

/* ============================================
   DATA — Karting Suit Order
   ============================================ */

const PACKAGES = [
  {
    category: "KARTING SUIT ONLY",
    items: [
      { id: "karting-suit", name: "Custom Karting Suit", price: 289, includes: ["suit"] },
    ],
  },
  {
    category: "KARTING SUIT + GLOVES",
    items: [
      { id: "karting-suit-gloves", name: "Custom Karting Suit + Custom Gloves", price: 315, includes: ["suit", "gloves"] },
    ],
  },
  {
    category: "KARTING SUIT + GLOVES + SHOES",
    items: [
      { id: "karting-suit-gloves-shoes", name: "Custom Karting Suit + Custom Gloves + Custom Shoes", price: 415, includes: ["suit", "gloves", "shoes"] },
    ],
  },
];

// 18 karting suit mockups — use real images where available, placeholders otherwise
const EXISTING_KARTING_IMAGES = [1, 2, 3, 4, 5, 7, 8, 10, 11];
const SUIT_MOCKUPS = Array.from({ length: 18 }, (_, i) => {
  const num = i + 1;
  const hasImage = EXISTING_KARTING_IMAGES.includes(num);
  return {
    id: `karting-suit-${num}`,
    name: `Design ${num}`,
    number: num,
    image: hasImage ? `/images/karting/mockup-${num}.webp` : null,
  };
});

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

function PackageSelection({ selected, onSelect }) {
  return (
    <div className="step-content">
      <div className="step-header">
        <div className="step-badge">Step 1</div>
        <h2 className="step-title">Choose Your Package</h2>
        <p className="step-subtitle">Select your custom karting gear combination. Full sublimation printing with unlimited colors on every suit.</p>
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
                        .replace(/(Suit|Gloves|Shoes)/g, "<strong>$1</strong>")
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

function MockupSelection({ type, mockups, selected, onSelect, currentStep, totalSteps }) {
  const typeLabels = { suit: "Karting Suit Design", gloves: "Gloves Design", shoes: "Shoes Design" };
  const typeDescriptions = {
    suit: "Browse our collection of 18 custom karting suit designs. Select the one that matches your style.",
    gloves: "Choose your preferred gloves design to complement your karting suit.",
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

function ColorSelection({ selections, onChange, currentStep, totalSteps }) {
  const colorAreas = [
    { key: "primary", label: "Primary Color" },
    { key: "secondary", label: "Secondary Color" },
    { key: "accent", label: "Accent / Stripe Color" },
  ];

  return (
    <div className="step-content">
      <div className="step-header">
        <div className="step-badge">Step {currentStep} of {totalSteps}</div>
        <h2 className="step-title">Choose Your Colors</h2>
        <p className="step-subtitle">Select up to 3 colors for your custom karting gear. Our designer will create a mockup based on your choices.</p>
      </div>
      <div className="color-selection-area">
        <div
          className="color-preview"
          style={{
            background: selections.primary
              ? `linear-gradient(135deg, ${selections.primary.hex} 0%, ${selections.primary.hex} 40%, ${selections.secondary?.hex || "#222"} 40%, ${selections.secondary?.hex || "#222"} 70%, ${selections.accent?.hex || "#333"} 70%, ${selections.accent?.hex || "#333"} 100%)`
              : "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          }}
        >
          {!selections.primary && (
            <div className="color-preview-label">Select colors below</div>
          )}
        </div>

        <div className="color-sections">
          {colorAreas.map((area) => (
            <div key={area.key}>
              <div className="color-section-title">
                {area.label}
                {selections[area.key] && (
                  <span className="color-name-tag" style={{ marginLeft: 12 }}>
                    {selections[area.key].name}
                  </span>
                )}
              </div>
              <div className="color-swatches">
                {COLORS.map((color) => (
                  <div
                    key={color.hex + area.key}
                    className={`color-swatch ${selections[area.key]?.hex === color.hex ? "selected" : ""}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => onChange(area.key, color)}
                    title={color.name}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && onChange(area.key, color)}
                  >
                    <div className="color-swatch-check">
                      <CheckIcon size={14} color={color.light ? "#000" : "#fff"} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CustomerInfoForm({ info, onChange, errors, isSubmitting, currentStep, totalSteps, orderData }) {
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
            <span className="order-summary-value" style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {orderData.colors?.primary && (
                <span style={{ width: 18, height: 18, borderRadius: 4, background: orderData.colors.primary.hex, display: "inline-block", border: "1px solid rgba(255,255,255,0.2)" }} />
              )}
              {orderData.colors?.secondary && (
                <span style={{ width: 18, height: 18, borderRadius: 4, background: orderData.colors.secondary.hex, display: "inline-block", border: "1px solid rgba(255,255,255,0.2)" }} />
              )}
              {orderData.colors?.accent && (
                <span style={{ width: 18, height: 18, borderRadius: 4, background: orderData.colors.accent.hex, display: "inline-block", border: "1px solid rgba(255,255,255,0.2)" }} />
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

function SuccessScreen() {
  return (
    <div className="success-screen">
      <div className="success-icon">
        <CheckIcon size={42} color="#16a34a" />
      </div>
      <h2 className="success-title">Order Submitted!</h2>
      <p className="success-message">
        Thank you for your custom karting order! A dedicated designer will contact you within 24 hours with a mockup of your product. Check your email for confirmation details.
      </p>
      <Link
        href="/custom-karting-suit"
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
        Back to Custom Karting Suits
      </Link>
    </div>
  );
}

/* ============================================
   MAIN COMPONENT
   ============================================ */
export default function KartingOrderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [suitMockup, setSuitMockup] = useState(null);
  const [glovesMockup, setGlovesMockup] = useState(null);
  const [shoesMockup, setShoesMockup] = useState(null);
  const [colors, setColors] = useState({ primary: null, secondary: null, accent: null });
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "", phone: "" });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    setColors((prev) => ({ ...prev, [area]: color }));
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
      case "colors": return !!colors.primary;
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
        productType: "karting-suit",
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

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
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
