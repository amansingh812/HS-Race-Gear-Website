import React from "react";
import Link from "next/link";

export default function CustomFitHero() {
  return (
    <section className="flat-spacing-9">
      <div className="container">
        <div className="tf-grid-layout md-col-2 gap-30">
          <div className="tf-content-left">
            <div className="heading">
              <h2 className="heading-title">
                Custom-Tailored Racing Suits
              </h2>
              <p className="text_black-2 mb_30">
                Unbeatable Prices, 3.5 Weeks Turnaround, SFI Rated, 100% Customizable, Custom Fit, Fire Retardant Fabric
              </p>
              <p className="text_black-2 mb_30">
                Protect yourself with premium, life-saving custom auto racing suits meticulously crafted to meet the highest safety standards of SFI 3.2A/1 and SFI 3.2A/5. Each suit is crafted with precision and tailored to your exact body measurements for a flawless, comfortable fit. Choose from 1-piece, 2-piece, or jacket-style designs built for flexibility, protection, and performance.
              </p>
              <div className="d-flex gap-15 flex-wrap">
                <Link href="/shop" className="tf-btn btn-fill animate-hover-btn radius-3 btn-xl">
                  <span>Design My Custom Race Suit (FREE)</span>
                  <i className="icon icon-arrow-right" />
                </Link>
              </div>
              <div className="mt_30">
                <ul className="tf-custom-list">
                  <li className="list-item">
                    <i className="icon-check"></i>
                    <span className="text">💳 No Credit Card Required</span>
                  </li>
                  <li className="list-item">
                    <i className="icon-check"></i>
                    <span className="text">♾️ Unlimited Free Design Revisions</span>
                  </li>
                  <li className="list-item">
                    <i className="icon-check"></i>
                    <span className="text">100% customizable in colors, prints, graphics, sizes, cuts, and logos</span>
                  </li>
                  <li className="list-item">
                    <i className="icon-check"></i>
                    <span className="text">SFI certified — meeting industry safety standards for maximum protection</span>
                  </li>
                  <li className="list-item">
                    <i className="icon-check"></i>
                    <span className="text">Safe on the track with Nomex® meta-aramid fire retardant fabric</span>
                  </li>
                  <li className="list-item">
                    <i className="icon-check"></i>
                    <span className="text">Quickest turn-around time: 3.5 weeks</span>
                  </li>
                  <li className="list-item">
                    <i className="icon-check"></i>
                    <span className="text">Price match guarantee and free shipping in the USA</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="tf-content-right">
            <div className="img-custom-fit">
              <img
                className="lazyload w-100"
                data-src="/images/shop/custom-suit-1.jpg"
                src="/images/shop/custom-suit-1.jpg"
                alt="Custom Fit Racing Suit"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
