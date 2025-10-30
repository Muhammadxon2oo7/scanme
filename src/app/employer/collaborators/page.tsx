// src/components/manufacturer/partners/EmployeePartnersPage.tsx
"use client"

import { useState, useEffect } from "react"
import { Card } from "@/src/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Users, MessageSquare } from "lucide-react"
import { Partner, PartnerRequest, getPartners, getPartnerRequests, getMyPartnerRequests } from "@/lib/api"
import Cookies from "js-cookie"

export default function EmployeePartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [partnerRequests, setPartnerRequests] = useState<PartnerRequest[]>([])
  const [myPartnerRequests, setMyPartnerRequests] = useState<PartnerRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const myId = Cookies.get('myid') || ''

  const formatDateTime = (date: string | null) => {
    if (!date) return "N/A"
    try {
      const d = new Date(date)
      return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
    } catch {
      return "N/A"
    }
  }

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [p, pr, mpr] = await Promise.all([
        getPartners(),
        getPartnerRequests(),
        getMyPartnerRequests()
      ])
      setPartners(p)
      setPartnerRequests(pr)
      setMyPartnerRequests(mpr)
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xato:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Profilni to'g'ri olish
  const getProfile = (p: Partner) => p.partner.id !== myId ? p.partner : p.owner
  const getIncoming = (r: PartnerRequest) => r.owner
  const getOutgoing = (r: PartnerRequest) => r.partner

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <Card className="p-6"><p>Yuklanmoqda...</p></Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 p-4 sm:p-8">
      <div className="container mx-auto space-y-8">

        {/* Mavjud ta'minotchilar */}
        <Card className="p-6 shadow-lg border border-border/50">
          <h2 className="text-2xl font-semibold mb-6 flex items-center text-foreground">
            <Users className="mr-2 h-6 w-6 text-primary" /> Mavjud ta'minotchilar
          </h2>
          {partners.length === 0 ? (
            <p className="text-center py-10 text-muted-foreground">Hech qanday ta'minotchi mavjud emas</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ta'minotchi nomi</TableHead>
                    <TableHead>CEO</TableHead>
                    <TableHead>No'meri</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partners.map(p => {
                    const prof = getProfile(p)
                    return (
                      <TableRow key={p.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium">{prof.name}</TableCell>
                        <TableCell>{prof.ceo || "N/A"}</TableCell>
                        <TableCell>{prof.phone || "N/A"}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>

        {/* Kelgan so'rovlar */}
        <Card className="p-6 shadow-lg border border-border/50">
          <h3 className="text-xl font-semibold mb-6 flex items-center text-foreground">
            <MessageSquare className="mr-2 h-5 w-5 text-primary" /> Menga kelgan so‘rovlar
          </h3>
          {partnerRequests.length === 0 ? (
            <p className="text-center py-10 text-muted-foreground">Hech qanday so‘rov kelmagan</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ta'minotchi nomi</TableHead>
                    <TableHead>So‘rov vaqti</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partnerRequests.map(r => {
                    const prof = getIncoming(r)
                    return (
                      <TableRow key={r.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{prof.name}</TableCell>
                        <TableCell>{formatDateTime(r.invited_at)}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>

        {/* Yuborilgan so'rovlar */}
        <Card className="p-6 shadow-lg border border-border/50">
          <h3 className="text-xl font-semibold mb-6 flex items-center text-foreground">
            <MessageSquare className="mr-2 h-5 w-5 text-primary" /> Men yuborgan so‘rovlar
          </h3>
          {myPartnerRequests.length === 0 ? (
            <p className="text-center py-10 text-muted-foreground">Hech qanday so‘rov yuborilmagan</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ta'minotchi nomi</TableHead>
                    <TableHead>So‘rov vaqti</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myPartnerRequests.map(r => {
                    const prof = getOutgoing(r)
                    return (
                      <TableRow key={r.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{prof.name}</TableCell>
                        <TableCell>{formatDateTime(r.invited_at)}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>

      </div>
    </div>
  )
}