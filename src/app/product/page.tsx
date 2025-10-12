"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Sidebar } from "@/src/components/manufacturer/Sidebar"
import { ChevronDown, ChevronUp, Building2, Star } from "lucide-react"

/** --- Typelar --- */
type Question = {
  id: string
  label: string
  type: string
  placeholder?: string
}

type Section = {
  title: string
  questions: Question[]
}

type Category = {
  name: string
  sections: Record<string, Section>
}

type CategoriesMap = Record<string, Category>

type ProductDetails = Record<string, string | undefined>

type SuppliersMap = Record<string, string | undefined>

type ProductData = {
  id: string
  name: string
  category: string
  categoryKey: string
  manufacturer: string
  scans: number
  rating: number
  status: string
  images: string[]
  details: ProductDetails
  suppliers: SuppliersMap
}

/** --- Kategoriyalar tuzilmasi (Gadjetlar uchun) --- */
const categories: CategoriesMap = {
  "1": {
    name: "Gadjetlar",
    sections: {
      "1.1": {
        title: "Umumiy ma’lumotlar",
        questions: [
          { id: "1.1.1", label: "Mahsulot nomi va modeli", type: "text", placeholder: "iPhone 17 Pro Max" },
          { id: "1.1.2", label: "Mahsulot turi ", type: "text", placeholder: "Smartfon" },
          { id: "1.1.3", label: "Ishlab chiqarilgan mamlakat", type: "text", placeholder: "Xitoy" },
          { id: "1.1.4", label: "Ishlab chiqaruvchi korxona nomi", type: "text", placeholder: "Apple Inc." },
          { id: "1.1.5", label: "Kafolat muddati", type: "text", placeholder: "1 yil" },
          { id: "1.1.6", label: "Xizmat muddati (yil)", type: "text", placeholder: "3 yil" },
        ],
      },
      "1.2": {
        title: "Texnik xususiyatlar",
        questions: [
          { id: "1.2.1", label: "O‘lchamlari (uzunlik, kenglik, qalinlik)", type: "text", placeholder: "163.7 x 78.5 x 7.9 mm" },
          { id: "1.2.2", label: "Og‘irligi", type: "text", placeholder: "228 g" },
          { id: "1.2.3", label: "Batareya sig‘imi ", type: "text", placeholder: "4500 mAh" },
          { id: "1.2.4", label: "Quvvati ", type: "text", placeholder: "30 W" },
          { id: "1.2.5", label: "Energiya sarfi ", type: "text", placeholder: "0.025 kWh" },
          { id: "1.2.6", label: "Ekran o‘lchami va texnologiyasi", type: "text", placeholder: "6.9 dyuym, OLED ProMotion" },
          { id: "1.2.7", label: "Protsessor turi va chastotasi", type: "text", placeholder: "A19 Pro, 3.5 GHz" },
          { id: "1.2.8", label: "Operativ xotira (RAM) hajmi", type: "text", placeholder: "8 GB" },
          { id: "1.2.9", label: "Doimiy xotira (ROM) hajmi", type: "text", placeholder: "256 GB" },
          { id: "1.2.10", label: "Operatsion tizim", type: "text", placeholder: "iOS 19" },
          { id: "1.2.11", label: "Kamera ko‘rsatkichlari (MP)", type: "text", placeholder: "48 MP + 12 MP + 12 MP" },
          { id: "1.2.12", label: "Yangi texnologiyalar (AI, IoT, 5G) qo‘llanganmi?", type: "text", placeholder: "Ha, 5G, AI, IoT" },
        ],
      },
      "1.3": {
        title: "Material va ekologiya",
        questions: [
          { id: "1.3.1", label: "Materiallar ", type: "text", placeholder: "Alyuminiy, shisha" },
          { id: "1.3.2", label: "Qadoqlash materiali va qayta ishlash imkoniyati", type: "text", placeholder: "Qayta ishlangan karton" },
          { id: "1.3.3", label: "Qayta ishlash imkoniyatlari (batareya, plastmassa)", type: "text", placeholder: "Batareya qayta ishlanadi" },
        ],
      },
      "1.4": {
        title: "Standartlashtirish va sifat nazorati",
        questions: [
          { id: "1.4.1", label: "Sertifikatlari", type: "text", placeholder: "CE, RoHS" },
          { id: "1.4.2", label: "Maxsus xavfsizlik sertifikati mavjudmi?", type: "text", placeholder: "Ha, FCC" },
          { id: "1.4.3", label: "Saqlash va ishlatish bo‘yicha yo‘riqnomasi", type: "text", placeholder: "Qo‘llanmada keltirilgan" },
          { id: "1.4.4", label: "Ta’mirlash imkoniyati (zaxira qismlar mavjudligi)", type: "text", placeholder: "Zaxira qismlar mavjud" },
        ],
      },
    },
  },
}

/** --- Masalan uchun productData (statik) --- */
const productData: ProductData = {
  id: "123456789",
  name: "iPhone 17 Pro Max",
  category: "Gadjetlar",
  categoryKey: "1",
  manufacturer: "Apple Inc.",
  scans: 150,
  rating: 4.8,
  status: "completed",
  images: ["/iphone.png", "/iphone2.png", "/iphone3.png"],
  details: {
    "1.1.1": "iPhone 17 Pro Max",
    "1.1.2": "Smartfon",
    "1.1.3": "Xitoy",
    "1.1.4": "Apple Inc.",
    "1.1.5": "1 yil",
    // "1.1.6" intentionally left blank
    "1.2.1": "163.7 x 78.5 x 7.9 mm",
    "1.2.2": "228 g",
    "1.2.3": "4500 mAh",
    "1.2.4": "30 W",
    "1.2.5": "0.025 kWh",
    "1.2.6": "6.9 dyuym, OLED ProMotion",
    "1.2.7": "A19 Pro, 3.5 GHz",
    "1.2.8": "8 GB",
    "1.2.9": "256 GB",
    "1.2.10": "iOS 19",
    // "1.2.11" and "1.2.12" intentionally left blank
    "1.3.1": "Alyuminiy, shisha",
    "1.3.2": "Qayta ishlangan karton",
    // "1.3.3" intentionally left blank
    "1.4.1": "CE, RoHS, ISO 9001",
    "1.4.2": "Ha, FCC",
    "1.4.3": "Qo‘llanmada keltirilgan",
    "1.4.4": "Zaxira qismlar mavjud",
  },
  suppliers: {
    "1.3.1": "Foxconn",
    "1.3.2": "GreenPack Solutions",
    "1.4.1": "CertiGlobal",
    "1.4.2": "Foxconn",
    "1.4.3": "Apple Inc.",
    "1.4.4": "Apple Inc.",
  },
}

/** --- Komponent --- */
export default function ProductDetailsPage(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
const [openSections, setOpenSections] = useState<Set<string>>(() => new Set())

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const router = useRouter()

  // Avtomatik rasm o'tishi
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % productData.images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Responsivlik
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) setIsSidebarOpen(true)
      else setIsSidebarOpen(false)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev)
      if (next.has(sectionId)) next.delete(sectionId)
      else next.add(sectionId)
      return next
    })
  }

  // Bo‘lim to‘ldirilganlik foizini hisoblash
  const calculateSectionCompletion = (sectionId: string): number => {
    const section = categories["1"].sections[sectionId]
    const totalQuestions = section.questions.length
    const filledQuestions = section.questions.filter((q) => {
      const v = productData.details[q.id]
      return v !== undefined && v !== null && String(v).trim() !== ""
    }).length
    return totalQuestions === 0 ? 0 : (filledQuestions / totalQuestions) * 100
  }

  // Umumiy to‘ldirilganlik foizini hisoblash (har bir savol bo'yicha)
  const calculateOverallCompletion = (): number => {
    const allQuestions = Object.values(categories["1"].sections).flatMap((s) => s.questions)
    const total = allQuestions.length
    const filled = allQuestions.filter((q) => {
      const v = productData.details[q.id]
      return v !== undefined && v !== null && String(v).trim() !== ""
    }).length
    return total === 0 ? 0 : (filled / total) * 100
  }

  // Rangni aniqlash
  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500"
    if (percentage >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  // Touch / Mouse handlers (type-safe)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const getClientXFromEvent = (e: React.TouchEvent | React.MouseEvent): number => {
    if ("touches" in e && e.touches && e.touches.length > 0) {
      return e.touches[0].clientX
    }
    
    return (e as React.MouseEvent).clientX
  }

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = getClientXFromEvent(e)
    setTouchStart(clientX)
  }

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = getClientXFromEvent(e)
    setTouchEnd(clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart !== null && touchEnd !== null) {
      const diff = touchStart - touchEnd
      const threshold = 50
      if (diff > threshold) {
        // swipe left -> next image
        setCurrentImageIndex((prev) => (prev + 1) % productData.images.length)
      } else if (diff < -threshold) {
        // swipe right -> previous image
        setCurrentImageIndex((prev) => (prev - 1 + productData.images.length) % productData.images.length)
      }
    }
    setTouchStart(null)
    setTouchEnd(null)
  }

  // Yulduzli reyting
  const renderRatingStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      const filled = i <= Math.floor(rating)
      stars.push(
        <Star
          key={i}
          aria-hidden
          className={`h-4 w-4 sm:h-5 sm:w-5 ${filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      )
    }
    return stars
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 flex min-h-screen">
      <main className="w-full p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="container mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">{productData.name}</h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">Kategoriya: {productData.category}</p>
              <div className="flex items-center gap-2 mt-2">
                <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                <p className="text-gray-600 text-sm sm:text-base">Ishlab chiqaruvchi: {productData.manufacturer}</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-700">Reyting:</span>
                <div className="flex items-center">{renderRatingStars(productData.rating)}</div>
                <span className="text-sm font-medium text-gray-700">{productData.rating}/5</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-gray-700">To‘ldirilganlik:</span>
                <div className={`h-2 w-24 rounded-full ${getCompletionColor(calculateOverallCompletion())}`} />
                <span className="text-sm font-medium text-gray-700">{Math.round(calculateOverallCompletion())}%</span>
              </div>
            </div>
        
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="bg-gradient-to-br from-white to-blue-50/80 border-blue-200/50 shadow-lg h-[400px] sm:h-[450px] lg:h-[500px]">
              <CardHeader>
                <h2 className="text-lg sm:text-xl font-medium text-gray-800">Mahsulot Rasmi</h2>
              </CardHeader>
              <CardContent
                className="relative overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleTouchStart}
                onMouseMove={handleTouchMove}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
              >
                <img
                  src={productData.images[currentImageIndex]}
                  alt={`${productData.name} - ${currentImageIndex + 1}`}
                  className="w-full h-56 sm:h-64 lg:h-80 object-cover rounded-lg shadow-md cursor-grab"
                />
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-3 gap-2">
                  {productData.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${productData.name} - ${idx + 1}`}
                      className={`w-full h-12 sm:h-16 object-cover rounded-md cursor-pointer ${currentImageIndex === idx ? "border-2 border-blue-500" : ""}`}
                      onClick={() => setCurrentImageIndex(idx)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-2 space-y-4">
              {Object.entries(categories["1"].sections).map(([sectionId, section]) => {
                const completionPercentage = calculateSectionCompletion(sectionId)
                return (
                  <Card
                    key={sectionId}
                    className="bg-gradient-to-br from-blue-50 to-white/90 border-blue-100 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <CardHeader
                      className="flex items-center justify-between p-4 cursor-pointer bg-blue-100/50 hover:bg-blue-200/50 rounded-t-lg"
                      onClick={() => toggleSection(sectionId)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${getCompletionColor(completionPercentage)}`} />
                        <h3 className="text-base sm:text-lg font-medium text-gray-800">{section.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{Math.round(completionPercentage)}%</span>
                        {openSections.has(sectionId) ? (
                          <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                        )}
                      </div>
                    </CardHeader>
                    {openSections.has(sectionId) && (
                      <CardContent className="p-4 bg-white/80">
                        <dl className="space-y-3">
                          {section.questions.map((question) => (
                            <div key={question.id} className="flex flex-col sm:flex-row sm:gap-4">
                              <dt className="text-gray-700 font-medium w-full sm:w-1/2 text-sm sm:text-base">{question.label}</dt>
                              <dd className="text-gray-600 w-full sm:w-1/2 text-sm sm:text-base">
                                {productData.details[question.id] && String(productData.details[question.id]).trim() !== "" ? (
                                  <span>{productData.details[question.id]}</span>
                                ) : (
                                  <span className="text-gray-400 italic">Ma’lumot kiritilmagan</span>
                                )}
                                {productData.suppliers[question.id] && (
                                  <span className="ml-2 text-xs text-gray-500">
                                    (Hamkor: {productData.suppliers[question.id]})
                                  </span>
                                )}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </CardContent>
                    )}
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
