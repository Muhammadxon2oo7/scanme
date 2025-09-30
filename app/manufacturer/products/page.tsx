import { ProductsManagement } from "@/components/manufacturer/products-management"
import { ManufacturerHeader } from "@/components/manufacturer/header"

export default function ManufacturerProductsPage() {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      <ManufacturerHeader />
      <main className="container mx-auto px-4 py-8">
        <ProductsManagement />
      </main>
    </div>
  )
}
