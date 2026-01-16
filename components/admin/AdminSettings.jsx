'use client';

import React, { useState, useEffect } from 'react';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    storeName: 'HS Race Gear',
    storeEmail: 'info@hsracegear.com',
    storePhone: '+1 (555) 123-4567',
    storeAddress: '123 Racing Lane, Speed City, SC 12345',
    currency: 'USD',
    timezone: 'America/New_York',
    taxRate: 8.5,
    shippingCost: 1000, // in cents
    freeShippingThreshold: 10000, // in cents
    ordersPerPage: 10,
    productsPerPage: 12,
    maintenanceMode: false,
    maintenanceMessage: 'We are currently under maintenance. Please check back soon!',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/settings');
      const data = await response.json();
      
      if (data.success && data.data) {
        setSettings({ ...settings, ...data.data });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: 'Settings saved successfully!' });
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save settings' });
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: 'Error saving settings' });
    } finally {
      setSaving(false);
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
    <div className="admin-settings">
      <div className="mb-4">
        <h2 className="h3 mb-0">Settings</h2>
      </div>

      {/* Message Alert */}
      {message && (
        <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show mb-4`} role="alert">
          {message.text}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage('')}
            aria-label="Close"
          ></button>
        </div>
      )}

      <div className="card border-0 shadow-sm">
        {/* Tabs */}
        <div className="card-header bg-white border-bottom">
          <ul className="nav nav-tabs card-header-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'general' ? 'active' : ''}`}
                onClick={() => setActiveTab('general')}
              >
                General Settings
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'store' ? 'active' : ''}`}
                onClick={() => setActiveTab('store')}
              >
                Store Settings
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'shipping' ? 'active' : ''}`}
                onClick={() => setActiveTab('shipping')}
              >
                Shipping & Tax
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'maintenance' ? 'active' : ''}`}
                onClick={() => setActiveTab('maintenance')}
              >
                Maintenance
              </button>
            </li>
          </ul>
        </div>

        <div className="card-body">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label">Store Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="storeName"
                  value={settings.storeName}
                  onChange={handleInputChange}
                  placeholder="Your Store Name"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Store Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="storeEmail"
                  value={settings.storeEmail}
                  onChange={handleInputChange}
                  placeholder="info@example.com"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Store Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="storePhone"
                  value={settings.storePhone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Currency</label>
                <select
                  className="form-select"
                  name="currency"
                  value={settings.currency}
                  onChange={handleInputChange}
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Timezone</label>
                <select
                  className="form-select"
                  name="timezone"
                  value={settings.timezone}
                  onChange={handleInputChange}
                >
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Products Per Page</label>
                <input
                  type="number"
                  className="form-control"
                  name="productsPerPage"
                  value={settings.productsPerPage}
                  onChange={handleInputChange}
                  min="1"
                />
              </div>
              <div className="col-12">
                <label className="form-label">Store Address</label>
                <textarea
                  className="form-control"
                  name="storeAddress"
                  value={settings.storeAddress}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Your store address"
                ></textarea>
              </div>
            </div>
          )}

          {/* Store Settings */}
          {activeTab === 'store' && (
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label">Store Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="storeEmail"
                  value={settings.storeEmail}
                  onChange={handleInputChange}
                  placeholder="info@example.com"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Store Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="storePhone"
                  value={settings.storePhone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="col-12">
                <label className="form-label">Store Address</label>
                <textarea
                  className="form-control"
                  name="storeAddress"
                  value={settings.storeAddress}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Your store address"
                ></textarea>
              </div>
              <div className="col-md-6">
                <label className="form-label">Orders Per Page</label>
                <input
                  type="number"
                  className="form-control"
                  name="ordersPerPage"
                  value={settings.ordersPerPage}
                  onChange={handleInputChange}
                  min="1"
                />
              </div>
            </div>
          )}

          {/* Shipping & Tax */}
          {activeTab === 'shipping' && (
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label">Tax Rate (%)</label>
                <input
                  type="number"
                  className="form-control"
                  name="taxRate"
                  value={settings.taxRate}
                  onChange={handleInputChange}
                  step="0.1"
                  min="0"
                  placeholder="8.5"
                />
                <small className="text-muted">Applied as percentage to order total</small>
              </div>
              <div className="col-md-6">
                <label className="form-label">Shipping Cost ($)</label>
                <input
                  type="number"
                  className="form-control"
                  name="shippingCost"
                  value={(settings.shippingCost / 100).toFixed(2)}
                  onChange={(e) => handleInputChange({ 
                    target: { name: 'shippingCost', value: Math.round(parseFloat(e.target.value) * 100) }
                  })}
                  step="0.01"
                  min="0"
                  placeholder="10.00"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Free Shipping Threshold ($)</label>
                <input
                  type="number"
                  className="form-control"
                  name="freeShippingThreshold"
                  value={(settings.freeShippingThreshold / 100).toFixed(2)}
                  onChange={(e) => handleInputChange({ 
                    target: { name: 'freeShippingThreshold', value: Math.round(parseFloat(e.target.value) * 100) }
                  })}
                  step="0.01"
                  min="0"
                  placeholder="100.00"
                />
                <small className="text-muted">Orders above this amount get free shipping</small>
              </div>
            </div>
          )}

          {/* Maintenance */}
          {activeTab === 'maintenance' && (
            <div className="row g-4">
              <div className="col-12">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="maintenanceMode"
                    name="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="maintenanceMode">
                    Enable Maintenance Mode
                  </label>
                </div>
                <small className="text-muted d-block mt-2">
                  When enabled, customers will see a maintenance message instead of the store
                </small>
              </div>
              {settings.maintenanceMode && (
                <div className="col-12">
                  <label className="form-label">Maintenance Message</label>
                  <textarea
                    className="form-control"
                    name="maintenanceMessage"
                    value={settings.maintenanceMessage}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Enter maintenance message"
                  ></textarea>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-4">
        <button
          className="btn btn-primary btn-lg"
          onClick={handleSaveSettings}
          disabled={saving}
        >
          {saving ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Saving...
            </>
          ) : (
            'Save Settings'
          )}
        </button>
      </div>
    </div>
  );
}
