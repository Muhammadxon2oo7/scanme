"use client"

import { ManufacturerHeader } from "@/src/components/manufacturer/header"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { TrendingUp, QrCode, Star, Users, Package, Download, Filter } from "lucide-react"

export default function AnalyticsPage() {
  // Mock analytics data
  const monthlyScans = [
    { month: "Yan", scans: 156, products: 18 },
    { month: "Fev", scans: 234, products: 20 },
    { month: "Mar", scans: 342, products: 24 },
    { month: "Apr", scans: 289, products: 22 },
    { month: "May", scans: 445, products: 26 },
    { month: "Iyun", scans: 523, products: 28 },
  ]

  const topProducts = [
    { name: "Samsung Galaxy S24", scans: 156, rating: 4.9, growth: "+23%" },
    { name: "Nike Air Max", scans: 134, rating: 4.7, growth: "+18%" },
    { name: "Coca Cola 0.5L", scans: 98, rating: 4.5, growth: "+12%" },
    { name: "iPhone 15 Pro", scans: 87, rating: 4.8, growth: "+8%" },
    { name: "Adidas Ultraboost", scans: 76, rating: 4.6, growth: "+15%" },
  ]

  const regionStats = [
    { region: "Toshkent", scans: 445, percentage: 35.7 },
    { region: "Samarqand", scans: 234, percentage: 18.8 },
    { region: "Buxoro", scans: 156, percentage: 12.5 },
    { region: "Andijon", scans: 123, percentage: 9.9 },
    { region: "Boshqalar", scans: 289, percentage: 23.1 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <ManufacturerHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance">Statistika va Tahlil</h1>
              <p className="text-muted-foreground mt-2">Mahsulotlaringiz bo'yicha batafsil ma'lumotlar</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtr
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Eksport
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Jami Skanlar</p>
                  <p className="text-2xl font-bold mt-2">1,247</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">+12%</span>
                  </div>
                </div>
                <QrCode className="h-8 w-8 text-orange-500" />
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Faol Mahsulotlar</p>
                  <p className="text-2xl font-bold mt-2">21</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">+3</span>
                  </div>
                </div>
                <Package className="h-8 w-8 text-blue-500" />
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">O'rtacha Baho</p>
                  <p className="text-2xl font-bold mt-2">4.8</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-muted-foreground">5 dan</span>
                  </div>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Faol Foydalanuvchilar</p>
                  <p className="text-2xl font-bold mt-2">892</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">+8%</span>
                  </div>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </Card>
          </div>

          {/* Charts and Analytics */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Monthly Scans Chart */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/20">
              <h3 className="text-lg font-semibold mb-4">Oylik Skanlar Statistikasi</h3>
              <div className="space-y-4">
                {monthlyScans.map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 text-sm font-medium">{data.month}</div>
                      <div className="flex-1 bg-muted rounded-full h-2 min-w-[100px]">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(data.scans / 600) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{data.scans}</div>
                      <div className="text-xs text-muted-foreground">{data.products} mahsulot</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Products */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/20">
              <h3 className="text-lg font-semibold mb-4">Eng Ko'p Skanlanadigan Mahsulotlar</h3>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-muted-foreground">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{product.scans} skan</p>
                      <Badge variant="secondary" className="text-xs">
                        {product.growth}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Regional Statistics */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/20">
            <h3 className="text-lg font-semibold mb-4">Hududlar Bo'yicha Statistika</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {regionStats.map((region, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-background/50">
                  <p className="font-medium">{region.region}</p>
                  <p className="text-2xl font-bold text-primary mt-2">{region.scans}</p>
                  <p className="text-sm text-muted-foreground">{region.percentage}%</p>
                  <div className="w-full bg-muted rounded-full h-1 mt-2">
                    <div
                      className="bg-primary h-1 rounded-full transition-all duration-500"
                      style={{ width: `${region.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/20">
            <h3 className="text-lg font-semibold mb-4">So'nggi Faoliyat</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                <QrCode className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm">Samsung Galaxy S24 mahsuloti skanlandı</p>
                  <p className="text-xs text-muted-foreground">2 daqiqa oldin • Toshkent</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                <Star className="h-5 w-5 text-yellow-500" />
                <div className="flex-1">
                  <p className="text-sm">Nike Air Max uchun yangi sharh qoldirildi</p>
                  <p className="text-xs text-muted-foreground">5 daqiqa oldin • 5 yulduz</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                <Package className="h-5 w-5 text-blue-500" />
                <div className="flex-1">
                  <p className="text-sm">Yangi mahsulot qo'shildi: iPhone 15 Pro</p>
                  <p className="text-xs text-muted-foreground">1 soat oldin</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
