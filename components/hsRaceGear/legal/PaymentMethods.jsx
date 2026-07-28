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
          <span className="contact-hero-tag">Ordering &amp; Payment</span>
          <h1 className="contact-hero-title">
            Payment<br /><span>Methods</span>
          </h1>
          <p className="contact-hero-subtitle">
            We confirm every order with you before taking payment. Place your order online, we&apos;ll email your confirmation, then our team contacts you to arrange payment directly.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="hs-doc-section">
        <div className="container">
          <div className="hs-doc-content">

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">How Ordering &amp; Payment Works</h2>

              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  We don&apos;t collect payment on the website. Because most of what we make
                  is built to your measurements, we confirm the details with you before any
                  money changes hands.
                </p>
                <ul className="hs-doc-list">
                  <li>
                    <strong>1. Place your order.</strong> Choose your gear and submit your
                    order — no card details are required, and none are collected.
                  </li>
                  <li>
                    <strong>2. Get your confirmation.</strong> You&apos;ll receive an email
                    straight away with an order reference (for example HSRG-260728-K4P2)
                    listing everything you selected.
                  </li>
                  <li>
                    <strong>3. We contact you.</strong> Our team confirms stock, sizing and
                    your final total, then arranges payment with you directly.
                  </li>
                  <li>
                    <strong>4. We ship.</strong> Once payment clears, your order goes into
                    production or dispatch and you receive tracking.
                  </li>
                </ul>
              </div>

              <div className="hs-doc-card hs-doc-card-note">
                <p className="hs-doc-card-text">
                  Please review your confirmation email for accuracy before making payment.
                  It lists your sizing and customisation selections exactly as we received
                  them, and it&apos;s much easier to correct before production starts.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Accepted Payment Methods</h2>

              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  When our team contacts you, we&apos;ll arrange payment using whichever of
                  these suits you best:
                </p>
                <ul className="hs-doc-list">
                  <li>Major credit and debit cards — Visa, Mastercard, American Express</li>
                  <li>PayPal</li>
                  <li>Bank transfer</li>
                </ul>
                <p className="hs-doc-card-text">
                  We never ask for card numbers by email, and we never store your card
                  details. If you receive a message claiming to be from HS Race Gear asking
                  you to email card information, please don&apos;t reply to it — contact us
                  directly at <Link href="/contact-us">our contact page</Link> instead.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Questions About Your Order?</h2>

              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Quote your order reference and we&apos;ll pull it up right away. Reach us at{" "}
                  <a href="mailto:info@hsracegear.com">info@hsracegear.com</a> or{" "}
                  <a href="tel:+16173196993">+1 (617) 319-6993</a>.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
