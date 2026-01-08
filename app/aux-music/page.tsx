import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Music,
  Users,
  Wifi,
  QrCode,
  ListMusic,
  Play,
  Smartphone,
  Car,
  Home,
  Dumbbell,
  BookOpen,
  Github,
} from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export default function AuxMusicPage() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <MainNav />

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="p-4 bg-secondary/20 rounded-full">
                <Music className="h-12 w-12 text-secondary" />
              </div>
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  <span className="text-secondary">Aux</span> Music
                </h1>
                <p className="text-2xl font-medium text-primary-foreground/90">
                  Pass the Aux. Share the Vibe.
                </p>
                <p className="text-xl max-w-[700px] text-primary-foreground/80 mx-auto">
                  A collaborative music control app that lets everyone at the party add songs to the queue.
                  One host, unlimited friends, one shared playlist.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row pt-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="https://github.com/Take-A-Byte/AuxMusic" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    View on GitHub
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="bg-transparent border-white text-white hover:bg-white/20 hover:text-white"
                >
                  <Link href="/contact">
                    Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 md:py-24 lg:py-32 w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Get your party started in three simple steps
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-primary font-bold text-xl">
                    1
                  </div>
                  <div className="p-2 bg-secondary/20 rounded-full">
                    <Play className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold">Host a Session</h3>
                  <p className="text-foreground/70">
                    Open Aux on your speaker-connected device and start hosting. A unique QR code is generated for your party.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-primary font-bold text-xl">
                    2
                  </div>
                  <div className="p-2 bg-secondary/20 rounded-full">
                    <QrCode className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold">Friends Join</h3>
                  <p className="text-foreground/70">
                    Friends scan the QR code to instantly join your session. No sign-ups, no accounts, just scan and connect.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-primary font-bold text-xl">
                    3
                  </div>
                  <div className="p-2 bg-secondary/20 rounded-full">
                    <ListMusic className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold">Queue Together</h3>
                  <p className="text-foreground/70">
                    Everyone can search YouTube and add songs to the shared queue. Watch the playlist grow in real-time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Key Features</h2>
                <p className="max-w-[700px] md:text-xl/relaxed text-primary-foreground/80">
                  Everything you need for the perfect shared music experience
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start gap-4 p-4">
                <div className="p-2 bg-secondary/20 rounded-lg shrink-0">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Collaborative Control</h3>
                  <p className="text-primary-foreground/70">
                    Everyone can add songs and manage the queue together. Democracy in music selection.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4">
                <div className="p-2 bg-secondary/20 rounded-lg shrink-0">
                  <Wifi className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Works Offline</h3>
                  <p className="text-primary-foreground/70">
                    Connects directly over local WiFi. No internet required after initial setup.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4">
                <div className="p-2 bg-secondary/20 rounded-lg shrink-0">
                  <QrCode className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Instant Join</h3>
                  <p className="text-primary-foreground/70">
                    No accounts or sign-ups needed. Just scan and play. It&apos;s that simple.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4">
                <div className="p-2 bg-secondary/20 rounded-lg shrink-0">
                  <Music className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">YouTube Integration</h3>
                  <p className="text-primary-foreground/70">
                    Access millions of songs through YouTube. If it&apos;s on YouTube, you can play it.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4">
                <div className="p-2 bg-secondary/20 rounded-lg shrink-0">
                  <ListMusic className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Real-time Queue</h3>
                  <p className="text-primary-foreground/70">
                    See the playlist update instantly as friends add songs. Everyone stays in sync.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4">
                <div className="p-2 bg-secondary/20 rounded-lg shrink-0">
                  <Smartphone className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Cross-Platform</h3>
                  <p className="text-primary-foreground/70">
                    Built with Flutter. Works on iOS, Android, and more platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-12 md:py-24 lg:py-32 w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Perfect For</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Aux Music fits right into your favorite moments
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
              <Card className="group hover:border-secondary transition-colors">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-secondary/20 rounded-full group-hover:bg-secondary/30 transition-colors">
                    <Home className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-bold">House Parties</h3>
                  <p className="text-sm text-foreground/70">Let everyone be the DJ</p>
                </CardContent>
              </Card>
              <Card className="group hover:border-secondary transition-colors">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-secondary/20 rounded-full group-hover:bg-secondary/30 transition-colors">
                    <Car className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-bold">Road Trips</h3>
                  <p className="text-sm text-foreground/70">Shared road trip playlist</p>
                </CardContent>
              </Card>
              <Card className="group hover:border-secondary transition-colors">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-secondary/20 rounded-full group-hover:bg-secondary/30 transition-colors">
                    <BookOpen className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-bold">Study Sessions</h3>
                  <p className="text-sm text-foreground/70">Collaborative focus music</p>
                </CardContent>
              </Card>
              <Card className="group hover:border-secondary transition-colors">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-secondary/20 rounded-full group-hover:bg-secondary/30 transition-colors">
                    <Dumbbell className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-bold">Workout Groups</h3>
                  <p className="text-sm text-foreground/70">Pump-up tracks together</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-12 md:py-24 w-full bg-muted/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Built With</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Modern technologies for a seamless experience
                </p>
              </div>
            </div>
            <div className="pt-8 text-center">
              <div className="flex flex-wrap justify-center gap-3">
                <Badge className="px-4 py-2 text-sm bg-secondary text-primary hover:text-white">Flutter</Badge>
                <Badge className="px-4 py-2 text-sm bg-secondary text-primary hover:text-white">Dart</Badge>
                <Badge className="px-4 py-2 text-sm bg-secondary text-primary hover:text-white">YouTube API</Badge>
                <Badge className="px-4 py-2 text-sm bg-secondary text-primary hover:text-white">Local WiFi</Badge>
                <Badge className="px-4 py-2 text-sm bg-secondary text-primary hover:text-white">Cross-Platform</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Ready to Share the Aux?
                </h2>
                <p className="max-w-[700px] md:text-xl/relaxed">
                  Check out the project on GitHub or get in touch to learn more about our mobile development services.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row pt-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="https://github.com/Take-A-Byte/AuxMusic" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    View Source Code
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="bg-transparent border-white text-white hover:bg-white/20 hover:text-white"
                >
                  <Link href="/contact">
                    Contact Us <ArrowRight className="ml-2 h-4 w-4" />
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
