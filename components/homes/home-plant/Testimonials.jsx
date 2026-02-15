"use client";

import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
const testimonials = [
  {
    title: "Perfect Fit, Exceptional Quality!",
    desc: "I ordered a custom racing suit, and it arrived perfectly tailored. The quality is outstanding and it performs amazingly on track! I'll definitely be back for more gear.",
    author: "Marcus R.",
    item: "Custom Racing Suit",
  },
  {
    title: "Top-Tier Racing Gear!",
    desc: "I ordered a karting suit and gloves, and they exceeded all my expectations. The fit is perfect and the quality is professional-grade.",
    author: "Sarah K.",
    item: "Karting Suit Pro",
  },
  {
    title: "Championship Quality!",
    desc: "I recently purchased a complete racing suit package, and the attention to detail is incredible. Feels great and looks even better on the podium.",
    author: "David L.",
    item: "SFI Certified Racing Suit",
  },
];
export default function Testimonials() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="flat-wrapper-testimonial bg-dark-green-4">
          <Image
            className="img-item-1 absolute"
            alt=""
            src="/images/cls-categories/plant/leaf.png"
            width={220}
            height={234}
          />
          <Image
            className="img-item-2 absolute"
            alt=""
            src="/images/cls-categories/plant/leaf-2.png"
            width={192}
            height={200}
          />
          <Swiper
            dir="ltr"
            className="swiper tf-swiper"
            {...{
              slidesPerView: 1,
              speed: 800,
              spaceBetween: 24,
              pagination: { el: ".sw-pagination-tes", clickable: true },
            }}
            modules={[Pagination]}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div className="wg-testimonial-3 text-center wow fadeInUp">
                  <div className="box-top">
                    <i className="icon icon-leaf text-white fs-42" />
                    <p className="text-md text-white">SATISFIED RACERS</p>
                  </div>
                  <div className="box-title-desc">
                    <h3 className="title-review text-white font-7 fw-semibold">
                      “{testimonial.title}”
                    </h3>
                    <p className="text-white desc display-xs">
                      {testimonial.desc}
                    </p>
                  </div>
                  <div className="box-author">
                    <p className="text-md fw-medium text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-white">
                      Item purchased:{" "}
                      <span className="text-sm">{testimonial.item}</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="sw-dot-default style-white sw-pagination-tes justify-content-center" />
          </Swiper>
        </div>
      </div>
    </section>
  );
}
