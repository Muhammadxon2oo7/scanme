"use client"

import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar"
import { Building2, LogOut, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"

export function ManufacturerHeader() {
  const handleLogout = () => {
   
    window.location.href = "/"
  }

  return (
    <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
         
          <Link
            href="/manufacturer/dashboard"
            className="flex items-center gap-2 text-2xl font-bold text-primary"
          >
            <Building2 className="h-8 w-8" />
            ScanMe
            <span className="text-sm font-normal text-muted-foreground">
              Ishlab Chiqaruvchi
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/manufacturer/dashboard"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/manufacturer/products"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Mahsulotlar
            </Link>
            <Link
              href="/manufacturer/analytics"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Statistika
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      <Building2 className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-56 z-[9999]"
                align="end"
                forceMount
              >
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">Demo Tashkilot</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      STIR: 123456789
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Chiqish</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
