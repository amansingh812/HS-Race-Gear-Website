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

  const shopMenuItems = [
    {
      heading: "Racing Suits",
      links: [
        { text: "Custom Racing Suits", href: "/shop" },
        { text: "FIA Approved Suits", href: "/shop" },
        { text: "Karting Suits", href: "/shop" },
        { text: "Pre-Made Suits", href: "/shop" },
      ],
    },
    {
      heading: "Accessories",
      links: [
        { text: "Racing Gloves", href: "/shop" },
        { text: "Racing Shoes", href: "/shop" },
      ],
    },
    {
      heading: "Team Wear",
      links: [
        { text: "Team Wear", href: "/shop" },
      ],
    },
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
          href="/custom-fit"
          className={`item-link ${isMenuActive("/custom-fit") ? "menuActive" : ""
            }`}
        >
          CUSTOM FIT
        </Link>
      </li>

      <li className="menu-item">
        <a href="#" className="item-link">
          SHOP
          <i className="icon icon-arr-down" />
        </a>
        <div className="sub-menu mega-menu mega-shop">
          <div className="wrapper-sub-menu">
            {shopMenuItems.map((menuItem, index) => (
              <div className="mega-menu-item" key={index}>
                <div className="menu-heading">{menuItem.heading}</div>
                <ul className="menu-list">
                  {menuItem.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className={`menu-link-text link ${isMenuActive(link.href) ? "menuActive" : ""
                          }`}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Collections />
        </div>
      </li>

      <li className="menu-item">
        <Link
          href="/coming-soon"
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
