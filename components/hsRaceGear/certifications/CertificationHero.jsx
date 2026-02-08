import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CertificationHero() {
  return (
    <section className="cert-hero-section">
      <div className="container">
        <div className="cert-hero-content">
          <div className="cert-hero-text">
            <h1 className="cert-hero-title">SFI Approved Certification</h1>
            <p className="cert-hero-subtitle">SFI 3.2A/5 & SFI 3.2A/1</p>
            <p className="cert-hero-description">
              Safety is nonnegotiable in motorsports. Every fire suit sold on our store is engineered to meet 
              the rigorous demands of professional racing and is built around SFI Foundation–approved standards, 
              specifically SFI 3.2A/5. This certification is one of the most widely recognized and required safety 
              standards in North American motorsports and is trusted globally by sanctioning bodies, race teams, and drivers.
            </p>
            <div className="cert-hero-badges">
              <span className="cert-badge badge-primary">
                <i className="icon-shield"></i>
                SFI 3.2A/5 Certified
              </span>
              <span className="cert-badge badge-secondary">
                <i className="icon-check-circle"></i>
                SFI 3.2A/1 Certified
              </span>
            </div>
          </div>
        </div>
        <div className="cert-hero-image">
          <Image
            src="/images/section/certification-hero.jpg"
            alt="SFI Approved Certification - HS Race Gear Racing Suits"
            className="lazyload"
            width={1440}
            height={502}
            priority
          />
        </div>
      </div>
    </section>
  );
}
