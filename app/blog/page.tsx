"use client"

import { Suspense, useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { ExternalLink, ArrowRight, Calendar, Clock } from "lucide-react"
import { ctaButtonGroup } from "@/lib/styles"
import { z } from "zod"
import { blogs as cards, featuredBlog } from "@/lib/data/blogs"

// ── Enums ────────────────────────────────────────────────────────────────────

const CategorySlug = z.enum(["ai", "product", "windows", "cpp", "csharp", "uiux", "systems"])
const CategoryLabel = z.enum(["AI", "Product", "Windows", "C++", "C#", "UI/UX", "Systems"])

type CategorySlug = z.infer<typeof CategorySlug>
type CategoryLabel = z.infer<typeof CategoryLabel>

// ── Category map ─────────────────────────────────────────────────────────────

const CATEGORIES: { slug: CategorySlug; label: CategoryLabel }[] = [
  { slug: "ai",      label: "AI" },
  { slug: "product", label: "Product" },
  { slug: "windows", label: "Windows" },
  { slug: "cpp",     label: "C++" },
  { slug: "csharp",  label: "C#" },
  { slug: "uiux",    label: "UI/UX" },
  { slug: "systems", label: "Systems" },
]

function BlogContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const rawSlug = searchParams.get("tag")
  const parsedSlug = CategorySlug.safeParse(rawSlug)
  const selectedSlug = parsedSlug.success ? parsedSlug.data : null
  const selectedCategory = CATEGORIES.find((c) => c.slug === selectedSlug) ?? null

  const filteredCards = selectedCategory
    ? cards.filter((card) => card.categories.includes(selectedCategory.label))
    : cards

  const remainingCards = selectedCategory
    ? filteredCards
    : filteredCards.filter((card) => card.title !== featuredBlog.title)

  // Hero reveal on mount
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 80)
    return () => clearTimeout(t)
  }, [])

  // Scroll reveal for blog cards
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardsRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  useEffect(() => {
    setVisibleCards(new Set())
    observerRef.current?.disconnect()
    const timer = setTimeout(() => {
      const container = cardsRef.current
      if (!container) return
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const idx = Number((entry.target as HTMLElement).dataset.cardIndex)
              setVisibleCards((prev) => new Set([...prev, idx]))
            }
          })
        },
        { threshold: 0.1 },
      )
      container.querySelectorAll("[data-card-index]").forEach((card) => obs.observe(card))
      observerRef.current = obs
    }, 50)
    return () => {
      clearTimeout(timer)
      observerRef.current?.disconnect()
    }
  }, [selectedSlug])

  const handleSelect = (slug: CategorySlug | null) =>
    router.push(slug ? `/blog?tag=${slug}` : "/blog")

  return (
    <div className="flex flex-col min-h-screen w-full">
      <MainNav />

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl overflow-hidden">
                  <span
                    style={{
                      display: "inline-block",
                      transform: revealed ? "translateY(0)" : "translateY(110%)",
                      transition: "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
                    }}
                  >
                    Technical <span className="text-secondary">Insights</span>
                  </span>
                </h1>
                <div style={{ overflow: "hidden" }}>
                  <p
                    className="max-w-[700px] text-primary-foreground/80 md:text-xl/relaxed"
                    style={{
                      transform: revealed ? "translateY(0)" : "translateY(28px)",
                      opacity: revealed ? 1 : 0,
                      transition: "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, opacity 0.6s ease 0.3s",
                    }}
                  >
                    Exploring software development, optimization techniques, and technology trends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="sticky top-0 z-10 py-4 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-none pb-1">
              <span className="text-sm font-medium text-muted-foreground shrink-0">Topics:</span>
              <button
                onClick={() => handleSelect(null)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  !selectedCategory
                    ? "bg-secondary text-secondary-foreground border-secondary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                All
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleSelect(cat.slug)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                    selectedCategory?.slug === cat.slug
                      ? "bg-secondary text-secondary-foreground border-secondary"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Article Section */}
        {!selectedCategory && (
          <section className="py-12 w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 15% 60%, hsl(45 100% 65% / 0.07) 0%, transparent 45%), radial-gradient(circle at 85% 20%, hsl(215 100% 15% / 0.05) 0%, transparent 40%)",
              }}
            />
            <div className="container px-4 md:px-6 mx-auto relative z-10">
              <div className="mb-8">
                <h2 className="text-2xl font-bold">Featured Article</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={featuredBlog.image || "/placeholder.svg"}
                    alt={featuredBlog.title}
                    width={1200}
                    height={675}
                    className="w-full h-auto transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {featuredBlog.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="rounded-full">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-3xl font-bold">{featuredBlog.title}</h3>
                  <p className="text-muted-foreground text-lg">{featuredBlog.discription}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredBlog.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredBlog.readTime}</span>
                    </div>
                  </div>
                  <Button asChild variant="secondary" size="lg" className="mt-4">
                    <Link
                      href={featuredBlog.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      Read Article <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Blog Articles Section */}
        <section className="py-12 md:py-16 w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold">
                {selectedCategory ? `${selectedCategory.label} Articles` : "All Articles"}
              </h2>
            </div>

            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {remainingCards.map((card, index) => (
                <article
                  key={index}
                  data-card-index={index}
                  className="group flex flex-col h-full"
                  style={{
                    opacity: visibleCards.has(index) ? 1 : 0,
                    transform: visibleCards.has(index) ? "translateY(0)" : "translateY(32px)",
                    transition: `opacity 0.55s ease ${index * 0.08}s, transform 0.55s ease ${index * 0.08}s`,
                  }}
                >
                  <Link
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-lg mb-4 aspect-[4/3] relative ring-1 ring-border group-hover:ring-primary/30 transition-shadow group-hover:shadow-md"
                  >
                    <div className={`absolute inset-0 ${card.color} opacity-30`}></div>
                    <Image
                      src={card.image || "/placeholder.svg"}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {card.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="bg-muted/50">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      <Link href={card.url} target="_blank" rel="noopener noreferrer">
                        {card.title}
                      </Link>
                    </h3>

                    <p className="text-muted-foreground mb-4 line-clamp-2">{card.discription}</p>

                    <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{card.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{card.readTime}</span>
                        </div>
                      </div>
                      <Link
                        href={card.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary font-medium hover:underline"
                      >
                        Read <ExternalLink className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredCards.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No articles in this category yet</h3>
                <p className="text-muted-foreground">Try a different topic or browse everything.</p>
                <Button variant="secondary" className="mt-4" onClick={() => handleSelect(null)}>
                  View All Articles
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Want to Discuss a Project?</h2>
                <p className="max-w-[700px] md:text-xl/relaxed">
                  Let's collaborate on your next software development challenge.
                </p>
              </div>
              <div className={ctaButtonGroup}>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/contact">Get in Touch</Link>
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

export default function BlogPage() {
  return (
    <Suspense>
      <BlogContent />
    </Suspense>
  )
}
