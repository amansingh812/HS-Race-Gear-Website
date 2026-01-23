import React from "react";
import Link from "next/link";

export default function CustomFitProcess() {
  const steps = [
    {
      number: "1",
      title: "Submit Form",
      description: "Select your proof, suit type, and colors, fill out the order form, upload logos, and get your mockup delivered within 24 hours.",
      icon: "📝",
    },
    {
      number: "2",
      title: "Proof Approval",
      description: "Our designer is committed to fine-tuning the design until it meets your satisfaction. We provide an unlimited number of revisions without any additional charge.",
      icon: "✅",
    },
    {
      number: "3",
      title: "Measurement",
      description: "After approving the proof, we'll provide you a custom sizing form to ensure an ideal fit.",
      icon: "📏",
    },
    {
      number: "4",
      title: "Production",
      description: "We'll initiate the production of your suit and share photos of the finished product before shipping.",
      icon: "🏭",
    },
    {
      number: "5",
      title: "Delivery",
      description: "Your custom race suit will be shipped to your doorstep via UPS, ensuring reliable and efficient delivery.",
      icon: "📦",
    },
  ];

  return (
    <section className="flat-spacing-9">
      <div className="container">
        <div className="flat-title">
          <span className="title">5 Easy Steps to Get Your Racing Fire Suit</span>
          <p className="sub-title text-center">
            Custom SFI-Rated Auto Racing Suits Delivered in 3.5 Weeks
          </p>
        </div>
        <div className="tf-grid-layout lg-col-5 md-col-3 gap-30">
          {steps.map((step, index) => (
            <div className="tf-step-box text-center" key={index}>
              <div className="step-number">
                <span className="step-icon">{step.icon}</span>
              </div>
              <div className="step-content">
                <h5 className="step-title mb_15">{step.title}</h5>
                <p className="step-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="tf-content-wrap text-center mt_40">
          <Link href="/shop" className="tf-btn btn-fill animate-hover-btn radius-3 btn-xl">
            <span>🏁 Design My Custom Auto Race Suit (FREE)</span>
            <i className="icon icon-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
