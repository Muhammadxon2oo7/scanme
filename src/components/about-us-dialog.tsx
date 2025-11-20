"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog"
import { Card, CardContent } from "@/src/components/ui/card"
import { Building2, Users, Code } from "lucide-react"

interface AboutUsDialogProps {
  children: React.ReactNode
}

export function AboutUsDialog({ children }: AboutUsDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] modern-card bg-background/95 backdrop-blur-md border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary text-glow flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            Biz haqimizda
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">Ekoiz platformasi haqida ma'lumot</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
       
          <Card className="modern-card bg-card/50 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Platforma ishlab chiqaruvchisi</h3>
              </div>
              <p className="text-xl font-bold text-primary text-glow">E-Investment MCHJ</p>
            </CardContent>
          </Card>

     
          <Card className="modern-card bg-card/50 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/20">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Mualliflar</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-foreground font-medium">***** ********</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-foreground font-medium">***** ********</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-foreground font-medium">***** ********</span>
                </div>
              </div>
            </CardContent>
          </Card>

       
          <Card className="modern-card bg-card/50 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/20">
                  <Code className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Platforma haqida</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Ekoiz - bu mahsulotlarni QR kod orqali tekshirish va ularning haqiqiyligini aniqlash uchun
                mo'ljallangan zamonaviy platforma. Bizning maqsadimiz iste'molchilar va ishlab chiqaruvchilar o'rtasida
                ishonchli aloqa o'rnatishdir.
              </p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
