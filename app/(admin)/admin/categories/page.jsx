import AdminLayout from "@/components/admin/AdminLayout";
import AdminCategories from "@/components/admin/AdminCategories";

export const metadata = {
  title: "Category Management | HS Race Gear Admin",
  description: "Manage product categories and subcategories",
};

export default function AdminCategoriesPage() {
  return (
    <AdminLayout>
      <AdminCategories />
    </AdminLayout>
  );
}
