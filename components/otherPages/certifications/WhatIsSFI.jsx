import React from "react";
import Image from "next/image";

export default function WhatIsSFI() {
  const sfiMeaning = [
    {
      icon: "icon-check",
      title: "Laboratory Tested",
      text: "The materials have been laboratory tested for fire resistance",
    },
    {
      icon: "icon-check",
      title: "Design Standards",
      text: "The garment design meets construction and coverage requirements",
    },
    {
      icon: "icon-check",
      title: "Quality Audited",
      text: "The manufacturer is audited for quality control and consistency",
    },
    {
      icon: "icon-check",
      title: "SFI Compliant",
      text: "The product complies with a specific, published SFI specification",
    },
  ];

  return (
    <section className="what-is-sfi-section">
      <div className="container">
        <div className="cert-section-title">
          <h2>What Is SFI Certification?</h2>
          <p>
            The SFI Foundation, Inc. is an independent, nonprofit organization that develops and administers safety standards
            for motorsports and performance racing equipment. SFI does not manufacture products; instead, it tests, certifies,
            and audits manufacturers to ensure products meet strict performance and safety benchmarks.
          </p>
        </div>
        <div className="row align-items-center g-5">
          <div className="col-xl-7 col-lg-6">
            <div className="sfi-meaning-card">
              <h5 className="mb_25" style={{ color: 'var(--cert-secondary)', fontWeight: 700 }}>
                When a race suit carries an SFI approval label, it means:
              </h5>
              <ul className="sfi-meaning-list">
                {sfiMeaning.map((item, index) => (
                  <li key={index}>
                    <div className="sfi-meaning-icon">
                      <i className={item.icon}></i>
                    </div>
                    <div className="sfi-meaning-text">
                      <h6>{item.title}</h6>
                      <p>{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cert-alert alert-info mt_30">
                <div className="cert-alert-icon">
                  <i className="icon-info-circle"></i>
                </div>
                <p>
                  SFI certifications are widely required by major racing organizations and tracks to ensure driver safety in high-risk environments.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6">
            <div className="verification-image">
              <Image
                src="/images/section/sfi-certification-label.jpg"
                alt="SFI Certification Label on Racing Suit"
                className="w-100 h-auto"
                width={586}
                height={586}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
