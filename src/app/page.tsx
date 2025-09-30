import { Header } from "@/src/components/header"
import { HeroSection } from "@/src/components/hero-section"
import { FeaturesSection } from "@/src/components/features-section"
import { HowItWorksSection } from "@/src/components/how-it-works-section"
import { Footer } from "@/src/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  )
}
