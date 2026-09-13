"use client";
/**
 * PackageConfigurator — replaces the old vertical package list with a
 * two-step configurator: pick your layer (if applicable) → toggle add-ons.
 *
 * Everything fits in one viewport. Price updates live.
 *
 * Props:
 *  - layers:    [{id, label, cert, basePrice}] — the suit tier options.
 *                If only 1 layer, the layer picker is hidden (auto-selected).
 *  - addons:    [{key, label, cert, price}] — toggle-able extras (gloves, shoes).
 *  - packages:  flattened array of all original package objects — used to look up
 *               the matching {id, name, price, includes} when user configures.
 *  - selected:  currently selected package object (or null)
 *  - onSelect:  called with the matched package object
 *  - currentStep, totalSteps — for the step badge
 *  - onContinue — called when Continue pressed (optional, for auto-advance)
 */

import React, { useState, useCallback, useEffect, useMemo } from "react";

/* ---- Tiny SVG icons ---- */
const CheckIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const ArrowRight = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/**
 * Find the matching package from the flat list given a layer id and addon keys.
 */
function findPackage(packages, layerId, addonKeys) {
  // Build the expected includes array
  const includes = ["suit"];
  if (addonKeys.includes("gloves")) includes.push("gloves");
  if (addonKeys.includes("shoes")) includes.push("shoes");

  // Match by includes content + layer prefix in id
  return packages.find((pkg) => {
    const pkgIncludes = [...pkg.includes].sort();
    const targetIncludes = [...includes].sort();
    if (pkgIncludes.length !== targetIncludes.length) return false;
    if (!pkgIncludes.every((v, i) => v === targetIncludes[i])) return false;
    // If multiple layers exist, also match by layer prefix
    if (layerId) return pkg.id.startsWith(layerId);
    return true;
  });
}

export default function PackageConfigurator({
  layers,
  addons,
  packages,
  selected,
  onSelect,
  currentStep,
  totalSteps,
  onContinue,
}) {
  const hasMultipleLayers = layers.length > 1;

  // Derive initial state from current selection (if any)
  const [selectedLayer, setSelectedLayer] = useState(() => {
    if (selected) {
      // Find which layer matches the selected package
      const match = layers.find((l) => selected.id.startsWith(l.id));
      return match ? match.id : layers[0].id;
    }
    return hasMultipleLayers ? null : layers[0].id;
  });

  const [activeAddons, setActiveAddons] = useState(() => {
    if (selected) {
      const keys = [];
      if (selected.includes.includes("gloves")) keys.push("gloves");
      if (selected.includes.includes("shoes")) keys.push("shoes");
      return keys;
    }
    return [];
  });

  // Current layer object
  const currentLayer = useMemo(
    () => layers.find((l) => l.id === selectedLayer),
    [layers, selectedLayer]
  );

  // Computed price
  const totalPrice = useMemo(() => {
    if (!currentLayer) return null;
    return (
      currentLayer.basePrice +
      addons
        .filter((a) => activeAddons.includes(a.key))
        .reduce((sum, a) => sum + a.price, 0)
    );
  }, [currentLayer, addons, activeAddons]);

  // Package summary label
  const summaryLabel = useMemo(() => {
    if (!currentLayer) return "Select a layer to begin";
    let label = currentLayer.label;
    const addonLabels = addons
      .filter((a) => activeAddons.includes(a.key))
      .map((a) => a.label.toLowerCase());
    if (addonLabels.length > 0) {
      label += " + " + addonLabels.join(" + ");
    }
    return label;
  }, [currentLayer, addons, activeAddons]);

  // When config changes, find and select the matching package
  useEffect(() => {
    if (!selectedLayer) return;
    const match = findPackage(packages, selectedLayer, activeAddons);
    if (match && match.id !== selected?.id) {
      onSelect(match);
    }
  }, [selectedLayer, activeAddons, packages, onSelect, selected?.id]);

  const handleLayerSelect = useCallback((layerId) => {
    setSelectedLayer(layerId);
  }, []);

  const handleAddonToggle = useCallback((key) => {
    setActiveAddons((prev) => {
      if (prev.includes(key)) {
        // Removing an addon — if removing gloves, also remove shoes
        if (key === "gloves") return prev.filter((k) => k !== "gloves" && k !== "shoes");
        return prev.filter((k) => k !== key);
      } else {
        // Adding an addon — if adding shoes, also add gloves
        if (key === "shoes" && !prev.includes("gloves")) return [...prev, "gloves", "shoes"];
        return [...prev, key];
      }
    });
  }, []);

  return (
    <div className="step-content">
      <div className="step-header">
        <div className="step-badge">Step {currentStep} of {totalSteps}</div>
        <h2 className="step-title">Choose Your Package</h2>
        <p className="step-subtitle">
          {hasMultipleLayers
            ? "Pick your suit layer and add accessories."
            : "Select your accessories to build your custom gear package."}
        </p>
      </div>

      {/* Layer Picker — only if multiple layers */}
      {hasMultipleLayers && (
        <div className="pkg-section">
          <div className="pkg-section-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
            </svg>
            Choose your suit layer
          </div>
          <div className="pkg-layers-grid">
            {layers.map((layer) => {
              const isActive = selectedLayer === layer.id;
              return (
                <button
                  key={layer.id}
                  className={`pkg-layer-card ${isActive ? "pkg-layer-card--active" : ""}`}
                  onClick={() => handleLayerSelect(layer.id)}
                  type="button"
                >
                  <div className="pkg-layer-name">{layer.label}</div>
                  {layer.cert && <div className="pkg-layer-cert">{layer.cert}</div>}
                  <div className="pkg-layer-price">${layer.basePrice}</div>
                  {isActive && (
                    <div className="pkg-layer-check">
                      <CheckIcon size={14} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Add-ons */}
      {addons.length > 0 && (
        <div className="pkg-section">
          <div className="pkg-section-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add accessories
            <span className="pkg-section-optional">(optional)</span>
          </div>
          <div className="pkg-addons-grid">
            {addons.map((addon) => {
              const isActive = activeAddons.includes(addon.key);
              return (
                <button
                  key={addon.key}
                  className={`pkg-addon-card ${isActive ? "pkg-addon-card--active" : ""}`}
                  onClick={() => handleAddonToggle(addon.key)}
                  type="button"
                >
                  <div className={`pkg-addon-checkbox ${isActive ? "pkg-addon-checkbox--checked" : ""}`}>
                    {isActive && <CheckIcon size={12} />}
                  </div>
                  <div className="pkg-addon-info">
                    <div className="pkg-addon-name">{addon.label}</div>
                    <div className="pkg-addon-meta">
                      {addon.cert && <span>{addon.cert} · </span>}
                      +${addon.price}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Summary Bar */}
      {selectedLayer && (
        <div className="pkg-summary-bar">
          <div className="pkg-summary-info">
            <div className="pkg-summary-label">Your package</div>
            <div className="pkg-summary-name">{summaryLabel}</div>
          </div>
          <div className="pkg-summary-right">
            <div className="pkg-summary-price">${totalPrice}</div>
            {onContinue && (
              <button
                className="pkg-summary-continue"
                onClick={onContinue}
                type="button"
              >
                Continue <ArrowRight size={12} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
