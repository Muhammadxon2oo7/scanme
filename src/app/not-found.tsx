"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Package, Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="bg-gradient-to-b from-background to-background/90 flex min-h-screen items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-md bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-2 border-primary/20 shadow-lg">
        <div className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <Package className="h-16 w-16 text-primary/80 animate-bounce" />
          </div>
          <h1 className="text-4xl font-semibold text-balance tracking-tight text-foreground">
            404 - Sahifa topilmadi
          </h1>
          <p className="text-muted-foreground text-base">
            Kechirasiz, siz izlayotgan sahifa mavjud emas yoki olib tashlangan bo‘lishi mumkin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="bg-transparent hover:border-transparent transition-all duration-200 w-full sm:w-auto"
              asChild
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Asosiy sahifaga qaytish
              </Link>
            </Button>
            <Button
              variant="outline"
              className="bg-transparent hover:border-transparent transition-all duration-200 w-full sm:w-auto"
              asChild
            >
            
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
