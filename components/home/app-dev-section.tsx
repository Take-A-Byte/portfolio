"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Laptop, Smartphone, Globe, Database } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const FEATURES = [
  { Icon: Laptop, label: "Desktop Applications" },
  { Icon: Smartphone, label: "Mobile Applications" },
  { Icon: Globe, label: "Web Applications" },
  { Icon: Database, label: "Backend Systems" },
]

function FeatureRow({
  Icon,
  label,
  delay,
  isVisible,
}: {
  Icon: React.ElementType
  label: string
  delay: string
  isVisible: boolean
}) {
  const iconRef = useRef<HTMLDivElement>(null)

  const onEnter = () => {
    if (!iconRef.current) return
    iconRef.current.style.transform = "scale(1.35)"
    iconRef.current.style.color = "hsl(var(--secondary))"
    setTimeout(() => {
      if (iconRef.current) iconRef.current.style.transform = "scale(1)"
    }, 220)
  }
  const onLeave = () => {
    if (iconRef.current) {
      iconRef.current.style.transform = "scale(1)"
      iconRef.current.style.color = ""
    }
  }

  return (
    <div
      className="flex items-center gap-3 cursor-default"
      style={{
        transform: isVisible ? "translateX(0)" : "translateX(-24px)",
        opacity: isVisible ? 1 : 0,
        transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}, opacity 0.5s ease ${delay}`,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        ref={iconRef}
        className="transition-all duration-200 ease-out"
        style={{ color: "hsl(var(--secondary))" }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <span className="font-medium text-primary-foreground">{label}</span>
    </div>
  )
}

// Image tile with hover tilt
function ImageTile({
  src,
  alt,
  width,
  height,
  parallaxClass,
}: {
  src: string
  alt: string
  width: number
  height: number
  parallaxClass: string
}) {
  const imgRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = imgRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(600px) rotateX(${y * -8}deg) rotateY(${x * 8}deg) scale(1.06)`
  }
  const onLeave = () => {
    if (imgRef.current) imgRef.current.style.transform = ""
  }

  return (
    <div
      ref={imgRef}
      className={`rounded-lg overflow-hidden transition-transform duration-200 ease-out ${parallaxClass}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <Image src={src} width={width} height={height} alt={alt} className="rounded-lg object-cover h-auto w-full" />
    </div>
  )
}

export function AppDevSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { ref: textColRef, isVisible } = useScrollReveal(0.1)

  // GSAP ScrollTrigger parallax on image columns
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(".app-img-top", {
        y: -28,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      })
      gsap.to(".app-img-bottom", {
        y: 28,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground w-full overflow-hidden grid-texture"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text column */}
          <div
            ref={textColRef as React.RefObject<HTMLDivElement>}
            className="flex flex-col justify-center space-y-6"
          >
            <div className="space-y-3">
              <h2
                className="text-3xl font-bold tracking-tighter sm:text-4xl"
                style={{
                  clipPath: isVisible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                  transition: "clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.05s",
                }}
              >
                App Development Specialists
              </h2>
              <p
                className="md:text-xl/relaxed"
                style={{
                  clipPath: isVisible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                  transition: "clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.18s",
                }}
              >
                We create powerful, user-friendly applications across all platforms, ensuring seamless experiences
                for your users.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {FEATURES.map((f, i) => (
                <FeatureRow
                  key={f.label}
                  Icon={f.Icon}
                  label={f.label}
                  delay={`${i * 0.09 + 0.28}s`}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>

          {/* Image grid with parallax */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-4">
              <ImageTile
                src="/desktop.svg"
                alt="Desktop Application"
                width={180}
                height={240}
                parallaxClass="app-img-top"
              />
              <ImageTile
                src="/tablet.svg"
                alt="Backend System"
                width={300}
                height={280}
                parallaxClass="app-img-bottom"
              />
            </div>
            <div className="grid gap-4">
              <ImageTile
                src="/mobile.svg"
                alt="Mobile Application"
                width={300}
                height={280}
                parallaxClass="app-img-top"
              />
              <ImageTile
                src="/website.svg"
                alt="Web Application"
                width={200}
                height={240}
                parallaxClass="app-img-bottom"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
