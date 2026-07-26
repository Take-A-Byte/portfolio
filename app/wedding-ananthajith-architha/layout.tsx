import { Geist, Cormorant_Garamond, Nunito, Playfair_Display } from "next/font/google"
import type { Metadata } from "next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
})

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
})

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
})

export const metadata: Metadata = {
  title: "Wedding Invitation - Ananthajith & Architha",
  description: "You're invited to the wedding of Ananthajith A and Architha M Riya.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function WeddingTempleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${geistSans.variable} ${cormorantGaramond.variable} ${nunito.variable} ${playfairDisplay.variable}`}>
      {children}
    </div>
  )
}
