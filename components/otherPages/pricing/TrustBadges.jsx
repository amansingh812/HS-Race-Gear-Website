"use client";
import React from "react";
import { trustBadges } from "@/data/pricingData";

export default function TrustBadges({ variant = "default" }) {
    const getIcon = (iconType) => {
        switch (iconType) {
            case "certification":
                return (
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 2L3 7V12C3 16.97 7.02 21.5 12 23C16.98 21.5 21 16.97 21 12V7L12 2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M9 12L11 14L15 10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                );
            case "shipping":
                return (
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1 3H16V16H1V3Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M16 8H20L23 11V16H16V8Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <circle
                            cx="5.5"
                            cy="18.5"
                            r="2.5"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle
                            cx="18.5"
                            cy="18.5"
                            r="2.5"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                    </svg>
                );
            case "secure":
                return (
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <path
                            d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <circle cx="12" cy="16" r="1" fill="currentColor" />
                    </svg>
                );
            case "custom":
                return (
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                );
            case "support":
                return (
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M22 16.92V19.92C22 20.97 21.14 21.85 20.09 21.92C11.5 22.97 3.08 14.5 2.08 5.91C2.01 4.86 2.89 4 3.94 4H6.94C7.74 4 8.43 4.54 8.62 5.32C8.91 6.49 9.35 7.61 9.93 8.67L8.25 10.35C10.03 13.57 12.43 15.97 15.65 17.75L17.33 16.07C18.39 16.65 19.51 17.09 20.68 17.38C21.46 17.57 22 18.26 22 19.06V16.92Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                );
            default:
                return <i className="icon-check-circle"></i>;
        }
    };

    return (
        <section className={`trust-badges-section ${variant}`}>
            <div className="container">
                <div className="trust-badges-wrapper">
                    {trustBadges.map((badge) => (
                        <div key={badge.id} className="trust-badge-item">
                            <div className="trust-badge-icon">{getIcon(badge.icon)}</div>
                            <div className="trust-badge-content">
                                <h5 className="trust-badge-title">{badge.title}</h5>
                                <span className="trust-badge-subtitle">{badge.subtitle}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
