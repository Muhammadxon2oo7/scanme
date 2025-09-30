"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Card } from "@/src/components/ui/card"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { Building2, Key, AlertCircle, CheckCircle, Mail, FileKey } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function ManufacturerLoginForm() {
  const [loginMethod, setLoginMethod] = useState<"email" | "eimzo">("email")
  const [formData, setFormData] = useState({
    organizationName: "",
    taxId: "",
    electronicKey: "",
    contactEmail: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (loginMethod === "email") {
        if (formData.contactEmail && formData.electronicKey) {
          setSuccess(true)
          setTimeout(() => router.push("/manufacturer/dashboard"), 1500)
        } else {
          setError("Email yoki elektron kalit noto'g'ri")
        }
      } else if (loginMethod === "eimzo") {
        // faqat tugma bosilganda ishlaydi
        setSuccess(true)
        setTimeout(() => router.push("/manufacturer/dashboard"), 1500)
      }
    } catch (err) {
      setError("Tizimda xatolik yuz berdi. Qaytadan urinib ko'ring.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Muvaffaqiyatli!</h3>
        <p className="text-muted-foreground">Dashboard sahifasiga yo'naltirilmoqda...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Login usulini tanlash */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant={loginMethod === "email" ? "default" : "outline"}
          onClick={() => setLoginMethod("email")}
          className="flex-1"
        >
          <Mail className="mr-2 h-4 w-4" />
          Email orqali
        </Button>
        <Button
          type="button"
          variant={loginMethod === "eimzo" ? "default" : "outline"}
          onClick={() => setLoginMethod("eimzo")}
          className="flex-1"
        >
          <FileKey className="mr-2 h-4 w-4" />
          E-IMZO orqali
        </Button>
      </div>

      {loginMethod === "email" ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="organizationName">Tashkilot Nomi</Label>
            <Input
              id="organizationName"
              name="organizationName"
              type="text"
              placeholder="Tashkilot nomini kiriting"
              value={formData.organizationName}
              onChange={handleChange}
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactEmail">Aloqa Email</Label>
            <Input
              id="contactEmail"
              name="contactEmail"
              type="email"
              placeholder="contact@company.uz"
              value={formData.contactEmail}
              onChange={handleChange}
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="electronicKey">Elektron Kalit</Label>
            <Input
              id="electronicKey"
              name="electronicKey"
              type="password"
              placeholder="Elektron kalitni kiriting"
              value={formData.electronicKey}
              onChange={handleChange}
              required
              className="bg-background/50"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            <Key className="mr-2 h-4 w-4" />
            {isLoading ? "Tekshirilmoqda..." : "Tizimga Kirish"}
          </Button>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-6 py-3 text-lg"
          >
            <Image src="/icons/eimzo.png" alt="eimzo" width={50} height={50}  className="w-[20px] "/>
            {isLoading ? "Tekshirilmoqda..." : "-IMZO bilan kirish"}
          </Button>
        </div>
      )}

      <Card className="p-4 bg-muted/50">
        <div className="flex items-start gap-3">
          <Building2 className="h-5 w-5 text-primary mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-1">Login usullari haqida</p>
            {loginMethod === "email" ? (
              <p className="text-muted-foreground">
                Email orqali kirishda sizga tashkilot email manzili va elektron kalit kerak bo‘ladi.
              </p>
            ) : (
              <p className="text-muted-foreground">
                E-IMZO orqali kirishda faqat E-IMZO kalitingiz bilan tizimga kirishingiz mumkin.
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
