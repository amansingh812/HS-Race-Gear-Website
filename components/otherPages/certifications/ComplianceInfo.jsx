import React from "react";

export default function ComplianceInfo() {
  const sfi5Bodies = [
    "USAC (United States Auto Club)",
    "World of Outlaws (WoO)",
    "IMCA (International Motor Contest Association)",
    "NHRA (National Hot Rod Association)",
    "IHRA (International Hot Rod Association)",
    "IRA Sprint Cars",
    "POWRi Racing",
    "ASCS Sprint Cars",
    "Local & Regional Dirt Track Sanctioning Bodies",
  ];

  const sfi1Events = [
    "Track Day & HPDE events",
    "Club Racing and Amateur Racing Organizations",
    "Entry-Level or Beginner Racing Classes",
    "Exhibition, Practice, and Test Sessions",
    "Vintage Racing Series (where regulations allow)",
    "Local and Non-Professional Racing Events",
  ];

  return (
    <section className="compliance-section">
      <div className="container">
        <div className="cert-section-title">
          <h2>Compliance Information</h2>
          <p>
            Racing Body Approvals – Our suits are designed to comply with the safety rules
            commonly enforced during technical inspection.
          </p>
        </div>

        <div className="row g-4">
          {/* SFI 3.2A/5 Racing Bodies */}
          <div className="col-lg-6">
            <div className="compliance-card">
              <div className="compliance-header level-5">
                <div className="header-icon">
                  <i className="icon-check-circle"></i>
                </div>
                <h5>Racing Bodies That Commonly Accept or Require SFI 3.2A/5</h5>
              </div>
              <div className="compliance-body">
                <p className="intro">
                  SFI 3.2A/5–certified fire suits are widely accepted and required by numerous racing organizations and sanctioning bodies.
                </p>
                <div className="compliance-list">
                  {sfi5Bodies.map((body, index) => (
                    <div className="compliance-item primary" key={index}>
                      <i className="icon-check"></i>
                      <span>{body}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SFI 3.2A/1 Events */}
          <div className="col-lg-6">
            <div className="compliance-card">
              <div className="compliance-header level-1">
                <div className="header-icon">
                  <i className="icon-check-circle"></i>
                </div>
                <h5>Events and Series That Commonly Permit SFI 3.2A/1</h5>
              </div>
              <div className="compliance-body">
                <p className="intro">
                  SFI 3.2A/1 certification is accepted in various entry-level and lower-risk racing environments.
                </p>
                <div className="compliance-list">
                  {sfi1Events.map((event, index) => (
                    <div className="compliance-item info" key={index}>
                      <i className="icon-check"></i>
                      <span>{event}</span>
                    </div>
                  ))}
                </div>
                <div className="series-footer-note" style={{ marginTop: '20px' }}>
                  <p>
                    <i className="icon-info-circle me-2" style={{ color: 'var(--cert-info)' }}></i>
                    Acceptance may vary by class, speed, or event type. Drivers are always advised to verify the latest rulebook for their specific series.
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
