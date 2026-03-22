"use client"

import { BrainCircuit, Check } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const ITEMS = [
  {
    num: "01",
    tag: "Internal",
    heading: "Smarter Processes",
    body: "We embed AI into your workflows to cut manual effort, surface insights faster, and let your team focus on work that actually matters. From automating repetitive tasks to building internal tools that learn from your data — we make your operations run smarter.",
    bullets: [
      "Workflow automation & intelligent routing",
      "Data analysis and reporting pipelines",
      "Internal tooling powered by LLMs",
    ],
  },
  {
    num: "02",
    tag: "Customer-Facing",
    heading: "Better User Experiences",
    body: "We build AI features your customers actually use — personalised recommendations, natural language interfaces, and intelligent assistants that make your product feel ahead of the curve.",
    bullets: [
      "Conversational AI & chatbots",
      "Personalisation and recommendation engines",
      "Intelligent search and document Q&A",
    ],
  },
]

function AIItem({
  num,
  tag,
  heading,
  body,
  bullets,
  delay,
  isVisible,
}: (typeof ITEMS)[number] & { delay: number; isVisible: boolean }) {
  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease ${delay}s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {/* Step header row */}
      <div className="flex items-start gap-6 mb-4">
        <span className="text-5xl font-black leading-none text-secondary select-none shrink-0">
          {num}
        </span>
        <div className="self-stretch border-l-2 border-dashed border-secondary/70" />
        <div className="pt-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
            {tag}
          </span>
          <h3 className="text-2xl font-bold text-primary-foreground mt-0.5">{heading}</h3>
        </div>
      </div>

      {/* Dashed horizontal divider */}
      <div className="border-t-2 border-dashed border-secondary/70 mb-6" />

      {/* Two-column content with dashed vertical divider */}
      <div className="grid md:grid-cols-2">
        <p className="text-primary-foreground/70 leading-relaxed md:pr-8">{body}</p>
        <ul className="flex flex-col gap-2 md:pl-8 md:border-l-2 md:border-dashed md:border-secondary/70 mt-6 md:mt-0">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-primary-foreground/80">
              <Check className="h-4 w-4 mt-0.5 shrink-0 text-secondary" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function AISolutionsSection() {
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal(0.1)
  const { ref: itemsRef, isVisible: itemsVisible } = useScrollReveal(0.1)

  return (
    <section className="pt-6 pb-12 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32 w-full text-primary-foreground">
      <div className="container px-4 md:px-6 mx-auto">

        {/* Heading */}
        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className="flex flex-col items-center text-center space-y-4 mb-14"
        >
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-secondary"
            style={{
              opacity: headingVisible ? 1 : 0,
              transition: "opacity 0.5s ease 0.05s",
            }}
          >
            <BrainCircuit className="h-4 w-4" />
            AI Solutions
          </div>
          <h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary-foreground"
            style={{
              clipPath: headingVisible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
              transition: "clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.12s",
            }}
          >
            We deploy AI <span className="text-secondary">where it counts</span>
          </h2>
          <p
            className="max-w-[640px] text-primary-foreground/70 md:text-lg/relaxed"
            style={{
              clipPath: headingVisible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
              transition: "clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.24s",
            }}
          >
            Internally, to make your processes sharper. For your customers, to make their experience unforgettable.
          </p>
        </div>

        {/* Numbered items */}
        <div
          ref={itemsRef as React.RefObject<HTMLDivElement>}
          className="flex flex-col gap-20"
        >
          {ITEMS.map((item, i) => (
            <AIItem
              key={item.num}
              {...item}
              delay={i * 0.14 + 0.08}
              isVisible={itemsVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
