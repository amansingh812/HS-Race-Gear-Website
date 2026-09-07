/**
 * Product detail loading skeleton — shown while the server component
 * fetches the product from MongoDB and generates metadata.
 */
export default function ProductDetailLoading() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      {/* Header placeholder */}
      <div
        style={{
          height: "60px",
          background: "#fafafa",
          borderBottom: "1px solid #eee",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "32px 20px",
        }}
      >
        {/* Breadcrumb skeleton */}
        <div
          style={{
            width: "200px",
            height: "14px",
            background: "#f0f0f0",
            borderRadius: "4px",
            marginBottom: "32px",
          }}
        />

        {/* Product layout: image + details */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
          }}
        >
          {/* Image skeleton */}
          <div style={{ animation: "pulse 1.5s ease-in-out infinite" }}>
            <div
              style={{
                width: "100%",
                paddingBottom: "110%",
                background: "#f0f0f0",
                borderRadius: "8px",
              }}
            />
            {/* Thumbnail row */}
            <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "64px",
                    height: "64px",
                    background: "#f0f0f0",
                    borderRadius: "4px",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Details skeleton */}
          <div style={{ animation: "pulse 1.5s ease-in-out infinite" }}>
            <div
              style={{
                width: "80%",
                height: "28px",
                background: "#f0f0f0",
                borderRadius: "4px",
                marginBottom: "16px",
              }}
            />
            <div
              style={{
                width: "120px",
                height: "14px",
                background: "#f0f0f0",
                borderRadius: "4px",
                marginBottom: "24px",
              }}
            />
            <div
              style={{
                width: "100px",
                height: "32px",
                background: "#f0f0f0",
                borderRadius: "4px",
                marginBottom: "24px",
              }}
            />
            {/* Description lines */}
            {[100, 95, 85, 60].map((w, i) => (
              <div
                key={i}
                style={{
                  width: `${w}%`,
                  height: "14px",
                  background: "#f0f0f0",
                  borderRadius: "4px",
                  marginBottom: "10px",
                }}
              />
            ))}
            {/* Size selector */}
            <div style={{ marginTop: "24px" }}>
              <div
                style={{
                  width: "60px",
                  height: "14px",
                  background: "#f0f0f0",
                  borderRadius: "4px",
                  marginBottom: "12px",
                }}
              />
              <div style={{ display: "flex", gap: "8px" }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: "48px",
                      height: "36px",
                      background: "#f0f0f0",
                      borderRadius: "4px",
                    }}
                  />
                ))}
              </div>
            </div>
            {/* Add to cart button */}
            <div
              style={{
                width: "100%",
                height: "48px",
                background: "#f0f0f0",
                borderRadius: "4px",
                marginTop: "32px",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
