"use client"  
import { useState } from "react"
import { ManufacturerLoginForm } from "@/src/components/manufacturer/login-form"
import { Card } from "@/src/components/ui/card"
import { Building2, User, QrCode } from "lucide-react"
import Link from "next/link"
import { EmployeeLoginForm } from "@/src/components/employee/login/login-form"

export default function ManufacturerLoginPage() {
  const [selectedRole, setSelectedRole] = useState<"manufacturer" | "employee">("manufacturer")

  return (
    <div className="min-h-screen bg-background grid-pattern flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          {/* Role tanlash tugmalari */}
          <div className="flex items-center justify-center gap-4 mb-6 p-2 bg-muted/50 rounded-lg">
            <button
              onClick={() => setSelectedRole("manufacturer")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors w-[50%] ${
                selectedRole === "manufacturer"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span className="text-sm font-medium">Tashkilot</span>
            </button>
            <button
              onClick={() => setSelectedRole("employee")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors w-[50%] ${
                selectedRole === "employee"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">Hodim</span>
            </button>
          </div>

          {/* Sarlavha va tavsif — role ga qarab o'zgaradi */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              {selectedRole === "manufacturer" ? (
                <Building2 className="h-6 w-6 text-primary" />
              ) : (
                <User className="h-6 w-6 text-primary" />
              )}
            </div>
            <div>
              <h2 className="font-semibold">
                {selectedRole === "manufacturer" ? "Tashkilot Kirishi" : "Hodim Kirishi"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {selectedRole === "manufacturer"
                  ? "Elektron kalit talab qilinadi"
                  : "Login va parol bilan kirish"}
              </p>
            </div>
          </div>

          {/* Forma — role ga qarab render qilinadi */}
          {selectedRole === "manufacturer" ? (
            <ManufacturerLoginForm />
          ) : (
            <EmployeeLoginForm         />
          )}
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Asosiy sahifaga qaytish
          </Link>
        </div>
      </div>
    </div>
  )
}