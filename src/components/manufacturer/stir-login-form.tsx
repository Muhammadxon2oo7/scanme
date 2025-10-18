"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { manufacturerLogin } from "@/lib/api"

export function StirLoginForm() {
  const [stir, setStir] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    if (!stir.trim()) {
      setError("Iltimos, STIR raqamini kiriting.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await manufacturerLogin({
          stir,
          password: ".",
          name: ".",
          description: ".",
          ceo: ".",
          bank_number: ".",
          mfo: ".",
          email: "email@gmail.com",
          phone: ".",
          ifut: ".",
          region: ".",
          district: ".",
          address: "."
      })
      if (response.tokens?.access) {
        setSuccess(true)
        setTimeout(() => router.push("/manufacturer/profile"), 1500)
      } else {
        setError(response.message || "Kirishda xatolik yuz berdi.")
      }
    } catch {
      setError("Tizimda xatolik yuz berdi. Qaytadan urinib ko‘ring.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Muvaffaqiyatli!</h3>
        <p className="text-muted-foreground">
          Dashboard sahifasiga yo‘naltirilmoqda...
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive" className="mb-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Input
        type="text"
        placeholder="STIR raqamingizni kiriting"
        value={stir}
        onChange={(e) => setStir(e.target.value)}
        disabled={isLoading}
      />

      <Button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full py-2 text-base"
      >
        {isLoading ? "Tekshirilmoqda..." : "Kirish"}
      </Button>
    </div>
  )
}
