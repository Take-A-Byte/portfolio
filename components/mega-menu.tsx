"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, ArrowRight, Calendar, Code, Users, Coffee } from "lucide-react"

export function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        className="flex items-center gap-1 text-sm font-medium"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Explore
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <div className="absolute left-0 z-50 mt-2 w-screen max-w-screen-xl transform px-4 sm:px-0 lg:max-w-3xl">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
              {/* Projects Section */}
              <div className="group relative flex items-start gap-6 rounded-lg p-3 hover:bg-gray-50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white sm:h-12 sm:w-12">
                  <Code className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900">
                    <Link href="/projects" className="focus:outline-none" onClick={() => setIsOpen(false)}>
                      <span className="absolute inset-0" aria-hidden="true" />
                      Projects
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Explore our portfolio of innovative solutions across various industries.
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="rounded-md border border-gray-200 p-2">
                      <p className="text-xs font-medium text-gray-900">PSPDFKit for Windows</p>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        SDK offering developers powerful APIs for document functionalities
                      </p>
                    </div>
                    <div className="rounded-md border border-gray-200 p-2">
                      <p className="text-xs font-medium text-gray-900">Shapr3D for Windows</p>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        Design 3D models on Windows with mouse, touch or pen
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blog Section */}
              <div className="group relative flex items-start gap-6 rounded-lg p-3 hover:bg-gray-50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white sm:h-12 sm:w-12">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900">
                    <Link href="/blog" className="focus:outline-none" onClick={() => setIsOpen(false)}>
                      <span className="absolute inset-0" aria-hidden="true" />
                      Blog
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Technical insights, development tips, and industry trends.
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md">
                      <Image src="/images/shared-buffer-from-uwp.png" alt="Blog post" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-900">Sharing Buffers from UWP to WebView2</p>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        Effectively communicating between WebView2 and UWP
                      </p>
                      <Link
                        href="/blog"
                        className="mt-1 inline-flex items-center text-xs font-medium text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        Read more <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Life at I² Section */}
              <div className="group relative flex items-start gap-6 rounded-lg p-3 hover:bg-gray-50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white sm:h-12 sm:w-12">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900">
                    <Link href="/life-at-isquare" className="focus:outline-none" onClick={() => setIsOpen(false)}>
                      <span className="absolute inset-0" aria-hidden="true" />
                      Life at I²
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Our values and principles that guide how we work, learn, and grow together.
                  </p>
                  <div className="mt-3">
                    <div className="rounded-md bg-gray-50 p-2">
                      <p className="text-xs font-medium text-gray-900">The Integrated Code</p>
                      <ul className="mt-1 list-disc pl-4 text-xs text-gray-500">
                        <li>Ask, Learn, and Grow</li>
                        <li>Communication & Collaboration</li>
                        <li>Work Smart, Not Just Hard</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Co-working Section */}
              <div className="group relative flex items-start gap-6 rounded-lg p-3 hover:bg-gray-50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white sm:h-12 sm:w-12">
                  <Coffee className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900">
                    <Link href="/coworking" className="focus:outline-none" onClick={() => setIsOpen(false)}>
                      <span className="absolute inset-0" aria-hidden="true" />
                      Co-working
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    A productive environment designed for innovation and collaboration.
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <div className="rounded-md bg-gray-50 p-2 text-center">
                      <p className="text-xs font-medium text-gray-900">Day Pass</p>
                      <p className="text-xs text-primary">₹400</p>
                    </div>
                    <div className="rounded-md bg-secondary/20 p-2 text-center">
                      <p className="text-xs font-medium text-gray-900">Flex Pass</p>
                      <p className="text-xs text-primary">₹5,000</p>
                    </div>
                    <div className="rounded-md bg-gray-50 p-2 text-center">
                      <p className="text-xs font-medium text-gray-900">Monthly</p>
                      <p className="text-xs text-primary">₹9,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4">
              <Link
                href="/contact"
                className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                onClick={() => setIsOpen(false)}
              >
                <span className="flex items-center">
                  <span className="text-sm font-medium text-gray-900">Contact Us</span>
                </span>
                <span className="mt-1 block text-sm text-gray-500">
                  Get in touch to discuss your project or inquire about our services
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
