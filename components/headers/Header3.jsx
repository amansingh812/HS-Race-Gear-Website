import React from "react";
import Nav from "./Nav";
import Link from "next/link";

import CartLength from "../common/CartLength";
import Image from "next/image";

export default function Header3() {
  return (
    <header id="header" className="header-default header-absolute-2">
      {/* Mobile Logo Bar — visible only on small screens */}
      <div className="mobile-logo-bar d-md-none">
        <a
          href="#mobileMenu"
          className="mobile-menu-trigger"
          data-bs-toggle="offcanvas"
          aria-controls="mobileMenu"
        >
          <i className="icon icon-categories1" />
        </a>
        <div className="mobile-logo-center">
          <Link href="/" className="mobile-hs-logo">
            <Image
              alt="HS Race Gear"
              src="/images/logo/logo4.png"
              width={120}
              height={64}
              quality={100}
            />
          </Link>
          <div className="mobile-logo-divider" />
          <Image
            alt="SFI Approved"
            className="mobile-sfi-logo"
            src="/images/sfi-approved.png"
            width={60}
            height={28}
          />
        </div>
      </div>

      {/* Desktop Header Row — hidden on mobile */}
      <div className="header-top d-none d-md-block">
        <div className="container">
          <div className="row wrapper-header align-items-center">

            {/* Mobile Menu Trigger — tablet only */}
            <div className="col-md-4 col-3 d-xl-none">
              <a
                href="#mobileMenu"
                className="mobile-menu"
                data-bs-toggle="offcanvas"
                aria-controls="mobileMenu"
              >
                <i className="icon icon-categories1" />
              </a>
            </div>

            {/* Logo Section */}
            <div className="col-xl-2 col-md-4 col-6">
              <Link href={`/`} className="logo-header">
                <Image
                  alt="HS Race Gear"
                  className="logo"
                  src="/images/logo/logo4.png"
                  width={148}
                  height={79}
                  quality={100}
                />
              </Link>
            </div>

            {/* Middle Spacer */}
            <div className="col-xl-5 d-none d-xl-block"></div>

            {/* RIGHT SIDE - RACING STYLE DESIGN */}
            <div className="col-xl-5 col-md-4 col-3">
              <div className="header-right-content d-flex justify-content-end align-items-center gap-5">

                {/* SFI Logo */}
                <Image
                  alt="sfi approved"
                  className="sfi-approved-logo d-none d-lg-block"
                  src="/images/sfi-approved.png"
                  width={100}
                  height={45}
                />

                <div className="racing-tools">

                  <a
                    href="#search"
                    data-bs-toggle="modal"
                    className="skew-box outline-red"
                  >
                    <span className="skew-content">
                      <i className="icon icon-search" style={{ fontSize: '0.9rem' }} />
                    </span>
                  </a>

                  <a
                    href="#shoppingCart"
                    data-bs-toggle="offcanvas"
                    className="skew-box filled-dark"
                  >
                    <span className="skew-content">
                      <i className="icon icon-cart" />

                      <span className="cart-badge">
                        <CartLength />
                      </span>
                    </span>
                  </a>

                  <a
                    href="#login"
                    data-bs-toggle="offcanvas"
                    className="skew-box filled-dark"
                  >
                    <span className="skew-content">
                      <i className="icon icon-user" />
                      {/* Badge inside skew-content so it doesn't get skewed */}
                      <span className="cart-badge">
                        <CartLength />
                      </span>
                    </span>
                  </a>
                </div>
                {/* End Racing Tools */}

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header-bottom d-none d-xl-block">
        <div className="container">
          <nav className="box-navigation text-center">
            <ul className="box-nav-menu">
              <Nav />
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
