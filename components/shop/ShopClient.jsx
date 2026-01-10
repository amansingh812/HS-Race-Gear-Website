'use client';

import React, { useState, useEffect } from 'react';
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar2 from "@/components/headers/Topbar2";
import Link from "next/link";
import ProductCard1 from "@/components/productCards/ProductCard1";

export default function ShopClient() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    certification: '',
    material: '',
    search: '',
    minPrice: '',
    maxPrice: '',
    sort: 'createdAt',
    order: 'desc',
    inStock: false,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    limit: 12,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters, pagination.currentPage]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data.categories.filter(cat => !cat.parent));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.currentPage,
        limit: pagination.limit,
        sort: filters.sort,
        order: filters.order,
      });

      if (filters.category) params.append('category', filters.category);
      if (filters.certification) params.append('certification', filters.certification);
      if (filters.material) params.append('material', filters.material);
      if (filters.search) params.append('search', filters.search);
      if (filters.minPrice) params.append('minPrice', parseFloat(filters.minPrice) * 100);
      if (filters.maxPrice) params.append('maxPrice', parseFloat(filters.maxPrice) * 100);
      if (filters.inStock) params.append('inStock', 'true');

      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();

      if (data.success) {
        const transformedProducts = data.data.products.map(p => {
          const primaryImage = p.images?.find(img => img.isPrimary) || p.images?.[0];
          const secondaryImage = p.images?.find(img => !img.isPrimary) || p.images?.[1];
          
          return {
            id: p._id,
            imgSrc: primaryImage?.url || '/images/products/placeholder.jpg',
            imgHover: secondaryImage?.url || primaryImage?.url || '/images/products/placeholder.jpg',
            title: p.name,
            price: p.price / 100,
            oldPrice: p.compareAtPrice ? p.compareAtPrice / 100 : null,
            saleLabel: p.compareAtPrice && p.compareAtPrice > p.price
              ? `${Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100)}% Off`
              : null,
            slug: p.slug,
            certification: p.certification,
            material: p.material,
            inStock: p.inventory?.some(inv => inv.stock > 0) || false,
            category: p.category,
            isFeatured: p.isFeatured,
            isNewArrival: p.isNewArrival,
          };
        });

        setProducts(transformedProducts);
        setPagination(prev => ({
          ...prev,
          totalPages: data.data.pagination.totalPages,
          totalProducts: data.data.pagination.totalProducts,
        }));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      certification: '',
      material: '',
      search: '',
      minPrice: '',
      maxPrice: '',
      sort: 'createdAt',
      order: 'desc',
      inStock: false,
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  return (
    <>
      <Topbar2 parentClass="tf-topbar bg-dark-5 topbar-bg" />
      <Header1 />
      
      {/* Breadcrumb */}
      <section className="tf-page-title">
        <div className="container">
          <div className="box-title text-center">
            <h4 className="title">Racing Gear Shop</h4>
            <div className="breadcrumb-list">
              <Link className="breadcrumb-item" href="/">Home</Link>
              <div className="breadcrumb-item dot"><span /></div>
              <div className="breadcrumb-item current">Shop</div>
            </div>
            <p className="desc text-md text-main">
              Premium FIA and SFI certified racing gear for professionals
            </p>
          </div>
        </div>
      </section>

      {/* Shop Content */}
      <section className="flat-spacing-24">
        <div className="container">
          <div className="row">
            {/* Sidebar Filters */}
            <div className="col-lg-3 col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="mb-0">Filters</h5>
                </div>
                <div className="card-body">
                  {/* Search */}
                  <div className="mb-4">
                    <label className="form-label fw-bold">Search</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search products..."
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="mb-4">
                    <label className="form-label fw-bold">Category</label>
                    <select
                      className="form-select"
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                    >
                      <option value="">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name} ({cat.productCount || 0})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Certification Filter */}
                  <div className="mb-4">
                    <label className="form-label fw-bold">Certification</label>
                    <select
                      className="form-select"
                      value={filters.certification}
                      onChange={(e) => handleFilterChange('certification', e.target.value)}
                    >
                      <option value="">All Certifications</option>
                      <option value="SFI 3.2A/1">SFI 3.2A/1</option>
                      <option value="SFI 3.2A/5">SFI 3.2A/5</option>
                      <option value="FIA 8856-2018">FIA 8856-2018</option>
                      <option value="None">None</option>
                    </select>
                  </div>

                  {/* Material Filter */}
                  <div className="mb-4">
                    <label className="form-label fw-bold">Material</label>
                    <select
                      className="form-select"
                      value={filters.material}
                      onChange={(e) => handleFilterChange('material', e.target.value)}
                    >
                      <option value="">All Materials</option>
                      <option value="Nomex">Nomex</option>
                      <option value="FR Cotton">FR Cotton</option>
                      <option value="Nomex/Kevlar">Nomex/Kevlar</option>
                      <option value="Proban">Proban</option>
                    </select>
                  </div>

                  {/* Price Range */}
                  <div className="mb-4">
                    <label className="form-label fw-bold">Price Range ($)</label>
                    <div className="row g-2">
                      <div className="col-6">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Min"
                          value={filters.minPrice}
                          onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        />
                      </div>
                      <div className="col-6">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Max"
                          value={filters.maxPrice}
                          onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* In Stock */}
                  <div className="mb-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="inStockFilter"
                        checked={filters.inStock}
                        onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="inStockFilter">
                        In Stock Only
                      </label>
                    </div>
                  </div>

                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={clearFilters}
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="col-lg-9 col-md-8">
              {/* Toolbar */}
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <p className="mb-0">
                        Showing <strong>{products.length}</strong> of <strong>{pagination.totalProducts}</strong> products
                      </p>
                    </div>
                    <div className="col-md-6">
                      <div className="row g-2">
                        <div className="col-6">
                          <select
                            className="form-select form-select-sm"
                            value={filters.sort}
                            onChange={(e) => handleFilterChange('sort', e.target.value)}
                          >
                            <option value="createdAt">Newest</option>
                            <option value="price">Price</option>
                            <option value="name">Name</option>
                            <option value="salesCount">Popular</option>
                          </select>
                        </div>
                        <div className="col-6">
                          <select
                            className="form-select form-select-sm"
                            value={filters.order}
                            onChange={(e) => handleFilterChange('order', e.target.value)}
                          >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products */}
              {loading ? (
                <div className="d-flex justify-content-center p-5">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : products.length === 0 ? (
                <div className="alert alert-info">
                  No products found. Try adjusting your filters.
                </div>
              ) : (
                <>
                  <div className="row g-4">
                    {products.map((product, index) => (
                      <div key={product.id} className="col-lg-4 col-md-6">
                        <ProductCard1
                          product={product}
                          tooltipDirection="top"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <nav className="mt-5">
                      <ul className="pagination justify-content-center">
                        <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                            disabled={pagination.currentPage === 1}
                          >
                            Previous
                          </button>
                        </li>
                        {[...Array(pagination.totalPages)].map((_, i) => (
                          <li
                            key={i}
                            className={`page-item ${pagination.currentPage === i + 1 ? 'active' : ''}`}
                          >
                            <button
                              className="page-link"
                              onClick={() => setPagination(prev => ({ ...prev, currentPage: i + 1 }))}
                            >
                              {i + 1}
                            </button>
                          </li>
                        ))}
                        <li className={`page-item ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                            disabled={pagination.currentPage === pagination.totalPages}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer1 />
    </>
  );
}
