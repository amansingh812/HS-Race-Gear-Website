"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useContextElement } from "@/context/Context";
import Sidebar from "./Sidebar";

/**
 * Account dashboard.
 *
 * Rebuilt 2026-08-06. The template version it replaces was placeholder
 * content throughout:
 *   - order and wishlist counts were both hardcoded to "1"
 *   - three "your last orders / your wishlist / our latest offers" links
 *     pointed at href="#"
 *   - a "SUMMER SALE 50% OFF — PROMOTE CODE: 12D34E" banner advertised a
 *     promotion that doesn't exist
 *   - a "Free Shipping for all orders over $300.00" banner contradicted the
 *     actual policy (free shipping on all custom orders, no threshold)
 *   - shop buttons linked to /shop-default, a deleted template route
 *
 * Counts now come from the real sources: /api/orders for orders, and the
 * cart/wishlist context for the wishlist. Promos reflect real offers.
 */
export default function Account() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { wishList } = useContextElement();

  const [orderCount, setOrderCount] = useState(null); // null = still loading
  const [recentOrder, setRecentOrder] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadOrders = async () => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
      if (!token) {
        if (!cancelled) setOrderCount(0);
        return;
      }

      try {
        const res = await fetch("/api/orders?limit=1", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`orders request failed: ${res.status}`);

        const json = await res.json();
        // GET /api/orders -> { success, data: { orders, pagination } }
        const data = json?.data || {};
        if (cancelled) return;
        setOrderCount(data.pagination?.totalOrders ?? data.orders?.length ?? 0);
        setRecentOrder(data.orders?.[0] || null);
      } catch (err) {
        console.error("[account] could not load orders:", err.message);
        if (!cancelled) setOrderCount(0);
      }
    };

    loadOrders();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const firstName = (user?.name || "").trim().split(" ")[0] || "Racer";
  const wishlistCount = wishList?.length ?? 0;

  return (
    <section className="hs-account">
      <div className="container">
        <div className="hs-account-layout">
          <Sidebar />

          <div className="hs-account-main">
            {/* Greeting */}
            <div className="hs-account-greeting">
              <h1 className="hs-account-hello">
                Hello, <span>{firstName}</span>
              </h1>
              <p className="hs-account-sub">
                Not {firstName}?{" "}
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    font: "inherit",
                    color: "#ff4d4d",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Log out
                </button>
                . From here you can track your{" "}
                <Link href="/account-orders">orders</Link>, review your{" "}
                <Link href="/wish-list">wishlist</Link>, and manage your{" "}
                <Link href="/account-addresses">delivery addresses</Link>.
              </p>
            </div>

            {/* Stats — real counts, not placeholders */}
            <div className="hs-account-stats">
              <Link href="/account-orders" className="hs-stat-card">
                <div className="hs-stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>
                <div>
                  <div className="hs-stat-value">
                    {orderCount === null ? "—" : orderCount}
                  </div>
                  <div className="hs-stat-label">
                    {orderCount === 1 ? "Order" : "Orders"}
                  </div>
                </div>
              </Link>

              <Link href="/wish-list" className="hs-stat-card">
                <div className="hs-stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <div>
                  <div className="hs-stat-value">{wishlistCount}</div>
                  <div className="hs-stat-label">
                    {wishlistCount === 1 ? "Saved item" : "Saved items"}
                  </div>
                </div>
              </Link>

              <Link href="/account-addresses" className="hs-stat-card">
                <div className="hs-stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="hs-stat-value">
                    {user?.addresses?.length ?? 0}
                  </div>
                  <div className="hs-stat-label">Addresses</div>
                </div>
              </Link>
            </div>

            {/* Most recent order, when there is one */}
            {recentOrder && (
              <div className="hs-account-panel">
                <h2 className="hs-account-panel-title">Most Recent Order</h2>
                <div className="hs-order-card" style={{ marginBottom: 0 }}>
                  <div className="hs-order-head">
                    <div>
                      <p className="hs-order-ref">
                        {recentOrder.orderNumber || recentOrder._id}
                      </p>
                      <p className="hs-order-date">
                        {recentOrder.placedAt
                          ? new Date(recentOrder.placedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : ""}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      {recentOrder.status && (
                        <span className={`hs-status hs-status-${String(recentOrder.status).toLowerCase()}`}>
                          {recentOrder.status}
                        </span>
                      )}
                      {typeof recentOrder.total === "number" && (
                        <div className="hs-order-total" style={{ marginTop: 6 }}>
                          ${(recentOrder.total / 100).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                  <Link href="/account-orders" className="hs-btn-ghost">
                    View all orders
                  </Link>
                </div>
              </div>
            )}

            {/* No orders yet */}
            {orderCount === 0 && (
              <div className="hs-account-panel">
                <h2 className="hs-account-panel-title">Your Orders</h2>
                <div className="hs-account-empty">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <p>You haven&apos;t placed an order yet.</p>
                  <Link href="/shop" className="hs-btn-primary">
                    Browse the shop
                  </Link>
                </div>
              </div>
            )}

            {/* Real offers — see the header comment for what these replaced */}
            <div className="hs-account-promo">
              <div>
                <p className="hs-promo-eyebrow">Off the rack</p>
                <p className="hs-promo-title">SFI-certified suits from $329</p>
                <p className="hs-promo-text">
                  Currently 45% off the regular $599 — ready to ship, no wait.
                </p>
              </div>
              <Link href="/shop?category=race-suits" className="hs-promo-btn">
                Shop suits
              </Link>
            </div>

            <div className="hs-account-promo">
              <div>
                <p className="hs-promo-eyebrow">Built to your measurements</p>
                <p className="hs-promo-title">Custom suits with free shipping</p>
                <p className="hs-promo-text">
                  Unlimited design revisions, 2–3 week production, made in the USA.
                </p>
              </div>
              <Link href="/custom-race-suit" className="hs-promo-btn">
                Start designing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
