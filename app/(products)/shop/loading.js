/**
 * Shop page loading skeleton — shown during Next.js route transitions
 * while the server component fetches products from MongoDB.
 *
 * Mirrors the ShopClient layout so the transition feels seamless.
 */
export default function ShopLoading() {
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

      {/* Hero / breadcrumb skeleton */}
      <div style={{ padding: "32px 20px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            width: "120px",
            height: "14px",
            background: "#f0f0f0",
            borderRadius: "4px",
            marginBottom: "16px",
          }}
        />
        <div
          style={{
            width: "280px",
            height: "28px",
            background: "#f0f0f0",
            borderRadius: "4px",
            marginBottom: "12px",
          }}
        />
        <div
          style={{
            width: "400px",
            maxWidth: "100%",
            height: "16px",
            background: "#f0f0f0",
            borderRadius: "4px",
          }}
        />
      </div>

      {/* Category tabs skeleton */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          padding: "0 20px 24px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {[80, 90, 100, 70].map((w, i) => (
          <div
            key={i}
            style={{
              width: `${w}px`,
              height: "36px",
              background: i === 0 ? "#e8e8e8" : "#f5f5f5",
              borderRadius: "20px",
            }}
          />
        ))}
      </div>

      {/* Product grid skeleton */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "24px",
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ animation: "pulse 1.5s ease-in-out infinite" }}>
              <div
                style={{
                  width: "100%",
                  paddingBottom: "120%",
                  background: "#f0f0f0",
                  borderRadius: "8px",
                  marginBottom: "12px",
                }}
              />
              <div
                style={{
                  width: "75%",
                  height: "16px",
                  background: "#f0f0f0",
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              />
              <div
                style={{
                  width: "40%",
                  height: "16px",
                  background: "#f0f0f0",
                  borderRadius: "4px",
                }}
              />
            </div>
          ))}
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
