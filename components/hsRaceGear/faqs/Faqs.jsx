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
                <div className="faq-wrap" id="accordionExchange">
                  <div className="widget-accordion">
                    <div
                      className="accordion-title"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExchangeOne"
                      aria-expanded="true"
                      aria-controls="collapseExchangeOne"
                      role="button"
                    >
                      <span>What is your return policy?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseExchangeOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExchange"
                    >
                      <div className="accordion-body widget-desc">
                        <p>
                          We accept returns within 14 days of delivery. Items
                          must be unworn, unwashed, and in their original
                          condition.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExchangeTwo"
                      aria-expanded="false"
                      aria-controls="collapseExchangeTwo"
                      role="button"
                    >
                      <span>How do I return an item?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseExchangeTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExchange"
                    >
                      <div className="accordion-body widget-material">
                        <p>
                          Simply contact our customer service team for a return
                          authorization, and we’ll provide instructions for
                          shipping the item back.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExchangeThree"
                      aria-expanded="false"
                      aria-controls="collapseExchangeThree"
                      role="button"
                    >
                      <span>Are there any items that cannot be returned?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseExchangeThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExchange"
                    >
                      <div className="accordion-body">
                        <p>
                          Yes, sale items, personalized products, and
                          undergarments are non-returnable.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion">
                    <div
                      className="accordion-title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExchangeFour"
                      aria-expanded="false"
                      aria-controls="collapseExchangeFour"
                      role="button"
                    >
                      <span>When will I receive my refund?</span>
                      <span className="icon icon-arrow-down" />
                    </div>
                    <div
                      id="collapseExchangeFour"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFour"
                      data-bs-parent="#accordionExchange"
                    >
                      <div className="accordion-body">
                        <p>
                          Once your return is received and inspected, we will
                          process the refund within 5-7 business days.
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
