"use client";
/**
 * MockupSelectionStep — shared design-selection grid with sticky bar.
 *
 * Used on all 5 custom-order pages (race suit, karting, powerboat, gloves,
 * shoes). Replaces the per-page inline MockupSelection functions.
 *
 * Features added 2026-09:
 * - Sticky bottom bar appears when a design is selected, showing thumbnail +
 *   Back / Continue so the user never has to scroll past 50 cards.
 * - Optional "See More" pagination (pass `paginate` prop).
 * - Lightbox still available via zoom icon; lightbox itself now has nav
 *   buttons (handled in MockupLightbox).
 */

import React, { useState, useCallback } from "react";
import MockupLightbox from "@/components/hsRaceGear/customGear/MockupLightbox";

/* ---- Tiny SVG icons (inlined to avoid extra deps) ---- */
const CheckIcon = ({ size = 16, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const ArrowRight = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ArrowLeft = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

/**
 * @param {Object}   props
 * @param {Array}    props.mockups       - array of { id, name, number, image }
 * @param {Object}   props.selected      - currently selected mockup (or null)
 * @param {Function} props.onSelect      - called with the mockup object
 * @param {string}   props.title         - e.g. "Select Your Suit Design"
 * @param {string}   props.subtitle      - description text
 * @param {string}   props.label         - lightbox label e.g. "Suit Design"
 * @param {number}   props.currentStep   - 1-based step number
 * @param {number}   props.totalSteps
 * @param {boolean}  [props.paginate=true]  - show "See More" pagination
 * @param {number}   [props.pageSize=12]    - items per page
 * @param {Function} props.onBack        - called when Back pressed
 * @param {Function} props.onContinue    - called when Continue pressed
 * @param {boolean}  [props.canGoBack=true] - show/hide Back button
 */
export default function MockupSelectionStep({
  mockups,
  selected,
  onSelect,
  title,
  subtitle,
  label = "Design",
  currentStep,
  totalSteps,
  paginate = true,
  pageSize = 12,
  onBack,
  onContinue,
  canGoBack = true,
}) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [zoomIndex, setZoomIndex] = useState(null);

  const visibleMockups = paginate ? mockups.slice(0, visibleCount) : mockups;
  const hasMore = paginate && visibleCount < mockups.length;

  const handleZoom = useCallback((e, idx) => {
    e.stopPropagation();
    setZoomIndex(idx);
  }, []);

  // When continuing from lightbox, close it and fire onContinue
  const handleLightboxContinue = useCallback(() => {
    setZoomIndex(null);
    onContinue?.();
  }, [onContinue]);

  const handleLightboxBack = useCallback(() => {
    setZoomIndex(null);
    onBack?.();
  }, [onBack]);

  // Select from lightbox — select the currently viewed design
  const handleLightboxSelect = useCallback((idx) => {
    if (idx !== null && idx >= 0 && idx < mockups.length) {
      onSelect(mockups[idx]);
    }
  }, [mockups, onSelect]);

  return (
    <div className="step-content" key={label}>
      <div className="step-header">
        <div className="step-badge">Step {currentStep} of {totalSteps}</div>
        <h2 className="step-title">{title}</h2>
        <p className="step-subtitle">{subtitle}</p>
      </div>

      <div className="mockup-grid">
        {visibleMockups.map((mockup, idx) => {
          const isSelected = selected?.id === mockup.id;
          return (
            <div
              key={mockup.id}
              className={`mockup-card ${isSelected ? "selected" : ""}`}
              onClick={() => setZoomIndex(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setZoomIndex(idx)}
              style={{ cursor: "zoom-in" }}
            >
              <div className="mockup-card-image">
                {mockup.image ? (
                  <img src={mockup.image} alt={mockup.name} loading="lazy" />
                ) : (
                  <span>{String(mockup.number).padStart(2, "0")}</span>
                )}
              </div>
              <div className="mockup-card-footer">
                <div className="mockup-card-label">{mockup.name}</div>
                <button
                  className={`mockup-card-select-btn ${isSelected ? "mockup-card-select-btn--active" : ""}`}
                  onClick={(e) => { e.stopPropagation(); onSelect(mockup); }}
                  type="button"
                  aria-label={isSelected ? `${mockup.name} selected` : `Select ${mockup.name}`}
                >
                  {isSelected ? (
                    <><CheckIcon size={14} /> Selected</>
                  ) : (
                    "Select"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div className={`mockup-see-more-container${selected ? " mockup-see-more-container--sticky-active" : ""}`}>
          <button
            className="mockup-see-more-btn"
            onClick={() => setVisibleCount((prev) => prev + pageSize)}
          >
            See More Designs ({mockups.length - visibleCount} remaining)
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      )}

      {/* Sticky selection bar — appears when a design is chosen */}
      {selected && (
        <div className="mockup-sticky-bar">
          <div className="mockup-sticky-info">
            {selected.image && (
              <img
                src={selected.image}
                alt={selected.name}
                className="mockup-sticky-thumb"
              />
            )}
            <span className="mockup-sticky-name">{selected.name} selected</span>
          </div>
          <div className="mockup-sticky-actions">
            {canGoBack && onBack && (
              <button
                className="mockup-sticky-back"
                onClick={onBack}
                type="button"
              >
                <ArrowLeft size={12} /> Back
              </button>
            )}
            {onContinue && (
              <button
                className="mockup-sticky-continue"
                onClick={onContinue}
                type="button"
              >
                Continue <ArrowRight size={12} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Lightbox — renders via portal */}
      <MockupLightbox
        mockups={mockups}
        openIndex={zoomIndex}
        onChange={setZoomIndex}
        label={label}
        onContinue={selected ? handleLightboxContinue : undefined}
        onBack={canGoBack ? handleLightboxBack : undefined}
        onSelect={handleLightboxSelect}
        selectedId={selected?.id}
      />
    </div>
  );
}
