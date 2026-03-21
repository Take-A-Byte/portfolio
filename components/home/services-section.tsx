"use client"

import { useRef, useEffect, useState } from "react"
import { Code, Terminal, Globe } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

// Pure-DOM tilt + shine — no state, no re-renders on mouse move
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    const shine = shineRef.current
    if (!el || !shine) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    el.style.transform = `perspective(800px) rotateX(${(y - 0.5) * -10}deg) rotateY(${(x - 0.5) * 10}deg) scale(1.025)`
    shine.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.15) 0%, transparent 62%)`
    shine.style.opacity = "1"
  }

  const onLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = ""
    if (shineRef.current) shineRef.current.style.opacity = "0"
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative transition-transform duration-200 ease-out ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        ref={shineRef}
        className="absolute inset-0 rounded-lg pointer-events-none opacity-0 transition-opacity duration-200 z-10"
      />
      {children}
    </div>
  )
}

const SERVICES = [
  {
    Icon: Code,
    title: "Software Development",
    description:
      "Custom software solutions designed to meet your specific business requirements and challenges. From architecture to deployment, we own the full lifecycle. We love innovation — whether that means adopting cutting-edge technology or rethinking how a problem should be solved.",
    featured: true,
  },
  {
    Icon: Terminal,
    title: "Testing & QA",
    description:
      "Comprehensive testing services to ensure your software performs flawlessly across all environments.",
    featured: false,
  },
  {
    Icon: Globe,
    title: "IT Consultancy",
    description:
      "Strategic guidance to help you navigate technology decisions and optimize your digital infrastructure.",
    featured: false,
  },
]

export function ServicesSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.1)
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])

  // Trigger icon animation when section becomes visible
  useEffect(() => {
    if (!isVisible) return
    iconRefs.current.forEach((el, i) => {
      if (!el) return
      setTimeout(() => {
        el.style.transform = "scale(1.25) rotate(360deg)"
        el.style.opacity = "1"
        setTimeout(() => {
          el.style.transform = "scale(1) rotate(0deg)"
        }, 500)
      }, i * 180 + 200)
    })
  }, [isVisible])

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-12 md:py-24 lg:py-32 w-full"
    >
      <div className="container px-4 md:px-6 mx-auto">
        {/* Heading — clip-path reveal */}
        <div className="flex flex-col items-center justify-center space-y-3 text-center mb-12">
          <h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl"
            style={{
              clipPath: isVisible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
              transition: "clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.05s",
            }}
          >
            Our Expertise
          </h2>
          <p
            className="max-w-[700px] text-muted-foreground md:text-xl/relaxed"
            style={{
              clipPath: isVisible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
              transition: "clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.18s",
            }}
          >
            Comprehensive software development, testing, and consultancy services tailored to your needs.
          </p>
        </div>

        {/* Bento grid — tall left card, two stacked right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => {
            const { Icon, title, description, featured } = service
            const delay = `${i * 0.12 + 0.1}s`

            return (
              <TiltCard
                key={title}
                className={featured ? "md:row-span-2" : ""}
              >
                <div
                  className={`h-full rounded-lg border bg-card p-6 flex flex-col space-y-4 ${
                    featured ? "justify-between min-h-[260px]" : ""
                  }`}
                  style={{
                    transform: isVisible ? "translateY(0)" : "translateY(36px)",
                    opacity: isVisible ? 1 : 0,
                    transition: `transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}, opacity 0.55s ease ${delay}`,
                  }}
                >
                  <div className="space-y-4">
                    <div
                      ref={(el) => { iconRefs.current[i] = el }}
                      className="w-10 h-10 flex items-center justify-center border-2 border-secondary bg-primary rounded-full transition-transform duration-500"
                      style={{ opacity: isVisible ? 1 : 0.4 }}
                    >
                      <Icon className="h-5 w-5 text-secondary" />
                    </div>
                    <h3 className={`font-bold ${featured ? "text-2xl" : "text-xl"}`}>{title}</h3>
                    <p className="text-foreground/70 leading-relaxed">{description}</p>
                  </div>

                  {featured && (
                    <div className="pt-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary bg-primary px-3 py-1.5 rounded-full">
                        Core Service
                      </span>
                    </div>
                  )}
                </div>
              </TiltCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
