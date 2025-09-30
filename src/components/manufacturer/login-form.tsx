"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function ManufacturerLoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    setIsLoading(true)
    setError("")

    try {
      // IMZO tekshirish jarayonini simulyatsiya qilamiz
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Agar kalit topilsa muvaffaqiyatli bo‘ladi
      setSuccess(true)
      setTimeout(() => router.push("/manufacturer/dashboard"), 1500)
    } catch (err) {
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
      <div className="flex flex-col items-center justify-center py-0">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-6 py-3 text-lg flex items-center gap-2"
        >
          <Image
            src="/icons/eimzo.png"
            alt="eimzo"
            width={20}
            height={20}
            className="w-[20px] h-[20px]"
          />
          {isLoading ? "Tekshirilmoqda..." : "E-IMZO bilan kirish"}
        </Button>
      </div>
    </div>
  )
}
