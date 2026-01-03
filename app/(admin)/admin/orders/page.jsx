import AdminLayout from "@/components/admin/AdminLayout";
import AdminOrders from "@/components/admin/AdminOrders";

export const metadata = {
  title: "Orders - Admin | HS Race Gear",
  description: "Manage orders for HS Race Gear",
};

export default function AdminOrdersPage() {
  return (
    <AdminLayout>
      <AdminOrders />
    </AdminLayout>
  );
}
