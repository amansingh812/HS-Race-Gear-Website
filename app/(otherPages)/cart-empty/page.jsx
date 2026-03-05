import { redirect } from "next/navigation";

export const metadata = {
  alternates: { canonical: "/cart-empty" },
  title: "Your Cart is Empty | HS Race Gear",
  description: "Your cart is currently empty. Browse HS Race Gear's custom SFI-certified racing suits, gloves, and shoes.",
  robots: { index: false, follow: false },
};

export default function Page() {
  redirect("/");
}
