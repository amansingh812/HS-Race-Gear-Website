"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Nav() {
  const FireIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '4px', verticalAlign: 'middle', marginTop: '-2px' }}>
      <path d="M12 23C16.5 23 20 19.5 20 15C20 11 17 8.5 15 7C14.5 10 13 11.5 11.5 11.5C11.5 11.5 12.5 8 10 4C8.5 6 6 8 5 10.5C4 13 4 15 4 15C4 19.5 7.5 23 12 23Z" fill="url(#nav-fire1)" stroke="none" />
      <path d="M12 23C14.5 23 16.5 21 16.5 18.5C16.5 16 15 14.5 14 13.5C13.7 15 13 16 12 16C12 16 12.5 14.5 11 12C10 13.5 9 14.5 8.5 16C8 17.5 8 18.5 8 18.5C8 21 9.5 23 12 23Z" fill="url(#nav-fire2)" stroke="none" />
      <defs>
        <linearGradient id="nav-fire1" x1="12" y1="4" x2="12" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4D00" />
          <stop offset="1" stopColor="#FF4D00" />
        </linearGradient>
        <linearGradient id="nav-fire2" x1="12" y1="12" x2="12" y2="23" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4D00" />
          <stop offset="1" stopColor="#FF4D00" />
        </linearGradient>
      </defs>
    </svg>
  );

  const pathname = usePathname();
  const isMenuActive = (link) => {
    return link?.split("/")[1] == pathname.split("/")[1];
  };

  const customGearItems = [
    { text: "Custom Race Suit", href: "/custom-race-suit" },
    { text: "Custom Karting Suit", href: "/custom-karting-suit" },
    { text: "Custom Power Boating Suit", href: "/custom-powerboat-suit" },
    { text: "Custom Gloves", href: "/custom-gloves" },
    { text: "Custom Shoes", href: "/custom-shoes" },
  ];

  const shopMenuItems = [
    { text: "OFF THE RACK RACE SUIT", href: "/shop?category=race-suits" },
    { text: "CREW SHIRTS", href: "/shop?category=crew-shirts" },
    { text: "SUBLIMATED CREW HOODIES", href: "/shop?category=hoodies" },
  ];


  return (
    <>
      <li className="menu-item">
        <Link
          href="/"
          className={`item-link ${isMenuActive("/") ? "menuActive" : ""}`}
        >
          HOME
        </Link>
      </li>

      <li className="menu-item">
        <Link
          href="/RacegearDeals"
          className={`item-link ${isMenuActive("/RacegearDeals") ? "menuActive" : ""
            }`}
        >
          FIRE DEALS <FireIcon />
        </Link>
      </li>

      <li className="menu-item has-dropdown">
        <a href="#" className="item-link">
          CUSTOM GEAR
          <i className="icon icon-arr-down" />
        </a>
        <div className="sub-menu hs-nav-dropdown">
          <ul className="hs-dropdown-list">
            {customGearItems.map((item, index) => (
              <li key={index} className="hs-dropdown-item">
                <Link
                  href={item.href}
                  className={`hs-dropdown-link ${isMenuActive(item.href) ? "menuActive" : ""}`}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>

      <li className="menu-item has-dropdown">
        <a href="#" className="item-link">
          SHOP
          <i className="icon icon-arr-down" />
        </a>
        <div className="sub-menu hs-nav-dropdown">
          <ul className="hs-dropdown-list">
            {shopMenuItems.map((item, index) => (
              <li key={index} className="hs-dropdown-item">
                <Link
                  href={item.href}
                  className={`hs-dropdown-link ${isMenuActive(item.href) ? "menuActive" : ""}`}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>

      <li className="menu-item">
        <Link
          href="/StandardPricing"
          className={`item-link ${isMenuActive("/StandardPricing") ? "menuActive" : ""
            }`}
        >
          PRICING
        </Link>
      </li>

      <li className="menu-item">
        <Link
          href="/custom-measurement"
          className={`item-link ${isMenuActive("/custom-measurement") ? "menuActive" : ""
            }`}
        >
          CUSTOM MEASUREMENT FORM
        </Link>
      </li>

      <li className="menu-item">
        <Link
          href="/custom-fit"
          className={`item-link ${isMenuActive("/custom-fit") ? "menuActive" : ""}`}
        >
          HOW TO MEASURE
        </Link>
      </li>

      <li className="menu-item">
        <Link
          href="/faq"
          className={`item-link ${isMenuActive("/faq") ? "menuActive" : ""}`}
        >
          FAQS
        </Link>
      </li>

      <li className="menu-item">
        <Link
          href="/about-us"
          className={`item-link ${isMenuActive("/about-us") ? "menuActive" : ""
            }`}
        >
          ABOUT US
        </Link>
      </li>
    </>
  );
}
