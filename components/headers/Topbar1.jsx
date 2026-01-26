import React from "react";
import LanguageSelect from "../common/LanguageSelect";
import CurrencySelect from "../common/CurrencySelect";

export default function Topbar1() {
  return (
    <div className="tf-topbar bg-dark-5 topbar-bg">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-2 col-xl-3 d-none d-lg-block">
            <ul className="topbar-left tf-social-icon">
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
              
            </ul>
          </div>
          <div className="col-lg-7 col-xl-6 overflow-hidden">
          </div>
          <div className="col-lg-3">
            <div className="topbar-right">
              <div className="tf-languages">
                <i className="icon icon-contact" style={{color: "#fff"}} />
                <a href="/contact-us" className="phone" style={{color: "#fff"}}>
                  CONTACT US
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
