"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Building2, Key, AlertCircle, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export function ManufacturerLoginForm() {
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

    // Simulate API call for authentication
    try {
      // Here would be the actual authentication logic
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate successful login
      if (formData.electronicKey && formData.taxId) {
        setSuccess(true)
        setTimeout(() => {
          router.push("/manufacturer/dashboard")
        }, 1500)
      } else {
        setError("Elektron kalit yoki STIR raqam noto'g'ri")
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
        <Label htmlFor="taxId">STIR Raqam</Label>
        <Input
          id="taxId"
          name="taxId"
          type="text"
          placeholder="123456789"
          value={formData.taxId}
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

      <Button type="submit" className="w-full scan-button" disabled={isLoading}>
        <Key className="mr-2 h-4 w-4" />
        {isLoading ? "Tekshirilmoqda..." : "Tizimga Kirish"}
      </Button>

      <Card className="p-4 bg-muted/50">
        <div className="flex items-start gap-3">
          <Building2 className="h-5 w-5 text-primary mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-1">Elektron Kalit Haqida</p>
            <p className="text-muted-foreground">
              Elektron kalit - bu tashkilotingizning rasmiy identifikatori. Uni soliq qo'mitasidan yoki MyID tizimidan
              olishingiz mumkin.
            </p>
          </div>
        </div>
      </Card>
    </form>
  )
}
