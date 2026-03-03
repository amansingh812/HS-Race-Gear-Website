import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CertificationsContent() {
    return (
        <section className="hs-doc-section">
            <div className="container">
                <div className="hs-doc-content" style={{ maxWidth: '1000px' }}>

                    {/* Section 1: Introduction with Image */}
                    <div className="hs-doc-block" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '40px', alignItems: 'center' }}>
                        <div>
                            <h2 className="hs-doc-heading" style={{ borderBottom: 'none', paddingBottom: 0 }}>What is SFI?</h2>
                            <p className="hs-doc-card-text" style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                                The SFI Foundation is an independent organization that develops strict safety standards for motorsports equipment.
                                SFI certification is globally recognized and required by major racing bodies.
                            </p>
                            <ul className="hs-doc-list">
                                <li><strong style={{ color: '#fff' }}>Laboratory Tested:</strong> Proven fire resistance &amp; thermal protection</li>
                                <li><strong style={{ color: '#fff' }}>Quality Audited:</strong> Manufacturers are strictly audited for consistency</li>
                                <li><strong style={{ color: '#fff' }}>Track Required:</strong> Mandatory for NHRA, IMCA, USAC, and regional series</li>
                            </ul>
                        </div>
                        <div className="cert-img-wrapper" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <Image
                                src="/images/shop/side_hero_sfi.webp"
                                alt="SFI Certification"
                                width={500}
                                height={500}
                                className="w-100 object-fit-cover"
                                style={{ aspectRatio: '1/1', display: 'block' }}
                                fallback="/images/section/sfi-certification-label.jpg"
                            />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                            <div style={{ position: 'absolute', bottom: '20px', left: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ background: '#e21b1b', padding: '6px 12px', borderRadius: '20px', fontWeight: 700, fontSize: '0.8rem', color: '#fff' }}>SFI APPROVED</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ height: '60px' }}></div>

                    {/* Section 2: Core Standards */}
                    <div className="hs-doc-block">
                        <h2 className="hs-doc-heading text-center" style={{ borderBottom: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                            The Standards We Deliver
                            <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, transparent, #e21b1b, transparent)' }}></div>
                        </h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '24px', marginTop: '40px' }}>
                            {/* SFI 3.2A/5 Card */}
                            <div className="hs-doc-card" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', height: '100%', borderColor: 'rgba(226, 27, 27, 0.3)' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', marginBottom: '10px', lineHeight: 1 }}>SFI 3.2A/5</div>
                                <div style={{ fontSize: '1.2rem', color: '#e21b1b', fontWeight: 600, marginBottom: '20px', fontFamily: 'Poppins, sans-serif' }}>Racing Suits</div>
                                <p className="hs-doc-card-text" style={{ flexGrow: 1 }}>
                                    Required for intense oval track, dirt, and drag racing. Offers a high Thermal Protective Performance (TPP) rating.
                                </p>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>TPP Rating</span>
                                        <strong style={{ color: '#fff', fontSize: '0.85rem' }}>&ge; 19.0</strong>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Time to 2nd Degree Burn</span>
                                        <strong style={{ color: '#fff', fontSize: '0.85rem' }}>10 Seconds</strong>
                                    </div>
                                </div>
                            </div>

                            {/* SFI 3.3/5 Card */}
                            <div className="hs-doc-card" style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', marginBottom: '10px', lineHeight: 1 }}>SFI 3.3/5</div>
                                <div style={{ fontSize: '1.2rem', color: '#e21b1b', fontWeight: 600, marginBottom: '20px', fontFamily: 'Poppins, sans-serif' }}>Gloves &amp; Shoes</div>
                                <p className="hs-doc-card-text" style={{ flexGrow: 1 }}>
                                    Engineered to protect extremities while maintaining the tactile feel required for precise steering and pedal control.
                                </p>
                                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Material</span>
                                        <strong style={{ color: '#fff', fontSize: '0.85rem' }}>Premium Nomex®</strong>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>Usage</span>
                                        <strong style={{ color: '#fff', fontSize: '0.85rem' }}>All Sanctioned Events</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ height: '60px' }}></div>

                    {/* Section 3: Verification */}
                    <div className="hs-doc-block">
                        <div className="hs-doc-card hs-doc-card-note" style={{ display: 'flex', gap: '30px', alignItems: 'center', padding: '30px' }}>
                            <div style={{ flex: '1' }}>
                                <h3 className="hs-doc-card-title" style={{ fontSize: '1.4rem' }}>Tech Inspection Ready</h3>
                                <p className="hs-doc-card-text" style={{ fontSize: '1rem' }}>
                                    Every custom suit, glove, and shoe from HS Racegear includes a genuine SFI certification patch permanently affixed to the garment exterior. This ensures zero delays or issues during pre-race tech inspections.
                                </p>
                                <div style={{ marginTop: '20px' }}>
                                    <Link href="/custom-race-suit" style={{
                                        display: 'inline-block', background: '#fff', color: '#000',
                                        padding: '12px 24px', borderRadius: '8px', fontWeight: 700,
                                        fontSize: '0.85rem', textDecoration: 'none', letterSpacing: '1px',
                                        textTransform: 'uppercase', fontFamily: 'Poppins, sans-serif'
                                    }}>
                                        Design Your SFI Suit
                                    </Link>
                                </div>
                            </div>
                            <div style={{ flexShrink: 0, width: '120px', height: '120px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px' }}>
                                <Image src="/images/sfi-approved.png" alt="SFI Approved" width={90} height={90} style={{ objectFit: 'contain' }} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* Responsive overrides inside component */}
            <style dangerouslySetInnerHTML={{
                __html: `
  @media (max-width: 768px) {
    .hs-doc-block[style*="grid-template-columns"] {
      grid-template-columns: 1fr !important;
    }
    .cert-img-wrapper {
      margin-top: 30px;
    }
  }
  @media (max-width: 576px) {
    .hs-doc-card-note[style*="display: flex"] {
      flex-direction: column;
      text-align: center;
    }
    .hs-doc-card-note[style*="display: flex"] > div:last-child {
      margin-top: 20px;
    }
  }
`}} />
        </section>
    );
}
