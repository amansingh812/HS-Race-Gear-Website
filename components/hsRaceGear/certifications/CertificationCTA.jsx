import React from "react";
import Link from "next/link";

export default function CertificationCTA() {
  return (
    <section className="cert-cta-section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="cta-card">
              <div className="cta-icon">
                <i className="icon-shield"></i>
              </div>
              <h3>Final Note on Driver Safety</h3>
              <p className="cta-description">
                SFI certification is more than a label—it is verified proof that your race suit meets real-world fire protection standards. Whether you choose an SFI 3.2A/5 suit for competitive racing or an SFI 3.2A/1 suit for entry-level and permitted applications, you are selecting certified protection designed for compliance, safety, and confidence on track.
              </p>
              <p className="cta-subtext">
                For questions about certification levels, racing body compliance, or custom safety requirements, our team is ready to assist.
              </p>
              <div className="cta-buttons">
                <Link href="/shop" className="cta-btn btn-primary">
                  <span>Shop SFI Certified Suits</span>
                  <i className="icon icon-arrow-right" />
                </Link>
                <Link href="/contact-us" className="cta-btn btn-outline">
                  <span>Contact Our Team</span>
                  <i className="icon icon-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
