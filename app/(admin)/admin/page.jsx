import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "Admin Dashboard | HS Race Gear",
  description: "HS Race Gear Administration Dashboard",
};

export default function AdminPage() {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}
