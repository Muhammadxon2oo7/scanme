"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sidebar } from "@/src/components/manufacturer/Sidebar"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Input } from "@/src/components/ui/input"
import { Package, Plus, Eye, Star, Menu, Building2 } from "lucide-react"

export default function ManufacturerProductsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true)
      } else {
        setIsSidebarOpen(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const products = [
    {
      id: 1,
      name: "Samsung Galaxy S24",
      category: "Elektronika",
      scans: 156,
      rating: 4.9,
      status: "active",
    },
    {
      id: 2,
      name: "Nike Air Max",
      category: "Kiyim",
      scans: 89,
      rating: 4.7,
      status: "active",
    },
    {
      id: 3,
      name: "Coca Cola 0.5L",
      category: "Ichimlik",
      scans: 234,
      rating: 4.5,
      status: "pending",
    },
    {
      id: 4,
      name: "Apple AirPods Pro",
      category: "Elektronika",
      scans: 78,
      rating: 4.8,
      status: "active",
    },
    {
      id: 5,
      name: "Adidas Ultraboost",
      category: "Kiyim",
      scans: 45,
      rating: 4.6,
      status: "pending",
    },
  ]

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 flex">
      {isSidebarOpen && <Sidebar isMobile={isMobile} setIsSidebarOpen={setIsSidebarOpen} />}
      
      <div className="flex-1 flex flex-col">
        <header className="md:hidden bg-gradient-to-r from-card to-card/90 backdrop-blur-md border-b border-border/40 p-4 flex items-center justify-between">
          <Link href="/manufacturer/dashboard" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary transition-transform duration-200 hover:scale-110" />
            <span className="text-xl font-bold text-primary">ScanMe</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            className="hover:bg-primary/10"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <div className="container mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-semibold text-balance tracking-tight">
                  Mahsulotlar
                </h1>
                <p className="text-muted-foreground mt-2 text-base">
                  Barcha mahsulotlaringizni ko‘ring va boshqaring
                </p>
              </div>
              <Button
                className="bg-primary hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg"
                asChild
              >
                <Link href="/manufacturer/products/add">
                  <Plus className="mr-2 h-4 w-4" />
                  Yangi mahsulot
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Input
                placeholder="Mahsulot yoki kategoriya bo‘yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm border-primary/20 focus:ring-primary/50 transition-all duration-200"
              />
            </div>

            <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50">
              <div className="space-y-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50 hover:bg-background/80 transition-all duration-200 hover:shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-primary transition-transform duration-200 hover:scale-110" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{product.scans} skan</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-sm">{product.rating}</span>
                          </div>
                        </div>
                        <Badge
                          variant={product.status === "active" ? "default" : "secondary"}
                          className="transition-all duration-200"
                        >
                          {product.status === "active" ? "Faol" : "Kutilmoqda"}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center">
                    Hech qanday mahsulot topilmadi
                  </p>
                )}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}