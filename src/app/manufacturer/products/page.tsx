// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/src/components/ui/button"
// import { Card, CardContent, CardHeader } from "@/src/components/ui/card"
// import { Badge } from "@/src/components/ui/badge"
// import { Input } from "@/src/components/ui/input"
// import { format } from "date-fns"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
// } from "@/src/components/ui/dialog"
// import { Label } from "@/src/components/ui/label"
// import {
//   Package,
//   CheckCircle,
//   RotateCcw,
//   QrCode,
//   Star,
//   StarHalf,
//   StarOff,
//   ScanEyeIcon,
// } from "lucide-react"
// import { categories } from "@/lib/categories"
// import { getAllProductsByStatus, updateProductStatus } from "@/lib/api"
// import { getReverseFieldMap } from "./note"

// const modelToKey: Record<string, string> = {
//   GadgetProduct: "1",
//   MaishiyTexnikaProduct: "2",
//   KiyimProduct: "3",
//   FoodProduct: "4",
//   QurilishProduct: "5",
//   AksessuarProduct: "6",
//   SalomatlikProduct: "7",
//   UyBuyumProduct: "8",
//   KanselyariyaProduct: "9",
// }

// const modelToKeyLower = Object.fromEntries(
//   Object.entries(modelToKey).map(([k, v]) => [k.toLowerCase(), v])
// )

// interface Product {
//   id: string
//   name: string
//   category: string
//   categoryKey: string
//   scans: number
//   rating: number
//   status: "active" | "in-progress" | "pending"
//   details?: Record<string, string>
//   images?: string[]
//   qr_code?: string
//   categoryModel?: string
//   created_at?: string
// }

// const getStatusText = (status: Product["status"]) => {
//   switch (status) {
//     case "active": return "Faol"
//     case "in-progress": return "To'ldirilmoqda"
//     case "pending": return "Tasdiqlanishi kutilmoqda"
//     default: return "Noma'lum"
//   }
// }

// const getStatusVariant = (status: Product["status"]) => {
//   switch (status) {
//     case "active": return "default"
//     case "in-progress": return "outline"
//     case "pending": return "secondary"
//     default: return "secondary"
//   }
// }

// const mapApiStatusToLocal = (apiStatus: string): Product["status"] => {
//   switch (apiStatus) {
//     case "active": return "active"
//     case "draft": return "in-progress"
//     case "pending": return "pending"
//     default: return "in-progress"
//   }
// }

// const mapLocalStatusToApi = (localStatus: Product["status"], categoryModel: string) => {
//   switch (localStatus) {
//     case "active": return { status: "active", category: categoryModel }
//     case "in-progress": return { status: "draft", category: categoryModel }
//     case "pending": return { status: "pending", category: categoryModel }
//     default: return { status: "draft", category: categoryModel }
//   }
// }

// export default function ManufacturerProductsPage() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [products, setProducts] = useState<Product[]>([])
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
//   const [loadingProducts, setLoadingProducts] = useState(true)

//   const fetchProducts = async () => {
//     try {
//       setLoadingProducts(true)
//       const activeData = await getAllProductsByStatus("active")
//       const pendingData = await getAllProductsByStatus("pending")

//       const mappedProducts: Product[] = []

//       ;[activeData, pendingData].forEach((data, index) => {
//         const apiStatus = index === 0 ? "active" : "pending"
//         data.product_categories.forEach((cat: any) => {
//           const key = modelToKey[cat.model] || modelToKeyLower[cat.model.toLowerCase()] || modelToKey[cat.model.charAt(0).toUpperCase() + cat.model.slice(1).toLowerCase()]
//           if (!key) return

//           const categoryName = categories[key].name
//           const reverseMap = getReverseFieldMap(key)
//           const allQuestions = Object.values(categories[key].sections).flatMap(sec => sec.questions.map(q => q.id))

//           cat.items.forEach((item: any) => {
//             const details: Record<string, string> = {}
//             Object.entries(item).forEach(([apiField, value]) => {
//               if (typeof value !== "string" && typeof value !== "number") return
//               if (["id", "status", "scans", "rating", "blockchain_hash", "qr_code", "name", "created_at"].includes(apiField)) return

//               const cleanField = apiField.replace("_org", "")
//               const uiId = reverseMap[cleanField]
//               if (uiId && allQuestions.includes(uiId)) {
//                 details[uiId] = value as string
//               }
//             })

//             details[allQuestions[0]] = item.name || ""

//             let images: string[] = []
//             if (item.images) {
//               images = Array.isArray(item.images) ? item.images : item.image ? [item.image] : []
//             } else if (item.image) {
//               images = [item.image]
//             }

//             mappedProducts.push({
//               id: item.id.toString(),
//               name: item.name || "Noma'lum",
//               category: categoryName,
//               categoryKey: key,
//               scans: item.all_scan || 0,
//               rating: item.rating || 0,
//               status: mapApiStatusToLocal(item.status || apiStatus),
//               details,
//               images,
//               qr_code: item.qr_code,
//               categoryModel: cat.model,
//               created_at: item.created_at,
//             })
//           })
//         })
//       })

//       setProducts(mappedProducts)
//     } catch (error) {
//       console.error("Mahsulotlarni yuklashda xato:", error)
//     } finally {
//       setLoadingProducts(false)
//     }
//   }

//   useEffect(() => {
//     fetchProducts()
//   }, [])

//   const handleStatusChange = async (productId: string, newStatus: Product["status"]) => {
//     if (!selectedProduct) return
//     try {
//       const apiPayload = mapLocalStatusToApi(newStatus, selectedProduct.categoryModel!)
//       await updateProductStatus(productId, apiPayload.status, apiPayload.category)
//       await fetchProducts()
//       const updatedProduct = products.find(p => p.id === productId)
//       if (updatedProduct) setSelectedProduct({ ...updatedProduct, status: newStatus })
//     } catch (error) {
//       console.error("Status o'zgartirishda xato:", error)
//     }
//   }

//   const filteredProducts = products.filter(product =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     product.category.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   const renderProductDetails = (product: Product) => {
//     if (!product.categoryKey || !categories[product.categoryKey]) return null
//     const category = categories[product.categoryKey]

//     return (
//       <div className="space-y-6">
//         <Card className="bg-gradient-to-br from-blue-50/80 to-white/90 border-blue-100 shadow-sm rounded-lg">
//           <CardHeader className="p-4 bg-blue-100/50 rounded-t-lg">
//             <h4 className="text-lg font-medium text-gray-800">Mahsulot Rasmlari</h4>
//           </CardHeader>
//           <CardContent className="p-4">
//             <div className="flex flex-wrap gap-4">
//               {product.images && product.images.length > 0 ? product.images.map((image, index) => (
//                 <img key={index} src={image} alt={`Rasm ${index + 1}`} className="w-24 h-24 object-cover rounded-md border border-blue-200" />
//               )) : (
//                 <div className="w-24 h-24 bg-blue-100/50 rounded-md flex items-center justify-center">
//                   <Package className="h-6 w-6 text-gray-600" />
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {Object.entries(category.sections).map(([sectionId, section]) => (
//           <Card key={sectionId} className="bg-gradient-to-br from-blue-50/80 to-white/90 border-blue-100 shadow-sm rounded-lg">
//             <CardHeader className="p-4 bg-blue-100/50 rounded-t-lg">
//               <h4 className="text-lg font-medium text-gray-800">{section.title}</h4>
//             </CardHeader>
//             <CardContent className="p-4 space-y-4 bg-white/90">
//               {section.questions.map(question => {
//                 const value = product.details?.[question.id] || ""
//                 return (
//                   <div key={question.id} className="space-y-2 bg-white/50 p-3 rounded-md border border-blue-100">
//                     <Label className="text-sm font-medium text-gray-700">{question.label}</Label>
//                     <p className="text-sm text-gray-900 pl-3 border-l-2 border-blue-200">
//                       {value || "Ma'lumot kiritilmagan"}
//                     </p>
//                   </div>
//                 )
//               })}
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     )
//   }

//   return (
//     <div className="flex min-h-screen">
//       <main className="flex-1 md:p-8 p-4">
//         <div className="container mx-auto space-y-6 max-w-5xl">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">Mahsulotlar</h1>
//             <p className="text-gray-600 mt-2">Tasdiqlash uchun mahsulotlarni ko‘ring</p>
//           </div>

//           <Input
//             placeholder="Mahsulot yoki kategoriya bo‘yicha qidirish..."
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//             className="max-w-sm border-blue-200 focus:ring-blue-400 bg-white"
//           />

//           <Card className="p-6 bg-gradient-to-br from-white to-blue-50/80 backdrop-blur-md border border-blue-200/50 shadow-lg rounded-lg">
//             <div className="space-y-4 overflow-y-scroll max-h-[70vh]">
//               {loadingProducts ? (
//                 <p className="text-center text-gray-600 py-6">Yuklanmoqda...</p>
//               ) : filteredProducts.length > 0 ? (
//                 filteredProducts.map(product => (
//                   <Dialog key={product.id} onOpenChange={open => open ? setSelectedProduct(product) : setSelectedProduct(null)}>
//                     <DialogTrigger asChild>
//                       <div className="flex items-center justify-between p-4 rounded-lg bg-white/50 border border-blue-200/50 hover:bg-blue-50/80 transition-all duration-200 hover:shadow-md cursor-pointer">
//                         <div className="flex items-center gap-4 flex-1">
//                           <div className="w-12 h-12 bg-blue-100/50 rounded-lg flex items-center justify-center overflow-hidden">
//                             {product.images?.[0] ? (
//                               <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
//                             ) : (
//                               <Package className="h-6 w-6 text-gray-600" />
//                             )}
//                           </div>
//                           <div>
//                             <h3 className="font-semibold text-gray-800 text-lg">{product.name}</h3>
//                             <p className="text-sm text-gray-600">{product.category}</p>
//                             {product.created_at && (
//                               <p className="text-xs text-gray-500">
//                                 Yaratilgan: {format(new Date(product.created_at), "dd.MM.yyyy HH:mm")}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-4">
//                           {product.status === "active" && (
//                             <div className="flex items-center gap-1">
//                               <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
//                                 {Array.from({ length: 5 }, (_, i) => {
//                                   const starValue = i + 1
//                                   if (product.rating >= starValue) return <Star key={i} className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
//                                   if (product.rating >= starValue - 0.5) return <StarHalf key={i} className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
//                                   return <StarOff key={i} className="h-3.5 w-3.5 text-gray-300" />
//                                 })}
//                               </p>
//                               <p className="text-sm font-medium text-gray-700 flex items-center gap-[2px]">
//                                 <ScanEyeIcon className="h-3 w-3" /> {product.scans}
//                               </p>
//                             </div>
//                           )}
//                           <Badge variant={getStatusVariant(product.status)} className="px-3 py-1 rounded-full">
//                             {getStatusText(product.status)}
//                           </Badge>
//                           {product.status === "active" && product.qr_code && (
//                             <Button variant="ghost" size="sm" onClick={e => { e.stopPropagation(); alert("QR kod yuklab olindi") }}>
//                               <QrCode className="h-4 w-4 text-blue-600" />
//                             </Button>
//                           )}
//                         </div>
//                       </div>
//                     </DialogTrigger>
//                     <DialogContent className="max-w-[90vw] md:max-w-6xl max-h-[90vh] overflow-y-auto bg-white/95 p-6 rounded-xl shadow-2xl border border-blue-200/50">
//                       <DialogHeader className="flex flex-row items-center justify-between border-b border-blue-100 pb-4">
//                         <DialogTitle className="text-2xl font-semibold text-gray-800">
//                           {product.name} tafsilotlari
//                         </DialogTitle>
//                       </DialogHeader>
//                       <div className="space-y-6 mt-4">
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm bg-blue-50/50 p-4 rounded-lg border border-blue-100">
//                           <div><strong className="text-gray-700">Kategoriya:</strong> {product.category}</div>
//                           <div><strong className="text-gray-700">Status:</strong> {getStatusText(product.status)}</div>
//                           {product.created_at && (
//                             <div><strong className="text-gray-700">Yaratilgan:</strong> {format(new Date(product.created_at), "dd.MM.yyyy HH:mm")}</div>
//                           )}
//                         </div>
//                         {renderProductDetails(product)}
//                       </div>
//                       {product.status === "pending" && (
//                         <DialogFooter className="flex gap-3 justify-end mt-6 border-t border-blue-100 pt-4">
//                           <Button variant="outline" onClick={() => handleStatusChange(product.id, "in-progress")} className="border-blue-300 hover:bg-blue-100">
//                             <RotateCcw className="mr-2 h-4 w-4" /> Qaytarib yuborish
//                           </Button>
//                           <Button onClick={() => handleStatusChange(product.id, "active")} className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg">
//                             <CheckCircle className="mr-2 h-4 w-4" /> Tasdiqlash
//                           </Button>
//                         </DialogFooter>
//                       )}
//                     </DialogContent>
//                   </Dialog>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-600 py-6">Mahsulotlar topilmadi.</p>
//               )}
//             </div>
//           </Card>
//         </div>
//       </main>
//     </div>
//   )
// }

"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Input } from "@/src/components/ui/input"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/src/components/ui/dialog"
import { Label } from "@/src/components/ui/label"
import {
  Package,
  CheckCircle,
  RotateCcw,
  QrCode,
  Star,
  StarHalf,
  StarOff,
  ScanEyeIcon,
  X,
  Download,
  Clock,
} from "lucide-react"
import Cookies from "js-cookie"
import { getAllProducts, updateProductStatus, getPartners } from "@/lib/api"

interface Question {
  label: string
  value?: string
  supplierId?: string
}

interface Section {
  title: string
  questions: Question[]
}

interface Product {
  id: string
  name: string
  category: { id: string; name: string }
  status: "draft" | "pending" | "active"
  created_by: string
  qr_code?: string
  created_at: string
  activated_at?: string
  images: string[]
  documents: string[]
  rating: number
  all_scan: number
  sections: Section[]
}

const getStatusText = (status: Product["status"]) => {
  switch (status) {
    case "draft": return "To‘ldirilmoqda"
    case "pending": return "Tasdiqlanishi kutilmoqda"
    case "active": return "Faol"
    default: return status
  }
}

const getStatusVariant = (status: Product["status"]) => {
  switch (status) {
    case "draft": return "secondary"
    case "pending": return "outline"
    case "active": return "default"
    default: return "secondary"
  }
}

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [partners, setPartners] = useState<{ id: string; name: string }[]>([])
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")
  const [qrModalOpen, setQrModalOpen] = useState(false)

  // PARTNERLAR — TO‘G‘RI YUKLASH (myid + owner/partner)
  useEffect(() => {
    const load = async () => {
      const myId = Cookies.get("myid")
      if (!myId) return

      try {
        const data = await getPartners()
        const partnerSet = new Set<string>()
        const mapped: { id: string; name: string }[] = []

        data.forEach((item: any) => {
          let id, name
          if (item.owner.id === myId) {
            id = item.partner.id
            name = item.partner.name
          } else if (item.partner.id === myId) {
            id = item.owner.id
            name = item.owner.name
          }
          if (id && id !== myId && !partnerSet.has(id)) {
            partnerSet.add(id)
            mapped.push({ id, name })
          }
        })
        setPartners(mapped)
      } catch (err) {
        console.error("Hamkorlar yuklanmadi:", err)
      }
    }
    load()
  }, [])

  // MAHSULOTLAR
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true)
      const data = await getAllProducts()
      setProducts(data)
    } catch (error) {
      console.error("Mahsulotlarni yuklashda xato:", error)
    } finally {
      setLoadingProducts(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // STATUS
  const handleStatusChange = async (productId: string, newStatus: "active" | "draft") => {
    try {
      await updateProductStatus(productId, newStatus)
      await fetchProducts()
      setSelectedProduct(prev => prev && prev.id === productId ? { ...prev, status: newStatus } : prev)
    } catch (error) {
      console.error("Status o'zgartirishda xato:", error)
    }
  }

  // SEARCH — faqat name va category
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products
    const term = searchTerm.toLowerCase().trim()
    return products.filter(p =>
      p?.sections[0].questions[0].value?.toLowerCase().includes(term) ||
      p?.category?.name?.toLowerCase().includes(term)
    )
  }, [products, searchTerm])

  // RASIM MODAL
  const openImageModal = (url: string) => {
    setSelectedImage(url)
    setImageModalOpen(true)
  }

  // QR YUKLASH
  // const downloadQR = async () => {
  //   if (!selectedProduct?.qr_code) return
  //   const proxyUrl = `/api/proxy?url=${encodeURIComponent(selectedProduct.qr_code)}`
  //   const link = document.createElement("a")
  //   link.href = proxyUrl
  //   link.download = ""
  //   link.click()
  // }
const downloadQR = async () => {
  if (!selectedProduct?.qr_code) return;

  const productName = selectedProduct.sections[0]?.questions[0]?.value?.trim() || "mahsulot";

  const safeFileName = productName
    .replace(/[^a-zA-Z0-9а-яА-ЯёЁўЎқҚғҒҳҲ ]/g, "")
    .replace(/\s+/g, "_")
    .trim()
    .substring(0, 50);

  const fileName = safeFileName ? `${safeFileName}.png` : `${selectedProduct.id}.png`;
  const proxyUrl = `/api/proxy?url=${encodeURIComponent(selectedProduct.qr_code)}&t=${Date.now()}`;

  try {
    const response = await fetch(proxyUrl, { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch image");

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("QR yuklashda xato:", error);
    alert("QR kodni yuklashda xato yuz berdi.");
  }
};


  // RASMLAR
  const renderImages = (images: string[]) => (
    <div className="flex flex-wrap gap-4">
      {images.length > 0 ? (
        images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Rasm ${i + 1}`}
            className="w-24 h-24 object-cover rounded-md border cursor-pointer hover:opacity-80 transition"
            onClick={() => openImageModal(img)}
          />
        ))
      ) : (
        <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center">
          <Package className="h-6 w-6 text-gray-500" />
        </div>
      )}
    </div>
  )

  // BO‘LIMLAR
  const renderSections = (sections: Section[]) => (
    <div className="space-y-6">
      {sections.map((section, sIdx) => (
        <Card key={sIdx} className="border-blue-100">
          <CardHeader className="p-4 bg-blue-100/50 rounded-t-lg">
            <h4 className="text-lg font-medium">{section.title}</h4>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {section.questions.map((q, qIdx) => {
              const supplier = q.supplierId ? partners.find(p => p.id === q.supplierId) : null
              return (
                <div key={qIdx} className="bg-white/50 p-3 rounded-md border border-blue-100">
                  <Label className="text-sm font-medium">{q.label}</Label>
                  <p className="text-sm pl-3 border-l-2 border-blue-200 flex items-center justify-between">
                    <span>
                      {q.value ? (
                        <span className="font-medium">{q.value}</span>
                      ) : (
                        <span className="text-orange-600 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {supplier?.name || "Ta’minotchi"} tomonidan to‘ldiriladi
                        </span>
                      )}
                    </span>
                    {q.supplierId && q.value && supplier && (
                      <span className="text-green-600 flex items-center gap-1 text-xs font-medium">
                        <CheckCircle className="h-3 w-3" />
                        <span className="hidden sm:inline">{supplier.name}</span>
                      </span>
                    )}
                  </p>
                </div>
              )
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 md:p-8 p-4">
        <div className="container mx-auto space-y-6 max-w-5xl">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">Mahsulotlar (Admin)</h1>
            <p className="text-gray-600 mt-2">Barcha mahsulotlarni ko‘ring va tasdiqlang</p>
          </div>

          {/* SEARCH */}
          <div className="relative max-w-md">
            <Input
              placeholder="Mahsulot yoki kategoriya bo‘yicha qidiring..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 border-blue-200 focus:ring-blue-400 bg-white"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <Card className="p-6 bg-gradient-to-br from-white to-blue-50/80 backdrop-blur-md border border-blue-200/50 shadow-lg rounded-lg">
            <div className="space-y-4 overflow-y-scroll max-h-[70vh]">
              {loadingProducts ? (
                <p className="text-center text-gray-600 py-6">Yuklanmoqda...</p>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <Dialog key={product.id} onOpenChange={open => open ? setSelectedProduct(product) : setSelectedProduct(null)}>
                    <DialogTrigger asChild>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-white/50 border border-blue-200/50 hover:bg-blue-50/80 transition-all duration-200 hover:shadow-md cursor-pointer">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 bg-blue-100/50 rounded-lg flex items-center justify-center overflow-hidden">
                            {product.images[0] ? (
                              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <Package className="h-6 w-6 text-gray-600" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 text-lg">{product.sections.length > 0 ? product.sections[0]?.questions[0]?.value : product.category.name} </h3>
                            <p className="text-sm text-gray-600">{product.category.name}</p>
                            <p className="text-xs text-gray-500">
                              Yaratilgan: {format(new Date(product.created_at), "dd.MM.yyyy HH:mm")}
                              {product.activated_at && ` | Faollashtirilgan: ${format(new Date(product.activated_at), "HH:mm")}`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {product.status === "active" && (
                            <div className="flex items-center gap-1">
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }, (_, i) => {
                                  const starValue = i + 1
                                  if (product.rating >= starValue) return <Star key={i} className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                                  if (product.rating >= starValue - 0.5) return <StarHalf key={i} className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                                  return <StarOff key={i} className="h-3.5 w-3.5 text-gray-300" />
                                })}
                              </div>
                              <p className="text-sm font-medium text-gray-700 flex items-center gap-[2px]">
                                <ScanEyeIcon className="h-3 w-3" /> {product.all_scan}
                              </p>
                            </div>
                          )}
                          <Badge variant={getStatusVariant(product.status)} className="px-3 py-1 rounded-full">
                            {getStatusText(product.status)}
                          </Badge>
                          {product.status === "active" && product.qr_code && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={e => {
                                e.stopPropagation()
                                setSelectedProduct(product)
                                setQrModalOpen(true)
                              }}
                            >
                              <QrCode className="h-4 w-4 text-blue-600" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </DialogTrigger>

                    {/* ASOSIY MODAL */}
                    <DialogContent className="max-w-[90vw] md:max-w-6xl max-h-[90vh] overflow-y-auto bg-white/95 p-6 rounded-xl shadow-2xl border border-blue-200/50">
                      <DialogHeader className="flex flex-row items-center justify-between border-b border-blue-100 pb-4">
                        <DialogTitle className="text-2xl font-semibold text-gray-800">
                          {product.sections.length > 0 ? product.sections[0]?.questions[0]?.value : product.category.name} 
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-6 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                          <div><strong className="text-gray-700">Kategoriya:</strong> {product.category.name}</div>
                          <div><strong className="text-gray-700">Status:</strong> {getStatusText(product.status)}</div>
                          <div>
                            <strong className="text-gray-700">Vaqt:</strong><br />
                            Yaratilgan: {format(new Date(product.created_at), "dd.MM.yyyy HH:mm")}<br />
                            {product.activated_at && `Faollashtirilgan: ${format(new Date(product.activated_at), "dd.MM.yyyy HH:mm")}`}
                          </div>
                        </div>

                        {/* RASMLAR */}
                        <div>
                          <Label className="text-lg font-medium">Rasmlar</Label>
                          <div className="mt-2">{renderImages(product.images)}</div>
                        </div>

                        {/* HUJJATLAR */}
                        {product.documents.length > 0 && (
                          <div>
                            <Label className="text-lg font-medium">Hujjatlar</Label>
                            <div className="flex flex-wrap gap-3 mt-2">
                              {product.documents.map((doc, i) => (
                                <a
                                  key={i}
                                  href={`/api/proxy?url=${encodeURIComponent(doc)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline text-sm flex items-center gap-1"
                                >
                                  {doc.split('/').pop()} <Download className="h-3 w-3" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* BO‘LIMLAR */}
                        {renderSections(product.sections)}
                      </div>

                      {/* TUGMALAR */}
                      {product.status === "pending" && (
                        <DialogFooter className="flex gap-3 justify-end mt-6 border-t border-blue-100 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => handleStatusChange(product.id, "draft")}
                            className="border-blue-300 hover:bg-blue-100"
                          >
                            <RotateCcw className="mr-2 h-4 w-4" /> Qaytarib yuborish
                          </Button>
                          <Button
                            onClick={() => handleStatusChange(product.id, "active")}
                            className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" /> Tasdiqlash
                          </Button>
                        </DialogFooter>
                      )}
                    </DialogContent>
                  </Dialog>
                ))
              ) : (
                <p className="text-center text-gray-600 py-6">Mahsulotlar topilmadi.</p>
              )}
            </div>
          </Card>

          {/* RASIM MODAL — ODDIY, CHIROYLI */}
          <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
            <DialogContent className="max-w-lg p-6">
              <DialogHeader>
                <DialogTitle>Rasm</DialogTitle>
              </DialogHeader>
              <div className="flex justify-center">
                <img src={selectedImage} alt="Katta rasm" className="max-w-full max-h-96 object-contain rounded-lg" />
              </div>
            </DialogContent>
          </Dialog>

          {/* QR MODAL */}
          <Dialog open={qrModalOpen} onOpenChange={setQrModalOpen}>
            <DialogContent className="max-w-xs">
              <DialogHeader>
                <DialogTitle>QR Kod</DialogTitle>
              </DialogHeader>
              {selectedProduct?.qr_code && (
                <div className="flex flex-col items-center space-y-4">
                  <img src={selectedProduct.qr_code} alt="QR" className="w-48 h-48" />
                  <Button onClick={downloadQR} className="w-full">
                    <Download className="mr-2 h-4 w-4" /> Yuklab olish
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  )
}