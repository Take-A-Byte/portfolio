"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function CTASection() {
  const { ref, isVisible } = useScrollReveal(0.2)

  // Magnetic button
  const onMagneticMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.28
    const y = (e.clientY - rect.top - rect.height / 2) * 0.28
    e.currentTarget.style.transform = `translate(${x}px, ${y}px)`
  }
  const onMagneticLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = ""
  }

  const words = ["Ready", "to", "Transform", "Your", "Ideas?"]

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground w-full overflow-hidden grid-texture"
    >
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid-bg text-white/10 pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-3">
            {/* Word-split headline */}
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl overflow-hidden">
              {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                  <span
                    style={{
                      display: "inline-block",
                      transform: isVisible ? "translateY(0)" : "translateY(110%)",
                      transition: `transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.07 + 0.05}s`,
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>
            <p
              className="max-w-[700px] md:text-xl/relaxed"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
              }}
            >
              From backend maintenance to system upgrades, we provide comprehensive solutions to keep your
              business running smoothly.
            </p>
          </div>

          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.6s ease 0.65s, transform 0.6s ease 0.65s",
            }}
          >
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="group overflow-hidden transition-transform duration-150 ease-out"
              onMouseMove={onMagneticMove}
              onMouseLeave={onMagneticLeave}
            >
              <Link href="/contact">
                Contact Us Today
                {/* Arrow enter/exit animation */}
                <span className="ml-2 relative inline-flex w-4 h-4 overflow-hidden">
                  <ArrowRight className="h-4 w-4 absolute transition-all duration-300 ease-out group-hover:translate-x-5 group-hover:opacity-0" />
                  <ArrowRight className="h-4 w-4 absolute -translate-x-5 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
