"use client";
import React, { useState, useEffect, Suspense } from "react";
import Sidebar from "./Sidebar";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useContextElement } from "@/context/Context";

function OrdersContent() {
  const searchParams = useSearchParams();
  const { isAuthenticated } = useContextElement();
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successOrderNumber, setSuccessOrderNumber] = useState("");

  // Check for success message from checkout
  useEffect(() => {
    const success = searchParams.get("success");
    const orderNumber = searchParams.get("orderNumber");
    if (success === "true" && orderNumber) {
      setShowSuccess(true);
      setSuccessOrderNumber(orderNumber);
      // Clear the URL params
      window.history.replaceState({}, "", "/account-orders");
    }
  }, [searchParams]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders || []);
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch orders");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "delivered":
        return "text-delivered";
      case "shipped":
        return "text-on-the-way";
      case "processing":
        return "text-processing";
      case "pending":
        return "text-pending";
      case "cancelled":
        return "text-cancelled";
      default:
        return "";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "confirmed":
        return "Confirmed";
      case "processing":
        return "Processing";
      case "shipped":
        return "On the way";
      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
      case "refunded":
        return "Refunded";
      default:
        return status;
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          operation: "cancel",
          reason: "Cancelled by customer",
        }),
      });

      if (response.ok) {
        // Refresh orders
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, status: "cancelled" } : order
        );
        setOrders(updatedOrders);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to cancel order");
      }
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert("Failed to cancel order");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flat-spacing-13">
        <div className="container-7">
          <div className="main-content-account">
            <div className="my-acount-content account-orders">
              <div className="account-no-orders-wrap text-center py-5">
                <div className="display-sm fw-medium title">
                  Please login to view your orders
                </div>
                <Link
                  href="/login"
                  className="tf-btn animate-btn d-inline-flex bg-dark-2 justify-content-center mt-4"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flat-spacing-13">
      <div className="container-7">
        {/* sidebar-account */}
        <div className="btn-sidebar-mb d-lg-none">
          <button data-bs-toggle="offcanvas" data-bs-target="#mbAccount">
            <i className="icon icon-sidebar" />
          </button>
        </div>
        {/* /sidebar-account */}

        {showSuccess && (
          <div className="alert alert-success mb-4">
            <strong>Order Placed Successfully!</strong> Your order #{successOrderNumber} has been placed. 
            You will receive an email confirmation shortly.
            <button
              type="button"
              className="btn-close float-end"
              onClick={() => setShowSuccess(false)}
            ></button>
          </div>
        )}

        <div className="main-content-account">
          <div className="sidebar-account-wrap sidebar-content-wrap sticky-top d-lg-block d-none">
            <ul className="my-account-nav">
              <Sidebar />
            </ul>
          </div>
          <div className="my-acount-content account-orders">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading orders...</p>
              </div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : orders.length === 0 ? (
              <div className="account-no-orders-wrap">
                <Image
                  className="lazyload"
                  data-src="/images/section/account-no-order.png"
                  alt=""
                  src="/images/section/account-no-order.png"
                  width={169}
                  height={168}
                />
                <div className="display-sm fw-medium title">
                  You haven&apos;t placed any order yet
                </div>
                <div className="text text-sm">
                  It&apos;s time to make your first order
                </div>
                <Link
                  href="/shop-default"
                  className="tf-btn animate-btn d-inline-flex bg-dark-2 justify-content-center"
                >
                  Shop Now
                </Link>
              </div>
            ) : (
              <div className="account-orders-wrap">
                <h5 className="title">Order History</h5>
                <div className="wrap-account-order">
                  <table>
                    <thead>
                      <tr>
                        <th className="text-md fw-medium">Order #</th>
                        <th className="text-md fw-medium">Date</th>
                        <th className="text-md fw-medium">Status</th>
                        <th className="text-md fw-medium">Total</th>
                        <th className="text-md fw-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id} className="tf-order-item">
                          <td className="text-md">{order.orderNumber}</td>
                          <td className="text-md">{formatDate(order.createdAt)}</td>
                          <td className={`text-md ${getStatusClass(order.status)}`}>
                            {getStatusLabel(order.status)}
                          </td>
                          <td className="text-md">
                            ${order.totals?.grandTotal?.toFixed(2) || "0.00"} / {order.items?.length || 0} items
                          </td>
                          <td>
                            <a
                              href="#order_detail"
                              data-bs-toggle="modal"
                              className="view-detail me-2"
                              onClick={() => setSelectedOrder(order)}
                            >
                              Detail
                            </a>
                            {["pending", "confirmed"].includes(order.status) && (
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleCancelOrder(order._id)}
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Order Detail Modal */}
      <div className="modal fade" id="order_detail" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Order Details {selectedOrder && `- ${selectedOrder.orderNumber}`}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {selectedOrder && (
                <>
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h6>Order Information</h6>
                      <p className="mb-1">
                        <strong>Order #:</strong> {selectedOrder.orderNumber}
                      </p>
                      <p className="mb-1">
                        <strong>Date:</strong> {formatDate(selectedOrder.createdAt)}
                      </p>
                      <p className="mb-1">
                        <strong>Status:</strong>{" "}
                        <span className={getStatusClass(selectedOrder.status)}>
                          {getStatusLabel(selectedOrder.status)}
                        </span>
                      </p>
                      <p className="mb-1">
                        <strong>Payment:</strong> {selectedOrder.payment?.method?.toUpperCase() || "N/A"}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <h6>Shipping Address</h6>
                      {selectedOrder.shippingAddress && (
                        <>
                          <p className="mb-1">
                            {selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}
                          </p>
                          <p className="mb-1">{selectedOrder.shippingAddress.address1}</p>
                          {selectedOrder.shippingAddress.address2 && (
                            <p className="mb-1">{selectedOrder.shippingAddress.address2}</p>
                          )}
                          <p className="mb-1">
                            {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}{" "}
                            {selectedOrder.shippingAddress.postalCode}
                          </p>
                          <p className="mb-1">{selectedOrder.shippingAddress.country}</p>
                        </>
                      )}
                    </div>
                  </div>

                  {selectedOrder.tracking?.trackingNumber && (
                    <div className="mb-4">
                      <h6>Tracking Information</h6>
                      <p>
                        <strong>Carrier:</strong> {selectedOrder.tracking.carrier || "N/A"}
                      </p>
                      <p>
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
                    </div>
                  )}

                  <h6>Order Items</h6>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Size</th>
                          <th>Qty</th>
                          <th>Price</th>
                          <th>Total</th>
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
                                    width={50}
                                    height={65}
                                    className="me-2"
                                  />
                                )}
                                <div>
                                  <p className="mb-0">{item.productSnapshot?.title || "Product"}</p>
                                  {item.isCustomFit && (
                                    <small className="text-muted">Custom Fit</small>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td>{item.size || "Standard"}</td>
                            <td>{item.quantity}</td>
                            <td>${item.pricing?.unitPrice?.toFixed(2) || "0.00"}</td>
                            <td>${item.pricing?.lineTotal?.toFixed(2) || "0.00"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="row justify-content-end">
                    <div className="col-md-4">
                      <table className="table table-sm">
                        <tbody>
                          <tr>
                            <td>Subtotal:</td>
                            <td className="text-end">${selectedOrder.totals?.subtotal?.toFixed(2) || "0.00"}</td>
                          </tr>
                          <tr>
                            <td>Shipping:</td>
                            <td className="text-end">${selectedOrder.totals?.shipping?.toFixed(2) || "0.00"}</td>
                          </tr>
                          <tr>
                            <td>Tax:</td>
                            <td className="text-end">${selectedOrder.totals?.tax?.toFixed(2) || "0.00"}</td>
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
                            <td>Total:</td>
                            <td className="text-end">
                              ${selectedOrder.totals?.grandTotal?.toFixed(2) || "0.00"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Orders() {
  return (
    <Suspense fallback={
      <div className="flat-spacing-13">
        <div className="container-7">
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    }>
      <OrdersContent />
    </Suspense>
  );
}
