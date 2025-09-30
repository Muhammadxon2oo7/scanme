"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Building2, Calendar, Package, MessageSquare, CheckCircle, XCircle } from "lucide-react"

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

interface CollaborationDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  request: CollaborationRequest | null
}

export function CollaborationDetailsDialog({ open, onOpenChange, request }: CollaborationDetailsDialogProps) {
  if (!request) return null

  const handleAction = (action: "accept" | "reject") => {
    // Here would be the actual API call
    console.log(`${action} request ${request.id}`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card/95 backdrop-blur-sm border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Hamkorlik Taklifi Tafsilotlari
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Organization Info */}
          <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{request.fromOrganization}</h3>
              <p className="text-sm text-muted-foreground">STIR: {request.fromTaxId}</p>
            </div>
            <div className="ml-auto">
              <Badge
                variant={
                  request.status === "pending" ? "secondary" : request.status === "accepted" ? "default" : "outline"
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

          {/* Request Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Mahsulot</p>
                <p className="font-medium">{request.productName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Qism/Komponent</p>
                <p className="font-medium">{request.componentName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Yuborilgan sana</p>
                <p className="font-medium">{request.createdAt}</p>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <h4 className="font-medium">Xabar</h4>
            <div className="p-4 rounded-lg bg-background/50 border border-border/50">
              <p className="text-sm">{request.message}</p>
            </div>
          </div>

          {/* Actions */}
          {request.status === "pending" && request.type === "incoming" && (
            <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
              <Button
                variant="outline"
                onClick={() => handleAction("reject")}
                className="bg-red-500/10 border-red-500/20 text-red-600 hover:bg-red-500/20"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Rad Etish
              </Button>
              <Button
                onClick={() => handleAction("accept")}
                className="bg-green-500/10 border-green-500/20 text-green-600 hover:bg-green-500/20"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Qabul Qilish
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
