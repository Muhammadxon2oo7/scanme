// "use client"

// import { useState } from "react"
// import { usePathname } from "next/navigation"
// import Link from "next/link"
// import { Button } from "@/src/components/ui/button"
// import { Avatar, AvatarFallback } from "@/src/components/ui/avatar"
// import { 
//   Building2, 
//   LogOut, 
//   User, 
//   Package, 
//   BarChart3, 
//   Users, 
//   LayoutDashboard,
//   Menu,
//   X
// } from "lucide-react"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/src/components/ui/dropdown-menu"

// export function Sidebar({ isMobile, setIsSidebarOpen }: { isMobile: boolean; setIsSidebarOpen: (open: boolean) => void }) {
//   const pathname = usePathname()

//   const handleLogout = () => {
//     window.location.href = "/"
//   }

//   const menuItems = [
//     { name: "Dashboard", path: "/manufacturer/dashboard", icon: LayoutDashboard },
//     { name: "Mahsulotlar", path: "/manufacturer/products", icon: Package },
//     { name: "Statistika", path: "/manufacturer/analytics", icon: BarChart3 },
//     { name: "Hamkorlar", path: "/manufacturer/collaborators", icon: Users },
//     { name: "Profil", path: "/manufacturer/profile", icon: User },
//   ]

//   return (
//     <aside
//       className={`${
//         isMobile ? "w-64" : "w-0 md:w-64"
//       } bg-gradient-to-b from-card to-card/90 backdrop-blur-md border-r border-border/40 fixed h-full transition-all duration-300 z-50 overflow-hidden md:static ${
//         isMobile ? "shadow-2xl" : ""
//       }`}
//     >
//       <div className="flex flex-col h-screen">
//         {/* Logo and Close Button */}
//         <div className="flex items-center justify-between p-4 border-b border-border/40">
//           <Link href="/manufacturer/dashboard" className="flex items-center gap-2">
//             <Building2 className="h-8 w-8 text-primary transition-transform duration-200 hover:scale-110" />
//             <div>
//               <span className="text-2xl font-bold text-primary">ScanMe</span>
//               <p className="text-sm text-muted-foreground">Ishlab Chiqaruvchi</p>
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

//         {/* Menu Items */}
//         <nav className="flex-1 p-4 space-y-2">
//           {menuItems.map((item) => (
//             <Link
//               key={item.name}
//               href={item.path}
//               className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
//                 pathname === item.path
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

//         {/* User Menu */}
//         <div className="p-4 border-t border-border/40">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
     
//               <Button variant="ghost" className="w-full justify-start hover:bg-red-600">
//                 <LogOut className="mr-2 h-4 w-4" />
//                 <span>Chiqish</span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56 bg-card/90 backdrop-blur-md" align="end" forceMount>
//               <div className="flex items-center justify-start gap-2 p-2">
//                 <div className="flex flex-col space-y-1 leading-none">
//                   <p className="font-medium">Demo Tashkilot</p>
//                   <p className="w-[200px] truncate text-sm text-muted-foreground">
//                     STIR: 123456789
//                   </p>
//                 </div>
//               </div>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem asChild>
//                 <Link href="/manufacturer/profile">
//                   <User className="mr-2 h-4 w-4" />
//                   <span>Profil</span>
//                 </Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={handleLogout}>
               
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
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

export function Sidebar({ isMobile, setIsSidebarOpen }: { isMobile: boolean; setIsSidebarOpen: (open: boolean) => void }) {
  const pathname = usePathname()

  const handleLogout = () => {
    console.log("Logout: token va refresh_token o'chirilmoqda")
    Cookies.remove("token")
    Cookies.remove("refresh_token")
    console.log("Cookie'lar o'chirildi, yo'naltirilmoqda: /")
    window.location.href = "/"
  }

  const menuItems = [
    { name: "Dashboard", path: "/manufacturer/dashboard", icon: LayoutDashboard },
    { name: "Mahsulotlar", path: "/manufacturer/products", icon: Package },
    { name: "Statistika", path: "/manufacturer/analytics", icon: BarChart3 },
    { name: "Hamkorlar", path: "/manufacturer/collaborators", icon: Users },
     { name: "Hodimlar", path: "/manufacturer/employees", icon: Users }, // Yangi menyus
    { name: "Profil", path: "/manufacturer/profile", icon: User },
    
  ]

  return (
    <aside
      className={`${
        isMobile ? "w-64" : "w-0 md:w-64"
      } bg-gradient-to-b from-card to-card/90 backdrop-blur-md border-r border-border/40 fixed h-full transition-all duration-300 z-50 overflow-hidden md:static ${
        isMobile ? "shadow-2xl" : ""
      }`}
    >
      <div className="flex flex-col h-screen">
        {/* Logo and Close Button */}
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

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                pathname === item.path
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

        {/* Logout Button */}
        <div className="p-4 border-t border-border/40">
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-red-600"
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
