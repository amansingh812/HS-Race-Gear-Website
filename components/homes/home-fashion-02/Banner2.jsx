import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Banner2() {
  return (
    <div className="s-banner-colection flat-spacing-6">
      <div className="container">
        <div className="banner-content tf-grid-layout tf-col-2 hover-overlay-2">
          <div className="image img-hv-overlay">
            <Image
              src="/images/banner/racing-2.png"
              alt="Fire Suits Technology"
              className="lazyload"
              width={719}
              height={676}
            />
          </div>
          <div className="box-content">
            <div className="box-title-banner wow fadeInUp">
              <p className="title display-md fw-medium">
                Experience the Best in Fire Suits Technology
              </p>
            </div>
            <div className="features-list wow fadeInUp">
              <ul className="list-unstyled text-md mb-4">
                <li className="mb-2">
                  <i className="icon icon-check me-2"></i>
                  Premium Nomex® inner lining for maximum safety and protection
                </li>
                <li className="mb-2">
                  <i className="icon icon-check me-2"></i>
                  Tailored to fit your body perfectly and comfortably
                </li>
                <li className="mb-2">
                  <i className="icon icon-check me-2"></i>
                  Enhanced lower back panel for added comfort and support
                </li>
                <li className="mb-2">
                  <i className="icon icon-check me-2"></i>
                  Strategically placed stretch panels for increased flexibility
                </li>
                <li className="mb-2">
                  <i className="icon icon-check me-2"></i>
                  Made with durable Meta Para Aramid Nomex® outer shell material
                </li>
                <li className="mb-2">
                  <i className="icon icon-check me-2"></i>
                  Unlimited logo options available to choose from
                </li>
                <li className="mb-2">
                  <i className="icon icon-check me-2"></i>
                  Unlimited suit color options to match your preferences
                </li>
                <li className="mb-2">
                  <i className="icon icon-check me-2"></i>
                  Unlimited embroidery possibilities for customization
                </li>
                <li className="mb-2">
                  <i className="icon icon-check me-2"></i>
                  Unlimited mockup revisions for perfect design
                </li>
              </ul>
            </div>
            <div className="box-btn-banner wow fadeInUp">
              <Link
                href={`/shop-sub-collection`}
                className="tf-btn animate-btn"
              >
                Explore Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
