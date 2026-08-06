"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * Account section navigation.
 *
 * Rebuilt 2026-08-06: the previous version rendered "Log Out" as a
 * <Link href="/"> — it navigated home but never actually cleared the session,
 * so the user stayed signed in. It's now a real button calling logout().
 */

const ICONS = {
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  orders: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  wishlist: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  addresses: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  logout: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
};

const ACCOUNT_LINKS = [
  { href: "/account-page", label: "Dashboard", icon: ICONS.dashboard },
  { href: "/account-orders", label: "My Orders", icon: ICONS.orders },
  { href: "/wish-list", label: "My Wishlist", icon: ICONS.wishlist },
  { href: "/account-addresses", label: "Addresses", icon: ICONS.addresses },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="hs-account-sidebar" aria-label="Account navigation">
      <ul className="hs-account-nav">
        {ACCOUNT_LINKS.map(({ href, label, icon }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={`hs-account-nav-item${isActive ? " active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {icon}
                {label}
              </Link>
            </li>
          );
        })}

        <li aria-hidden="true"><div className="hs-account-nav-divider" /></li>

        <li>
          <button
            type="button"
            onClick={handleLogout}
            className="hs-account-nav-item is-logout"
          >
            {ICONS.logout}
            Log Out
          </button>
        </li>
      </ul>
    </nav>
  );
}
