"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const POPULAR = [
  { label: "Race Suits",   href: "/shop?category=race-suits" },
  { label: "Karting Suit", href: "/custom-karting-suit" },
  { label: "Hoodie",       href: "/shop?category=hoodies" },
  { label: "T-Shirt",      href: "/shop?category=crew-shirts" },
];

export default function SearchModal() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  // Close the Bootstrap modal and navigate to a URL
  const closeAndNavigate = useCallback((href) => {
    if (typeof window !== "undefined" && window.bootstrap) {
      const modalEl = document.getElementById("search");
      const instance = window.bootstrap.Modal.getInstance(modalEl);
      if (instance) {
        instance.hide();
        // Wait for hide animation then navigate
        modalEl.addEventListener("hidden.bs.modal", () => router.push(href), { once: true });
        return;
      }
    }
    // Fallback: just navigate
    router.push(href);
  }, [router]);

  // Focus input when modal opens
  useEffect(() => {
    const modal = document.getElementById("search");
    if (!modal) return;
    const handler = () => {
      setTimeout(() => inputRef.current?.focus(), 150);
      setQuery("");
      setResults([]);
      setSearched(false);
    };
    modal.addEventListener("shown.bs.modal", handler);
    return () => modal.removeEventListener("shown.bs.modal", handler);
  }, []);

  const doSearch = useCallback(async (term) => {
    if (!term.trim()) {
      setResults([]);
      setSearched(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/products?search=${encodeURIComponent(term)}&limit=8`);
      const data = await res.json();
      if (data.success) {
        setResults(
          data.data.products.map((p) => ({
            id: p._id,
            name: p.name,
            slug: p.slug,
            price: p.price / 100,
            category: p.category?.name || "",
            img: p.images?.find((i) => i.isPrimary)?.url || p.images?.[0]?.url || "/images/logo/logo.png",
          }))
        );
      } else {
        setResults([]);
      }
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(val), 350);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearTimeout(debounceRef.current);
    if (!query.trim()) return;
    // Navigate to shop page filtered by search term
    closeAndNavigate(`/shop?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="modal fade hs-search-modal" id="search" tabIndex={-1} aria-modal="true" role="dialog">
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content hs-search-content">

          {/* Close Button */}
          <button
            className="hs-search-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              zIndex: 9999,
              background: "transparent",
              border: "none",
              color: "#ffffff",
              fontSize: "32px",
              cursor: "pointer",
              padding: 0,
              width: "auto",
              height: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
          >
            ✕
          </button>

          <div className="container">
            <div className="hs-search-inner">

              {/* Search Input */}
              <form className="hs-search-form" onSubmit={handleSubmit}>
                <div className="hs-search-field">
                  <input
                    ref={inputRef}
                    type="text"
                    className="hs-search-input"
                    placeholder="Search race suits, gloves, karting gear..."
                    value={query}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {query && (
                    <button
                      type="button"
                      className="hs-search-clear"
                      onClick={() => { setQuery(""); setResults([]); setSearched(false); inputRef.current?.focus(); }}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </form>

              {/* Popular searches — show when not searching */}
              {!searched && (
                <div className="hs-search-popular">
                  <p className="hs-search-label">Popular Searches</p>
                  <div className="hs-search-tags">
                    {POPULAR.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        className="hs-search-tag"
                        onClick={() => closeAndNavigate(item.href)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Loading */}
              {loading && (
                <div className="hs-search-loading">
                  <div className="hs-search-spinner" />
                  <span>Searching...</span>
                </div>
              )}

              {/* Results */}
              {!loading && searched && (
                <>
                  {results.length > 0 ? (
                    <>
                      <p className="hs-search-label">{results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;</p>
                      <div className="hs-search-results">
                        {results.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => closeAndNavigate(`/shop/${p.slug}`)}
                            className="hs-search-result-item"
                          >
                            <div className="hs-result-img">
                              <Image
                                src={p.img}
                                alt={p.name}
                                width={64}
                                height={64}
                                style={{ objectFit: "contain", width: "100%", height: "100%" }}
                              />
                            </div>
                            <div className="hs-result-info">
                              <span className="hs-result-category">{p.category}</span>
                              <span className="hs-result-name">{p.name}</span>
                              <span className="hs-result-price">${p.price.toFixed(2)}</span>
                            </div>
                            <svg className="hs-result-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        ))}
                      </div>
                      <div className="hs-search-all">
                        <button
                          onClick={() => closeAndNavigate(`/shop?search=${encodeURIComponent(query)}`)}
                          className="hs-search-all-btn"
                        >
                          View all results for &ldquo;{query}&rdquo; →
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="hs-search-empty">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.25, marginBottom: 16 }}>
                        <circle cx="11" cy="11" r="8" stroke="#fff" strokeWidth="1.5" />
                        <path d="M21 21L16.65 16.65" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <p>No results for &ldquo;{query}&rdquo;</p>
                      <span>Try searching for race suits, gloves, or karting gear</span>
                    </div>
                  )}
                </>
              )}

            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hs-search-modal .modal-dialog { margin: 0; max-width: 100%; }

        .hs-search-content {
          background: rgba(8, 8, 8, 0.97);
          backdrop-filter: blur(12px);
          border: none;
          border-radius: 0;
          min-height: 100vh;
          color: #fff;
        }

        .hs-search-close:hover {
          opacity: 0.7;
        }

        .hs-search-inner {
          max-width: 700px;
          margin: 0 auto;
          padding: 80px 0 60px;
        }

        /* Search form */
        .hs-search-form { margin-bottom: 32px; }

        .hs-search-field {
          position: relative;
          display: flex;
          align-items: center;
        }

        .hs-search-icon {
          position: absolute;
          left: 16px;
          flex-shrink: 0;
          pointer-events: none;
        }

        .hs-search-input {
          width: 100%;
          background: rgba(255,255,255,0.06) !important;
          border: 1.5px solid rgba(255,255,255,0.12) !important;
          border-radius: 12px;
          padding: 18px 20px;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          caret-color: #e21b1b;
          font-size: 1.1rem;
          font-weight: 500;
          outline: none !important;
          box-shadow: none !important;
          transition: border-color 0.2s, background 0.2s;
        }
        .hs-search-input:focus {
          border-color: #e21b1b !important;
          background: rgba(226,27,27,0.06) !important;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          box-shadow: none !important;
        }
        .hs-search-input::placeholder {
          color: rgba(255,255,255,0.35) !important;
          -webkit-text-fill-color: rgba(255,255,255,0.35) !important;
        }

        .hs-search-clear {
          position: absolute;
          right: 16px;
          background: none;
          border: none;
          color: rgba(255,255,255,0.4);
          font-size: 14px;
          cursor: pointer;
          padding: 4px 8px;
          transition: color 0.2s;
        }
        .hs-search-clear:hover { color: #e21b1b; }

        /* Labels */
        .hs-search-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: rgba(255,255,255,0.35);
          margin-bottom: 14px;
        }

        /* Popular tags */
        .hs-search-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .hs-search-tag {
          padding: 8px 18px;
          border-radius: 30px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.7);
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s;
        }
        .hs-search-tag:hover {
          background: rgba(226,27,27,0.15);
          border-color: #e21b1b;
          color: #fff;
        }

        /* Loading */
        .hs-search-loading {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255,255,255,0.5);
          font-size: 14px;
          padding: 20px 0;
        }
        .hs-search-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(226,27,27,0.3);
          border-top-color: #e21b1b;
          border-radius: 50%;
          animation: hsSpin 0.7s linear infinite;
        }
        @keyframes hsSpin { to { transform: rotate(360deg); } }

        /* Result items */
        .hs-search-results {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 20px;
        }

        .hs-search-result-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 16px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          text-decoration: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
          transition: background 0.2s, border-color 0.2s;
        }
        .hs-search-result-item:hover {
          background: rgba(226,27,27,0.1);
          border-color: rgba(226,27,27,0.3);
        }
        /* "View all" button same width as a block */
        .hs-search-all-btn {
          display: inline-block;
          padding: 12px 28px;
          border-radius: 8px;
          background: #e21b1b;
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }
        .hs-search-all-btn:hover { background: #c41616; color: #fff; }

        .hs-result-img {
          width: 56px;
          height: 56px;
          border-radius: 8px;
          background: #1a1a1a;
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hs-result-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 0;
        }
        .hs-result-category {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #e21b1b;
        }
        .hs-result-name {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .hs-result-price {
          font-size: 13px;
          font-weight: 700;
          color: rgba(255,255,255,0.5);
        }

        .hs-result-arrow { color: rgba(255,255,255,0.25); flex-shrink: 0; }
        .hs-search-result-item:hover .hs-result-arrow { color: #e21b1b; }

        /* View all */
        .hs-search-all { text-align: center; margin-top: 8px; }

        /* Empty */
        .hs-search-empty {
          text-align: center;
          padding: 40px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .hs-search-empty p {
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 8px;
        }
        .hs-search-empty span {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
        }

        @media (max-width: 575px) {
          .hs-search-inner { padding: 70px 0 40px; }
          .hs-search-input { font-size: 1rem; padding: 15px 44px 15px 44px; }
          .hs-search-close { top: 16px; right: 16px; }
        }
      `}</style>
    </div>
  );
}
