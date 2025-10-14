"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/src/components/manufacturer/Sidebar"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert"
import { Bell, BellOff, Menu, X } from "lucide-react"  // Icons for notifications
// import { getNotifications, Notification } from "@/lib/api"  // API funksiyasini o'zingiz yarating yoki moslashtiring
import Cookies from "js-cookie"
import { format } from "date-fns"  // Sana formatlash uchun (npm install date-fns)

export default function NotificationsPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)  // Sidebar uchun (agar kerak bo'lsa)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       setIsLoading(true)
//       try {
//         const data = await getNotifications()  // API dan olish (masalan, [{ id: 1, title: "...", description: "...", image: "...", created_at: "..." }])
//         setNotifications(data)
//       } catch (err) {
//         const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
//         setError(errorMessage)
//       } finally {
//         setIsLoading(false)
//       }
//     }
//     fetchNotifications()
//   }, [])

  // Sidebar props (oldingi kodga moslashtirdim, lekin bu sahifada chaqirish kerak bo'lsa)
  // Agar app layout da sidebar bo'lsa, bu yerda kerak emas – faqat content.

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-background/90">
        <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
          <p>Yuklanmoqda...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b from-background to-background/90 flex min-h-screen relative">
      {/* Agar sidebar kerak bo'lsa, quyidagini qo'shing:
      <Sidebar isMobile={isMobile} setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
      {isMobile && isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsSidebarOpen(false)} />}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      )}
      */}

      <main className="flex-1 p-4 sm:p-8 relative z-10">
        <div className="container mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-semibold text-balance tracking-tight">
                Bildirishnomalar
              </h1>
              <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                Yangi habarlar va bildirishnomalarni ko'ring
              </p>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Xato</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {notifications.length === 0 ? (
            // Bo'sh holat: Icon va matn
            <Card className="p-8 sm:p-12 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <BellOff className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">Hozircha hech qanday bildirishnoma yo'q</p>
            </Card>
          ) :''}
        </div>
      </main>
    </div>
  )
}

//  (
//             // Bildirishnomalar ro'yxati
//             // <div className="space-y-4">
//             //   {notifications.map((notif) => (
//             //     <Card
//             //       key={notif.id}
//             //       className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-4"
//             //     >
//             //       {notif.image && (
//             //         <img
//             //           src={notif.image}
//             //           alt={notif.title}
//             //           className="w-full sm:w-32 h-32 object-cover rounded-lg shadow-md"
//             //         />
//             //       )}
//             //       <div className="flex-1 space-y-2">
//             //         <h3 className="text-xl font-semibold">{notif.title}</h3>
//             //         <p className="text-muted-foreground">{notif.description}</p>
//             //         {notif.created_at && (
//             //           <p className="text-sm text-muted-foreground">
//             //             {format(new Date(notif.created_at), "dd.MM.yyyy HH:mm")}
//             //           </p>
//             //         )}
//             //       </div>
//             //       <div className="flex items-end">
//             //         <Button variant="outline" className="modern-card">
//             //           Ko'rish
//             //         </Button>
//             //       </div>
//             //     </Card>
//             //   ))}
//             // </div>
//           )