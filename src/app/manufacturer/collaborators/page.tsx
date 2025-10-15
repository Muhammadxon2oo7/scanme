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
  DialogFooter,
} from "@/src/components/ui/dialog"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { AlertCircle, Plus, Check, X, Users, MessageSquare, Info, Trash2 } from "lucide-react"
import { Partner, PartnerRequest, PartnerData, getPartners, addPartner, getPartnerRequests, acceptPartnerRequest, deletePartner, getPartnerById, getMyPartnerRequests, deleteMyPartnerRequest } from "@/lib/api"  // rejectPartnerRequest qo'shildi
import Cookies from "js-cookie"
import { motion, AnimatePresence } from "framer-motion"

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [partnerRequests, setPartnerRequests] = useState<PartnerRequest[]>([])
  const [myPartnerRequests, setMyPartnerRequests] = useState<PartnerRequest[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isMyDeleteModalOpen, setIsMyDeleteModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)  // Yangi modal
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [deletePartnerId, setDeletePartnerId] = useState<string | null>(null)
  const [deleteMyRequestId, setDeleteMyRequestId] = useState<number | null>(null)
  const [rejectRequestId, setRejectRequestId] = useState<number | null>(null)  // Yangi state
  const [addError, setAddError] = useState<string | null>(null)
  const [acceptError, setAcceptError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isStaff = Cookies.get('is_staff') !== 'false'
  const myId = Cookies.get('myid') || ''

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

  const formatDateTime = (dateTime: string | null): string => {
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

  const fetchData = async () => {
    setIsLoading(true)
    setAddError(null)
    setAcceptError(null)
    try {
      const [partnersData, requestsData, myRequestsData] = await Promise.all([
        getPartners(),
        getPartnerRequests(),
        getMyPartnerRequests(),
      ])
      setPartners(partnersData)
      setPartnerRequests(requestsData)
      setMyPartnerRequests(myRequestsData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
      setAddError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddPartner = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddError(null)
    setIsLoading(true)
    try {
      const processedData: PartnerData = { 
        partner: formData.partner
      }
      await addPartner(processedData)
      setIsAddModalOpen(false)
      setFormData({ name: "", description: "", partner: "" })
      await fetchData()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
      setAddError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

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

  const handleDeletePartner = async () => {
    if (!deletePartnerId) return
    setAcceptError(null)
    setIsLoading(true)
    try {
      await deletePartner(deletePartnerId)
      await fetchData()
      setIsDeleteModalOpen(false)
      setDeletePartnerId(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
      setAcceptError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRejectRequest = async () => {  // Yangi handler
    if (!rejectRequestId) return
    setAcceptError(null)
    setIsLoading(true)
    try {
      await deletePartner(String(rejectRequestId))
      await fetchData()
      setIsRejectModalOpen(false)
      setRejectRequestId(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
      setAcceptError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteMyRequest = async () => {
    if (!deleteMyRequestId) return
    setAcceptError(null)
    setIsLoading(true)
    try {
      await deleteMyPartnerRequest(deleteMyRequestId)
      await fetchData()
      setIsMyDeleteModalOpen(false)
      setDeleteMyRequestId(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
      setAcceptError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewPartner = async (id: string) => {
    setIsLoading(true)
    try {
      const partner = await getPartnerById(id)
      setSelectedPartner(partner)
      setIsDetailsModalOpen(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Noma'lum xato yuz berdi"
      setAcceptError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Eski handleRejectRequest o'chirildi, endi modal orqali ishlaydi

  useEffect(() => {
    fetchData()
  }, [])

  const [formData, setFormData] = useState({ name: "", description: "", partner: "" })

  // Helper: Hamkor profilini olish (myId ga qarama-qarshi) - Partners uchun
  const getPartnerProfile = (partner: Partner): typeof partner.partner => {
    return partner.partner.id !== myId ? partner.partner : partner.owner
  }

  // Helper: Menga kelgan requestlar uchun (owner - yuborgan taminotchi, chunki request menga kelgan)
  const getIncomingRequestProfile = (request: PartnerRequest): typeof request.owner => {
    return request.owner
  }

  // Helper: Mening yuborgan requestlarim uchun (partner - yuborilgan taminotchi)
  const getOutgoingRequestProfile = (request: PartnerRequest): typeof request.partner => {
    return request.partner
  }

  if (isLoading && partners.length === 0 && partnerRequests.length === 0 && myPartnerRequests.length === 0) {
    return (
      <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
        <p>Yuklanmoqda...</p>
      </Card>
    )
  }

  return (
    <div className="bg-gradient-to-b from-background to-background/90 flex min-h-screen relative">
    
      <main className="flex-1 p-4 sm:p-8 relative z-10">
      
        <div className="container mx-auto space-y-6 h-screen overflow-y-scroll mb-[15px]">
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

          <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl font-semibold flex items-center">
                <Users className="mr-2 h-5 sm:h-6 w-5 sm:w-6" /> Mavjud ta'minotchi lar
              </h2>
              {isStaff && (
                <Dialog open={isAddModalOpen} onOpenChange={(open) => {
                  setIsAddModalOpen(open)
                  if (!open) {
                    setFormData({ name: "", description: "", partner: "" })
                    setAddError(null)
                  }
                }}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                      <Plus className="mr-2 h-4 w-4" /> Yangi ta'minotchi  qo‘shish
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card/90 backdrop-blur-md max-w-[95vw] sm:max-w-lg rounded-lg">
                    <DialogHeader>
                      <DialogTitle>Yangi ta'minotchi  qo‘shish</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddPartner} className="space-y-4">
                      {addError && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{addError}</AlertDescription>
                        </Alert>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="partner">Ta'minotchi  id'si</Label>
                        <Input
                          id="partner"
                          value={formData.partner}
                          onChange={(e) => setFormData({ ...formData, partner: e.target.value })}
                          placeholder="ta'minotchi  ID'sini kiriting"
                          required
                          className="border-primary/30 focus:ring-primary/50 transition-all duration-200 p-3 w-full"
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Yuklanmoqda..." : "Qo‘shish"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            {partners.length === 0 ? (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-gray-500">Ta'minotchilar mavjud emas</p>
              </div>
            ) : isMobile ? (
              <div className="space-y-4">
                {partners.map((partner) => {
                  const prof = getPartnerProfile(partner)
                  return (
                    <Card key={partner.id} className="p-4 bg-card/90 backdrop-blur-md border-border/50">
                      <div className="space-y-2">
                        <div><strong>Ta'minotchi nomi:</strong> {prof.name}</div>
                        <div><strong>CEO:</strong> {prof.ceo || "N/A"}</div>
                        <div><strong>No'meri:</strong> {prof.phone || "N/A"}</div>
                        <div className="pt-2 flex gap-2 flex-wrap">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewPartner(partner.id)}
                            className="hover:bg-blue-600 w-full"
                          >
                            <Info className="h-4 w-4 mr-2" /> Ma'lumot
                          </Button>
                          {isStaff && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setDeletePartnerId(partner.id)
                                setIsDeleteModalOpen(true)
                              }}
                              className="hover:bg-red-600 w-full"
                              disabled={isLoading}
                            >
                              <Trash2 className="h-4 w-4 mr-2" /> O‘chirish
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ta'minotchi nomi</TableHead>
                      <TableHead>CEO</TableHead>
                      <TableHead>No'meri</TableHead>
                      <TableHead>Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partners.map((partner) => {
                      const prof = getPartnerProfile(partner)
                      return (
                        <TableRow key={partner.id}>
                          <TableCell>{prof.name}</TableCell>
                          <TableCell>{prof.ceo || "N/A"}</TableCell>
                          <TableCell>{prof.phone || "N/A"}</TableCell>
                          <TableCell>
                            <div className="flex gap-2 flex-wrap">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewPartner(partner.id)}
                                className="hover:bg-blue-600"
                              >
                                <Info className="h-4 w-4" />
                              </Button>
                              {isStaff && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setDeletePartnerId(partner.id)
                                    setIsDeleteModalOpen(true)
                                  }}
                                  className="hover:bg-red-600"
                                  disabled={isLoading}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>

          <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
              <MessageSquare className="mr-2 h-5 sm:h-6 w-5 sm:w-6" /> Menga kelgan so‘rovlar
            </h3>
            {partnerRequests.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-gray-500">Ta'minotchilik so‘rovlari mavjud emas</p>
              </div>
            ) : isMobile ? (
              <div className="space-y-4">
                {partnerRequests.map((request) => {
                  const prof = getIncomingRequestProfile(request)  // owner - yuborgan taminotchi
                  return (
                    <Card key={request.id} className="p-4 bg-card/90 backdrop-blur-md border-border/50">
                      <div className="space-y-2">
                        <div><strong>Ta'minotchi nomi:</strong> {prof.name}</div>
                        <div><strong>CEO:</strong> {prof.ceo || "N/A"}</div>
                        <div><strong>No'meri:</strong> {prof.phone || "N/A"}</div>
                        <div><strong>So‘rov vaqti:</strong> {formatDateTime(request.invited_at)}</div>
                        {isStaff && (
                          <div className="pt-2 flex gap-2 flex-wrap">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleAcceptRequest(request.id)}
                              className="hover:bg-primary cursor-pointer w-full"
                              disabled={isLoading}
                            >
                              <Check className="h-4 w-4 mr-2" /> Qabul qilish
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setRejectRequestId(request.id)
                                setIsRejectModalOpen(true)
                              }}
                              className="bg-red-400 text-white hover:bg-red-600 w-full"
                              disabled={isLoading}
                            >
                              <X className="h-4 w-4 mr-2" /> Rad etish
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ta'minotchi nomi</TableHead>
                      <TableHead>CEO</TableHead>
                      <TableHead>No'meri</TableHead>
                      <TableHead>So‘rov vaqti</TableHead>
                      {isStaff && <TableHead>Amallar</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partnerRequests.map((request) => {
                      const prof = getIncomingRequestProfile(request)
                      return (
                        <TableRow key={request.id}>
                          <TableCell>{prof.name}</TableCell>
                          <TableCell>{prof.ceo || "N/A"}</TableCell>
                          <TableCell>{prof.phone || "N/A"}</TableCell>
                          <TableCell>{formatDateTime(request.invited_at)}</TableCell>
                          {isStaff && (
                            <TableCell>
                              <div className="flex gap-2 flex-wrap">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleAcceptRequest(request.id)}
                                  className="hover:bg-primary cursor-pointer"
                                  disabled={isLoading}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setRejectRequestId(request.id)
                                    setIsRejectModalOpen(true)
                                  }}
                                  className="hover:bg-red-600"
                                  disabled={isLoading}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          )}
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>

          <Card className="p-4 sm:p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
              <MessageSquare className="mr-2 h-5 sm:h-6 w-5 sm:w-6" /> Men yuborgan so‘rovlar
            </h3>
            {myPartnerRequests.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-gray-500">Yuborilgan so‘rovlar mavjud emas</p>
              </div>
            ) : isMobile ? (
              <div className="space-y-4">
                {myPartnerRequests.map((request) => {
                  const prof = getOutgoingRequestProfile(request)  // partner - yuborilgan taminotchi
                  return (
                    <Card key={request.id} className="p-4 bg-card/90 backdrop-blur-md border-border/50">
                      <div className="space-y-2">
                        <div><strong>Ta'minotchi nomi:</strong> {prof.name}</div>
                        <div><strong>CEO:</strong> {prof.ceo || "N/A"}</div>
                        <div><strong>No'meri:</strong> {prof.phone || "N/A"}</div>
                        <div><strong>So‘rov vaqti:</strong> {formatDateTime(request.invited_at)}</div>
                        {isStaff && (
                          <div className="pt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setDeleteMyRequestId(request.id)
                                setIsMyDeleteModalOpen(true)
                              }}
                              className="hover:bg-red-600 w-full"
                              disabled={isLoading}
                            >
                              <Trash2 className="h-4 w-4 mr-2" /> O‘chirish
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ta'minotchi nomi</TableHead>
                      <TableHead>CEO</TableHead>
                      <TableHead>No'meri</TableHead>
                      <TableHead>So‘rov vaqti</TableHead>
                      {isStaff && <TableHead>Amallar</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myPartnerRequests.map((request) => {
                      const prof = getOutgoingRequestProfile(request)
                      return (
                        <TableRow key={request.id}>
                          <TableCell>{prof.name}</TableCell>
                          <TableCell>{prof.ceo || "N/A"}</TableCell>
                          <TableCell>{prof.phone || "N/A"}</TableCell>
                          <TableCell>{formatDateTime(request.invited_at)}</TableCell>
                          {isStaff && (
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setDeleteMyRequestId(request.id)
                                  setIsMyDeleteModalOpen(true)
                                }}
                                className="hover:bg-red-600"
                                disabled={isLoading}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          )}
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>

          <Dialog open={isDeleteModalOpen} onOpenChange={(open) => {
            setIsDeleteModalOpen(open)
            if (!open) setDeletePartnerId(null)
          }}>
            <DialogContent className="bg-card/90 backdrop-blur-md max-w-[95vw] sm:max-w-md rounded-lg">
              <DialogHeader>
                <DialogTitle>ta'minotchi ni o'chirishni tasdiqlash</DialogTitle>
              </DialogHeader>
              <p>Haqiqatdan ham ushbu ta'minotchi ni o'chirmoqchimisiz?</p>
              <DialogFooter className="flex flex-col sm:flex-row gap-2 flex-wrap">
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="w-full sm:w-auto"
                >
                  Bekor qilish
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeletePartner}
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? "Yuklanmoqda..." : "O'chirish"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isMyDeleteModalOpen} onOpenChange={(open) => {
            setIsMyDeleteModalOpen(open)
            if (!open) setDeleteMyRequestId(null)
          }}>
            <DialogContent className="bg-card/90 backdrop-blur-md max-w-[95vw] sm:max-w-md rounded-lg">
              <DialogHeader>
                <DialogTitle>So'rovni o'chirishni tasdiqlash</DialogTitle>
              </DialogHeader>
              <p>Haqiqatdan ham ushbu so'rovni o'chirmoqchimisiz?</p>
              <DialogFooter className="flex flex-col sm:flex-row gap-2 flex-wrap">
                <Button
                  variant="outline"
                  onClick={() => setIsMyDeleteModalOpen(false)}
                  className="w-full sm:w-auto"
                >
                  Bekor qilish
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteMyRequest}
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? "Yuklanmoqda..." : "O'chirish"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Yangi Reject Modal */}
          <Dialog open={isRejectModalOpen} onOpenChange={(open) => {
            setIsRejectModalOpen(open)
            if (!open) setRejectRequestId(null)
          }}>
            <DialogContent className="bg-card/90 backdrop-blur-md max-w-[95vw] sm:max-w-md rounded-lg">
              <DialogHeader>
                <DialogTitle>So'rovni rad etishni tasdiqlash</DialogTitle>
              </DialogHeader>
              <p>Haqiqatdan ham ushbu so'rovni rad etmoqchimisiz?</p>
              <DialogFooter className="flex flex-col sm:flex-row gap-2 flex-wrap">
                <Button
                  variant="outline"
                  onClick={() => setIsRejectModalOpen(false)}
                  className="w-full sm:w-auto"
                >
                  Bekor qilish
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleRejectRequest}
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? "Yuklanmoqda..." : "Rad etish"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isDetailsModalOpen} onOpenChange={(open) => {
            setIsDetailsModalOpen(open)
            if (!open) setSelectedPartner(null)
          }}>
            <DialogContent className="bg-card/90 backdrop-blur-md max-w-[95vw] sm:max-w-md rounded-xl">
              <DialogHeader>
                <DialogTitle>ta'minotchi  ma'lumotlari</DialogTitle>
              </DialogHeader>
              {selectedPartner && (
                <div className="space-y-4">
                  {(() => {
                    const prof = getPartnerProfile(selectedPartner)
                    return (
                      <>
                        <div>
                          <Label>Nomi</Label>
                          <p>{prof.name}</p>
                        </div>
                        <div>
                          <Label>Tavsif</Label>
                          <p>{prof.description || "N/A"}</p>
                        </div>
                        <div>
                          <Label>CEO</Label>
                          <p>{prof.ceo || "N/A"}</p>
                        </div>
                        <div>
                          <Label>No'meri</Label>
                          <p>{prof.phone || "N/A"}</p>
                        </div>
                        <div>
                          <Label>Emaili</Label>
                          <p>{prof.email || "N/A"}</p>
                        </div>
                        <div>
                          <Label>Taklif qilingan vaqt</Label>
                          <p>{formatDateTime(selectedPartner.invited_at)}</p>
                        </div>
                        <div>
                          <Label>Qabul qilingan vaqt</Label>
                          <p>{formatDateTime(selectedPartner.accepted_at)}</p>
                        </div>
                      </>
                    )
                  })()}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  )
}