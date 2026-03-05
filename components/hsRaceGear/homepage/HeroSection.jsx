"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const heroSlides = [
  {
    heading: "Custom Racing Suits Built to Your Specs",
    subtitle:
      "Handcrafted, SFI-certified racing suits tailored to your exact measurements. Unlimited colors, logos, and designs.",
    cta: "Design Your Suit",
    link: "/custom-race-suit",
    isH1: true,
    image: "/images/home/hs_hero_1.webp",
  },
  {
    heading: "SFI Certified Racing Gear",
    subtitle:
      "From gloves to shoes, every piece meets the highest international safety standards for professional motorsport.",
    cta: "Shop Now",
    link: "/shop",
    isH1: false,
    image: "/images/home/hs_hero_2.webp",
  },
  {
    heading: "Precision Fit. Maximum Protection.",
    subtitle:
      "Our custom measurement process ensures your gear fits perfectly — because in racing, every detail matters.",
    cta: "Get Measured",
    link: "/custom-measurement",
    isH1: false,
    image: "/images/slider/fashion/hero_cars.webp",
  },
];

export default function HeroSection() {
  return (
    <section className="hero-racing">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        dir="ltr"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="hero-racing__slide">
              {/* Background Image or Placeholder */}
              <div className="hero-racing__bg">
                {slide.image ? (
                  <Image
                    src={slide.image}
                    alt={slide.heading}
                    fill
                    className="hero-racing__image"
                    priority={index === 0}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div className="img-placeholder" style={{ fontSize: "1.1rem" }}>
                    1920 x 800
                  </div>
                )}
              </div>
              <div className="hero-racing__overlay" />

              {/* Content */}
              <div className="container">
                <div className="hero-racing__content">
                  {slide.isH1 ? (
                    <h1 className="hero-racing__heading">
                      {slide.heading}
                    </h1>
                  ) : (
                    <h2 className="hero-racing__heading">
                      {slide.heading}
                    </h2>
                  )}
                  <p className="hero-racing__subtitle">{slide.subtitle}</p>
                  <Link href={slide.link} className="hero-racing__btn">
                    {slide.cta}
                    <i className="icon icon-arr-right" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
