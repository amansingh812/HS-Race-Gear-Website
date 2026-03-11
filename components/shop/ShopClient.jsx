'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Footer3 from '../footers/Footer3';
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Link from "next/link";
import ProductCard1 from "@/components/productCards/ProductCard1";
import '@/public/css/shop.css';

// Category configuration
const CATEGORY_CONFIG = {
  'race-suits': {
    title: 'Off The Rack Race Suits',
    description: 'Premium pre-made racing suits with SFI certifications. Ready to ship in standard sizes.',
    showCertification: true,
    showMaterial: true,
    breadcrumb: 'Race Suits',
  },
  'crew-shirts': {
    title: 'Crew Shirts',
    description: 'Professional team crew shirts for your pit crew and team. Available in custom sublimated designs.',
    showCertification: false,
    showMaterial: false,
    breadcrumb: 'Crew Shirts',
  },
  'hoodies': {
    title: 'Sublimated Crew Hoodies',
    description: 'Custom sublimated crew hoodies with full-color printing. Perfect for team branding and comfort.',
    showCertification: false,
    showMaterial: false,
    breadcrumb: 'Hoodies',
  },
};

const ALL_CATEGORIES = [
  { slug: null, label: 'Shop All' },
  { slug: 'race-suits', label: 'Race Suits' },
  { slug: 'crew-shirts', label: 'Crew Shirts' },
  { slug: 'hoodies', label: 'Hoodies' },
];

export default function ShopClient() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('category');

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resolvedCategoryId, setResolvedCategoryId] = useState(null);
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

  const activeCategoryConfig = categorySlug ? CATEGORY_CONFIG[categorySlug] : null;
  const pageTitle = activeCategoryConfig?.title || 'Racing Gear Shop';
  const pageDescription = activeCategoryConfig?.description || 'Premium SFI certified racing gear for professionals';
  const showCertificationFilter = activeCategoryConfig?.showCertification ?? true;
  const showMaterialFilter = activeCategoryConfig?.showMaterial ?? true;

  // Reset filters when category changes
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: '',
      certification: '',
      material: '',
      search: '',
      minPrice: '',
      maxPrice: '',
      inStock: false,
    }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    setResolvedCategoryId(null);
  }, [categorySlug]);

  // Resolve category slug to ObjectId
  useEffect(() => {
    if (categorySlug) {
      resolveCategoryId(categorySlug);
    } else {
      setResolvedCategoryId(null);
      fetchCategories();
      fetchProducts(null);
    }
  }, [categorySlug]);

  // Fetch products when filters or pagination change
  useEffect(() => {
    if (categorySlug && resolvedCategoryId === null) return; // Wait for category resolution
    fetchProducts(resolvedCategoryId);
  }, [filters, pagination.currentPage, resolvedCategoryId]);

  const fetchWithTimeout = async (url, timeoutMs = 6000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  };

  const resolveCategoryId = async (slug) => {
    try {
      const response = await fetchWithTimeout(`/api/categories/${slug}`);
      const data = await response.json();
      if (data.success && data.data.category) {
        const cat = data.data.category;
        setResolvedCategoryId(cat._id?.toString() || cat._id);
      } else {
        setResolvedCategoryId('not-found');
        setProducts([]);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error resolving category:', error);
      setResolvedCategoryId('not-found');
      setProducts([]);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetchWithTimeout('/api/categories?parent=null');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async (catId) => {
    if (catId === 'not-found') {
      return;
    }

    setLoading(true);

    try {
      const params = new URLSearchParams({
        page: pagination.currentPage,
        limit: pagination.limit,
        sort: filters.sort,
        order: filters.order,
      });

      // Use resolved category ID for filtering
      if (catId) {
        params.append('category', catId);
      } else if (filters.category) {
        params.append('category', filters.category);
      }

      if (filters.certification) params.append('certification', filters.certification);
      if (filters.material) params.append('material', filters.material);
      if (filters.search) params.append('search', filters.search);
      if (filters.minPrice) params.append('minPrice', parseFloat(filters.minPrice) * 100);
      if (filters.maxPrice) params.append('maxPrice', parseFloat(filters.maxPrice) * 100);
      if (filters.inStock) params.append('inStock', 'true');

      const response = await fetchWithTimeout(`/api/products?${params}`);
      const data = await response.json();

      if (data.success) {
        const transformedProducts = data.data.products.map(p => {
          const primaryImage = p.images?.find(img => img.isPrimary) || p.images?.[0];
          const secondaryImage = p.images?.find(img => !img.isPrimary) || p.images?.[1];

          return {
            id: p._id,
            imgSrc: primaryImage?.url || '/images/products/fashion/product-1.jpg',
            imgHover: secondaryImage?.url || primaryImage?.url || '/images/products/fashion/product-2.jpg',
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
          totalProducts: data.data.pagination.totalProducts || data.data.pagination.totalCount,
        }));
        setLoading(false);
      } else {
        setProducts([]);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
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
      <Topbar1 />
      <Header3 />

      {/* Breadcrumb */}
      <section className="tf-page-title">
        <div className="container">
          <div className="box-title text-center">
            <h4 className="title">{pageTitle}</h4>
            <div className="breadcrumb-list">
              <Link className="breadcrumb-item" href="/">Home</Link>
              <div className="breadcrumb-item dot"><span /></div>
              <Link className="breadcrumb-item" href="/shop">Shop</Link>
              {activeCategoryConfig && (
                <>
                  <div className="breadcrumb-item dot"><span /></div>
                  <div className="breadcrumb-item current">{activeCategoryConfig.breadcrumb}</div>
                </>
              )}
            </div>
            <p className="desc text-md text-main">{pageDescription}</p>
          </div>
        </div>
      </section>

      {/* Shop Content */}
      <section className="flat-spacing-24">
        <div className="container">
          {/* Category Tabs */}
          <div className="shop-category-tabs">
            {ALL_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug || 'all'}
                href={cat.slug ? `/shop?category=${cat.slug}` : '/shop'}
                className={`shop-category-tab ${categorySlug === cat.slug || (!categorySlug && !cat.slug) ? 'active' : ''
                  }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          <div className="row">
            {/* Sidebar Filters */}
            <div className="col-lg-3 col-md-4 mb-4">
              <div className="card shop-filter-card">
                <div className="card-header shop-filter-card-header">
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

                  {/* Category Filter - only show when viewing all */}
                  {!categorySlug && (
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
                  )}

                  {/* Certification Filter - only for race suits or shop all */}
                  {showCertificationFilter && (
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
                      </select>
                    </div>
                  )}


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
                    className="shop-clear-btn w-100"
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
              <div className="card shop-toolbar-card mb-4">
                <div className="card-body shop-toolbar-body">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <p className="mb-0 shop-product-count">
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
                <div className="row g-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="col-lg-4 col-md-6">
                      <div className="shop-skeleton-card">
                        <div className="shop-skeleton-img" />
                        <div className="shop-skeleton-line" style={{ width: '75%' }} />
                        <div className="shop-skeleton-line" style={{ width: '40%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="shop-empty-state">
                  <h5>No products found</h5>
                  <p>Try adjusting your filters or browse a different category.</p>
                  <Link href="/shop" className="shop-view-all-btn">
                    View All Products
                  </Link>
                </div>
              ) : (
                <>
                  <div className="row g-4">
                    {products.map((product) => (
                      <div key={product.id} className="col-lg-4 col-md-6">
                        <ProductCard1
                          product={product}
                          tooltipDirection="top"
                        />
                      </div>
                    ))}
                  </div>

                  {pagination.totalPages > 1 && (
                    <nav className="mt-5">
                      <ul className="shop-pagination">
                        <li>
                          <button
                            className={`shop-page-btn ${pagination.currentPage === 1 ? 'disabled' : ''}`}
                            onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                            disabled={pagination.currentPage === 1}
                          >
                            ← Prev
                          </button>
                        </li>
                        {[...Array(pagination.totalPages)].map((_, i) => (
                          <li key={i}>
                            <button
                              className={`shop-page-btn ${pagination.currentPage === i + 1 ? 'active' : ''}`}
                              onClick={() => setPagination(prev => ({ ...prev, currentPage: i + 1 }))}
                            >
                              {i + 1}
                            </button>
                          </li>
                        ))}
                        <li>
                          <button
                            className={`shop-page-btn ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}
                            onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                            disabled={pagination.currentPage === pagination.totalPages}
                          >
                            Next →
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

      <Footer3 />
    </>
  );
}
