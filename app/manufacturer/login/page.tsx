import { ManufacturerLoginForm } from "@/components/manufacturer/login-form"
import { Card } from "@/components/ui/card"
import { Building2, QrCode } from "lucide-react"
import Link from "next/link"

export default function ManufacturerLoginPage() {
  return (
    <div className="min-h-screen bg-background grid-pattern flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary mb-4">
            <QrCode className="h-8 w-8" />
            ScanMe
          </Link>
          <h1 className="text-3xl font-bold mb-2">Ishlab Chiqaruvchi Kirish</h1>
          <p className="text-muted-foreground">Tashkilot elektron kaliti bilan tizimga kiring</p>
        </div>

        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Tashkilot Kirishi</h2>
              <p className="text-sm text-muted-foreground">Elektron kalit talab qilinadi</p>
            </div>
          </div>

          <ManufacturerLoginForm />
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Asosiy sahifaga qaytish
          </Link>
        </div>
      </div>
    </div>
  )
}
