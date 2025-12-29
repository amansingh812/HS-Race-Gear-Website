import React from "react";
import Nav from "./Nav";
import Link from "next/link";
import LanguageSelect from "../common/LanguageSelect";
import CurrencySelect from "../common/CurrencySelect";
import WishlistLength from "../common/WishlistLength";
import CartLength from "../common/CartLength";
import Image from "next/image";
import Nav2 from "./Nav2";
import Nav3 from "./Nav3";
export default function Header3() {
  return (
    <header id="header" className="header-default header-absolute-2">
      <div className="header-top">
        <div className="container">
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
              {/* Temporarily replace image logo with text */}
              {/*
              <Link href={`/home-electronic`} className="logo-header">
                <Image
                  alt="logo"
                  className="logo"
                  src="/images/logo/logo.svg"
                  width={148}
                  height={44}
                />
              </Link>
              */}
              <div className="logo-text h5 fw-bold">H&amp;S Racegear</div>
            </div>
            <div className="col-xl-6 d-none d-xl-block"></div>
            <div className="col-xl-4 col-md-4 col-3">
              <div className="header-right-content d-flex justify-content-end align-items-center gap-3">
                <Image
                  alt="sfi approved"
                  className="sfi-approved-logo"
                  src="/images/sfi-approved.png"
                  width={100}
                  height={40}
                />
                <ul className="nav-icon d-flex justify-content-end align-items-center">
                <li className="nav-search">
                  <a
                    href="#search"
                    data-bs-toggle="modal"
                    className="nav-icon-item"
                  >
                    <i className="icon icon-search" />
                  </a>
                </li>
                <li className="nav-account">
                  <a
                    href="#login"
                    data-bs-toggle="offcanvas"
                    className="nav-icon-item"
                  >
                    <i className="icon icon-user" />
                  </a>
                </li>
                <li className="nav-wishlist">
                  <Link href={`/wish-list`} className="nav-icon-item">
                    <i className="icon icon-heart" />
                    <span className="count-box">
                      <WishlistLength />
                    </span>
                  </Link>
                </li>
                <li className="nav-cart">
                  <a
                    href="#shoppingCart"
                    data-bs-toggle="offcanvas"
                    className="nav-icon-item"
                  >
                    <i className="icon icon-cart" />
                    <span className="count-box">
                      {" "}
                      <CartLength />
                    </span>
                  </a>
                </li>
              </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-bottom d-none d-xl-block">
        <div className="container">
          <nav className="box-navigation text-center">
            <ul className="box-nav-menu">
              <Nav/>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
