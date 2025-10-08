"use client"

import { useState, useEffect } from "react"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { AlertCircle, Plus, Check, X, Users, MessageSquare, Edit, Trash2 } from "lucide-react"
import { Partner, PartnerRequest, PartnerData, getPartners, addPartner, getPartnerRequests, acceptPartnerRequest, deletePartner } from "@/lib/api"

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [partnerRequests, setPartnerRequests] = useState<PartnerRequest[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [addError, setAddError] = useState<string | null>(null)
  const [acceptError, setAcceptError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ partner: "" })

  // Sana-vaqtni formatlash: kun.oy.yil 00:00 soat
  const formatDateTime = (dateTime: string): string => {
    if (!dateTime) return "N/A"
    try {
      const date = new Date(dateTime)
      const day = String(date.getDate()).padStart(2, "0")
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const year = date.getFullYear()
      const hours = String(date.getHours()).padStart(2, "0")
      const minutes = String(date.getMinutes()).padStart(2, "0")
      return `${day}.${month}.${year} ${hours}:${minutes}`
    } catch {
      return "N/A"
    }
  }

  // Hamkorlar va so'rovlar ro'yxatini olish
  const fetchData = async () => {
    setIsLoading(true)
    setAddError(null)
    setAcceptError(null)
    try {
      const [partnersData, requestsData] = await Promise.all([
        getPartners(),
        getPartnerRequests(),
      ])
      setPartners(partnersData)
      setPartnerRequests(requestsData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
      setAddError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Yangi hamkor qo'shish
  const handleAddPartner = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddError(null)
    setIsLoading(true)

    try {
      const processedData: PartnerData = { partner: formData.partner }
      await addPartner(processedData)
      setIsAddModalOpen(false)
      setFormData({ partner: "" })
      await fetchData()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
      setAddError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Hamkorlik so'rovini qabul qilish
  const handleAcceptRequest = async (id: number) => {
    setAcceptError(null)
    setIsLoading(true)

    try {
      await acceptPartnerRequest(id)
      await fetchData()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
      setAcceptError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Hamkorni o'chirish
  const handleDeletePartner = async (id: number) => {
    setAcceptError(null)
    setIsLoading(true)

    try {
      await deletePartner(id)
      await fetchData()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
      setAcceptError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Rad etish tugmasi (hozircha faqat UI)
  const handleRejectRequest = () => {
    setAcceptError("Rad etish funksiyasi hali tayyor emas.")
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading && partners.length === 0 && partnerRequests.length === 0) {
    return (
      <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
        <p>Yuklanmoqda...</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {addError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{addError}</AlertDescription>
        </Alert>
      )}
      {acceptError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{acceptError}</AlertDescription>
        </Alert>
      )}

      <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold flex items-center">
            <Users className="mr-2 h-6 w-6" /> Mavjud hamkorlar
          </h2>
          <Dialog open={isAddModalOpen} onOpenChange={(open) => {
            setIsAddModalOpen(open)
            if (!open) {
              setFormData({ partner: "" })
              setAddError(null)
            }
          }}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" /> Yangi hamkor qo‘shish
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card/90 backdrop-blur-md">
              <DialogHeader>
                <DialogTitle>Yangi hamkor qo‘shish</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddPartner} className="space-y-4">
                {addError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{addError}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Label htmlFor="partner">Hamkor nomi</Label>
                  <Input
                    id="partner"
                    value={formData.partner}
                    onChange={(e) => setFormData({ ...formData, partner: e.target.value })}
                    placeholder="Hamkor nomini kiriting"
                    required
                    className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Yuklanmoqda..." : "Qo‘shish"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {partners.length === 0 ? (
          <div className="text-center py-8">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-gray-500">Hamkorlar mavjud emas</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Hamkor nomi</TableHead>
                <TableHead>Qo‘shilgan vaqti</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>{partner.id}</TableCell>
                  <TableCell>{partner.partner}</TableCell>
                  <TableCell>{formatDateTime(partner.created_at)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePartner(partner.id)}
                        className="hover:bg-red-600"
                        disabled={isLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <MessageSquare className="mr-2 h-6 w-6" /> Hamkorlik so‘rovlari
        </h3>
        {partnerRequests.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-gray-500">Hamkorlik so‘rovlari mavjud emas</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Hamkor</TableHead>
                <TableHead>So‘rov vaqti</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partnerRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{request.partner}</TableCell>
                  <TableCell>{formatDateTime(request.created_at)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAcceptRequest(request.id)}
                        className="hover:bg-green-600"
                        disabled={isLoading}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRejectRequest}
                        className="hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  )
}