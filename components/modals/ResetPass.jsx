'use client';

import React, { useState } from "react";

export default function ResetPass() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    // Basic validation
    if (!email) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setEmail('');
        
        // Show success message for 5 seconds then close modal
        setTimeout(async () => {
          const modalElement = document.getElementById('resetPass');
          if (modalElement && typeof window !== 'undefined') {
            try {
              const { Offcanvas } = await import('bootstrap');
              const modal = Offcanvas.getInstance(modalElement);
              if (modal) {
                modal.hide();
              }
            } catch (err) {
              // Fallback: just hide the modal using Bootstrap's data attribute
              const closeBtn = modalElement?.querySelector('[data-bs-dismiss="offcanvas"]');
              if (closeBtn) closeBtn.click();
            }
          }
          setSuccess(false);
        }, 5000);
      } else {
        setError(data.error || 'Failed to send reset email. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Password reset error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="offcanvas offcanvas-end popup-style-1 popup-reset-pass"
      id="resetPass"
    >
      <div className="canvas-wrapper">
        <div className="canvas-header popup-header">
          <span className="title">Reset Your Password</span>
          <button
            className="icon-close icon-close-popup"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="canvas-body popup-inner">
          <form onSubmit={handleSubmit} className="form-login">
            <div className="">
              <p className="text text-sm text-main-2">
                Forgot your password? No worries! Enter your registered email to
                receive a link and securely reset it in just a few steps.
              </p>

              {error && (
                <div className="alert alert-danger mb-3" role="alert">
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success mb-3" role="alert">
                  <strong>Success!</strong> If an account exists with this email, you will receive a password reset link shortly. Please check your inbox and spam folder.
                </div>
              )}

              <fieldset className="email mb_12">
                <input 
                  type="email" 
                  placeholder="Enter Your Email*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading || success}
                />
              </fieldset>
            </div>
            <div className="bot">
              <div className="button-wrap">
                <button
                  className="subscribe-button tf-btn animate-btn bg-dark-2 w-100"
                  type="submit"
                  disabled={loading || success}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Sending...
                    </>
                  ) : success ? (
                    'Email Sent!'
                  ) : (
                    'Reset Password'
                  )}
                </button>
                <button
                  type="button"
                  data-bs-dismiss="offcanvas"
                  className="tf-btn btn-out-line-dark2 w-100"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
