"use client"

import { useState, useEffect } from "react"

import { getProfile, ProfileData } from "@/lib/api"
import Cookies from "js-cookie"
import { ProfileForm } from "@/src/components/manufacturer/dashboard/profile/ProfileForm"

export default function EmployeeProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // API dan profil ma'lumotlarini olish
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile()
        setProfile(data)
        // Xodim uchun ID ni cookie'ga saqlash (kerak bo‘lsa)
        if (data.id) {
          Cookies.set("myid", data.id)
        }
      } catch (err) {
        setError("Profil ma'lumotlarini yuklashda xatolik yuz berdi")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  // Yuklanmoqda holati
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Yuklanmoqda...</p>
      </div>
    )
  }

  // Xato holati
  if (error || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-destructive">{error || "Ma'lumotlar topilmadi"}</p>
      </div>
    )
  }

  // API dan kelgan `type` ni o‘zbekchaga aylantirish
  const typeDisplayMap: Record<string, string> = {
    own: "Xususiy",
    state: "Davlat",
  }

  const displayProfile: ProfileData = {
    ...profile,
    type: typeDisplayMap[profile.type] ?? profile.type,
    
  }

  return (
    <div className="bg-gradient-to-b from-background to-background/90 min-h-screen">
      <main className="container mx-auto p-6 md:p-8 max-w-7xl">
        {/* Sarlavha */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-balance tracking-tight">
            Profil
          </h1>
          <p className="text-muted-foreground mt-2 text-base">
            Tashkilot haqidagi ma'lumotlarni ko‘ring
          </p>
        </div>

        {/* Profil formasi (faqat ko‘rish rejimi) */}
        <ProfileForm
          initialData={displayProfile}
          isEditing={false}
          onSave={() => Promise.resolve()} // Hech qanday saqlash yo‘q
          isLoading={false}
          error={null}
          copySuccess={null}
        />
      </main>
    </div>
  )
}