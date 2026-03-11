import React from "react";

export default function Description({ product }) {
  return (
    <>
      {product.description && (
        <div className="item mb-3">
          <p>{product.description}</p>
        </div>
      )}

      {product.shortDescription && (
        <div className="item mb-3">
          <p className="fw-medium">{product.shortDescription}</p>
        </div>
      )}

      {product.material && (
        <div className="item mb-3">
          <p className="fw-medium title">Material Composition</p>
          <ul>
            <li>{product.material}</li>
            {product.construction && <li>Construction: {product.construction}</li>}
            {product.layers && <li>Layers: {product.layers}</li>}
          </ul>
        </div>
      )}

      {product.certification && (
        <div className="item mb-3">
          <p className="fw-medium title">Safety Certifications</p>
          <ul>
            <li>{product.certification}</li>
            {product.certificationLevel && <li>Level: {product.certificationLevel}</li>}
          </ul>
          <p className="text-muted small mt-2">
            This product meets or exceeds the safety standards required for professional racing.
          </p>
        </div>
      )}

      {product.features && product.features.length > 0 && (
        <div className="item mb-3">
          <p className="fw-medium title">Key Features</p>
          <ul>
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {product.brand && (
        <div className="item mb-3">
          <p className="fw-medium title">About {product.brand}</p>
          <p>
            {product.brand} is committed to providing high-quality racing gear 
            that meets the stringent safety requirements of professional motorsports 
            while ensuring maximum comfort and performance.
          </p>
        </div>
      )}

      <div className="item">
        <p className="fw-medium title">Care Instructions</p>
        <ul>
          <li>Professional cleaning recommended</li>
          <li>Do not machine wash unless specified</li>
          <li>Store in a cool, dry place away from direct sunlight</li>
          <li>Inspect regularly for wear or damage</li>
          <li>Follow manufacturer's care label instructions</li>
        </ul>
      </div>
    </>
  );
}
