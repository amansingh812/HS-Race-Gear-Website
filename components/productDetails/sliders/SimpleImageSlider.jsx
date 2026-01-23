"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function SimpleImageSlider({ product }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get product images or use placeholder
  const productImages = product.images && product.images.length > 0
    ? product.images.sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0))
    : [{ url: product.primaryImage || "/images/placeholder-product.jpg", alt: product.name }];

  const currentImage = productImages[selectedImageIndex];

  if (!mounted) return null;

  return (
    <>
      {/* Main Image Display */}
      <div className="tf-product-media-main">
        <div className="position-relative overflow-hidden bg-light rounded mb-3" style={{ aspectRatio: "1" }}>
          <Image
            src={currentImage.url}
            alt={currentImage.alt || currentImage.altText || product.name}
            fill
            className="object-fit-cover cursor-pointer"
            onClick={() => setIsLightboxOpen(true)}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Zoom hint */}
          <div className="position-absolute bottom-3 end-3 bg-dark text-white px-2 py-1 rounded small opacity-75">
            Click to zoom
          </div>
        </div>

        {/* Navigation Arrows */}
        {productImages.length > 1 && (
          <>
            <button
              onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))}
              className="btn btn-sm btn-light position-absolute start-0 top-50 translate-middle-y ms-2"
              style={{ zIndex: 10 }}
              aria-label="Previous image"
            >
              <i className="icon-arrow1-left" />
            </button>
            <button
              onClick={() => setSelectedImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))}
              className="btn btn-sm btn-light position-absolute end-0 top-50 translate-middle-y me-2"
              style={{ zIndex: 10 }}
              aria-label="Next image"
            >
              <i className="icon-arrow1-right" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Images */}
      {productImages.length > 1 && (
        <div className="tf-product-media-thumbs mt-3">
          <div className="d-flex gap-2 overflow-auto pb-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 border-2 rounded overflow-hidden ${
                  index === selectedImageIndex ? "border-primary" : "border-light"
                }`}
                style={{ width: "80px", height: "80px" }}
                aria-label={`Image ${index + 1}`}
              >
                <Image
                  src={image.url}
                  alt={image.alt || image.altText || `${product.name} ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-100 h-100 object-fit-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center"
          style={{ zIndex: 9999 }}
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="position-relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="btn btn-light position-absolute top-0 end-0 m-2"
              style={{ zIndex: 10000 }}
              aria-label="Close lightbox"
            >
              <i className="icon-close" />
            </button>

            <div className="bg-white p-2 rounded" style={{ maxWidth: "90vw", maxHeight: "90vh" }}>
              <Image
                src={currentImage.url}
                alt={currentImage.alt || currentImage.altText || product.name}
                width={800}
                height={1000}
                className="d-block mx-auto"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>

            {/* Lightbox Navigation */}
            {productImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
                  }}
                  className="btn btn-light position-absolute start-0 top-50 translate-middle-y ms-3"
                  style={{ zIndex: 10000 }}
                  aria-label="Previous image in lightbox"
                >
                  <i className="icon-arrow1-left" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
                  }}
                  className="btn btn-light position-absolute end-0 top-50 translate-middle-y me-3"
                  style={{ zIndex: 10000 }}
                  aria-label="Next image in lightbox"
                >
                  <i className="icon-arrow1-right" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="text-white text-center mt-2">
              {selectedImageIndex + 1} / {productImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
