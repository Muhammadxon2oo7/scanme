import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { QrCode, Building2 } from "lucide-react"
import { AboutUsDialog } from "@/src/components/about-us-dialog"

export function Header() {
  return (
    <header className="border-b border-border/20 backdrop-blur-md bg-background/60 sticky top-0 z-50 modern-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary group">
            <div className="relative">
              <QrCode className="h-8 w-8 group-hover:rotate-12 transition-all duration-300" />
              <div className="absolute inset-0 bg-primary/20 blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
            </div>
            <span className="text-glow">ScanMe</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-primary transition-all duration-300 relative group"
            >
              Xususiyatlar
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="#how-it-works"
              className="text-muted-foreground hover:text-primary transition-all duration-300 relative group"
            >
              Qanday ishlaydi
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <AboutUsDialog>
              <button className="text-muted-foreground hover:text-primary transition-all duration-300 relative group">
                Biz haqimizda
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </button>
            </AboutUsDialog>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              asChild
              className="modern-card border-primary/30 hover:border-primary/60 light-trail group bg-transparent"
            >
              <Link href="/login" className="flex items-center gap-2">
                <Building2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                Ishlab chiqaruvchimisiz?
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
