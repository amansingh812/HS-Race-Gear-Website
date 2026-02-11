import React from "react";
import Link from "next/link";

const certifications = [
  { name: "SFI Foundation", desc: "SFI 3.2A/1 & 3.2A/5" },
  { name: "FIA", desc: "FIA 8856-2018" },
  { name: "CIK-FIA", desc: "Karting Homologation" },
  { name: "Nomex", desc: "Fire-Resistant Fabric" },
];

export default function CertificationTrust() {
  return (
    <section className="cert-trust">
      <div className="container">
        <div className="cert-trust__header">
          <h2 className="cert-trust__title">Certified for Your Safety</h2>
          <p className="cert-trust__subtitle">
            Every product meets or exceeds international motorsport safety standards
          </p>
        </div>

        <div className="cert-trust__logos">
          {certifications.map((cert, index) => (
            <div key={index} className="cert-trust__logo-card">
              <div className="cert-trust__logo-placeholder">
                <div className="img-placeholder" style={{ borderRadius: "4px" }}>
                  150 x 100
                </div>
              </div>
              <div className="cert-trust__logo-name">{cert.name}</div>
              <small style={{ color: "#666", fontSize: "0.75rem" }}>{cert.desc}</small>
            </div>
          ))}
        </div>

        <p className="cert-trust__text">
          At HS Race Gear, safety is not optional — it is foundational. All our racing suits,
          gloves, and shoes are independently tested and certified to meet SFI and FIA standards,
          giving you confidence every time you get behind the wheel.
        </p>

        <div className="cert-trust__cta">
          <Link href="/certifications">
            View All Certifications <i className="icon icon-arr-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
