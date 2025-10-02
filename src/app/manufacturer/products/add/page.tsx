"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sidebar } from "@/src/components/manufacturer/Sidebar"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Menu, Building2, CheckCircle } from "lucide-react"

export default function AddProductPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  const handleSubmit = () => {
    // Backend tayyor bo‘lganda API ga jo‘natish va QR kod generatsiya qilish
    console.log("Yuborilgan ma'lumotlar:", formData)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000) // 3 soniyadan keyin xabar yashiriladi
  }

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
                Yangi Mahsulot Qo‘shish
              </h1>
              <p className="text-muted-foreground mt-2 text-base">
                Yangi mahsulot ma'lumotlarini kiriting
              </p>
            </div>

            <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50">
              {isSubmitted && (
                <div className="flex items-center gap-2 p-4 mb-6 bg-green-500/10 rounded-lg border border-green-500/20">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <p className="text-sm text-green-500">
                    Mahsulot qo‘shildi va QR kod avtomatik generatsiya qilindi!
                  </p>
                </div>
              )}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Mahsulot nomi</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Mahsulot nomini kiriting"
                    className="border-primary/20 focus:ring-primary/50 transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Kategoriya</Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger className="border-primary/20 focus:ring-primary/50 transition-all duration-200">
                      <SelectValue placeholder="Kategoriyani tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Elektronika">Elektronika</SelectItem>
                      <SelectItem value="Kiyim">Kiyim</SelectItem>
                      <SelectItem value="Ichimlik">Ichimlik</SelectItem>
                      <SelectItem value="Oziq-ovqat">Oziq-ovqat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Tavsif</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Mahsulot tavsifini kiriting"
                    className="border-primary/20 focus:ring-primary/50 transition-all duration-200"
                  />
                </div>
                <Button
                  className="bg-primary hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg"
                  onClick={handleSubmit}
                >
                  Saqlash
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}