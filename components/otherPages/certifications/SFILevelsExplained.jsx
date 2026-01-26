"use client";
import React from "react";

export default function SFILevelsExplained() {
  const sfiLevel5Features = [
    "Designed for high-heat, high-risk motorsports environments",
    "Requires multi-layer fire-resistant construction",
    "Provides a minimum 10 seconds of protection before a second-degree burn when exposed to direct flame",
    "Must use approved fire-resistant materials such as Nomex® or equivalent aramid fabrics",
  ];

  const sfiLevel1Features = [
    "Designed for lower-heat, lower-risk motorsports environments",
    "Typically requires single-layer fire-resistant construction",
    "Provides approximately 3 seconds of protection before a second-degree burn when exposed to direct flame",
    "Must use approved fire-resistant materials such as Nomex® or equivalent aramid fabrics",
  ];

  const allLevels = [
    {
      level: "1",
      name: "SFI 3.2A/1",
      protection: "Entry-Level",
      time: "~3 sec",
      description: "Single-layer construction providing basic thermal protection. Used for low-risk racing, track days, and exhibition events where permitted.",
    },
    {
      level: "5",
      name: "SFI 3.2A/5",
      protection: "Mid-to-High Level",
      time: "~10 sec",
      description: "Most widely required rating. Multi-layer construction with excellent flame protection. Standard for sprint car, dirt track, and drag racing.",
      highlighted: true,
    },
    {
      level: "10",
      name: "SFI 3.2A/10",
      protection: "Higher Protection",
      time: "~20 sec",
      description: "Additional layers for enhanced thermal resistance. Common in higher-speed or higher-risk professional racing environments.",
    },
    {
      level: "15",
      name: "SFI 3.2A/15",
      protection: "Professional Grade",
      time: "~30 sec",
      description: "Maximum flame resistance for top-tier professional racing categories. Multiple layers for extended protection time.",
    },
  ];

  return (
    <section className="sfi-levels-section">
      <div className="container">
        {/* Section Title */}
        <div className="cert-section-title">
          <h2 className="section-heading">SFI 3.2A Certification Levels Explained</h2>
          <p>
            SFI driver fire suits fall under the SFI 3.2A specification, with different performance levels 
            based on thermal protection. Each level indicates how much time the suit can protect a driver 
            from direct flame exposure before the risk of second-degree burns.
          </p>
        </div>

        {/* Main Level Cards */}
        <div className="row g-4">
          {/* SFI 3.2A/5 Card */}
          <div className="col-lg-6">
            <div className="sfi-level-card featured">
              <div className="sfi-card-header level-5">
                <div className="sfi-level-badge">
                  <span>5</span>
                </div>
                <h3>SFI 3.2A/5</h3>
                <span className="level-tag">
                  <i className="icon-star me-1"></i>
                  Most Widely Required
                </span>
              </div>
              <div className="sfi-card-body">
                <p className="card-description">
                  SFI 3.2A is the specification that applies specifically to driver fire suits. The "/5" rating 
                  refers to the thermal protection performance (TPP) level of the suit, providing critical 
                  protection in high-heat racing environments.
                </p>
                <h6>Key Features of SFI 3.2A/5:</h6>
                <ul className="sfi-feature-list">
                  {sfiLevel5Features.map((feature, index) => (
                    <li key={index}>
                      <span className="check-icon">
                        <i className="icon-check"></i>
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="sfi-card-note">
                  <p>
                    <strong>Pro Tip:</strong> The higher the number (e.g., /5, /10, /15), the greater the level of 
                    fire protection. SFI 3.2A/5 is the most commonly required rating for competitive racing 
                    and offers an excellent balance of safety, weight, and comfort.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SFI 3.2A/1 Card */}
          <div className="col-lg-6">
            <div className="sfi-level-card">
              <div className="sfi-card-header level-1">
                <div className="sfi-level-badge">
                  <span>1</span>
                </div>
                <h3>SFI 3.2A/1</h3>
                <span className="level-tag">Entry-Level Protection</span>
              </div>
              <div className="sfi-card-body">
                <p className="card-description">
                  SFI 3.2A is the specification that applies specifically to driver fire suits. The "/1" rating 
                  refers to the thermal protection performance (TPP) level of the suit, designed for environments 
                  with lower fire risk.
                </p>
                <h6>Key Features of SFI 3.2A/1:</h6>
                <ul className="sfi-feature-list">
                  {sfiLevel1Features.map((feature, index) => (
                    <li key={index}>
                      <span className="check-icon">
                        <i className="icon-check"></i>
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="sfi-card-note">
                  <p>
                    <strong>Note:</strong> The lower the number, the lower the level of thermal protection. 
                    SFI 3.2A/1 is intended for entry-level racing, track days, and applications where basic 
                    certified fire protection is permitted, offering lightweight comfort while still meeting 
                    official SFI safety standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Grid */}
        <div className="sfi-quick-reference">
          <div className="sfi-quick-reference-title">
            <h4>All SFI 3.2A Levels at a Glance</h4>
            <p>Compare protection levels to find the right certification for your racing needs</p>
          </div>
          <div className="row g-4">
            {allLevels.map((level, index) => (
              <div className="col-lg-3 col-md-6" key={index}>
                <div className={`sfi-ref-card ${level.highlighted ? 'highlighted' : ''}`}>
                  <div className={`sfi-ref-level level-${level.level}`}>
                    {level.level}
                  </div>
                  <h5>{level.name}</h5>
                  <span className="protection-level">{level.protection}</span>
                  <p className="ref-description">{level.description}</p>
                  <div className="protection-time">
                    <div className="time-icon">
                      <i className="icon-time"></i>
                    </div>
                    <div>
                      <span className="time-value">{level.time}</span>
                      <span className="time-label"> protection</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-muted mt_30">
            <i className="icon-info-circle me-2"></i>
            Higher numbers indicate greater thermal protection but usually come with increased weight and 
            reduced breathability. Most sanctioning bodies specify SFI 3.2A/5 or higher.
          </p>
        </div>
      </div>
    </section>
  );
}
