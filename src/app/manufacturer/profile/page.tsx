"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sidebar } from "@/src/components/manufacturer/Sidebar"
import { ProfileForm } from "@/src/components/manufacturer/dashboard/profile/ProfileForm"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Menu, Building2, Edit2, Save, X } from "lucide-react"
import { partialUpdateProfile, ProfileData } from "@/lib/api"
import Cookies from "js-cookie"

export default function ManufacturerProfilePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const isStaff = Cookies.get('is_staff') !== 'false'

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

  const handleSave = async (data: Partial<ProfileData> | FormData) => {
  try {
    console.log("Saqlash uchun yuborilgan ma'lumotlar:", data);

    if (data instanceof FormData) {

      const token = Cookies.get('token');
      if (!token) throw new Error('Access token topilmadi');

      const response = await fetch('https://api.e-investment.uz/api/v1/accounts/organization/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data, 
      });

      if (!response.ok) {
        throw new Error(`HTTP xato! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("FormData orqali saqlandi:", result);
    } else {
      // Aks holda — oddiy JSON object
      await partialUpdateProfile(data);
    }

    setIsEditing(false);
  } catch (err) {
    console.error("Profilni saqlashda xato:", err);
    throw err;
  }
};

  
  return (
    <div className="bg-gradient-to-b h-screen from-background to-background/90 flex overflow-y-auto">
     
      <main className="w-full md:p-8 ">
        <div className="container mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-balance tracking-tight">
                Profil
              </h1>
              <p className="text-muted-foreground mt-2 text-base">
                Tashkilot ma'lumotlarini ko‘ring {isStaff && "va tahrirlang"}
              </p>
            </div>
            {isStaff && (
              <div>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="bg-transparent border-primary/30 transition-all duration-200 shadow-sm hover:shadow-md hover:border-transparent modern-card"
                  >
                    <Edit2 className="mr-2 h-4 w-4" />
                    Tahrirlash
                  </Button>
                ) : (
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="bg-transparent border-primary/30 transition-all duration-200 shadow-sm hover:shadow-md hover:border-transparent"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Bekor qilish
                    </Button>
                    <Button
                      variant="outline"
                      onClick={async () => {
                        try {
                          const formElement = document.querySelector("form")
                          if (formElement) {
                            formElement.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
                          }
                        } catch (err) {
                          console.error("Saqlash tugmasida xato:", err)
                        }
                      }}
                      className="bg-transparent border-primary/30 transition-all duration-200 shadow-sm hover:shadow-md hover:border-transparent"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Saqlash
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <ProfileForm isEditing={isEditing} onSave={handleSave} />
          </div>
        </div>
      </main>
    </div>
  )
}