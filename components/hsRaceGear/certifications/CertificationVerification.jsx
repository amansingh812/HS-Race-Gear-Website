import React from "react";
import Image from "next/image";

export default function CertificationVerification() {
  const verificationPoints = [
    {
      icon: "icon-check",
      text: "An official SFI certification patch/label",
    },
    {
      icon: "icon-check",
      text: "A unique manufacturer identification",
    },
    {
      icon: "icon-check",
      text: "The specification number (SFI 3.2A/5) clearly marked",
    },
  ];

  return (
    <section className="verification-section">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div className="verification-content">
              <h3>How SFI Certification Is Verified</h3>
              <p style={{ color: '#555', fontSize: '1.1rem', lineHeight: 1.7 }}>
                Every authentic SFI-approved race suit includes specific identifiers that confirm its certification status:
              </p>
              <ul className="verification-list">
                {verificationPoints.map((point, index) => (
                  <li key={index}>
                    <span className="verify-icon">
                      <i className={point.icon}></i>
                    </span>
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
              <div className="cert-alert alert-info">
                <div className="cert-alert-icon">
                  <i className="icon-info-circle"></i>
                </div>
                <p>
                  SFI conducts ongoing audits and random compliance checks to ensure continued conformity. Certification is not permanent unless the manufacturer maintains compliance.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="verification-image-wrapper">
              <div className="verification-image">
                <Image
                  src="/images/section/sfi-verification.jpg"
                  alt="SFI Certification Verification Label"
                  className="w-100 h-auto"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
