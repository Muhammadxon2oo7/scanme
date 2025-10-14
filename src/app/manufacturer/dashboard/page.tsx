"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sidebar } from "@/src/components/manufacturer/Sidebar"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Plus, Eye, Star, Package, Users, BarChart3 } from "lucide-react"
import { Menu, Building2 } from "lucide-react"

export default function ManufacturerDashboardPage() {
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
    {
      id: 4,
      name: "Apple AirPods Pro",
      category: "Elektronika",
      scans: 78,
      rating: 4.8,
      status: "active",
    },
  ]

  return (
    <div className=" bg-gradient-to-b from-background to-background/90 ">
     
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
                    ))}
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50">
                  <h2 className="text-2xl font-semibold mb-4">Tezkor amallar</h2>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent hover:border-transparent transition-all duration-200"
                      asChild
                    >
                      <Link href="/manufacturer/products/add">
                        <Plus className="mr-2 h-4 w-4" />
                        Mahsulot qo'shish
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent hover:border-transparent transition-all duration-200"
                      asChild
                    >
                      <Link href="/manufacturer/analytics">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Statistika ko'rish
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent hover:border-transparent transition-all duration-200"
                      asChild
                    >
                      <Link href="/manufacturer/collaborators">
                        <Building2 className="mr-2 h-4 w-4" />
                        ta'minotchilar
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