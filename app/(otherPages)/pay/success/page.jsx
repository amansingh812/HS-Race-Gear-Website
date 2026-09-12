import dbConnect from "@/lib/mongodb";
import PaymentLink from "@/models/PaymentLink";
import Link from "next/link";

export const metadata = {
  title: "Payment Successful | HS Race Gear",
  robots: { index: false, follow: false },
};

export default async function PaySuccessPage({ searchParams }) {
  const { id } = await searchParams;
  let paymentLink = null;

  if (id) {
    await dbConnect();
    paymentLink = await PaymentLink.findOne({ paymentId: id }).lean();
  }

  const amountDisplay = paymentLink
    ? `$${(paymentLink.amount / 100).toFixed(2)}`
    : "";

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      fontFamily: "Poppins, Arial, sans-serif",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "480px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "16px",
        padding: "48px 40px",
        backdropFilter: "blur(10px)",
        textAlign: "center",
      }}>
        {/* Logo */}
        <h1 style={{
          fontSize: "1.5rem",
          fontWeight: 800,
          color: "#fff",
          margin: "0 0 32px",
          letterSpacing: "1px",
        }}>
          <span style={{ color: "#dc2626" }}>HS</span> RACE GEAR
        </h1>

        {/* Success Icon */}
        <div style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "rgba(34,197,94,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
          fontSize: "36px",
          border: "2px solid rgba(34,197,94,0.3)",
        }}>
          ✓
        </div>

        <h2 style={{
          color: "#22c55e",
          fontSize: "1.5rem",
          fontWeight: 700,
          margin: "0 0 12px",
        }}>
          Payment Successful!
        </h2>

        {paymentLink && (
          <>
            <p style={{ color: "#e5e7eb", fontSize: "1rem", margin: "0 0 4px" }}>
              {amountDisplay} paid successfully
            </p>
            <p style={{ color: "#9ca3af", fontSize: "0.85rem", margin: "0 0 24px" }}>
              {paymentLink.description || "Custom Racing Gear"}
            </p>
          </>
        )}

        <div style={{
          background: "rgba(0,0,0,0.3)",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "28px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          <p style={{ color: "#9ca3af", fontSize: "0.85rem", margin: 0 }}>
            A receipt has been sent to your email. If you have any questions about your order,
            contact us at{" "}
            <a href="mailto:info@hsracegear.com" style={{ color: "#dc2626" }}>
              info@hsracegear.com
            </a>{" "}
            or call{" "}
            <a href="tel:+16173196993" style={{ color: "#dc2626" }}>
              (617) 319-6993
            </a>.
          </p>
        </div>

        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "12px 32px",
            borderRadius: "8px",
            border: "1px solid rgba(220,38,38,0.5)",
            color: "#dc2626",
            fontSize: "0.9rem",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Visit HS Race Gear →
        </Link>
      </div>
    </div>
  );
}
