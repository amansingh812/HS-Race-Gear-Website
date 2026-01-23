'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="admin-layout">
      {/* Admin Header */}
      <header className="admin-header bg-dark text-white py-3">
        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <h1 className="h4 mb-0">HS Race Gear Admin</h1>
            </div>
            <div className="d-flex align-items-center gap-3">
              <span className="text-light">Welcome, {user?.name}</span>
              <Link href="/" className="btn btn-outline-light btn-sm">
                View Store
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="admin-body d-flex">
        {/* Sidebar */}
        <aside className="admin-sidebar bg-dark-2" style={{ width: '250px', minHeight: 'calc(100vh - 60px)' }}>
          <nav className="admin-nav p-3">
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link href="/admin" className="nav-link text-white d-flex align-items-center gap-2">
                  <i className="icon-dashboard" />
                  Dashboard
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link href="/admin/products" className="nav-link text-white d-flex align-items-center gap-2">
                  <i className="icon-box" />
                  Products
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link href="/admin/categories" className="nav-link text-white d-flex align-items-center gap-2">
                  <i className="icon-folder" />
                  Categories
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link href="/admin/orders" className="nav-link text-white d-flex align-items-center gap-2">
                  <i className="icon-order" />
                  Orders
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link href="/admin/customers" className="nav-link text-white d-flex align-items-center gap-2">
                  <i className="icon-user" />
                  Customers
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link href="/admin/settings" className="nav-link text-white d-flex align-items-center gap-2">
                  <i className="icon-settings" />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="admin-content flex-grow-1 p-4 bg-light">
          {children}
        </main>
      </div>

      <style jsx>{`
        .admin-layout {
          min-height: 100vh;
        }
        .bg-dark-2 {
          background-color: #1a1a2e;
        }
        .admin-nav .nav-link:hover {
          background-color: rgba(255,255,255,0.1);
          border-radius: 4px;
        }
        .admin-nav .nav-link.active {
          background-color: var(--bs-primary);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
