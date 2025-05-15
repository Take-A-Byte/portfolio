import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Coffee, Wifi, Zap, Monitor, Users, Clock, MapPin } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export default function CoworkingPage() {
  // Pricing plans
  const pricingPlans = [
    {
      name: "Day Pass",
      price: "₹400",
      duration: "1 day",
      description: "Perfect for occasional visitors or trying out our space",
      features: [
        "Full access to co-working space",
        "High-speed internet",
        "Coffee and tea included",
        "Access to meeting rooms (1 hour)",
        "Printing services (10 pages)",
      ],
      popular: false,
      ctaText: "Get Day Pass",
    },
    {
      name: "Flex Pass",
      price: "₹5,000",
      duration: "15 days",
      description: "Ideal for freelancers and part-time remote workers",
      features: [
        "15 days access within a month",
        "Dedicated desk on visit days",
        "High-speed internet",
        "Coffee, tea and snacks included",
        "Access to meeting rooms (5 hours)",
        "Printing services (50 pages)",
        "Locker storage",
      ],
      popular: true,
      ctaText: "Get Flex Pass",
    },
    {
      name: "Monthly Pass",
      price: "₹9,000",
      duration: "30 days",
      description: "Best for regular remote workers and small teams",
      features: [
        "Unlimited access for a month",
        "Dedicated desk",
        "High-speed internet",
        "Coffee, tea and snacks included",
        "Access to meeting rooms (10 hours)",
        "Printing services (100 pages)",
        "Locker storage",
        "Business address usage",
        "24/7 access",
      ],
      popular: false,
      ctaText: "Get Monthly Pass",
    },
  ]

  // Amenities
  const amenities = [
    {
      icon: <Wifi className="h-6 w-6 text-secondary" />,
      title: "High-Speed Internet",
      description: "Gigabit fiber connection for seamless work experience",
    },
    {
      icon: <Coffee className="h-6 w-6 text-secondary" />,
      title: "Refreshments",
      description: "Complimentary coffee, tea, and filtered water",
    },
    {
      icon: <Monitor className="h-6 w-6 text-secondary" />,
      title: "Modern Workstations",
      description: "Ergonomic chairs and spacious desks for comfort",
    },
    {
      icon: <Users className="h-6 w-6 text-secondary" />,
      title: "Meeting Rooms",
      description: "Fully equipped meeting spaces for team collaborations",
    },
    {
      icon: <Zap className="h-6 w-6 text-secondary" />,
      title: "Power Backup",
      description: "Uninterrupted power supply for continuous productivity",
    },
    {
      icon: <Clock className="h-6 w-6 text-secondary" />,
      title: "Flexible Hours",
      description: "Extended hours access with monthly membership",
    },
  ]

  // FAQ items
  const faqItems = [
    {
      question: "What are your operating hours?",
      answer:
        "Our co-working space is open from 9:00 AM to 8:00 PM Monday through Saturday. Monthly members get extended access from 8:00 AM to 10:00 PM.",
    },
    {
      question: "Do you offer day passes?",
      answer:
        "Yes, we offer day passes for ₹400 per day, which includes all basic amenities like high-speed internet, refreshments, and limited access to meeting rooms.",
    },
    {
      question: "Is there parking available?",
      answer:
        "Yes, we have limited parking spaces available on a first-come, first-served basis. Monthly members can reserve a parking spot for an additional fee.",
    },
    {
      question: "Can I book a meeting room without a membership?",
      answer:
        "Meeting rooms are primarily available for members, but non-members can book them subject to availability for an hourly fee.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen w-full">
      <MainNav />

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_450px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    <span className="text-secondary">Co-working</span> Space <br />
                    for <span className="text-secondary">Professionals</span>
                  </h1>
                  <p className="text-xl max-w-[600px] text-primary-foreground/80">
                    A productive environment designed for innovation, collaboration, and growth in the heart of Pune.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" variant="secondary">
                    <Link href="#pricing">View Pricing</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="bg-transparent border-white text-white hover:bg-white/20 hover:text-white"
                  >
                    <Link href="#contact">Book a Tour</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  width={400}
                  height={400}
                  alt="Integrated Identities Co-working Space"
                  className="rounded-lg object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-12 md:py-24 lg:py-32 w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Flexible Pricing Plans</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Choose the plan that works best for your needs, with no long-term commitments.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {pricingPlans.map((plan, index) => (
                <Card
                  key={index}
                  className={`flex flex-col ${plan.popular ? "border-secondary shadow-lg relative" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                      <span className="bg-secondary text-primary text-xs font-bold px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-2">/ {plan.duration}</span>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="h-5 w-5 text-secondary mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={`w-full ${plan.popular ? "bg-secondary text-primary hover:bg-secondary/90" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/contact">{plan.ctaText}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Amenities Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Premium Amenities</h2>
                <p className="max-w-[700px] md:text-xl/relaxed">
                  Everything you need for a productive workday in one place.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex flex-col items-center text-center p-4">
                  <div className="p-3 bg-white/20 rounded-full mb-4">{amenity.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{amenity.title}</h3>
                  <p className="text-primary-foreground">{amenity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-12 md:py-24 lg:py-32 w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Space</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Take a virtual tour of our modern and comfortable co-working environment.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Open workspace area"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image src="/placeholder.svg?height=400&width=400" alt="Meeting room" fill className="object-cover" />
              </div>
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image src="/placeholder.svg?height=400&width=400" alt="Lounge area" fill className="object-cover" />
              </div>
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image src="/placeholder.svg?height=400&width=400" alt="Private office" fill className="object-cover" />
              </div>
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Kitchen and refreshment area"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image src="/placeholder.svg?height=400&width=400" alt="Phone booth" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-muted text-muted-foreground w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
                <p className="max-w-[700px] md:text-xl/relaxed">
                  Find answers to common questions about our co-working space.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {faqItems.map((item, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-xl font-bold">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-12 md:py-24 lg:py-32 w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Location</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Conveniently located in Thergaon, Pune with easy access to public transportation.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-secondary mt-1" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">
                      Integrated Identities, Ashoka Society
                      <br />
                      Kalewadi Phata, Thergaon, Pune 411033
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Nearby Landmarks</p>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>5 minutes from Kalewadi Phata Bus Stop</li>
                    <li>10 minutes from Aundh Road</li>
                    <li>15 minutes from Hinjewadi IT Park</li>
                    <li>Multiple restaurants and cafes within walking distance</li>
                  </ul>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden h-[300px] border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.2604098154848!2d73.77434261118164!3d18.60735336644394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x262c9db689139807%3A0x58cb2205b9f33193!2sIntegrated%20Identities!5e0!3m2!1sen!2slt!4v1744495076993!5m2!1sen!2slt"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Join Our Community?</h2>
                <p className="max-w-[700px] md:text-xl/relaxed">
                  Book a tour, purchase a day pass, or contact us for more information about our co-working space.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/contact">Contact Us Today</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="bg-transparent border-white text-white hover:bg-white/20 hover:text-white"
                >
                  <Link href="/contact">Book a Tour</Link>
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
