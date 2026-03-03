import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Page Not Found || HS Race Gear",
  description: "The page you're looking for couldn't be found. Return to HS Race Gear to explore our custom racing suits and gear.",
};

export default function page() {
  return (
    <>
      <Topbar1 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header3 />
      <section className="flat-spacing">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wg-404">
                <div className="image">
                  <Image
                    src="/images/banner/404.png"
                    alt="404 - Page Not Found"
                    className="lazyload"
                    width={472}
                    height={472}
                  />
                </div>
                <p className="title">Whoops!</p>
                <p className="text-md sub text-main">
                  We couldn't find the page you were looking for.
                </p>
                <div className="bot">
                  <Link href={`/`} className="tf-btn btn-fill animate-btn">
                    Return to Homepage
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer3 />
    </>
  );
}
