import AdminLayout from "@/components/admin/AdminLayout";
import AdminCustomers from "@/components/admin/AdminCustomers";

export const metadata = {
  title: "Customers | Admin Dashboard",
  description: "Manage store customers",
};

export default function CustomersPage() {
  return (
    <AdminLayout>
      <AdminCustomers />
    </AdminLayout>
  );
}
