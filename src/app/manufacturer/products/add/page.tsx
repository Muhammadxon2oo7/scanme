import { AddProductForm } from "@/src/components/manufacturer/add-product-form"
import { ManufacturerHeader } from "@/src/components/manufacturer/header"
import { Card } from "@/src/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      <ManufacturerHeader />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/manufacturer/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Mahsulotlarga qaytish
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Yangi Mahsulot Qo'shish</h1>
          <p className="text-muted-foreground mt-2">
            Mahsulotingiz haqida barcha ma'lumotlarni kiriting va QR kod yarating
          </p>
        </div>

        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <AddProductForm />
        </Card>
      </main>
    </div>
  )
}
