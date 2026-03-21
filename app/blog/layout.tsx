import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Technical Blog",
  description:
    "Technical insights from Integrated Identities — articles on Windows development (UWP, WebView2, WinUI3), C++ internals (auto_ptr, struct padding), C# LINQ deferred execution, responsive design, and processes vs threads.",
  openGraph: {
    title: "Technical Blog | I² Integrated Identities",
    description:
      "Exploring software development, optimization techniques, and technology trends — from Windows interop to C++ internals.",
    url: "https://www.integratedidentities.in/blog",
  },
  alternates: {
    canonical: "https://www.integratedidentities.in/blog",
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
