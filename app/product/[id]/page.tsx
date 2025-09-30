import { ProductDetails } from "@/components/product/product-details"
import { ReviewSection } from "@/components/product/review-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ProductDetails productId={params.id} />
        <ReviewSection productId={params.id} />
      </main>
      <Footer />
    </div>
  )
}
