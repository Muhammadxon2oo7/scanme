"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Card } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Package, Plus, X, Building2, AlertCircle, CheckCircle, QrCode } from "lucide-react"
import { useRouter } from "next/navigation"

interface Collaborator {
  id: string
  taxId: string
  organizationName: string
  componentName: string
  componentDescription: string
}

export function AddProductForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [newCollaborator, setNewCollaborator] = useState({
    taxId: "",
    componentName: "",
    componentDescription: "",
  })

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    sku: "",
    description: "",
    price: "",
    weight: "",
    dimensions: "",
    color: "",
    material: "",
    power: "",
    components: "",
    instructions: "",
    warranty: "",
    certifications: "",
  })

  const categories = [
    "Elektronika",
    "Kiyim",
    "Oziq-ovqat",
    "Ichimlik",
    "Uy-ro'zg'or buyumlari",
    "Sport va dam olish",
    "Avtomobil ehtiyot qismlari",
    "Boshqa",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }))
  }

  const addCollaborator = () => {
    if (newCollaborator.taxId && newCollaborator.componentName) {
      const collaborator: Collaborator = {
        id: Date.now().toString(),
        taxId: newCollaborator.taxId,
        organizationName: `Tashkilot ${newCollaborator.taxId}`, 
        componentName: newCollaborator.componentName,
        componentDescription: newCollaborator.componentDescription,
      }
      setCollaborators((prev) => [...prev, collaborator])
      setNewCollaborator({
        taxId: "",
        componentName: "",
        componentDescription: "",
      })
    }
  }

  const removeCollaborator = (id: string) => {
    setCollaborators((prev) => prev.filter((c) => c.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
  
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSuccess(true)
      setTimeout(() => {
        router.push("/manufacturer/products")
      }, 2000)
    } catch (error) {
      console.error("Error creating product:", error)
    } finally {
      setIsLoading(false)
    }
  }
  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">Mahsulot muvaffaqiyatli qo'shildi!</h3>
        <p className="text-muted-foreground mb-4">QR kod yaratildi va mahsulot faollashtirildi</p>
        <div className="flex items-center justify-center gap-2 text-primary">
          <QrCode className="h-5 w-5" />
          <span>QR kod tayyor</span>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Package className="h-5 w-5" />
          Asosiy Ma'lumotlar
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Mahsulot Nomi *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Samsung Galaxy S24 Ultra"
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategoriya *</Label>
            <Select value={formData.category} onValueChange={handleCategoryChange} required>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Kategoriyani tanlang" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sku">SKU/Artikul *</Label>
            <Input
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
              placeholder="SGS24U-256-BLK"
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Narx</Label>
            <Input
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="15,000,000 so'm"
              className="bg-background/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Tavsif</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Mahsulot haqida batafsil ma'lumot..."
            rows={3}
            className="bg-background/50"
          />
        </div>
      </div>

   
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Texnik Xususiyatlar</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Vazn</Label>
            <Input
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="250g"
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dimensions">O'lchamlari</Label>
            <Input
              id="dimensions"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleInputChange}
              placeholder="15.5 x 7.5 x 0.8 sm"
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Rang</Label>
            <Input
              id="color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              placeholder="Qora"
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="material">Material</Label>
            <Input
              id="material"
              name="material"
              value={formData.material}
              onChange={handleInputChange}
              placeholder="Alyuminiy, shisha"
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="power">Quvvat</Label>
            <Input
              id="power"
              name="power"
              value={formData.power}
              onChange={handleInputChange}
              placeholder="5000 mAh"
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="warranty">Kafolat</Label>
            <Input
              id="warranty"
              name="warranty"
              value={formData.warranty}
              onChange={handleInputChange}
              placeholder="2 yil"
              className="bg-background/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="components">Tarkibiy Qismlar</Label>
          <Textarea
            id="components"
            name="components"
            value={formData.components}
            onChange={handleInputChange}
            placeholder="Telefon, zaryadlovchi, quloqchin, hujjatlar..."
            rows={2}
            className="bg-background/50"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          ta'minotchi  Tashkilotlar
        </h2>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Agar mahsulotingiz bir nechta tashkilot tomonidan ishlab chiqarilgan bo'lsa, ta'minotchi  tashkilotlarni qo'shing.
            Ular o'z qismlariga oid ma'lumotlarni to'ldirishi mumkin.
          </AlertDescription>
        </Alert>

       
        <Card className="p-4 bg-background/30">
          <h3 className="font-medium mb-4">Yangi ta'minotchi  Qo'shish</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="collaboratorTaxId">STIR Raqam</Label>
              <Input
                id="collaboratorTaxId"
                value={newCollaborator.taxId}
                onChange={(e) => setNewCollaborator((prev) => ({ ...prev, taxId: e.target.value }))}
                placeholder="123456789"
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="componentName">Qism Nomi</Label>
              <Input
                id="componentName"
                value={newCollaborator.componentName}
                onChange={(e) => setNewCollaborator((prev) => ({ ...prev, componentName: e.target.value }))}
                placeholder="Batareya"
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="componentDescription">Qism Tavsifi</Label>
              <Input
                id="componentDescription"
                value={newCollaborator.componentDescription}
                onChange={(e) => setNewCollaborator((prev) => ({ ...prev, componentDescription: e.target.value }))}
                placeholder="Li-ion batareya"
                className="bg-background/50"
              />
            </div>
          </div>
          <Button
            type="button"
            onClick={addCollaborator}
            className="mt-4 bg-transparent"
            variant="outline"
            disabled={!newCollaborator.taxId || !newCollaborator.componentName}
          >
            <Plus className="mr-2 h-4 w-4" />
            ta'minotchi  Qo'shish
          </Button>
        </Card>

       
        {collaborators.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium">Qo'shilgan ta'minotchi lar</h3>
            {collaborators.map((collaborator) => (
              <Card key={collaborator.id} className="p-4 bg-background/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{collaborator.organizationName}</h4>
                      <p className="text-sm text-muted-foreground">STIR: {collaborator.taxId}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{collaborator.componentName}</Badge>
                        {collaborator.componentDescription && (
                          <span className="text-sm text-muted-foreground">- {collaborator.componentDescription}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeCollaborator(collaborator.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

     
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Qo'shimcha Ma'lumotlar</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="instructions">Foydalanish Yo'riqnomasi</Label>
            <Textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              placeholder="Mahsulotdan qanday foydalanish kerak..."
              rows={3}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="certifications">Sertifikatlar</Label>
            <Input
              id="certifications"
              name="certifications"
              value={formData.certifications}
              onChange={handleInputChange}
              placeholder="ISO 9001, CE, FCC"
              className="bg-background/50"
            />
          </div>
        </div>
      </div>

      
      <div className="flex justify-end gap-4 pt-6 border-t border-border/50">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Bekor Qilish
        </Button>
        <Button type="submit" className="scan-button" disabled={isLoading}>
          {isLoading ? "Saqlanmoqda..." : "Mahsulotni Saqlash"} 
        </Button>
      </div>
    </form>
  )
}
