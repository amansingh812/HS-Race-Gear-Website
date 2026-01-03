'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * RacingSuitProduct Component
 * 
 * Features:
 * - Size selection with live stock display
 * - Custom fit option with measurement workflow
 * - Add-on options (arm restraints, foot stirrups, name patches)
 * - Dynamic price calculation
 * - Delivery time estimation
 */
export default function RacingSuitProduct({ product }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [isCustomFit, setIsCustomFit] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showMeasurementForm, setShowMeasurementForm] = useState(false);
  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    hips: '',
    inseam: '',
    armLength: '',
    shoulderWidth: '',
    height: '',
    weight: ''
  });

  // Calculate total price
  const calculateTotalPrice = () => {
    let total = product.price;
    
    // Add custom fit price
    if (isCustomFit && product.customFitAvailable) {
      total += product.customFitPrice || 0;
    }
    
    // Add selected options
    selectedOptions.forEach(optionSlug => {
      const option = product.customOptions?.find(opt => opt.slug === optionSlug);
      if (option) {
        total += option.price || 0;
      }
    });
    
    return total * quantity;
  };

  // Get stock for selected size
  const getStock = (size) => {
    const sizeItem = product.inventory?.find(inv => inv.size === size);
    return sizeItem?.stock || 0;
  };

  // Check if size is available
  const isSizeAvailable = (size) => {
    const sizeItem = product.inventory?.find(inv => inv.size === size);
    return sizeItem?.stock > 0 && sizeItem?.isAvailable;
  };

  // Get delivery estimate
  const getDeliveryEstimate = () => {
    if (isCustomFit) {
      return product.customFitLeadTime || '5-7 business days';
    }
    return '2-3 business days';
  };

  // Handle option toggle
  const toggleOption = (optionSlug) => {
    setSelectedOptions(prev => 
      prev.includes(optionSlug)
        ? prev.filter(s => s !== optionSlug)
        : [...prev, optionSlug]
    );
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!isCustomFit && !selectedSize) {
      alert('Please select a size');
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      slug: product.slug,
      price: calculateTotalPrice() / quantity,
      quantity,
      size: isCustomFit ? 'Custom Fit' : selectedSize,
      isCustomFit,
      selectedOptions,
      measurements: isCustomFit ? measurements : null,
      deliveryEstimate: getDeliveryEstimate(),
      image: product.images?.[0]?.url || '/images/placeholder-product.jpg'
    };

    console.log('Adding to cart:', cartItem);
    // TODO: Integrate with cart context
    alert('Added to cart! (Cart integration coming soon)');
  };

  return (
    <div className="racing-suit-product">
      <div className="row">
        {/* Product Images */}
        <div className="col-lg-6 mb-4">
          <div className="product-images">
            <div className="main-image mb-3">
              <Image
                src={product.images?.[0]?.url || '/images/placeholder-product.jpg'}
                alt={product.name}
                width={600}
                height={600}
                className="img-fluid rounded"
                style={{ objectFit: 'cover' }}
              />
            </div>
            {product.images?.length > 1 && (
              <div className="thumbnail-images d-flex gap-2">
                {product.images.map((img, idx) => (
                  <div key={idx} className="thumbnail" style={{ width: '80px', height: '80px' }}>
                    <Image
                      src={img.url}
                      alt={img.alt || product.name}
                      width={80}
                      height={80}
                      className="img-fluid rounded"
                      style={{ objectFit: 'cover', cursor: 'pointer' }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="col-lg-6">
          {/* Certification Badge */}
          {product.certification && product.certification !== 'None' && (
            <div className="badge bg-primary mb-2">{product.certification}</div>
          )}
          
          <h1 className="h2 mb-3">{product.name}</h1>
          
          {/* Price */}
          <div className="price-section mb-4">
            <span className="h3 text-primary">
              ${(calculateTotalPrice() / 100).toLocaleString()}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-muted text-decoration-line-through ms-2">
                ${(product.compareAtPrice / 100).toLocaleString()}
              </span>
            )}
            {product.discountPercentage > 0 && (
              <span className="badge bg-danger ms-2">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Material & Construction */}
          <div className="product-specs mb-4">
            <div className="row">
              <div className="col-6">
                <small className="text-muted">Material</small>
                <p className="mb-0 fw-bold">{product.material}</p>
              </div>
              <div className="col-6">
                <small className="text-muted">Construction</small>
                <p className="mb-0 fw-bold">{product.construction}</p>
              </div>
            </div>
          </div>

          {/* Size Selection */}
          <div className="size-selection mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="form-label mb-0 fw-bold">
                {isCustomFit ? 'Custom Fit Selected' : 'Select Size'}
              </label>
              {selectedSize && !isCustomFit && (
                <small className="text-success">
                  {getStock(selectedSize)} in stock
                </small>
              )}
            </div>
            
            {!isCustomFit && (
              <div className="size-grid d-flex flex-wrap gap-2 mb-3">
                {product.sizeOptions?.map(size => {
                  const available = isSizeAvailable(size);
                  const stock = getStock(size);
                  return (
                    <button
                      key={size}
                      className={`btn ${selectedSize === size ? 'btn-dark' : 'btn-outline-dark'} ${!available ? 'disabled opacity-50' : ''}`}
                      onClick={() => available && setSelectedSize(size)}
                      disabled={!available}
                      style={{ minWidth: '50px' }}
                    >
                      {size}
                      {!available && <small className="d-block text-danger">Out</small>}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Custom Fit Option */}
            {product.customFitAvailable && (
              <div className="custom-fit-option">
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="customFit"
                    checked={isCustomFit}
                    onChange={(e) => {
                      setIsCustomFit(e.target.checked);
                      if (e.target.checked) {
                        setSelectedSize('');
                        setShowMeasurementForm(true);
                      }
                    }}
                  />
                  <label className="form-check-label" htmlFor="customFit">
                    <strong>Custom Fit</strong>
                    <span className="text-primary ms-2">
                      +${(product.customFitPrice / 100).toLocaleString()}
                    </span>
                    <small className="d-block text-muted">
                      Made to your exact measurements ({product.customFitLeadTime})
                    </small>
                  </label>
                </div>

                {/* Measurement Form */}
                {isCustomFit && showMeasurementForm && (
                  <div className="measurement-form bg-light p-3 rounded mb-3">
                    <h6 className="mb-3">Enter Your Measurements (in inches)</h6>
                    <div className="row g-2">
                      {Object.entries(measurements).map(([key, value]) => (
                        <div key={key} className="col-6 col-md-3">
                          <label className="form-label small text-capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </label>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            value={value}
                            onChange={(e) => setMeasurements(prev => ({
                              ...prev,
                              [key]: e.target.value
                            }))}
                            placeholder="0"
                          />
                        </div>
                      ))}
                    </div>
                    <small className="text-muted d-block mt-2">
                      <i className="icon-info me-1" />
                      Need help? View our <a href="#" className="text-primary">measurement guide</a>
                    </small>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Add-on Options */}
          {product.customOptions?.length > 0 && (
            <div className="addon-options mb-4">
              <label className="form-label fw-bold mb-2">Add-on Options</label>
              <div className="options-list">
                {product.customOptions.map(option => (
                  <div key={option.slug} className="form-check mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`option-${option.slug}`}
                      checked={selectedOptions.includes(option.slug)}
                      onChange={() => toggleOption(option.slug)}
                    />
                    <label className="form-check-label" htmlFor={`option-${option.slug}`}>
                      {option.name}
                      {option.price > 0 && (
                        <span className="text-primary ms-2">
                          +${(option.price / 100).toLocaleString()}
                        </span>
                      )}
                      {option.description && (
                        <small className="d-block text-muted">{option.description}</small>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="quantity-section mb-4">
            <label className="form-label fw-bold">Quantity</label>
            <div className="input-group" style={{ maxWidth: '150px' }}>
              <button
                className="btn btn-outline-dark"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                className="form-control text-center"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
              <button
                className="btn btn-outline-dark"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Price Summary */}
          <div className="price-summary bg-light p-3 rounded mb-4">
            <div className="d-flex justify-content-between mb-2">
              <span>Base Price</span>
              <span>${(product.price / 100).toLocaleString()}</span>
            </div>
            {isCustomFit && (
              <div className="d-flex justify-content-between mb-2">
                <span>Custom Fit</span>
                <span>+${(product.customFitPrice / 100).toLocaleString()}</span>
              </div>
            )}
            {selectedOptions.map(optSlug => {
              const opt = product.customOptions?.find(o => o.slug === optSlug);
              if (!opt) return null;
              return (
                <div key={optSlug} className="d-flex justify-content-between mb-2">
                  <span>{opt.name}</span>
                  <span>+${(opt.price / 100).toLocaleString()}</span>
                </div>
              );
            })}
            {quantity > 1 && (
              <div className="d-flex justify-content-between mb-2">
                <span>Quantity</span>
                <span>×{quantity}</span>
              </div>
            )}
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span className="text-primary h5 mb-0">
                ${(calculateTotalPrice() / 100).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Delivery Estimate */}
          <div className="delivery-estimate mb-4">
            <div className="d-flex align-items-center text-success">
              <i className="icon-truck me-2" />
              <span>
                Estimated Delivery: <strong>{getDeliveryEstimate()}</strong>
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="action-buttons d-flex gap-3">
            <button
              className="btn btn-primary btn-lg flex-grow-1"
              onClick={handleAddToCart}
              disabled={!isCustomFit && !selectedSize}
            >
              <i className="icon-cart me-2" />
              Add to Cart
            </button>
            <button className="btn btn-outline-dark btn-lg">
              <i className="icon-heart" />
            </button>
          </div>

          {/* Features */}
          {product.features?.length > 0 && (
            <div className="product-features mt-4">
              <h6 className="fw-bold mb-3">Features</h6>
              <ul className="list-unstyled">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="mb-2">
                    <i className="icon-check text-success me-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Product Description */}
      <div className="product-description mt-5">
        <h4 className="mb-3">Description</h4>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
