import { redirect } from "next/navigation";
export const metadata = {
  alternates: { canonical: "/cart-empty" },
};

export default function Page() {
  redirect("/");
}
