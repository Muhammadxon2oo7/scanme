"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/src/components/manufacturer/Sidebar"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert"
import { AlertCircle, Key, X, Menu } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog"
import { getEmployeeProfile, updateEmployeeProfile, Employee, EmployeeData } from "@/lib/api"
import Cookies from "js-cookie"
import { motion, AnimatePresence } from "framer-motion"
import { DialogTrigger } from "@radix-ui/react-dialog"

export default function EmployeeProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [profile, setProfile] = useState<Employee | null>(null)
  const [formData, setFormData] = useState<Partial<EmployeeData>>({
    username: "",
    first_name: "",
    last_name: "",
    jshshir: "",
  })
  const [newPassword, setNewPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

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

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)
      try {
        const data = await getEmployeeProfile()
        setProfile(data)
        setFormData({
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name,
          jshshir: data.jshshir,
        })
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      if (profile) {
        await updateEmployeeProfile(profile.id, {
          password: newPassword,
          username: profile.username,
          first_name: profile.first_name,
          last_name: profile.last_name,
          jshshir: profile.jshshir,
        })
        setIsPasswordModalOpen(false)
        setNewPassword("")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const newState = !prev
      if (newState && "vibrate" in navigator) {
        navigator.vibrate(50)
      }
      return newState
    })
  }

  if (isLoading && !profile) {
    return (
      <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
        <p>Yuklanmoqda...</p>
      </Card>
    )
  }

  return (
    <div className="bg-gradient-to-b from-background to-background/90 flex min-h-screen relative">
      
      <main className="flex-1 p-4 sm:p-8 relative z-10">
    
        <div className="container mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-semibold text-balance tracking-tight">
                Ma'lumotlarim
              </h1>
              <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                Shaxsiy ma'lumotlaringizni ko‘ring yoki parolingizni o‘zgartiring
              </p>
            </div>
            <Dialog open={isPasswordModalOpen} onOpenChange={(open) => {
              setIsPasswordModalOpen(open)
              if (!open) {
                setNewPassword("")
                setError(null)
              }
            }}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-transparent border-primary/30 transition-all duration-200 shadow-sm hover:shadow-md hover:border-transparent modern-card w-full sm:w-auto"
                >
                  <Key className="mr-2 h-4 w-4" />
                  Parolni almashtirish
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card/90 backdrop-blur-md max-w-[95vw] sm:max-w-md rounded-lg">
                <DialogHeader>
                  <DialogTitle>Parolni almashtirish</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="new_password">Yangi parol</Label>
                    <Input
                      id="new_password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Yangi parolni kiriting"
                      required
                      className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 w-full"
                    />
                  </div>
                  <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsPasswordModalOpen(false)}
                      className="w-full sm:w-auto"
                    >
                      Bekor qilish
                    </Button>
                    <Button
                      type="submit"
                      className="w-full sm:w-auto"
                      disabled={isLoading}
                    >
                      {isLoading ? "Yuklanmoqda..." : "Saqlash"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {error && !isPasswordModalOpen && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Xato</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
            {profile && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Foydalanuvchi nomi</Label>
                  <Input
                    id="username"
                    value={formData.username || ""}
                    disabled
                    className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="first_name">Ism</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name || ""}
                    disabled
                    className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Familiya</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name || ""}
                    disabled
                    className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jshshir">JSHSHIR</Label>
                  <Input
                    id="jshshir"
                    value={formData.jshshir || ""}
                    disabled
                    className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
                  />
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  )
}