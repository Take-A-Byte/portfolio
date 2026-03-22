import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { ServicesSection } from "@/components/home/services-section"
import { AppDevSection } from "@/components/home/app-dev-section"
import { AISolutionsSection } from "@/components/home/ai-solutions-section"
import { SectionEraser } from "@/components/home/section-eraser"
import { TechSection } from "@/components/home/tech-section"
import { CTASection } from "@/components/home/cta-section"

export const metadata: Metadata = {
  title: "I² | Integrated Identities — Software Development & Consultancy",
  description:
    "1 identity, infinite solutions. Integrated Identities builds custom software across desktop, mobile, and web — development, testing, and IT consultancy from Pune, India.",
  openGraph: {
    title: "I² | Integrated Identities — Software Development & Consultancy",
    description:
      "Transforming ideas into powerful software solutions across desktop, mobile, and web platforms.",
    url: "https://www.integratedidentities.in",
  },
  alternates: {
    canonical: "https://www.integratedidentities.in",
  },
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <MainNav />
      <main className="flex-1 w-full">
        <HeroSection />
        <ServicesSection />
        <div className="bg-primary grid-texture">
          <div className="eraser-slide-top" style={{ transform: "translateY(calc(20px * var(--eraser-progress, 0)))" }}>
            <AppDevSection />
          </div>
          <SectionEraser />
          <div className="eraser-slide-bottom" style={{ transform: "translateY(calc(80px * (1 - var(--eraser-progress, 0))))" }}>
            <AISolutionsSection />
          </div>
        </div>
        <TechSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
