import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

const baseUrl = "https://www.integratedidentities.in"

export const metadata: Metadata = {
  title: {
    default: "I² | Integrated Identities",
    template: "%s | I² Integrated Identities",
  },
  description:
    "1 identity, infinite solutions — Software development, testing, and consultancy company specializing in desktop, mobile, and web app development.",
  metadataBase: new URL(baseUrl),
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    type: "website",
    siteName: "I² | Integrated Identities",
    title: "I² | Integrated Identities",
    description:
      "1 identity, infinite solutions — Software development, testing, and consultancy company specializing in desktop, mobile, and web app development.",
    url: baseUrl,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "I² | Integrated Identities",
    description:
      "1 identity, infinite solutions — Software development, testing, and consultancy company specializing in desktop, mobile, and web app development.",
  },
  alternates: {
    canonical: baseUrl,
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Integrated Identities",
  alternateName: "I²",
  url: baseUrl,
  logo: `${baseUrl}/logo.png`,
  description:
    "Software development, testing, and consultancy company specializing in desktop, mobile, and web app development. Motto: 1 identity, infinite solutions.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ashoka Society, Kalewadi Phata",
    addressLocality: "Thergaon, Pune",
    postalCode: "411033",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-8624071741",
    contactType: "customer service",
    email: "contactus@integratedidentities.in",
  },
  sameAs: ["https://www.linkedin.com/company/integrated-identities"],
  knowsAbout: [
    "Software Development",
    "Mobile App Development",
    "Web Development",
    "Desktop Application Development",
    "Software Testing",
    "IT Consultancy",
    "React",
    "Next.js",
    "Flutter",
    "React Native",
    "Node.js",
    "Python",
    "Swift",
    "Kotlin",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
