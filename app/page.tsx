import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Globe, Laptop, Smartphone, Terminal } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <MainNav />

      <main className="flex-1 w-full">
        {/* Hero Section - Full width with centered content */}
        <section className="py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_450px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    <span className="text-secondary">1</span> identity, <br />
                    <span className="text-secondary">infinite</span> solutions
                  </h1>
                  <p className="text-xl max-w-[600px] text-primary-foreground/80">
                    Transforming ideas into powerful software solutions across desktop, mobile, and web platforms.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/contact">
                      Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="bg-transparent border-white text-white hover:bg-white/20 hover:text-white"
                  >
                    <Link href="/life-at-isquare">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  width={400}
                  height={400}
                  alt="Integrated Identities - Software Solutions"
                  className="rounded-lg object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 md:py-24 lg:py-32 w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Expertise</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Comprehensive software development, testing, and consultancy services tailored to your needs.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 bg-secondary/20 rounded-full">
                    <Code className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold">Software Development</h3>
                  <p className="text-foreground/70">
                    Custom software solutions designed to meet your specific business requirements and challenges.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 bg-secondary/20 rounded-full">
                    <Terminal className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold">Testing & QA</h3>
                  <p className="text-foreground/70">
                    Comprehensive testing services to ensure your software performs flawlessly across all environments.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 bg-secondary/20 rounded-full">
                    <Globe className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold">IT Consultancy</h3>
                  <p className="text-foreground/70">
                    Strategic guidance to help you navigate technology decisions and optimize your digital
                    infrastructure.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* App Development Section - Using navy blue background */}
        <section className="py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">App Development Specialists</h2>
                  <p className="md:text-xl/relaxed">
                    We create powerful, user-friendly applications across all platforms, ensuring seamless experiences
                    for your users.
                  </p>
                </div>
                <div className="flex flex-col gap-2 space-y-4">
                  <div className="flex items-center gap-2">
                    <Laptop className="h-5 w-5 text-secondary" />
                    <span className="font-medium">Desktop Applications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-secondary" />
                    <span className="font-medium">Mobile Applications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-secondary" />
                    <span className="font-medium">Web Applications</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-4">
                  <Image
                    src="/placeholder.svg?height=240&width=180"
                    width={180}
                    height={240}
                    alt="Desktop Application"
                    className="rounded-lg object-cover h-auto"
                  />
                  <Image
                    src="/placeholder.svg?height=180&width=240"
                    width={240}
                    height={180}
                    alt="Web Application"
                    className="rounded-lg object-cover h-auto"
                  />
                </div>
                <div className="grid gap-4">
                  <Image
                    src="/placeholder.svg?height=180&width=240"
                    width={240}
                    height={180}
                    alt="Mobile Application"
                    className="rounded-lg object-cover h-auto"
                  />
                  <Image
                    src="/placeholder.svg?height=240&width=180"
                    width={180}
                    height={240}
                    alt="Backend System"
                    className="rounded-lg object-cover h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-12 md:py-24 lg:py-32 w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Cutting-Edge Technology</h2>
                <p className="max-w-[700px] text-foreground/70 md:text-xl/relaxed">
                  We leverage the latest technologies to deliver innovative solutions that keep you ahead of the
                  competition.
                </p>
              </div>
            </div>
            <div className="pt-12 text-center">
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="px-3 py-1 text-sm bg-secondary text-primary hover:text-white">React</Badge>
                <Badge className="px-3 py-1 text-sm bg-secondary text-primary hover:text-white">Next.js</Badge>
                <Badge className="px-3 py-1 text-sm bg-secondary text-primary hover:text-white">Angular</Badge>
                <Badge className="px-3 py-1 text-sm bg-secondary text-primary hover:text-white">Vue.js</Badge>
                <Badge className="px-3 py-1 text-sm bg-secondary text-primary hover:text-white">Node.js</Badge>
                <Badge className="px-3 py-1 text-sm bg-secondary text-primary hover:text-white">Python</Badge>
                <Badge className="px-3 py-1 text-sm bg-secondary text-primary hover:text-white">Java</Badge>
                <Badge className="px-3 py-1 text-sm bg-secondary text-primary hover:text-white">Swift</Badge>
                <Badge className="px-3 py-1 text-sm bg-secondary text-primary hover:text-white">Kotlin</Badge>
                <Badge className="px-3 py-1 text-sm bg-secondary text-primary hover:text-white">Flutter</Badge>
                <Badge className="px-3 py-1 text-sm bg-secondary text-primary hover:text-white">React Native</Badge>
                <Badge className="px-3 py-1 text-sm bg-secondary text-primary hover:text-white">AWS</Badge>
                <Badge className="px-3 py-1 text-sm bg-secondary text-primary hover:text-white">Azure</Badge>
                <Badge className="px-3 py-1 text-sm bg-secondary text-primary hover:text-white">Docker</Badge>
                <Badge className="px-3 py-1 text-sm bg-secondary text-primary hover:text-white">Kubernetes</Badge>
                <Badge className="px-3 py-1 text-sm bg-secondary text-primary hover:text-white">CI/CD</Badge>
                <Badge className="px-3 py-1 text-sm bg-secondary text-primary hover:text-white">GraphQL</Badge>
                <Badge className="px-3 py-1 text-sm bg-secondary text-primary hover:text-white">MongoDB</Badge>
                <Badge className="px-3 py-1 text-sm bg-secondary text-primary hover:text-white">PostgreSQL</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Full width with centered content */}
        <section className="py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Transform Your Ideas?</h2>
                <p className="max-w-[700px] md:text-xl/relaxed">
                  From backend maintenance to system upgrades, we provide comprehensive solutions to keep your business
                  running smoothly.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/contact">
                    Contact Us Today <ArrowRight className="ml-2 h-4 w-4" />
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
