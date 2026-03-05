import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Topbar1 from "@/components/headers/Topbar1";
import Contact from "@/components/otherPages/Contact";
import "@/public/css/contact-us.css";

export const metadata = {
  alternates: { canonical: "/contact-us" },
  title: "Contact Us | HS Race Gear",
  description: "Get in touch with the HS Race Gear team for custom orders, sizing help, pricing enquiries, and more. We respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <Topbar1 />
      <Header3 />
      <Contact />
      <Footer3 />
    </>
  );
}
