"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Package, Star, ArrowRight, QrCode } from "lucide-react"
import Link from "next/link"

export function ScanResultContent() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    // Simulate QR code scanning and product lookup
    const timer = setTimeout(() => {
      // Mock product data - in real app this would come from QR code data
      setProduct({
        id: "1",
        name: "Samsung Galaxy S24 Ultra",
        category: "Elektronika",
        manufacturer: "Samsung Electronics",
        rating: 4.8,
        reviewCount: 1247,
        image: "/samsung-smartphone.png",
        verified: true,
      })
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background grid-pattern flex items-center justify-center">
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <QrCode className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">QR Kod Skanlanmoqda...</h2>
          <p className="text-muted-foreground">Mahsulot ma'lumotlari yuklanmoqda</p>
        </Card>
      </div>
    )
  }

  if (!product) {
    return (
      <main className="container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 text-center">
          <h2 className="text-xl font-semibold mb-2">Mahsulot Topilmadi</h2>
          <p className="text-muted-foreground mb-4">QR kod noto'g'ri yoki mahsulot ma'lumotlari mavjud emas</p>
          <Button asChild>
            <Link href="/">Bosh Sahifaga Qaytish</Link>
          </Button>
        </Card>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 mb-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">QR Kod Muvaffaqiyatli Skanlandi!</h1>
            <p className="text-muted-foreground">Mahsulot ma'lumotlari topildi</p>
          </div>
        </Card>

        {/* Product Preview */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-20 h-20 rounded-lg object-cover bg-muted"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary">{product.category}</Badge>
                {product.verified && (
                  <Badge variant="default" className="bg-green-500/20 text-green-600 border-green-500/20">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Tasdiqlangan
                  </Badge>
                )}
              </div>
              <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
              <p className="text-sm text-muted-foreground mb-2">{product.manufacturer}</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "text-yellow-500 fill-current" : "text-muted-foreground"
                    }`}
                  />
                ))}
                <span className="text-sm font-medium ml-1">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviewCount} sharh)</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button asChild className="flex-1 scan-button">
              <Link href={`/product/${product.id}`}>
                <Package className="mr-2 h-4 w-4" />
                To'liq Ma'lumot
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                <QrCode className="mr-2 h-4 w-4" />
                Yana Skanerlash
              </Link>
            </Button>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <h3 className="font-semibold mb-4">Tezkor Amallar</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-between bg-transparent" asChild>
              <Link href={`/product/${product.id}#reviews`}>
                Sharhlarni Ko'rish
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between bg-transparent" asChild>
              <Link href={`/product/${product.id}#specifications`}>
                Texnik Xususiyatlar
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between bg-transparent" asChild>
              <Link href={`/product/${product.id}#manufacturer`}>
                Ishlab Chiqaruvchi Haqida
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </main>
  )
}
