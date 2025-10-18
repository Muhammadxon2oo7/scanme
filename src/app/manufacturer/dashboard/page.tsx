// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { Sidebar } from "@/src/components/manufacturer/Sidebar"
// import { Button } from "@/src/components/ui/button"
// import { Card } from "@/src/components/ui/card"
// import { Badge } from "@/src/components/ui/badge"
// import { Plus, Eye, Star, Package, Users, BarChart3 } from "lucide-react"
// import { Menu, Building2 } from "lucide-react"

// export default function ManufacturerDashboardPage() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false)
//   const [isMobile, setIsMobile] = useState(false)

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768)
//       if (window.innerWidth >= 768) {
//         setIsSidebarOpen(true)
//       } else {
//         setIsSidebarOpen(false)
//       }
//     }

//     handleResize()
//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [])



//   const recentProducts = [
//     {
//       id: 1,
//       name: "Samsung Galaxy S24",
//       category: "Elektronika",
//       scans: 156,
//       rating: 4.9,
//       status: "active",
//     },
//     {
//       id: 2,
//       name: "Nike Air Max",
//       category: "Kiyim",
//       scans: 89,
//       rating: 4.7,
//       status: "active",
//     },
//     {
//       id: 3,
//       name: "Coca Cola 0.5L",
//       category: "Ichimlik",
//       scans: 234,
//       rating: 4.5,
//       status: "pending",
//     },
//     {
//       id: 4,
//       name: "Apple AirPods Pro",
//       category: "Elektronika",
//       scans: 78,
//       rating: 4.8,
//       status: "active",
//     },
//   ]

//   return (
//     <div className=" bg-gradient-to-b from-background to-background/90 ">
     
//         <main className="flex-1 p-4 md:p-8">
//           <div className="container mx-auto space-y-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-4xl font-semibold text-balance tracking-tight">
//                   Xush kelibsiz!
//                 </h1>
//                 <p className="text-muted-foreground mt-2 text-base">
//                   Mahsulotlaringizni boshqaring va statistikalarni kuzating
//                 </p>
//               </div>
           
//             </div>

           
//             <div className="grid lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2">
//                 <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50">
//                   <div className="flex items-center justify-between mb-6">
//                     <h2 className="text-2xl font-semibold">So'nggi mahsulotlar</h2>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       asChild
//                       className="bg-transparent hover:border-transparent transition-all duration-200"
//                     >
//                       <Link href="/manufacturer/products">
//                         <Eye className="mr-2 h-4 w-4" />
//                         Barchasini ko'rish
//                       </Link>
//                     </Button>
//                   </div>

//                   <div className="space-y-4">
//                     {recentProducts.map((product) => (
//                       <div
//                         key={product.id}
//                         className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50 hover:bg-background/80 transition-all duration-200 hover:shadow-sm"
//                       >
//                         <div className="flex items-center gap-4">
//                           <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
//                             <Package className="h-6 w-6 text-primary transition-transform duration-200 hover:scale-110" />
//                           </div>
//                           <div>
//                             <h3 className="font-semibold">{product.name}</h3>
//                             <p className="text-sm text-muted-foreground">{product.category}</p>
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-4">
//                           <div className="text-right">
//                             <p className="text-sm font-medium">{product.scans} skan</p>
//                             <div className="flex items-center gap-1">
//                               <Star className="h-3 w-3 text-yellow-500 fill-current" />
//                               <span className="text-sm">{product.rating}</span>
//                             </div>
//                           </div>
//                           <Badge
//                             variant={product.status === "active" ? "default" : "secondary"}
//                             className="transition-all duration-200"
//                           >
//                             {product.status === "active" ? "Faol" : "Kutilmoqda"}
//                           </Badge>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </Card>
//               </div>

//               <div className="space-y-6">
//                 <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50">
//                   <h2 className="text-2xl font-semibold mb-4">Tezkor amallar</h2>
//                   <div className="space-y-3">
//                     <Button
//                       variant="outline"
//                       className="w-full justify-start bg-transparent hover:border-transparent transition-all duration-200"
//                       asChild
//                     >
//                       <Link href="/manufacturer/products/add">
//                         <Plus className="mr-2 h-4 w-4" />
//                         Mahsulot qo'shish
//                       </Link>
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className="w-full justify-start bg-transparent hover:border-transparent transition-all duration-200"
//                       asChild
//                     >
//                       <Link href="/manufacturer/analytics">
//                         <BarChart3 className="mr-2 h-4 w-4" />
//                         Statistika ko'rish
//                       </Link>
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className="w-full justify-start bg-transparent hover:border-transparent transition-all duration-200"
//                       asChild
//                     >
//                       <Link href="/manufacturer/collaborators">
//                         <Building2 className="mr-2 h-4 w-4" />
//                         ta'minotchilar
//                       </Link>
//                     </Button>
//                   </div>
//                 </Card>

               
//               </div>
//             </div>
//           </div>
//         </main>
      
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sidebar } from "@/src/components/manufacturer/Sidebar"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Plus, Eye, Star, Package, Users, BarChart3, Building2 } from "lucide-react"
import { Menu } from "lucide-react"
import { getAllProductsByStatus } from "@/lib/api"
import { categories } from "@/lib/categories"

const modelToKey: Record<string, string> = {
  GadgetProduct: "1",
  MaishiyTexnikaProduct: "2",
  KiyimProduct: "3",
  FoodProduct: "4",
  QurilishProduct: "5",
  AksessuarProduct: "6",
  SalomatlikProduct: "7",
  UyBuyumProduct: "8",
  KanselyariyaProduct: "9",
}

const modelToKeyLower: Record<string, string> = Object.fromEntries(
  Object.entries(modelToKey).map(([k, v]) => [k.toLowerCase(), v])
)

interface Product {
  id: string
  name: string
  category: string
  categoryKey: string
  scans: number
  rating: number
  status: "active" | "in-progress" | "pending"
  created_at?: string
  images?: string[]
}

const getStatusText = (status: Product["status"]) => {
  switch (status) {
    case "active":
      return "Faol"
    case "in-progress":
      return "To'ldirilmoqda"
    case "pending":
      return "Kutilmoqda"
    default:
      return "Noma'lum"
  }
}

const getStatusVariant = (status: Product["status"]) => {
  switch (status) {
    case "active":
      return "default"
    case "in-progress":
      return "outline"
    case "pending":
      return "secondary"
    default:
      return "secondary"
  }
}

const mapApiStatusToLocal = (apiStatus: string): Product["status"] => {
  switch (apiStatus) {
    case "active":
      return "active"
    case "draft":
      return "in-progress"
    case "pending":
      return "pending"
    default:
      return "in-progress"
  }
}

export default function ManufacturerDashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [carouselIndex, setCarouselIndex] = useState<Record<string, number>>({})

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true)
      } else {
        setIsSidebarOpen(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const intervals: Record<string, NodeJS.Timeout> = {}
    products.forEach((product) => {
      if (product.images && product.images.length > 1) {
        intervals[product.id] = setInterval(() => {
          setCarouselIndex((prev) => ({
            ...prev,
            [product.id]: ((prev[product.id] || 0) + 1) % product.images!.length,
          }))
        }, 3000)
      }
    })
    return () => {
      Object.values(intervals).forEach(clearInterval)
    }
  }, [products])

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true)
      setError(null)
      const activeData = await getAllProductsByStatus("active")
      const draftData = await getAllProductsByStatus("draft")
      const pendingData = await getAllProductsByStatus("pending")

      const mappedProducts: Product[] = []

      ;[activeData, draftData, pendingData].forEach((data, index) => {
        const apiStatus =
          index === 0 ? "active" : index === 1 ? "draft" : "pending"

        data.product_categories.forEach((cat: any) => {
          const lowerModel = cat.model.toLowerCase()
          const key =
            modelToKey[cat.model] ||
            modelToKeyLower[lowerModel] ||
            modelToKey[
              cat.model.charAt(0).toUpperCase() +
                cat.model.slice(1).toLowerCase()
            ]
          if (!key) return

          const categoryName = categories[key].name

          cat.items.forEach((item: any) => {
            let images: string[] = []
            if (item.images) {
              images = Array.isArray(item.images)
                ? item.images
                : item.image
                ? [item.image]
                : []
            } else if (item.image) {
              images = [item.image]
            }

            mappedProducts.push({
              id: item.id.toString(),
              name: item.name || "Noma'lum",
              category: categoryName,
              categoryKey: key,
              scans: item.scans || 0,
              rating: item.rating || 0,
              status: mapApiStatusToLocal(item.status || apiStatus),
              created_at: item.created_at,
              images,
            })
          })
        })
      })

      // Eng so'nggi mahsulotlar yuqorida bo'lishi uchun saralash
      mappedProducts.sort((a, b) => {
        if (!a.created_at || !b.created_at) return 0
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      })

      // Faqat eng so'nggi 4 ta mahsulotni olish
      setProducts(mappedProducts.slice(0, 4))
    } catch (error) {
      console.error("Mahsulotlarni yuklashda xato:", error)
      setError("Mahsulotlarni yuklashda xatolik yuz berdi")
    } finally {
      setLoadingProducts(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="bg-gradient-to-b from-background to-background/90">
      <main className="flex-1 p-4 md:p-8">
        <div className="container mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-balance tracking-tight">
                Xush kelibsiz!
              </h1>
              <p className="text-muted-foreground mt-2 text-base">
                Mahsulotlaringizni boshqaring va statistikalarni kuzating
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">So'nggi mahsulotlar</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="bg-transparent hover:border-transparent transition-all duration-200"
                  >
                    <Link href="/manufacturer/products">
                      <Eye className="mr-2 h-4 w-4" />
                      Barchasini ko'rish
                    </Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  {loadingProducts ? (
                    <p className="text-center text-muted-foreground py-6">
                      Yuklanmoqda...
                    </p>
                  ) : error ? (
                    <p className="text-center text-red-500 py-6">{error}</p>
                  ) : products.length > 0 ? (
                    products.map((product) => {
                      const currentIdx = carouselIndex[product.id] || 0
                      const hasImages = product.images && product.images.length > 0
                      const displayImg = hasImages ? product?.images?[currentIdx] : null :""
                      return (
                        <div
                          key={product.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50 hover:bg-background/80 transition-all duration-200 hover:shadow-sm"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center overflow-hidden">
                              {hasImages ? (
                                <img
                                  src={`${displayImg}`}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Package className="h-6 w-6 text-primary transition-transform duration-200 hover:scale-110" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold">{product.name}</h3>
                              <p className="text-sm text-muted-foreground">{product.category}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-medium">{product.scans} skan</p>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span className="text-sm">{product.rating}</span>
                              </div>
                            </div>
                            <Badge
                              variant={getStatusVariant(product.status)}
                              className="transition-all duration-200"
                            >
                              {getStatusText(product.status)}
                            </Badge>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-center text-muted-foreground py-6">
                      Mahsulotlar topilmadi.
                    </p>
                  )}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50">
                <h2 className="text-2xl font-semibold mb-4">Tezkor amallar</h2>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent hover:border-transparent transition-all duration-200"
                    asChild
                  >
                    <Link href="/manufacturer/products/add">
                      <Plus className="mr-2 h-4 w-4" />
                      Mahsulot qo'shish
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent hover:border-transparent transition-all duration-200"
                    asChild
                  >
                    <Link href="/manufacturer/analytics">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Statistika ko'rish
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent hover:border-transparent transition-all duration-200"
                    asChild
                  >
                    <Link href="/manufacturer/collaborators">
                      <Building2 className="mr-2 h-4 w-4" />
                      Ta'minotchilar
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}