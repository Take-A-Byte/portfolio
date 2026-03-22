"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { ctaButtonGroup } from "@/lib/styles"
import { projects } from "@/lib/data/projects"


export default function ProjectsPage() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])


  useEffect(() => {
    const handleFocus = () => {
      const center = window.innerHeight / 2
      let closestIdx = 0
      let closestDist = Infinity
      itemsRef.current.forEach((item, i) => {
        if (!item) return
        const rect = item.getBoundingClientRect()
        const dist = Math.abs((rect.top + rect.bottom) / 2 - center)
        if (dist < closestDist) { closestDist = dist; closestIdx = i }
      })
      setActiveIndex(closestIdx)
    }
    window.addEventListener("scroll", handleFocus, { passive: true })
    handleFocus()
    return () => window.removeEventListener("scroll", handleFocus)
  }, [])

  return (
    <div className="flex flex-col min-h-screen w-full">
      <MainNav />

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Our <span className="text-secondary">Projects</span>
                </h1>
                <p className="max-w-[700px] text-primary-foreground/80 md:text-xl/relaxed">
                  Explore our portfolio of innovative solutions across various industries and technologies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Timeline Section */}
        <section className="py-12 md:py-24 lg:py-32 w-full overflow-x-hidden">
          <div className="container relative flex w-full items-center justify-center px-4 md:px-6">
            <div className="relative w-full max-w-3xl">
              {/* Vertical guiding line */}
              <div className="absolute left-8 md:left-1/2 h-full w-1 md:-translate-x-1/2 transform bg-primary py-12"></div>

              {projects.map((project, index) => (
                <div
                  key={index}
                  ref={(el) => { itemsRef.current[index] = el }}
                  className={`relative mb-12 flex items-center flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Project details */}
                  <div
                    className={`project-details ${
                      index % 2 === 0
                        ? 'pl-[80px] pr-12 text-left md:w-1/2 md:pl-0 md:pr-12 md:text-right'
                        : 'pl-[80px] pr-12 text-left md:w-1/2 md:pl-12 md:pr-0 md:text-left'
                    }`}
                    style={(() => {
                      const isOnRight = isMobile || index % 2 !== 0
                      return {
                        opacity: index === activeIndex ? 1 : 0.35,
                        transform: index === activeIndex
                          ? `scale(1.1) translateX(${isOnRight ? '1.5rem' : '-1.5rem'})`
                          : undefined,
                        transition: 'opacity 500ms, transform 500ms',
                      }
                    })()}
                  >
                    <h3 className="text-lg font-bold text-primary">{project.title}</h3>
                    <p className="text-sm text-gray-600">{project.description}</p>

                    {project.links && (
                      <div
                        className={`mt-2 flex flex-wrap gap-2 ${
                          index % 2 === 0
                            ? 'justify-start md:justify-end'
                            : 'justify-start md:justify-start'
                        }`}
                      >
                        {project.links.map((link, linkIdx) => (
                          <span key={linkIdx}>
                            <Link
                              href={link.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block text-sm underline transition-colors text-yellow-500 hover:text-yellow-500"
                            >
                              {link.title}
                            </Link>
                            {project.links && linkIdx < project.links.length - 1 && (
                              <span className="text-sm text-gray-400" aria-hidden="true">,</span>
                            )}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Circle Connector */}
                  <div
                    className={`project-connector absolute left-8 md:left-1/2 z-10 flex h-28 -translate-x-1/2 transform items-center
                      justify-center rounded-full
                      ${index % 2 === 0
                        ? 'border-r-8 md:border-l-8 md:border-r-0'
                        : 'border-r-8 md:border-r-8 md:border-l-0'}
                      border-secondary`}
                    style={{
                      width: index === activeIndex ? '6rem' : '5rem',
                      transition: 'width 500ms',
                    }}
                  ></div>

                  {/* Circle */}
                  <div className="project-circle absolute left-8 md:left-1/2 z-10 flex h-12 w-8 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-primary bg-white"></div>

                  {/* Line Connector */}
                  {index !== projects.length - 1 && (
                    <div className="absolute left-8 md:left-1/2 h-36 w-1 -translate-y-6 md:-translate-x-1/2 transform bg-primary"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Have a Project in Mind?</h2>
                <p className="max-w-[700px] md:text-xl/relaxed">
                  Let's discuss how we can help bring your ideas to life with our expertise in software development.
                </p>
              </div>
              <div className={ctaButtonGroup}>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/contact">Contact Us Today</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
