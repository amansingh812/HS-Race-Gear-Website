"use client";
// Shared lightbox modal for custom-gear mockup sliders.
// Used on /custom-race-suit, /custom-karting-suit, /custom-powerboat-suit,
// /custom-gloves, /custom-shoes, and the order-page mockup selection step.
// Added 2026-06-17. Updated 2026-06-17 to render via React Portal so it
// escapes any parent that creates a containing block (e.g. transform on
// .step-content broke fixed-position centering on the order page).

import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

/**
 * MockupLightbox
 * @param {Array<{src: string, alt: string}>} mockups - the array of images
 * @param {number|null} openIndex - currently open index, or null when closed
 * @param {(idx: number|null) => void} onChange - called to set the open index
 * @param {string} label - aria-label / counter label e.g. "Custom Race Suit"
 */
export default function MockupLightbox({ mockups, openIndex, onChange, label = "Design" }) {
  const total = mockups.length;
  const close = useCallback(() => onChange(null), [onChange]);
  const [mounted, setMounted] = useState(false);

  // Mount detection for SSR-safe portal
  useEffect(() => { setMounted(true); }, []);

  const goPrev = useCallback(() => {
    if (openIndex === null) return;
    onChange((openIndex - 1 + total) % total);
  }, [openIndex, total, onChange]);

  const goNext = useCallback(() => {
    if (openIndex === null) return;
    onChange((openIndex + 1) % total);
  }, [openIndex, total, onChange]);

  // Keyboard navigation: Esc, ←, →
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, close, goPrev, goNext]);

  // Body scroll lock while open
  useEffect(() => {
    if (openIndex === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [openIndex]);

  if (openIndex === null || !mounted) return null;
  const current = mockups[openIndex];

  // Support both shape conventions: {src, alt} (suit sliders) and
  // {image, name} (order-page mockup cards). Normalize for rendering.
  const src = current.src || current.image;
  const alt = current.alt || current.name || `${label} ${openIndex + 1}`;

  const overlay = (
    <div
      className="mockup-lightbox"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={`${label} preview`}
    >
      <button
        type="button"
        className="mockup-lightbox-close"
        onClick={(e) => { e.stopPropagation(); close(); }}
        aria-label="Close preview"
      >
        {/* Explicit white stroke + inline style — defeats any global svg rule
            that might otherwise hide currentColor-based icons. */}
        <svg
          viewBox="0 0 24 24"
          width="26"
          height="26"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
          style={{ stroke: "#ffffff", color: "#ffffff", display: "block" }}
        >
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>

      <button
        type="button"
        className="mockup-lightbox-nav mockup-lightbox-prev"
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        aria-label="Previous design"
      >
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ stroke: "#ffffff", color: "#ffffff", display: "block" }}
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        type="button"
        className="mockup-lightbox-nav mockup-lightbox-next"
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        aria-label="Next design"
      >
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ stroke: "#ffffff", color: "#ffffff", display: "block" }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div
        className="mockup-lightbox-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mockup-lightbox-image-wrap">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 90vw"
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        <div className="mockup-lightbox-meta">
          <span className="mockup-lightbox-counter">{openIndex + 1} / {total}</span>
          <span className="mockup-lightbox-title">{alt}</span>
        </div>
      </div>
    </div>
  );

  // Portal to document.body — escapes any parent containing block created
  // by transform/perspective/filter/will-change CSS on ancestors.
  return createPortal(overlay, document.body);
}

/**
 * Renders a clickable slider item with the zoom-hint icon overlay.
 * Use inside the slider's .mockup-track to keep the same UI everywhere.
 */
export function MockupSliderItem({ mockup, onClick, ariaLabel, itemClassName = "race-suit-mockup-item" }) {
  return (
    <button
      type="button"
      className={itemClassName}
      onClick={onClick}
      aria-label={ariaLabel || `Open ${mockup.alt} in full-screen preview`}
    >
      <Image
        src={mockup.src}
        alt={mockup.alt}
        width={472}
        height={333}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <span className="mockup-zoom-hint" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ stroke: "#ffffff", color: "#ffffff", display: "block" }}
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="8" y1="11" x2="14" y2="11" />
          <line x1="11" y1="8" x2="11" y2="14" />
        </svg>
      </span>
    </button>
  );
}
