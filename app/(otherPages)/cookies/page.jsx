import { redirect } from "next/navigation";
export const metadata = {
  alternates: { canonical: "/cookies" },
};

export default function Page() {
  redirect("/");
}
