"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"

const ROTATING_WORDS = ["infinite", "endless", "limitless", "boundless"]


function addRipple(e: React.MouseEvent<HTMLElement>) {
  const btn = e.currentTarget
  const rect = btn.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const ripple = document.createElement("span")
  ripple.style.cssText = `
    position:absolute;
    width:${size}px;height:${size}px;
    left:${e.clientX - rect.left - size / 2}px;
    top:${e.clientY - rect.top - size / 2}px;
    background:rgba(255,255,255,0.3);
    border-radius:50%;
    transform:scale(0);
    animation:ripple-expand 0.6s ease-out forwards;
    pointer-events:none;
  `
  btn.style.position = "relative"
  btn.style.overflow = "hidden"
  btn.appendChild(ripple)
  setTimeout(() => ripple.remove(), 650)
}

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0)
  const [wordVisible, setWordVisible] = useState(true)
  const [revealed, setRevealed] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  // Trigger reveal on mount
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 80)
    return () => clearTimeout(t)
  }, [])

  // Cycle through rotating words
  useEffect(() => {
    const id = setInterval(() => {
      setWordVisible(false)
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length)
        setWordVisible(true)
      }, 280)
    }, 2200)
    return () => clearInterval(id)
  }, [])

  // Mouse parallax for background orb
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  // Scroll to fade out the scroll indicator
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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

  const orbX = (mousePos.x - 0.5) * 60
  const orbY = (mousePos.y - 0.5) * 40

  return (
    <section
      ref={heroRef}
      className="relative py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground w-full overflow-hidden grid-texture"
    >
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid-bg text-white/10 pointer-events-none" />

      {/* Moving gold orb */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(45 100% 65% / 0.10) 0%, transparent 65%)",
          top: "-10%",
          right: "5%",
          transform: `translate(${orbX}px, ${orbY}px)`,
          transition: "transform 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:gap-12 xl:grid-cols-[1fr_460px]">
          {/* Text column */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                {/* Line 1 */}
                <span className="block overflow-hidden">
                  <span
                    style={{
                      display: "inline-block",
                      transform: revealed ? "translateY(0)" : "translateY(110%)",
                      transition: "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
                    }}
                  >
                    <span className="text-secondary">1</span> identity,
                  </span>
                </span>
                {/* Line 2 */}
                <span className="block overflow-hidden">
                  <span
                    style={{
                      display: "inline-block",
                      transform: revealed ? "translateY(0)" : "translateY(110%)",
                      transition: "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.22s",
                    }}
                  >
                    <span
                      className="text-secondary"
                      style={{
                        display: "inline-block",
                        opacity: wordVisible ? 1 : 0,
                        transform: wordVisible ? "translateY(0)" : "translateY(-6px)",
                        transition: "opacity 0.28s ease, transform 0.28s ease",
                      }}
                    >
                      {ROTATING_WORDS[wordIndex]}
                    </span>{" "}
                    solutions
                  </span>
                </span>
              </h1>

              <div style={{ overflow: "hidden" }}>
                <p
                  className="text-xl max-w-[600px] text-primary-foreground/80"
                  style={{
                    transform: revealed ? "translateY(0)" : "translateY(28px)",
                    opacity: revealed ? 1 : 0,
                    transition: "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.36s, opacity 0.6s ease 0.36s",
                  }}
                >
                  Transforming ideas into powerful software solutions across desktop, mobile, and web platforms.
                </p>
              </div>
            </div>

            <div
              className="flex flex-col gap-3 min-[400px]:flex-row"
              style={{
                transform: revealed ? "translateY(0)" : "translateY(20px)",
                opacity: revealed ? 1 : 0,
                transition: "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.48s, opacity 0.6s ease 0.48s",
              }}
            >
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="transition-transform duration-150 ease-out"
                onMouseMove={onMagneticMove}
                onMouseLeave={onMagneticLeave}
                onClick={addRipple}
              >
                <Link href="/contact">
                  Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="fill-from-left bg-transparent border-white text-white hover:bg-transparent hover:text-white"
                onMouseMove={onMagneticMove}
                onMouseLeave={onMagneticLeave}
              >
                <Link href="/life-at-isquare">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Hero image */}
          <div className="flex justify-center"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s",
            }}
          >
            <Image
              src="/hero.svg"
              width={400}
              height={400}
              alt="Integrated Identities - Software Solutions"
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-primary-foreground/50 select-none"
        style={{
          opacity: scrollY < 80 ? 1 : 0,
          transform: `translateX(-50%) translateY(${scrollY < 80 ? 0 : 8}px)`,
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  )
}
