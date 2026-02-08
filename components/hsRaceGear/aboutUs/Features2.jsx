"use client";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// HS Race Gear Core Values Data
const hsRaceGearValues = [
  {
    icon: "icon-precision",
    title: "10+ Years Experience",
    description:
      "Over a decade immersed in motorsports apparel, understanding the unique needs of racers from weekend warriors to professional drivers.",
  },
  {
    icon: "icon-elegance",
    title: "24/7 Personalized Support",
    description:
      "Have questions about SFI certifications, custom sizing, or branding your team's gear? Our round-the-clock customer support team is here to help.",
  },
  {
    icon: "icon-fashion-body",
    title: "On-Time Delivery",
    description:
      "Racing schedules never wait — that's why we promise reliable delivery, ensuring your custom race suit orders arrive when you need them most.",
  },
];

export default function Features2() {
  return (
    <section className="flat-spacing-3 pt-0">
      <div className="container">
        <div className="flat-title-2 d-xl-flex justify-content-xl-between">
          <div className="box-title">
            <p className="display-md-2 fw-medium">What Drives Us — Our Core Values</p>
            <p className="text-xl">Built on a foundation of safety, quality, and customer satisfaction</p>
          </div>
          <div className="box-text">
            <p className="text-md">
              Your satisfaction isn't just a goal — it's our standard. We prioritize open
              <br className="d-none d-xl-block" />
              communication, reliable support, and results that exceed expectations.
              <br className="d-none d-xl-block" />
              From drag racing to karting to professional motorsport series.
            </p>
          </div>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper"
          {...{
            slidesPerView: 1,
            spaceBetween: 12,
            speed: 800,
            observer: true,
            observeParents: true,
            pagination: { el: ".sw-pagination-iconbox", clickable: true },
            breakpoints: {
              575: { slidesPerView: 2, spaceBetween: 12 },
              992: { slidesPerView: 3, spaceBetween: 24 },
            },
          }}
          modules={[Pagination]}
        >
          {hsRaceGearValues.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="tf-icon-box style-border">
                <div className="box-icon">
                  <i className={`icon ${item.icon}`} />
                </div>
                <div className="content">
                  <h6>{item.title}</h6>
                  <p className="text-sm text-line-clamp-4">
                    {item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="d-flex d-xl-none sw-dot-default sw-pagination-iconbox justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
