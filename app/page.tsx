import type { Metadata } from "next"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { ServicesSection } from "@/components/home/services-section"
import { AppDevSection } from "@/components/home/app-dev-section"
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
        <AppDevSection />
        <TechSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
