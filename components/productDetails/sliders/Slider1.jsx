"use client";

import { useEffect, useRef, useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import Image from "next/image";
import Drift from "drift-zoom";

export default function Slider1({ product }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const swiperRef = useRef(null);
  
  // Get product images or use placeholder
  const productImages = product.images && product.images.length > 0
    ? product.images.sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0))
    : [{ url: product.primaryImage || '/images/placeholder-product.jpg', alt: product.name }];

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#product-gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const images = document.querySelectorAll(".tf-image-zoom");
      images.forEach((image) => {
        new Drift(image, {
          paneContainer: document.querySelector(".tf-zoom-main"),
        });
      });
    }
  }, []);

  return (
    <>
      <div className="tf-product-media-main" id="product-gallery">
        <Swiper
          spaceBetween={10}
          navigation={{
            prevEl: ".nav-prev-slider",
            nextEl: ".nav-next-slider",
          }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Navigation, Thumbs]}
          className="swiper tf-single-slide"
        >
          {productImages.map((image, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <a
                href={image.url}
                target="_blank"
                className="item"
                data-pswp-width="770px"
                data-pswp-height="1075px"
              >
                <Image
                  className="tf-image-zoom lazyload"
                  data-zoom={image.url}
                  alt={image.alt || image.altText || product.name}
                  src={image.url}
                  width={770}
                  height={1075}
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="nav-sw nav-next-slider nav-next-single">
          <span className="icon icon-arrow1-left" />
        </div>
        <div className="nav-sw nav-prev-slider nav-prev-single">
          <span className="icon icon-arrow1-right" />
        </div>
      </div>
      <div className="tf-product-media-thumbs">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={5}
          breakpoints={{
            0: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
          }}
          className="swiper tf-product-media-thumbs"
        >
          {productImages.map((image, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <div className="item">
                <Image
                  alt={image.alt || image.altText || product.name}
                  src={image.url}
                  width={143}
                  height={200}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
