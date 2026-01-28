"use client";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features() {
  return (
    <div className="flat-spacing-26">
      <div className="container">
        <div className="flat-wrapper-iconbox">
          <h3 className="title letter-0 font-7 fw-semibold">Why Choose Us</h3>
          <Swiper
            dir="ltr"
            className="swiper tf-swiper wow fadeInUp"
            {...{
              slidesPerView: 1,
              spaceBetween: 12,
              speed: 800,
              observer: true,
              observeParents: true,
              pagination: { el: ".sw-pagination-iconbox", clickable: true },
              breakpoints: {
                575: { slidesPerView: 2, spaceBetween: 24, slidesPerGroup: 2 },
                992: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 2 },
                1400: { slidesPerView: 4, spaceBetween: 80, slidesPerGroup: 2 },
              },
            }}
            modules={[Pagination]}
          >
            <SwiperSlide className="swiper-slide">
              <div className="tf-icon-box style-3 justify-content-center justify-content-lg-start">
                <div className="box-icon">
                  <i className="icon icon-return" />
                </div>
                <div className="content">
                  <div className="title fw-bold font-7">SFI Certified</div>
                  <p className="text-main-3 text-md">
                    All our racing gear meets rigorous SFI safety standards
                  </p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="tf-icon-box style-3 justify-content-center justify-content-lg-start">
                <div className="box-icon">
                  <i className="icon icon-shipping" />
                </div>
                <div className="content">
                  <div className="title fw-bold font-7">Fastest Delivery</div>
                  <p className="text-main-3 text-md">
                    Quick turnaround times without compromising quality
                  </p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="tf-icon-box style-3 justify-content-center justify-content-lg-start">
                <div className="box-icon">
                  <i className="icon icon-support" />
                </div>
                <div className="content">
                  <div className="title fw-bold font-7">24/7 Support</div>
                  <p className="text-main-3 text-md">
                    Our racing experts are always available to assist you
                  </p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="tf-icon-box style-3 justify-content-center justify-content-lg-start">
                <div className="box-icon">
                  <i className="icon icon-gift" />
                </div>
                <div className="content">
                  <div className="title fw-bold font-7">Secure Payment</div>
                  <p className="text-main-3 text-md">
                    Shop confidently with our encrypted payment system
                  </p>
                </div>
              </div>
            </SwiperSlide>

            <div className="d-flex d-xxl-none sw-dot-default sw-pagination-iconbox justify-content-center"></div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
