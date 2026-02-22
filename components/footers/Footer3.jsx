"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
export default function Footer3() {
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const sendEmail = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const email = e.target.email.value;

    try {
      const response = await axios.post(
        "https://express-brevomail.vercel.app/api/contacts",
        {
          email,
        }
      );

      if ([200, 201].includes(response.status)) {
        e.target.reset(); // Reset the form
        setSuccess(true); // Set success state
        handleShowMessage();
      } else {
        setSuccess(false); // Handle unexpected responses
        handleShowMessage();
      }
    } catch (error) {
      console.error("Error:", error.response?.data || "An error occurred");
      setSuccess(false); // Set error state
      handleShowMessage();
      e.target.reset(); // Reset the form
    }
  };
  useEffect(() => {
    const headings = document.querySelectorAll(".footer-heading-mobile");

    const toggleOpen = (event) => {
      const parent = event.target.closest(".footer-col-block");
      const content = parent.querySelector(".tf-collapse-content");

      if (parent.classList.contains("open")) {
        parent.classList.remove("open");
        content.style.height = "0px";
      } else {
        parent.classList.add("open");
        content.style.height = content.scrollHeight + 10 + "px";
      }
    };

    headings.forEach((heading) => {
      heading.addEventListener("click", toggleOpen);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      headings.forEach((heading) => {
        heading.removeEventListener("click", toggleOpen);
      });
    };
  }, []); // Empty dependency array means this will run only once on mount

  return (
    <footer
      id="footer"
      className="footer-default footer-bg xl-pb-70 bg-dark-7"
    >
      <div className="footer-top">
        <div className="container">
          <div className="footer-top-wrap d-flex flex-wrap justify-content-between align-items-center" style={{ gap: '20px' }}>
            <div className="footer-logo">
              <Link href={`/`}>
                <Image
                  className="logo"
                  alt="HS Race Gear"
                  src="/images/logo/logo.png"
                  width={148}
                  height={44}
                />
              </Link>
            </div>

            {/* NEWSLETTER */}
            <div className="footer-inner-wrap footer-col-block s2" style={{ maxWidth: "450px", textAlign: "left", width: "100%", margin: 0 }}>

              <div className="tf-collapse-content" style={{ display: "block", height: "auto" }}>
                <div className="footer-newsletter">

                  <div
                    className={`tfSubscribeMsg footer-sub-element ${showMessage ? "active" : ""
                      }`}
                  >
                    {success ? (
                      <p style={{ color: "rgb(52, 168, 83)" }}>
                        You have successfully subscribed.
                      </p>
                    ) : (
                      <p style={{ color: "red" }}>Something went wrong</p>
                    )}
                  </div>
                  <form
                    id="subscribe-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendEmail(e);
                    }}
                    className="form-newsletter"
                  >
                    <div className="subscribe-content">
                      <fieldset className="email">
                        <input
                          type="email"
                          name="email"
                          className="subscribe-email"
                          placeholder="Email address"
                          tabIndex={0}
                          aria-required="true"
                          required
                        />
                      </fieldset>
                      <div className="button-submit">
                        <button
                          className="subscribe-button animate-btn"
                          type="submit"
                        >
                          <svg
                            width={18}
                            height={18}
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_5296_3345)">
                              <path
                                d="M17.7938 8.50229L17.7931 8.50162L14.1192 4.84537C13.8439 4.57147 13.3988 4.57249 13.1248 4.84776C12.8508 5.123 12.8519 5.56818 13.1271 5.84212L15.5938 8.29687H0.703125C0.314789 8.29687 0 8.61166 0 9C0 9.38833 0.314789 9.70312 0.703125 9.70312H15.5938L13.1272 12.1579C12.8519 12.4318 12.8509 12.877 13.1248 13.1522C13.3988 13.4275 13.844 13.4285 14.1192 13.1546L17.7932 9.49837L17.7938 9.4977C18.0692 9.22285 18.0683 8.77623 17.7938 8.50229Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_5296_3345">
                                <rect width={18} height={18} fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-body">
        <div className="container">
          <div className="row-footer">

            {/* COMPANY */}
            <div className="footer-col-block s1">
              <div className="footer-logo">
                <Link href={`/`}>
                  <Image
                    className="logo"
                    alt="HS Race Gear"
                    src="/images/logo/logo.png"
                    width={148}
                    height={44}
                  />
                </Link>
              </div>
              {/* <div className="tf-collapse-content">
                <div className="footer-contact">
                  <ul className="footer-info">
                    <li className="item">
                      <Link href="/contact-us">CONTACT US</Link>
                    </li>
                    <li className="item">
                      <Link href="/about-us">ABOUT</Link>
                    </li>
                    <li className="item">
                      <Link href="/blog">BLOG</Link>
                    </li>
                    <li className="item">
                      <Link href="/privacy-policy">PRIVACY POLICY</Link>
                    </li>
                    <li className="item">
                      <Link href="/term-and-condition">TERMS & SERVICES</Link>
                    </li>
                    <li className="item">
                      <Link href="/shipping-policy">SHIPPING POLICY</Link>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>

            {/* COMPANY */}
            <div className="footer-col-block s1">
              <div className="footer-heading footer-heading-mobile text-xl fw-medium">
                COMPANY
              </div>
              <div className="tf-collapse-content">
                <div className="footer-contact">
                  <ul className="footer-info">
                    <li className="item">
                      <Link href="/contact-us">CONTACT US</Link>
                    </li>
                    <li className="item">
                      <Link href="/about-us">ABOUT</Link>
                    </li>
                    <li className="item">
                      <Link href="/blog">BLOG</Link>
                    </li>
                    <li className="item">
                      <Link href="/privacy-policy">PRIVACY POLICY</Link>
                    </li>
                    <li className="item">
                      <Link href="/term-and-condition">TERMS & SERVICES</Link>
                    </li>
                    <li className="item">
                      <Link href="/shipping-policy">SHIPPING POLICY</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* SUPPORT */}
            <div className="footer-col-block s1">
              <div className="footer-heading footer-heading-mobile text-xl fw-medium">
                SUPPORT
              </div>
              <div className="tf-collapse-content">
                <div className="footer-contact">
                  <ul className="footer-info">
                    <li className="item">
                      <Link href="/faqs">FAQ</Link>
                    </li>
                    <li className="item">
                      <Link href="/payment-methods">PAYMENT METHODS</Link>
                    </li>
                    <li className="item">
                      <Link href="/return-policy">RETURN POLICY</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* DOWNLOAD */}
            <div className="footer-col-block s1">
              <div className="footer-heading footer-heading-mobile text-xl fw-medium">
                DOWNLOAD
              </div>
              <div className="tf-collapse-content">
                <div className="footer-contact">
                  <ul className="footer-info">
                    <li className="item">
                      <a href="#">MORE MOCKUPS</a>
                    </li>
                    <li className="item">
                      <a href="#">BLANKET TEMPLATE</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ABOUT SUIT */}
            <div className="footer-col-block s1">
              <div className="footer-heading footer-heading-mobile text-xl fw-medium">
                ABOUT SUIT
              </div>
              <div className="tf-collapse-content">
                <div className="footer-contact">
                  <ul className="footer-info">
                    <li className="item">
                      <Link href="/suit-maintenance">SUIT MAINTENANCE</Link>
                    </li>
                    <li className="item">
                      <Link href="/certifications">CERTIFICATIONS</Link>
                    </li>
                    <li className="item">
                      <Link href="/custom-fit">HOW TO MEASURE</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* COMPARE */}
            <div className="footer-col-block s1">
              <div className="footer-heading footer-heading-mobile text-xl fw-medium">
                COMPARE
              </div>
              <div className="tf-collapse-content">
                <div className="footer-contact">
                  <ul className="footer-info">
                    <li className="item">
                      <Link href="/compare/vs-k1">V/S K1</Link>
                    </li>
                    <li className="item">
                      <Link href="/compare/vs-rush">V/S RUSH</Link>
                    </li>
                    <li className="item">
                      <Link href="/compare/vs-velocity">V/S VELOCITY</Link>
                    </li>
                    <li className="item">
                      <Link href="/compare/vs-pyrotect">V/S PYROTECT</Link>
                    </li>
                    <li className="item">
                      <Link href="/compare/vs-simpson">V/S SIMPSON</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>



          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-wrap">
            <p>
              Copyright © 2026 by <span className="fw-medium">HS Race Gear.</span> All
              Rights Reserved.
            </p>
            <div className="box-right d-flex align-items-center" style={{ gap: '15px' }}>
              <div className="d-flex align-items-center" style={{ gap: '15px' }}>
                <Link href={`/privacy-policy`}>Privacy Policy</Link>
                <Link href={`/term-and-condition`}>Term of Use</Link>
              </div>
              <ul className="tf-social-icon style-large m-0" style={{ gap: '10px' }}>
                <li>
                  <a
                    href="https://www.facebook.com/"
                    className="social-item social-facebook"
                  >
                    <i className="icon icon-fb" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    className="social-item social-instagram"
                  >
                    <i className="icon icon-instagram" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/"
                    className="social-item social-tiktok"
                  >
                    <i className="icon icon-tiktok" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
