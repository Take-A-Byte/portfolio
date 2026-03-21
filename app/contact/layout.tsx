import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Integrated Identities — email contactus@integratedidentities.in, call +91 8624071741, or visit us at Ashoka Society, Kalewadi Phata, Thergaon, Pune 411033.",
  openGraph: {
    title: "Contact Integrated Identities",
    description:
      "Have a project in mind? Reach out to the I² team — we'd love to hear about your software development needs.",
    url: "https://www.integratedidentities.in/contact",
  },
  alternates: {
    canonical: "https://www.integratedidentities.in/contact",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
