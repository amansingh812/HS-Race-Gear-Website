import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";

export const metadata = {
  title: "Add New Product | HS Race Gear Admin",
  description: "Add a new product to the catalog",
};

export default function NewProductPage() {
  return (
    <AdminLayout>
      <div className="mb-4">
        <h2 className="h3">Add New Product</h2>
        <p className="text-muted">Create a new racing gear product</p>
      </div>
      <ProductForm />
    </AdminLayout>
  );
}
