import React from "react";
import Description from "./Description";
import Material from "./Material";
import ReturnPolicies from "./ReturnPolicies";
import AdditionalInfo from "./AdditionalInfo";
import Reviews from "./Reviews";

export default function Description1({ product }) {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="widget-accordion wd-product-descriptions">
          <div
            className="accordion-title collapsed"
            data-bs-target="#description"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="description"
            role="button"
          >
            <span>Description</span>
            <span className="icon icon-arrow-down" />
          </div>
          <div id="description" className="collapse">
            <div className="accordion-body widget-desc">
              <Description product={product} />
            </div>
          </div>
        </div>

        {/* Racing Specifications Section */}
        {(product.certification || product.features?.length > 0) && (
          <div className="widget-accordion wd-product-descriptions">
            <div
              className="accordion-title collapsed"
              data-bs-target="#specifications"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="specifications"
              role="button"
            >
              <span>Specifications</span>
              <span className="icon icon-arrow-down" />
            </div>
            <div id="specifications" className="collapse">
              <div className="accordion-body">
                <div className="specifications-content">
                  {product.certification && (
                    <div className="spec-item mb-3">
                      <h6 className="fw-bold">Safety Certification</h6>
                      <p>{product.certification}</p>
                      {product.certificationLevel && (
                        <p className="text-muted">Level: {product.certificationLevel}</p>
                      )}
                    </div>
                  )}
                  {product.features && product.features.length > 0 && (
                    <div className="spec-item mb-3">
                      <h6 className="fw-bold">Key Features</h6>
                      <ul>
                        {product.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {product.customFitAvailable && (
          <div className="widget-accordion wd-product-descriptions">
            <div
              className="accordion-title collapsed"
              data-bs-target="#customFit"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="customFit"
              role="button"
            >
              <span>Custom Fit Information</span>
              <span className="icon icon-arrow-down" />
            </div>
            <div id="customFit" className="collapse">
              <div className="accordion-body">
                <div className="custom-fit-info">
                  <p>
                    This racing suit is available with custom Gear options.
                    {product.customFitLeadTime && ` Lead time: ${product.customFitLeadTime}`}
                  </p>
                  {product.customFitPrice > 0 && (
                    <p className="text-muted">
                      Additional cost: ${(product.customFitPrice / 100).toFixed(2)}
                    </p>
                  )}
                  <p className="mt-3">
                    <strong>How it works:</strong>
                  </p>
                  <ol>
                    <li>Select "Custom Fit" when adding to cart</li>
                    <li>You'll be contacted for measurements after order confirmation</li>
                    <li>Your suit will be custom-made to your specifications</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* <div className="widget-accordion wd-product-descriptions">
          <div
            className="accordion-title collapsed"
            data-bs-target="#reviews"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="reviews"
            role="button"
          >
            <span>Reviews ({product.rating?.count || 0})</span>
            <span className="icon icon-arrow-down" />
          </div>
          <div id="reviews" className="collapse">
            <div className="accordion-body wd-customer-review">
              <Reviews product={product} />
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
