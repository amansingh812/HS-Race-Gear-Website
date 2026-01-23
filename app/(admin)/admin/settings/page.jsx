import AdminLayout from "@/components/admin/AdminLayout";
import AdminSettings from "@/components/admin/AdminSettings";

export const metadata = {
  title: "Settings | Admin Dashboard",
  description: "Manage store settings",
};

export default function SettingsPage() {
  return (
    <AdminLayout>
      <AdminSettings />
    </AdminLayout>
  );
}
