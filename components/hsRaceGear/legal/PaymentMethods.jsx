import React from "react";
import Link from "next/link";

export default function PaymentMethods() {
  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="container">
          <p className="contact-breadcrumb">
            <Link href="/">Home</Link>
            <span className="contact-breadcrumb-sep">/</span>
            <span className="contact-breadcrumb-current">Payment Methods</span>
          </p>
          <span className="contact-hero-tag">Secure Checkout</span>
          <h1 className="contact-hero-title">
            Payment<br /><span>Methods</span>
          </h1>
          <p className="contact-hero-subtitle">
            At HS Racegear, we offer secure and convenient payment options to make checkout quick and worry-free. All transactions are processed using trusted payment platforms.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="hs-doc-section">
        <div className="container">
          <div className="hs-doc-content">

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Credit &amp; Debit Cards (via Stripe)</h2>

              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  HS Racegear accepts credit and debit card payments through Stripe, a globally recognized payment processor known for its security and reliability.
                </p>
                <p className="hs-doc-card-text">We accept most major cards, including:</p>
                <ul className="hs-doc-list">
                  <li>Visa</li>
                  <li>Mastercard</li>
                  <li>American Express</li>
                </ul>
                <p className="hs-doc-card-text">
                  To pay by card, simply enter your details during checkout and follow the on-screen steps.
                </p>
              </div>

              <div className="hs-doc-card hs-doc-card-note">
                <p className="hs-doc-card-text">
                  HS Racegear does not store or save your card information. All payments are processed securely through Stripe.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Google Pay &amp; Apple Pay</h2>

              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  For faster checkout, HS Racegear supports Google Pay and Apple Pay on compatible devices and browsers.
                </p>
                <p className="hs-doc-card-text">
                  These options allow you to complete your purchase quickly using the payment details already saved on your device—without manually entering card information.
                </p>
                <p className="hs-doc-card-text">
                  Both services use advanced encryption and authentication to keep your transaction secure.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">PayPal</h2>

              <div className="hs-doc-card">
                <p className="hs-doc-card-text">PayPal is available as a trusted and flexible payment option. You can:</p>
                <ul className="hs-doc-list">
                  <li>Pay using your PayPal balance</li>
                  <li>Use a linked credit or debit card</li>
                  <li>Checkout securely without sharing financial details</li>
                </ul>
                <p className="hs-doc-card-text">
                  Select PayPal at checkout and follow the instructions provided.
                </p>
              </div>

              <div className="hs-doc-card hs-doc-card-note">
                <p className="hs-doc-card-text">
                  Guest Checkout Available: A PayPal account is not required. You may choose to pay as a guest using a valid card.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Important Payment Notice</h2>

              <div className="hs-doc-card hs-doc-card-warning">
                <p className="hs-doc-card-text">
                  Before completing your payment, please confirm that you have received your order confirmation email. This email verifies your order details and customization selections.
                </p>
                <p className="hs-doc-card-text">
                  Proceed with payment only after reviewing your confirmation for accuracy.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
