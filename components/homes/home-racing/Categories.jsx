"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const categories = [
    {
        id: 1,
        title: "Custom Racing Suits",
        image: "/images/cls-categories/racing/custom-racing-suits.jpg",
        link: "/shop-default",
    },
    {
        id: 2,
        title: "Custom Karting Suits",
        image: "/images/cls-categories/racing/custom-karting-suits.jpg",
        link: "/shop-default",
    },
    {
        id: 3,
        title: "Off the Rack Race Suits",
        image: "/images/cls-categories/racing/off-rack-suits.jpg",
        link: "/shop-default",
    },
    {
        id: 4,
        title: "Custom Racing Gloves",
        image: "/images/cls-categories/racing/custom-gloves.jpg",
        link: "/shop-default",
    },
    {
        id: 5,
        title: "Custom Racing Shoes",
        image: "/images/cls-categories/racing/custom-shoes.jpg",
        link: "/shop-default",
    },
    {
        id: 6,
        title: "Hoodies",
        image: "/images/cls-categories/racing/hoodies.jpg",
        link: "/shop-default",
    },
    {
        id: 7,
        title: "Shirts",
        image: "/images/cls-categories/racing/shirts.jpg",
        link: "/shop-default",
    },
];

export default function RacingCategories() {
    return (
        <section className="flat-spacing-3">
            <div className="container"> 
                {/* Section Title */}
                <div className="flat-title text-center wow fadeInUp mb-5">
                    <h3 className="title font-7 fw-bold">Shop By Category</h3>
                    <p className="text-main text-md">
                        Explore our premium racing gear collection, crafted for champions
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="row g-3 g-lg-4">
                    {categories.map((category) => (
                        <div key={category.id} className="col-6 col-md-4 col-lg-3">
                            <Link
                                href={category.link}
                                className="wg-cls style-abs hover-img d-block position-relative overflow-hidden rounded-3"
                                style={{ aspectRatio: "1/1" }}
                            >
                                {/* Image */}
                                <div className="image img-style h-100 w-100">
                                    <Image
                                        src={category.image}
                                        alt={category.title}
                                        fill
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        className="lazyload object-fit-cover"
                                        style={{ transition: "transform 0.5s ease" }}
                                    />
                                    {/* Overlay */}
                                    <div
                                        className="position-absolute top-0 start-0 w-100 h-100"
                                        style={{ backgroundColor: "rgba(0,0,0,0.4)", transition: "background-color 0.3s" }}
                                    />
                                </div>

                                {/* Title */}
                                <div className="cls-content position-absolute top-50 start-50 translate-middle text-center p-3 w-100">
                                    <span className="text-white fw-semibold text-md">
                                        {category.title}
                                    </span>
                                </div>

                                {/* Hover Arrow */}
                                <div
                                    className="position-absolute bottom-0 end-0 m-3 bg-white rounded-circle d-flex align-items-center justify-content-center"
                                    style={{ width: "40px", height: "40px", opacity: 0, transform: "translateY(10px)", transition: "all 0.3s" }}
                                >
                                    <i className="icon icon-arr-right3 text-dark" />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .wg-cls:hover .image img {
          transform: scale(1.1);
        }
        .wg-cls:hover > div:last-child {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
        </section>
    );
}
