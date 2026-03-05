import { redirect } from "next/navigation";

export const metadata = {
  alternates: { canonical: "/before-you-leave" },
  title: "Before You Leave | HS Race Gear",
  description: "Before you go — explore HS Race Gear's custom SFI-certified racing suits, gloves, and shoes. Special offers may be waiting for you.",
  robots: { index: false, follow: false },
};

export default function Page() {
  redirect("/");
}
