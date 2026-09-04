"use client";
import React, { useState, useRef } from "react";

export default function LogoUpload({ onUploadSuccess, onDescriptionChange, description }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    setError(null);

    if (!selectedFile) return;

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File size exceeds 5MB limit. Please upload a smaller file.");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setFile(selectedFile);
    await uploadFile(selectedFile);
  };

  const uploadFile = async (selectedFile) => {
    setIsUploading(true);
    setUploadProgress(10); // Start progress

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      setUploadProgress(40);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      setUploadProgress(80);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to upload logo.");
      }

      const blob = await response.json();
      setUploadProgress(100);
      onUploadSuccess(blob.url);
    } catch (err) {
      setError(err.message);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
    onUploadSuccess(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="logo-upload-section" style={{ marginTop: "24px", marginBottom: "24px", padding: "20px", background: "rgba(255,255,255,0.06)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.15)" }}>
      <h3 style={{ fontSize: "1.1rem", marginBottom: "8px", fontWeight: "600", color: "#fff" }}>Custom Logo (Optional)</h3>
      <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", marginBottom: "16px" }}>
        Upload your own logo. If you don't have one, upload a sample/reference and we'll design it for you. Maximum file size: 5MB.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Upload Area */}
        {!file && !isUploading && (
          <div 
            onClick={() => fileInputRef.current?.click()}
            style={{ 
              border: "2px dashed rgba(255,255,255,0.2)", 
              borderRadius: "8px", 
              padding: "32px 20px", 
              textAlign: "center",
              cursor: "pointer",
              transition: "border-color 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"}
            onMouseOut={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7, marginBottom: "12px" }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <div style={{ fontSize: "0.95rem", fontWeight: "500" }}>Click to Browse or Drag & Drop</div>
            <div style={{ fontSize: "0.8rem", opacity: 0.5, marginTop: "4px" }}>Supports PNG, JPG, JPEG, SVG</div>
          </div>
        )}

        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/png, image/jpeg, image/jpg, image/svg+xml" 
          style={{ display: "none" }} 
        />

        {/* Uploading State */}
        {isUploading && (
          <div style={{ padding: "24px 20px", background: "rgba(0,0,0,0.2)", borderRadius: "8px", textAlign: "center" }}>
            <div style={{ fontSize: "0.9rem", marginBottom: "12px", opacity: 0.8 }}>Uploading...</div>
            <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ width: `${uploadProgress}%`, height: "100%", background: "#dc2626", transition: "width 0.3s" }} />
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={{ color: "#ef4444", fontSize: "0.85rem", padding: "10px", background: "rgba(239, 68, 68, 0.1)", borderRadius: "6px" }}>
            {error}
          </div>
        )}

        {/* File Preview */}
        {file && !isUploading && !error && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "rgba(0,0,0,0.2)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", overflow: "hidden" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <span style={{ fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{file.name}</span>
                <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            </div>
            <button 
              type="button" 
              onClick={removeFile}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", padding: "4px" }}
              title="Remove file"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        {/* Description Input (Optional) */}
        <div>
          <label style={{ display: "block", fontSize: "0.85rem", opacity: 0.8, marginBottom: "6px" }}>Logo Description / Instructions (Optional)</label>
          <textarea 
            className="form-input"
            placeholder="E.g., I want the text 'Racing Team' incorporated, use colors red and black..."
            value={description}
            onChange={e => onDescriptionChange(e.target.value)}
            style={{ minHeight: "80px", resize: "vertical" }}
          />
        </div>
      </div>
    </div>
  );
}
