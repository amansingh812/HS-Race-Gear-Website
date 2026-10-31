"use client";
/**
 * MockupCarouselStep — coverflow carousel for the design-selection step.
 *
 * The centre design is shown large; the neighbours tilt away on either side.
 * Swipe, drag, click a side card, use the arrow buttons, or press ← / →.
 * Buttons below: Back · Select this design · Continue, then a description card.
 *
 * Rendered by MockupSelectionStep when it is given `variant="carousel"`, so
 * the order pages only change one prop. A "View all designs" link drops back
 * to the original grid for people who prefer to scan all 50 at once.
 *
 * Mockups may carry an optional `description` string; without one, a generic
 * line is shown.
 */

import React, { useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Keyboard } from "swiper/modules";

// Drawn with CSS borders (not an <svg>) — the theme's global styles were
// hiding the inline SVG icon, so this has no dependency on svg/fonts.
const Arrow = ({ dir }) => (
  <span className={`mockup-carousel-chevron mockup-carousel-chevron--${dir}`} aria-hidden="true" />
);

export default function MockupCarouselStep({
  mockups,
  selected,
  onSelect,
  title,
  subtitle,
  label = "Design",
  currentStep,
  totalSteps,
  onBack,
  onContinue,
  canGoBack = true,
  onShowGrid,
}) {
  const swiperRef = useRef(null);
  const startIndex = Math.max(0, selected ? mockups.findIndex((m) => m.id === selected.id) : 0);
  const [active, setActive] = useState(startIndex);
  const total = mockups.length;
  const current = mockups[active];
  const isSelected = selected?.id === current?.id;

  const goPrev = useCallback(() => {
    const s = swiperRef.current;
    if (!s) return;
    s.activeIndex === 0 ? s.slideTo(total - 1) : s.slidePrev();
  }, [total]);

  const goNext = useCallback(() => {
    const s = swiperRef.current;
    if (!s) return;
    s.activeIndex === total - 1 ? s.slideTo(0) : s.slideNext();
  }, [total]);

  return (
    <div className="step-content" key={label}>
      <div className="step-header">
        <div className="step-badge">Step {currentStep} of {totalSteps}</div>
        <h2 className="step-title">{title}</h2>
        <p className="step-subtitle">{subtitle}</p>
      </div>

      <div className="mockup-carousel">
        <button type="button" className="mockup-carousel-arrow mockup-carousel-arrow--left" onClick={goPrev} aria-label="Previous design">
          <Arrow dir="left" />
        </button>
        <button type="button" className="mockup-carousel-arrow mockup-carousel-arrow--right" onClick={goNext} aria-label="Next design">
          <Arrow dir="right" />
        </button>

        <Swiper
          modules={[EffectCoverflow, Keyboard]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          initialSlide={startIndex}
          slideToClickedSlide
          keyboard={{ enabled: true }}
          speed={450}
          coverflowEffect={{ rotate: 38, stretch: 0, depth: 180, modifier: 1, slideShadows: true }}
          onSwiper={(s) => { swiperRef.current = s; }}
          onSlideChange={(s) => setActive(s.activeIndex)}
          dir="ltr"
          className="mockup-carousel-swiper"
        >
          {mockups.map((m, i) => (
            <SwiperSlide key={m.id} className="mockup-carousel-slide">
              {m.image ? (
                <img
                  src={m.image}
                  alt={m.name}
                  // Only the first few load eagerly; the rest load as they approach the centre.
                  loading={Math.abs(i - startIndex) <= 2 ? "eager" : "lazy"}
                  draggable={false}
                />
              ) : (
                <span>{String(m.number).padStart(2, "0")}</span>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mockup-carousel-meta">
        <span className="mockup-carousel-count">{current?.name} · {active + 1} of {total}</span>
        {onShowGrid && (
          <button type="button" className="mockup-carousel-gridlink" onClick={onShowGrid}>
            View all {total} designs
          </button>
        )}
      </div>

      <div className="mockup-carousel-actions">
        {canGoBack && onBack ? (
          <button type="button" className="mockup-carousel-btn mockup-carousel-btn--side" onClick={onBack}>
            Back
          </button>
        ) : (
          <span className="mockup-carousel-btn-spacer" />
        )}
        <button
          type="button"
          className={`mockup-carousel-btn mockup-carousel-btn--main${isSelected ? " is-selected" : ""}`}
          onClick={() => onSelect(current)}
        >
          {isSelected ? "Design selected ✓" : "Select this design"}
        </button>
        <button
          type="button"
          className="mockup-carousel-btn mockup-carousel-btn--side"
          onClick={onContinue}
          disabled={!selected}
          title={selected ? undefined : "Select a design to continue"}
        >
          Continue
        </button>
      </div>

      <div className="mockup-carousel-desc">
        <h3 className="mockup-carousel-desc-title"><span>Description</span></h3>
        <p>
          {current?.description ||
            `${current?.name} is a ready-made layout you can make your own. Tell us your colors in the next steps and our designers apply them, along with your name, number and sponsor logos, to this exact design.`}
        </p>
      </div>
    </div>
  );
}
