import React from "react";

export default function StoreLocations() {
  return (
    <section className="s-store-location flat-spacing-13">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="wg-map">
              <iframe
                src="https://maps.google.com/maps?q=59+Kondazian+St,+Watertown+MA+02472&output=embed"
                width="100%"
                height="589px"
                style={{ border: "none" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Single real store */}
            <div className="tf-grid-layout lg-col-3 sm-col-2">
              <div className="box-store">
                <div className="content">
                  <p className="title">HS Race Gear</p>
                  <ul className="contact-list">
                    <li>
                      <p>
                        Address:{" "}
                        <a
                          className="link"
                          href="https://maps.google.com/?q=59+Kondazian+St,+Watertown+MA+02472"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          59 Kondazian St, Watertown MA, 02472
                        </a>
                      </p>
                    </li>
                    <li>
                      <p>
                        Phone number:{" "}
                        <a className="link" href="tel:+16173196993">
                          +1 (617) 319 6993
                        </a>
                      </p>
                    </li>
                    <li>
                      <p>
                        Open:{" "}
                        <span className="text-main">
                          Mon – Sat, 9am – 6pm EST
                        </span>
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="bot">
                  <a
                    href="https://maps.google.com/?q=59+Kondazian+St,+Watertown+MA+02472"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tf-btn btn-line"
                  >
                    Get direction
                    <i className="icon-arrow-top-left" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
