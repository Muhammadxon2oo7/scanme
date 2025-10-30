// "use client"

// import { useState } from "react"
// import { usePathname } from "next/navigation"
// import Link from "next/link"
// import { Button } from "@/src/components/ui/button"
// import Cookies from "js-cookie"
// import { 
//   Building2, 
//   LogOut, 
//   User, 
//   Package, 
//   BarChart3, 
//   Users, 
//   LayoutDashboard,
//   Menu,
//   X,
//   Bell  // Yangi import: Bell icon uchun
// } from "lucide-react"

// export function Sidebar({ isMobile, setIsSidebarOpen, isSidebarOpen }: { isMobile: boolean; setIsSidebarOpen: (open: boolean) => void; isSidebarOpen: boolean }) {
//   const pathname = usePathname()
//   const isStaff = Cookies.get('is_staff') !== 'false'

//   const handleLogout = () => {
//     console.log("Logout: token va refresh_token o'chirilmoqda")
//     Cookies.remove("token")
//     Cookies.remove("refresh_token")
//     Cookies.remove("is_staff")
//     console.log("Cookie'lar o'chirildi, yo'naltirilmoqda: /")
//     window.location.href = "/"
//   }

//   const menuItems = isStaff
//     ? [
//         { name: "Dashboard", path: "/manufacturer/dashboard", icon: LayoutDashboard },
//         { name: "Mahsulotlar", path: "/manufacturer/products", icon: Package },
//         { name: "Statistika", path: "/manufacturer/analytics", icon: BarChart3 },
//         { name: "Ta'minotchilar", path: "/manufacturer/collaborators", icon: Users },
//         { name: "Xodimlar", path: "/manufacturer/employees", icon: Users },
//         { name: "Profil", path: "/manufacturer/profile", icon: User },
//       ]
//     : [
//         { name: "Dashboard", path: "/manufacturer/dashboard", icon: LayoutDashboard },
//         { name: "Mahsulotlar", path: "/manufacturer/products", icon: Package },
//         { name: "Statistika", path: "/manufacturer/analytics", icon: BarChart3 },
//         { name: "Ta'minotchilar", path: "/manufacturer/collaborators", icon: Users },
//         { name: "Ma'lumotlarim", path: "/manufacturer/employee", icon: User },
//         { name: "Bildirishnomalar", path: "/manufacturer/notifications", icon: Bell },  // Yangi item qo'shildi
//         { name: "Profil", path: "/manufacturer/profile", icon: User },
//       ]

//   return (
//     <aside
//       className={`${
//         isMobile ? (isSidebarOpen ? "w-64" : "w-0") : "w-64"
//       } bg-gradient-to-b from-card to-card/90 backdrop-blur-md border-r border-border/40 fixed h-full transition-all duration-300 z-50 overflow-hidden md:static ${
//         isMobile && isSidebarOpen ? "shadow-2xl" : ""
//       }`}
//     >
//       <div className="flex flex-col h-screen">     
//         <div className="flex items-center justify-between p-4 border-b border-border/40">
//           <Link href={isStaff ? "/manufacturer/dashboard" : "/employee/dashboard"} className="flex items-center gap-2">
//             <Building2 className="h-8 w-8 text-primary transition-transform duration-200 hover:scale-110" />
//             <div>
//               <span className="text-2xl font-bold text-primary">ScanMe</span>
//               <p className="text-sm text-muted-foreground">{isStaff ? "Ishlab Chiqaruvchi" : "xodim sahifasi"}</p>
//             </div>
//           </Link>
//           {isMobile && (
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setIsSidebarOpen(false)}
//               className="hover:bg-primary/10"
//             >
//               <X className="h-6 w-6" />
//             </Button>
//           )}
//         </div>

        
//         <nav className="flex-1 p-4 space-y-2">
//           {menuItems.map((item) => (
//             <Link
//               key={item.name}
//               href={item.path}
//               className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
//                 pathname.startsWith(item.path)  // Umumiy yaxshilash: startsWith ishlatish (active uchun)
//                   ? "bg-primary/20 text-primary font-semibold shadow-sm"
//                   : "text-muted-foreground hover:bg-primary/10 hover:text-foreground hover:scale-[1.02]"
//               }`}
//               onClick={() => isMobile && setIsSidebarOpen(false)}
//             >
//               <item.icon className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
//               <span>{item.name}</span>
//             </Link>
//           ))}
//         </nav>

       
//         <div className="p-4 border-t border-border/40">
//           <Button
//             variant="ghost"
//             className="w-full justify-start hover:bg-red-600"
//             onClick={handleLogout}
//           >
//             <LogOut className="mr-2 h-4 w-4" />
//             <span>Chiqish</span>
//           </Button>
//         </div>
//       </div>
//     </aside>
//   )
// }
"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import Cookies from "js-cookie"
import { 
  Building2, 
  LogOut, 
  User, 
  Package, 
  BarChart3, 
  Users, 
  LayoutDashboard,
  Menu,
  X
} from "lucide-react"

export function ManufacturerSidebar({ 
  isMobile, 
  setIsSidebarOpen, 
  isSidebarOpen 
}: { 
  isMobile: boolean; 
  setIsSidebarOpen: (open: boolean) => void; 
  isSidebarOpen: boolean 
}) {
  const pathname = usePathname()

  const handleLogout = () => {
    Cookies.remove("token")
    Cookies.remove("refresh_token")
    Cookies.remove("is_staff")
    window.location.href = "/"
  }

  const menuItems = [
    { name: "Dashboard", path: "/manufacturer/dashboard", icon: LayoutDashboard },
    { name: "Mahsulotlar", path: "/manufacturer/products", icon: Package },
    { name: "Statistika", path: "/manufacturer/analytics", icon: BarChart3 },
    { name: "Ta'minotchilar", path: "/manufacturer/collaborators", icon: Users },
    { name: "Xodimlar", path: "/manufacturer/employees", icon: Users },
    { name: "Profil", path: "/manufacturer/profile", icon: User },
  ]

  return (
    <aside
      className={`${
        isMobile ? (isSidebarOpen ? "w-64" : "w-0") : "w-64"
      } bg-gradient-to-b from-card to-card/90 backdrop-blur-md border-r border-border/40 fixed h-full transition-all duration-300 z-50 overflow-hidden md:static ${
        isMobile && isSidebarOpen ? "shadow-2xl" : ""
      }`}
    >
      <div className="flex flex-col h-screen">
        <div className="flex items-center justify-between p-4 border-b border-border/40">
          <Link href="/manufacturer/dashboard" className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary transition-transform duration-200 hover:scale-110" />
            <div>
              <span className="text-2xl font-bold text-primary">ScanMe</span>
              <p className="text-sm text-muted-foreground">Ishlab Chiqaruvchi</p>
            </div>
          </Link>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
              className="hover:bg-primary/10"
            >
              <X className="h-6 w-6" />
            </Button>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                pathname.startsWith(item.path)
                  ? "bg-primary/20 text-primary font-semibold shadow-sm"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-foreground hover:scale-[1.02]"
              }`}
              onClick={() => isMobile && setIsSidebarOpen(false)}
            >
              <item.icon className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border/40">
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-red-600 hover:text-white transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Chiqish</span>
          </Button>
        </div>
      </div>
    </aside>
  )
}