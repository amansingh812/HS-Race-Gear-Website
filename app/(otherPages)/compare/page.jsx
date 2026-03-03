import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Compare from "@/components/otherPages/Compare";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Compare Racing Suits | HS Race Gear",
  description:
    "Compare HS Race Gear custom racing suits with leading brands. See how our SFI-certified suits stack up on quality, fit, price, and customization options.",
};

export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <>
        {/* Breadcrumb */}
        <div className="tf-breadcrumb">
          <div className="container">
            <ul className="breadcrumb-list">
              <li className="item-breadcrumb">
                <Link href={`/`} className="text">
                  Home
                </Link>
              </li>
              <li className="item-breadcrumb dot">
                <span />
              </li>
              <li className="item-breadcrumb">
                <span className="text">Compare Products</span>
              </li>
            </ul>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Title Page */}
        <section className="s-title-page flat-spacing-2 pt-0">
          <div className="container">
            <h4 className="s-title letter-0 text-center">Compare Products</h4>
          </div>
        </section>
        {/* /Title Page */}
      </>
      <Compare />
      <Footer3 />
    </>
  );
}
