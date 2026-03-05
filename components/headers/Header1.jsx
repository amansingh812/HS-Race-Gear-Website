"use client";
import React from "react";
import Nav from "./Nav";
import Link from "next/link";
import CartLength from "../common/CartLength";
import Image from "next/image";

export default function Header1({
  parentClass = "header-default",
  fullWidth = false,
}) {
  return (
    <header id="header" className={parentClass}>
      <div className={fullWidth ? "container-full" : "container"}>
        <div className="row wrapper-header align-items-center">
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
          <div className="col-xl-2 col-md-4 col-6">
            <Link href={`/`} className="logo-header">
              <Image
                alt="HS Race Gear"
                className="logo"
                src="/images/logo/logo.webp"
                width={148}
                height={44}
              />
            </Link>
          </div>
          <div className="col-xl-8 d-none d-xl-block">
            <nav className="box-navigation text-center">
              <ul className="box-nav-menu">
                <Nav />
              </ul>
            </nav>
          </div>
          <div className="col-xl-2 col-md-4 col-3">
            <div className="d-flex justify-content-end align-items-center">
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
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
