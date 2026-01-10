"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Wifi, Music } from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const features = [
  {
    icon: Users,
    title: "Collaborative Control",
    description: "Everyone can add songs and manage the queue together. Democracy in music selection.",
  },
  {
    icon: Wifi,
    title: "Works Offline",
    description: "Connects directly over local WiFi. Only the host needs internet connection to stream music.",
  },
  {
    icon: Music,
    title: "YouTube Integration",
    description: "Access millions of songs through YouTube. If it's on YouTube, you can play it.",
  },
]

export function AuxMusicFeatures() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Title and subtitle fade in
      gsap.from([titleRef.current, subtitleRef.current], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })

      // Cards stagger animation when entering viewport
      gsap.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Hover animation for individual cards
  const handleCardHover = (index: number, isHovering: boolean) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    gsap.to(cardsRef.current[index], {
      y: isHovering ? -8 : 0,
      scale: isHovering ? 1.02 : 1,
      boxShadow: isHovering
        ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      duration: 0.3,
      ease: "power2.out",
    })
  }

  return (
    <section ref={sectionRef} className="py-20 md:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Key Features
          </h2>
          <p ref={subtitleRef} className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Everything you need for the perfect shared music experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}
              >
                <Card className="h-full border-2 border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-secondary/50 transition-all duration-300">
                  <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                    {/* Icon with background */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-primary shadow-lg">
                      <Icon className="h-8 w-8" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>

                    {/* Description */}
                    <p className="text-white/70 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
