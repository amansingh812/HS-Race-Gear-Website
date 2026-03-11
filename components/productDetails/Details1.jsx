"use client";
import React, { useState, useEffect } from "react";
import Slider2 from "./sliders/Slider2";
import Link from "next/link";
import Image from "next/image";
import { useContextElement } from "@/context/Context";
import { useAuth } from "@/context/AuthContext";
import QuantitySelect from "../common/QuantitySelect";
import { useRouter } from "next/navigation";

import ProductHeading from "./ProductHeading";
import BoughtTogether from "./BoughtTogether";

export default function Details1({ product }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [customFit, setCustomFit] = useState(false);
  const [driverName, setDriverName] = useState("");
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState("single");

  // Detect if this is an off-the-rack race suit (show layer toggle)
  const isSuit = product.category?.slug === "race-suits";

  // Detect apparel items that don't need driver name
  const isApparel = ["hoodies", "crew-shirts"].includes(product.category?.slug) ||
    product.title?.toLowerCase().includes("hoodie") ||
    product.title?.toLowerCase().includes("t-shirt") ||
    product.name?.toLowerCase().includes("hoodie") ||
    product.name?.toLowerCase().includes("t-shirt");

  // Determine the correct size chart image and title based on product category
  const getSizeChartInfo = () => {
    const categorySlug = product.category?.slug || "";
    if (categorySlug === "hoodies" || product.name?.toLowerCase().includes("hoodie")) {
      return { src: "/images/chart/hoodie_size_chart.jpg", alt: "Hoodie Size Chart", title: "Hoodie Size Chart" };
    }
    if (categorySlug === "crew-shirts" || product.name?.toLowerCase().includes("shirt")) {
      return { src: "/images/chart/shirt_size_chart.jpg", alt: "Shirt Size Chart", title: "Shirt Size Chart" };
    }
    return { src: "/images/deals/off_the_rack_race_suits.webp", alt: "Size Chart", title: "Size Chart" };
  };
  const sizeChartInfo = getSizeChartInfo();

  // Base price: DB stores prices in cents, divide by 100 to get dollars
  const basePrice = (product.price || 0) / 100;

  const {
    addProductToCart,
    isAddedToCartProducts,
    cartProducts,
    updateQuantity,
  } = useContextElement();

  const { user } = useAuth();

  // Get available sizes from inventory
  const availableSizes = product.inventory?.filter(inv => inv.stock > 0 && inv.isAvailable) || [];

  // Set default size if available
  useEffect(() => {
    if (availableSizes.length > 0 && !selectedSize) {
      setSelectedSize(availableSizes[0].size);
    }
  }, [availableSizes, selectedSize]);

  // Calculate total price from base price + layer multiplier (suits only) + add-ons
  const calculateTotalPrice = () => {
    // For race suits: double layer = 2× base price
    let total = isSuit && selectedLayer === "double" ? basePrice * 2 : basePrice;

    // Add custom fit price
    if (customFit && product.customFitAvailable && product.customFitPrice) {
      total += product.customFitPrice / 100;
    }

    // Add custom options prices
    selectedOptions.forEach(optionSlug => {
      const option = product.customOptions?.find(opt => opt.slug === optionSlug);
      if (option) {
        total += (option.price || 0) / 100;
      }
    });

    return total;
  };

  const totalPrice = calculateTotalPrice();

  const handleOptionToggle = (optionSlug) => {
    setSelectedOptions(prev =>
      prev.includes(optionSlug)
        ? prev.filter(s => s !== optionSlug)
        : [...prev, optionSlug]
    );
  };

  const getSelectedInventoryItem = () => {
    return product.inventory?.find(inv => inv.size === selectedSize);
  };

  const selectedInventory = getSelectedInventoryItem();

  return (
    <section className="flat-single-product">
      <div className="tf-main-product section-image-zoom">
        <div className="container">
          <div className="row">
            {/* Product Images */}
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <div className="product-thumbs-slider">
                  <Slider2 product={product} />
                </div>
              </div>
            </div>
            {/* /Product Images */}
            {/* Product Info */}
            <div className="col-md-6">
              <div className="tf-zoom-main" />
              <div className="tf-product-info-wrap position-relative">
                {/* Admin Edit Button */}
                {user && user.role === 'admin' && (
                  <div className="mb-3">
                    <Link
                      href={`/admin/products/${product._id}`}
                      className="btn btn-warning btn-sm"
                    >
                      <i className="icon-edit me-2" />
                      Edit Product (Admin)
                    </Link>
                  </div>
                )}
                <div className="tf-product-info-list other-image-zoom">
                  <ProductHeading product={product} />

                  {/* Size Chart Button */}
                  <div className="mb-2">
                    <button
                      type="button"
                      className="tf-btn hover-primary"
                      onClick={() => setShowSizeChart(true)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8 }}>
                        <path d="M2 9h20M2 15h20M9 3v18M15 3v18" />
                      </svg>
                      Size Chart
                    </button>
                  </div>

                  {/* Size Chart Modal */}
                  {showSizeChart && (
                    <div
                      style={{
                        position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)",
                        zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                      onClick={() => setShowSizeChart(false)}
                    >
                      <div
                        style={{
                          background: "#fff", borderRadius: 8, padding: 24, maxWidth: "90vw",
                          maxHeight: "90vh", overflow: "auto", position: "relative",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => setShowSizeChart(false)}
                          style={{
                            position: "absolute", top: 12, right: 14, background: "none",
                            border: "none", fontSize: 22, cursor: "pointer", lineHeight: 1,
                          }}
                          aria-label="Close"
                        >
                          &times;
                        </button>
                        <h5 style={{ marginBottom: 16, fontWeight: 700 }}>{sizeChartInfo.title}</h5>
                        <Image
                          src={sizeChartInfo.src}
                          alt={sizeChartInfo.alt}
                          width={700}
                          height={500}
                          style={{ width: "100%", height: "auto", display: "block" }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Racing Specifications */}
                  {(product.certification || product.certificationLevel || product.construction) && (
                    <div className="tf-product-specifications mb-3">
                      <h6 className="fw-bold mb-2">Racing Specifications:</h6>
                      <ul className="list-unstyled">
                        {product.certification && (
                          <li className="mb-1">
                            <span className="text-muted">Certification:</span>
                            <span className="fw-medium ms-2">{product.certification}</span>
                          </li>
                        )}
                        {product.certificationLevel && (
                          <li className="mb-1">
                            <span className="text-muted">Level:</span>
                            <span className="fw-medium ms-2">{product.certificationLevel}</span>
                          </li>
                        )}
                        {product.construction && (
                          <li className="mb-1">
                            <span className="text-muted">Construction:</span>
                            <span className="fw-medium ms-2">{product.construction}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Size Selection */}
                  <div className="tf-product-variant mb-3">
                    <h6 className="fw-bold mb-2">Select Size:</h6>
                    <select
                      className="form-select"
                      style={{ maxWidth: 220 }}
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                    >
                      <option value="">-- Select a Size --</option>
                      {["7XS", "6XS", "5XS", "4XS", "3XS", "2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL"].map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>

                  {/* Layer Selection — race suits only */}
                  {isSuit && (
                    <div className="tf-product-variant mb-3">
                      <h6 className="fw-bold mb-2">Select Layer:</h6>
                      <div className="d-flex flex-column gap-2" style={{ maxWidth: 300 }}>
                        {[
                          { value: "single", label: "Single Layer", price: basePrice },
                          { value: "double", label: "Double Layer", price: basePrice * 2 },
                        ].map(({ value, label, price }) => (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setSelectedLayer(value)}
                            style={{
                              padding: "10px 20px",
                              borderRadius: 6,
                              border: selectedLayer === value ? "2px solid #e21b1b" : "2px solid rgba(255,255,255,0.2)",
                              background: selectedLayer === value ? "rgba(226,27,27,0.12)" : "transparent",
                              color: selectedLayer === value ? "#e21b1b" : "#fff",
                              fontWeight: 600,
                              cursor: "pointer",
                              fontSize: "0.9rem",
                              transition: "all 0.2s",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "100%",
                            }}
                          >
                            <span>{label}</span>
                            <span style={{
                              fontSize: "0.85rem",
                              fontWeight: 700,
                              color: selectedLayer === value ? "#e21b1b" : "rgba(255,255,255,0.6)",
                            }}>
                              ${price.toFixed(2)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Custom Fit Option */}
                  {product.customFitAvailable && (
                    <div className="tf-product-custom-fit mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="customFit"
                          checked={customFit}
                          onChange={(e) => setCustomFit(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="customFit">
                          Custom Fit Available
                          {product.customFitPrice > 0 && (
                            <span className="text-muted ms-2">
                              (+${(product.customFitPrice / 100).toFixed(2)})
                            </span>
                          )}
                        </label>
                        {customFit && product.customFitLeadTime && (
                          <small className="d-block text-muted mt-1">
                            Lead time: {product.customFitLeadTime}
                          </small>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Custom Options (Add-ons) */}
                  {product.customOptions && product.customOptions.length > 0 && (
                    <div className="tf-product-custom-options mb-3">
                      <h6 className="fw-bold mb-2">Add-ons:</h6>
                      {product.customOptions.map((option) => (
                        <div key={option.slug} className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`option-${option.slug}`}
                            checked={selectedOptions.includes(option.slug)}
                            onChange={() => handleOptionToggle(option.slug)}
                          />
                          <label className="form-check-label" htmlFor={`option-${option.slug}`}>
                            {option.name}
                            {option.price > 0 && (
                              <span className="text-muted ms-2">
                                (+${(option.price / 100).toFixed(2)})
                              </span>
                            )}
                            {option.description && (
                              <small className="d-block text-muted">{option.description}</small>
                            )}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Driver Name — hidden for apparel (hoodies, t-shirts) */}
                  {!isApparel && <div className="tf-product-driver-name mb-3">
                    <label htmlFor="driverName" style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: 6, display: "block" }}>
                      Driver Name
                    </label>
                    <input
                      id="driverName"
                      type="text"
                      className="form-control"
                      placeholder="Enter driver name "
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      style={{ maxWidth: 340 }}
                    />
                  </div>}

                  {/* Price Display */}
                  <div className="tf-product-price mb-3">
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <h3 className="mb-0">${totalPrice.toFixed(2)} USD</h3>
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <span style={{ fontSize: "0.9rem", color: "#999", textDecoration: "line-through" }}>
                          ${(product.compareAtPrice / 100).toFixed(2)} USD
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Section */}
                  <div className="tf-product-total-quantity">
                    <div className="group-btn mb-3">
                      <QuantitySelect
                        quantity={
                          isAddedToCartProducts(product._id)
                            ? cartProducts.filter(
                              (elm) => elm.id == product._id
                            )[0]?.quantity || quantity
                            : quantity
                        }
                        setQuantity={(qty) => {
                          if (isAddedToCartProducts(product._id)) {
                            updateQuantity(product._id, qty);
                          } else {
                            setQuantity(qty);
                          }
                        }}
                      />
                      <a
                        href="#shoppingCart"
                        data-bs-toggle="offcanvas"
                        onClick={() => {
                          if (selectedSize) {
                            addProductToCart(product._id, quantity, {
                              size: selectedSize,
                              customFit,
                              selectedOptions,
                              driverName,
                              price: totalPrice
                            });
                          } else {
                            alert('Please select a size');
                          }
                        }}
                        className={`tf-btn hover-primary btn-add-to-cart`}
                      >
                        {isAddedToCartProducts(product._id)
                          ? "Already Added"
                          : "Add to cart"}
                      </a>
                    </div>
                    {/* <button
                      type="button"
                      className={`tf-btn btn-primary w-100 animate-btn`}
                      onClick={async () => {
                        if (!selectedSize) { alert('Please select a size'); return; }
                        await addProductToCart(product._id, quantity, {
                          size: selectedSize,
                          customFit,
                          selectedOptions,
                          driverName,
                          price: totalPrice,
                        }, false);
                        router.push('/checkout');
                      }}
                    >
                      Buy it now
                    </button>
                    <Link
                      href={`/checkout`}
                      className="more-choose-payment link"
                    >
                      More payment options
                    </Link> */}
                  </div>
                  {/* Product Actions */}
                  {/* <div className="tf-product-extra-link">
                    <a
                      href="#askQuestion"
                      data-bs-toggle="modal"
                      className="product-extra-icon link"
                    >
                      <i className="icon icon-ask" />
                      Ask a question
                    </a>
                    <a
                      href="#shareSocial"
                      data-bs-toggle="modal"
                      className="product-extra-icon link"
                    >
                      <i className="icon icon-share" />
                      Share
                    </a>
                  </div> */}
                </div>
                {/* <div className="tf-product-fbt">
                  <div className="title text-xl fw-medium">
                    Frequently Bought Together
                  </div>
                  <BoughtTogether />
                </div> */}
              </div>
            </div>
            {/* /Product Info */}
          </div>
        </div>
      </div>
    </section>
  );
}
