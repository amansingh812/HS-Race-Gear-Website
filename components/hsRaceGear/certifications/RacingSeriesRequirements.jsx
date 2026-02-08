import React from "react";

export default function RacingSeriesRequirements() {
  const sfi5Series = [
    "Sprint Car Racing (Winged & Non-Winged)",
    "Dirt Track Racing",
    "Late Model Racing",
    "Modifieds",
    "Drag Racing",
    "Stock Car Racing",
    "Midget Racing",
    "Asphalt & Short Track Series",
    "Track Day & Club Racing (where fire protection is mandated)",
  ];

  const sfi1Series = [
    "Track Day & HPDE events",
    "Club Racing & Amateur Racing Series",
    "Entry-Level or Beginner Racing Classes",
    "Exhibition & Practice Events",
    "Lower-Speed Asphalt or Short Track Categories",
    "Vintage Racing (where regulations allow)",
  ];

  return (
    <section className="racing-series-section">
      <div className="container">
        <div className="cert-section-title">
          <h2>Racing Series Requirements</h2>
          <p>
            Different racing categories have different SFI certification requirements.
            Always check your specific rulebook to confirm the required certification level.
          </p>
        </div>

        <div className="row g-4">
          {/* SFI 3.2A/5 Required */}
          <div className="col-lg-6">
            <div className="series-card">
              <div className="series-header level-5">
                <div className="header-badge">
                  <i className="icon-shield"></i>
                </div>
                <h5>Racing Series That Commonly Require SFI 3.2A/5</h5>
              </div>
              <div className="series-body">
                <p className="intro">
                  SFI 3.2A/5–rated suits are commonly accepted or required in:
                </p>
                <ul className="series-list list-primary">
                  {sfi5Series.map((series, index) => (
                    <li key={index}>
                      <i className="icon-check"></i>
                      <span>{series}</span>
                    </li>
                  ))}
                </ul>
                <div className="series-footer-note">
                  <p>
                    <i className="icon-info-circle me-2" style={{ color: 'var(--cert-primary)' }}></i>
                    Always check your specific rulebook, but SFI 3.2A/5 meets or exceeds the requirements for most competitive categories.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SFI 3.2A/1 Permitted */}
          <div className="col-lg-6">
            <div className="series-card">
              <div className="series-header level-1">
                <div className="header-badge">
                  <i className="icon-shield"></i>
                </div>
                <h5>Racing Series That Commonly Permit SFI 3.2A/1</h5>
              </div>
              <div className="series-body">
                <p className="intro">
                  SFI 3.2A/1–rated suits are commonly accepted or permitted in:
                </p>
                <ul className="series-list list-info">
                  {sfi1Series.map((series, index) => (
                    <li key={index}>
                      <i className="icon-check"></i>
                      <span>{series}</span>
                    </li>
                  ))}
                </ul>
                <div className="series-footer-note">
                  <p>
                    <i className="icon-info-circle me-2" style={{ color: 'var(--cert-info)' }}></i>
                    SFI 3.2A/1 certification is typically used in lower-risk environments where basic fire protection is required. Always check your specific rulebook, as many competitive racing series mandate SFI 3.2A/5 or higher for race entry and technical inspection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
