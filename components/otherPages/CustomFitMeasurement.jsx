import React from "react";
import Link from "next/link";

export default function CustomFitMeasurement() {
  const keyFeatures = [
    {
      title: "Unlimited Embroidery",
      description: "Personalize your custom-made race suits with unlimited race suit embroidery options and high-quality logos and artwork, adding a unique flair to your racing gear.",
      image: "/images/shop/embroidery.jpg",
    },
    {
      title: "Top Quality Lightweight Meta-Aramid/Nomex Material",
      description: "Crafted with advanced materials to ensure durability and protection while maintaining a lightweight feel, the 2-layer standard price offers a perfect balance between quality and affordability.",
      image: "/images/shop/nomex-material.jpg",
    },
    {
      title: "Lower Back Stretch Panel",
      description: "Added comfort in the lower back area, allowing you to focus more on the race.",
      image: "/images/shop/stretch-panel.jpg",
    },
    {
      title: "Custom Sizing",
      description: "Tailored to your body measurements, our suits promise a perfect fit. With our detailed customization guide, you can ensure enhanced comfort and performance, making every race feel just right.",
      image: "/images/shop/custom-sizing.jpg",
    },
    {
      title: "360-Degree Arm Gussets",
      description: "Designed for maximum arm flexibility, these gussets help you steer without restriction.",
      image: "/images/shop/arm-gussets.jpg",
    },
    {
      title: "Crotch Stretch Panels",
      description: "Strategically placed for added comfort, these panels enhance mobility on the track.",
      image: "/images/shop/crotch-panels.jpg",
    },
  ];

  return (
    <>
      <section className="flat-spacing-7 bg_grey-7">
        <div className="container">
          <div className="flat-title">
            <span className="title">Built to Save Lives, Engineered for Protection</span>
            <p className="sub-title text-center">
              Premium fire-retardant technology designed to protect drivers on the track — keeping you safe, comfortable, and focused on winning
            </p>
          </div>
          <div className="tf-grid-layout md-col-2 gap-30">
            <div className="feature-list">
              <ul className="tf-custom-list">
                <li className="list-item">
                  <i className="icon-check"></i>
                  <span className="text">Premium Nomex inner lining for maximum safety and protection</span>
                </li>
                <li className="list-item">
                  <i className="icon-check"></i>
                  <span className="text">Tailored to fit your body perfectly and comfortably</span>
                </li>
                <li className="list-item">
                  <i className="icon-check"></i>
                  <span className="text">Enhanced lower back panel for added comfort and support</span>
                </li>
                <li className="list-item">
                  <i className="icon-check"></i>
                  <span className="text">Strategically placed stretch panels for increased flexibility</span>
                </li>
                <li className="list-item">
                  <i className="icon-check"></i>
                  <span className="text">Made with durable Meta Para Aramid Nomex outer shell material</span>
                </li>
                <li className="list-item">
                  <i className="icon-check"></i>
                  <span className="text">Unlimited logo options available to choose from</span>
                </li>
              </ul>
            </div>
            <div className="feature-image">
              <img
                className="lazyload w-100 radius-10"
                data-src="/images/shop/safety-features.jpg"
                src="/images/shop/safety-features.jpg"
                alt="Safety Features"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flat-spacing-9">
        <div className="container">
          <div className="flat-title">
            <span className="title">Key Features of Our Custom Auto Racing Suits</span>
          </div>
          <div className="tf-grid-layout md-col-3 gap-30">
            {keyFeatures.map((feature, index) => (
              <div className="collection-item-v3 hover-img" key={index}>
                <div className="collection-image img-style radius-10">
                  <img
                    className="lazyload"
                    data-src={feature.image}
                    src={feature.image}
                    alt={feature.title}
                  />
                </div>
                <div className="collection-content mt_15">
                  <h5 className="heading">{feature.title}</h5>
                  <p className="subtext">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flat-spacing-7 bg_grey-7">
        <div className="container">
          <div className="tf-grid-layout md-col-2 gap-30">
            <div className="measurement-content">
              <h3 className="mb_30">How to Measure Yourself</h3>
              <p className="mb_20">
                Scan the QR code or watch the measurement video to learn how to take accurate measurements at home
              </p>
              <div className="measurement-qr mb_30">
                <img
                  className="lazyload"
                  data-src="/images/shop/qr-code-measurement.png"
                  src="/images/shop/qr-code-measurement.png"
                  alt="Scan QR Code"
                  style={{ maxWidth: "200px" }}
                />
                <p className="mt_10">📱 Scan to watch the measurement video at home</p>
              </div>
              <div className="measurement-guidelines">
                <h5 className="mb_15">Measurement Guidelines</h5>
                <ul className="tf-custom-list">
                  <li className="list-item">
                    <i className="icon-check"></i>
                    <span className="text">Wear form-fitting clothes (underwear recommended)</span>
                  </li>
                  <li className="list-item">
                    <i className="icon-check"></i>
                    <span className="text">Use cloth tape close to skin – take exact measurements only</span>
                  </li>
                  <li className="list-item">
                    <i className="icon-check"></i>
                    <span className="text">Inches are preferred for accurate measurements</span>
                  </li>
                </ul>
                <p className="mt_20 text-danger">
                  <strong>Important:</strong> Your suit will be tailored to the dimensions supplied. HS Race Gear is not responsible for measurement errors.
                </p>
              </div>
              <div className="d-flex gap-15 flex-wrap mt_30">
                <Link href="#" className="tf-btn btn-outline-dark radius-3">
                  Download Measurement Video
                </Link>
                <Link href="#" className="tf-btn btn-outline-dark radius-3">
                  View Measurement Form
                </Link>
              </div>
            </div>
            <div className="measurement-help">
              <div className="help-box bg-white p-4 radius-10">
                <h5 className="mb_20">Need Help?</h5>
                <p className="mb_20">Our experts will walk you through the process</p>
                <div className="contact-info">
                  <p className="mb_10">
                    <i className="icon-phone"></i>
                    <strong> +1 (409) 404-0962</strong>
                  </p>
                  <p>
                    <i className="icon-email"></i>
                    <strong> support@hsracegear.com</strong>
                  </p>
                </div>
              </div>
              <div className="measurement-image mt_30">
                <img
                  className="lazyload w-100 radius-10"
                  data-src="/images/shop/measurement-guide.jpg"
                  src="/images/shop/measurement-guide.jpg"
                  alt="Measurement Guide"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
