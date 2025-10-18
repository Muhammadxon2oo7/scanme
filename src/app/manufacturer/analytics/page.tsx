"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sidebar } from "@/src/components/manufacturer/Sidebar"
import { Card } from "@/src/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Menu, Building2, Package, Eye, BarChart3, Star, Users } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Loader2 } from "lucide-react"
import Cookies from "js-cookie";

interface ApiResponse {
  organization: string
  products: Array<{
    category: string
    products: number
    active_products: number
  }>
  all_scan: number
  month_scan: number
  avg_rating: number
}

interface CategoryStat {
  category: string
  total: number
  active: number
  percentage: string
}

interface StatsCard {
  title: string
  value: string
  change: string
  icon: any
  color: string
  trend: "up" | "stable" | "down"
}

export default function ManufacturerAnalyticsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [statsData, setStatsData] = useState<ApiResponse | null>(null)
  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  const fetchStats = async () => {
    const token = Cookies.get("token");
    
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("https://api.e-investment.uz/api/v1/products/statistic/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Agar autentifikatsiya kerak bo'lsa, quyidagi qatorni faollashtiring:
          "Authorization": `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ApiResponse = await response.json()
      setStatsData(data)

      // Kategoriya statistikasini hisoblash
      const categoryList: CategoryStat[] = data.products
        .filter(cat => cat.products > 0) // Faqat mahsuloti bor kategoriyalarni ko'rsatish
        .map(cat => ({
          category: cat.category,
          total: cat.products,
          active: cat.active_products,
          percentage: cat.products > 0 
            ? `${((cat.active_products / cat.products) * 100).toFixed(1)}%`
            : "0%"
        }))

      setCategoryStats(categoryList)
    } catch (error) {
      console.error("Statistika yuklashda xato:", error)
      setError("Statistika yuklashda xatolik yuz berdi")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const getCategoryName = (categoryKey: string) => {
    const categoryMap: Record<string, string> = {
      "GadgetProduct": "Gadjetlar",
      "MaishiyTexnikaProduct": "Maishiy texnika",
      "KiyimProduct": "Kiyim-kechak",
      "FoodProduct": "Oziq-ovqat",
      "QurilishProduct": "Qurilish materiallari",
      "AksessuarProduct": "Aksessuarlar",
      "SalomatlikProduct": "Salomatlik mahsulotlari",
      "UyBuyumProduct": "Uy jihozlari",
      "KanselyariyaProduct": "Kanselyariya mahsulotlari",
    }
    return categoryMap[categoryKey] || categoryKey
  }

  // Statistika kartalarini yaratish
  const getStatsCards = () => {
    if (!statsData) return []

    const totalProducts = statsData.products.reduce((sum, cat) => sum + cat.products, 0)
    const activeProducts = statsData.products.reduce((sum, cat) => sum + cat.active_products, 0)
    const activePercentage = totalProducts > 0 ? ((activeProducts / totalProducts) * 100).toFixed(1) : "0"

    return [
      {
        title: "Jami mahsulotlar",
        value: totalProducts.toString(),
        change: `+${totalProducts} ta yaratilgan`,
        icon: Package,
        color: "text-blue-500",
        trend: "up" as const,
      },
      {
        title: "Faol mahsulotlar",
        value: activeProducts.toString(),
        change: `${activePercentage}% faol`,
        icon: Eye,
        color: "text-green-500",
        trend: "up" as const,
      },
      {
        title: "Jami skanlar",
        value: statsData.all_scan.toLocaleString(),
        change: "+0% o'tgan oyga nisbatan",
        icon: BarChart3,
        color: statsData.all_scan > 0 ? "text-orange-500" : "text-gray-500",
        trend: statsData.all_scan > 0 ? "up" as const : "stable" as const,
      },
      {
        title: "O'rtacha baho",
        value: statsData.avg_rating.toFixed(1),
        change: "5 dan",
        icon: Star,
        color: statsData.avg_rating > 0 ? "text-yellow-500" : "text-gray-500",
        trend: "stable" as const,
      },
      {
        title: "Oylik skanlar",
        value: statsData.month_scan.toLocaleString(),
        change: "+0% bu oy",
        icon: BarChart3,
        color: statsData.month_scan > 0 ? "text-cyan-500" : "text-gray-500",
        trend: statsData.month_scan > 0 ? "up" as const : "stable" as const,
      },
    ]
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-background to-background/90 flex min-h-screen">
        <main className="w-full md:p-8 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Statistika yuklanmoqda...</p>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gradient-to-b from-background to-background/90 flex min-h-screen">
        <main className="w-full md:p-8 flex items-center justify-center">
          <div className="text-center">
            <Package className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-destructive">Xatolik yuz berdi</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchStats} variant="outline">
              Qayta yuklash
            </Button>
          </div>
        </main>
      </div>
    )
  }

  const stats = getStatsCards()

  return (
    <div className="bg-gradient-to-b from-background to-background/90 flex">
      <main className="w-full md:p-8">
        <div className="container mx-auto space-y-6">
          <div>
            <h1 className="text-4xl font-semibold text-balance tracking-tight">
              Statistika
            </h1>
            <p className="text-muted-foreground mt-2 text-base">
              Mahsulotlar va skanlar bo'yicha statistik ma'lumotlar
            </p>
          </div>

          {/* Asosiy statistika kartalari */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold mt-2 text-foreground">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trend === "up" && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                      {stat.trend === "stable" && (
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      )}
                      <p className="text-xs text-muted-foreground">{stat.change}</p>
                    </div>
                  </div>
                  <div
                    className={`w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center ${stat.color} border-2 border-primary/10 transition-transform duration-200 hover:scale-110`}
                  >
                    <stat.icon className="h-7 w-7" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Kategoriya bo'yicha statistika */}
          {categoryStats.length > 0 && (
            <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Kategoriya bo'yicha statistika</h2>
                <Button variant="outline" size="sm">
                  Barcha kategoriyalar
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-primary/10 transition-all duration-200">
                      <TableHead className="w-[200px]">Kategoriya</TableHead>
                      <TableHead className="text-right">Jami mahsulotlar</TableHead>
                      <TableHead className="text-right">Faol mahsulotlar</TableHead>
                      <TableHead className="text-right">Faollik %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categoryStats.map((cat, index) => (
                      <TableRow
                        key={index}
                        className="hover:bg-primary/10 transition-all duration-200"
                      >
                        <TableCell className="font-medium">
                          {getCategoryName(cat.category)}
                        </TableCell>
                        <TableCell className="text-right">{cat.total}</TableCell>
                        <TableCell className="text-right font-medium text-green-600">
                          {cat.active}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            parseFloat(cat.percentage) >= 80 ? 'bg-green-100 text-green-800' :
                            parseFloat(cat.percentage) >= 50 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {cat.percentage}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          )}

          {/* Oylik statistika (placeholder - API da mavjud emas) */}
          <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Oylik statistika</h2>
              <Button variant="outline" size="sm" disabled>
                Batafsil ko'rish
              </Button>
            </div>
            <div className="text-center text-muted-foreground py-8">
              <p>Oylik statistika ma'lumotlari hozircha mavjud emas</p>
              <p className="text-sm mt-2">Tez orada qo'shiladi</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}