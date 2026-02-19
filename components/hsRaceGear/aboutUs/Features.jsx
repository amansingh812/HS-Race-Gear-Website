import React from "react";
import Image from "next/image";

export default function Features() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="flat-title-2 text-center">
          <p className="display-md-2 fw-medium">Why Choose HS Race Gear</p>
          <p className="text-md text-main">
            Our products are crafted with precision and engineered for maximum fire protection. We push the boundaries of{" "}
            <br className="d-none d-lg-block" />
            motorsport safety, delivering SFI certified racing gear that inspires confidence on and off the track.
          </p>
        </div>
        <div className="row">
          <div className="col-xl-7 col-md-6">
            <ul className="list-esd d-md-flex flex-md-column justify-content-md-center h-100">
              <li className="item">
                <h6>Safety First — Built to SFI Standards</h6>
                <p className="text-md">
                  At HS Race Gear, we are dedicated to upholding the highest safety
                  standards. Our SFI certified racing suits adhere to rigorous specifications,
                  ensuring fire-resistant protection from single-layer SFI 3.2A/1 to multi-layer certified suits.
                </p>
              </li>
              <li className="item">
                <h6>Uncompromising Quality That Lasts</h6>
                <p className="text-md">
                  Every stitch, seam, and component is crafted with durability in mind.
                  Our commitment to high-quality motorsport materials ensures gear that
                  performs lap after lap, race after race.
                </p>
              </li>
              <li className="item">
                <h6>Custom Options for Every Racer</h6>
                <p className="text-md">
                  Stand out on the grid with custom SFI racing suits, personalized embroidery,
                  team branding, and unique color combinations tailored to your identity.
                  From drag racing to professional series — we've got you covered.
                </p>
              </li>
            </ul>
          </div>
          <div className="col-xl-5 col-md-6">
            <div className="image radius-16 overflow-hidden w-100 h-100">
              {/* IMAGE NEEDED: Racing suit detail or racer wearing gear
                  Size: 586 x 586 pixels (square)
                  Description: Close-up of SFI certified racing suit showing quality stitching,
                  SFI certification patch, or racer wearing HS Race Gear. Should emphasize quality and safety. */}
              <Image
                src="/images/section/about-2.webp"
                alt="HS Race Gear SFI Certified Racing Suit Quality Detail"
                className="lazyload w-100 h-100 object-fit-cover"
                width={586}
                height={586}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
