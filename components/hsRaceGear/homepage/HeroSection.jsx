"use client";
import React from "react";
import Link from "next/link";
import { getImageProps } from "next/image";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Slides 2 and 3 have their copy baked into the artwork, so on desktop they
// render image-only (overlay: false). On mobile the baked-in text is too small
// to read, so every slide shows its heading + CTA in a panel under the image.
const heroSlides = [
  {
    heading: "Custom Racing Suits — SFI Certified",
    subtitle:
      "Handcrafted custom racing suits built to your exact measurements. SFI 3.2A/1 and 3.2A/5 certified. Unlimited colors, logos, and designs. Free shipping on custom suits.",
    cta: "Design Your Suit",
    link: "/custom-race-suit",
    isH1: true,
    overlay: true,
    alt: "Racer celebrating in a custom HS Race Gear SFI-certified racing suit",
    web: "/images/banner/newBanner/banner-1-web.png",
    mob: "/images/banner/newBanner/banner-1-mob.png",
  },
  {
    heading: "Halloween Sale — 10% Off",
    subtitle: "Get in contact with us to claim 10% off your custom racing gear.",
    cta: "Contact Us",
    link: "/contact-us",
    isH1: false,
    overlay: false,
    alt: "HS Race Gear Halloween Sale — 10% off. Get in contact with us to avail this discount.",
    web: "/images/banner/newBanner/banner-2-web.png",
    mob: "/images/banner/newBanner/banner-2-mob.png",
  },
  {
    heading: "Premium Nomex Fabric",
    subtitle:
      "Lightweight, durable, race ready — reinforced shoulders, flexible stretch panels, secure wrist cuffs and an ergonomic fit.",
    cta: "Design Your Suit",
    link: "/custom-race-suit",
    isH1: false,
    overlay: false,
    alt: "Premium Nomex racing suit features: comfortable neck design, reinforced shoulders, adjustable waist belt, flexible stretch panels, secure wrist cuffs, ergonomic fit",
    web: "/images/banner/newBanner/banner-3-web.png",
    mob: "/images/banner/newBanner/banner-3-mob.png",
  },
];

// Higher than the default 75 so the text baked into the banners stays crisp.
const IMAGE_QUALITY = 90;

function HeroImage({ web, mob, alt, priority }) {
  const common = { alt, fill: true, sizes: "100vw", quality: IMAGE_QUALITY };
  const {
    props: { srcSet: mobSrcSet },
  } = getImageProps({ ...common, src: mob });
  const {
    props: { srcSet: webSrcSet, style, ...imgProps },
  } = getImageProps({
    ...common,
    src: web,
    ...(priority ? { fetchPriority: "high", loading: "eager" } : {}),
  });

  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobSrcSet} />
      <source media="(min-width: 768px)" srcSet={webSrcSet} />
      <img {...imgProps} style={{ ...style, objectFit: "cover" }} className="hero-racing__image" />
    </picture>
  );
}

export default function HeroSection() {
  return (
    <section className="hero-racing">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        dir="ltr"
      >
        {heroSlides.map((slide, index) => {
          const HeadingTag = slide.isH1 ? "h1" : "h2";
          return (
            <SwiperSlide key={index}>
              <div
                className={`hero-racing__slide ${
                  slide.overlay ? "hero-racing__slide--overlay" : "hero-racing__slide--art"
                }`}
              >
                <div className="hero-racing__bg">
                  <HeroImage
                    web={slide.web}
                    mob={slide.mob}
                    alt={slide.alt}
                    priority={index === 0}
                  />
                  {!slide.overlay && (
                    <Link
                      href={slide.link}
                      className="hero-racing__slide-link"
                      aria-label={slide.heading}
                    />
                  )}
                </div>
                {slide.overlay && <div className="hero-racing__overlay" />}

                <div className="hero-racing__body">
                  <div className="container">
                    <div className="hero-racing__content">
                      <HeadingTag className="hero-racing__heading">{slide.heading}</HeadingTag>
                      <p className="hero-racing__subtitle">{slide.subtitle}</p>
                      <Link href={slide.link} className="hero-racing__btn">
                        {slide.cta}
                        <i className="icon icon-arr-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
