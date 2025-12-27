import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Collections() {
  return (
    <div>
      <div className="container">
        <div className="grid-cls grid-cls-v1">
          <div className="item1 wg-cls style-abs hover-img">
            <Link href={`/shop-default`} className="image img-style d-block">
              <Image
                src="/images/cls-categories/grid-cls/furniture-1.jpg"
                alt="cls"
                className="ls-is-cached lazyloaded"
                width={708}
                height={708}
              />
            </Link>
            <div className="cls-btn text-center wow fadeInUp">
              <Link
                href={`/shop-default`}
                className="tf-btn btn-cls btn-white animate-btn animate-dark"
              >
                Chairs
              </Link>
            </div>
          </div>
          <div className="item2 wg-cls style-abs hover-img">
            <Link href={`/shop-default`} className="image img-style d-block">
              <Image
                src="/images/cls-categories/grid-cls/furniture-2.jpg"
                alt="cls"
                className="ls-is-cached lazyloaded"
                width={708}
                height={342}
              />
            </Link>
            <div className="cls-btn text-center wow fadeInUp">
              <Link
                href={`/shop-default`}
                className="tf-btn btn-cls btn-white animate-btn animate-dark"
              >
                Tables
              </Link>
            </div>
          </div>
          <div className="item3 wg-cls style-abs hover-img">
            <Link href={`/shop-default`} className="image img-style d-block">
              <Image
                src="/images/cls-categories/grid-cls/furniture-3.jpg"
                alt="cls"
                className="ls-is-cached lazyloaded"
                width={708}
                height={342}
              />
            </Link>
            <div className="cls-btn text-center wow fadeInUp">
              <Link
                href={`/shop-default`}
                className="tf-btn btn-cls btn-white animate-btn animate-dark"
              >
                Decorations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
