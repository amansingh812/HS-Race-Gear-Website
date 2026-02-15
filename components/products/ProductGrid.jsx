'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * ProductGrid Component
 * 
 * Displays products from the database with filtering and sorting
 */
export default function ProductGrid({ 
  initialProducts = [], 
  initialPagination = {},
  categoryId = null,
  showFilters = true 
}) {
  const [products, setProducts] = useState(initialProducts);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    certification: '',
    material: '',
    minPrice: '',
    maxPrice: '',
    sort: 'createdAt',
    order: 'desc'
  });

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: 12,
        status: 'active'
      });
      
      if (categoryId) params.append('category', categoryId);
      if (filters.certification) params.append('certification', filters.certification);
      if (filters.material) params.append('material', filters.material);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.sort) params.append('sort', filters.sort);
      if (filters.order) params.append('order', filters.order);
      
      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data.products);
        setPagination(data.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialProducts.length === 0) {
      fetchProducts();
    }
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    fetchProducts(1);
  };

  const clearFilters = () => {
    setFilters({
      certification: '',
      material: '',
      minPrice: '',
      maxPrice: '',
      sort: 'createdAt',
      order: 'desc'
    });
    fetchProducts(1);
  };

  return (
    <div className="product-grid-wrapper">
      {/* Filters */}
      {showFilters && (
        <div className="filters-section mb-4">
          <div className="row g-3 align-items-end">
            <div className="col-md-2">
              <label className="form-label small">Certification</label>
              <select
                className="form-select form-select-sm"
                value={filters.certification}
                onChange={(e) => handleFilterChange('certification', e.target.value)}
              >
                <option value="">All</option>
                <option value="SFI 3.2A/1">SFI 3.2A/1</option>
                <option value="SFI 3.2A/5">SFI 3.2A/5</option>
                <option value="SFI 3.2A/15">SFI 3.2A/15</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label small">Material</label>
              <select
                className="form-select form-select-sm"
                value={filters.material}
                onChange={(e) => handleFilterChange('material', e.target.value)}
              >
                <option value="">All</option>
                <option value="Nomex">Nomex</option>
                <option value="FR Cotton">FR Cotton</option>
                <option value="Nomex/Kevlar">Nomex/Kevlar</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label small">Min Price ($)</label>
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label small">Max Price ($)</label>
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Any"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label small">Sort By</label>
              <select
                className="form-select form-select-sm"
                value={`${filters.sort}-${filters.order}`}
                onChange={(e) => {
                  const [sort, order] = e.target.value.split('-');
                  setFilters(prev => ({ ...prev, sort, order }));
                }}
              >
                <option value="createdAt-desc">Newest</option>
                <option value="createdAt-asc">Oldest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
              </select>
            </div>
            <div className="col-md-2">
              <div className="d-flex gap-2">
                <button className="btn btn-primary btn-sm" onClick={applyFilters}>
                  Apply
                </button>
                <button className="btn btn-outline-secondary btn-sm" onClick={clearFilters}>
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-5">
          <h4>No products found</h4>
          <p className="text-muted">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="row g-4">
          {products.map(product => {
            const totalStock = product.inventory?.reduce((sum, inv) => sum + inv.stock, 0) || 0;
            const primaryImage = product.images?.find(img => img.isPrimary)?.url || 
                                product.images?.[0]?.url || 
                                '/images/placeholder-product.jpg';
            
            return (
              <div key={product._id} className="col-6 col-md-4 col-lg-3">
                <div className="product-card card h-100 border-0 shadow-sm">
                  {/* Image */}
                  <div className="card-img-top position-relative" style={{ height: '250px', overflow: 'hidden' }}>
                    <Link href={`/shop/${product.slug}`}>
                      <Image
                        src={primaryImage}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="product-image"
                      />
                    </Link>
                    
                    {/* Badges */}
                    <div className="position-absolute top-0 start-0 p-2">
                      {product.isFeatured && (
                        <span className="badge bg-warning text-dark me-1">Featured</span>
                      )}
                      {product.isNewArrival && (
                        <span className="badge bg-success">New</span>
                      )}
                    </div>
                    
                    {/* Discount Badge */}
                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                      <div className="position-absolute top-0 end-0 p-2">
                        <span className="badge bg-danger">
                          -{Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                        </span>
                      </div>
                    )}
                    
                    {/* Stock Warning */}
                    {totalStock === 0 && !product.customFitAvailable && (
                      <div className="position-absolute bottom-0 start-0 end-0 bg-danger text-white text-center py-1">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  
                  {/* Card Body */}
                  <div className="card-body">
                    {/* Certification */}
                    {product.certification && product.certification !== 'None' && (
                      <small className="text-primary d-block mb-1">{product.certification}</small>
                    )}
                    
                    {/* Name */}
                    <h6 className="card-title mb-2">
                      <Link href={`/shop/${product.slug}`} className="text-dark text-decoration-none">
                        {product.name.length > 50 ? `${product.name.substring(0, 50)}...` : product.name}
                      </Link>
                    </h6>
                    
                    {/* Price */}
                    <div className="price-wrapper">
                      <span className="h6 text-primary mb-0">
                        ${(product.price / 100).toLocaleString()}
                      </span>
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <small className="text-muted text-decoration-line-through ms-2">
                          ${(product.compareAtPrice / 100).toLocaleString()}
                        </small>
                      )}
                    </div>
                    
                    {/* Custom Fit Badge */}
                    {product.customFitAvailable && (
                      <small className="d-block text-success mt-1">
                        <i className="icon-check me-1" />
                        Custom Fit Available
                      </small>
                    )}
                  </div>
                  
                  {/* Quick View Button */}
                  <div className="card-footer bg-white border-0 pt-0">
                    <Link 
                      href={`/shop/${product.slug}`} 
                      className="btn btn-outline-primary btn-sm w-100"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <nav className="mt-5">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => fetchProducts(pagination.currentPage - 1)}
              >
                Previous
              </button>
            </li>
            {[...Array(pagination.totalPages)].map((_, i) => (
              <li key={i} className={`page-item ${pagination.currentPage === i + 1 ? 'active' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => fetchProducts(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => fetchProducts(pagination.currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}

      <style jsx>{`
        .product-card:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
        }
        .product-card:hover .product-image {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
}
