import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  QrCode,
  ListMusic,
  Play,
  Car,
  Home,
  Dumbbell,
  BookOpen,
  Github,
} from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { AuxMusicHero } from "@/components/aux-music/aux-music-hero"
import { AuxMusicFeatures } from "@/components/aux-music/aux-music-features"
import { AuxMusicShowcase } from "@/components/aux-music/aux-music-showcase"
import { AudioVisualizerBackground } from "@/components/aux-music/audio-visualizer-background"

export const metadata: Metadata = {
  title: "Aux Music | Collaborative Music Control App",
  description: "A collaborative music control app that lets everyone at the party add songs to the queue. One host, unlimited friends, one shared playlist.",
  openGraph: {
    title: "Aux Music | Collaborative Music Control App",
    description: "A collaborative music control app that lets everyone at the party add songs to the queue. One host, unlimited friends, one shared playlist.",
    url: "https://www.integratedidentities.in/aux-music",
  },
  other: {
    "audio-visualizer-credit": "THREE.BAS Audio Visualizer by Nicolas Zaslavsky (zadvorsky) - https://github.com/zadvorsky/three.bas",
    "background-music-credit": "Carol of the Bells - Composed by Mykola Leontovych, based on Ukrainian folk chant Shchedryk, English lyrics by Peter Wilhousky",
  },
}

export default function AuxMusicPage() {
  return (
    <div className="flex flex-col min-h-screen w-full relative">
      {/* Audio Visualizer Background */}
      <div className="fixed inset-0 z-0">
        <AudioVisualizerBackground />
      </div>

      {/* Content on top */}
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <MainNav />

        <main className="flex-1 w-full">
        {/* Hero Section - Animated with GSAP */}
        <AuxMusicHero />

        {/* How It Works Section */}
        <section className="py-12 md:py-24 lg:py-32 w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">How It Works</h2>
                <p className="max-w-[700px] text-white/70 md:text-xl/relaxed">
                  Get your party started in three simple steps
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
              <Card className="border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-primary font-bold text-xl">
                    1
                  </div>
                  <div className="p-2 bg-secondary/20 rounded-full">
                    <Play className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Host a Session</h3>
                  <p className="text-white/70">
                    Open Aux on your speaker-connected device and start hosting. A unique QR code is generated for your party.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-primary font-bold text-xl">
                    2
                  </div>
                  <div className="p-2 bg-secondary/20 rounded-full">
                    <QrCode className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Friends Join</h3>
                  <p className="text-white/70">
                    Friends scan the QR code to instantly join your session. No sign-ups, no accounts, just scan and connect.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-primary font-bold text-xl">
                    3
                  </div>
                  <div className="p-2 bg-secondary/20 rounded-full">
                    <ListMusic className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Queue Together</h3>
                  <p className="text-white/70">
                    Everyone can search YouTube and add songs to the shared queue. Watch the playlist grow in real-time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Feature Grid - Animated with GSAP */}
        <AuxMusicFeatures />

        {/* Use Cases Section */}
        <section className="py-12 md:py-24 lg:py-32 w-full bg-white/10 backdrop-blur-md border-y border-white/20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">Perfect For</h2>
                <p className="max-w-[700px] text-white/70 md:text-xl/relaxed">
                  Aux Music fits right into your favorite moments
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
              <Card className="group border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-secondary transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-secondary/20 rounded-full group-hover:bg-secondary/30 transition-colors">
                    <Home className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-bold text-white">House Parties</h3>
                  <p className="text-sm text-white/70">Let everyone be the DJ</p>
                </CardContent>
              </Card>
              <Card className="group border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-secondary transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-secondary/20 rounded-full group-hover:bg-secondary/30 transition-colors">
                    <Car className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-bold text-white">Road Trips</h3>
                  <p className="text-sm text-white/70">Shared road trip playlist</p>
                </CardContent>
              </Card>
              <Card className="group border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-secondary transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-secondary/20 rounded-full group-hover:bg-secondary/30 transition-colors">
                    <BookOpen className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-bold text-white">Study Sessions</h3>
                  <p className="text-sm text-white/70">Collaborative focus music</p>
                </CardContent>
              </Card>
              <Card className="group border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-secondary transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-secondary/20 rounded-full group-hover:bg-secondary/30 transition-colors">
                    <Dumbbell className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-bold text-white">Workout Groups</h3>
                  <p className="text-sm text-white/70">Pump-up tracks together</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Image Showcase - Parallax animations */}
        <AuxMusicShowcase />

        {/* CTA and Tech Stack Section */}
        <section className="py-16 md:py-24 w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                {/* Built With */}
                <div className="flex-1 flex flex-col items-center justify-center space-y-6 text-center">
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-white">Built With</h2>
                    <p className="text-white/70">
                      Modern technologies for a seamless experience
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Badge className="px-4 py-2 text-sm bg-secondary/80 backdrop-blur-sm text-primary hover:bg-secondary hover:text-white transition-all">Flutter</Badge>
                    <Badge className="px-4 py-2 text-sm bg-secondary/80 backdrop-blur-sm text-primary hover:bg-secondary hover:text-white transition-all">Dart</Badge>
                    <Badge className="px-4 py-2 text-sm bg-secondary/80 backdrop-blur-sm text-primary hover:bg-secondary hover:text-white transition-all">YouTube API</Badge>
                    <Badge className="px-4 py-2 text-sm bg-secondary/80 backdrop-blur-sm text-primary hover:bg-secondary hover:text-white transition-all">Cross-Platform</Badge>
                  </div>
                </div>

                {/* Vertical Separator */}
                <div className="hidden md:block w-px h-64 bg-white/20"></div>

                {/* Ready to Share the Aux */}
                <div className="flex-1 flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                      Ready to Share the Aux?
                    </h2>
                    <p className="max-w-[500px] md:text-xl/relaxed text-white/80">
                      Check out the project on GitHub or get in touch to learn more about our mobile development services.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl transition-all">
                      <Link href="https://github.com/Take-A-Byte/AuxMusic" target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-5 w-5" />
                        View Source Code
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50"
                    >
                      <Link href="/contact">
                        Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}
