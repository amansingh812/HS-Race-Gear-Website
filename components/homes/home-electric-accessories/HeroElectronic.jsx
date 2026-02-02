"use client";
import { sliderItems4 } from "@/data/heroSlides";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HeroElectronic() {
  const item = sliderItems4[0];

  return (
    <section className="tf-slideshow slider-electric-access slider-default pb-0" style={{ margin: 0, padding: "15px 0 0 0" }}>
      <div className="slider-wrap" style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
        <div className="image">
          <Image
            src={item.src}
            alt="hero"
            className="lazyload"
            width={1440}
            height={621}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="box-content" style={{ position: "absolute", top: 500, right: 0 }}>
          <div className="container">
            <div className="row">
              <div className="col-9 col-sm-6 col-xl-5 ms-auto">
                <div className="content-slider">
                  <div className="box-title-slider">
                    <h4 className="heading display-md fw-medium" style={{ color: "white", padding: "10px" }}>
                      {item.title}
                    </h4>
                  </div>
                  <div className="box-btn-slider">
                    <Link
                      href={`/shop-default`}
                      className="tf-btn btn-red animate-btn"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
