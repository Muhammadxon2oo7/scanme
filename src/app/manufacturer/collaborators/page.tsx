"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sidebar } from "@/src/components/manufacturer/Sidebar"
import { Card } from "@/src/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Menu, Building2 } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"

export default function ManufacturerCollaboratorsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

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

  const collaborators = [
    { id: 1, name: "Tech Partner LLC", stir: "987654321", status: "active" },
    { id: 2, name: "Global Distributors", stir: "456789123", status: "pending" },
    { id: 3, name: "Retail Group", stir: "789123456", status: "active" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 flex">
      {isSidebarOpen && <Sidebar isMobile={isMobile} setIsSidebarOpen={setIsSidebarOpen} />}
      
      <div className="flex-1 flex flex-col">
        <header className="md:hidden bg-gradient-to-r from-card to-card/90 backdrop-blur-md border-b border-border/40 p-4 flex items-center justify-between">
          <Link href="/manufacturer/dashboard" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary transition-transform duration-200 hover:scale-110" />
            <span className="text-xl font-bold text-primary">ScanMe</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            className="hover:bg-primary/10"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <div className="container mx-auto space-y-6">
            <div>
              <h1 className="text-4xl font-semibold text-balance tracking-tight">
                Hamkorlar
              </h1>
              <p className="text-muted-foreground mt-2 text-base">
                Hamkor tashkilotlar ro‘yxati
              </p>
            </div>

            <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-primary/10 transition-all duration-200">
                    <TableHead>Nomi</TableHead>
                    <TableHead>STIR</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {collaborators.map((collaborator) => (
                    <TableRow
                      key={collaborator.id}
                      className="hover:bg-primary/10 transition-all duration-200"
                    >
                      <TableCell>{collaborator.name}</TableCell>
                      <TableCell>{collaborator.stir}</TableCell>
                      <TableCell>
                        <Badge
                          variant={collaborator.status === "active" ? "default" : "secondary"}
                          className="transition-all duration-200"
                        >
                          {collaborator.status === "active" ? "Faol" : "Kutilmoqda"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}