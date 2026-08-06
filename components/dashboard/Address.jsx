"use client";

import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "./Sidebar";

/**
 * Saved delivery addresses.
 *
 * Rebuilt 2026-08-06. The previous version held two hardcoded example
 * addresses in local useState ("HS Race Gear Pham, 16 Yarran st, Punchbowl,
 * Australia") and never called the API, so nothing a customer entered was
 * ever saved — it vanished on refresh, and the fake Australian addresses
 * showed to every logged-in user.
 *
 * Now backed by the real endpoints:
 *   GET    /api/profile                  -> user, including addresses
 *   POST   /api/profile/addresses        -> add
 *   PUT    /api/profile/addresses/[id]   -> update
 *   DELETE /api/profile/addresses/[id]   -> remove
 *
 * All are wrapped in requireAuth, so every call needs the Bearer token.
 */

const EMPTY_FORM = {
  street: "",
  city: "",
  state: "",
  zipCode: "",
  country: "United States",
  isDefault: false,
};

const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

export default function Address() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  // ── Load ──────────────────────────────────────────────────────────────
  const loadAddresses = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setError("Please sign in to manage your addresses.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Could not load your addresses.");

      const json = await res.json();
      setAddresses(json?.data?.user?.addresses || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  // Clear the success message after a few seconds
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(t);
  }, [notice]);

  // ── Form helpers ──────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const openAddForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
    setError(null);
  };

  const openEditForm = (addr) => {
    setForm({
      street: addr.street || "",
      city: addr.city || "",
      state: addr.state || "",
      zipCode: addr.zipCode || "",
      country: addr.country || "United States",
      isDefault: !!addr.isDefault,
    });
    setEditingId(addr._id);
    setShowForm(true);
    setError(null);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  // ── Save (create or update) ───────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const [field, label] of [
      ["street", "Street address"],
      ["city", "City"],
      ["state", "State"],
      ["zipCode", "ZIP code"],
      ["country", "Country"],
    ]) {
      if (!form[field].trim()) {
        setError(`${label} is required.`);
        return;
      }
    }

    const token = getToken();
    if (!token) {
      setError("Your session has expired. Please sign in again.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const res = await fetch(
        editingId ? `/api/profile/addresses/${editingId}` : "/api/profile/addresses",
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // `type` is required by the address subschema in models/User.js.
          body: JSON.stringify({ ...form, type: "shipping" }),
        }
      );

      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.success === false) {
        throw new Error(json?.error || "Could not save the address.");
      }

      // The API returns the full updated list — use it rather than re-fetching.
      if (json?.data?.addresses) {
        setAddresses(json.data.addresses);
      } else {
        await loadAddresses();
      }

      setNotice(editingId ? "Address updated." : "Address added.");
      closeForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Remove this address?")) return;

    const token = getToken();
    if (!token) {
      setError("Your session has expired. Please sign in again.");
      return;
    }

    try {
      const res = await fetch(`/api/profile/addresses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || json?.success === false) {
        throw new Error(json?.error || "Could not remove the address.");
      }

      if (json?.data?.addresses) {
        setAddresses(json.data.addresses);
      } else {
        setAddresses((prev) => prev.filter((a) => a._id !== id));
      }
      setNotice("Address removed.");
    } catch (err) {
      setError(err.message);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <section className="hs-account">
      <div className="container">
        <div className="hs-account-layout">
          <Sidebar />

          <div className="hs-account-main">
            <div className="hs-account-greeting">
              <h1 className="hs-account-hello">Delivery <span>Addresses</span></h1>
              <p className="hs-account-sub">
                Saved addresses are offered at checkout so you don&apos;t have to
                retype them.
              </p>
            </div>

            {error && <div className="hs-alert hs-alert-error">{error}</div>}
            {notice && <div className="hs-alert hs-alert-success">{notice}</div>}

            {/* Add / edit form */}
            {showForm && (
              <div className="hs-account-panel">
                <h2 className="hs-account-panel-title">
                  {editingId ? "Edit Address" : "Add a New Address"}
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="hs-form-grid">
                    <div className="hs-field is-full">
                      <label htmlFor="street">Street Address</label>
                      <input
                        id="street" name="street" type="text"
                        value={form.street} onChange={handleChange}
                        placeholder="59 Kondazian St" autoComplete="street-address"
                      />
                    </div>
                    <div className="hs-field">
                      <label htmlFor="city">City</label>
                      <input
                        id="city" name="city" type="text"
                        value={form.city} onChange={handleChange}
                        placeholder="Watertown" autoComplete="address-level2"
                      />
                    </div>
                    <div className="hs-field">
                      <label htmlFor="state">State / Region</label>
                      <input
                        id="state" name="state" type="text"
                        value={form.state} onChange={handleChange}
                        placeholder="MA" autoComplete="address-level1"
                      />
                    </div>
                    <div className="hs-field">
                      <label htmlFor="zipCode">ZIP / Postal Code</label>
                      <input
                        id="zipCode" name="zipCode" type="text"
                        value={form.zipCode} onChange={handleChange}
                        placeholder="02472" autoComplete="postal-code"
                      />
                    </div>
                    <div className="hs-field">
                      <label htmlFor="country">Country</label>
                      <input
                        id="country" name="country" type="text"
                        value={form.country} onChange={handleChange}
                        placeholder="United States" autoComplete="country-name"
                      />
                    </div>
                  </div>

                  <div className="hs-checkbox-row">
                    <input
                      id="isDefault" name="isDefault" type="checkbox"
                      checked={form.isDefault} onChange={handleChange}
                    />
                    <label htmlFor="isDefault">Use as my default address</label>
                  </div>

                  <div className="hs-form-actions">
                    <button type="submit" className="hs-btn-primary" disabled={saving}>
                      {saving ? "Saving…" : editingId ? "Save changes" : "Add address"}
                    </button>
                    <button type="button" className="hs-btn-ghost" onClick={closeForm}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List */}
            <div className="hs-account-panel">
              <h2 className="hs-account-panel-title">
                Saved Addresses{!loading && addresses.length > 0 ? ` (${addresses.length})` : ""}
              </h2>

              {loading ? (
                <div className="hs-account-loading">
                  <div className="hs-spinner" />
                  <span>Loading your addresses…</span>
                </div>
              ) : addresses.length === 0 ? (
                <div className="hs-account-empty">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <p>You haven&apos;t saved any addresses yet.</p>
                  {!showForm && (
                    <button type="button" className="hs-btn-primary" onClick={openAddForm}>
                      Add your first address
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className="hs-address-grid">
                    {addresses.map((addr) => (
                      <div
                        key={addr._id}
                        className={`hs-address-card${addr.isDefault ? " is-default" : ""}`}
                      >
                        {addr.isDefault && <span className="hs-address-badge">Default</span>}
                        <p className="hs-address-name">{addr.street}</p>
                        <p className="hs-address-lines">
                          {addr.city}
                          {addr.state ? `, ${addr.state}` : ""} {addr.zipCode}
                          <br />
                          {addr.country}
                        </p>
                        <div className="hs-address-actions">
                          <button
                            type="button"
                            className="hs-btn-danger-text"
                            style={{ color: "rgba(255,255,255,0.7)" }}
                            onClick={() => openEditForm(addr)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="hs-btn-danger-text"
                            onClick={() => handleDelete(addr._id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {!showForm && (
                    <div style={{ marginTop: 20 }}>
                      <button type="button" className="hs-btn-primary" onClick={openAddForm}>
                        Add another address
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
