import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { QrCode } from "lucide-react"
import { ScanResultContent } from "./scan-result-content"

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background grid-pattern flex items-center justify-center">
      <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 text-center">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <QrCode className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Yuklanmoqda...</h2>
        <p className="text-muted-foreground">Sahifa tayyorlanmoqda</p>
      </Card>
    </div>
  )
}

export default function ScanResultPage() {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <ScanResultContent />
      </Suspense>
      <Footer />
    </div>
  )
}
