"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Plus, Eye, Star, Package, BarChart3, Building2 } from "lucide-react"
import { getAllProducts } from "@/lib/api"

interface Product {
  id: string
  name: string
  category: { id: string; name: string }
  status: "draft" | "pending" | "active"
  all_scan: number
  rating: number
  created_at: string
  images: string[]
}

const getStatusText = (status: Product["status"]) => {
  switch (status) {
    case "active": return "Faol"
    case "pending": return "Kutilmoqda"
    case "draft": return "To'ldirilmoqda"
    default: return "Noma'lum"
  }
}

const getStatusVariant = (status: Product["status"]) => {
  switch (status) {
    case "active": return "default"
    case "pending": return "secondary"
    case "draft": return "outline"
    default: return "secondary"
  }
}

export default function EmployerDashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [carouselIndex, setCarouselIndex] = useState<Record<string, number>>({})

  // MOBILE
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setIsSidebarOpen(!mobile)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // CAROUSEL
  useEffect(() => {
    const intervals: Record<string, NodeJS.Timeout> = {}
    products.forEach((product) => {
      if (product.images.length > 1) {
        intervals[product.id] = setInterval(() => {
          setCarouselIndex((prev) => ({
            ...prev,
            [product.id]: ((prev[product.id] || 0) + 1) % product.images.length,
          }))
        }, 3000)
      }
    })
    return () => Object.values(intervals).forEach(clearInterval)
  }, [products])

  // MAHSULOTLAR — YANGI LOGIKA
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true)
      setError(null)

      const data = await getAllProducts() // bitta chaqiruv

      // API dan kelgan ma'lumotni to'g'ri formatga o'tkazamiz
      const mapped: Product[] = data.map((item: any) => ({
        id: item.id,
        name: item.name || "Noma'lum",
        category: item.category,
        status: item.status,
        all_scan: item.all_scan || 0,
        rating: item.rating || 0,
        created_at: item.created_at,
        images: item.images || [],
      }))

      // Eng yangi 4 ta mahsulot
      const latest = mapped
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 4)

      setProducts(latest)
    } catch (error) {
      console.error("Mahsulotlarni yuklashda xato:", error)
      setError("Mahsulotlarni yuklashda xatolik yuz berdi")
    } finally {
      setLoadingProducts(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="bg-gradient-to-b from-background to-background/90">
      <main className="flex-1 p-4 md:p-8">
        <div className="container mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-balance tracking-tight">
                Xush kelibsiz!
              </h1>
              <p className="text-muted-foreground mt-2 text-base">
                Mahsulotlaringizni boshqaring va statistikalarni kuzating
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* SO'NGGI MAHSULOTLAR */}
            <div className="lg:col-span-2">
              <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">So'nggi mahsulotlar</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="bg-transparent hover:border-transparent transition-all duration-200"
                  >
                    <Link href="/employer/products">
                      <Eye className="mr-2 h-4 w-4" />
                      Barchasini ko'rish
                    </Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  {loadingProducts ? (
                    <p className="text-center text-muted-foreground py-6">Yuklanmoqda...</p>
                  ) : error ? (
                    <p className="text-center text-red-500 py-6">{error}</p>
                  ) : products.length > 0 ? (
                    products.map((product, idx) => {
                      const currentIdx = carouselIndex[product.id] || 0
                      const img = product.images[currentIdx] || product.images[0]
                      const key = `${product.id}-${idx}`

                      return (
                        <div
                          key={key}
                          className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50 hover:bg-background/80 transition-all duration-200 hover:shadow-sm"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center overflow-hidden">
                              {img ? (
                                <img
                                  src={img}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Package className="h-6 w-6 text-primary transition-transform duration-200 hover:scale-110" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold">{product.name}</h3>
                              <p className="text-sm text-muted-foreground">{product.category.name}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-medium">{product.all_scan} skan</p>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span className="text-sm">{product.rating.toFixed(1)}</span>
                              </div>
                            </div>
                            <Badge
                              variant={getStatusVariant(product.status)}
                              className="transition-all duration-200"
                            >
                              {getStatusText(product.status)}
                            </Badge>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-center text-muted-foreground py-6">
                      Mahsulotlar topilmadi.
                    </p>
                  )}
                </div>
              </Card>
            </div>

            {/* TEZKOR AMALLAR */}
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50">
                <h2 className="text-2xl font-semibold mb-4">Tezkor amallar</h2>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent hover:border-transparent transition-all duration-200"
                    asChild
                  >
                    <Link href="/employer/products/add">
                      <Plus className="mr-2 h-4 w-4" />
                      Mahsulot qo'shish
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent hover:border-transparent transition-all duration-200"
                    asChild
                  >
                    <Link href="/employer/analytics">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Statistika ko'rish
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent hover:border-transparent transition-all duration-200"
                    asChild
                  >
                    <Link href="/employer/collaborators">
                      <Building2 className="mr-2 h-4 w-4" />
                      Ta'minotchilar
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}