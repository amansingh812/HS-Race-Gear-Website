import React from "react";
import Link from "next/link";
export default function Faqs() {
  return (
    <section className="s-faq flat-spacing-13">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="sb-contact">
              <p className="title">Contact Us</p>
              <p className="sub">
                If you have an issue or question that requires immediate
                assistance, you can click the button below to chat live with a
                Customer Service representative.
              </p>
              <p className="sub">
                We specialize in custom-built, SFI-certified racing suits, gloves, shoes, and fireproof gear designed for serious racers.
              </p>
              <div className="btn-group">
                <Link
                  href={`/contact-us`}
                  className="tf-btn btn-fill hover-primary"
                >
                  Contact us
                </Link>
                <a href="#" className="tf-btn btn-white hover-primary">
                  Chat with us
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <ul className="faq-list">
              <li className="faq-item">
                <p className="name-faq">🔹 General</p>
                <div className="faq-wrap" id="accordionGeneral">
                  <div className="widget-accordion">
                    <div
                      className="accordion-title"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseGeneral1"
                      aria-expanded="true"
                      aria-controls="collapseGeneral1"
                      role="button"
                    >
                      <span>What makes HS Racegear racing suits unique?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseGeneral1"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionGeneral"
                    >
                      <div className="accordion-body widget-desc">
                        <p>
                          HS Racegear specializes in custom-built, SFI-certified racing suits designed for serious racers. We combine premium Nomex® fire-resistant fabrics, professional tailoring, and race-proven construction to deliver safety, comfort, and performance at competitive pricing.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseGeneral2"
                      aria-expanded="false"
                      aria-controls="collapseGeneral2"
                      role="button"
                    >
                      <span>Why does HS Racegear use Nomex® meta-aramid fabric?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseGeneral2"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionGeneral"
                    >
                      <div className="accordion-body widget-material">
                        <p>
                          Nomex® meta-aramid fabric offers inherent fire resistance, meaning the protection does not wash out or degrade over time. It provides excellent heat insulation, breathability, and durability—making it the industry standard for professional racing suits.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseGeneral3"
                      aria-expanded="false"
                      aria-controls="collapseGeneral3"
                      role="button"
                    >
                      <span>Is HS Racegear an SFI-approved brand?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseGeneral3"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionGeneral"
                    >
                      <div className="accordion-body">
                        <p>
                          Yes. HS Racegear produces SFI 3.2A certified racing gear, including suits, gloves, and shoes. All applicable products carry official SFI certification labels and comply with motorsport safety regulations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li className="faq-item">
                <p className="name-faq">🛒 Ordering & Customization</p>
                <div className="faq-wrap" id="accordionOrdering">
                  <div className="widget-accordion">
                    <div
                      className="accordion-title"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOrdering1"
                      aria-expanded="true"
                      aria-controls="collapseOrdering1"
                      role="button"
                    >
                      <span>How can I order custom racing gear from HS Racegear?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseOrdering1"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionOrdering"
                    >
                      <div className="accordion-body widget-desc">
                        <p>
                          You can place your order directly through our website. Once your order is submitted, our design team will contact you to finalize measurements, colors, logos, and layout, followed by a digital mockup for approval.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOrdering2"
                      aria-expanded="false"
                      aria-controls="collapseOrdering2"
                      role="button"
                    >
                      <span>What customization options are available?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseOrdering2"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionOrdering"
                    >
                      <div className="accordion-body widget-material">
                        <p>
                          We offer full customization, including: Custom sizing, Color combinations, Driver name & flag, Sponsor and team logos, Stitching and panel layouts.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOrdering3"
                      aria-expanded="false"
                      aria-controls="collapseOrdering3"
                      role="button"
                    >
                      <span>Can I add my own logos and designs?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseOrdering3"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionOrdering"
                    >
                      <div className="accordion-body">
                        <p>
                          Yes. You can upload your logos, sponsors, and artwork, and our designers will professionally integrate them into your racing suit or gear layout.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOrdering4"
                      aria-expanded="false"
                      aria-controls="collapseOrdering4"
                      role="button"
                    >
                      <span>Is there a limit to design revisions?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseOrdering4"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFour"
                      data-bs-parent="#accordionOrdering"
                    >
                      <div className="accordion-body">
                        <p>
                          We offer unlimited design revisions to ensure your suit meets expectations. Our goal is approval with complete satisfaction before production begins. The design process is free.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOrdering5"
                      aria-expanded="false"
                      aria-controls="collapseOrdering5"
                      role="button"
                    >
                      <span>How long does the ordering process take?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseOrdering5"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFive"
                      data-bs-parent="#accordionOrdering"
                    >
                      <div className="accordion-body">
                        <p>
                          Design confirmation usually takes 24–72 hours, depending on revision requests. Production starts immediately after final approval.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li className="faq-item">
                <p className="name-faq">📏 Sizing & Fit</p>
                <div className="faq-wrap" id="accordionSizing">
                  <div className="widget-accordion">
                    <div
                      className="accordion-title"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSizing1"
                      aria-expanded="true"
                      aria-controls="collapseSizing1"
                      role="button"
                    >
                      <span>How do I ensure the correct size?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseSizing1"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionSizing"
                    >
                      <div className="accordion-body widget-desc">
                        <p>
                          We provide a detailed measurement guide to help you submit accurate body measurements. Our team also reviews measurements to ensure proper fit.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSizing2"
                      aria-expanded="false"
                      aria-controls="collapseSizing2"
                      role="button"
                    >
                      <span>Can HS Racegear tailor racing gear for a perfect fit?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseSizing2"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionSizing"
                    >
                      <div className="accordion-body widget-material">
                        <p>
                          Yes. Every custom suit is patterned specifically to your measurements, ensuring comfort, flexibility, and correct safety layering.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSizing3"
                      aria-expanded="false"
                      aria-controls="collapseSizing3"
                      role="button"
                    >
                      <span>What if my racing gear doesn't fit properly?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseSizing3"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionSizing"
                    >
                      <div className="accordion-body">
                        <p>
                          If there is a manufacturing or measurement error on our end, we will work with you to resolve the issue through adjustments or remakes.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSizing4"
                      aria-expanded="false"
                      aria-controls="collapseSizing4"
                      role="button"
                    >
                      <span>Do you offer one-piece, two-piece, or jacket-only suits?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseSizing4"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFour"
                      data-bs-parent="#accordionSizing"
                    >
                      <div className="accordion-body">
                        <p>
                          Yes. HS Racegear offers one-piece racing suits, two-piece racing suits, and racing jackets. Availability depends on SFI requirements and racing class.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li className="faq-item">
                <p className="name-faq">🧵 Materials & Safety</p>
                <div className="faq-wrap" id="accordionMaterials">
                  <div className="widget-accordion">
                    <div
                      className="accordion-title"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseMaterials1"
                      aria-expanded="true"
                      aria-controls="collapseMaterials1"
                      role="button"
                    >
                      <span>What materials are used in HS Racegear products?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseMaterials1"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionMaterials"
                    >
                      <div className="accordion-body widget-desc">
                        <p>
                          Our products are made using Nomex® meta-aramid fireproof fabrics, fire-resistant inner linings (knitted Nomex), Kevlar® or Nomex® thread, and high-quality Nomex zippers.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseMaterials2"
                      aria-expanded="false"
                      aria-controls="collapseMaterials2"
                      role="button"
                    >
                      <span>Are HS Racegear products SFI certified?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseMaterials2"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionMaterials"
                    >
                      <div className="accordion-body widget-material">
                        <p>
                          Yes. Our racing suits, gloves, and shoes are manufactured to meet SFI 3.2A safety standards, clearly labeled for inspection.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseMaterials3"
                      aria-expanded="false"
                      aria-controls="collapseMaterials3"
                      role="button"
                    >
                      <span>What safety features are included in HS Racegear racing suits?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseMaterials3"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionMaterials"
                    >
                      <div className="accordion-body">
                        <p>
                          Key safety features include multi-layer fire protection, Nomex® stretch panels, reinforced seams, fire-resistant cuffs and collars, and breathable inner linings.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseMaterials4"
                      aria-expanded="false"
                      aria-controls="collapseMaterials4"
                      role="button"
                    >
                      <span>Do I need additional safety gear with my racing suit?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseMaterials4"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFour"
                      data-bs-parent="#accordionMaterials"
                    >
                      <div className="accordion-body">
                        <p>
                          Yes. Most racing organizations require SFI-certified underwear, gloves, shoes, socks, and balaclavas depending on the class.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseMaterials5"
                      aria-expanded="false"
                      aria-controls="collapseMaterials5"
                      role="button"
                    >
                      <span>How do SFI ratings differ, and which one do I need?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseMaterials5"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFive"
                      data-bs-parent="#accordionMaterials"
                    >
                      <div className="accordion-body">
                        <p>
                          SFI 3.2A/1: Entry-level fire protection. SFI 3.2A/5: Multi-layer protection for Top Fuel Dragster, Funny Car, Pro Stock Car, Pro Mod, Pro Stock Motorcycle, Alcohol Dragster, Alcohol Funny Car, Super Comp Dragster, Super Gas Car, Super Street Car, Sprint Car, Winged Sprint Car, Non-Wing Sprint Car, Midget Car, Dirt Late Model, Modified Dirt Car, Micro Sprint, Late Model Stock Car, Super Late Model, Modified Asphalt Car, Legends Car, Super Modified, GT Car, Touring Car, Prototype Car, Formula Car, Time Attack Car, Drift Car, Trophy Truck, Class 1 Buggy, Ultra4 Rock Racer, Rally Car, Hill Climb Car, Time Trial Car. Always follow your sanctioning body's minimum requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li className="faq-item">
                <p className="name-faq">🚚 Shipping & Delivery</p>
                <div className="faq-wrap" id="accordionShipping">
                  <div className="widget-accordion">
                    <div
                      className="accordion-title"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseShipping1"
                      aria-expanded="true"
                      aria-controls="collapseShipping1"
                      role="button"
                    >
                      <span>How long does custom gear take to arrive?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseShipping1"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionShipping"
                    >
                      <div className="accordion-body widget-desc">
                        <p>
                          Custom SFI racing gear typically takes 4–5 weeks for production. Shipping time varies by location.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseShipping2"
                      aria-expanded="false"
                      aria-controls="collapseShipping2"
                      role="button"
                    >
                      <span>What is your shipping policy?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseShipping2"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionShipping"
                    >
                      <div className="accordion-body widget-material">
                        <p>
                          All orders are securely packaged and shipped with tracking. Custom orders ship once production and quality inspection are complete.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseShipping3"
                      aria-expanded="false"
                      aria-controls="collapseShipping3"
                      role="button"
                    >
                      <span>Do you ship internationally?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseShipping3"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionShipping"
                    >
                      <div className="accordion-body">
                        <p>
                          Yes. HS Racegear ships worldwide, serving racers across the USA, Europe, Australia, and beyond.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li className="faq-item">
                <p className="name-faq">💳 Pricing & Payment</p>
                <div className="faq-wrap" id="accordionPayment">
                  <div className="widget-accordion">
                    <div
                      className="accordion-title"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsePayment1"
                      aria-expanded="true"
                      aria-controls="collapsePayment1"
                      role="button"
                    >
                      <span>What payment methods do you accept?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapsePayment1"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionPayment"
                    >
                      <div className="accordion-body widget-desc">
                        <p>
                          We don't take payment on the website. Place your order and you'll get a confirmation email with an order reference, then our team contacts you to confirm sizing and arrange payment by card, PayPal or bank transfer.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsePayment2"
                      aria-expanded="false"
                      aria-controls="collapsePayment2"
                      role="button"
                    >
                      <span>How much do custom racing suits cost?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapsePayment2"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionPayment"
                    >
                      <div className="accordion-body widget-material">
                        <p>
                          Pricing depends on SFI rating and custom features. Each product page displays base pricing, with final cost confirmed before production.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li className="faq-item">
                <p className="name-faq">🔄 Returns & Exchanges</p>
                <div className="faq-wrap" id="accordionReturns">
                  <div className="widget-accordion">
                    <div
                      className="accordion-title"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseReturns1"
                      aria-expanded="true"
                      aria-controls="collapseReturns1"
                      role="button"
                    >
                      <span>What is your return policy?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseReturns1"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionReturns"
                    >
                      <div className="accordion-body widget-desc">
                        <p>
                          Custom-made racing suits are non-returnable, except in the case of manufacturing defects.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseReturns2"
                      aria-expanded="false"
                      aria-controls="collapseReturns2"
                      role="button"
                    >
                      <span>Do you design suits for teams and organizations?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseReturns2"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionReturns"
                    >
                      <div className="accordion-body widget-material">
                        <p>
                          Absolutely. We specialize in team-wide custom racewear programs with consistent branding and bulk pricing (shirts, hoodies and other crew wear).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
