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
  const [selectedLayer, setSelectedLayer] = useState("single");
  const [showSizeChart, setShowSizeChart] = useState(false);

  const LAYER_PRICES = { single: 395, double: 595 };

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

  // Calculate total price
  const calculateTotalPrice = () => {
    // Base price comes from layer selection
    let total = LAYER_PRICES[selectedLayer];

    // Add custom fit price
    if (customFit && product.customFitAvailable && product.customFitPrice) {
      total += product.customFitPrice;
    }

    // Add custom options prices
    selectedOptions.forEach(optionSlug => {
      const option = product.customOptions?.find(opt => opt.slug === optionSlug);
      if (option) {
        total += option.price || 0;
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
                  <div className="mb-3">
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
                        <h5 style={{ marginBottom: 16, fontWeight: 700 }}>Size Chart</h5>
                        <Image
                          src="/images/deals/off_the_rack_race_suits.webp"
                          alt="Size Chart"
                          width={700}
                          height={500}
                          style={{ width: "100%", height: "auto", display: "block" }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Racing Specifications */}
                  {(product.certification || product.certificationLevel || product.material || product.construction) && (
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
                        {product.material && (
                          <li className="mb-1">
                            <span className="text-muted">Material:</span>
                            <span className="fw-medium ms-2">{product.material}</span>
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

                  {/* Driver Name */}
                  <div className="tf-product-driver-name mb-3">
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
                  </div>

                  {/* Single / Double Layer Selection */}
                  <div className="tf-product-layer-select mb-3">
                    <h6 style={{ fontWeight: 700, marginBottom: 10 }}>Select Layer:</h6>
                    <div style={{ display: "flex", gap: 12 }}>
                      <button
                        type="button"
                        onClick={() => setSelectedLayer("single")}
                        style={{
                          flex: 1, padding: "14px 10px", border: selectedLayer === "single" ? "2px solid #222" : "1px solid #ccc",
                          borderRadius: 6, background: selectedLayer === "single" ? "#222" : "#fff",
                          color: selectedLayer === "single" ? "#fff" : "#222",
                          cursor: "pointer", transition: "all 0.2s",
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: "1rem" }}>SINGLE LAYER</div>
                        <div style={{ fontSize: "0.85rem", marginTop: 4, opacity: 0.85 }}>$395 USD</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedLayer("double")}
                        style={{
                          flex: 1, padding: "14px 10px", border: selectedLayer === "double" ? "2px solid #222" : "1px solid #ccc",
                          borderRadius: 6, background: selectedLayer === "double" ? "#222" : "#fff",
                          color: selectedLayer === "double" ? "#fff" : "#222",
                          cursor: "pointer", transition: "all 0.2s",
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: "1rem" }}>DOUBLE LAYER</div>
                        <div style={{ fontSize: "0.85rem", marginTop: 4, opacity: 0.85 }}>$595 USD</div>
                      </button>
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="tf-product-price mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <h3 className="mb-0">${totalPrice.toFixed(2)} USD</h3>
                      <span style={{ fontSize: "0.82rem", color: "#888" }}>
                        ({selectedLayer === "single" ? "Single Layer" : "Double Layer"})
                      </span>
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
                              layer: selectedLayer,
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
                    <button
                      type="button"
                      className={`tf-btn btn-primary w-100 animate-btn`}
                      onClick={async () => {
                        if (!selectedSize) { alert('Please select a size'); return; }
                        await addProductToCart(product._id, quantity, {
                          size: selectedSize,
                          customFit,
                          selectedOptions,
                          driverName,
                          layer: selectedLayer,
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
                    </Link>
                  </div>
                  {/* Product Actions */}
                  <div className="tf-product-extra-link">
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
                  </div>

                  {/* Product Meta */}
                  <ul className="tf-product-cate-sku text-md">
                    {selectedInventory?.sku && (
                      <li className="item-cate-sku">
                        <span className="label">SKU:</span>
                        <span className="value">{selectedInventory.sku}</span>
                      </li>
                    )}
                    <li className="item-cate-sku">
                      <span className="label">Category:</span>
                      <span className="value">
                        {product.category?.name || 'Racing Suits'}
                        {product.subcategory && `, ${product.subcategory.name}`}
                      </span>
                    </li>
                    <li className="item-cate-sku">
                      <span className="label">Brand:</span>
                      <span className="value">{product.brand || 'HS Race Gear'}</span>
                    </li>
                    {product.certification && (
                      <li className="item-cate-sku">
                        <span className="label">Safety Rating:</span>
                        <span className="value">{product.certification}</span>
                      </li>
                    )}
                  </ul>

                  <div className="tf-product-trust-seal text-center">
                    <p className="text-md text-dark-2 text-seal fw-medium">
                      Guarantee Safe Checkout:
                    </p>
                    <ul className="list-card">
                      <li className="card-item">
                        <Image
                          alt="card"
                          src="/images/payment/Visa.webp"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <Image
                          alt="card"
                          src="/images/payment/DinersClub.webp"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <Image
                          alt="card"
                          src="/images/payment/Mastercard.webp"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <Image
                          alt="card"
                          src="/images/payment/Stripe.webp"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <Image
                          alt="card"
                          src="/images/payment/PayPal.webp"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <Image
                          alt="card"
                          src="/images/payment/GooglePay.webp"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <Image
                          alt="card"
                          src="/images/payment/ApplePay.webp"
                          width={90}
                          height={64}
                        />
                      </li>
                    </ul>
                  </div>
                  <div className="tf-product-delivery-return">
                    <div className="product-delivery">
                      <div className="icon icon-car2" />
                      <p className="text-md">
                        Estimated delivery time:
                        <span className="fw-medium">
                          3-5 days international
                        </span>
                      </p>
                    </div>
                    <div className="product-delivery">
                      <div className="icon icon-shipping3" />
                      <p className="text-md">
                        Free shipping on
                        <span className="fw-medium">all orders over $150</span>
                      </p>
                    </div>
                  </div>
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
