"use client"

import { Card } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Star, Package, Shield, Building2, QrCode, Heart, Share2 } from "lucide-react"
import { useState } from "react"

interface ProductDetailsProps {
  productId: string
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const [isLiked, setIsLiked] = useState(false)

 
  const product = {
    id: productId,
    name: "Samsung Galaxy S24 Ultra",
    category: "Elektronika",
    manufacturer: "Samsung Electronics",
    manufacturerTaxId: "123456789",
    description:
      "Eng so'nggi texnologiyalar bilan jihozlangan premium smartfon. Professional fotografiya va yuqori unumdorlik uchun yaratilgan.",
    price: "15,000,000 so'm",
    specifications: {
      weight: "233g",
      dimensions: "162.3 x 79.0 x 8.6 mm",
      color: "Titanium Black",
      material: "Titanium, Gorilla Glass Victus 2",
      power: "5000 mAh batareya",
      warranty: "2 yil xalqaro kafolat",
    },
    components: ["Smartfon", "25W tez zaryadlovchi", "USB-C kabel", "SIM ejector tool", "Foydalanuvchi qo'llanmasi"],
    certifications: ["CE", "FCC", "RoHS"],
    rating: 4.8,
    reviewCount: 1247,
    scanCount: 15420,
    image: "/samsung-smartphone.png",
    collaborators: [
      {
        name: "TechComponents LLC",
        taxId: "987654321",
        component: "Batareya moduli",
      },
      {
        name: "DisplayTech Co",
        taxId: "456789123",
        component: "AMOLED displey",
      },
    ],
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Havola nusxalandi!")
    }
  }

  return (
    <div className="space-y-8">
     
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg bg-muted"
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge variant="outline">
                  <QrCode className="mr-1 h-3 w-3" />
                  QR Skanlar: {product.scanCount.toLocaleString()}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-balance mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-500 fill-current" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="font-medium ml-2">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviewCount.toLocaleString()} sharh)</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">{product.description}</p>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={handleLike}
                  className={`${isLiked ? "bg-red-500/10 border-red-500/20 text-red-600" : ""}`}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                  {isLiked ? "Yoqdi" : "Yoqtirish"}
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Ulashish
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Package className="h-5 w-5" />
            Texnik Xususiyatlar
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Vazn:</span>
              <span className="font-medium">{product.specifications.weight}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">O'lchamlari:</span>
              <span className="font-medium">{product.specifications.dimensions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rang:</span>
              <span className="font-medium">{product.specifications.color}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Material:</span>
              <span className="font-medium">{product.specifications.material}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Batareya:</span>
              <span className="font-medium">{product.specifications.power}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Kafolat:</span>
              <span className="font-medium">{product.specifications.warranty}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Narx:</span>
              <span className="font-medium text-primary">{product.price}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Ishlab Chiqaruvchi
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">{product.manufacturer}</h3>
              <p className="text-sm text-muted-foreground">STIR: {product.manufacturerTaxId}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Sertifikatlar: {product.certifications.join(", ")}</span>
              </div>
            </div>
            {product.collaborators.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">ta'minotchi  Tashkilotlar:</h4>
                <div className="space-y-2">
                  {product.collaborators.map((collaborator, index) => (
                    <div key={index} className="text-sm">
                      <p className="font-medium">{collaborator.name}</p>
                      <p className="text-muted-foreground">
                        {collaborator.component} - STIR: {collaborator.taxId}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <h2 className="text-xl font-semibold mb-4">Quti Tarkibi</h2>
          <div className="space-y-2">
            {product.components.map((component, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">{component}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
