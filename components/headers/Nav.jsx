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
        { text: "Custom Racing Suits", href: "/coming-soon" },
        { text: "FIA Approved Suits", href: "/coming-soon" },
        { text: "Karting Suits", href: "/coming-soon" },
        { text: "Pre-Made Suits", href: "/coming-soon" },
      ],
    },
    {
      heading: "Accessories",
      links: [
        { text: "Racing Gloves", href: "/coming-soon" },
        { text: "Racing Shoes", href: "/coming-soon" },
      ],
    },
    {
      heading: "Team Wear",
      links: [
        { text: "Team Wear", href: "/coming-soon" },
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
          Home
        </Link>
      </li>

      <li className="menu-item">
        <a href="#" className="item-link">
          Shop
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
                        className={`menu-link-text link ${
                          isMenuActive(link.href) ? "menuActive" : ""
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
          className={`item-link ${
            isMenuActive("/coming-soon") ? "menuActive" : ""
          }`}
        >
          Custom Fit
        </Link>
      </li>

      <li className="menu-item">
        <Link
          href="/coming-soon"
          className={`item-link ${
            isMenuActive("/how-it-works") ? "menuActive" : ""
          }`}
        >
          How It Works
        </Link>
      </li>

      <li className="menu-item">
        <Link
          href="/coming-soon"
          className={`item-link ${
            isMenuActive("/certifications") ? "menuActive" : ""
          }`}
        >
          Certifications
        </Link>
      </li>

      <li className="menu-item">
        <Link
          href="/faq"
          className={`item-link ${isMenuActive("/faq") ? "menuActive" : ""}`}
        >
          FAQ
        </Link>
      </li>

      <li className="menu-item">
        <Link
          href="/about-us"
          className={`item-link ${
            isMenuActive("/about-us") ? "menuActive" : ""
          }`}
        >
          About Us
        </Link>
      </li>

      <li className="menu-item">
        <Link
          href="/contact-us"
          className={`item-link ${
            isMenuActive("/contact-us") ? "menuActive" : ""
          }`}
        >
          Contact
        </Link>
      </li>
    </>
  );
}
