"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";

/**
 * Multi-file logo upload — shared by all five custom order pages
 * (race suit, karting, powerboat, gloves, shoes).
 *
 * Changed 2026-09-23 from single-file to multi-file. Racers routinely carry
 * several sponsor logos plus a team mark, and the old single-slot control
 * forced them to either pick one or email the rest separately — which meant
 * the design team chased assets by hand on most custom leads.
 *
 * Contract change: `onUploadSuccess` now receives an ARRAY of blob URLs
 * (empty array when nothing is uploaded) rather than a single URL string or
 * null. Each order page stores that array and sends BOTH `customLogoUrls`
 * (the full list) and `customLogoUrl` (the first entry) so existing
 * consumers — the Order model, the Stripe webhook emails — keep working
 * unchanged.
 *
 * Uploads run in parallel and each file tracks its own progress and error,
 * so one oversized file no longer wipes out the whole selection the way the
 * single-file version did.
 */

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB per file
const MAX_FILES = 8;
const ACCEPTED = "image/png, image/jpeg, image/jpg, image/svg+xml, image/webp, application/pdf";

let uid = 0;
const nextId = () => `logo-${Date.now()}-${uid++}`;

export default function LogoUpload({ onUploadSuccess, onDescriptionChange, description }) {
  // Each item: { id, name, size, status: "uploading" | "done" | "error", url, error, progress }
  const [items, setItems] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [notice, setNotice] = useState(null);
  const fileInputRef = useRef(null);

  const patchItem = useCallback((id, patch) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }, []);

  // Push the current list of successfully-uploaded URLs up to the parent
  // whenever it changes. Derived from `items` rather than tracked separately
  // so the parent can never drift out of sync with what's on screen.
  const doneUrls = items.filter((it) => it.status === "done" && it.url).map((it) => it.url);
  const doneKey = doneUrls.join("|");
  useEffect(() => {
    onUploadSuccess(doneUrls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doneKey]);

  const uploadOne = useCallback(
    async (id, file) => {
      try {
        patchItem(id, { progress: 35 });

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", { method: "POST", body: formData });
        patchItem(id, { progress: 80 });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || "Upload failed.");
        }

        const blob = await response.json();
        patchItem(id, { status: "done", url: blob.url, progress: 100 });
      } catch (err) {
        patchItem(id, { status: "error", error: err.message || "Upload failed.", progress: 0 });
      }
    },
    [patchItem]
  );

  const addFiles = useCallback(
    (fileList) => {
      const incoming = Array.from(fileList || []);
      if (!incoming.length) return;

      setNotice(null);

      let rejectedForSize = 0;
      let rejectedForCount = 0;

      setItems((prev) => {
        const room = MAX_FILES - prev.length;
        if (room <= 0) {
          rejectedForCount = incoming.length;
          return prev;
        }

        const accepted = [];
        for (const file of incoming) {
          if (accepted.length >= room) {
            rejectedForCount++;
            continue;
          }
          if (file.size > MAX_FILE_SIZE) {
            rejectedForSize++;
            continue;
          }
          accepted.push({
            id: nextId(),
            name: file.name,
            size: file.size,
            status: "uploading",
            url: null,
            error: null,
            progress: 10,
            _file: file,
          });
        }

        // Kick off the uploads after state settles.
        accepted.forEach((it) => {
          setTimeout(() => uploadOne(it.id, it._file), 0);
        });

        return [...prev, ...accepted.map(({ _file, ...rest }) => rest)];
      });

      // Report what we couldn't take, so a silently-dropped file never
      // leaves someone assuming their logo made it through.
      const msgs = [];
      if (rejectedForSize) msgs.push(`${rejectedForSize} file${rejectedForSize > 1 ? "s" : ""} over 5MB`);
      if (rejectedForCount) msgs.push(`${rejectedForCount} file${rejectedForCount > 1 ? "s" : ""} over the ${MAX_FILES}-file limit`);
      if (msgs.length) setNotice(`Skipped ${msgs.join(" and ")}.`);

      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [uploadOne]
  );

  const handleFileChange = (e) => addFiles(e.target.files);

  const removeItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    setNotice(null);
  };

  const retryItem = (id) => {
    const target = items.find((it) => it.id === id);
    if (!target) return;
    // The original File object isn't retained after upload, so a retry means
    // re-picking. Simplest honest behaviour: drop the row and reopen the picker.
    removeItem(id);
    fileInputRef.current?.click();
  };

  // ---- Drag & drop (the old component advertised this but never wired it) ----
  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer?.files);
  };

  const atLimit = items.length >= MAX_FILES;
  const uploadingCount = items.filter((it) => it.status === "uploading").length;

  return (
    <div
      className="logo-upload-section"
      style={{
        marginTop: "24px",
        marginBottom: "24px",
        padding: "20px",
        background: "rgba(255,255,255,0.06)",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
        <h3 style={{ fontSize: "1.1rem", marginBottom: "8px", fontWeight: "600", color: "#fff" }}>
          Custom Logos (Optional)
        </h3>
        {items.length > 0 && (
          <span style={{ fontSize: "0.78rem", opacity: 0.6 }}>
            {items.length} of {MAX_FILES} added
          </span>
        )}
      </div>

      <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", marginBottom: "16px" }}>
        Upload every logo you want on the suit — team marks, sponsor logos, your
        own artwork. If you don&apos;t have final files, upload samples or references
        and we&apos;ll redraw them for you. Up to {MAX_FILES} files, 5MB each.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Upload Area */}
        {!atLimit && (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={onDragOver}
            onDragEnter={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${isDragging ? "#dc2626" : "rgba(255,255,255,0.2)"}`,
              background: isDragging ? "rgba(220,38,38,0.08)" : "transparent",
              borderRadius: "8px",
              padding: "28px 20px",
              textAlign: "center",
              cursor: "pointer",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseOver={(e) => {
              if (!isDragging) e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
            }}
            onMouseOut={(e) => {
              if (!isDragging) e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0.7, marginBottom: "12px" }}
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <div style={{ fontSize: "0.95rem", fontWeight: "500" }}>
              {items.length ? "Add More Logos" : "Click to Browse or Drag & Drop"}
            </div>
            <div style={{ fontSize: "0.8rem", opacity: 0.5, marginTop: "4px" }}>
              You can select several at once · PNG, JPG, SVG, WEBP, PDF
            </div>
          </div>
        )}

        {/* Hidden File Input — `multiple` is what makes this a batch picker */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={ACCEPTED}
          multiple
          style={{ display: "none" }}
        />

        {/* Skipped-file notice */}
        {notice && (
          <div
            style={{
              color: "#fbbf24",
              fontSize: "0.85rem",
              padding: "10px",
              background: "rgba(251, 191, 36, 0.1)",
              borderRadius: "6px",
            }}
          >
            {notice}
          </div>
        )}

        {/* File list */}
        {items.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {items.map((it) => (
              <div
                key={it.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  padding: "10px 14px",
                  background: "rgba(0,0,0,0.2)",
                  borderRadius: "8px",
                  border: `1px solid ${it.status === "error" ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.1)"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", overflow: "hidden", flex: 1 }}>
                  {/* Thumbnail once uploaded, status icon otherwise */}
                  {it.status === "done" && it.url && !/\.pdf$/i.test(it.name) ? (
                    <img
                      src={it.url}
                      alt={it.name}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "contain",
                        borderRadius: "4px",
                        background: "rgba(255,255,255,0.9)",
                        padding: "3px",
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <div style={{ width: "40px", display: "flex", justifyContent: "center", flexShrink: 0 }}>
                      {it.status === "done" && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      )}
                      {it.status === "error" && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                      )}
                      {it.status === "uploading" && (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                      )}
                    </div>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", overflow: "hidden", flex: 1 }}>
                    <span style={{ fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {it.name}
                    </span>

                    {it.status === "uploading" && (
                      <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden", marginTop: "6px" }}>
                        <div style={{ width: `${it.progress}%`, height: "100%", background: "#dc2626", transition: "width 0.3s" }} />
                      </div>
                    )}

                    {it.status === "error" && (
                      <span style={{ fontSize: "0.75rem", color: "#ef4444" }}>
                        {it.error}{" "}
                        <button
                          type="button"
                          onClick={() => retryItem(it.id)}
                          style={{ background: "none", border: "none", color: "#fbbf24", cursor: "pointer", padding: 0, textDecoration: "underline", fontSize: "0.75rem" }}
                        >
                          Pick again
                        </button>
                      </span>
                    )}

                    {it.status === "done" && (
                      <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>{(it.size / 1024 / 1024).toFixed(2)} MB · Uploaded</span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(it.id)}
                  style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", padding: "4px", flexShrink: 0 }}
                  title={`Remove ${it.name}`}
                  aria-label={`Remove ${it.name}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {atLimit && (
          <div style={{ fontSize: "0.8rem", opacity: 0.6 }}>
            Maximum of {MAX_FILES} logos reached. Remove one to add another — or mention any extras in the notes below.
          </div>
        )}

        {uploadingCount > 0 && (
          <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>
            Uploading {uploadingCount} file{uploadingCount > 1 ? "s" : ""}…
          </div>
        )}

        {/* Description Input (Optional) */}
        <div>
          <label style={{ display: "block", fontSize: "0.85rem", opacity: 0.8, marginBottom: "6px" }}>
            Logo Description / Placement Instructions (Optional)
          </label>
          <textarea
            className="form-input"
            placeholder="E.g., team logo on the chest, sponsor logos down both sleeves, use red and black…"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            style={{ minHeight: "80px", resize: "vertical" }}
          />
        </div>
      </div>
    </div>
  );
}
