"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const specItems = [
    {
        id: 1,
        title: "Racing Suits",
        description: "Custom-fit SFI certified suits",
        image: "/images/banner/racing/suit-banner.jpg",
        link: "/custom-fit",
    },
    {
        id: 2,
        title: "Racing Shoes",
        description: "Lightweight & fire-resistant footwear",
        image: "/images/banner/racing/shoes-banner.jpg",
        link: "/shop-default",
    },
    {
        id: 3,
        title: "Racing Gloves",
        description: "Maximum grip & protection",
        image: "/images/banner/racing/gloves-banner.jpg",
        link: "/shop-default",
    },
];

export default function SpecificationBanner() {
    return (
        <section className="flat-spacing-3 bg-dark">
            <div className="container">
                {/* Section Title */}
                <div className="flat-title text-center wow fadeInUp mb-5">
                    <h3 className="title font-7 fw-bold text-white">Custom Suit Specifications</h3>
                    <p className="text-white-50 text-md">
                        Premium racing gear built to your exact specifications
                    </p>
                </div>

                {/* Banner Grid - 3 Equal Sections */}
                <div className="row g-0 g-md-0">
                    {specItems.map((item, index) => (
                        <div key={item.id} className="col-12 col-md-4">
                            <Link
                                href={item.link}
                                className={`d-block position-relative overflow-hidden hover-img ${index === 1 ? "border-start border-end border-white border-opacity-25 d-md-block d-none-border" : ""
                                    }`}
                                style={{ aspectRatio: "1/1.2" }}
                            >
                                {/* Background Image */}
                                <div className="image img-style h-100 w-100">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="lazyload object-fit-cover"
                                        style={{ transition: "transform 0.7s ease" }}
                                    />
                                    {/* Gradient Overlay */}
                                    <div
                                        className="position-absolute top-0 start-0 w-100 h-100"
                                        style={{
                                            background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)"
                                        }}
                                    />
                                </div>

                                {/* Content */}
                                <div className="position-absolute bottom-0 start-0 w-100 p-4 p-lg-5 text-center">
                                    <h4 className="text-white fw-bold fs-4 mb-2 spec-title">
                                        {item.title}
                                    </h4>
                                    <p className="text-white-50 small mb-3 spec-desc">
                                        {item.description}
                                    </p>
                                    <span className="d-inline-flex align-items-center gap-2 text-warning fw-semibold small text-uppercase letter-spacing-1 spec-link">
                                        Learn More
                                        <i className="icon icon-arr-right3" />
                                    </span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .hover-img:hover .image img {
          transform: scale(1.05);
        }
        .spec-title, .spec-desc {
          transition: transform 0.3s ease;
        }
        .hover-img:hover .spec-title,
        .hover-img:hover .spec-desc {
          transform: translateY(-8px);
        }
        .spec-link {
          opacity: 0;
          transform: translateY(16px);
          transition: all 0.3s ease;
        }
        .hover-img:hover .spec-link {
          opacity: 1;
          transform: translateY(0);
        }
        .letter-spacing-1 {
          letter-spacing: 0.1em;
        }
        @media (max-width: 767px) {
          .d-none-border {
            border: none !important;
          }
        }
      `}</style>
        </section>
    );
}
