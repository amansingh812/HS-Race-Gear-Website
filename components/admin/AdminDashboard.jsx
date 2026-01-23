'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    totalCategories: 0,
    lowStockProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
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

      // Fetch customers
      const customersRes = await fetch('/api/customers');
      const customersData = await customersRes.json();

      // Fetch orders
      const ordersRes = await fetch('/api/orders?limit=5');
      const ordersData = await ordersRes.json();

      // Calculate low stock (less than 5 total)
      const lowStock = (allProductsData.data?.products || []).filter(p => {
        const totalStock = p.inventory?.reduce((sum, inv) => sum + inv.stock, 0) || 0;
        return totalStock < 5 && totalStock > 0;
      });

      // Calculate total revenue
      const allOrders = ordersData.data?.orders || [];
      const totalRevenue = allOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

      setStats({
        totalProducts: allProductsData.data?.pagination?.totalCount || 0,
        activeProducts: productsData.data?.pagination?.totalCount || 0,
        totalCategories: categoriesData.data?.categories?.length || 0,
        lowStockProducts: lowStock.length,
        totalCustomers: customersData.data?.total || 0,
        totalOrders: allOrders.length,
        totalRevenue: totalRevenue
      });

      setRecentProducts((allProductsData.data?.products || []).slice(0, 5));
      setRecentOrders(allOrders.slice(0, 5));
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

        <div className="col-md-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">Total Customers</p>
                  <h3 className="mb-0">{stats.totalCustomers}</h3>
                </div>
                <div className="bg-secondary bg-opacity-10 p-3 rounded">
                  <i className="icon-user text-secondary fs-4" />
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
                  <p className="text-muted mb-1">Total Orders</p>
                  <h3 className="mb-0">{stats.totalOrders}</h3>
                </div>
                <div className="bg-info bg-opacity-10 p-3 rounded">
                  <i className="icon-order text-info fs-4" />
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
                  <p className="text-muted mb-1">Total Revenue</p>
                  <h3 className="mb-0">${(stats.totalRevenue / 100).toLocaleString('en-US', { maximumFractionDigits: 0 })}</h3>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded">
                  <i className="icon-dollar text-success fs-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <Link href="/admin/products/new" className="btn btn-primary w-100 py-3">
            <i className="icon-plus me-2"></i> Add New Product
          </Link>
        </div>
        <div className="col-md-3">
          <Link href="/admin/products" className="btn btn-outline-primary w-100 py-3">
            <i className="icon-box me-2"></i> Manage Products
          </Link>
        </div>
        <div className="col-md-3">
          <Link href="/admin/customers" className="btn btn-outline-primary w-100 py-3">
            <i className="icon-user me-2"></i> View Customers
          </Link>
        </div>
        <div className="col-md-3">
          <Link href="/admin/settings" className="btn btn-outline-primary w-100 py-3">
            <i className="icon-settings me-2"></i> Settings
          </Link>
        </div>
      </div>

      {/* Recent Products & Orders */}
      <div className="row g-4">
        {/* Recent Products */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
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
                            <strong>{product.name}</strong>
                          </td>
                          <td>${(product.price / 100).toLocaleString()}</td>
                          <td>
                            <span className={totalStock < 5 ? 'text-danger fw-bold' : ''}>
                              {totalStock}
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

        {/* Recent Orders */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Orders</h5>
              <Link href="/admin/orders" className="btn btn-sm btn-outline-primary">
                View All
              </Link>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.length > 0 ? (
                      recentOrders.map(order => (
                        <tr key={order._id}>
                          <td>
                            <strong>{order._id?.toString().substring(0, 8)}</strong>
                          </td>
                          <td>
                            <small>{order.userId?.name || 'Customer'}</small>
                          </td>
                          <td>${(order.totalAmount / 100).toLocaleString()}</td>
                          <td>
                            <span className={`badge bg-${order.status === 'completed' ? 'success' : order.status === 'pending' ? 'warning' : 'danger'}`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-3 text-muted">
                          No orders yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
