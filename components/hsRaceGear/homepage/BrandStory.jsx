import React from "react";
import Link from "next/link";

export default function BrandStory() {
  return (
    <section className="brand-story">
      <div className="container">
        <div className="brand-story__inner">
          <h2 className="brand-story__title">
            About HS Race Gear — Premium Custom Racing Gear Built for Champions
          </h2>
          <p className="brand-story__text">
            HS Race Gear is a leading provider of custom-fit, SFI-certified racing suits, gloves,
            shoes, and motorsport accessories. With over a decade of experience in the racing
            industry, we specialize in crafting made-to-order racing gear using premium Nomex
            fire-resistant materials that meet SFI 3.2A/1, SFI 3.2A/5, and SFI 3.3/5 safety standards.
          </p>
          <p className="brand-story__text">
            Whether you are a professional drag racer, a karting competitor, or a weekend track day
            enthusiast, our custom measurement process ensures every suit fits your body perfectly.
            Choose from unlimited color combinations, logo placements, and embroidery options to
            create gear that represents your identity on the grid. Every order includes unlimited
            mockup revisions so you get exactly what you envisioned.
          </p>
          <p className="brand-story__text">
            Trusted by racers across the United States and beyond, HS Race Gear combines safety,
            quality, and personalization in every product. From single-layer SFI-rated suits to
            multi-layer SFI-certified race wear, we deliver premium motorsport safety equipment
            with fast turnaround times and expert support available 24/7.
          </p>
          <Link href="/about-us" className="brand-story__cta">
            Learn More About Us <i className="icon icon-arr-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
