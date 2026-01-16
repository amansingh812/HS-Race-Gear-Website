'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    certification: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [pagination.currentPage, filters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.currentPage,
        limit: 10
      });
      
      if (filters.search) params.append('search', filters.search);
      if (filters.category) params.append('category', filters.category);
      if (filters.status) params.append('status', filters.status);
      if (filters.certification) params.append('certification', filters.certification);
      
      // Remove default status filter to show all products
      params.delete('status');
      if (filters.status) {
        params.append('status', filters.status);
      }
      
      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data.products);
        setPagination(prev => ({
          ...prev,
          totalPages: data.data.pagination.totalPages,
          totalCount: data.data.pagination.totalCount
        }));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories?parent=null');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleToggleStatus = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operation: 'toggleStatus' })
      });
      
      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const handleToggleFeatured = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operation: 'toggleFeatured' })
      });
      
      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error toggling featured:', error);
    }
  };

  const handleDelete = async (productId, productName) => {
    if (!confirm(`Are you sure you want to archive "${productName}"?`)) return;
    
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error archiving product:', error);
    }
  };

  return (
    <div className="admin-products">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 mb-0">Products</h2>
        <Link href="/admin/products/new" className="btn btn-primary">
          <i className="icon-plus me-2" />
          Add New Product
        </Link>
      </div>

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="col-md-2">
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
            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setFilters({ search: '', category: '', status: '', certification: '' });
                  setPagination(prev => ({ ...prev, currentPage: 1 }));
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <div className="d-flex justify-content-center p-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Featured</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-5 text-muted">
                        No products found
                      </td>
                    </tr>
                  ) : (
                    products.map(product => {
                      const totalStock = product.inventory?.reduce((sum, inv) => sum + inv.stock, 0) || 0;
                      return (
                        <tr key={product._id}>
                          <td>
                            <div>
                              <strong>{product.name}</strong>
                              <br />
                              <small className="text-muted">
                                {product.certification} | {product.material}
                              </small>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-light text-dark">
                              {product.category?.name || 'N/A'}
                            </span>
                          </td>
                          <td>
                            <strong>${(product.price / 100).toLocaleString()}</strong>
                            {product.compareAtPrice && (
                              <small className="text-muted text-decoration-line-through d-block">
                                ${(product.compareAtPrice / 100).toLocaleString()}
                              </small>
                            )}
                          </td>
                          <td>
                            <span className={`badge ${totalStock === 0 ? 'bg-danger' : totalStock < 5 ? 'bg-warning' : 'bg-success'}`}>
                              {totalStock} units
                            </span>
                            {product.customFitAvailable && (
                              <small className="d-block text-info">+ Custom Fit</small>
                            )}
                          </td>
                          <td>
                            <button
                              className={`btn btn-sm ${product.status === 'active' ? 'btn-success' : 'btn-secondary'}`}
                              onClick={() => handleToggleStatus(product._id)}
                            >
                              {product.status}
                            </button>
                          </td>
                          <td>
                            <button
                              className={`btn btn-sm ${product.isFeatured ? 'btn-warning' : 'btn-outline-warning'}`}
                              onClick={() => handleToggleFeatured(product._id)}
                            >
                              {product.isFeatured ? '★' : '☆'}
                            </button>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <Link
                                href={`/admin/products/${product._id}`}
                                className="btn btn-outline-primary"
                                title="Edit product details"
                              >
                                <i className="icon-edit" />
                              </Link>
                              <Link
                                href={`/product-detail/${product._id}`}
                                target="_blank"
                                className="btn btn-outline-secondary"
                                title="View as customer"
                              >
                                <i className="icon-eye" />
                              </Link>
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => handleDelete(product._id, product.name)}
                                title="Archive product"
                              >
                                <i className="icon-trash" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="card-footer bg-white">
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                Showing page {pagination.currentPage} of {pagination.totalPages}
              </small>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(pagination.totalPages)].map((_, i) => (
                    <li key={i} className={`page-item ${pagination.currentPage === i + 1 ? 'active' : ''}`}>
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
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
