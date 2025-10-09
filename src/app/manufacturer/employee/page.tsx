"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/src/components/manufacturer/Sidebar"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert"
import { AlertCircle, Edit2, Save, X } from "lucide-react"
import { getEmployeeProfile, updateEmployeeProfile, Employee, EmployeeData } from "@/lib/api"
import Cookies from "js-cookie"

export default function EmployeeProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<Employee | null>(null)
  const [formData, setFormData] = useState<Partial<EmployeeData>>({
    username: "",
    first_name: "",
    last_name: "",
    jshshir: "",
  })
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (profile) {
        await updateEmployeeProfile(profile.id, formData)
        setProfile({ ...profile, ...formData })
        setIsEditing(false)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && !profile) {
    return (
      <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
        <p>Yuklanmoqda...</p>
      </Card>
    )
  }

  return (
    <div className="bg-gradient-to-b from-background to-background/90 flex">
      {/* <Sidebar isMobile={isMobile} setIsSidebarOpen={setIsSidebarOpen} /> */}
      <main className="w-full md:p-8">
        <div className="container mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-balance tracking-tight">
                Ma'lumotlarim
              </h1>
              <p className="text-muted-foreground mt-2 text-base">
                Shaxsiy ma'lumotlaringizni ko‘ring va tahrirlang
              </p>
            </div>
            <div>
              {!isEditing ? (
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="bg-transparent border-primary/30 transition-all duration-200 shadow-sm hover:shadow-md hover:border-transparent modern-card"
                >
                  <Edit2 className="mr-2 h-4 w-4" />
                  Tahrirlash
                </Button>
              ) : (
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="bg-transparent border-primary/30 transition-all duration-200 shadow-sm hover:shadow-md hover:border-transparent"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Bekor qilish
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleSave}
                    className="bg-transparent border-primary/30 transition-all duration-200 shadow-sm hover:shadow-md hover:border-transparent"
                    disabled={isLoading}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? "Yuklanmoqda..." : "Saqlash"}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Xato</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
            {profile && (
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Foydalanuvchi nomi</Label>
                  <Input
                    id="username"
                    value={formData.username || ""}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="Foydalanuvchi nomini kiriting"
                    disabled={!isEditing}
                    className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="first_name">Ism</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name || ""}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    placeholder="Ismingizni kiriting"
                    disabled={!isEditing}
                    className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Familiya</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name || ""}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    placeholder="Familiyangizni kiriting"
                    disabled={!isEditing}
                    className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jshshir">JSHSHIR</Label>
                  <Input
                    id="jshshir"
                    value={formData.jshshir || ""}
                    onChange={(e) => setFormData({ ...formData, jshshir: e.target.value })}
                    placeholder="JSHSHIRni kiriting"
                    disabled={!isEditing}
                    className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
                  />
                </div>
              </form>
            )}
          </Card>
        </div>
      </main>
    </div>
  )
}