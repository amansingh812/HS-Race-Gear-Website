"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { customizeCategories } from "@/data/collections";

export default function CustomizeSection() {
    return (
        <section className="flat-spacing-3 bg-light">
            <div className="container">
                {/* Header */}
                <div className="flat-title text-center wow fadeInUp">
                    <h3 className="title font-7 fw-bold">Customize Your Own</h3>
                    <p className="text-main text-md">
                        Customize your products with our customization tutor and blank model.
                        Choose colors, logo, and graphics for those products.
                    </p>
                </div>

                {/* Categories Grid - Fully Responsive */}
                <div className="row g-3 g-lg-4 mt-3">
                    {customizeCategories.map((category, index) => (
                        <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2-4 col-xl-2-4">
                            <Link href={category.href} className="text-decoration-none">
                                <div
                                    className="category-card bg-white rounded-3 p-3 p-md-4 h-100 d-flex flex-column align-items-center shadow-sm hover-shadow-lg transition-all"
                                    style={{
                                        transition: "all 0.3s ease",
                                        cursor: "pointer"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-5px)";
                                        const img = e.currentTarget.querySelector("img");
                                        if (img) img.style.transform = "scale(1.05)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        const img = e.currentTarget.querySelector("img");
                                        if (img) img.style.transform = "scale(1)";
                                    }}
                                >
                                    {/* Image Container - Responsive sizing */}
                                    <div
                                        className="position-relative w-100 mb-2 mb-md-3"
                                        style={{
                                            aspectRatio: "3/4",
                                            overflow: "hidden"
                                        }}
                                    >
                                        <Image
                                            src={category.img}
                                            alt={category.name}
                                            width={400}
                                            height={533}
                                            className="object-fit-contain"
                                            style={{
                                                transition: "transform 0.3s ease"
                                            }}
                                            sizes="(max-width: 576px) 50vw, (max-width: 768px) 33vw, (max-width: 992px) 25vw, 20vw"
                                        />
                                    </div>

                                    {/* Category Name - Responsive text */}
                                    <h3 className="mt-auto mb-0 fw-medium text-center text-sm text-md-base text-lg-xl">
                                        {category.name}
                                    </h3>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Enhanced Responsive CSS */}
            <style jsx>{`
                /* Mobile First - 2 columns */
                .col-lg-2-4 {
                    flex: 0 0 auto;
                }

                /* Small Mobile: 2 columns (col-6) */
                @media (max-width: 575px) {
                    .col-lg-2-4 {
                        width: 50%;
                    }
                }

                /* Large Mobile: 3 columns (col-sm-4) */
                @media (min-width: 576px) and (max-width: 767px) {
                    .col-lg-2-4 {
                        width: 33.333%;
                    }
                }

                /* Tablet: 4 columns (col-md-3) */
                @media (min-width: 768px) and (max-width: 991px) {
                    .col-lg-2-4 {
                        width: 25%;
                    }
                }

                /* Desktop & Large Desktop: 5 columns */
                @media (min-width: 992px) {
                    .col-lg-2-4 {
                        width: 20%;
                    }
                }

                /* Hover effects enhancement for larger screens */
                @media (min-width: 768px) {
                    .category-card:hover {
                        box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
                    }
                }

                /* Text sizing responsive adjustments */
                @media (max-width: 575px) {
                    .category-card h3 {
                        font-size: 0.9rem !important;
                    }
                }

                @media (min-width: 576px) and (max-width: 991px) {
                    .category-card h3 {
                        font-size: 1rem !important;
                    }
                }

                @media (min-width: 992px) {
                    .category-card h3 {
                        font-size: 1.1rem !important;
                    }
                }
            `}</style>
        </section>
    );
}
