"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Building2, Send } from "lucide-react"

interface CollaborationRequestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CollaborationRequestDialog({ open, onOpenChange }: CollaborationRequestDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    targetTaxId: "",
    productName: "",
    componentName: "",
    message: "",
    urgency: "normal",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Collaboration request sent:", formData)
      onOpenChange(false)
      setFormData({
        targetTaxId: "",
        productName: "",
        componentName: "",
        message: "",
        urgency: "normal",
      })
    } catch (error) {
      console.error("Error sending request:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-sm border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            ta'minotchi lik Taklifi Yuborish
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="targetTaxId">ta'minotchi  Tashkilot STIR Raqami *</Label>
            <Input
              id="targetTaxId"
              name="targetTaxId"
              value={formData.targetTaxId}
              onChange={handleChange}
              placeholder="123456789"
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productName">Mahsulot Nomi *</Label>
            <Input
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Samsung Galaxy S24"
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="componentName">Qism/Komponent Nomi *</Label>
            <Input
              id="componentName"
              name="componentName"
              value={formData.componentName}
              onChange={handleChange}
              placeholder="Batareya moduli"
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="urgency">Muhimlik Darajasi</Label>
            <Select
              value={formData.urgency}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, urgency: value }))}
            >
              <SelectTrigger className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Past</SelectItem>
                <SelectItem value="normal">O'rtacha</SelectItem>
                <SelectItem value="high">Yuqori</SelectItem>
                <SelectItem value="urgent">Shoshilinch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Xabar *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="ta'minotchi lik haqida batafsil ma'lumot..."
              rows={4}
              required
              className="bg-background/50"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Bekor Qilish
            </Button>
            <Button type="submit" className="scan-button" disabled={isLoading}>
              <Send className="mr-2 h-4 w-4" />
              {isLoading ? "Yuborilmoqda..." : "Taklif Yuborish"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
