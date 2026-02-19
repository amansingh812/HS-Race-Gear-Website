"use client";
import React from 'react';

const benefitsData = [
  {
    id: '01',
    title: 'Perfect Ergonomic Fit',
    description: 'Custom suits are designed to your exact body measurements, ensuring a perfect fit that moves with you. No bunching, pulling, or restriction—every seam is positioned for maximum comfort.'
  },
  {
    id: '02',
    title: 'Enhanced Fire Protection',
    description: 'Proper fit ensures consistent fabric coverage with no gaps or thin spots that could compromise safety. Maximum protection where you need it most on the track.'
  },
  {
    id: '03',
    title: 'Improved Driver Mobility',
    description: 'Every panel and contour is positioned perfectly for your body, eliminating restrictions and allowing full range of motion. Drive with confidence and comfort.'
  },
  {
    id: '04',
    title: 'SFI Compliance Guaranteed',
    description: 'Certified to meet SFI 3.2A/1 and SFI 3.2A/5 standards for professional motorsports. Built for Sprint Car, Drag Racing, Circle Track, and all racing disciplines.'
  },
  {
    id: '05',
    title: 'Professional Appearance',
    description: 'Look as professional as you perform. A well-fitted suit projects confidence and competence, making you stand out on the track with pride.'
  },
];

export default function CustomFitBenefitsSection() {
  return (
    <section className="flat-spacing-9 bg_grey-7">
      <div className="container">

        <div className="tf-grid-layout lg-col-2 gap-30 gap-lg-60 align-items-start">

          {/* LEFT COLUMN: Text Content */}
          <div className="benefits-content">
            {/* Tagline */}
            <div className="tf-badge bg-dark text-white mb_15" style={{
              display: 'inline-block',
              padding: '8px 20px',
              fontSize: '12px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              borderRadius: '4px'
            }}>
              Benefits Of Custom Fit
            </div>

            {/* Main Headline */}
            <h2 className="heading-title mb_40" style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              lineHeight: '1.2',
              fontWeight: '700',
              marginBottom: '50px'
            }}>
              Why Choose Custom-Tailored Racing Suits?
            </h2>

            {/* List Items */}
            <div className="benefits-list">
              {benefitsData.map((item, index) => (
                <div
                  key={item.id}
                  className="benefit-item mb_40"
                  style={{
                    display: 'flex',
                    gap: '20px',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(8px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  {/* Number Badge */}
                  <div className="flex-shrink-0">
                    <div
                      className="number-badge"
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        border: '2px solid #dee2e6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        fontWeight: '700',
                        background: '#fff',
                        transition: 'all 0.3s ease',
                        color: '#000'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#000';
                        e.currentTarget.style.background = '#000';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#dee2e6';
                        e.currentTarget.style.background = '#fff';
                        e.currentTarget.style.color = '#000';
                      }}
                    >
                      {item.id}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div style={{ flex: 1 }}>
                    <h3
                      className="benefit-title mb_10"
                      style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        color: '#000',
                        marginBottom: '10px'
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="benefit-description text_black-3"
                      style={{
                        fontSize: '15px',
                        lineHeight: '1.7',
                        color: '#6c757d',
                        maxWidth: '480px'
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Image with Cut Corner Effect */}
          <div className="benefits-image" style={{ position: 'sticky', top: '100px' }}>
            <div
              className="image-wrapper"
              style={{
                width: '100%',
                height: '600px',
                background: 'linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                fontWeight: '600',
                color: '#000',
                clipPath: 'polygon(0 0, 85% 0, 100% 12%, 100% 100%, 0 100%)',
                borderRadius: '0 0 12px 12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <img
                src="/images/shop/compare.webp"
                alt="Custom Fit Racing Suit"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />

              {/* Optional: Add decorative corner badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  width: '0',
                  height: '0',
                  borderStyle: 'solid',
                  borderWidth: '0 80px 80px 0',
                  borderColor: 'transparent #000 transparent transparent',
                  opacity: 0.05
                }}
              />
            </div>

            {/* Optional: Add caption below image */}

          </div>

        </div>
      </div>
    </section>
  );
}
