"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ServicesMegaMenu } from "./services-mega-menu"
import { AboutMegaMenu } from "./about-mega-menu"

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // Prevent scrolling when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }

  return (
    <header className="border-b w-full sticky top-0 bg-background z-50">
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
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
              Home
            </Link>
            <div className="flex items-center">
              <ServicesMegaMenu />
              <AboutMegaMenu />
            </div>

            <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
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
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-background z-40 md:hidden">
          <div className="flex flex-col h-full">
            <nav className="flex flex-col p-6 space-y-6">
              <Link href="/" className="text-lg font-medium hover:text-primary" onClick={toggleMenu}>
                Home
              </Link>

              {/* Services Group */}
              <div className="pl-4 border-l-2 border-muted">
                <h3 className="text-lg font-medium mb-3">Services</h3>
                <div className="space-y-4 pl-2">
                  <Link href="/projects" className="block text-base hover:text-primary" onClick={toggleMenu}>
                    Projects
                  </Link>
                  <Link href="/coworking" className="block text-base hover:text-primary" onClick={toggleMenu}>
                    Co-working
                  </Link>
                </div>
              </div>

              {/* About Us Group */}
              <div className="pl-4 border-l-2 border-muted">
                <h3 className="text-lg font-medium mb-3">About Us</h3>
                <div className="space-y-4 pl-2">
                  <Link href="/life-at-isquare" className="block text-base hover:text-primary" onClick={toggleMenu}>
                    Life at I²
                  </Link>
                  <Link href="/blog" className="block text-base hover:text-primary" onClick={toggleMenu}>
                    Blog
                  </Link>
                </div>
              </div>

              <Link href="/contact" className="text-lg font-medium hover:text-primary" onClick={toggleMenu}>
                Contact
              </Link>
            </nav>

            <div className="mt-auto p-6 border-t">
              <Button asChild className="w-full">
                <Link href="/contact" onClick={toggleMenu}>
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
