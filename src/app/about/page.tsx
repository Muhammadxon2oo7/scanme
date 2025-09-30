import { Card, CardContent } from "@/src/components/ui/card"
import { Building2, Users, Code, ArrowLeft } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            variant="outline"
            asChild
            className="modern-card border-primary/30 hover:border-primary/60 bg-transparent"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Bosh sahifaga qaytish
            </Link>
          </Button>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary text-glow mb-4 flex items-center justify-center gap-3">
            <Building2 className="h-10 w-10 md:h-12 md:w-12" />
            Biz haqimizda
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            ScanMe platformasi haqida to'liq ma'lumot
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Platform Developer */}
          <Card className="modern-card bg-card/50 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/20 glow-effect">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Platforma ishlab chiqaruvchisi</h2>
              </div>
              <p className="text-3xl font-bold text-primary text-glow mb-4">E-Investment MCHJ</p>
              <p className="text-muted-foreground leading-relaxed">
                E-Investment MCHJ - zamonaviy texnologiyalar sohasida faoliyat yurituvchi kompaniya. Biz innovatsion
                yechimlar yaratish va raqamli transformatsiya jarayonlarini qo'llab-quvvatlash bilan shug'ullanamiz.
              </p>
            </CardContent>
          </Card>

          {/* Authors */}
          <Card className="modern-card bg-card/50 border-accent/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-accent/20">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Loyiha mualliflari</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-xl bg-background/50 border border-primary/20 modern-card">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Jamshidxon Imomov</h3>
                  <p className="text-sm text-muted-foreground">Loyiha rahbari</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-background/50 border border-primary/20 modern-card">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Xojiakbar Nozimjonov</h3>
                  <p className="text-sm text-muted-foreground">Dasturchi</p>
                </div>
                <div className="text-center p-6 rounded-xl bg-background/50 border border-primary/20 modern-card">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Muhammadxon Toshpo'latov</h3>
                  <p className="text-sm text-muted-foreground">Dasturchi</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Info */}
          <Card className="modern-card bg-card/50 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/20">
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">ScanMe platformasi</h2>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  ScanMe - bu mahsulotlarni QR kod orqali tekshirish va ularning haqiqiyligini aniqlash uchun
                  mo'ljallangan zamonaviy platforma. Bizning asosiy maqsadimiz iste'molchilar va ishlab chiqaruvchilar
                  o'rtasida ishonchli aloqa o'rnatish, soxta mahsulotlar bilan kurashish va bozorda halol raqobatni
                  ta'minlashdir.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Platforma orqali ishlab chiqaruvchilar o'z mahsulotlariga noyob QR kodlar yaratishlari va
                  iste'molchilar esa bu kodlarni skanerlash orqali mahsulot haqiqiyligini tekshirishlari mumkin.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Bizning texnologiyamiz zamonaviy kriptografik usullar va blockchain texnologiyasiga asoslangan bo'lib,
                  maksimal xavfsizlik va ishonchlilikni ta'minlaydi.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
