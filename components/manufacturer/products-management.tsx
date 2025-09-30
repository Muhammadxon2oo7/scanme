"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Package, Plus, Search, Filter, Edit, QrCode, Eye, Star, MoreHorizontal, Trash2 } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProductsManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  // Mock data for demonstration
  const products = [
    {
      id: 1,
      name: "Samsung Galaxy S24 Ultra",
      category: "Elektronika",
      sku: "SGS24U-256-BLK",
      price: "15,000,000 so'm",
      stock: 45,
      scans: 1247,
      rating: 4.9,
      status: "active",
      image: "/samsung-smartphone.png",
      createdAt: "2025-01-15",
    },
    {
      id: 2,
      name: "Nike Air Max 270",
      category: "Kiyim",
      sku: "NAM270-42-WHT",
      price: "1,200,000 so'm",
      stock: 23,
      scans: 856,
      rating: 4.7,
      status: "active",
      image: "/athletic-shoes.png",
      createdAt: "2025-01-12",
    },
    {
      id: 3,
      name: "Coca Cola 1.5L",
      category: "Ichimlik",
      sku: "CC-15L-ORIG",
      price: "8,000 so'm",
      stock: 156,
      scans: 2341,
      rating: 4.5,
      status: "pending",
      image: "/classic-coca-cola.png",
      createdAt: "2025-01-10",
    },
    {
      id: 4,
      name: "MacBook Pro M3",
      category: "Elektronika",
      sku: "MBP-M3-14-SLV",
      price: "25,000,000 so'm",
      stock: 8,
      scans: 567,
      rating: 4.8,
      status: "active",
      image: "/silver-macbook-on-desk.png",
      createdAt: "2025-01-08",
    },
  ]

  const categories = ["all", "Elektronika", "Kiyim", "Ichimlik", "Oziq-ovqat"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || product.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mahsulotlar</h1>
          <p className="text-muted-foreground">Barcha mahsulotlaringizni boshqaring</p>
        </div>
        <Button className="scan-button" asChild>
          <Link href="/manufacturer/products/add">
            <Plus className="mr-2 h-4 w-4" />
            Yangi Mahsulot
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Jami</p>
              <p className="text-xl font-bold">{products.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Eye className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Faol</p>
              <p className="text-xl font-bold">{products.filter((p) => p.status === "active").length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <QrCode className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Skanlar</p>
              <p className="text-xl font-bold">{products.reduce((sum, p) => sum + p.scans, 0).toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Star className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">O'rtacha Baho</p>
              <p className="text-xl font-bold">
                {(products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Mahsulot nomi yoki SKU bo'yicha qidiring..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-48 bg-background/50">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Kategoriya" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "Barcha kategoriyalar" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Products Table */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <div className="p-6">
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-muted"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <Badge variant="secondary">{product.category}</Badge>
                      <span className="text-sm text-muted-foreground">SKU: {product.sku}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>Narx: {product.price}</span>
                      <span>Ombor: {product.stock} dona</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{product.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{product.scans.toLocaleString()} skan</p>
                  </div>

                  <Badge variant={product.status === "active" ? "default" : "secondary"}>
                    {product.status === "active" ? "Faol" : "Kutilmoqda"}
                  </Badge>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Ko'rish
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Tahrirlash
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <QrCode className="mr-2 h-4 w-4" />
                        QR Kod
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        O'chirish
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Mahsulot topilmadi</h3>
              <p className="text-muted-foreground mb-4">Qidiruv shartlaringizga mos mahsulot mavjud emas</p>
              <Button asChild>
                <Link href="/manufacturer/products/add">
                  <Plus className="mr-2 h-4 w-4" />
                  Birinchi mahsulotni qo'shing
                </Link>
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
