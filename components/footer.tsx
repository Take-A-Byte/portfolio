import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0 w-full">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-md overflow-hidden">
            <Image src="/logo.png" alt="Integrated Identities Logo" fill className="object-cover" />
          </div>
          <p className="text-center text-sm leading-loose text-foreground/70 md:text-left">
            &copy; {new Date().getFullYear()} Integrated Identities. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/life-at-isquare" className="text-sm text-foreground/70 underline-offset-4 hover:underline">
            Life at I²
          </Link>
          <Link href="/privacy" className="text-sm text-foreground/70 underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-foreground/70 underline-offset-4 hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}
