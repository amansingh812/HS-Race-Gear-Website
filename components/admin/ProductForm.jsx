'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductForm({ product = null, isEdit = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price ? product.price / 100 : '',
    compareAtPrice: product?.compareAtPrice ? product.compareAtPrice / 100 : '',
    category: product?.category?._id || product?.category || '',
    subcategory: product?.subcategory?._id || product?.subcategory || '',
    certification: product?.certification || '',
    certificationLevel: product?.certificationLevel || '',
    material: product?.material || '',
    construction: product?.construction || '',
    brand: product?.brand || 'HS Race Gear',
    status: product?.status || 'draft',
    isFeatured: product?.isFeatured || false,
    isNewArrival: product?.isNewArrival || false,
    customFitAvailable: product?.customFitAvailable || false,
    customFitPrice: product?.customFitPrice ? product.customFitPrice / 100 : '',
    customFitLeadTime: product?.customFitLeadTime || '3-4 weeks',
    metaTitle: product?.metaTitle || '',
    metaDescription: product?.metaDescription || '',
    metaKeywords: product?.metaKeywords?.join(', ') || '',
  });

  const [inventory, setInventory] = useState(
    product?.inventory || [
      { size: 'XS', stock: 0, sku: '', isAvailable: true },
      { size: 'S', stock: 0, sku: '', isAvailable: true },
      { size: 'M', stock: 0, sku: '', isAvailable: true },
      { size: 'L', stock: 0, sku: '', isAvailable: true },
      { size: 'XL', stock: 0, sku: '', isAvailable: true },
      { size: '2XL', stock: 0, sku: '', isAvailable: true },
    ]
  );

  const [images, setImages] = useState(
    product?.images || [{ url: '', altText: '', isPrimary: true }]
  );

  const [customOptions, setCustomOptions] = useState(
    product?.customOptions || []
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleInventoryChange = (index, field, value) => {
    const newInventory = [...inventory];
    newInventory[index][field] = field === 'stock' ? parseInt(value) || 0 : value;
    setInventory(newInventory);
  };

  const addInventorySize = () => {
    setInventory([...inventory, { size: '', stock: 0, sku: '', isAvailable: true }]);
  };

  const removeInventorySize = (index) => {
    setInventory(inventory.filter((_, i) => i !== index));
  };

  const handleImageChange = (index, field, value) => {
    const newImages = [...images];
    newImages[index][field] = field === 'isPrimary' ? value : value;
    // If setting as primary, unset others
    if (field === 'isPrimary' && value) {
      newImages.forEach((img, i) => {
        if (i !== index) img.isPrimary = false;
      });
    }
    setImages(newImages);
  };

  const addImage = () => {
    setImages([...images, { url: '', altText: '', isPrimary: false }]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...customOptions];
    newOptions[index][field] = field === 'price' ? parseFloat(value) * 100 : value;
    setCustomOptions(newOptions);
  };

  const addOption = () => {
    setCustomOptions([...customOptions, { 
      name: '', 
      slug: '', 
      price: 0, 
      description: '' 
    }]);
  };

  const removeOption = (index) => {
    setCustomOptions(customOptions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare data
      const productData = {
        ...formData,
        price: Math.round(parseFloat(formData.price) * 100),
        compareAtPrice: formData.compareAtPrice ? Math.round(parseFloat(formData.compareAtPrice) * 100) : null,
        customFitPrice: formData.customFitAvailable && formData.customFitPrice 
          ? Math.round(parseFloat(formData.customFitPrice) * 100) 
          : null,
        metaKeywords: formData.metaKeywords.split(',').map(k => k.trim()).filter(k => k),
        // Remove empty subcategory - send null instead
        subcategory: formData.subcategory && formData.subcategory.trim() !== '' ? formData.subcategory : null,
        // Racing Specifications are optional - convert empty strings to null
        certification: formData.certification && formData.certification.trim() !== '' ? formData.certification : null,
        certificationLevel: formData.certificationLevel && formData.certificationLevel.trim() !== '' ? formData.certificationLevel : null,
        material: formData.material && formData.material.trim() !== '' ? formData.material : null,
        construction: formData.construction && formData.construction.trim() !== '' ? formData.construction : null,
        inventory: inventory
          .filter(inv => inv.size)
          .map(inv => ({
            ...inv,
            sku: inv.sku || `${(formData.name || 'PROD').toUpperCase().replace(/[^A-Z0-9]+/g, '-').slice(0, 20)}-${inv.size}`,
            stock: parseInt(inv.stock) || 0,
          })),
        images: images.filter(img => img.url),
        customOptions: customOptions.filter(opt => opt.name && opt.slug),
      };

      const url = isEdit ? `/api/products/${product._id}` : '/api/products';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (data.success) {
        alert(`Product ${isEdit ? 'updated' : 'created'} successfully!`);
        router.push('/admin/products');
      } else {
        alert(`Error: ${data.error || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="row">
        {/* Left Column - Basic Information */}
        <div className="col-lg-8">
          {/* Basic Information */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Basic Information</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description *</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Price ($) *</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Compare at Price ($)</label>
                  <input
                    type="number"
                    name="compareAtPrice"
                    className="form-control"
                    step="0.01"
                    value={formData.compareAtPrice}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Brand</label>
                <input
                  type="text"
                  name="brand"
                  className="form-control"
                  value={formData.brand}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Racing Specifications */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Racing Specifications</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Certification <span className="text-muted">(Optional)</span></label>
                  <select
                    name="certification"
                    className="form-select"
                    value={formData.certification}
                    onChange={handleInputChange}
                  >
                    <option value="">None</option>
                    <option value="SFI 3.2A/1">SFI 3.2A/1</option>
                    <option value="SFI 3.2A/5">SFI 3.2A/5</option>
                    <option value="SFI 3.2A/15">SFI 3.2A/15</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Certification Level <span className="text-muted">(Optional)</span></label>
                  <select
                    name="certificationLevel"
                    className="form-select"
                    value={formData.certificationLevel}
                    onChange={handleInputChange}
                  >
                    <option value="">None</option>
                    <option value="SFI-1">SFI Level 1</option>
                    <option value="SFI-5">SFI Level 5</option>
                    <option value="SFI-15">SFI Level 15</option>
                    <option value="SFI-3.3/5">SFI 3.3/5</option>
                    <option value="SFI-5.1">SFI 5.1</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Material <span className="text-muted">(Optional)</span></label>
                  <select
                    name="material"
                    className="form-select"
                    value={formData.material}
                    onChange={handleInputChange}
                  >
                    <option value="">None</option>
                    <option value="Nomex">Nomex</option>
                    <option value="FR Cotton">FR Cotton</option>
                    <option value="Nomex/Kevlar">Nomex/Kevlar</option>
                    <option value="Proban">Proban</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Construction <span className="text-muted">(Optional)</span></label>
                  <select
                    name="construction"
                    className="form-select"
                    value={formData.construction}
                    onChange={handleInputChange}
                  >
                    <option value="">None</option>
                    <option value="Single-layer">Single-layer</option>
                    <option value="Double-layer">Double-layer</option>
                    <option value="Triple-layer">Triple-layer</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Inventory</h5>
              <button type="button" className="btn btn-sm btn-outline-primary" onClick={addInventorySize}>
                + Add Size
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Size</th>
                      <th>SKU</th>
                      <th>Stock</th>
                      <th>Available</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((inv, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="e.g., M"
                            value={inv.size}
                            onChange={(e) => handleInventoryChange(index, 'size', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="SKU-XXX"
                            value={inv.sku}
                            onChange={(e) => handleInventoryChange(index, 'sku', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            value={inv.stock}
                            onChange={(e) => handleInventoryChange(index, 'stock', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={inv.isAvailable}
                            onChange={(e) => handleInventoryChange(index, 'isAvailable', e.target.checked)}
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeInventorySize(index)}
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Product Images</h5>
              <button type="button" className="btn btn-sm btn-outline-primary" onClick={addImage}>
                + Add Image
              </button>
            </div>
            <div className="card-body">
              {images.map((img, index) => (
                <div key={index} className="border rounded p-3 mb-3">
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <label className="form-label">Image URL</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="/images/product.jpg"
                        value={img.url}
                        onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                      />
                    </div>
                    <div className="col-md-4 mb-2">
                      <label className="form-label">Alt Text</label>
                      <input
                        type="text"
                        className="form-control"
                        value={img.altText}
                        onChange={(e) => handleImageChange(index, 'altText', e.target.value)}
                      />
                    </div>
                    <div className="col-md-2 mb-2">
                      <label className="form-label">Primary</label>
                      <div>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={img.isPrimary}
                          onChange={(e) => handleImageChange(index, 'isPrimary', e.target.checked)}
                        />
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger ms-2"
                          onClick={() => removeImage(index)}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Options */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Custom Options (Add-ons)</h5>
              <button type="button" className="btn btn-sm btn-outline-primary" onClick={addOption}>
                + Add Option
              </button>
            </div>
            <div className="card-body">
              {customOptions.map((opt, index) => (
                <div key={index} className="border rounded p-3 mb-3">
                  <div className="row">
                    <div className="col-md-4 mb-2">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Arm Restraints"
                        value={opt.name}
                        onChange={(e) => handleOptionChange(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="col-md-3 mb-2">
                      <label className="form-label">Slug</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="arm-restraints"
                        value={opt.slug}
                        onChange={(e) => handleOptionChange(index, 'slug', e.target.value)}
                      />
                    </div>
                    <div className="col-md-2 mb-2">
                      <label className="form-label">Price ($)</label>
                      <input
                        type="number"
                        className="form-control"
                        step="0.01"
                        value={opt.price / 100}
                        onChange={(e) => handleOptionChange(index, 'price', e.target.value)}
                      />
                    </div>
                    <div className="col-md-3 mb-2">
                      <label className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        value={opt.description}
                        onChange={(e) => handleOptionChange(index, 'description', e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger mt-2"
                        onClick={() => removeOption(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SEO */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">SEO Information</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Meta Title</label>
                <input
                  type="text"
                  name="metaTitle"
                  className="form-control"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Meta Description</label>
                <textarea
                  name="metaDescription"
                  className="form-control"
                  rows="2"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Meta Keywords (comma separated)</label>
                <input
                  type="text"
                  name="metaKeywords"
                  className="form-control"
                  value={formData.metaKeywords}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Settings */}
        <div className="col-lg-4">
          {/* Categories */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Categories</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Category *</label>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories
                    .filter(cat => !cat.parent)
                    .map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Subcategory</label>
                <select
                  name="subcategory"
                  className="form-select"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                >
                  <option value="">Select Subcategory</option>
                  {categories
                    .filter(cat => cat.parent === formData.category)
                    .map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          {/* Custom Fit */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Custom Fit Options</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="customFitAvailable"
                    className="form-check-input"
                    checked={formData.customFitAvailable}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label">
                    Custom Fit Available
                  </label>
                </div>
              </div>
              {formData.customFitAvailable && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Custom Fit Price ($)</label>
                    <input
                      type="number"
                      name="customFitPrice"
                      className="form-control"
                      step="0.01"
                      value={formData.customFitPrice}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Lead Time</label>
                    <input
                      type="text"
                      name="customFitLeadTime"
                      className="form-control"
                      value={formData.customFitLeadTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Status & Visibility */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Status & Visibility</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    className="form-check-input"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label">
                    Featured Product
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="isNewArrival"
                    className="form-check-input"
                    checked={formData.isNewArrival}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label">
                    New Arrival
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <button
                type="submit"
                className="btn btn-primary w-100 mb-2"
                disabled={loading}
              >
                {loading ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={() => router.push('/admin/products')}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
