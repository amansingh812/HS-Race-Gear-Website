"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

/* ───────────────────────────────────────
   TOP HERO BANNERS  (above the fold – 2 banners)
   Image dimensions guide:
     • Full-width banner : 1920 × 700 px  (2.74 : 1)
     • Half-width banner : 960  × 700 px  (1.37 : 1)
   ─────────────────────────────────────── */
const topBanners = [
  {
    id: "deals",
    label: "Exclusive Offers",
    heading: "Unbeatable Deals on Racing Gear",
    description:
      "Save big on SFI certified suits, gloves, shoes and accessories. Limited-time offers you don't want to miss.",
    cta: "View Deals",
    link: "/RacegearDeals",
    image: "/images/home/hero_deals.webp",
    // placeholder dimensions for the image you need to add
    placeholder: "960 × 700",
  },
  {
    id: "custom-suit",
    label: "Made For You",
    heading: "Design Your Custom Race Suit",
    description:
      "Unlimited color combinations, custom embroidery, and a perfect fit built from your measurements. Stand out on the track.",
    cta: "Start Designing",
    link: "/custom-race-suit",
    image: "/images/home/hero_custom_suit.webp",
    placeholder: "960 × 700",
  },
];

/* ───────────────────────────────────────
   MIDDLE HERO BANNERS  (replace CertificationTrust – 2 banners)
   Image dimensions guide:
     • Full-width tall   : 1920 × 800 px  (2.4 : 1)
     • Half-width square : 960  × 700 px  (1.37 : 1)
   ─────────────────────────────────────── */
const middleBanners = [
  {
    id: "pricing",
    label: "Transparent Pricing",
    heading: "Premium Quality, Honest Pricing",
    description:
      "Explore our competitive pricing tiers — from entry-level to pro. No hidden fees. Get exactly what you pay for.",
    cta: "See Pricing",
    link: "/StandardPricing",
    image: "/images/home/hero_pricing.webp",
    placeholder: "960 × 700",
  },
  {
    id: "shop-suits",
    label: "Shop Collection",
    heading: "Browse Our Race Suit Collection",
    description:
      "From drag racing to karting, find the perfect suit from our ready-to-ship and custom-order catalog.",
    cta: "Shop Race Suits",
    link: "/shop",
    image: "/images/home/hero_shop.webp",
    placeholder: "960 × 700",
  },
];

function BannerCard({ banner, size = "half" }) {
  const isFullWidth = size === "full";

  return (
    <div
      className={`hero-banner-card hero-banner-card--${size} hero-banner-card--${banner.id}`}
    >
      <Link href={banner.link} className="hero-banner-card__link">
        {/* Background Image */}
        <div className="hero-banner-card__bg">
          {banner.image ? (
            <Image
              src={banner.image}
              alt={banner.heading}
              fill
              sizes={isFullWidth ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="img-placeholder" style={{ fontSize: "1rem" }}>
              {banner.placeholder}
            </div>
          )}
        </div>

        {/* Overlay */}
        <div className="hero-banner-card__overlay" />

        {/* Content */}
        <div className="hero-banner-card__content">
          <span className="hero-banner-card__label">{banner.label}</span>
          <h3 className="hero-banner-card__heading">{banner.heading}</h3>
          <p className="hero-banner-card__desc">{banner.description}</p>
          <span className="hero-banner-card__cta">
            {banner.cta}
            <svg
              className="hero-banner-card__arrow"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </div>
  );
}

/* Top hero banners — placed after AnnouncementStrip */
export function HeroBannersTop() {
  return (
    <section className="hero-banners hero-banners--top">
      <div className="container">
        <div className="hero-banners__grid">
          {topBanners.map((banner) => (
            <BannerCard key={banner.id} banner={banner} size="half" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* Middle hero banners — replaces CertificationTrust */
export function HeroBannersMiddle() {
  return (
    <section className="hero-banners hero-banners--middle">
      <div className="container">
        <div className="hero-banners__section-header">
          <h2 className="hero-banners__section-title">Explore HS Race Gear</h2>
          <p className="hero-banners__section-subtitle">
            Everything you need for race day — from custom gear to unbeatable deals
          </p>
        </div>
        <div className="hero-banners__grid">
          {middleBanners.map((banner) => (
            <BannerCard key={banner.id} banner={banner} size="half" />
          ))}
        </div>
      </div>
    </section>
  );
}
