import { redirect } from "next/navigation";
export const metadata = {
  alternates: { canonical: "/cart-drawer-v2" },
};

export default function Page() {
  redirect("/");
}
