"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sidebar } from "@/src/components/manufacturer/Sidebar"
import { ProfileForm } from "@/src/components/manufacturer/dashboard/profile/ProfileForm"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Menu, Building2, Edit2, Save, X } from "lucide-react"

export default function ManufacturerProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-semibold text-balance tracking-tight">
                  Profil
                </h1>
                <p className="text-muted-foreground mt-2 text-base">
                  Tashkilot ma'lumotlarini ko‘ring va tahrirlang
                </p>
              </div>
              <div>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="bg-transparent  border-primary/30 transition-all duration-200 shadow-sm hover:shadow-md  hover:border-transparent modern-card"
                // className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto modern-card border-primary/30 hover:border-primary/60 light-trail bg-transparent"

                  >
                    <Edit2 className="mr-2 h-4 w-4" />
                    Tahrirlash
                  </Button>
                ) : (
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="bg-transparent  border-primary/30 transition-all duration-200 shadow-sm hover:shadow-md hover:border-transparent"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Bekor qilish
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const profileForm = document.querySelector("form");
                        if (profileForm) {
                          profileForm.dispatchEvent(new Event("submit"));
                        }
                        setIsEditing(false);
                      }}
                      className="bg-transparent  border-primary/30 transition-all duration-200 shadow-sm hover:shadow-md hover:border-transparent"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Saqlash
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
             
                <ProfileForm isEditing={isEditing} onSave={() => setIsEditing(false)} />
           
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}