"use client"

import { useState } from "react"
import { ManufacturerLoginForm } from "@/src/components/manufacturer/login-form"

import { Card } from "@/src/components/ui/card"
import { Building2, User, Hash } from "lucide-react"
import Link from "next/link"
import { EmployeeLoginForm } from "@/src/components/employee/login/login-form"
import { StirLoginForm } from "@/src/components/manufacturer/stir-login-form"

export default function ManufacturerLoginPage() {
  const [selectedRole, setSelectedRole] = useState<"manufacturer" | "employee" | "stir">("manufacturer")

  return (
    <div className="min-h-screen bg-background grid-pattern flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        
          {/* --- Role selector --- */}
          <div className="flex items-center justify-center gap-2 mb-6 p-2 bg-muted/50 rounded-lg">
            <button
              onClick={() => setSelectedRole("manufacturer")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors w-[33%] ${
                selectedRole === "manufacturer"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span className="text-sm font-medium">Tashkilot</span>
            </button>

            <button
              onClick={() => setSelectedRole("stir")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors w-[33%] ${
                selectedRole === "stir"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Hash className="h-4 w-4" />
              <span className="text-sm font-medium">STIR</span>
            </button>

            <button
              onClick={() => setSelectedRole("employee")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors w-[33%] ${
                selectedRole === "employee"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">Xodim</span>
            </button>
          </div>

          {/* --- Header icon and text --- */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              {selectedRole === "manufacturer" ? (
                <Building2 className="h-6 w-6 text-primary" />
              ) : selectedRole === "stir" ? (
                <Hash className="h-6 w-6 text-primary" />
              ) : (
                <User className="h-6 w-6 text-primary" />
              )}
            </div>
            <div>
              <h2 className="font-semibold">
                {selectedRole === "manufacturer"
                  ? "Tashkilot Kirishi"
                  : selectedRole === "stir"
                  ? "STIR orqali kirish"
                  : "Xodim Kirishi"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {selectedRole === "manufacturer"
                  ? "Elektron kalit talab qilinadi"
                  : selectedRole === "stir"
                  ? "Faqat STIR raqamini kiriting"
                  : "Login va parol bilan kirish"}
              </p>
            </div>
          </div>

          {/* --- Forms --- */}
          {selectedRole === "manufacturer" ? (
            <ManufacturerLoginForm />
          ) : selectedRole === "stir" ? (
            <StirLoginForm />
          ) : (
            <EmployeeLoginForm />
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
