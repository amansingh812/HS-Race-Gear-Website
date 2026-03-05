import { redirect } from "next/navigation";

export const metadata = {
  alternates: { canonical: "/cookies" },
  title: "Cookie Policy | HS Race Gear",
  description: "Learn how HS Race Gear uses cookies to improve your browsing experience on hsracegear.com.",
};

export default function Page() {
  redirect("/");
}
