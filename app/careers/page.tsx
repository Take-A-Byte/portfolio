import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Briefcase, MapPin, Clock } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import jobs from "@/lib/data/jobs"
import { Job } from "@/lib/types/job"

export const metadata: Metadata = {
  title: "Careers — Integrated Identities",
  description:
    "Join the Integrated Identities team. Explore open positions and become part of a culture that values growth, collaboration, and smart work.",
  openGraph: {
    title: "Careers — Integrated Identities",
    description: "Explore open positions at Integrated Identities.",
    url: "https://www.integratedidentities.in/careers",
  },
  alternates: {
    canonical: "https://www.integratedidentities.in/careers",
  },
}

const locationColors: Record<Job["location"], string> = {
  Remote: "bg-green-100 text-green-800",
  Hybrid: "bg-blue-100 text-blue-800",
  "On-site": "bg-orange-100 text-orange-800",
}

const typeColors: Record<Job["type"], string> = {
  "Full-time": "bg-primary/10 text-primary",
  "Part-time": "bg-primary/10 text-primary",
  Contract: "bg-secondary/20 text-secondary-foreground",
  Internship: "bg-secondary/20 text-secondary-foreground",
}

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <MainNav />

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Join Our <span className="text-secondary">Team</span>
                </h1>
                <p className="max-w-[700px] text-primary-foreground/80 md:text-xl/relaxed">
                  Be part of a culture that values growth, collaboration, and building things that matter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions Section */}
        <section className="py-12 md:py-24 lg:py-32 w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Open Positions</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-lg">
                {jobs.length > 0
                  ? `We currently have ${jobs.length} open position${jobs.length > 1 ? "s" : ""}.`
                  : "We don't have any open positions right now, but we're always growing."}
              </p>
            </div>

            {jobs.length > 0 ? (
              <div className="max-w-3xl mx-auto space-y-4">
                {jobs.map((job) => (
                  <Card key={job.id} className="border hover:border-primary transition-colors">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap gap-2 items-center">
                            <span
                              className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${locationColors[job.location]}`}
                            >
                              <MapPin className="inline h-3 w-3 mr-1" />
                              {job.location}
                            </span>
                            <span
                              className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${typeColors[job.type]}`}
                            >
                              <Clock className="inline h-3 w-3 mr-1" />
                              {job.type}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {job.department}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-bold text-primary">{job.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                        </div>
                        <Button asChild className="shrink-0">
                          <Link href={`/contact?role=${encodeURIComponent(job.title)}`}>
                            Apply <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="max-w-md mx-auto text-center space-y-6">
                <div className="flex justify-center">
                  <div className="p-6 bg-secondary/10 rounded-full">
                    <Briefcase className="h-12 w-12 text-secondary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">No openings at the moment</h3>
                  <p className="text-muted-foreground">
                    We're not actively hiring right now, but we'd love to hear from you. Send us your resume and we'll
                    reach out when something fits.
                  </p>
                </div>
                <Button asChild variant="outline">
                  <Link href="/contact">
                    Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Why Join Us Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Work With Us?</h2>
                <p className="max-w-[600px] text-primary-foreground/80 md:text-lg">
                  We build things that matter, with people who care.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 w-full max-w-3xl text-left">
                <div className="space-y-1">
                  <p className="font-semibold text-secondary">No egos</p>
                  <p className="text-sm text-primary-foreground/70">The best ideas win, regardless of seniority.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-secondary">Ship real products</p>
                  <p className="text-sm text-primary-foreground/70">Your work reaches real users from day one.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-secondary">Grow fast</p>
                  <p className="text-sm text-primary-foreground/70">Ask freely, learn openly, and level up constantly.</p>
                </div>
              </div>
              <div className="pt-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/life-at-isquare">
                    See Our Culture <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
