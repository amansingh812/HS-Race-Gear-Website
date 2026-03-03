import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Page Not Found | HS Race Gear",
  description:
    "The page you're looking for doesn't exist. Return to the HS Race Gear homepage to explore custom racing suits, gear, and accessories.",
};

export default function page() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <section className="flat-spacing">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wg-404">
                <div className="image">
                  <Image
                    src="/images/banner/404.png"
                    alt={404}
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
