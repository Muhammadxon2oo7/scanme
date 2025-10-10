"use client"

import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Package, Plus, Eye, QrCode, Users, Star, Building2, BarChart3 } from "lucide-react"
import Link from "next/link"

export function ManufacturerDashboard() {
  const stats = [
    {
      title: "Jami mahsulotlar",
      value: "0",
      change: "+0 bu oy",
      icon: Package,
      color: "text-blue-500",
      trend: "up",
    },
    {
      title: "Faol mahsulotlar",
      value: "0",
      change: "0% faol",
      icon: Eye,
      color: "text-green-500",
      trend: "up",
    },
    {
      title: "Jami skanlar",
      value: "0",
      change: "0% o'tgan oyga nisbatan",
      icon: QrCode,
      color: "text-orange-500",
      trend: "up",
    },
    {
      title: "O'rtacha baho",
      value: "0",
      change: "5 dan",
      icon: Star,
      color: "text-yellow-500",
      trend: "stable",
    },
    {
      title: "Faol ta'minotchi lar",
      value: "0",
      change: "+0 yangi",
      icon: Users,
      color: "text-purple-500",
      trend: "up",
    },
    {
      title: "Oylik skanlar",
      value: "0",
      change: "+0% bu oy",
      icon: BarChart3,
      color: "text-cyan-500",
      trend: "up",
    },
  ]

  const recentProducts = [
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
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Xush kelibsiz!</h1>
          <p className="text-muted-foreground mt-2">Mahsulotlaringizni boshqaring va statistikalarni kuzating</p>
        </div>
        <Button className="scan-button" asChild>
          <Link href="/manufacturer/products/add">
            <Plus className="mr-2 h-4 w-4" />
            Yangi mahsulot
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold mt-2 text-foreground">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {stat.trend === "up" && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
                  {stat.trend === "stable" && <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>}
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
              </div>
              <div
                className={`w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center ${stat.color} border-2 border-primary/10`}
              >
                <stat.icon className="h-7 w-7" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Products */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">So'nggi mahsulotlar</h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/manufacturer/products">
                  <Eye className="mr-2 h-4 w-4" />
                  Barchasini ko'rish
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
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
                    <Badge variant={product.status === "active" ? "default" : "secondary"}>
                      {product.status === "active" ? "Faol" : "Kutilmoqda"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <h2 className="text-xl font-semibold mb-4">Tezkor amallar</h2>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/manufacturer/products/add">
                  <Plus className="mr-2 h-4 w-4" />
                  Mahsulot qo'shish
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/manufacturer/qr-generator">
                  <QrCode className="mr-2 h-4 w-4" />
                  QR kod yaratish
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/manufacturer/analytics">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Statistika ko'rish
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/manufacturer/collaborators">
                  <Building2 className="mr-2 h-4 w-4" />
                  ta'minotchi lar
                </Link>
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <h2 className="text-xl font-semibold mb-4">Tashkilot ma'lumotlari</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nomi:</span>
                <span className="font-medium">Demo tashkilot</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">STIR:</span>
                <span className="font-medium">123456789</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ro'yxatdan o'tgan:</span>
                <span className="font-medium">15.01.2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="default">Tasdiqlangan</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
