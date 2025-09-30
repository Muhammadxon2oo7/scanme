import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { QrCode, Scan, Info, ThumbsUp, Building2, Plus } from "lucide-react"

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="container mx-auto ">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6">
            Qanday <span className="text-primary">ishlaydi</span>?
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Oddiy foydalanuvchilar va ishlab chiqaruvchilar uchun alohida imkoniyatlar
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* For Regular Users */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Oddiy Foydalanuvchilar Uchun</h3>
            <div className="space-y-6">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Scan className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">QR Kodni Skanerlang</h4>
                    </div>
                    <p className="text-muted-foreground">Mahsulotdagi QR kodni kamera orqali skanerlang</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Ma'lumotlarni Ko'ring</h4>
                    </div>
                    <p className="text-muted-foreground">Mahsulot haqida barcha ma'lumotlarni bir joyda ko'ring</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ThumbsUp className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Baho va Sharh</h4>
                    </div>
                    <p className="text-muted-foreground">Mahsulotga baho bering va o'z fikringizni bildiring</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* For Manufacturers */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Ishlab Chiqaruvchilar Uchun</h3>
            <div className="space-y-6">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Ro'yxatdan O'ting</h4>
                    </div>
                    <p className="text-muted-foreground">Tashkilot elektron kaliti bilan ro'yxatdan o'ting</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Plus className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Mahsulot Qo'shing</h4>
                    </div>
                    <p className="text-muted-foreground">Mahsulot haqida barcha ma'lumotlarni kiriting</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <QrCode className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">QR Kod Oling</h4>
                    </div>
                    <p className="text-muted-foreground">Mahsulotingiz uchun maxsus QR kod yarating</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="scan-button text-lg px-8 py-6 h-auto">
            <Building2 className="mr-2 h-6 w-6" />
            Ishlab Chiqaruvchi Sifatida Boshlash
          </Button>
        </div>
      </div>
    </section>
  )
}
