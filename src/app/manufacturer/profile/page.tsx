// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { Sidebar } from "@/src/components/manufacturer/ManufacturerSidebar.tsx"
// import { ProfileForm } from "@/src/components/manufacturer/dashboard/profile/ProfileForm"
// import { Card } from "@/src/components/ui/card"
// import { Button } from "@/src/components/ui/button"
// import { Menu, Building2, Edit2, Save, X } from "lucide-react"
// import { partialUpdateProfile, ProfileData } from "@/lib/api"
// import Cookies from "js-cookie"

// export default function ManufacturerProfilePage() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false)
//   const [isMobile, setIsMobile] = useState(false)
//   const [isEditing, setIsEditing] = useState(false)
//   const isStaff = Cookies.get('is_staff') !== 'false'

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

//   const handleSave = async (data: Partial<ProfileData> | FormData) => {
//   try {
//     console.log("Saqlash uchun yuborilgan ma'lumotlar:", data);

//     if (data instanceof FormData) {

//       const token = Cookies.get('token');
//       if (!token) throw new Error('Access token topilmadi');

//       const response = await fetch('https://api.e-investment.uz/api/v1/accounts/organization/', {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: data, 
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP xato! Status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log("FormData orqali saqlandi:", result);
//     } else {
//       // Aks holda — oddiy JSON object
//       await partialUpdateProfile(data);
//     }

//     setIsEditing(false);
//   } catch (err) {
//     console.error("Profilni saqlashda xato:", err);
//     throw err;
//   }
// };

  
//   return (
//     <div className="bg-gradient-to-b h-screen from-background to-background/90 flex overflow-y-auto">
     
//       <main className="w-full md:p-8 ">
//         <div className="container mx-auto space-y-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-4xl font-semibold text-balance tracking-tight">
//                 Profil
//               </h1>
//               <p className="text-muted-foreground mt-2 text-base">
//                 Tashkilot ma'lumotlarini ko‘ring {isStaff && "va tahrirlang"}
//               </p>
//             </div>
//             {isStaff && (
//               <div>
//                 {!isEditing ? (
//                   <Button
//                     variant="outline"
//                     onClick={() => setIsEditing(true)}
//                     className="bg-transparent border-primary/30 transition-all duration-200 shadow-sm hover:shadow-md hover:border-transparent modern-card"
//                   >
//                     <Edit2 className="mr-2 h-4 w-4" />
//                     Tahrirlash
//                   </Button>
//                 ) : (
//                   <div className="flex space-x-4">
//                     <Button
//                       variant="outline"
//                       onClick={() => setIsEditing(false)}
//                       className="bg-transparent border-primary/30 transition-all duration-200 shadow-sm hover:shadow-md hover:border-transparent"
//                     >
//                       <X className="mr-2 h-4 w-4" />
//                       Bekor qilish
//                     </Button>
//                     <Button
//                       variant="outline"
//                       onClick={async () => {
//                         try {
//                           const formElement = document.querySelector("form")
//                           if (formElement) {
//                             formElement.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
//                           }
//                         } catch (err) {
//                           console.error("Saqlash tugmasida xato:", err)
//                         }
//                       }}
//                       className="bg-transparent border-primary/30 transition-all duration-200 shadow-sm hover:shadow-md hover:border-transparent"
//                     >
//                       <Save className="mr-2 h-4 w-4" />
//                       Saqlash
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           <div className="space-y-6">
//             <ProfileForm isEditing={isEditing} onSave={handleSave} />
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"

import { getProfile, ProfileData } from "@/lib/api"
import Cookies from "js-cookie"
import { Button } from "@/src/components/ui/button"
import { Edit2, Save, X } from "lucide-react"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { ProfileForm } from "@/src/components/manufacturer/dashboard/profile/ProfileForm"

const typeDisplayMap: Record<string, string> = {
  own: "Xususiy",
  state: "Davlat",
}

export default function ManufacturerProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copySuccess, setCopySuccess] = useState<string | null>(null)
  const [saveLoading, setSaveLoading] = useState(false)

  // Profil ma'lumotlarini olish
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await getProfile()
        setProfile(data)

        // ID ni cookie'ga saqlash (kerak bo‘lsa)
        if (data.id) {
          Cookies.set("myid", data.id)
        }
      } catch (err) {
        setError("Profil ma'lumotlarini yuklashda xatolik yuz berdi")
        console.error("getProfile xatosi:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  // Formani saqlash
  const handleSave = async (formData: FormData) => {
    setSaveLoading(true)
    setError(null)

    try {
      const token = Cookies.get("token")
      if (!token) throw new Error("Kirish tokeni topilmadi")

      const response = await fetch("https://api.e-investment.uz/api/v1/accounts/organization/", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `Xato: ${response.status}`)
      }

      const updatedProfile = await response.json()
      setProfile(updatedProfile)
      setIsEditing(false)

      // Muvaffaqiyatli saqlanganda
      setCopySuccess("Ma'lumotlar muvaffaqiyatli saqlandi!")
      setTimeout(() => setCopySuccess(null), 3000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Noma'lum xato"
      setError(`Saqlashda xato: ${errorMessage}`)
      console.error("Saqlash xatosi:", err)
    } finally {
      setSaveLoading(false)
    }
  }

  // Yuklanmoqda
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Yuklanmoqda...</p>
      </div>
    )
  }

  // Xato
  if (error && !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  // Profil topilmadi
  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Ma'lumotlar topilmadi</p>
      </div>
    )
  }

  // API dan kelgan type ni o‘zbekchaga aylantirish
  const displayProfile: ProfileData = {
    ...profile,
    type: typeDisplayMap[profile.type] ?? profile.type,
  }

  return (
    <div className="bg-gradient-to-b from-background to-background/90 min-h-screen">
      <main className="container mx-auto p-6 md:p-8 max-w-7xl">
        {/* Sarlavha va tugmalar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-semibold text-balance tracking-tight">
              Profil
            </h1>
            <p className="text-muted-foreground mt-2 text-base">
              Tashkilot ma'lumotlarini ko‘ring va tahrirlang
            </p>
          </div>

          <div className="flex gap-3">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Tahrirlash
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="border-primary/30 hover:border-primary/50"
                >
                  <X className="mr-2 h-4 w-4" />
                  Bekor qilish
                </Button>
                <Button
                  onClick={() => {
                    const form = document.querySelector("form")
                    form?.requestSubmit()
                  }}
                  disabled={saveLoading}
                  className="shadow-sm hover:shadow-md"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {saveLoading ? "Saqlanmoqda..." : "Saqlash"}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Xatolik yoki muvaffaqiyat xabarlari */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {copySuccess && (
          <Alert variant="default" className="mb-6 bg-green-100 text-green-800 border-green-300">
            <AlertDescription>{copySuccess}</AlertDescription>
          </Alert>
        )}

        {/* Profil formasi */}
        <ProfileForm
          initialData={displayProfile as ProfileData}
          isEditing={isEditing}
          onSave={handleSave}
          isLoading={saveLoading}
          error={null}
          copySuccess={null}
        />
      </main>
    </div>
  )
}