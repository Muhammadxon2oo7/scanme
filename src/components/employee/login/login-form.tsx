"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"

interface EmployeeLoginFormProps {
  onSubmit?: (data: { login: string; password: string }) => void
}

export function EmployeeLoginForm({ onSubmit }: EmployeeLoginFormProps) {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()              
    if (onSubmit) {
      onSubmit({ login, password })
    }
    // Bu yerda API chaqiruvi yoki redirect qilishingiz mumkin
    console.log("Hodim login:", { login, password })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login">Login</Label>
        <Input
          id="login"
          type="text"
          placeholder="misol@email.com"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Parol</Label>
        <Input
          id="password"
          type="password"
          placeholder="Parolingizni kiriting"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Kirish
      </Button>
    </form>
  )
}