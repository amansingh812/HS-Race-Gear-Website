"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "@/public/css/footer.css";

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
    <>
      {/* ── NEWSLETTER OVERLAP SECTION ── */}
      <div className="hs-newsletter-overlap">
        <div className="container">
          <div className="hs-newsletter-inner">
            <div className="hs-newsletter-text">
              <span className="hs-newsletter-label">NEWSLETTER</span>
              <h3 className="hs-newsletter-title">Subscribe to our newsletter</h3>
            </div>
            <form className="hs-newsletter-form" onSubmit={sendEmail}>
              <input
                type="email"
                name="email"
                placeholder="your email"
                required
                className="hs-newsletter-input"
              />
              <button type="submit" className="hs-newsletter-btn">
                Send
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </button>
            </form>
            {showMessage && (
              <div style={{
                position: "absolute",
                bottom: "-30px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "13px",
                color: success ? "#22c55e" : "#ef4444",
                whiteSpace: "nowrap",
              }}>
                {success ? "Subscribed successfully!" : "Something went wrong."}
              </div>
            )}
          </div>
        </div>
      </div>

      <footer
        id="footer"
        className="footer-default footer-bg xl-pb-70 bg-dark-7"
      >
        {/* ── FOOTER BODY ── */}
        <div className="footer-body">
          <div className="container">
            <div className="row-footer">

              {/* CONTACT US DIRECTLY */}
              <div className="footer-col-block s1">
                <div className="footer-heading footer-heading-mobile text-xl fw-medium">
                  CONTACT US DIRECTLY
                </div>
                <div className="tf-collapse-content">
                  <ul style={{ listStyle: "none", padding: 0, margin: "0", display: "flex", flexDirection: "column", gap: "14px" }}>
                    <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                      <a
                        href="https://maps.google.com/?q=59+Kondazian+St,+Watertown+MA+02472"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#999", fontSize: "0.85rem", lineHeight: "1.5", textDecoration: "none" }}
                      >
                        - 59 Kondanzian St<br />&nbsp;&nbsp;watertown MA,02472
                      </a>
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.09a16 16 0 0 0 8 8l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17.5z" />
                      </svg>
                      <a
                        href="tel:+16173196993"
                        style={{ color: "#999", fontSize: "0.85rem", textDecoration: "none" }}
                      >
                        +1 (617)319 6993
                      </a>
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <a
                        href="mailto:info@hsracegear.com"
                        style={{ color: "#999", fontSize: "0.85rem", textDecoration: "none" }}
                      >
                        info@hsracegear.com
                      </a>
                    </li>
                  </ul>
                </div>
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
                        <Link href="/contact-us">CONTACT </Link>
                      </li>
                      <li className="item">
                        <Link href="/shipping-policy">SHIPPING POLICY</Link>
                      </li>
                      <li className="item">
                        <Link href="/about-us">ABOUT</Link>
                      </li>
                      <li className="item">
                        <Link href="/blog">BLOG</Link>
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
                        <Link href="/compare/vs-velocity">V/S VELOCITA</Link>
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

        {/* ── BOTTOM BAR ── */}
        <div className="footer-bottom">
          <div className="container">
            <div className="hs-footer-bottom-wrap">
              <div className="hs-footer-bottom-left">
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/term-and-condition">Terms &amp; Conditions</Link>
              </div>
              <div className="hs-footer-bottom-right">
                <span className="hs-follow-label">Follow us</span>
                <ul className="hs-footer-social">
                  <li>
                    <a href="https://wa.me/16173196993" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/hsracegear/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/profile.php?id=61580765382460" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.tiktok.com/@hsracipk5hl" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.17V11.7a4.83 4.83 0 01-3.58-1.43V6.69h3.58z" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ── COPYRIGHT BAR ── */}
        <div className="footer-copyright">
          <div className="container">
            <p className="hs-copyright-text">Copyright &copy; 2026 by HS Race Gear. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
