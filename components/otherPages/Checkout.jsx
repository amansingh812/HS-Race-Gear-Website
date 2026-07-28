"use client";

import { useContextElement } from "@/context/Context";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

/**
 * Checkout — order enquiry flow.
 *
 * This does NOT take payment. The customer confirms their order and address,
 * we email them and info@hsracegear.com, and the team contacts them to
 * arrange payment directly — the same process the custom-order pages use.
 *
 * Previously this form collected card number / expiry / CVC, validated them,
 * and then threw them away: no gateway was ever wired up, so customers
 * believed they had paid when no charge existed and no card data was ever
 * transmitted. Those fields are removed rather than hidden, so there is no
 * card data on the page at all.
 *
 * Also removed: the login requirement (guests could not order), and an 8%
 * tax line that was never actually collected.
 */
export default function Checkout() {
  const { cartProducts, totalPrice, clearCart, cartLoading } =
    useContextElement();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(null); // { orderId } once placed

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "United States",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipcode: "",
    orderNotes: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // Shipping is always free and folded into the total — no separate
  // shipping charge, no paid express option, no tax. What's shown is what's
  // owed: the listed product prices, full stop.
  const grandTotal = totalPrice;

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.state.trim()) errors.state = "State is required";
    if (!formData.zipcode.trim()) errors.zipcode = "Zipcode is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (cartProducts.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Send the same item shape the sidebar renders from, so the confirmation
      // email can never disagree with what the customer saw on screen.
      const payload = {
        customer: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          zipcode: formData.zipcode,
          country: formData.country,
          orderNotes: formData.orderNotes,
        },
        items: cartProducts.map((p) => {
          // Resolve the display name from whichever field the cart context set.
          // Guest carts store `title`; authenticated carts store it via
          // productSnapshot.name; older localStorage entries may have `name`.
          const resolvedName =
            p.title || p.name || p.productSnapshot?.name || "Product";

          // Image: guest carts use imgSrc, auth carts use productSnapshot.image
          const resolvedImage =
            p.imgSrc ||
            p.images?.[0]?.url ||
            p.productSnapshot?.image ||
            "";

          return {
            title: resolvedName,
            name: resolvedName,
            image: resolvedImage,
            price: p.finalPrice ?? p.price ?? p.productSnapshot?.price ?? 0,
            quantity: p.quantity,
            size: p.size || "",
            isCustomFit: !!p.isCustomFit,
            sku: p.sku || p.slug || p.productId || p._id || "",
          };
        }),
        shippingMethod: {
          name: "Free Shipping",
          cost: 0,
          estimatedDays: "7-10 business days",
        },
      };

      const response = await fetch("/api/shop-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to submit order");
      }

      // Show the reference inline rather than redirecting — guests have no
      // account page to land on, and the order ID is what they need to quote.
      setSubmitted({ orderId: data.orderId });
      await clearCart();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Order error:", err);
      setError(err.message || "Failed to submit order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---- Success screen ----
  if (submitted) {
    return (
      <div className="flat-spacing-25">
        <div className="container">
          <div
            className="text-center mx-auto"
            style={{ maxWidth: 620, padding: "40px 20px" }}
          >
            <h4 className="mb-3">Thank you — your order is confirmed</h4>
            <p className="text-sm text-main mb-4">
              We&apos;ve emailed a confirmation to you and notified our team.
              Someone will be in touch shortly to confirm the details and
              arrange payment.
            </p>

            <div
              className="d-inline-block mb-4"
              style={{
                border: "1px solid #e2cdc6",
                borderRadius: 8,
                padding: "16px 28px",
              }}
            >
              <div
                className="text-sm text-main"
                style={{ textTransform: "uppercase", letterSpacing: 1.5 }}
              >
                Order Reference
              </div>
              <div
                className="fw-medium"
                style={{ fontSize: 22, color: "#8f1717", letterSpacing: 1 }}
              >
                {submitted.orderId}
              </div>
            </div>

            <p className="text-sm text-main mb-4">
              Please quote this reference if you contact us. No payment has been
              taken yet.
            </p>

            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link href="/shop" className="tf-btn btn-dark2 animate-btn">
                Continue Shopping
              </Link>
              <Link href="/contact-us" className="tf-btn animate-btn">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flat-spacing-25">
      <div className="container">
        {error && (
          <div className="alert alert-danger mb-4">
            {error}
          </div>
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
                <fieldset className="tf-field style-2 style-3 mb_16">
                  <input
                    className="tf-field-input tf-input"
                    id="country"
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder=""
                  />
                  <label className="tf-field-label" htmlFor="country">
                    Country
                  </label>
                </fieldset>
                <fieldset className="tf-field style-2 style-3 mb_16">
                  <input
                    className={`tf-field-input tf-input ${formErrors.address ? "is-invalid" : ""}`}
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder=""
                  />
                  <label className="tf-field-label" htmlFor="address">
                    Address
                  </label>
                  {formErrors.address && (
                    <div className="invalid-feedback d-block">{formErrors.address}</div>
                  )}
                </fieldset>
                <fieldset className="mb_16">
                  <input
                    type="text"
                    className="style-2"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    placeholder="Apartment, suite, etc (optional)"
                  />
                </fieldset>
                <div className="grid-3 mb_16">
                  <fieldset className="tf-field style-2 style-3">
                    <input
                      className={`tf-field-input tf-input ${formErrors.city ? "is-invalid" : ""}`}
                      id="city"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder=""
                    />
                    <label className="tf-field-label" htmlFor="city">
                      City
                    </label>
                    {formErrors.city && (
                      <div className="invalid-feedback d-block">{formErrors.city}</div>
                    )}
                  </fieldset>
                  <div className="tf-select select-square">
                    <select 
                      name="state" 
                      id="state"
                      value={formData.state}
                      onChange={handleInputChange}
                    >
                      <option value="">State</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="IL">Illinois</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      <option value="WA">Washington</option>
                    </select>
                    {formErrors.state && (
                      <div className="invalid-feedback d-block">{formErrors.state}</div>
                    )}
                  </div>
                  <fieldset className="tf-field style-2 style-3">
                    <input
                      className={`tf-field-input tf-input ${formErrors.zipcode ? "is-invalid" : ""}`}
                      id="code"
                      type="text"
                      name="zipcode"
                      value={formData.zipcode}
                      onChange={handleInputChange}
                      placeholder=""
                    />
                    <label className="tf-field-label" htmlFor="code">
                      Zipcode/Postal
                    </label>
                    {formErrors.zipcode && (
                      <div className="invalid-feedback d-block">{formErrors.zipcode}</div>
                    )}
                  </fieldset>
                </div>
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
              <div className="box-ip-contact">
                <div className="title">
                  <div className="text-xl fw-medium">Contact Information</div>
                </div>
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
              </div>
              <div className="box-ip-shipping">
                <div className="title text-xl fw-medium">Shipping</div>
                <div className="text-sm text-main">
                  Free shipping on every order (7-10 business days), included in
                  the total below — nothing added at checkout.
                </div>
              </div>
              <div className="box-ip-payment">
                <div className="title">
                  <div className="text-lg fw-medium mb_4">How Payment Works</div>
                  <p className="text-sm text-main">
                    We don&apos;t take payment online. Confirm your order below and
                    our team will contact you to arrange payment directly.
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
                      <strong>1.</strong> You place your order — no card details needed.
                    </div>
                    <div>
                      <strong>2.</strong> We confirm stock, sizing and your final total.
                    </div>
                    <div>
                      <strong>3.</strong> We arrange payment with you, then ship your gear.
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
                  <span>Free shipping included</span>
                </div>
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
                        Submitting...
                      </>
                    ) : (
                      "Confirm order"
                    )}
                  </button>
                  <p className="text-sm text-main text-center mt-3 mb-0">
                    No payment taken now — our team will contact you to arrange it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
