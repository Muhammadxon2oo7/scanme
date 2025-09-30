import Link from "next/link"
import { QrCode } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary mb-4">
              <QrCode className="h-8 w-8" />
              ScanMe
            </Link>
            <p className="text-muted-foreground max-w-md">
              Mahsulot ma'lumotlarini QR kod orqali boshqarish va ulashning zamonaviy platformasi. Ishlab chiqaruvchilar
              va foydalanuvchilar uchun qulay yechim.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platforma</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="#features" className="hover:text-foreground transition-colors">
                  Xususiyatlar
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-foreground transition-colors">
                  Qanday ishlaydi
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors">
                  Narxlar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Yordam</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/support" className="hover:text-foreground transition-colors">
                  Qo'llab-quvvatlash
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-foreground transition-colors">
                  Hujjatlar
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Aloqa
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 ScanMe. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  )
}
