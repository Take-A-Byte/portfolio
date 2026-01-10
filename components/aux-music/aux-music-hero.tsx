"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, ArrowRight } from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function AuxMusicHero() {
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Initial entrance animations - stagger content fade up
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } })

      timeline
        .from(headlineRef.current, {
          y: 60,
          opacity: 0,
          duration: 1.2,
        })
        .from(
          taglineRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 1,
          },
          "-=0.8"
        )
        .from(
          descriptionRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 1,
          },
          "-=0.7"
        )
        .from(
          ctaRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden"
    >
      {/* Content */}
      <div ref={contentRef} className="relative z-10 container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white"
          >
            <span className="text-secondary">Aux</span> Music
          </h1>

          <p
            ref={taglineRef}
            className="text-2xl sm:text-3xl md:text-4xl font-medium text-white/95"
          >
            Pass the Aux. Share the Vibe.
          </p>

          <p
            ref={descriptionRef}
            className="text-lg sm:text-xl md:text-2xl max-w-3xl text-white/85 leading-relaxed"
          >
            A collaborative music control app that lets everyone at the party add songs to the queue.
            One host, unlimited friends, one shared playlist.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="group relative overflow-hidden shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Link href="https://github.com/Take-A-Byte/AuxMusic" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
                {/* Subtle glow effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:scale-105 transition-all duration-300"
            >
              <Link href="#contact">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-white/60 animate-bounce">
          <span className="text-sm font-medium">Scroll</span>
          <ArrowRight className="h-4 w-4 rotate-90" />
        </div>
      </div>
    </section>
  )
}
