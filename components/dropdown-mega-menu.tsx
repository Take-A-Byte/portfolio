"use client"

import { useState, useRef, type ReactNode } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

interface DropdownMegaMenuProps {
  title: string
  href?: string
  children: ReactNode
}

export function DropdownMegaMenu({ title, href, children }: DropdownMegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const open = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setIsOpen(true)
  }

  // Small delay on close so the user can move from button → panel without it snapping shut
  const close = () => {
    closeTimer.current = setTimeout(() => setIsOpen(false), 120)
  }

  return (
    <div className="relative" onMouseEnter={open} onMouseLeave={close}>
      <div className="flex items-center h-9 px-3 gap-1 text-sm font-medium">
        {href ? (
          <Link href={href} className="nav-link-slide">
            {title}
          </Link>
        ) : (
          <span>{title}</span>
        )}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      <div
        className="absolute w-screen max-w-screen-sm px-4 sm:px-0"
        style={{
          left: "50%",
          top: "calc(100% + 8px)",
          zIndex: 50,
          transform: `translateX(-50%) translateY(${isOpen ? "0px" : "-8px"})`,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.2s ease, transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">{children}</div>
      </div>
    </div>
  )
}
