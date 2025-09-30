import Image from "next/image"
import { Card } from "@/src/components/ui/card"
import { Shield, Users, Zap, Globe, Heart, MessageSquare } from "lucide-react"
import Blockchain from "@/public/icons/blockchain.png";

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Xavfsiz va ishonchli",
      description: "Barcha ma'lumotlar shifrlangan va xavfsiz saqlanadi",
    },
    {
      icon: Zap,
      title: "Tez va oson",
      description: "Bir marta skanerlash orqali barcha ma'lumotlarni oling",
    },
    {
      icon: Users,
      title: "Ishlab chiqaruvchilar uchun",
      description: "Professional boshqaruv paneli va mahsulot statistikalari",
    },
    {
      image: Blockchain, 
      title: "Blockchain bilan tasdiqlangan",
      description:
        "Kompaniyalar joylagan mahsulotlar blockchain'da saqlanib, bir marta qo‘shilgach o‘zgarmaydi — shaffof va ishonchli.",
    },
 
    {
      icon: Heart,
      title: "Baho",
      description: "Mahsulotlarga baho bering va o'zgartiring",
    },
    {
      icon: MessageSquare,
      title: "Hamkorlik",
      description: "Bir nechta ishlab chiqaruvchi birgalikda ishlashi mumkin",
    },
  ]

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto ">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-6">
            Nima uchun <span className="text-primary">ScanMe</span>?
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Zamonaviy texnologiyalar yordamida mahsulot ma'lumotlarini boshqarish va ulashning eng qulay usuli
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:glow-effect"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                {feature.icon ? (
                  <feature.icon className="h-6 w-6 text-primary" />
                ) : feature.image ? (
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                ) : null}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
