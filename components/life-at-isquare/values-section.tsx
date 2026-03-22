"use client"

import { useRef, useEffect } from "react"
import { Heart, HelpCircle, Lightbulb, MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    const shine = shineRef.current
    if (!el || !shine) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    el.style.transform = `perspective(800px) rotateX(${(y - 0.5) * -8}deg) rotateY(${(x - 0.5) * 8}deg) scale(1.02)`
    shine.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.12) 0%, transparent 62%)`
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

const VALUES = [
  {
    Icon: HelpCircle,
    title: "Ask, Learn, and Grow",
    bullets: [
      { bold: "No question is silly or stupid—always ask!", body: " The only bad question is the one never asked." },
      { bold: "Discuss in public.", body: " If you have a question, chances are someone else does too—be the one who asks and #PassOnTheKnowledge." },
      { bold: "Feedback is a gift.", body: " Give it with kindness, take it with an open mind." },
    ],
  },
  {
    Icon: MessageSquare,
    title: "Communication & Collaboration",
    bullets: [
      { bold: "Clarity beats assumptions.", body: " When in doubt, overcommunicate." },
      { bold: "Meetings should have a purpose.", body: " If there's no clear goal, let's rethink if we need it." },
    ],
  },
  {
    Icon: Lightbulb,
    title: "Work Smart, Not Just Hard",
    bullets: [
      { bold: "Progress over perfection.", body: " Iterate, improve, and ship!" },
      { bold: "Own your work.", body: " Take responsibility and pride in what you do." },
      { bold: "If it's repeated, automate it.", body: " Future-you will thank you." },
    ],
  },
  {
    Icon: Heart,
    title: "Culture & Fun",
    bullets: [
      { bold: "No egos, just teamwork.", body: " The best ideas win, no matter where they come from." },
      { bold: "We're all human.", body: " Mistakes happen—learn from them, don't dwell on them." },
    ],
  },
]

export function ValuesSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.08)
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!isVisible) return
    iconRefs.current.forEach((el, i) => {
      if (!el) return
      setTimeout(() => {
        el.style.transform = "scale(1.3) rotate(360deg)"
        setTimeout(() => { el.style.transform = "scale(1) rotate(0deg)" }, 450)
      }, i * 150 + 150)
    })
  }, [isVisible])

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-12 md:py-24 lg:py-32 w-full"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-3 text-center mb-12">
          <h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl"
            style={{
              clipPath: isVisible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
              transition: "clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.05s",
            }}
          >
            The Integrated Code
          </h2>
          <p
            className="max-w-[600px] text-muted-foreground md:text-lg"
            style={{
              clipPath: isVisible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
              transition: "clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.18s",
            }}
          >
            The values and principles that guide how we work, learn, and grow together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((value, i) => {
            const { Icon, title, bullets } = value
            const delay = `${i * 0.1 + 0.1}s`
            const isLast = i === VALUES.length - 1

            return (
              <TiltCard key={title} className={isLast ? "lg:col-start-2" : ""}>
                <Card
                  className="h-full border-t-4 border-t-secondary"
                  style={{
                    transform: isVisible ? "translateY(0)" : "translateY(32px)",
                    opacity: isVisible ? 1 : 0,
                    transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}, opacity 0.5s ease ${delay}`,
                  }}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div
                        ref={(el) => { iconRefs.current[i] = el }}
                        className="p-2 bg-secondary/20 rounded-full transition-transform duration-500"
                      >
                        <Icon className="h-6 w-6 text-secondary" />
                      </div>
                      <h2 className="text-xl font-bold">{title}</h2>
                    </div>
                    <ul className="space-y-4">
                      {bullets.map((b, bi) => (
                        <li key={bi} className="flex gap-3">
                          <span className="text-secondary font-bold mt-0.5">•</span>
                          <p className="text-sm text-foreground/80 leading-relaxed">
                            <span className="font-semibold">{b.bold}</span>{b.body}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TiltCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
