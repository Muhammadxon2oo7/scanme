// "use client"

// import { useState, useEffect } from "react"
// import { Card } from "@/src/components/ui/card"
// import { Input } from "@/src/components/ui/input"
// import { Label } from "@/src/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
// import { ProfileImageUploader } from "./ProfileImageUploader"
// import { Alert, AlertDescription } from "@/src/components/ui/alert"
// import { AlertCircle } from "lucide-react"
// import { getProfile, ProfileData, partialUpdateProfile } from "@/lib/api"

// interface ProfileFormProps {
//   isEditing: boolean
//   onSave: (data: Partial<ProfileData>) => Promise<void>
// }

// export function ProfileForm({ isEditing, onSave }: ProfileFormProps) {
//   const [profileImage, setProfileImage] = useState<string | null>(null)
//   const [formData, setFormData] = useState<ProfileData>({
//     id: "",
//     name: "",
//     description: "",
//     type: "",
//     stir: "",
//     ceo: "",
//     bank_number: "",
//     mfo: "",
//     email: "",
//     ifut: "",
//     phone: "",
//     region: "",
//     district: "",
//     address: "",
//     created_at: "",
//     updated_at: "",
//   })
//   const [error, setError] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(false)

//   // Tashkilot turini o'zbekchaga aylantirish
//   const typeDisplayMap: Record<string, string> = {
//     own: "Xususiy",
//     state: "Davlat",
   
//   }

//   // O'zbekchadan API formatiga qaytarish
//   const reverseTypeMap: Record<string, string> = {
//     Xususiy: "own",
//     Davlat: "state",
    
//   }

//   // Sana-vaqtni formatlash: kun.oy.yil 00:00 soat
//   const formatDateTime = (dateTime: string): string => {
//     if (!dateTime) return "N/A"
//     try {
//       const date = new Date(dateTime)
//       const day = String(date.getDate()).padStart(2, "0")
//       const month = String(date.getMonth() + 1).padStart(2, "0")
//       const year = date.getFullYear()
//       const hours = String(date.getHours()).padStart(2, "0")
//       const minutes = String(date.getMinutes()).padStart(2, "0")
//       return `${day}.${month}.${year} ${hours}:${minutes}`
//     } catch {
//       return "N/A"
//     }
//   }

//   useEffect(() => {
//     const fetchProfile = async () => {
//       setIsLoading(true)
//       try {
//         const profile = await getProfile()
//         setFormData({
//           ...profile,
//           type: typeDisplayMap[profile.type] || profile.type, // API dan kelgan type ni o'zbekchaga aylantirish
//         })
//         setProfileImage(localStorage.getItem("profileImage") || "/default-avatar.png")
//       } catch (err) {
//         setError("Profil ma'lumotlarini olishda xatolik yuz berdi")
//       } finally {
//         setIsLoading(false)
//       }
//     }
//     fetchProfile()
//   }, [])

//   const handleChange = (name: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleImageChange = (_file: File | null, base64: string | null) => {
//     setProfileImage(base64)
//     if (base64 && base64 !== "/default-avatar.png") {
//       localStorage.setItem("profileImage", base64)
//     } else {
//       localStorage.removeItem("profileImage")
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError(null)
//     setIsLoading(true)

//     try {
//       // Faqat bo'sh bo'lmagan va o'zgartirilgan maydonlarni yuborish
//       const processedData: Partial<ProfileData> = {}
//       Object.entries(formData).forEach(([key, value]) => {
//         if (
//           value &&
//           key !== "id" &&
//           key !== "created_at" &&
//           key !== "updated_at" &&
//           formData[key as keyof ProfileData] !== "" // Bo'sh maydonlarni o'tkazib yuborish
//         ) {
//           processedData[key as keyof ProfileData] = key === "type" ? reverseTypeMap[value] || value : value
//         }
//       })

//       console.log("Yuborilayotgan ma'lumotlar:", processedData) // Debug uchun

//       await onSave(processedData)
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
//       console.error("Saqlashda xato:", errorMessage, err)
//       setError(`Ma'lumotlarni saqlashda xatolik yuz berdi: ${errorMessage}`)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   if (isLoading) {
//     return <p className="text-center">Yuklanmoqda...</p>
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="space-y-6">
//         {error && (
//           <Alert variant="destructive" className="mb-4">
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* Asosiy Card: Rasm, Nom, Tavsif */}
//           <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 col-span-1 md:col-span-1 max-h-96 overflow-y-auto">
//             <div className="space-y-6">
//               <div className="flex flex-col items-center space-y-4">
//                 <ProfileImageUploader
//                   onImageChange={handleImageChange}
//                   currentImage={profileImage}
//                   isEditing={isEditing}
//                 />
//               </div>
//               <div className="space-y-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="name" className="text-lg font-medium">Tashkilot nomi</Label>
//                   <div className="mt-1">
//                     {isEditing ? (
//                       <Input
//                         id="name"
//                         value={formData.name}
//                         onChange={(e) => handleChange("name", e.target.value)}
//                         placeholder="Tashkilot nomini kiriting"
//                         className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full"
//                       />
//                     ) : (
//                       <p className="text-base text-foreground">{formData.name || "N/A"}</p>
//                     )}
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="description" className="text-lg font-medium">Tavsif</Label>
//                   <div className="mt-1">
//                     {isEditing ? (
//                       <Input
//                         id="description"
//                         value={formData.description}
//                         onChange={(e) => handleChange("description", e.target.value)}
//                         placeholder="Tashkilot haqida qisqa ma'lumot"
//                         className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full"
//                       />
//                     ) : (
//                       <p className="text-sm text-foreground">{formData.description || "N/A"}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Card>

//           {/* Tashkilot Ma'lumotlari */}
//           <Card className="py-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 max-h-96 overflow-y-auto">
//             <h3 className="text-lg font-medium mb-4 border-b pb-2 border-primary pl-6">Tashkilot Ma'lumotlari</h3>
//             <div className="space-y-6 px-6">
//               <div className="space-y-2">
//                 <Label htmlFor="type" className="text-lg font-medium">Tashkilot turi</Label>
//                 <div className="mt-1">
//                   {isEditing ? (
//                     <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
//                       <SelectTrigger className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full">
//                         <SelectValue placeholder="Tashkilot turini tanlang" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="Xususiy">Xususiy</SelectItem>
//                         <SelectItem value="Davlat">Davlat</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   ) : (
//                     <p className="text-sm text-foreground">{formData.type || "N/A"}</p>
//                   )}
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="stir" className="text-lg font-medium">STIR</Label>
//                 <div className="mt-1">
//                   {isEditing ? (
//                     <Input
//                       id="stir"
//                       value={formData.stir}
//                       onChange={(e) => handleChange("stir", e.target.value)}
//                       placeholder="STIR raqamini kiriting"
//                       className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full"
//                     />
//                   ) : (
//                     <p className="text-sm text-foreground">{formData.stir || "N/A"}</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </Card>

//           {/* Direktor va Moliyaviy Ma'lumotlar */}
//           <Card className="py-6 px-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 max-h-96 overflow-y-auto">
//             <h3 className="text-lg font-medium mb-4 border-b pb-2 border-primary pl-6">Direktor va Moliyaviy Ma'lumotlar</h3>
//             <div className="space-y-6 px-6">
//               <div className="space-y-0">
//                 <Label htmlFor="ceo" className="text-lg font-medium">Direktor</Label>
//                 <div className="mt-1">
//                   {isEditing ? (
//                     <Input
//                       id="ceo"
//                       value={formData.ceo}
//                       onChange={(e) => handleChange("ceo", e.target.value)}
//                       placeholder="Direktorning ism-familiyasini kiriting"
//                       className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full"
//                     />
//                   ) : (
//                     <p className="text-sm text-foreground">{formData.ceo || "N/A"}</p>
//                   )}
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="bank_number" className="text-lg font-medium">Bank hisob raqami</Label>
//                 <div className="mt-1">
//                   {isEditing ? (
//                     <Input
//                       id="bank_number"
//                       value={formData.bank_number}
//                       onChange={(e) => handleChange("bank_number", e.target.value)}
//                       placeholder="Bank hisob raqamini kiriting"
//                       className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full"
//                     />
//                   ) : (
//                     <p className="text-sm text-foreground">{formData.bank_number || "N/A"}</p>
//                   )}
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="mfo" className="text-lg font-medium">MFO</Label>
//                 <div className="mt-1">
//                   {isEditing ? (
//                     <Input
//                       id="mfo"
//                       value={formData.mfo}
//                       onChange={(e) => handleChange("mfo", e.target.value)}
//                       placeholder="MFO kodini kiriting"
//                       className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full"
//                     />
//                   ) : (
//                     <p className="text-sm text-foreground">{formData.mfo || "N/A"}</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </Card>

//           {/* Aloqa Ma'lumotlari */}
//           <Card className="py-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 max-h-96 overflow-y-auto">
//             <h3 className="text-lg font-medium mb-4 border-b pb-2 border-primary pl-6">Aloqa Ma'lumotlari</h3>
//             <div className="space-y-6 px-6">
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-lg font-medium">Email</Label>
//                 <div className="mt-1">
//                   {isEditing ? (
//                     <Input
//                       id="email"
//                       value={formData.email}
//                       onChange={(e) => handleChange("email", e.target.value)}
//                       placeholder="Email manzilini kiriting"
//                       className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full"
//                     />
//                   ) : (
//                     <p className="text-sm text-foreground">{formData.email || "N/A"}</p>
//                   )}
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="phone" className="text-lg font-medium">Telefon</Label>
//                 <div className="mt-1">
//                   {isEditing ? (
//                     <Input
//                       id="phone"
//                       value={formData.phone}
//                       onChange={(e) => handleChange("phone", e.target.value)}
//                       placeholder="Telefon raqamini kiriting"
//                       className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full"
//                     />
//                   ) : (
//                     <p className="text-sm text-foreground">{formData.phone || "N/A"}</p>
//                   )}
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="ifut" className="text-lg font-medium">IFUT</Label>
//                 <div className="mt-1">
//                   {isEditing ? (
//                     <Input
//                       id="ifut"
//                       value={formData.ifut}
//                       onChange={(e) => handleChange("ifut", e.target.value)}
//                       placeholder="IFUT kodini kiriting"
//                       className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full"
//                     />
//                   ) : (
//                     <p className="text-sm text-foreground">{formData.ifut || "N/A"}</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </Card>

//           {/* Manzil Ma'lumotlari */}
//           <Card className="py-6 to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 max-h-96 overflow-y-auto hover:bg-transparent">
//             <h3 className="text-lg font-medium mb-4 border-b pb-2 border-primary pl-6">Manzil Ma'lumotlari</h3>
//             <div className="space-y-6 px-6">
//               <div className="space-y-2">
//                 <Label htmlFor="region" className="text-lg font-medium">Hudud</Label>
//                 <div className="mt-1">
//                   {isEditing ? (
//                     <Select value={formData.region} onValueChange={(value) => handleChange("region", value)}>
//                       <SelectTrigger className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full">
//                         <SelectValue placeholder="Hududni tanlang" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="Toshkent">Toshkent</SelectItem>
//                         <SelectItem value="Samarqand">Samarqand</SelectItem>
//                         <SelectItem value="Buxoro">Buxoro</SelectItem>
//                         <SelectItem value="Farg‘ona">Farg‘ona</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   ) : (
//                     <p className="text-sm text-foreground">{formData.region || "N/A"}</p>
//                   )}
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="district" className="text-lg font-medium">Tuman</Label>
//                 <div className="mt-1">
//                   {isEditing ? (
//                     <Select value={formData.district} onValueChange={(value) => handleChange("district", value)}>
//                       <SelectTrigger className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full">
//                         <SelectValue placeholder="Tumanni tanlang" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="Chilonzor">Chilonzor</SelectItem>
//                         <SelectItem value="Yunusobod">Yunusobod</SelectItem>
//                         <SelectItem value="Mirzo Ulug‘bek">Mirzo Ulug‘bek</SelectItem>
//                         <SelectItem value="Olmazor">Olmazor</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   ) : (
//                     <p className="text-sm text-foreground">{formData.district || "N/A"}</p>
//                   )}
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="address" className="text-lg font-medium">Manzil</Label>
//                 <div className="mt-1">
//                   {isEditing ? (
//                     <Input
//                       id="address"
//                       value={formData.address}
//                       onChange={(e) => handleChange("address", e.target.value)}
//                       placeholder="To'liq manzilni kiriting"
//                       className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full"
//                     />
//                   ) : (
//                     <p className="text-sm text-foreground">{formData.address || "N/A"}</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </Card>

//           {/* Qo'shimcha Ma'lumotlar */}
//           <Card className="py-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 max-h-96 overflow-y-auto">
//             <h3 className="text-lg font-medium mb-4 border-b pb-2 border-primary pl-6">Qo‘shimcha Ma'lumotlar</h3>
//             <div className="space-y-6 px-6">
//               <div className="space-y-2">
//                 <Label htmlFor="id" className="text-lg font-medium">ID</Label>
//                 <div className="mt-1">
//                   <p className="text-sm text-foreground">{formData.id || "N/A"}</p>
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="created_at" className="text-lg font-medium">Qo‘shilgan vaqti</Label>
//                 <div className="mt-1">
//                   <p className="text-sm text-foreground">{formatDateTime(formData.created_at)}</p>
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="updated_at" className="text-lg font-medium">Profil ma'lumotlari o‘zgargan vaqti</Label>
//                 <div className="mt-1">
//                   <p className="text-sm text-foreground">{formatDateTime(formData.updated_at)}</p>
//                 </div>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </form>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { Card } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { ProfileImageUploader } from "./ProfileImageUploader"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { AlertCircle, Copy } from "lucide-react"
import { getProfile, ProfileData, partialUpdateProfile } from "@/lib/api"
import { Button } from "@/src/components/ui/button"
import Cookies from "js-cookie"
import { Sidebar } from "@/src/components/manufacturer/Sidebar"

interface ProfileFormProps {
  isEditing: boolean
  onSave: (data: Partial<ProfileData> | FormData) => Promise<void>
}

export function ProfileForm({ isEditing, onSave }: ProfileFormProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [profileFile, setProfileFile] = useState<File | null>(null)
  const [formData, setFormData] = useState<ProfileData>({
    id: "",
    name: "",
    description: "",
    type: "",
    stir: "",
    ceo: "",
    bank_number: "",
    mfo: "",
    email: "",
    ifut: "",
    phone: "",
    region: "",
    district: "",
    address: "",
    created_at: "",
    updated_at: "",
    photo: null,
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copySuccess, setCopySuccess] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isStaff = Cookies.get('is_staff') !== 'false'

  // Tashkilot turini o'zbekchaga aylantirish
  const typeDisplayMap: Record<string, string> = {
    own: "Xususiy",
    state: "Davlat",
  }

  // O'zbekchadan API formatiga qaytarish
  const reverseTypeMap: Record<string, string> = {
    Xususiy: "own",
    Davlat: "state",
  }

  // O'zbekiston viloyatlari
  const regions = [
    "Qoraqalpog‘iston Respublikasi",
    "Toshkent shahri",
    "Andijon",
    "Buxoro",
    "Farg‘ona",
    "Jizzax",
    "Xorazm",
    "Namangan",
    "Navoiy",
    "Qashqadaryo",
    "Samarqand",
    "Sirdaryo",
    "Surxondaryo",
    "Toshkent viloyati",
  ]

  // Viloyatlarga mos tumanlar ro'yxati
  const districtsByRegion: Record<string, string[]> = {
    "Toshkent shahri": [
      "Chilonzor",
      "Yunusobod",
      "Mirzo Ulug‘bek",
      "Olmazor",
      "Shayxontohur",
      "Yakkasaroy",
      "Chirchiq",
      "Sergeli",
      "Uchtepa",
      "Bektemir",
      "Mirobod",
    ],
    "Qoraqalpog‘iston Respublikasi": [
      "Nukus shahri",
      "Amudaryo",
      "Beruniy",
      "Chimboy",
      "Ellikqala",
      "Kegeyli",
      "Mo‘ynoq",
      "Nukus tumani",
      "Qanliko‘l",
      "Qo‘ng‘irot",
      "Qorao‘zak",
      "Shumanay",
      "Taxtako‘pir",
      "To‘rtko‘l",
      "Xo‘jayli",
    ],
    Andijon: [
      "Andijon shahri",
      "Asaka",
      "Baliqchi",
      "Bo‘z",
      "Buloqboshi",
      "Izboskan",
      "Jalaquduq",
      "Marhamat",
      "Oltinko‘l",
      "Paxtaobod",
      "Ulug‘nor",
      "Xo‘jaobod",
    ],
    Buxoro: [
      "Buxoro shahri",
      "G‘ijduvon",
      "Jondor",
      "Kogon",
      "Olot",
      "Peshku",
      "Qorako‘l",
      "Qorovulbozor",
      "Romitan",
      "Shofirkon",
      "Vobkent",
    ],
    "Farg‘ona": [
      "Farg‘ona shahri",
      "Altiariq",
      "Bag‘dod",
      "Beshariq",
      "Dang‘ara",
      "Farg‘ona tumani",
      "Furqat",
      "Qo‘shtepa",
      "Rishton",
      "So‘x",
      "Uchko‘prik",
      "Yozyovon",
    ],
    Jizzax: [
      "Jizzax shahri",
      "Arnasoy",
      "Baxmal",
      "Do‘stlik",
      "Forish",
      "G‘allaorol",
      "Mirzacho‘l",
      "Paxtakor",
      "Yangiobod",
      "Zafarobod",
      "Zarbdor",
    ],
    Xorazm: [
      "Urganch shahri",
      "Bog‘ot",
      "Gurlan",
      "Qoshko‘pir",
      "Shovot",
      "Urganch tumani",
      "Xazorasp",
      "Xiva",
      "Yangiariq",
      "Yangibozor",
    ],
    Namangan: [
      "Namangan shahri",
      "Chortoq",
      "Chust",
      "Kosonsoy",
      "Mingbuloq",
      "Namangan tumani",
      "Norin",
      "Pop",
      "To‘raqo‘rg‘on",
      "Uchqo‘rg‘on",
      "Yangiqo‘rg‘on",
    ],
    Navoiy: [
      "Navoiy shahri",
      "Karmana",
      "Konimex",
      "Navbahor",
      "Nurota",
      "Qiziltepa",
      "Tomdi",
      "Uchquduq",
      "Xatirchi",
    ],
    Qashqadaryo: [
      "Qarshi shahri",
      "Chiroqchi",
      "Dehqonobod",
      "G‘uzor",
      "Qamashi",
      "Qarshi tumani",
      "Koson",
      "Muborak",
      "Nishon",
      "Yakkabog‘",
    ],
    Samarqand: [
      "Samarqand shahri",
      "Bulung‘ur",
      "Ishtixon",
      "Jomboy",
      "Kattaqo‘rg‘on",
      "Narpay",
      "Nurobod",
      "Oqdaryo",
      "Paxtachi",
      "Payariq",
      "Urgut",
    ],
    Sirdaryo: [
      "Guliston shahri",
      "Boyovut",
      "Guliston tumani",
      "Mirzaobod",
      "Oqoltin",
      "Sardoba",
      "Sayxunobod",
      "Sirdaryo tumani",
    ],
    Surxondaryo: [
      "Termiz shahri",
      "Angor",
      "Boysun",
      "Denov",
      "Jarqo‘rg‘on",
      "Muzrabod",
      "Oltinsoy",
      "Qiziriq",
      "Sherobod",
      "Sho‘rchi",
    ],
    "Toshkent viloyati": [
      "Nurafshon shahri",
      "Angren",
      "Bekobod",
      "Bo‘ka",
      "Bo‘stonliq",
      "Chirchiq shahri",
      "Oqqo‘rg‘on",
      "Parkent",
      "Piskent",
      "Quyi Chirchiq",
      "Yuqori Chirchiq",
    ],
  }

  // Sana-vaqtni formatlash: kun.oy.yil 00:00 soat
  const formatDateTime = (dateTime: string): string => {
    if (!dateTime) return "N/A"
    try {
      const date = new Date(dateTime)
      const day = String(date.getDate()).padStart(2, "0")
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const year = date.getFullYear()
      const hours = String(date.getHours()).padStart(2, "0")
      const minutes = String(date.getMinutes()).padStart(2, "0")
      return `${day}.${month}.${year} ${hours}:${minutes}`
    } catch {
      return "N/A"
    }
  }

  // ID nusxalash funksiyasi
  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(formData.id)
      setCopySuccess("ID nusxalandi")
      setTimeout(() => setCopySuccess(null), 3000)
    } catch (err) {
      setError("ID nusxalashda xatolik yuz berdi")
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)
      try {
        const profile = await getProfile()
        setFormData({
          ...profile,
          type: typeDisplayMap[profile.type] || profile.type,
          photo: profile.photo || null,
        })
        setProfileImage(profile.photo || "/default-avatar.png")
      } catch (err) {
        setError("Profil ma'lumotlarini olishda xatolik yuz berdi")
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfile()

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

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [name]: value }
      if (name === "region") {
        newData.district = ""
      }
      return newData
    })
  }

  const handleImageChange = (file: File | null, base64: string | null) => {
    setProfileFile(file)
    setProfileImage(base64)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isStaff) {
      setError("xodimlar profilni tahrirlash huquqiga ega emas")
      return
    }
    setError(null)
    setIsLoading(true)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (
          value &&
          key !== "id" &&
          key !== "created_at" &&
          key !== "updated_at" &&
          key !== "photo" &&
          formData[key as keyof ProfileData] !== ""
        ) {
          formDataToSend.append(key, key === "type" ? reverseTypeMap[value] || value : value)
        }
      })

      if (profileFile) {
        formDataToSend.append("photo", profileFile)
      }

      console.log("Yuborilayotgan ma'lumotlar:", Array.from(formDataToSend.entries())) // Debug uchun

      await onSave(formDataToSend)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
      console.error("Saqlashda xato:", errorMessage, err)
      setError(`Ma'lumotlarni saqlashda xatolik yuz berdi: ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <p className="text-center">Yuklanmoqda...</p>
  }

  return (
    <div className="bg-gradient-to-b from-background to-background/90 flex">
      {/* <Sidebar isMobile={isMobile} setIsSidebarOpen={setIsSidebarOpen} /> */}
      <main className="w-full md:p-8">
        <div className="container mx-auto space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {copySuccess && (
                <Alert variant="default" className="mb-4 bg-green-100 text-green-800 border-green-300">
                  <AlertDescription>{copySuccess}</AlertDescription>
                </Alert>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {/* Asosiy Card: Rasm, Nom, Tavsif */}
                <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 col-span-1 md:col-span-1 max-h-96 overflow-y-auto">
                  <div className="space-y-6">
                    <div className="flex flex-col items-center space-y-4">
                      <ProfileImageUploader
                        onImageChange={handleImageChange}
                        currentImage={profileImage}
                        isEditing={isEditing && isStaff}
                      />
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-lg font-medium">Tashkilot nomi</Label>
                        <div className="mt-1">
                          {isEditing && isStaff ? (
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => handleChange("name", e.target.value)}
                              placeholder="Tashkilot nomini kiriting"
                              className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full"
                            />
                          ) : (
                            <p className="text-base text-foreground">{formData.name || "N/A"}</p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-lg font-medium">Tavsif</Label>
                        <div className="mt-1">
                          {isEditing && isStaff ? (
                            <Input
                              id="description"
                              value={formData.description}
                              onChange={(e) => handleChange("description", e.target.value)}
                              placeholder="Tashkilot haqida qisqa ma'lumot"
                              className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full"
                            />
                          ) : (
                            <p className="text-sm text-foreground">{formData.description || "N/A"}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Tashkilot Ma'lumotlari */}
                <Card className="py-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 max-h-96 overflow-y-auto">
                  <h3 className="text-lg font-medium mb-4 border-b pb-2 border-primary pl-6">Tashkilot Ma'lumotlari</h3>
                  <div className="space-y-6 px-6">
                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-lg font-medium">Tashkilot turi</Label>
                      <div className="mt-1">
                        {isEditing && isStaff ? (
                          <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                            <SelectTrigger className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full">
                              <SelectValue placeholder="Tashkilot turini tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Xususiy">Xususiy</SelectItem>
                              <SelectItem value="Davlat">Davlat</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-sm text-foreground">{formData.type || "N/A"}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stir" className="text-lg font-medium">STIR</Label>
                      <div className="mt-1">
                        {isEditing && isStaff ? (
                          <Input
                            id="stir"
                            value={formData.stir}
                            onChange={(e) => handleChange("stir", e.target.value)}
                            placeholder="STIR raqamini kiriting"
                            className="border-primary/30 focus:ring-primary/50 transition-all duration-300 p-3 text-base w-full"
                          />
                        ) : (
                          <p className="text-sm text-foreground">{formData.stir || "N/A"}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Direktor va Moliyaviy Ma'lumotlar */}
                <Card className="py-6 px-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 max-h-96 overflow-y-auto">
                  <h3 className="text-lg font-medium mb-4 border-b pb-2 border-primary pl-6">Direktor va Moliyaviy Ma'lumotlar</h3>
                  <div className="space-y-6 px-6">
                    <div className="space-y-0">
                      <Label htmlFor="ceo" className="text-lg font-medium">Direktor</Label>
                      <div className="mt-1">
                        {isEditing && isStaff ? (
                          <Input
                            id="ceo"
                            value={formData.ceo}
                            onChange={(e) => handleChange("ceo", e.target.value)}
                            placeholder="Direktorning ism-familiyasini kiriting"
                            className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full"
                          />
                        ) : (
                          <p className="text-sm text-foreground">{formData.ceo || "N/A"}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bank_number" className="text-lg font-medium">Bank hisob raqami</Label>
                      <div className="mt-1">
                        {isEditing && isStaff ? (
                          <Input
                            id="bank_number"
                            value={formData.bank_number}
                            onChange={(e) => handleChange("bank_number", e.target.value)}
                            placeholder="Bank hisob raqamini kiriting"
                            className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full"
                          />
                        ) : (
                          <p className="text-sm text-foreground">{formData.bank_number || "N/A"}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mfo" className="text-lg font-medium">MFO</Label>
                      <div className="mt-1">
                        {isEditing && isStaff ? (
                          <Input
                            id="mfo"
                            value={formData.mfo}
                            onChange={(e) => handleChange("mfo", e.target.value)}
                            placeholder="MFO kodini kiriting"
                            className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full"
                          />
                        ) : (
                          <p className="text-sm text-foreground">{formData.mfo || "N/A"}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Aloqa Ma'lumotlari */}
                <Card className="py-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 max-h-96 overflow-y-auto">
                  <h3 className="text-lg font-medium mb-4 border-b pb-2 border-primary pl-6">Aloqa Ma'lumotlari</h3>
                  <div className="space-y-6 px-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-lg font-medium">Email</Label>
                      <div className="mt-1">
                        {isEditing && isStaff ? (
                          <Input
                            id="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="Email manzilini kiriting"
                            className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full"
                          />
                        ) : (
                          <p className="text-sm text-foreground">{formData.email || "N/A"}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-lg font-medium">Telefon</Label>
                      <div className="mt-1">
                        {isEditing && isStaff ? (
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            placeholder="Telefon raqamini kiriting"
                            className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full"
                          />
                        ) : (
                          <p className="text-sm text-foreground">{formData.phone || "N/A"}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ifut" className="text-lg font-medium">IFUT</Label>
                      <div className="mt-1">
                        {isEditing && isStaff ? (
                          <Input
                            id="ifut"
                            value={formData.ifut}
                            onChange={(e) => handleChange("ifut", e.target.value)}
                            placeholder="IFUT kodini kiriting"
                            className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full"
                          />
                        ) : (
                          <p className="text-sm text-foreground">{formData.ifut || "N/A"}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Manzil Ma'lumotlari */}
                <Card className="py-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 max-h-96 overflow-y-auto">
                  <h3 className="text-lg font-medium mb-4 border-b pb-2 border-primary pl-6">Manzil Ma'lumotlari</h3>
                  <div className="space-y-6 px-6">
                    <div className="space-y-2">
                      <Label htmlFor="region" className="text-lg font-medium">Hudud</Label>
                      <div className="mt-1">
                        {isEditing && isStaff ? (
                          <Select value={formData.region} onValueChange={(value) => handleChange("region", value)}>
                            <SelectTrigger className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full">
                              <SelectValue placeholder="Hududni tanlang" />
                            </SelectTrigger>
                            <SelectContent>
                              {regions.map((region) => (
                                <SelectItem key={region} value={region}>
                                  {region}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-sm text-foreground">{formData.region || "N/A"}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district" className="text-lg font-medium">Tuman</Label>
                      <div className="mt-1">
                        {isEditing && isStaff ? (
                          <Select
                            value={formData.district}
                            onValueChange={(value) => handleChange("district", value)}
                            disabled={!formData.region}
                          >
                            <SelectTrigger className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full">
                              <SelectValue placeholder={formData.region ? "Tumanni tanlang" : "Avval hududni tanlang"} />
                            </SelectTrigger>
                            <SelectContent>
                              {formData.region &&
                                districtsByRegion[formData.region]?.map((district) => (
                                  <SelectItem key={district} value={district}>
                                    {district}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-sm text-foreground">{formData.district || "N/A"}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-lg font-medium">Manzil</Label>
                      <div className="mt-1">
                        {isEditing && isStaff ? (
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                            placeholder="To'liq manzilni kiriting"
                            className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 text-base w-full"
                          />
                        ) : (
                          <p className="text-sm text-foreground">{formData.address || "N/A"}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Qo‘shimcha Ma'lumotlar */}
                <Card className="py-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 max-h-96 overflow-y-auto">
                  <h3 className="text-lg font-medium mb-4 border-b pb-2 border-primary pl-6">Qo‘shimcha Ma'lumotlar</h3>
                  <div className="space-y-6 px-6">
                    <div className="space-y-2">
                      <Label htmlFor="id" className="text-lg font-medium">ID</Label>
                      <div className="mt-1 flex items-center gap-2">
                        <p className="text-sm text-foreground">{formData.id || "N/A"}</p>
                        {formData.id && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleCopyId}
                            className="hover:bg-primary"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="created_at" className="text-lg font-medium">Qo‘shilgan vaqti</Label>
                      <div className="mt-1">
                        <p className="text-sm text-foreground">{formatDateTime(formData.created_at)}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="updated_at" className="text-lg font-medium">Profil ma'lumotlari o‘zgargan vaqti</Label>
                      <div className="mt-1">
                        <p className="text-sm text-foreground">{formatDateTime(formData.updated_at)}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}