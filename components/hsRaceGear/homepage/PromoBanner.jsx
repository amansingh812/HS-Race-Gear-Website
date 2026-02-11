import React from "react";
import Link from "next/link";
import Image from "next/image";

const features = [
  "Choose from unlimited colors, logos, and embroidery options",
  "Custom-tailored to your exact body measurements",
  "SFI 3.2A/1 and SFI 3.2A/5 certified for maximum protection",
];

export default function PromoBanner() {
  return (
    <section className="promo-banner">
      <div className="promo-banner__wrapper">
        {/* Image */}
        <div className="promo-banner__image">
          <Image
            src="/images/home/left-side image.png"
            alt="Custom Race Suit"
            width={960}
            height={600}
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        {/* Content */}
        <div className="promo-banner__content">
          <span className="promo-banner__label">Custom Gear</span>
          <h2 className="promo-banner__title">
            Your Custom Race Suit, Your Way
          </h2>
          <p className="promo-banner__desc">
            Design a racing suit that is uniquely yours. From drag racing to karting,
            our custom-fit process ensures safety, comfort, and style that matches your identity.
          </p>
          <ul className="promo-banner__features">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <Link href="/custom-race-suit" className="promo-banner__cta">
            Start Your Custom Order
            <i className="icon icon-arr-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
