import React from "react";
import Image from "next/image";
export default function About() {
  return (
    <section className="flat-spacing-3 pb-0">
      <div className="container">
        <div className="flat-title-2 d-xl-flex justify-content-xl-between">
          <div className="box-title">
            <p className="display-lg-2 fw-medium">Driven by Safety. Fueled by Passion.</p>
            <p className="text-xl">Premium SFI Custom Racegear for Champions</p>
          </div>
          <div className="box-text">
            <p className="text-md">
              At <span className="fw-medium">HS Race Gear</span>, we bring you
              premium SFI certified racing suits and custom motorsports apparel
              <br className="d-none d-xl-block" />
              designed for racers of all levels. With over 10 years of experience,
              we cater to <br className="d-none d-xl-block" />
              drag racing, karting, club events, and professional motorsport enthusiasts
              who demand safety, quality, and performance.
            </p>
          </div>
        </div>
        <div className="image radius-16 overflow-hidden">
          {/* IMAGE NEEDED: Hero banner showing racing suits or racing action
              Size: 1440 x 502 pixels
              Description: Wide banner image featuring HS Race Gear racing suits in action, 
              pit crew scene, or professional product display. Should convey speed, safety, and quality. */}
          <Image
            src="/images/section/about.webp"
            alt="HS Race Gear SFI Certified Racing Suits and Motorsports Apparel"
            className="lazyload"
            width={1440}
            height={502}
          />
        </div>
      </div>
    </section>
  );
}
