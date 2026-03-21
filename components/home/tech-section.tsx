"use client"

import { useRef } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

type BadgeSize = "lg" | "md" | "sm"

const BADGES: { name: string; size: BadgeSize }[] = [
  { name: "React",        size: "lg" },
  { name: "Next.js",      size: "lg" },
  { name: "Node.js",      size: "lg" },
  { name: "Python",       size: "lg" },
  { name: "Flutter",      size: "lg" },
  { name: "Angular",      size: "md" },
  { name: "Vue.js",       size: "md" },
  { name: "Java",         size: "md" },
  { name: "Swift",        size: "md" },
  { name: "Kotlin",       size: "md" },
  { name: "React Native", size: "md" },
  { name: "AWS",          size: "md" },
  { name: "Azure",        size: "md" },
  { name: "Docker",       size: "md" },
  { name: "Kubernetes",   size: "sm" },
  { name: "CI/CD",        size: "sm" },
  { name: "GraphQL",      size: "sm" },
  { name: "MongoDB",      size: "sm" },
  { name: "PostgreSQL",   size: "sm" },
]

const ROTATIONS = [-1.8, 1.5, -0.9, 2.1, -1.4, 0.6, -2.2, 1.0, -1.1,
                    1.9, 1.3, -0.5, 2.0, -1.6, 0.8, -2.0, 0.4, 1.7, -0.8]

const DELAYS = [0.05, 0.18, 0.08, 0.22, 0.14, 0.30, 0.10, 0.26, 0.04,
                0.20, 0.12, 0.34, 0.16, 0.28, 0.06, 0.24, 0.36, 0.02, 0.32]

const SIZE_CLASSES: Record<BadgeSize, string> = {
  lg: "px-4 py-2 text-sm font-semibold",
  md: "px-3 py-1.5 text-sm",
  sm: "px-2.5 py-1 text-xs",
}

function BadgePill({
  name,
  size,
  rotation,
  delay,
  isVisible,
}: {
  name: string
  size: BadgeSize
  rotation: number
  delay: number
  isVisible: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onEnter = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = `rotate(0deg) scale(1.15)`
    el.style.background = "hsl(var(--primary))"
    el.style.color = "hsl(var(--primary-foreground))"
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = `rotate(${rotation}deg) scale(1)`
    el.style.background = ""
    el.style.color = ""
  }

  return (
    <div
      ref={ref}
      className={`${SIZE_CLASSES[size]} rounded-full bg-secondary text-secondary-foreground font-medium cursor-default transition-all duration-200 ease-out select-none`}
      style={{
        transform: isVisible ? `rotate(${rotation}deg) scale(1)` : `rotate(${rotation}deg) scale(0.55)`,
        opacity: isVisible ? 1 : 0,
        transition: `transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s, opacity 0.4s ease ${delay}s, background 0.2s ease, color 0.2s ease`,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {name}
    </div>
  )
}

export function TechSection() {
  const { ref, isVisible } = useScrollReveal(0.1)

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-12 md:py-24 lg:py-32 w-full overflow-hidden">
      <div className="absolute inset-0 dot-grid-bg text-foreground/[0.1] pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl"
            style={{
              clipPath: isVisible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
              transition: "clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.05s",
            }}
          >
            Cutting-Edge Technology
          </h2>
          <p
            className="max-w-[700px] text-foreground/70 md:text-xl/relaxed"
            style={{
              clipPath: isVisible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
              transition: "clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.18s",
            }}
          >
            We leverage the latest technologies to deliver innovative solutions that keep you ahead of the
            competition.
          </p>
        </div>

        <div className="pt-12 flex flex-wrap justify-center gap-3 gap-y-4">
          {BADGES.map((badge, i) => (
            <BadgePill
              key={badge.name}
              name={badge.name}
              size={badge.size}
              rotation={ROTATIONS[i]}
              delay={DELAYS[i]}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
