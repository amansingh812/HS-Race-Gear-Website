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
    description: 'Off-the-rack SFI race suits are a practical and professional choice for drivers who need certified protection with immediate availability — available in SFI 3.2A/5 and SFI 3.2A/1 certifications.',
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
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [resolvedCategoryId, setResolvedCategoryId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    setIsPageLoading(true);
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
    if (categorySlug && resolvedCategoryId === null) return;
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
        setIsPageLoading(false);
      }
    } catch (error) {
      console.error('Error resolving category:', error);
      setResolvedCategoryId('not-found');
      setProducts([]);
      setLoading(false);
      setIsPageLoading(false);
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
            saleLabel: p.category?.slug === 'race-suits'
              ? 'SFI Certified'
              : (p.compareAtPrice && p.compareAtPrice > p.price
                ? `${Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100)}% Off`
                : null),
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
        setIsPageLoading(false);
      } else {
        setProducts([]);
        setLoading(false);
        setIsPageLoading(false);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setLoading(false);
      setIsPageLoading(false);
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
      {isPageLoading && (
        <div className="preload preload-container">
          <div className="preload-logo">
            <div className="spinner"></div>
          </div>
        </div>
      )}
      <Topbar1 />
      <Header3 />

      <div className="hs-shop-page">
        {/* Hero / Breadcrumb */}
        <div className="hs-shop-hero">
          <div className="hs-breadcrumb">
            <Link href="/">Home</Link>
            <span className="separator">/</span>
            <Link href="/shop">Shop</Link>
            {activeCategoryConfig && (
              <>
                <span className="separator">/</span>
                <span className="current">{activeCategoryConfig.breadcrumb}</span>
              </>
            )}
          </div>
          <h1>{pageTitle}</h1>
          <p className="hs-hero-desc">{pageDescription}</p>
        </div>

        {/* Category Tabs */}
        <div className="hs-category-bar">
          {ALL_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug || 'all'}
              href={cat.slug ? `/shop?category=${cat.slug}` : '/shop'}
              className={`hs-cat-tab ${categorySlug === cat.slug || (!categorySlug && !cat.slug) ? 'active' : ''}`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Main Content */}
        <div className="hs-shop-content">
          {/* Sidebar Filters */}
          <aside className={`hs-shop-sidebar ${sidebarOpen ? 'open' : ''}`}>
            <div className="hs-filter-panel">
              <div className="hs-filter-header">Filters</div>

              {/* Search */}
              <div className="hs-filter-group">
                <label className="hs-filter-label">Search</label>
                <input
                  type="text"
                  className="hs-filter-input"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>

              {/* Category Filter - only show when viewing all */}
              {!categorySlug && (
                <div className="hs-filter-group">
                  <label className="hs-filter-label">Category</label>
                  <select
                    className="hs-filter-select"
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

              {/* Certification Filter */}
              {showCertificationFilter && (
                <div className="hs-filter-group">
                  <label className="hs-filter-label">Certification</label>
                  <select
                    className="hs-filter-select"
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
              <div className="hs-filter-group">
                <label className="hs-filter-label">Price Range ($)</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="number"
                    className="hs-filter-input"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  />
                  <input
                    type="number"
                    className="hs-filter-input"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  />
                </div>
              </div>

              {/* In Stock */}
              <div className="hs-filter-group">
                <label className="hs-filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                  />
                  <span>In Stock Only</span>
                </label>
              </div>

              {/* Clear Button */}
              <div className="hs-filter-group">
                <button
                  className="hs-clear-btn"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Main Product Area */}
          <div className="hs-shop-main">
            {/* Toolbar */}
            <div className="hs-toolbar">
              <p className="hs-product-count">
                Showing <strong>{products.length}</strong> of <strong>{pagination.totalProducts}</strong> products
              </p>
              <div className="hs-sort-controls">
                <label>Sort by</label>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                >
                  <option value="createdAt">Newest</option>
                  <option value="price">Price</option>
                  <option value="name">Name</option>
                  <option value="salesCount">Popular</option>
                </select>
                <select
                  value={filters.order}
                  onChange={(e) => handleFilterChange('order', e.target.value)}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="hs-product-grid">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="hs-skeleton-card">
                    <div className="hs-skeleton-img" />
                    <div className="hs-skeleton-line" style={{ width: '75%' }} />
                    <div className="hs-skeleton-line" style={{ width: '40%' }} />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="hs-empty-state">
                <h3>No products found</h3>
                <p>Try adjusting your filters or browse a different category.</p>
                <Link href="/shop" className="hs-empty-state-btn">
                  View All Products
                </Link>
              </div>
            ) : (
              <>
                <div className="hs-product-grid">
                  {products.map((product) => (
                    <ProductCard1
                      key={product.id}
                      product={product}
                      tooltipDirection="top"
                    />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <ul className="hs-pagination">
                    <li>
                      <button
                        className={`hs-page-btn ${pagination.currentPage === 1 ? 'disabled' : ''}`}
                        onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                        disabled={pagination.currentPage === 1}
                      >
                        &larr; Prev
                      </button>
                    </li>
                    {[...Array(pagination.totalPages)].map((_, i) => (
                      <li key={i}>
                        <button
                          className={`hs-page-btn ${pagination.currentPage === i + 1 ? 'active' : ''}`}
                          onClick={() => setPagination(prev => ({ ...prev, currentPage: i + 1 }))}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li>
                      <button
                        className={`hs-page-btn ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}
                        onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                        disabled={pagination.currentPage === pagination.totalPages}
                      >
                        Next &rarr;
                      </button>
                    </li>
                  </ul>
                )}
              </>
            )}
          </div>
        </div>

        {/* SEO Content for Race Suits */}
        {categorySlug === 'race-suits' && (
          <section className="shop-seo-section">
            <div className="shop-seo-content">
              <h2 className="shop-seo-heading">Off-the-Rack SFI Race Suits</h2>
              <p className="shop-seo-text">
                Off-the-rack SFI race suits are a practical and professional choice for drivers who need
                certified protection with immediate availability. These suits are designed to meet SFI
                Foundation safety standards, ensuring you&apos;re fully compliant at the track without the
                wait time of a custom order.
              </p>

              <h3 className="shop-seo-subheading">Designed for Performance and Safety</h3>
              <p className="shop-seo-text">
                Every suit in this collection is built with fire-resistant materials and engineered for
                real-world racing conditions. Whether you&apos;re competing in drag racing, circle track,
                road racing, or drifting, these suits deliver certified protection from heat and flame
                exposure.
              </p>
              <ul className="shop-seo-list">
                <li><strong>SFI 3.2A/1 Rated Suits</strong> — Single-layer construction for lighter weight and maximum breathability. Ideal for short-duration events, autocross, and time attack.</li>
                <li><strong>SFI 3.2A/5 Rated Suits</strong> — Multi-layer construction for higher thermal protection. Designed for higher-speed and longer-duration racing where extended fire resistance is required.</li>
              </ul>

              <h3 className="shop-seo-subheading">Built for Racers Who Need Immediate Track-Ready Gear</h3>
              <p className="shop-seo-text">
                Our off-the-rack race suits are pre-manufactured in standard sizing with professional-grade
                construction, giving you the same quality materials and stitching found in custom suits —
                without the lead time. Each suit is shipped with a valid SFI certification tag, so you can
                go directly from delivery to tech inspection.
              </p>

              <h3 className="shop-seo-subheading">Ideal For</h3>
              <ul className="shop-seo-list">
                <li>Drivers who need a certified suit quickly for an upcoming race</li>
                <li>Budget-conscious racers looking for professional-level protection</li>
                <li>Teams needing multiple matching suits with fast turnaround</li>
                <li>Backup suits for experienced racers</li>
                <li>Entry-level competitors getting started in motorsports</li>
              </ul>
            </div>
          </section>
        )}
      </div>

      <Footer3 />
    </>
  );
}
