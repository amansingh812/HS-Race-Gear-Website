"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
    e.preventDefault();
    const email = e.target.email.value;

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        e.target.reset();
        setSuccess(true);
        handleShowMessage();
      } else {
        setSuccess(false);
        handleShowMessage();
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccess(false);
      handleShowMessage();
      e.target.reset();
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

    return () => {
      headings.forEach((heading) => {
        heading.removeEventListener("click", toggleOpen);
      });
    };
  }, []);

  return (
    <footer
      id="footer"
      className="footer-default footer-bg xl-pb-70 bg-dark-7"
    >

      <div className="footer-body">
        <div className="container">
          <div className="row-footer">

            {/* LOGO + CONTACT INFO */}
            <div className="footer-col-block s1">
              <div className="footer-logo">
                <Link href={`/`}>
                  <Image
                    className="logo"
                    alt="HS Race Gear"
                    src="/images/logo/logo4.png"
                    width={148}
                    height={99}
                    quality={100}
                  />
                </Link>
              </div>

              {/* Contact details below logo */}
              <ul style={{ listStyle: "none", padding: 0, margin: "18px 0 0", display: "flex", flexDirection: "column", gap: "12px" }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "3px" }}>
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  <a
                    href="https://maps.google.com/?q=59+Kondazian+St,+Watertown+MA+02472"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#999", fontSize: "0.82rem", lineHeight: "1.5", textDecoration: "none" }}
                  >
                    59 Kondazian St<br />Watertown MA, 02472
                  </a>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.09a16 16 0 0 0 8 8l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17.5z" />
                  </svg>
                  <a
                    href="tel:+16173196993"
                    style={{ color: "#999", fontSize: "0.82rem", textDecoration: "none" }}
                  >
                    +1 (617) 319 6993
                  </a>
                </li>
              </ul>
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
                      <Link href="/faq">FAQ</Link>
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

            {/* DOWNLOAD */}
            <div className="footer-col-block s1">
              <div className="footer-heading footer-heading-mobile text-xl fw-medium">
                DOWNLOAD
              </div>
              <div className="tf-collapse-content">
                <div className="footer-contact">
                  <ul className="footer-info">
                    <li className="item">
                      <Link href="/more-mockups">MORE MOCKUPS</Link>
                    </li>
                    <li className="item">
                      <Link href="/blanket-template">BLANK TEMPLATE</Link>
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
                      <Link href="/compare/vs-velocity">V/S Velocita</Link>
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
                <Link href={`/privacy-policy`}>PRIVACY POLICY</Link>
                <Link href={`/term-and-condition`}>TERMS & SERVICES</Link>
              </div>
              <ul className="tf-social-icon style-large m-0" style={{ gap: '10px' }}>
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=61580765382460"
                    className="social-item social-facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="icon icon-fb" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/hsracegear/"
                    className="social-item social-instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="icon icon-instagram" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/@hsracipk5hl"
                    className="social-item social-tiktok"
                    target="_blank"
                    rel="noopener noreferrer"
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
