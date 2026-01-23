import AdminLayout from "@/components/admin/AdminLayout";
import AdminProducts from "@/components/admin/AdminProducts";

export const metadata = {
  title: "Product Management | HS Race Gear Admin",
  description: "Manage products, inventory, and categories",
};

export default function AdminProductsPage() {
  return (
    <AdminLayout>
      <AdminProducts />
    </AdminLayout>
  );
}
