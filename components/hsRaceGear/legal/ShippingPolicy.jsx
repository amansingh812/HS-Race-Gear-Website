import React from "react";
import Link from "next/link";

export default function ShippingPolicy() {
  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="container">
          <p className="contact-breadcrumb">
            <Link href="/">Home</Link>
            <span className="contact-breadcrumb-sep">/</span>
            <span className="contact-breadcrumb-current">Shipping Policy</span>
          </p>
          <span className="contact-hero-tag">Support</span>
          <h1 className="contact-hero-title">
            Shipping<br /><span>Policy</span>
          </h1>
          <p className="contact-hero-subtitle">
            At HS Racegear, we take pride in delivering your custom racewear with care, precision, and attention to detail. Every order is handled to ensure your gear arrives protected and ready for the track.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="hs-doc-section">
        <div className="container">
          <div className="hs-doc-content">

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Order Processing</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">
                  Once your order is confirmed, our production team begins preparing your custom racewear. Each item is carefully inspected and packaged before being released for shipment. You&apos;ll receive an email notification as soon as your order is ready.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Packaging &amp; Shipment</h2>
              <div className="hs-doc-card">
                <p className="hs-doc-card-text">Every HS Racegear product is packaged with protection in mind:</p>
                <ul className="hs-doc-list">
                  <li>Race suits are delivered in dedicated HS suit bags</li>
                  <li>Gloves are packed in individual protective bags</li>
                  <li>Shoes are shipped in their own designated packaging</li>
                </ul>
                <p className="hs-doc-card-text">
                  This packaging ensures your gear remains clean, protected, and damage-free during transit and storage.
                </p>
                <p className="hs-doc-card-text">
                  Once your order ships, you&apos;ll receive a notification with the necessary details to track your shipment.
                </p>
              </div>
            </div>

            <div className="hs-doc-block">
              <h2 className="hs-doc-heading">Summary</h2>
              <div className="hs-doc-card">
                <ul className="hs-doc-list">
                  <li>Custom orders are carefully prepared and packaged</li>
                  <li>Dedicated suit, glove, and shoe bags included</li>
                  <li>Secure packaging for all racewear items</li>
                  <li>Email notifications provided when orders are ready and shipped</li>
                </ul>
              </div>
              <div className="hs-doc-card hs-doc-card-note">
                <p className="hs-doc-card-text">
                  At HS Racegear, every custom SFI race suit, glove, and shoe is shipped with the same attention to detail that goes into building it — so you can focus on racing with confidence.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
