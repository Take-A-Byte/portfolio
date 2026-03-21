"use client"

import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const PHOTOS = [
  { src: "/images/office-1.jpeg", alt: "Office space", span: "row-span-2" },
  { src: "/images/office-2.jpeg", alt: "Team at work", span: "" },
  { src: "/images/office-3.jpeg", alt: "Collaboration area", span: "" },
  { src: "/images/office-4.jpeg", alt: "Meeting room", span: "" },
  { src: "/images/office-5.jpeg", alt: "Common area", span: "" },
  { src: "/images/office-6.jpeg", alt: "Work setup", span: "" },
]

export function GallerySection() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.08)

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-12 md:py-24 lg:py-32 bg-muted/40 w-full"
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
            Our Space
          </h2>
          <p
            className="max-w-[500px] text-muted-foreground md:text-lg"
            style={{
              clipPath: isVisible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
              transition: "clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.18s",
            }}
          >
            Where ideas turn into products.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px]">
          {PHOTOS.map((photo, i) => {
            const delay = `${i * 0.08 + 0.1}s`
            return (
              <div
                key={photo.src}
                className={`relative overflow-hidden rounded-lg group ${photo.span}`}
                style={{
                  transform: isVisible ? "scale(1) translateY(0)" : "scale(0.96) translateY(20px)",
                  opacity: isVisible ? 1 : 0,
                  transition: `transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}, opacity 0.55s ease ${delay}`,
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
