"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sidebar } from "@/src/components/manufacturer/Sidebar"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Menu, Building2 } from "lucide-react"

export default function QRGeneratorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [qrData, setQrData] = useState("")

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

  const handleGenerate = () => {
    // Backend tayyor bo‘lganda QR kod generatsiyasi uchun API chaqiriladi
    console.log("QR kod ma'lumotlari:", qrData)
  }

  return (
    <div className="min-h-screen bg-background grid-pattern flex">
      {isSidebarOpen && <Sidebar isMobile={isMobile} setIsSidebarOpen={setIsSidebarOpen} />}
      
      <div className="flex-1 flex flex-col">
        <header className="md:hidden bg-card/90 backdrop-blur-sm border-b border-border/40 p-4 flex items-center justify-between">
          <Link href="/manufacturer/dashboard" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">ScanMe</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <div className="container mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-balance tracking-tight">
                QR Kod Yaratish
              </h1>
              <p className="text-muted-foreground mt-2 text-sm">
                Mahsulot uchun QR kod yaratish
              </p>
            </div>

            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="qr-data">QR kod ma'lumotlari</Label>
                  <Input
                    id="qr-data"
                    value={qrData}
                    onChange={(e) => setQrData(e.target.value)}
                    placeholder="QR kod uchun havola yoki ma'lumot kiriting"
                  />
                </div>
                <Button
                  className="bg-primary hover:bg-primary/90 transition-all duration-200"
                  onClick={handleGenerate}
                >
                  QR Kod Yaratish
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}