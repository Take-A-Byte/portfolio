"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export default function ProjectsPage() {
  const [isHovered, setIsHovered] = useState(false)
  const [isEvenProjectHovered, setIsEvenProjectHovered] = useState<boolean | undefined>(undefined)
  const handleHover = (isHovered: boolean, isEvenHovered: boolean | undefined = undefined) => {
    setIsHovered(isHovered)
    setIsEvenProjectHovered(isEvenHovered)
  }

  const projects = [
    {
      title: "PSPDFKit for Windows",
      description:
        "SDK offering developers powerful APIs for quickly adding document functionalities to a windows application.",
    },
    {
      title: "PSPDFKit for MAUI",
      description:
        "One SDK to deploy document functionalities on cross-platform apps on iOS, MacOS, Android, and Windows.",
    },
    {
      title: "Avelyn",
      description:
        "Elevate your document workflow with conversational interactions. Ask questions, make requests, and simplify your document handling.",
    },
    {
      title: "Shapr3D for Windows",
      description:
        "Design your 3D models on Windows machine - be it on a desktop, laptop, or tablet; with mouse, touch or pen.",
    },
    {
      title: "Linton",
      description:
        "Seamlessly navigate and interact with millions of points from Renishaw scanner data, presented in a visually appealing 3D environment.",
    },
    {
      title: "Micro Installation Wizard",
      description:
        "An XML based language developed to allow engineers to create a customizable installer with increased reusability and reduced efforts.",
    },
    {
      title: "DMIS Parser",
      description:
        "A parser that helps application engineers to visualize, convert and rectify CMM programs to Renishaw format.",
    },
    {
      title: "Utility Hub",
      description: "A dev-ex hub for Renishaw developers to access tools, utilities, and resources centrally.",
    },
  ]

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
        <section className="py-12 md:py-24 lg:py-32 w-full">
          <div className="container relative flex w-full items-center justify-center">
            <div className="relative w-full max-w-3xl">
              {/* Vertical guiding line - positioned left on mobile, center on desktop */}
              <div className="absolute left-8 md:left-1/2 h-full w-1 md:-translate-x-1/2 transform bg-primary py-12"></div>
              
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className={`group relative mb-12 flex items-center flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    onMouseEnter={() => handleHover(true, index % 2 === 0)}
                    onMouseLeave={() => handleHover(false)}
                  >
                  {/* Project details */}
                  <div
                    className={`group-hover:scale-110 
                      ${index % 2 === 0 
                        ? 'pl-[80px] text-left md:w-1/2 md:pl-0 md:pr-12 md:text-right md:group-hover:-translate-x-6 group-hover:translate-x-6' 
                        : 'pl-[80px] text-left md:w-1/2 md:pl-12 md:text-left md:group-hover:translate-x-6 group-hover:translate-x-6'}`
                    }
                  >
                    <h3 className="text-lg font-bold text-primary">{project.title}</h3>
                    <p className="text-sm text-gray-600">{project.description}</p>
                  </div>
                  
                  {/* Circle Connector */}
                  <div
                    className={`absolute left-8 md:left-1/2 z-10 flex h-28 w-20 -translate-x-1/2 transform items-center 
                      justify-center rounded-full group-hover:w-24 
                      ${index % 2 === 0 
                        ? 'border-r-8 md:border-l-8 md:border-r-0' 
                        : 'border-r-8 md:border-r-8 md:border-l-0'} 
                      border-secondary`
                    }
                  ></div>
                  
                  {/* Circle */}
                  <div className="absolute left-8 md:left-1/2 z-10 flex h-12 w-8 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-primary bg-white"></div>
                  
                  {/* Line Connector (only for non-last elements) */}
                  {index !== projects.length - 1 && (
                    <div className="absolute left-8 md:left-1/2 h-36 w-1 -translate-y-6 md:-translate-x-1/2 transform  bg-primary"></div>
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
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
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
