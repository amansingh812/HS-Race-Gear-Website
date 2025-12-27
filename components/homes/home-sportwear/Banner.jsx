import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Banner() {
  return (
    <section className="s-banner-colection banner-cls-sportwear style-abs-2 flat-spacing-3">
      <div className="container">
        <div className="banner-content">
          <Link href={`/shop-default`} className="image d-block">
            <Image
              alt="/images/banner/sportwear.jpg"
              className="lazyload"
              src="/images/banner/sportwear.jpg"
              width={1440}
              height={675}
            />
          </Link>
          <div className="box-content">
            <div className="box-title-banner wow fadeInUp">
              <h4 className="title display-md fw-medium">
                Elevate Your Performance
              </h4>
              <p className="sub text-md">
                Shop the latest activewear designed for <br />
                maximum comfort and style.
              </p>
            </div>
            <div className="box-btn-banner wow fadeInUp">
              <Link href={`/shop-default`} className="tf-btn animate-btn">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
