"use client";
import React from "react";
import { suitComparisonData } from "@/data/pricingData";

export default function PricingComparison() {
    const { headers, rows } = suitComparisonData;

    return (
        <section className="pricing-comparison-section">
            <div className="container">
                {/* Section Header */}
                <div className="pricing-section-header">
                    <span className="section-subtitle">Compare Options</span>
                    <h2 className="section-title">Racing Suit Comparison</h2>
                    <p className="section-description">
                        Compare our racing suit options to find the perfect match for your
                        racing needs and budget.
                    </p>
                </div>

                {/* Comparison Table */}
                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead>
                            <tr>
                                {headers.map((header, index) => (
                                    <th
                                        key={index}
                                        className={index === 2 ? "featured-column" : ""}
                                    >
                                        {header}
                                        {index === 2 && (
                                            <span className="featured-tag">Most Popular</span>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td
                                            key={cellIndex}
                                            className={`
                        ${cellIndex === 0 ? "feature-label" : "feature-value"}
                        ${cellIndex === 2 ? "featured-column" : ""}
                        ${cell === "✓" ? "has-check" : ""}
                        ${cell === "✗" ? "has-x" : ""}
                      `}
                                        >
                                            {cell === "✓" ? (
                                                <span className="check-icon">
                                                    <i className="icon-check"></i>
                                                </span>
                                            ) : cell === "✗" ? (
                                                <span className="x-icon">
                                                    <i className="icon-close"></i>
                                                </span>
                                            ) : (
                                                cell
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Comparison Hint */}
                <div className="comparison-mobile-hint">
                    <i className="icon-arrow-left"></i>
                    <span>Scroll to compare all options</span>
                    <i className="icon-arrow-right"></i>
                </div>
            </div>
        </section>
    );
}
