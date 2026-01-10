"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const showcaseImages = [
  {
    src: "/collaboration.svg",
    alt: "Aux Music - Collaborative playlist management",
    caption: "Real-time Collaboration",
  },
  {
    src: "/instant-connection.svg",
    alt: "Aux Music - QR code session joining",
    caption: "Instant Connection",
  },
  {
    src: "/variety.svg",
    alt: "Aux Music - YouTube music search",
    caption: "Millions of Songs",
  },
]

export function AuxMusicShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const imagesRef = useRef<(HTMLDivElement | null)[]>([])
  const captionsRef = useRef<(HTMLDivElement | null)[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })

      // Parallax effect for each image
      imagesRef.current.forEach((imageContainer, index) => {
        if (!imageContainer) return

        // Vertical parallax - alternating direction for visual interest
        const direction = index % 2 === 0 ? -1 : 1
        const yMovement = 30 * direction

        gsap.to(imageContainer.querySelector(".parallax-image"), {
          y: yMovement,
          ease: "none",
          scrollTrigger: {
            trigger: imageContainer,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })

        // Fade in on scroll
        gsap.from(imageContainer, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageContainer,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      })

      // Caption scroll parallax - moves with scroll until reaching image end
      captionsRef.current.forEach((captionContainer, index) => {
        if (!captionContainer) return

        const imageContainer = imagesRef.current[index]
        if (!imageContainer) return

        gsap.to(captionContainer, {
          y: 100,
          ease: "none",
          scrollTrigger: {
            trigger: imageContainer,
            start: "top bottom",
            end: "bottom center",
            scrub: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Hover zoom effect
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion || hoveredIndex === null) return

    const imageElement = imagesRef.current[hoveredIndex]?.querySelector(".parallax-image img")

    if (imageElement) {
      gsap.to(imageElement, {
        scale: 1.08,
        duration: 0.6,
        ease: "power2.out",
      })
    }

    return () => {
      if (imageElement) {
        gsap.to(imageElement, {
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        })
      }
    }
  }, [hoveredIndex])

  return (
    <section ref={sectionRef} className="py-20 md:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center mb-16 text-white"
        >
          Experience Seamless Music Sharing
        </h2>

        <div className="space-y-20">
          {showcaseImages.map((image, index) => (
            <div
              key={index}
              ref={(el) => {
                imagesRef.current[index] = el
              }}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image Container */}
              <div className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-2xl border-4 border-white bg-yellow-200/95">
                <div className="parallax-image relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-contain p-12 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      hoveredIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </div>

              {/* Caption */}
              <div
                ref={(el) => {
                  captionsRef.current[index] = el
                }}
                className={`w-full md:w-1/2 flex items-center ${index % 2 === 0 ? 'justify-start -mt-6 md:mt-0 md:-ml-6' : 'justify-end -mt-6  md:mt-0 md:-mr-6'}`}
              >
                <div className="text-center md:text-left space-y-4 max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{image.caption}</h3>
                  <div className="h-1 w-20 bg-secondary mx-auto md:mx-0 rounded-full" />
                  <p className="text-lg text-white/70">
                    {index === 0 &&
                      "Everyone sees the queue update in real-time as songs are added. No delays, no confusion."}
                    {index === 1 &&
                      "Scan a QR code and you're in. No accounts, no passwords, no friction. Just music."}
                    {index === 2 &&
                      "Search and play from YouTube's vast library. Every genre, every artist, at your fingertips."}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
