"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sidebar } from "@/src/components/manufacturer/Sidebar"
import { Card } from "@/src/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Menu, Building2, Package, Eye, BarChart3, Star, Users } from "lucide-react"
import { Button } from "@/src/components/ui/button"

export default function ManufacturerAnalyticsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

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

  const analyticsData = [
    { month: "Yanvar 2025", scans: 456, products: 12, partners: 3, rating: 4.8 },
    { month: "Fevral 2025", scans: 389, products: 15, partners: 2, rating: 4.7 },
    { month: "Mart 2025", scans: 512, products: 10, partners: 4, rating: 4.9 },
    { month: "Aprel 2025", scans: 678, products: 18, partners: 5, rating: 4.6 },
  ]
  const stats = [
    {
      title: "Jami mahsulotlar",
      value: "124",
      change: "+12 bu oy",
      icon: Package,
      color: "text-blue-500",
      trend: "up",
    },
    {
      title: "Faol mahsulotlar",
      value: "98",
      change: "78% faol",
      icon: Eye,
      color: "text-green-500",
      trend: "up",
    },
    {
      title: "Jami skanlar",
      value: "1,234",
      change: "+15% o'tgan oyga nisbatan",
      icon: BarChart3,
      color: "text-orange-500",
      trend: "up",
    },
    {
      title: "O'rtacha baho",
      value: "4.8",
      change: "5 dan",
      icon: Star,
      color: "text-yellow-500",
      trend: "stable",
    },
    {
      title: "Faol hamkorlar",
      value: "23",
      change: "+3 yangi",
      icon: Users,
      color: "text-purple-500",
      trend: "up",
    },
    {
      title: "Oylik skanlar",
      value: "456",
      change: "+20% bu oy",
      icon: BarChart3,
      color: "text-cyan-500",
      trend: "up",
    },
  ]
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
            <div>
              <h1 className="text-4xl font-semibold text-balance tracking-tight">
                Statistika
              </h1>
              <p className="text-muted-foreground mt-2 text-base">
                Mahsulotlar va skanlar bo‘yicha statistik ma'lumotlar
              </p>
            </div>

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


            <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-primary/10 transition-all duration-200">
                    <TableHead>Oy</TableHead>
                    <TableHead>Skanlar</TableHead>
                    <TableHead>Mahsulotlar</TableHead>
                    <TableHead>Hamkorlar</TableHead>
                    <TableHead>O‘rtacha baho</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analyticsData.map((data, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-primary/10 transition-all duration-200"
                    >
                      <TableCell>{data.month}</TableCell>
                      <TableCell>{data.scans}</TableCell>
                      <TableCell>{data.products}</TableCell>
                      <TableCell>{data.partners}</TableCell>
                      <TableCell>{data.rating}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}