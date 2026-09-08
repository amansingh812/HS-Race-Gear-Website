"use client";

import { useContextElement } from "@/context/Context";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import * as gtag from "@/lib/gtag";

/**
 * Checkout — Stripe-powered payment flow.
 *
 * The customer reviews their cart, enters contact info, then clicks
 * "Pay Now" which redirects them to Stripe's hosted Checkout page.
 * Stripe collects the shipping address and payment details, then
 * redirects back to /order-confirmation on success.
 *
 * The webhook at /api/stripe/webhook handles order creation, inventory
 * decrement, cart clearing, and confirmation emails. The client redirect
 * is just for UX — the webhook is the source of truth.
 */
export default function Checkout() {
  const { cartProducts, totalPrice, shippingCost, shippingInfo, clearCart, cartLoading } =
    useContextElement();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Contact info form (Stripe handles shipping address + payment)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    orderNotes: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // TODO: REVERT — shipping temporarily disabled for prod payment test
  // const grandTotal = totalPrice + shippingCost;
  const grandTotal = totalPrice;

  // GA4: begin_checkout — fire once after cart loads
  const beginCheckoutFired = useRef(false);
  useEffect(() => {
    if (beginCheckoutFired.current) return;
    if (!cartProducts.length) return;
    beginCheckoutFired.current = true;
    gtag.beginCheckout(cartProducts);
  }, [cartProducts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Redirect to Stripe Checkout
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (cartProducts.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Build cart items for guest checkout (authenticated carts are
      // read from DB server-side via the auth token)
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const payload = {
        type: "shop",
        customer: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
        },
        // Guest items — only used when no auth token is present
        items: cartProducts.map((p) => ({
          productId: p.productId || p._id || p.id,
          quantity: p.quantity || 1,
          size: p.size || "Standard",
          isCustomFit: !!p.isCustomFit,
        })),
      };

      const headers = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // GA4: begin_checkout fires above; the purchase event fires on
      // /order-confirmation after Stripe confirms payment.

      // Redirect to Stripe's hosted checkout
      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err.message || "Failed to start checkout. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flat-spacing-25">
      <div className="container">
        {error && (
          <div className="alert alert-danger mb-4">{error}</div>
        )}

        <div className="row">
          <div className="col-xl-8">
            <form className="tf-checkout-cart-main" onSubmit={handleSubmit}>
              <div className="box-ip-checkout">
                <div className="title text-xl fw-medium">Checkout</div>
                <div className="grid-2 mb_16">
                  <div className="tf-field style-2 style-3">
                    <input
                      className={`tf-field-input tf-input ${formErrors.firstName ? "is-invalid" : ""}`}
                      id="firstname"
                      placeholder=" "
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    <label className="tf-field-label" htmlFor="firstname">
                      First name
                    </label>
                    {formErrors.firstName && (
                      <div className="invalid-feedback d-block">{formErrors.firstName}</div>
                    )}
                  </div>
                  <div className="tf-field style-2 style-3">
                    <input
                      className={`tf-field-input tf-input ${formErrors.lastName ? "is-invalid" : ""}`}
                      id="lastname"
                      placeholder=" "
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                    <label className="tf-field-label" htmlFor="lastname">
                      Last name
                    </label>
                    {formErrors.lastName && (
                      <div className="invalid-feedback d-block">{formErrors.lastName}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="box-ip-contact">
                <div className="title">
                  <div className="text-xl fw-medium">Contact Information</div>
                </div>
                <fieldset className="mb_16">
                  <input
                    className={`style-2 ${formErrors.email ? "is-invalid" : ""}`}
                    id="email"
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {formErrors.email && (
                    <div className="invalid-feedback d-block">{formErrors.email}</div>
                  )}
                </fieldset>
                <fieldset className="tf-field style-2 style-3 mb_16">
                  <input
                    className={`tf-field-input tf-input ${formErrors.phone ? "is-invalid" : ""}`}
                    id="phone"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder=""
                  />
                  <label className="tf-field-label" htmlFor="phone">
                    Phone
                  </label>
                  {formErrors.phone && (
                    <div className="invalid-feedback d-block">{formErrors.phone}</div>
                  )}
                </fieldset>
              </div>
              <div className="box-ip-shipping">
                <div className="title text-xl fw-medium">Shipping</div>
                <div className="text-sm text-main">
                  Shipping is calculated based on your cart items (7–10 business days).
                </div>
              </div>
              <div className="box-ip-payment">
                <div className="title">
                  <div className="text-lg fw-medium mb_4">Secure Payment</div>
                  <p className="text-sm text-main">
                    You&apos;ll be redirected to our secure Stripe checkout to
                    enter your shipping address and payment details.
                  </p>
                </div>
                <div
                  className="p-3 mb_16"
                  style={{
                    border: "1px solid #e2cdc6",
                    borderRadius: 8,
                    background: "#fffaf8",
                  }}
                >
                  <div className="text-sm" style={{ lineHeight: 2 }}>
                    <div>
                      <strong>1.</strong> Review your cart and enter your contact info.
                    </div>
                    <div>
                      <strong>2.</strong> Click &quot;Pay Now&quot; — you&apos;ll be taken to
                      our secure checkout powered by Stripe.
                    </div>
                    <div>
                      <strong>3.</strong> Once paid, your order ships and you get tracking.
                    </div>
                  </div>
                </div>
                <fieldset className="mb_16">
                  <textarea
                    className="style-2"
                    placeholder="Order notes (optional)"
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                    rows="3"
                  />
                </fieldset>
                <p className="text-dark-6 text-sm">
                  Your personal data will be used to process your order. See our{" "}
                  <Link
                    href="/privacy-policy"
                    className="fw-medium text-decoration-underline link text-sm"
                  >
                    privacy policy.
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div className="col-xl-4">
            <div className="tf-page-cart-sidebar">
              <div className="cart-box order-box">
                <div className="title text-lg fw-medium">In your cart</div>
                {cartProducts.length ? (
                  <ul className="list-order-product">
                    {cartProducts.map((product, i) => (
                      <li key={i} className="order-item">
                        <figure className="img-product">
                          <Image
                            alt="product"
                            src={
                              product.imgSrc ||
                              product.images?.[0]?.url ||
                              product.productSnapshot?.image ||
                              "/images/products/default.webp"
                            }
                            width={144}
                            height={188}
                          />
                          <span className="quantity">{product.quantity}</span>
                        </figure>
                        <div className="content">
                          <div className="info">
                            <p className="name text-sm fw-medium">
                              {product.title || product.name || product.productSnapshot?.name || "Product"}
                            </p>
                            <span className="variant">
                              {product.size || "Standard"}
                              {product.isCustomFit && " / Custom Fit"}
                            </span>
                          </div>
                          <span className="price text-sm fw-medium">
                            ${((product.finalPrice || product.price || product.productSnapshot?.price || 0) * product.quantity).toFixed(2)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4">
                    Your Cart is empty.{" "}
                    <Link className="tf-btn btn-dark2 animate-btn mt-3" href="/shop">
                      Explore Products
                    </Link>
                  </div>
                )}
                <div className="text-sm text-main d-flex justify-content-between mb_8">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                {/* TODO: REVERT — shipping temporarily hidden for prod payment test
                <div className="text-sm text-main d-flex justify-content-between mb_8">
                  <span>Shipping:</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                */}
                <div className="subtotal text-lg fw-medium d-flex justify-content-between">
                  <span>Total:</span>
                  <span className="total-price-order">${grandTotal.toFixed(2)} USD</span>
                </div>
                <div className="btn-order">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || cartLoading || cartProducts.length === 0}
                    className="tf-btn btn-dark2 animate-btn w-100"
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Redirecting to payment...
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2" style={{ verticalAlign: "-2px" }}>
                          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                          <line x1="1" y1="10" x2="23" y2="10"/>
                        </svg>
                        Pay Now
                      </>
                    )}
                  </button>
                  <div className="text-center mt-3">
                    <div className="d-flex align-items-center justify-content-center gap-2 text-sm text-main">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                      Secure checkout powered by Stripe
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
