import { redirect } from "next/navigation";

export const metadata = {
  alternates: { canonical: "/cart-drawer-v2" },
  title: "Shopping Cart | HS Race Gear",
  description: "Review your selected racing gear before checkout. Custom SFI-certified racing suits, gloves, and shoes.",
  robots: { index: false, follow: false },
};

export default function Page() {
  redirect("/");
}
