"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ServicesMegaMenu } from "./services-mega-menu"
import { AboutMegaMenu } from "./about-mega-menu"
import { cn } from "@/lib/utils"

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }

  // Mobile nav items with stagger index
  const mobileNavItems = [
    { type: "link", label: "Home", href: "/", index: 0 },
    { type: "group-header", label: "Services", index: 1 },
    { type: "sub-link", label: "Projects", href: "/projects", index: 2 },
    { type: "sub-link", label: "Co-working", href: "/coworking", index: 3 },
    { type: "group-header", label: "About Us", index: 4 },
    { type: "sub-link", label: "Life at I²", href: "/life-at-isquare", index: 5 },
    { type: "sub-link", label: "Blog", href: "/blog", index: 6 },
    { type: "link", label: "Contact", href: "/contact", index: 7 },
  ]

  return (
    <header
      className="border-b w-full sticky top-0 bg-background z-50"
    >
      {/* Scroll progress bar */}
      <div
        className="absolute top-0 left-0 h-0.5 bg-secondary transition-all duration-100 ease-out z-10"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10 rounded-md overflow-hidden">
            <Image src="/logo.png" alt="Integrated Identities Logo" fill className="object-cover" priority />
          </div>
          <span className="font-bold text-xl">Integrated Identities</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-sm font-medium nav-link-slide">
              Home
            </Link>
            <div className="flex items-center">
              <ServicesMegaMenu />
              <AboutMegaMenu />
            </div>
            <Link href="/contact" className="text-sm font-medium nav-link-slide">
              Contact
            </Link>
          </div>
        </nav>

        {/* Desktop CTA Button */}
        <Button asChild className="hidden md:flex">
          <Link href="/contact">Get in Touch</Link>
        </Button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu — kept in DOM, animated with opacity + translateX stagger */}
      <div
        className={cn(
          "fixed inset-0 top-16 bg-background z-40 md:hidden transition-opacity duration-200",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col h-full">
          <nav className="flex flex-col p-6 space-y-4">
            {mobileNavItems.map((item) => {
              const delay = `${item.index * 0.04 + 0.06}s`
              const style = {
                transform: isMenuOpen ? "translateX(0)" : "translateX(-18px)",
                opacity: isMenuOpen ? 1 : 0,
                transition: `transform 0.3s ease ${delay}, opacity 0.25s ease ${delay}`,
              }

              if (item.type === "group-header") {
                return (
                  <div key={item.label} style={style} className="pl-4 border-l-2 border-muted pt-2">
                    <h3 className="text-base font-semibold text-muted-foreground">{item.label}</h3>
                  </div>
                )
              }
              if (item.type === "sub-link") {
                return (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className="pl-8 text-base hover:text-primary"
                    style={style}
                    onClick={toggleMenu}
                  >
                    {item.label}
                  </Link>
                )
              }
              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="text-lg font-medium hover:text-primary"
                  style={style}
                  onClick={toggleMenu}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div
            className="mt-auto p-6 border-t"
            style={{
              transform: isMenuOpen ? "translateY(0)" : "translateY(10px)",
              opacity: isMenuOpen ? 1 : 0,
              transition: `transform 0.3s ease 0.36s, opacity 0.25s ease 0.36s`,
            }}
          >
            <Button asChild className="w-full">
              <Link href="/contact" onClick={toggleMenu}>
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
