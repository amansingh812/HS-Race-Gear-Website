import React from "react";
import Link from "next/link";

export default function ReturnPolicy() {
    return (
        <>
            {/* HERO */}
            <section className="contact-hero">
                <div className="container">
                    <p className="contact-breadcrumb">
                        <Link href="/">Home</Link>
                        <span className="contact-breadcrumb-sep">/</span>
                        <span className="contact-breadcrumb-current">Return &amp; Refund Policy</span>
                    </p>
                    <span className="contact-hero-tag">Customer Policy</span>
                    <h1 className="contact-hero-title">
                        Return &amp;<br /><span>Refund Policy</span>
                    </h1>
                    <p className="contact-hero-subtitle">
                        We want you to be completely satisfied with your purchase. Please read our return and refund policy carefully before placing your order.
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section className="hs-doc-section">
                <div className="container">
                    <div className="hs-doc-content">

                        {/* 24-Hour Policy */}
                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">Return &amp; Refund Policy</h2>
                            <div className="hs-doc-card">
                                <p className="hs-doc-card-text">
                                    We have a <strong>24-hour refund policy</strong>, which means you have 24 hours
                                    after placing your order to request a refund.
                                </p>
                                <p className="hs-doc-card-text">
                                    To be eligible for a return, you must request the refund within the timeframe
                                    given above either by WhatsApp or email.
                                </p>
                                <p className="hs-doc-card-text">
                                    To start a return, you can contact us at{" "}
                                    <a href="mailto:hsracegear@gmail.com">hsracegear@gmail.com</a> or by our
                                    WhatsApp number given on our website. If your return is accepted, you will
                                    receive your refund in its entirety.
                                </p>
                            </div>
                        </div>

                        {/* Damages and Issues */}
                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">Damages and Issues</h2>
                            <div className="hs-doc-card">
                                <p className="hs-doc-card-text">
                                    Please inspect your order upon reception and contact us within{" "}
                                    <strong>24 hours</strong> if the item is defective, damaged, or if you receive
                                    the wrong item, so that we can evaluate the issue and make it right.
                                </p>
                            </div>
                        </div>

                        {/* Refunds */}
                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">Refunds</h2>
                            <div className="hs-doc-card">
                                <p className="hs-doc-card-text">
                                    We will notify you once we have received and inspected your return, and let you
                                    know if the refund was approved or not.
                                </p>
                                <p className="hs-doc-card-text">
                                    If approved, you will be automatically refunded to your original payment method.
                                    Please remember it can take some time for your bank or credit card company to
                                    process and post the refund.
                                </p>
                            </div>
                            <div className="hs-doc-card hs-doc-card-note">
                                <p className="hs-doc-card-text">
                                    Refund processing times vary by bank or card issuer. If you have not received
                                    your refund after 10 business days, please contact us and we will look into it.
                                </p>
                            </div>
                        </div>

                        {/* Need Help */}
                        <div className="hs-doc-block">
                            <h2 className="hs-doc-heading">Need Help?</h2>
                            <div className="hs-doc-card hs-doc-card-warning">
                                <p className="hs-doc-card-text">
                                    Contact us at{" "}
                                    <a href="mailto:hsracegear@gmail.com">hsracegear@gmail.com</a> for any
                                    questions related to refunds and returns. Our team is here to help you.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
