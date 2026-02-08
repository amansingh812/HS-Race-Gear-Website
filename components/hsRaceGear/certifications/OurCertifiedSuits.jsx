import React from "react";

export default function OurCertifiedSuits() {
  const sfi5Suits = [
    "Custom Nomex® Sprint Car Race Suits – SFI 3.2A/5",
    "Winged Sprint Car Fire Suits – SFI 3.2A/5",
    "Non-Wing Sprint Car Fire Suits – SFI 3.2A/5",
    "Dirt Track & Short Track Race Suits – SFI 3.2A/5",
    "Drag Racing Fire Suits – SFI 3.2A/5",
  ];

  const sfi1Suits = [
    "Entry-Level Fire Suits – SFI 3.2A/1",
    "Track Day & Club Racing Fire Suits – SFI 3.2A/1",
    "Lightweight Racing Suits for Low-Risk Classes – SFI 3.2A/1",
  ];

  const suitIncludes = [
    "Official SFI certification label matching the specific rating",
    "Fire-resistant construction compliant with SFI material standards",
    "Approved stitching, seam construction, and garment design",
    "Clear certification identification for technical inspection",
  ];

  const commitment = [
    "Built to meet SFI 3.2A/5 standards & SFI 3.2A/1",
    "Constructed with multi-layer fire-resistant materials",
    "Designed for full coverage, ergonomic fit, and racing mobility",
    "Manufactured under strict quality control procedures",
    "Supplied with proper SFI certification labeling",
  ];

  return (
    <section className="certified-suits-section">
      <div className="container">
        <div className="cert-section-title">
          <h2>Our Specific SFI Certifications</h2>
          <p>
            All fire suits available on our webstore are built to meet official SFI certification standards,
            with the exact rating clearly stated on each product page.
          </p>
        </div>

        {/* Our Commitment */}
        <div className="commitment-banner">
          <h4>Our Commitment to SFI-Approved Safety</h4>
          <p>All our custom Nomex® fire suits are:</p>
          <div className="commitment-grid">
            {commitment.map((item, index) => (
              <div className="commitment-item" key={index}>
                <i className="icon-check"></i>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="commitment-notice">
            <p>
              <strong>Important:</strong> We do not sell "SFI-style" or "SFI-rated equivalent" products. Every certified suit is built to meet the actual specification—no compromises.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {/* SFI 3.2A/5 Suits */}
          <div className="col-lg-6">
            <div className="suits-card">
              <div className="suits-header level-5">
                <div className="header-badge">5</div>
                <h5>SFI 3.2A/5 Certified Suits</h5>
              </div>
              <div className="suits-body">
                <ul className="suits-list list-primary">
                  {sfi5Suits.map((suit, index) => (
                    <li key={index}>
                      <span className="suit-icon">
                        <i className="icon-check"></i>
                      </span>
                      <span>{suit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* SFI 3.2A/1 Suits */}
          <div className="col-lg-6">
            <div className="suits-card">
              <div className="suits-header level-1">
                <div className="header-badge">1</div>
                <h5>SFI 3.2A/1 Certified Suits</h5>
              </div>
              <div className="suits-body">
                <ul className="suits-list list-info">
                  {sfi1Suits.map((suit, index) => (
                    <li key={index}>
                      <span className="suit-icon">
                        <i className="icon-check"></i>
                      </span>
                      <span>{suit}</span>
                    </li>
                  ))}
                </ul>
                <div className="series-footer-note" style={{ marginTop: '20px' }}>
                  <p>
                    <i className="icon-info-circle me-2" style={{ color: 'var(--cert-info)' }}></i>
                    If higher ratings (SFI 3.2A/10 or SFI 3.2A/15) are required for your racing series, these can be offered by request depending on design, material selection, and sanctioning body requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Each Certified Suit Includes */}
        <div className="row mt_50">
          <div className="col-12">
            <div className="sfi-meaning-card">
              <h5 style={{ color: 'var(--cert-secondary)', fontWeight: 700, marginBottom: '25px' }}>
                Each Certified Suit Includes
              </h5>
              <div className="row g-3">
                {suitIncludes.map((item, index) => (
                  <div className="col-lg-6 col-md-6" key={index}>
                    <div className="verification-list" style={{ margin: 0 }}>
                      <li style={{ margin: 0 }}>
                        <span className="verify-icon">
                          <i className="icon-check"></i>
                        </span>
                        <span>{item}</span>
                      </li>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
