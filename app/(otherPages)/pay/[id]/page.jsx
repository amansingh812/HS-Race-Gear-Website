import dbConnect from "@/lib/mongodb";
import PaymentLink from "@/models/PaymentLink";
import PaymentPage from "@/components/hsRaceGear/payment/PaymentPage";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Complete Payment | HS Race Gear",
  robots: { index: false, follow: false },
};

export default async function PayPage({ params }) {
  const { id } = await params;

  await dbConnect();
  const paymentLink = await PaymentLink.findOne({ paymentId: id }).lean();

  if (!paymentLink) {
    notFound();
  }

  // Serialize for client component
  const data = {
    paymentId: paymentLink.paymentId,
    amount: paymentLink.amount,
    customerName: paymentLink.customerName,
    description: paymentLink.description,
    status: paymentLink.status,
    paidAt: paymentLink.paidAt ? paymentLink.paidAt.toISOString() : null,
  };

  return <PaymentPage data={data} />;
}
