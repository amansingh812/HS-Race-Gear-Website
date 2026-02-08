import React from "react";

export default function CustomFitFeatures() {
  const features = [
    {
      icon: "icon-shield",
      title: "SFI Rated",
      description: "We sell SFI 3.2A/1 & SFI 3.2A/5 certified custom race suits made from Nomex®, designed to keep you safe while you're on the track.",
    },
    {
      icon: "icon-delivery",
      title: "Free Shipping",
      description: "Enjoy free shipping within the USA when you order our custom fire suits. Your suit will be delivered within 5-6 weeks. However, we offer an expedited service for delivery within 3.5 weeks.",
    },
    {
      icon: "icon-compare",
      title: "Best Price Match",
      description: "We match any USA SFI-approved dealer price. Show a lower price and we'll match it guaranteed.",
    },
  ];

  return (
    <section className="flat-spacing-7 bg_grey-7">
      <div className="container">
        <div className="flat-title">
          <span className="title">Built for Champions, Trusted by Racers</span>
          <p className="sub-title text-center">
            From karting to professional circuits, we craft custom auto racing suits that meet your needs and exceed your expectations.
          </p>
        </div>
        <div className="tf-grid-layout md-col-3 gap-30">
          {features.map((feature, index) => (
            <div className="tf-icon-box text-center" key={index}>
              <div className="icon">
                <i className={feature.icon} />
              </div>
              <div className="content">
                <div className="title">{feature.title}</div>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
