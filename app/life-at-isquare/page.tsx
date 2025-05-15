import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Heart, HelpCircle, Lightbulb, MessageSquare } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export default function LifeAtIsquarePage() {
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
                  The <span className="text-secondary">Integrated</span> Code
                </h1>
                <p className="max-w-[700px] text-primary-foreground/80 md:text-xl/relaxed">
                  Our values and principles that guide how we work, learn, and grow together.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Integrated Code Section */}
        <section className="py-12 md:py-24 lg:py-32 w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Ask, Learn, and Grow */}
              <Card className="border-t-4 border-t-secondary">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/20 rounded-full">
                      <HelpCircle className="h-6 w-6 text-secondary" />
                    </div>
                    <h2 className="text-2xl font-bold">Ask, Learn, and Grow</h2>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <span className="text-secondary font-bold">•</span>
                      <p>
                        <span className="font-semibold">No question is silly or stupid—always ask!</span> The only bad
                        question is the one never asked.
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-secondary font-bold">•</span>
                      <p>
                        <span className="font-semibold">Discuss in public.</span> If you have a question, chances are
                        someone else does too—be the one who asks and #PassOnTheKnowledge.
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-secondary font-bold">•</span>
                      <p>
                        <span className="font-semibold">Feedback is a gift.</span> Give it with kindness, take it with
                        an open mind.
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Communication & Collaboration */}
              <Card className="border-t-4 border-t-secondary">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/20 rounded-full">
                      <MessageSquare className="h-6 w-6 text-secondary" />
                    </div>
                    <h2 className="text-2xl font-bold">Communication & Collaboration</h2>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <span className="text-secondary font-bold">•</span>
                      <p>
                        <span className="font-semibold">Clarity beats assumptions.</span> When in doubt,
                        overcommunicate.
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-secondary font-bold">•</span>
                      <p>
                        <span className="font-semibold">Meetings should have a purpose.</span> If there's no clear goal,
                        let's rethink if we need it.
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Work Smart, Not Just Hard */}
              <Card className="border-t-4 border-t-secondary">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/20 rounded-full">
                      <Lightbulb className="h-6 w-6 text-secondary" />
                    </div>
                    <h2 className="text-2xl font-bold">Work Smart, Not Just Hard</h2>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <span className="text-secondary font-bold">•</span>
                      <p>
                        <span className="font-semibold">Progress over perfection.</span> Iterate, improve, and ship!
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-secondary font-bold">•</span>
                      <p>
                        <span className="font-semibold">Own your work.</span> Take responsibility and pride in what you
                        do.
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-secondary font-bold">•</span>
                      <p>
                        <span className="font-semibold">If it's repeated, automate it.</span> Future-you will thank you.
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Culture & Fun */}
              <Card className="border-t-4 border-t-secondary lg:col-start-2">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/20 rounded-full">
                      <Heart className="h-6 w-6 text-secondary" />
                    </div>
                    <h2 className="text-2xl font-bold">Culture & Fun</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <span className="text-secondary font-bold">•</span>
                        <p>
                          <span className="font-semibold">No egos, just teamwork.</span> The best ideas win, no matter
                          where they come from.
                        </p>
                      </div>
                    </div>
                      <div className="flex gap-2">
                        <span className="text-secondary font-bold">•</span>
                        <p>
                          <span className="font-semibold">We're all human.</span> Mistakes happen—learn from them, don't
                          dwell on them.
                        </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Join Us CTA */}
            <div className="mt-16 text-center">
              <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
              <p className="max-w-[700px] mx-auto mb-6 text-foreground/70">
                Want to be part of a culture that values growth, collaboration, and smart work? We're always looking for
                talented individuals to join our team.
              </p>
              <Button asChild size="lg">
                <Link href="/careers">
                  View Open Positions <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
