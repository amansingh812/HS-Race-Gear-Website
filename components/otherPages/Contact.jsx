import React from "react";

export default function Contact() {
  return (
    <section className="s-contact flat-spacing-13">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="wg-map">
              <iframe
                src="https://maps.google.com/maps?q=59+Kondazian+St,+Watertown+MA+02472&output=embed"
                className="map"
                style={{ border: "none" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="content-left">
              <div className="title fw-medium display-md-2">Contact Us</div>
              <p className="sub-title text-main">
                Have a question? Please contact us using the customer support
                <br />
                channels below.
              </p>
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
                    <span className="text-main">Mon – Sat, 9am – 6pm EST</span>
                  </p>
                </li>
              </ul>
              <ul className="tf-social-icon style-large">
                <li>
                  <a
                    href="https://www.facebook.com/"
                    className="social-item social-facebook"
                  >
                    <i className="icon icon-fb" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    className="social-item social-instagram"
                  >
                    <i className="icon icon-instagram" />
                  </a>
                </li>
                <li>
                  <a href="https://x.com/" className="social-item social-x">
                    <i className="icon icon-x" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.snapchat.com/"
                    className="social-item social-snapchat"
                  >
                    <i className="icon icon-snapchat" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="content-right">
              <div className="title fw-medium display-md-2">Get In Touch</div>
              <p className="sub-title text-main">
                Please submit&nbsp;all general enquiries&nbsp;in the contact
                form below and we look forward to hearing from you soon.
              </p>
              <div className="form-contact-wrap">
                <form action="#" className="form-default">
                  <div className="wrap">
                    <div className="cols">
                      <fieldset>
                        <label htmlFor="username">Your name*</label>
                        <input
                          id="username"
                          type="text"
                          name="username"
                          required
                        />
                      </fieldset>
                      <fieldset>
                        <label htmlFor="email">Your email*</label>
                        <input id="email" type="email" name="email" required />
                      </fieldset>
                    </div>
                    <div className="cols">
                      <fieldset className="textarea">
                        <label htmlFor="mess">Message</label>
                        <textarea id="mess" required defaultValue={""} />
                      </fieldset>
                    </div>
                    <div className="button-submit">
                      <button className="tf-btn animate-btn" type="submit">
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
