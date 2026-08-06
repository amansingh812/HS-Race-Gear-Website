"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Sidebar from "./Sidebar";

/**
 * Order history.
 *
 * Rebuilt 2026-08-06 — dark theme, plus a real bug fix:
 * the previous version read `data.orders` from the GET /api/orders response,
 * but that endpoint returns `{ success, data: { orders, pagination } }`.
 * `data.orders` was always undefined, so the list rendered empty even for
 * customers who had placed orders. It now reads `json.data.orders`.
 *
 * Prices are stored in cents throughout the app, so totals are divided by 100.
 */

const STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const formatDate = (value) => {
  if (!value) return "";
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

const formatMoney = (cents) =>
  typeof cents === "number" ? `$${(cents / 100).toFixed(2)}` : "—";

const statusClass = (status) => {
  const s = String(status || "").toLowerCase();
  return STATUSES.includes(s) ? `hs-status hs-status-${s}` : "hs-status";
};

function OrdersContent() {
  const searchParams = useSearchParams();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  // Success banner after checkout redirects here
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      const ref = searchParams.get("orderNumber");
      setNotice(
        ref
          ? `Order ${ref} received. We'll be in touch shortly to confirm the details.`
          : "Order received. We'll be in touch shortly."
      );
      window.history.replaceState({}, "", "/account-orders");
    }
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;

    const fetchOrders = async () => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

      if (!token) {
        if (!cancelled) {
          setError("Please sign in to view your orders.");
          setLoading(false);
        }
        return;
      }

      try {
        const res = await fetch("/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json().catch(() => ({}));

        if (!res.ok || json?.success === false) {
          throw new Error(json?.message || json?.error || "Could not load your orders.");
        }

        if (!cancelled) {
          // Shape: { success, data: { orders, pagination } }
          setOrders(json?.data?.orders || []);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchOrders();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleCancel = async (orderId) => {
    if (!window.confirm("Cancel this order?")) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Your session has expired. Please sign in again.");
      return;
    }

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ operation: "cancel", reason: "Cancelled by customer" }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.success === false) {
        throw new Error(json?.error || json?.message || "Could not cancel the order.");
      }

      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: "cancelled" } : o))
      );
      setNotice("Order cancelled.");
    } catch (err) {
      setError(err.message);
    }
  };

  const canCancel = (status) =>
    ["pending", "confirmed"].includes(String(status || "").toLowerCase());

  return (
    <section className="hs-account">
      <div className="container">
        <div className="hs-account-layout">
          <Sidebar />

          <div className="hs-account-main">
            <div className="hs-account-greeting">
              <h1 className="hs-account-hello">My <span>Orders</span></h1>
              <p className="hs-account-sub">
                Every order you&apos;ve placed with HS Race Gear, newest first.
              </p>
            </div>

            {notice && <div className="hs-alert hs-alert-success">{notice}</div>}
            {error && <div className="hs-alert hs-alert-error">{error}</div>}

            <div className="hs-account-panel">
              <h2 className="hs-account-panel-title">
                Order History{!loading && orders.length > 0 ? ` (${orders.length})` : ""}
              </h2>

              {loading ? (
                <div className="hs-account-loading">
                  <div className="hs-spinner" />
                  <span>Loading your orders…</span>
                </div>
              ) : orders.length === 0 ? (
                <div className="hs-account-empty">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <p>No orders yet.</p>
                  <Link href="/shop" className="hs-btn-primary">
                    Browse the shop
                  </Link>
                </div>
              ) : (
                orders.map((order) => {
                  const isOpen = expandedId === order._id;
                  const items = order.items || [];

                  return (
                    <div key={order._id} className="hs-order-card">
                      <div className="hs-order-head">
                        <div>
                          <p className="hs-order-ref">
                            {order.orderNumber || order._id}
                          </p>
                          <p className="hs-order-date">
                            {formatDate(order.placedAt || order.createdAt)}
                            {items.length > 0 &&
                              ` · ${items.length} item${items.length === 1 ? "" : "s"}`}
                          </p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <span className={statusClass(order.status)}>
                            {order.status || "pending"}
                          </span>
                          <div className="hs-order-total" style={{ marginTop: 6 }}>
                            {formatMoney(order.total ?? order.totalAmount)}
                          </div>
                        </div>
                      </div>

                      {isOpen && items.length > 0 && (
                        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 14px" }}>
                          {items.map((item, i) => (
                            <li
                              key={item._id || i}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 12,
                                padding: "9px 0",
                                borderBottom: "1px solid rgba(255,255,255,0.05)",
                                fontSize: "0.87rem",
                                color: "rgba(255,255,255,0.7)",
                              }}
                            >
                              <span>
                                {item.name || item.title || "Product"}
                                {item.size ? ` · Size ${item.size}` : ""}
                                {item.quantity ? ` · Qty ${item.quantity}` : ""}
                              </span>
                              <span style={{ whiteSpace: "nowrap", color: "#fff" }}>
                                {formatMoney(item.price)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        {items.length > 0 && (
                          <button
                            type="button"
                            className="hs-btn-ghost"
                            onClick={() => setExpandedId(isOpen ? null : order._id)}
                          >
                            {isOpen ? "Hide items" : "View items"}
                          </button>
                        )}
                        {canCancel(order.status) && (
                          <button
                            type="button"
                            className="hs-btn-danger-text"
                            onClick={() => handleCancel(order._id)}
                          >
                            Cancel order
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Orders() {
  return (
    <Suspense
      fallback={
        <section className="hs-account">
          <div className="container">
            <div className="hs-account-loading">
              <div className="hs-spinner" />
              <span>Loading…</span>
            </div>
          </div>
        </section>
      }
    >
      <OrdersContent />
    </Suspense>
  );
}
