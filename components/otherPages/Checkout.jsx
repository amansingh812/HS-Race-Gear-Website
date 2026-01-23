"use client";

import { useContextElement } from "@/context/Context";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const router = useRouter();
  const {
    cartProducts,
    totalPrice,
    isAuthenticated,
    clearCart,
    cartLoading,
  } = useContextElement();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shippingMethod, setShippingMethod] = useState("express");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  
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
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
    useShippingAsBilling: true,
    orderNotes: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // Shipping costs
  const shippingCosts = {
    free: 0,
    express: 10,
  };

  const taxRate = 0.08; // 8% tax
  const shippingCost = shippingCosts[shippingMethod] || 0;
  const taxAmount = totalPrice * taxRate;
  const grandTotal = totalPrice + shippingCost + taxAmount;

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

    if (paymentMethod === "credit-card") {
      if (!formData.cardNumber.trim()) errors.cardNumber = "Card number is required";
      if (!formData.cardExpiry.trim()) errors.cardExpiry = "Expiry date is required";
      if (!formData.cardCvc.trim()) errors.cardCvc = "CVC is required";
      if (!formData.cardName.trim()) errors.cardName = "Name on card is required";
    }

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

    if (!isAuthenticated) {
      setError("Please login to place an order");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      
      const orderData = {
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address1: formData.address,
          address2: formData.apartment,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipcode,
          country: formData.country,
          phone: formData.phone,
          email: formData.email,
        },
        paymentMethod: paymentMethod === "credit-card" ? "card" : paymentMethod === "paypal" ? "paypal" : "cod",
        shippingMethod: {
          name: shippingMethod === "express" ? "Express Shipping" : "Standard Shipping",
          cost: shippingCost,
          estimatedDays: shippingMethod === "express" ? "2-3 business days" : "5-7 business days"
        },
        customerNotes: formData.orderNotes,
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to create order");
      }

      // Order created successfully
      await clearCart();
      
      // Redirect to order confirmation page
      const orderNumber = data.data?.orderNumber || data.orderNumber;
      router.push(`/account-orders?success=true&orderNumber=${orderNumber}`);
    } catch (err) {
      console.error("Order error:", err);
      setError(err.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flat-spacing-25">
      <div className="container">
        {!isAuthenticated && (
          <div className="alert alert-warning mb-4">
            <strong>Note:</strong> Please{" "}
            <Link href="/login" className="fw-bold text-decoration-underline">
              login
            </Link>{" "}
            to place an order and track your purchases.
          </div>
        )}
        
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
                  {!isAuthenticated && (
                    <Link href="/login" className="text-sm link">
                      Log in
                    </Link>
                  )}
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
                <div className="title text-xl fw-medium">Shipping Method</div>
                <fieldset className="mb_16">
                  <label htmlFor="freeship" className="check-ship">
                    <input
                      type="radio"
                      id="freeship"
                      className="tf-check-rounded"
                      name="shippingMethod"
                      checked={shippingMethod === "free"}
                      onChange={() => setShippingMethod("free")}
                    />
                    <span className="text text-sm">
                      <span>Free Shipping (7-10 business days)</span>
                      <span className="price">$0.00</span>
                    </span>
                  </label>
                </fieldset>
                <fieldset>
                  <label htmlFor="expship" className="check-ship">
                    <input
                      type="radio"
                      id="expship"
                      className="tf-check-rounded"
                      name="shippingMethod"
                      checked={shippingMethod === "express"}
                      onChange={() => setShippingMethod("express")}
                    />
                    <span className="text text-sm">
                      <span>Express Shipping (3-5 business days)</span>
                      <span className="price">$10.00</span>
                    </span>
                  </label>
                </fieldset>
              </div>
              <div className="box-ip-payment">
                <div className="title">
                  <div className="text-lg fw-medium mb_4">Payment</div>
                  <p className="text-sm text-main">
                    All transactions are secure and encrypted.
                  </p>
                </div>
                <div className="payment-method-box" id="payment-method-box">
                  <div className="payment-item mb_16">
                    <label htmlFor="delivery" className="payment-header">
                      <input
                        type="radio"
                        name="paymentMethod"
                        className="tf-check-rounded"
                        id="delivery"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                      />
                      <span className="pay-title text-sm">
                        Cash on delivery
                      </span>
                    </label>
                    {paymentMethod === "cod" && (
                      <div className="payment-body p-3">
                        <p className="text-sm text-main">
                          Pay with cash upon delivery.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="payment-item mb_16">
                    <label htmlFor="credit-card" className="payment-header">
                      <input
                        type="radio"
                        name="paymentMethod"
                        className="tf-check-rounded"
                        id="credit-card"
                        checked={paymentMethod === "credit-card"}
                        onChange={() => setPaymentMethod("credit-card")}
                      />
                      <span className="pay-title text-sm">Credit Card</span>
                    </label>
                    {paymentMethod === "credit-card" && (
                      <div className="payment-body">
                        <fieldset className="ip-card mb_16">
                          <input
                            type="text"
                            className={`style-2 ${formErrors.cardNumber ? "is-invalid" : ""}`}
                            placeholder="Card number"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                          />
                          <Image
                            className="card-logo"
                            width={41}
                            height={12}
                            alt="card"
                            src="/images/payment/visa-2.png"
                          />
                        </fieldset>
                        {formErrors.cardNumber && (
                          <div className="invalid-feedback d-block mb-2">{formErrors.cardNumber}</div>
                        )}
                        <div className="grid-2 mb_16">
                          <div>
                            <input
                              type="text"
                              className={`style-2 ${formErrors.cardExpiry ? "is-invalid" : ""}`}
                              placeholder="MM/YY"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                            />
                            {formErrors.cardExpiry && (
                              <div className="invalid-feedback d-block">{formErrors.cardExpiry}</div>
                            )}
                          </div>
                          <div>
                            <input
                              type="text"
                              className={`style-2 ${formErrors.cardCvc ? "is-invalid" : ""}`}
                              placeholder="CVC"
                              name="cardCvc"
                              value={formData.cardCvc}
                              onChange={handleInputChange}
                            />
                            {formErrors.cardCvc && (
                              <div className="invalid-feedback d-block">{formErrors.cardCvc}</div>
                            )}
                          </div>
                        </div>
                        <fieldset className="mb_16">
                          <input
                            type="text"
                            className={`style-2 ${formErrors.cardName ? "is-invalid" : ""}`}
                            placeholder="Name on card"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                          />
                          {formErrors.cardName && (
                            <div className="invalid-feedback d-block">{formErrors.cardName}</div>
                          )}
                        </fieldset>
                        <div className="cb-ship">
                          <input
                            type="checkbox"
                            className="tf-check"
                            id="checkShip"
                            name="useShippingAsBilling"
                            checked={formData.useShippingAsBilling}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="checkShip" className="text-sm text-main">
                            Use shipping address as billing address
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="payment-item paypal-payment mb_16">
                    <label htmlFor="paypal" className="payment-header">
                      <input
                        type="radio"
                        name="paymentMethod"
                        className="tf-check-rounded"
                        id="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={() => setPaymentMethod("paypal")}
                      />
                      <span className="pay-title text-sm">
                        PayPal
                        <Image
                          className="card-logo"
                          width={78}
                          height={20}
                          alt="paypal"
                          src="/images/payment/paypal-2.png"
                        />
                      </span>
                    </label>
                    {paymentMethod === "paypal" && (
                      <div className="payment-body p-3">
                        <p className="text-sm text-main">
                          You will be redirected to PayPal.
                        </p>
                      </div>
                    )}
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
                            src={product.imgSrc}
                            width={144}
                            height={188}
                          />
                          <span className="quantity">{product.quantity}</span>
                        </figure>
                        <div className="content">
                          <div className="info">
                            <p className="name text-sm fw-medium">
                              {product.title}
                            </p>
                            <span className="variant">
                              {product.size || "Standard"}
                              {product.isCustomFit && " / Custom Fit"}
                            </span>
                          </div>
                          <span className="price text-sm fw-medium">
                            ${((product.finalPrice || product.price) * product.quantity).toFixed(2)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4">
                    Your Cart is empty.{" "}
                    <Link className="tf-btn btn-dark2 animate-btn mt-3" href="/shop-default">
                      Explore Products
                    </Link>
                  </div>
                )}
                <ul className="list-total">
                  <li className="total-item text-sm d-flex justify-content-between">
                    <span>Subtotal:</span>
                    <span className="price-sub fw-medium">${totalPrice.toFixed(2)} USD</span>
                  </li>
                  <li className="total-item text-sm d-flex justify-content-between">
                    <span>Shipping:</span>
                    <span className="price-ship fw-medium">${shippingCost.toFixed(2)} USD</span>
                  </li>
                  <li className="total-item text-sm d-flex justify-content-between">
                    <span>Tax (8%):</span>
                    <span className="price-tax fw-medium">${taxAmount.toFixed(2)} USD</span>
                  </li>
                </ul>
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
                        Processing...
                      </>
                    ) : (
                      "Place order"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
