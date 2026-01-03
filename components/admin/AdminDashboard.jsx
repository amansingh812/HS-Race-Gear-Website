'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    totalCategories: 0,
    lowStockProducts: 0
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch products
      const productsRes = await fetch('/api/products?limit=100&status=active');
      const productsData = await productsRes.json();
      
      // Fetch all products including inactive
      const allProductsRes = await fetch('/api/products?limit=100&status=');
      const allProductsData = await allProductsRes.json();
      
      // Fetch categories
      const categoriesRes = await fetch('/api/categories');
      const categoriesData = await categoriesRes.json();

      // Calculate low stock (less than 5 total)
      const lowStock = (allProductsData.data?.products || []).filter(p => {
        const totalStock = p.inventory?.reduce((sum, inv) => sum + inv.stock, 0) || 0;
        return totalStock < 5 && totalStock > 0;
      });

      setStats({
        totalProducts: allProductsData.data?.pagination?.totalCount || 0,
        activeProducts: productsData.data?.pagination?.totalCount || 0,
        totalCategories: categoriesData.data?.categories?.length || 0,
        lowStockProducts: lowStock.length
      });

      setRecentProducts((allProductsData.data?.products || []).slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 mb-0">Dashboard</h2>
        <Link href="/admin/products/new" className="btn btn-primary">
          <i className="icon-plus me-2" />
          Add New Product
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">Total Products</p>
                  <h3 className="mb-0">{stats.totalProducts}</h3>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded">
                  <i className="icon-box text-primary fs-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">Active Products</p>
                  <h3 className="mb-0">{stats.activeProducts}</h3>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded">
                  <i className="icon-check text-success fs-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">Categories</p>
                  <h3 className="mb-0">{stats.totalCategories}</h3>
                </div>
                <div className="bg-info bg-opacity-10 p-3 rounded">
                  <i className="icon-folder text-info fs-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">Low Stock</p>
                  <h3 className="mb-0">{stats.lowStockProducts}</h3>
                </div>
                <div className="bg-warning bg-opacity-10 p-3 rounded">
                  <i className="icon-alert text-warning fs-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Products */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Recent Products</h5>
          <Link href="/admin/products" className="btn btn-sm btn-outline-primary">
            View All
          </Link>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.map(product => {
                  const totalStock = product.inventory?.reduce((sum, inv) => sum + inv.stock, 0) || 0;
                  return (
                    <tr key={product._id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div>
                            <strong>{product.name}</strong>
                            <br />
                            <small className="text-muted">{product.certification}</small>
                          </div>
                        </div>
                      </td>
                      <td>${(product.price / 100).toLocaleString()}</td>
                      <td>
                        <span className={`badge ${product.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                          {product.status}
                        </span>
                      </td>
                      <td>
                        <span className={totalStock < 5 ? 'text-danger' : ''}>
                          {totalStock} units
                        </span>
                      </td>
                      <td>
                        <Link href={`/admin/products/${product._id}`} className="btn btn-sm btn-outline-primary">
                          Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
