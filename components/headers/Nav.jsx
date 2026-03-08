"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Nav() {
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

  // const shopMenuItems = [
  //   {
  //     heading: "Racing Suits",
  //     links: [
  //       { text: "Custom Racing Suits", href: "/shop" },
  //       { text: "FIA Approved Suits", href: "/shop" },
  //       { text: "Karting Suits", href: "/shop" },
  //       { text: "Pre-Made Suits", href: "/shop" },
  //     ],
  //   },
  //   {
  //     heading: "Accessories",
  //     links: [
  //       { text: "Racing Gloves", href: "/shop" },
  //       { text: "Racing Shoes", href: "/shop" },
  //     ],
  //   },
  //   {
  //     heading: "Team Wear",
  //     links: [
  //       { text: "Team Wear", href: "/shop" },
  //     ],
  //   },
  // ];

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
          DEALS
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
