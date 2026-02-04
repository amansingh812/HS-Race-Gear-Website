"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Collections from "./Collections";

export default function Nav() {
  const pathname = usePathname();
  const isMenuActive = (link) => {
    return link?.split("/")[1] == pathname.split("/")[1];
  };

  const customGearItems = [
    { text: "Custom Race Suit", href: "/custom-race-suit" },
    { text: "Custom Karting Suit", href: "/custom-measurement" },
    { text: "Custom Power Boating Suit", href: "/custom-measurement" },
    { text: "Custom Gloves", href: "/custom-measurement" },
    { text: "Custom Shoes", href: "/custom-measurement" },
  ];

  const shopMenuItems = [
    { text: "OFF THE RACK RACE SUIT", href: "/custom-measurement" },
    { text: "CREW SHIRTS", href: "/custom-measurement" },
    { text: "SUBLIMATED CREW HOODIES", href: "/custom-measurement" },
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
          href="/custom-fit"
          className={`item-link ${isMenuActive("/custom-fit") ? "menuActive" : ""
            }`}
        >
          DEALS
        </Link>
      </li>

      <li className="menu-item" style={{ position: "relative" }}>
        <a href="#" className="item-link">
          CUSTOM GEAR
          <i className="icon icon-arr-down" />
        </a>
        <div className="sub-menu" style={{ position: "absolute", top: "100%", left: 0, backgroundColor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", zIndex: 1000 }}>
          <ul className="menu-list" style={{ display: "flex", flexDirection: "column", padding: "2px 0", margin: 0 }}>
            {customGearItems.map((item, index) => (
              <li key={index} style={{ listStyle: "none" }}>
                <Link
                  href={item.href}
                  className={`menu-link-text link ${isMenuActive(item.href) ? "menuActive" : ""}`}
                  style={{ display: "block", padding: "10px 16px", textDecoration: "none", color: "#000", fontSize: "14px", transition: "background-color 0.3s" }}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li >

      <li className="menu-item" style={{ position: "relative" }}>
        <a href="#" className="item-link">
          SHOP
          <i className="icon icon-arr-down" />
        </a>
        <div className="sub-menu" style={{ position: "absolute", top: "100%", left: 0, backgroundColor: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", zIndex: 1000 }}>
          <ul className="menu-list" style={{ display: "flex", flexDirection: "column", padding: "2px 0", margin: 0 }}>
            {shopMenuItems.map((item, index) => (
              <li key={index} style={{ listStyle: "none" }}>
                <Link
                  href={item.href}
                  className={`menu-link-text link ${isMenuActive(item.href) ? "menuActive" : ""}`}
                  style={{ display: "block", padding: "10px 16px", textDecoration: "none", color: "#000", fontSize: "14px", transition: "background-color 0.3s" }}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li >

      <li className="menu-item">
        <Link
          href="/pricing"
          className={`item-link ${isMenuActive("/how-it-works") ? "menuActive" : ""
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
