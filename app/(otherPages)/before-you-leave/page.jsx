import { redirect } from "next/navigation";
export const metadata = {
  alternates: { canonical: "/before-you-leave" },
};

export default function Page() {
  redirect("/");
}
