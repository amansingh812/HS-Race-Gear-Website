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
  const FireIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '4px', verticalAlign: 'middle', marginTop: '-2px' }}>
      <path d="M12 23C16.5 23 20 19.5 20 15C20 11 17 8.5 15 7C14.5 10 13 11.5 11.5 11.5C11.5 11.5 12.5 8 10 4C8.5 6 6 8 5 10.5C4 13 4 15 4 15C4 19.5 7.5 23 12 23Z" fill="url(#mobile-fire1)" stroke="none" />
      <path d="M12 23C14.5 23 16.5 21 16.5 18.5C16.5 16 15 14.5 14 13.5C13.7 15 13 16 12 16C12 16 12.5 14.5 11 12C10 13.5 9 14.5 8.5 16C8 17.5 8 18.5 8 18.5C8 21 9.5 23 12 23Z" fill="url(#mobile-fire2)" stroke="none" />
      <defs>
        <linearGradient id="mobile-fire1" x1="12" y1="4" x2="12" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4D00" />
          <stop offset="1" stopColor="#FF4D00" />
        </linearGradient>
        <linearGradient id="mobile-fire2" x1="12" y1="12" x2="12" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4D00" />
          <stop offset="1" stopColor="#FF4D00" />
        </linearGradient>
      </defs>
    </svg>
  );

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
                  <span><FireIcon /> FIRE DEALS</span>
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

        </div>
      </div>
    </div>
  );
}
