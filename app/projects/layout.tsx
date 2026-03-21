import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Explore Integrated Identities' portfolio: Aux Music, Workflow Automation Mobile App, Avelyn (GenAI document tool), Nutrient MAUI SDK, PSPDFKit Windows SDK, Shapr3D for Windows, Linton LiDAR visualizer, and more.",
  openGraph: {
    title: "Our Projects | I² Integrated Identities",
    description:
      "Innovative software solutions across enterprise, consumer, and industrial contexts — from cross-platform SDKs to collaborative mobile apps.",
    url: "https://www.integratedidentities.in/projects",
  },
  alternates: {
    canonical: "https://www.integratedidentities.in/projects",
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
