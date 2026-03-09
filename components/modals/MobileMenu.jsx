"use client";
import Link from "next/link";
import React, { useCallback } from "react";
import { usePathname } from "next/navigation";

const customGearItems = [
  { text: "Custom Race Suit", href: "/custom-race-suit" },
  { text: "Custom Karting Suit", href: "/custom-karting-suit" },
  { text: "Custom Power Boating Suit", href: "/custom-powerboat-suit" },
  { text: "Custom Gloves", href: "/custom-gloves" },
  { text: "Custom Shoes", href: "/custom-shoes" },
];

const shopMenuItems = [
  { text: "SHOP ALL", href: "/shop" },
  { text: "OFF THE RACK RACE SUIT", href: "/shop?category=race-suits" },
  { text: "CREW SHIRTS", href: "/shop?category=crew-shirts" },
  { text: "SUBLIMATED CREW HOODIES", href: "/shop?category=hoodies" },
];

export default function MobileMenu() {
  const pathname = usePathname();
  const isActive = (href) => href?.split("/")[1] === pathname.split("/")[1];

  const closeMenu = useCallback(() => {
    const el = document.getElementById("mobileMenu");
    if (!el) return;
    try {
      const bootstrap = require("bootstrap");
      const instance = bootstrap.Offcanvas.getInstance(el);
      if (instance) instance.hide();
    } catch (e) {
      // fallback: remove Bootstrap classes manually
      el.classList.remove("show");
      document.body.classList.remove("offcanvas-backdrop");
      const backdrop = document.querySelector(".offcanvas-backdrop");
      if (backdrop) backdrop.remove();
    }
  }, []);

  return (
    <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
      <button
        className="icon-close icon-close-popup"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
      <div className="mb-canvas-content">
        <div className="mb-body">
          <div className="mb-content-top">
            <ul className="nav-ul-mb" id="wrapper-menu-navigation">

              {/* HOME */}
              <li className="nav-mb-item">
                <Link
                  href="/"
                  className={`mb-menu-link ${isActive("/") ? "menuActive" : ""}`}
                  onClick={closeMenu}
                >
                  <span>HOME</span>
                </Link>
              </li>

              {/* DEALS */}
              <li className="nav-mb-item">
                <Link
                  href="/RacegearDeals"
                  className={`mb-menu-link ${isActive("/RacegearDeals") ? "menuActive" : ""}`}
                  onClick={closeMenu}
                >
                  <span>DEALS</span>
                </Link>
              </li>

              {/* CUSTOM GEAR (with sub-items) */}
              <li className="nav-mb-item">
                <a
                  href="#dropdown-menu-custom-gear"
                  className="collapsed mb-menu-link"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  aria-controls="dropdown-menu-custom-gear"
                >
                  <span>CUSTOM GEAR</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-custom-gear" className="collapse">
                  <ul className="sub-nav-menu">
                    {customGearItems.map((item, i) => (
                      <li key={i}>
                        <Link
                          href={item.href}
                          className={`sub-nav-link ${isActive(item.href) ? "menuActive" : ""}`}
                          onClick={closeMenu}
                        >
                          {item.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* SHOP (with sub-items) */}
              <li className="nav-mb-item">
                <a
                  href="#dropdown-menu-shop"
                  className="collapsed mb-menu-link"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  aria-controls="dropdown-menu-shop"
                >
                  <span>SHOP</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-shop" className="collapse">
                  <ul className="sub-nav-menu">
                    {shopMenuItems.map((item, i) => (
                      <li key={i}>
                        <Link
                          href={item.href}
                          className={`sub-nav-link ${isActive(item.href) ? "menuActive" : ""}`}
                          onClick={closeMenu}
                        >
                          {item.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* PRICING */}
              <li className="nav-mb-item">
                <Link
                  href="/StandardPricing"
                  className={`mb-menu-link ${isActive("/StandardPricing") ? "menuActive" : ""}`}
                  onClick={closeMenu}
                >
                  <span>PRICING</span>
                </Link>
              </li>

              {/* CUSTOM MEASUREMENT FORM */}
              <li className="nav-mb-item">
                <Link
                  href="/custom-measurement"
                  className={`mb-menu-link ${isActive("/custom-measurement") ? "menuActive" : ""}`}
                  onClick={closeMenu}
                >
                  <span>CUSTOM MEASUREMENT FORM</span>
                </Link>
              </li>

              {/* HOW TO MEASURE */}
              <li className="nav-mb-item">
                <Link
                  href="/custom-fit"
                  className={`mb-menu-link ${isActive("/custom-fit") ? "menuActive" : ""}`}
                  onClick={closeMenu}
                >
                  <span>HOW TO MEASURE</span>
                </Link>
              </li>

              {/* FAQS */}
              <li className="nav-mb-item">
                <Link
                  href="/faq"
                  className={`mb-menu-link ${isActive("/faq") ? "menuActive" : ""}`}
                  onClick={closeMenu}
                >
                  <span>FAQS</span>
                </Link>
              </li>

              {/* ABOUT US */}
              <li className="nav-mb-item">
                <Link
                  href="/about-us"
                  className={`mb-menu-link ${isActive("/about-us") ? "menuActive" : ""}`}
                  onClick={closeMenu}
                >
                  <span>ABOUT US</span>
                </Link>
              </li>

            </ul>
          </div>
          <div className="mb-other-content">
            <div className="mb-contact">
              <p>Address: 59 Kondazian St, Watertown MA, 02472</p>
            </div>
            <ul className="mb-info">
              <li>
                Email: <b className="fw-medium">clientcare@hsracegear.com</b>
              </li>
              <li>
                Phone: <b className="fw-medium">+1 (617) 319 6993</b>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
