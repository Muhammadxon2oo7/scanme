"use client"

import { useState, useEffect } from "react"
import { Card } from "@/src/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Package, Eye, BarChart3, Star } from "lucide-react"
import Cookies from "js-cookie"
import { Loader2 } from "lucide-react"

interface ApiResponse {
  organization: string
  products: Array<{
    category:string
    products: number
    active_products: number
  }>
  all_scan: number
  month_scan: number
  avg_rating: number
}

interface CategoryStat {
  name: string
  total: number
  active: number
  percentage: string
}

export default function ManufacturerAnalyticsPage() {
  const [statsData, setStatsData] = useState<ApiResponse | null>(null)
  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    const token = Cookies.get("token")
    
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("https://api.ekoiz.uz/api/v1/products/statistic/", {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })

      if (!response.ok) throw new Error("Statistika yuklanmadi")

      const data: ApiResponse = await response.json()
      setStatsData(data)

      const cats: CategoryStat[] = data.products
        .filter(c => c.products > 0)
        .map(c => ({
          name: c.category,
          total: c.products,
          active: c.active_products,
          percentage: c.products > 0 
            ? `${((c.active_products / c.products) * 100).toFixed(1)}%`
            : "0%"
        }))
        
        
      setCategoryStats(cats)
      console.log("Statistika:", data);
    } catch (err) {
      console.error("Xato:", err)
      setError("Ma'lumotlar yuklanmadi")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  // JAMI STATISTIKA
  const totalProducts = statsData?.products.reduce((s, c) => s + c.products, 0) || 0
  const activeProducts = statsData?.products.reduce((s, c) => s + c.active_products, 0) || 0
  const activePercent = totalProducts > 0 ? ((activeProducts / totalProducts) * 100).toFixed(1) : "0"

  const stats = [
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
      change: `${activePercent}% faol`,
      icon: Eye,
      color: "text-green-500",
      trend: "up" as const,
    },
    {
      title: "Jami skanlar",
      value: statsData?.all_scan.toLocaleString() || "0",
      change: "+0% o'tgan oyga nisbatan",
      icon: BarChart3,
      color: statsData?.all_scan ? "text-orange-500" : "text-gray-500",
      trend: statsData?.all_scan ? "up" as const : "stable" as const,
    },
    {
      title: "O'rtacha baho",
      value: statsData?.avg_rating.toFixed(1) || "0.0",
      change: "5 dan",
      icon: Star,
      color: statsData?.avg_rating ? "text-yellow-500" : "text-gray-500",
      trend: "stable" as const,
    },
    {
      title: "Oylik skanlar",
      value: statsData?.month_scan.toLocaleString() || "0",
      change: "+0% bu oy",
      icon: BarChart3,
      color: statsData?.month_scan ? "text-cyan-500" : "text-gray-500",
      trend: statsData?.month_scan ? "up" as const : "stable" as const,
    },
  ]

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
            <button
              onClick={fetchStats}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
            >
              Qayta yuklash
            </button>
          </div>
        </main>
      </div>
    )
  }
  console.log(categoryStats);
  

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

          {/* ASOSIY KARTALAR — UI 100% SAQLANDI */}
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

          {/* KATEGORIYALAR — UI SAQLANDI */}
          {categoryStats.length > 0 && (
            <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Kategoriya bo'yicha statistika</h2>
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
                        <TableCell className="font-medium">{cat.name}</TableCell>
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
        </div>
      </main>
    </div>
  )
}