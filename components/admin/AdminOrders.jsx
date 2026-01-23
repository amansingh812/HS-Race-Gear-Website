'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [updating, setUpdating] = useState(false);

  // Fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      let url = '/api/admin/orders?limit=50';
      if (statusFilter !== 'all') {
        url += `&status=${statusFilter}`;
      }
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.data?.orders || []);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch orders');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, searchQuery]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning text-dark';
      case 'confirmed':
        return 'bg-info text-white';
      case 'processing':
        return 'bg-primary text-white';
      case 'shipped':
        return 'bg-info text-white';
      case 'delivered':
        return 'bg-success text-white';
      case 'cancelled':
        return 'bg-danger text-white';
      case 'refunded':
        return 'bg-secondary text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdating(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          operation: 'updateStatus',
          status: newStatus,
          note: `Status updated to ${newStatus} by admin`,
        }),
      });

      if (response.ok) {
        // Update local state
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleAddTracking = async (orderId, trackingData) => {
    setUpdating(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          operation: 'addTracking',
          ...trackingData,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update local state
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? data.order : order
          )
        );
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder(data.order);
        }
        alert('Tracking information added successfully');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to add tracking');
      }
    } catch (err) {
      console.error('Error adding tracking:', err);
      alert('Failed to add tracking');
    } finally {
      setUpdating(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      order.orderNumber?.toLowerCase().includes(query) ||
      order.shippingAddress?.firstName?.toLowerCase().includes(query) ||
      order.shippingAddress?.lastName?.toLowerCase().includes(query) ||
      order.contactEmail?.toLowerCase().includes(query)
    );
  });

  const statuses = [
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'refunded',
  ];

  return (
    <div className="admin-orders">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Order Management</h2>
        <button className="btn btn-outline-primary" onClick={fetchOrders}>
          <i className="icon-refresh me-2" />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Search Orders</label>
              <input
                type="text"
                className="form-control"
                placeholder="Order #, customer name, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Status Filter</label>
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Orders</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger mb-4">{error}</div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading orders...</p>
        </div>
      ) : (
        <div className="card">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Order #</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        No orders found
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order._id}>
                        <td className="fw-medium">{order.orderNumber}</td>
                        <td>{formatDate(order.createdAt)}</td>
                        <td>
                          <div>
                            {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                          </div>
                          <small className="text-muted">{order.contactEmail}</small>
                        </td>
                        <td>{order.items?.length || 0} items</td>
                        <td>${order.totals?.grandTotal?.toFixed(2) || '0.00'}</td>
                        <td>
                          <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                            {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => setSelectedOrder(order)}
                              data-bs-toggle="modal"
                              data-bs-target="#orderDetailModal"
                            >
                              View
                            </button>
                            <div className="btn-group btn-group-sm">
                              <button
                                type="button"
                                className="btn btn-outline-secondary dropdown-toggle"
                                data-bs-toggle="dropdown"
                                disabled={updating}
                              >
                                Status
                              </button>
                              <ul className="dropdown-menu">
                                {statuses.map((status) => (
                                  <li key={status}>
                                    <button
                                      className={`dropdown-item ${order.status === status ? 'active' : ''}`}
                                      onClick={() => handleStatusUpdate(order._id, status)}
                                    >
                                      {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      <div className="modal fade" id="orderDetailModal" tabIndex="-1">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Order Details - {selectedOrder?.orderNumber}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {selectedOrder && (
                <div className="row">
                  {/* Order Info */}
                  <div className="col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-header">
                        <h6 className="mb-0">Order Information</h6>
                      </div>
                      <div className="card-body">
                        <p className="mb-2">
                          <strong>Order #:</strong> {selectedOrder.orderNumber}
                        </p>
                        <p className="mb-2">
                          <strong>Date:</strong> {formatDate(selectedOrder.createdAt)}
                        </p>
                        <p className="mb-2">
                          <strong>Status:</strong>{' '}
                          <span className={`badge ${getStatusBadgeClass(selectedOrder.status)}`}>
                            {selectedOrder.status?.charAt(0).toUpperCase() + selectedOrder.status?.slice(1)}
                          </span>
                        </p>
                        <p className="mb-2">
                          <strong>Payment Method:</strong>{' '}
                          {selectedOrder.payment?.method?.toUpperCase() || 'N/A'}
                        </p>
                        <p className="mb-0">
                          <strong>Payment Status:</strong>{' '}
                          <span className={`badge ${selectedOrder.payment?.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>
                            {selectedOrder.payment?.status || 'Pending'}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-header">
                        <h6 className="mb-0">Customer & Shipping</h6>
                      </div>
                      <div className="card-body">
                        <p className="mb-2">
                          <strong>Name:</strong>{' '}
                          {selectedOrder.shippingAddress?.firstName} {selectedOrder.shippingAddress?.lastName}
                        </p>
                        <p className="mb-2">
                          <strong>Email:</strong> {selectedOrder.contactEmail}
                        </p>
                        <p className="mb-2">
                          <strong>Phone:</strong> {selectedOrder.contactPhone || selectedOrder.shippingAddress?.phone || 'N/A'}
                        </p>
                        <p className="mb-0">
                          <strong>Address:</strong><br />
                          {selectedOrder.shippingAddress?.address1}<br />
                          {selectedOrder.shippingAddress?.address2 && (
                            <>{selectedOrder.shippingAddress.address2}<br /></>
                          )}
                          {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state}{' '}
                          {selectedOrder.shippingAddress?.postalCode}<br />
                          {selectedOrder.shippingAddress?.country}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tracking Info */}
                  <div className="col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">Tracking Information</h6>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          data-bs-toggle="collapse"
                          data-bs-target="#trackingForm"
                        >
                          {selectedOrder.tracking?.trackingNumber ? 'Update' : 'Add'} Tracking
                        </button>
                      </div>
                      <div className="card-body">
                        {selectedOrder.tracking?.trackingNumber ? (
                          <>
                            <p className="mb-2">
                              <strong>Carrier:</strong> {selectedOrder.tracking.carrier || 'N/A'}
                            </p>
                            <p className="mb-2">
                              <strong>Tracking #:</strong> {selectedOrder.tracking.trackingNumber}
                            </p>
                            {selectedOrder.tracking.trackingUrl && (
                              <a
                                href={selectedOrder.tracking.trackingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-outline-primary"
                              >
                                Track Package
                              </a>
                            )}
                          </>
                        ) : (
                          <p className="text-muted mb-0">No tracking information added</p>
                        )}

                        <div className="collapse mt-3" id="trackingForm">
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              const formData = new FormData(e.target);
                              handleAddTracking(selectedOrder._id, {
                                carrier: formData.get('carrier'),
                                trackingNumber: formData.get('trackingNumber'),
                                trackingUrl: formData.get('trackingUrl'),
                              });
                            }}
                          >
                            <div className="mb-2">
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                name="carrier"
                                placeholder="Carrier (e.g., UPS, FedEx)"
                                defaultValue={selectedOrder.tracking?.carrier || ''}
                                required
                              />
                            </div>
                            <div className="mb-2">
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                name="trackingNumber"
                                placeholder="Tracking Number"
                                defaultValue={selectedOrder.tracking?.trackingNumber || ''}
                                required
                              />
                            </div>
                            <div className="mb-2">
                              <input
                                type="url"
                                className="form-control form-control-sm"
                                name="trackingUrl"
                                placeholder="Tracking URL (optional)"
                                defaultValue={selectedOrder.tracking?.trackingUrl || ''}
                              />
                            </div>
                            <button
                              type="submit"
                              className="btn btn-sm btn-primary"
                              disabled={updating}
                            >
                              {updating ? 'Saving...' : 'Save Tracking'}
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Totals */}
                  <div className="col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-header">
                        <h6 className="mb-0">Order Totals</h6>
                      </div>
                      <div className="card-body">
                        <table className="table table-sm mb-0">
                          <tbody>
                            <tr>
                              <td>Subtotal:</td>
                              <td className="text-end">${selectedOrder.totals?.subtotal?.toFixed(2) || '0.00'}</td>
                            </tr>
                            <tr>
                              <td>Shipping:</td>
                              <td className="text-end">${selectedOrder.totals?.shipping?.toFixed(2) || '0.00'}</td>
                            </tr>
                            <tr>
                              <td>Tax:</td>
                              <td className="text-end">${selectedOrder.totals?.tax?.toFixed(2) || '0.00'}</td>
                            </tr>
                            {selectedOrder.totals?.discount > 0 && (
                              <tr>
                                <td>Discount:</td>
                                <td className="text-end text-danger">
                                  -${selectedOrder.totals.discount.toFixed(2)}
                                </td>
                              </tr>
                            )}
                            <tr className="fw-bold">
                              <td>Grand Total:</td>
                              <td className="text-end">${selectedOrder.totals?.grandTotal?.toFixed(2) || '0.00'}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h6 className="mb-0">Order Items</h6>
                      </div>
                      <div className="card-body p-0">
                        <div className="table-responsive">
                          <table className="table table-sm mb-0">
                            <thead className="table-light">
                              <tr>
                                <th>Product</th>
                                <th>SKU</th>
                                <th>Size</th>
                                <th>Custom Fit</th>
                                <th className="text-end">Price</th>
                                <th className="text-center">Qty</th>
                                <th className="text-end">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedOrder.items?.map((item, idx) => (
                                <tr key={idx}>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      {item.productSnapshot?.imgSrc && (
                                        <Image
                                          src={item.productSnapshot.imgSrc}
                                          alt={item.productSnapshot.title}
                                          width={40}
                                          height={50}
                                          className="me-2"
                                        />
                                      )}
                                      <div>
                                        <span className="fw-medium">{item.productSnapshot?.title || 'Product'}</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>{item.productSnapshot?.sku || 'N/A'}</td>
                                  <td>{item.size || 'Standard'}</td>
                                  <td>
                                    {item.isCustomFit ? (
                                      <span className="badge bg-info">Yes</span>
                                    ) : (
                                      <span className="text-muted">No</span>
                                    )}
                                  </td>
                                  <td className="text-end">${item.pricing?.unitPrice?.toFixed(2) || '0.00'}</td>
                                  <td className="text-center">{item.quantity}</td>
                                  <td className="text-end">${item.pricing?.lineTotal?.toFixed(2) || '0.00'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status History */}
                  {selectedOrder.statusHistory?.length > 0 && (
                    <div className="col-12 mt-4">
                      <div className="card">
                        <div className="card-header">
                          <h6 className="mb-0">Status History</h6>
                        </div>
                        <div className="card-body">
                          <div className="timeline">
                            {selectedOrder.statusHistory.map((history, idx) => (
                              <div key={idx} className="d-flex mb-3">
                                <div className="me-3">
                                  <span className={`badge ${getStatusBadgeClass(history.status)}`}>
                                    {history.status?.charAt(0).toUpperCase() + history.status?.slice(1)}
                                  </span>
                                </div>
                                <div>
                                  <small className="text-muted">
                                    {formatDate(history.timestamp)}
                                  </small>
                                  {history.note && (
                                    <p className="mb-0 small">{history.note}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Order Notes */}
                  {selectedOrder.orderNotes && (
                    <div className="col-12 mt-4">
                      <div className="card">
                        <div className="card-header">
                          <h6 className="mb-0">Order Notes</h6>
                        </div>
                        <div className="card-body">
                          <p className="mb-0">{selectedOrder.orderNotes}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <div className="d-flex gap-2">
                <div className="dropdown">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    disabled={updating}
                  >
                    Update Status
                  </button>
                  <ul className="dropdown-menu">
                    {statuses.map((status) => (
                      <li key={status}>
                        <button
                          className={`dropdown-item ${selectedOrder?.status === status ? 'active' : ''}`}
                          onClick={() => handleStatusUpdate(selectedOrder._id, status)}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
