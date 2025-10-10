"use client"

import { useState } from "react"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Badge } from "@/src/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Building2, Plus, Search, Users, Clock, CheckCircle, XCircle, Send, Eye } from "lucide-react"
import { CollaborationRequestDialog } from "@/src/components/manufacturer/collaboration-request-dialog"
import { CollaborationDetailsDialog } from "@/src/components/manufacturer/collaboration-details-dialog"

interface Collaborator {
  id: string
  organizationName: string
  taxId: string
  email: string
  joinedDate: string
  status: "active" | "pending" | "inactive"
  productsCount: number
  componentsHandled: string[]
}

interface CollaborationRequest {
  id: string
  fromOrganization: string
  fromTaxId: string
  productName: string
  componentName: string
  message: string
  status: "pending" | "accepted" | "rejected"
  createdAt: string
  type: "incoming" | "outgoing"
}

export function CollaboratorsManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<CollaborationRequest | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  // Mock data for collaborators
  const collaborators: Collaborator[] = [
    {
      id: "1",
      organizationName: "TechComponents LLC",
      taxId: "987654321",
      email: "contact@techcomponents.uz",
      joinedDate: "2025-01-10",
      status: "active",
      productsCount: 12,
      componentsHandled: ["Batareya", "Zaryadlovchi", "Kabel"],
    },
    {
      id: "2",
      organizationName: "ElectroSupply Co",
      taxId: "456789123",
      email: "info@electrosupply.uz",
      joinedDate: "2025-01-08",
      status: "active",
      productsCount: 8,
      componentsHandled: ["Mikrosxema", "Kondensator"],
    },
    {
      id: "3",
      organizationName: "PackagingPro",
      taxId: "789123456",
      email: "orders@packagingpro.uz",
      joinedDate: "2025-01-15",
      status: "pending",
      productsCount: 0,
      componentsHandled: ["Qadoqlash"],
    },
  ]

  // Mock data for collaboration requests
  const collaborationRequests: CollaborationRequest[] = [
    {
      id: "1",
      fromOrganization: "NewTech Solutions",
      fromTaxId: "111222333",
      productName: "Smart Watch Pro",
      componentName: "Ekran moduli",
      message: "Bizning mahsulotimiz uchun ekran moduli ishlab chiqarishda Taminotchilik qilmoqchimiz.",
      status: "pending",
      createdAt: "2025-01-20",
      type: "incoming",
    },
    {
      id: "2",
      fromOrganization: "MobileAccessories Inc",
      fromTaxId: "444555666",
      productName: "Wireless Earbuds",
      componentName: "Zaryadlash qutisi",
      message: "Simsiz quloqchinlar uchun zaryadlash qutisi tayyorlashda yordam kerak.",
      status: "pending",
      createdAt: "2025-01-18",
      type: "incoming",
    },
    {
      id: "3",
      fromOrganization: "AutoParts Central",
      fromTaxId: "777888999",
      productName: "Car Dashboard",
      componentName: "LED displey",
      message: "Avtomobil dashboard uchun LED displey ishlab chiqarish.",
      status: "accepted",
      createdAt: "2025-01-15",
      type: "outgoing",
    },
  ]

  const filteredCollaborators = collaborators.filter(
    (collaborator) =>
      collaborator.organizationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collaborator.taxId.includes(searchQuery),
  )

  const pendingRequests = collaborationRequests.filter((req) => req.status === "pending")
  const incomingRequests = collaborationRequests.filter((req) => req.type === "incoming")
  const outgoingRequests = collaborationRequests.filter((req) => req.type === "outgoing")

  const handleRequestAction = (requestId: string, action: "accept" | "reject") => {
    // Here would be the actual API call to handle the request
    console.log(`${action} request ${requestId}`)
  }

  const handleViewDetails = (request: CollaborationRequest) => {
    setSelectedRequest(request)
    setIsDetailsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Taminotchilar</h1>
          <p className="text-muted-foreground">Taminotchi tashkilotlar bilan ishlashni boshqaring</p>
        </div>
        <Button className="scan-button" onClick={() => setIsRequestDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Taminotchilik Taklifi
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Faol Taminotchilar</p>
              <p className="text-xl font-bold">{collaborators.filter((c) => c.status === "active").length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kutilayotgan</p>
              <p className="text-xl font-bold">{pendingRequests.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Jami Mahsulotlar</p>
              <p className="text-xl font-bold">{collaborators.reduce((sum, c) => sum + c.productsCount, 0)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Jami Taminotchilar</p>
              <p className="text-xl font-bold">{collaborators.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="collaborators" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="collaborators">Taminotchilar</TabsTrigger>
          <TabsTrigger value="requests">
            Takliflar
            {pendingRequests.length > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                {pendingRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="history">Tarix</TabsTrigger>
        </TabsList>

        {/* Collaborators Tab */}
        <TabsContent value="collaborators" className="space-y-6">
          <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Taminotchi nomi yoki STIR raqami bo'yicha qidiring..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
          </Card>

          <div className="grid gap-4">
            {filteredCollaborators.map((collaborator) => (
              <Card
                key={collaborator.id}
                className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{collaborator.organizationName}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span>STIR: {collaborator.taxId}</span>
                        <span>•</span>
                        <span>{collaborator.email}</span>
                        <span>•</span>
                        <span>Qo'shilgan: {collaborator.joinedDate}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {collaborator.componentsHandled.map((component, index) => (
                          <Badge key={index} variant="secondary">
                            {component}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{collaborator.productsCount} mahsulot</p>
                      <Badge
                        variant={
                          collaborator.status === "active"
                            ? "default"
                            : collaborator.status === "pending"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {collaborator.status === "active"
                          ? "Faol"
                          : collaborator.status === "pending"
                            ? "Kutilmoqda"
                            : "Nofaol"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Incoming Requests */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Kelgan Takliflar
              </h3>
              <div className="space-y-4">
                {incomingRequests.map((request) => (
                  <div key={request.id} className="p-4 rounded-lg bg-background/50 border border-border/50 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{request.fromOrganization}</h4>
                        <p className="text-sm text-muted-foreground">STIR: {request.fromTaxId}</p>
                      </div>
                      <Badge
                        variant={
                          request.status === "pending"
                            ? "secondary"
                            : request.status === "accepted"
                              ? "default"
                              : "outline"
                        }
                      >
                        {request.status === "pending"
                          ? "Kutilmoqda"
                          : request.status === "accepted"
                            ? "Qabul qilingan"
                            : "Rad etilgan"}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Mahsulot:</span> {request.productName}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Qism:</span> {request.componentName}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">{request.message}</p>
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={() => handleViewDetails(request)}>
                        <Eye className="mr-2 h-3 w-3" />
                        Ko'rish
                      </Button>
                      {request.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRequestAction(request.id, "accept")}
                            className="bg-green-500/10 border-green-500/20 text-green-600 hover:bg-green-500/20"
                          >
                            <CheckCircle className="mr-2 h-3 w-3" />
                            Qabul
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRequestAction(request.id, "reject")}
                            className="bg-red-500/10 border-red-500/20 text-red-600 hover:bg-red-500/20"
                          >
                            <XCircle className="mr-2 h-3 w-3" />
                            Rad
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Outgoing Requests */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Send className="h-5 w-5" />
                Yuborilgan Takliflar
              </h3>
              <div className="space-y-4">
                {outgoingRequests.map((request) => (
                  <div key={request.id} className="p-4 rounded-lg bg-background/50 border border-border/50 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{request.fromOrganization}</h4>
                        <p className="text-sm text-muted-foreground">STIR: {request.fromTaxId}</p>
                      </div>
                      <Badge
                        variant={
                          request.status === "pending"
                            ? "secondary"
                            : request.status === "accepted"
                              ? "default"
                              : "outline"
                        }
                      >
                        {request.status === "pending"
                          ? "Kutilmoqda"
                          : request.status === "accepted"
                            ? "Qabul qilingan"
                            : "Rad etilgan"}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Mahsulot:</span> {request.productName}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Qism:</span> {request.componentName}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">{request.message}</p>
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={() => handleViewDetails(request)}>
                        <Eye className="mr-2 h-3 w-3" />
                        Ko'rish
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <h3 className="text-lg font-semibold mb-4">Taminotchilik Tarixi</h3>
            <div className="space-y-4">
              {collaborationRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      {request.type === "incoming" ? (
                        <Clock className="h-5 w-5 text-primary" />
                      ) : (
                        <Send className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">
                        {request.type === "incoming" ? "Kelgan taklif" : "Yuborilgan taklif"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {request.fromOrganization} - {request.productName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{request.createdAt}</span>
                    <Badge
                      variant={
                        request.status === "pending"
                          ? "secondary"
                          : request.status === "accepted"
                            ? "default"
                            : "outline"
                      }
                    >
                      {request.status === "pending"
                        ? "Kutilmoqda"
                        : request.status === "accepted"
                          ? "Qabul qilingan"
                          : "Rad etilgan"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <CollaborationRequestDialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen} />
      <CollaborationDetailsDialog
        open={isDetailsDialogOpen}
        onOpenChange={setIsDetailsDialogOpen}
        request={selectedRequest}
      />
    </div>
  )
}
