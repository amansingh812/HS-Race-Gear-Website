import React from "react";

export default function WhySFICertification() {
  const sfi5Reasons = [
    {
      icon: "icon-check",
      title: "Mandatory for Competition",
      description: "Many racing leagues and tracks require SFI-certified suits for tech inspection and race entry",
    },
    {
      icon: "icon-check",
      title: "Proven Fire Protection",
      description: "Tested to withstand direct flame exposure",
    },
    {
      icon: "icon-check",
      title: "Time to Escape",
      description: "Extra seconds of protection can be the difference between minor injury and severe burns",
    },
    {
      icon: "icon-check",
      title: "Insurance & Liability Compliance",
      description: "Required by many sanctioning bodies and event insurers",
    },
    {
      icon: "icon-check",
      title: "Professional Standard",
      description: "Used by amateur, semi-pro, and professional racers worldwide",
    },
  ];

  const sfi1Reasons = [
    {
      icon: "icon-check",
      title: "Required for Certain Events",
      description: "Many track days, club racing events, and entry-level series mandate at least an SFI 3.2A/1–certified fire suit",
    },
    {
      icon: "icon-check",
      title: "Verified Fire Resistance",
      description: "Independently tested under SFI standards for basic flame protection",
    },
    {
      icon: "icon-check",
      title: "Initial Time to React",
      description: "Provides essential seconds to exit the vehicle in the event of fire",
    },
    {
      icon: "icon-check",
      title: "Compliance & Event Approval",
      description: "Helps meet organizer, track, and insurance safety requirements",
    },
    {
      icon: "icon-check",
      title: "Recognized Safety Standard",
      description: "Accepted by sanctioning bodies where entry-level fire protection is permitted",
    },
  ];

  return (
    <section className="why-sfi-section">
      <div className="container">
        <div className="cert-section-title">
          <h2>Why Is SFI Certification Needed?</h2>
          <p>
            In racing, fire risk comes from fuel, oil, extreme heat, and high-speed impacts.
            A certified fire suit is often the only barrier between a driver and life-threatening burns.
          </p>
        </div>

        <div className="row g-4">
          {/* SFI 3.2A/5 Reasons */}
          <div className="col-lg-6">
            <div className="why-sfi-card">
              <div className="why-sfi-header level-5">
                <div className="header-icon">
                  <i className="icon-shield"></i>
                </div>
                <h5>Why Is SFI 3.2A/5 Certification Needed?</h5>
              </div>
              <div className="why-sfi-body">
                <p className="intro-text">
                  In racing, fire risk comes from fuel, oil, extreme heat, and high-speed impacts. A certified fire suit is often the only barrier between a driver and life-threatening burns.
                </p>
                <h6 style={{ marginBottom: '15px', color: 'var(--cert-secondary)' }}>Reasons SFI 3.2A/5 Is Essential:</h6>
                {sfi5Reasons.map((reason, index) => (
                  <div className="reason-item" key={index}>
                    <div className="reason-icon">
                      <i className="icon-check"></i>
                    </div>
                    <div className="reason-content">
                      <h6>{reason.title}</h6>
                      <p>{reason.description}</p>
                    </div>
                  </div>
                ))}
                <div className="cert-alert alert-warning">
                  <div className="cert-alert-icon">
                    <i className="icon-warning"></i>
                  </div>
                  <p>Racing without an approved suit can result in disqualification, failed tech inspection, or serious injury.</p>
                </div>
              </div>
            </div>
          </div>

          {/* SFI 3.2A/1 Reasons */}
          <div className="col-lg-6">
            <div className="why-sfi-card">
              <div className="why-sfi-header level-1">
                <div className="header-icon">
                  <i className="icon-shield"></i>
                </div>
                <h5>Why Is SFI 3.2A/1 Certification Needed?</h5>
              </div>
              <div className="why-sfi-body">
                <p className="intro-text">
                  In motorsports, even lower-speed or entry-level racing environments carry fire risk from fuel, oil, engine heat, and mechanical failure. A certified fire suit provides a critical first layer of protection when fire exposure occurs.
                </p>
                <h6 style={{ marginBottom: '15px', color: 'var(--cert-secondary)' }}>Reasons SFI 3.2A/1 Is Important:</h6>
                {sfi1Reasons.map((reason, index) => (
                  <div className="reason-item" key={index}>
                    <div className="reason-icon">
                      <i className="icon-check"></i>
                    </div>
                    <div className="reason-content">
                      <h6>{reason.title}</h6>
                      <p>{reason.description}</p>
                    </div>
                  </div>
                ))}
                <div className="cert-alert alert-info">
                  <div className="cert-alert-icon">
                    <i className="icon-info-circle"></i>
                  </div>
                  <p>Racing without an approved fire suit—even in lower-risk categories—can lead to event exclusion, failed safety inspection, or unnecessary exposure to burn injury.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
