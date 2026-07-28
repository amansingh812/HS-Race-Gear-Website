"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Navigation, Thumbs, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import Image from "next/image";
import Drift from "drift-zoom";

const defaultSlides = [
  { id: 1, color: "Black", size: "small", imgSrc: "/images/products/fashion/women-black-1.jpg" },
  { id: 2, color: "Black", size: "medium", imgSrc: "/images/products/fashion/women-black-2.jpg" },
  { id: 3, color: "Black", size: "large", imgSrc: "/images/products/fashion/women-black-3.jpg" },
  { id: 4, color: "Black", size: "extra large", imgSrc: "/images/products/fashion/women-black-4.jpg" },
  { id: 5, color: "Yellow", size: "small", imgSrc: "/images/products/fashion/women-yellow-1.jpg" },
  { id: 6, color: "Yellow", size: "medium", imgSrc: "/images/products/fashion/women-yellow-2.jpg" },
  { id: 7, color: "Grey", size: "large", imgSrc: "/images/products/fashion/women-grey-1.jpg" },
  { id: 8, color: "Grey", size: "extra large", imgSrc: "/images/products/fashion/women-grey-2.jpg" },
];

export default function Slider2({ product, activeColor = "Black", setActiveColor = () => {}, onImageSelect = () => {} }) {
  // Build items from product data or fallback
  let items = [];
  if (product?.images && product.images.length > 0) {
    items = product.images.map((image, index) => ({
      id: index + 1,
      color: image.color || "Default",
      size: image.size || "standard",
      imgSrc: image.url,
      alt: image.alt || image.altText || product.name,
    }));
  } else if (product?.primaryImage) {
    items = [{ id: 1, color: "Default", size: "standard", imgSrc: product.primaryImage, alt: product.name }];
  } else {
    items = defaultSlides;
  }

  const [thumbSwiper, setThumbSwiper] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = useRef(null);
  const lightboxRef = useRef(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Drift zoom — desktop only (1200px+)
  useEffect(() => {
    const checkWindowSize = () => window.innerWidth >= 1200;
    if (!checkWindowSize()) return;

    const imageZoom = () => {
      const driftAll = document.querySelectorAll(".tf-image-zoom");
      const pane = document.querySelector(".tf-zoom-main");
      driftAll.forEach((el) => {
        new Drift(el, {
          zoomFactor: 2,
          paneContainer: pane,
          inlinePane: false,
          handleTouch: false,
          hoverBoundingBox: true,
          containInline: true,
        });
      });
    };
    imageZoom();

    const zoomElements = document.querySelectorAll(".tf-image-zoom");
    const handleMouseOver = (event) => {
      const parent = event.target.closest(".section-image-zoom");
      if (parent) parent.classList.add("zoom-active");
    };
    const handleMouseLeave = (event) => {
      const parent = event.target.closest(".section-image-zoom");
      if (parent) parent.classList.remove("zoom-active");
    };
    zoomElements.forEach((el) => {
      el.addEventListener("mouseover", handleMouseOver);
      el.addEventListener("mouseleave", handleMouseLeave);
    });
    return () => {
      zoomElements.forEach((el) => {
        el.removeEventListener("mouseover", handleMouseOver);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  // PhotoSwipe lightbox
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery-swiper-started",
      children: ".item",
      pswpModule: () => import("photoswipe"),
      // Allow closing on background click/tap
      bgOpacity: 0.85,
      closeOnVerticalDrag: true,
      closeOnScroll: true,
      wheelToZoom: true,
      // Mobile-specific: allow tap outside to close
      tapToToggleControls: true,
    });

    lightbox.addFilter("domItemData", (itemData, element, linkEl) => {
      const img = linkEl?.querySelector("img");
      if (img && img.naturalWidth > 0 && img.naturalHeight > 0) {
        itemData.w = img.naturalWidth;
        itemData.h = img.naturalHeight;
      } else if (img) {
        const tempImg = new window.Image();
        tempImg.onload = () => {
          itemData.w = tempImg.naturalWidth;
          itemData.h = tempImg.naturalHeight;
        };
        tempImg.src = img.src;
      }
      return itemData;
    });

    lightbox.init();
    lightboxRef.current = lightbox;

    // Close lightbox when clicking on the background overlay (especially on mobile)
    lightbox.on("openingAnimationEnd", () => {
      const pswpBg = document.querySelector(".pswp__bg");
      if (pswpBg) {
        pswpBg.addEventListener("click", () => {
          if (lightbox.isOpen()) {
            lightbox.close();
          }
        });
      }
    });

    return () => lightbox.destroy();
  }, []);

  // Sync with activeColor prop
  useEffect(() => {
    if (!(items[activeIndex]?.color === activeColor)) {
      const slideIndex = items.filter((elm) => elm.color === activeColor)[0]?.id - 1;
      if (slideIndex >= 0 && swiperRef.current) swiperRef.current.slideTo(slideIndex);
    }
  }, [activeColor]);

  useEffect(() => {
    setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.slideTo(1);
        swiperRef.current.slideTo(
          items.filter((elm) => elm.color === activeColor)[0]?.id - 1
        );
      }
    });
  }, []);

  // Thumbnail click handler
  const goToSlide = useCallback((index) => {
    if (swiperRef.current) swiperRef.current.slideTo(index);
  }, []);

  return (
    <div className="hs-gallery-wrap">
      {/* ── MOBILE: Full-width swipe gallery with dot pagination ── */}
      {isMobile ? (
        <div className="hs-gallery-mobile">
          <Swiper
            modules={[Pagination]}
            dir="ltr"
            className="hs-mobile-swiper"
            id="gallery-swiper-started"
            pagination={{
              el: ".hs-mobile-pagination",
              clickable: true,
              dynamicBullets: items.length > 7,
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => {
              if (items[swiper.activeIndex]) {
                setActiveIndex(swiper.activeIndex);
                setActiveColor(items[swiper.activeIndex]?.color);
                onImageSelect(items[swiper.activeIndex]?.imgSrc);
              }
            }}
          >
            {items.map((elm, i) => (
              <SwiperSlide key={i}>
                <a href={elm.imgSrc} target="_blank" className="item hs-mobile-slide">
                  <Image
                    className="tf-image-zoom lazyload hs-mobile-img"
                    data-zoom={elm.imgSrc}
                    data-src={elm.imgSrc}
                    alt={elm.alt || "product image"}
                    src={elm.imgSrc}
                    width={800}
                    height={1000}
                    priority={i === 0}
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>


          {/* Pagination dots */}
          <div className="hs-mobile-pagination" />

          {/* Image counter */}
          <div className="hs-img-counter">
            {activeIndex + 1} / {items.length}
          </div>

          {/* Mobile thumbnail strip */}
          {items.length > 1 && (
            <div className="hs-thumb-strip">
              {items.map((elm, i) => (
                <button
                  key={i}
                  className={`hs-thumb-item ${activeIndex === i ? 'active' : ''}`}
                  onClick={() => goToSlide(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image
                    src={elm.imgSrc}
                    alt={elm.alt || "thumbnail"}
                    width={64}
                    height={80}
                    className="hs-thumb-img"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* ── DESKTOP: Vertical thumbnails + main image with zoom ── */
        <>
          <div className="flat-wrap-media-product">
            <Swiper
              modules={[Thumbs]}
              dir="ltr"
              className="swiper tf-product-media-main"
              id="gallery-swiper-started"
              thumbs={{ swiper: thumbSwiper }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => {
                if (items[swiper.activeIndex]) {
                  setActiveIndex(swiper.activeIndex);
                  setActiveColor(items[swiper.activeIndex]?.color);
                  onImageSelect(items[swiper.activeIndex]?.imgSrc);
                }
              }}
            >
              {items.map((elm, i) => (
                <SwiperSlide
                  key={i}
                  className="swiper-slide"
                  data-color="black"
                  data-size="small"
                >
                  <a href={elm.imgSrc} target="_blank" className="item">
                    <Image
                      className="tf-image-zoom lazyload"
                      data-zoom={elm.imgSrc}
                      data-src={elm.imgSrc}
                      alt={elm.alt || "product image"}
                      src={elm.imgSrc}
                      width={828}
                      height={1241}
                    />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>

          </div>
          <Swiper
            dir="ltr"
            className="swiper tf-product-media-thumbs other-image-zoom"
            slidesPerView={4}
            direction="vertical"
            onSwiper={setThumbSwiper}
            modules={[Thumbs]}
            spaceBetween={8}
          >
            {items.map(({ color, size, imgSrc, alt }, index) => (
              <SwiperSlide
                key={index}
                className="swiper-slide stagger-item"
                data-color={color}
                data-size={size}
              >
                <div className="item">
                  <Image
                    className="lazyload"
                    data-src={imgSrc}
                    alt={alt || "product thumbnail"}
                    src={imgSrc}
                    width={828}
                    height={1241}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
}
