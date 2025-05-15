"use client"

import { useState, useEffect, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { ExternalLink, Filter, ArrowRight, Calendar, Clock } from "lucide-react"

// Define the BlogCard type
interface BlogCard {
  title: string
  shortContent: ReactNode
  discription: string
  image: string
  color: string
  tags: string[]
  url: string
}

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [featuredBlog, setFeaturedBlog] = useState<BlogCard | null>(null)

  // All blog cards data
  const cards: BlogCard[] = [
    {
      title: "Sharing Buffers from UWP to WebView2",
      shortContent: (
        <span>
          <p>
            At PSPDFKit, we like to experiment with cutting Edge technologies (pun intended!) and incorporate them into
            our products to give the best performance and features to our customers. Earlier this year, while working on
            updating the PSPDFKit UWP project dependencies, we were also evaluating the best features in those updated
            dependencies.
          </p>
          <br />
          <p>
            One such update was moving from WebView to WebView2, which is a newer Chromium-based version of Edge from
            Microsoft. When I was setting up communication between the Universal Windows Platform (UWP) application and
            WebView2, I came across some scenarios where I had to share large buffers from UWP to web. Unfortunately, to
            do this at that time, I could only use primitive types with WebView2. This meant sharing a buffer had to be
            done by converting it to a string, passing it over to the web, and then creating an array from it on the web
            end. In turn, this decreased the overall performance of the app.
          </p>
        </span>
      ),
      discription: "Effectively communicating between WebView2 and UWP using shared buffers.",
      image: "/images/shared-buffer-from-uwp.png",
      color: "bg-violet-100",
      tags: ["UWP", "WebView2", "Shared Buffer", "How To"],
      url: "https://pspdfkit.com/blog/2023/sharing-buffers-from-uwp-to-webview2/",
    },
    {
      title: "How to Access Native Code from WebView2 with WinUI 3?",
      shortContent: (
        <span>
          <p>
            At PSPDFKit, we continuously strive to add support for the latest technologies on the market. As part of
            this effort, we've been researching the Windows App SDK (WinAppSDK), which includes WinUI 3. WinAppSDK is
            the successor of UWP and will shape the future of Windows app development. This post provides step-by-step
            instructions for accessing native code using WebView2 and WinAppSDK.
          </p>
          <br />
          <p>
            This post will walk through creating a WinAppSDK app to host a local HTML file, which will in turn access
            the Add function defined in the C++/WinRT project to add two numbers and display the result. We deliberately
            chose this simple example to both demonstrate how functions are used in programming and keep the blog post
            focused on the interop between JavaScript and C#.
          </p>
        </span>
      ),
      discription: "Make best use of native Windows functions in your web app.",
      image: "/images/access-native-code-from-webView2.png",
      color: "bg-blue-100",
      tags: ["WinUI3", "WinAppSDK", "WebView2", "Interop", "How To"],
      url: "https://pspdfkit.com/blog/2023/how-to-access-native-code-from-webview2-with-winui3/",
    },
    {
      title: "Fall of the mighty: auto_ptr",
      shortContent: (
        <span>
          <p>
            Since C++03 – when the smart pointer was first introduced in the form of auto pointers, our lives got a bit
            easier. Auto pointers were very useful, specifically for Resource Acquisition Is Initialization(RAII)
            handling of heap pointers. But it was not much later that we saw its fall and as of C++ 11 it was already
            deprecated and in C++ 17 it was deleted from the standard library.
          </p>
          <br />
          <p>
            In this article lets shed some light on the fall of auto_ptr. First, let us quickly get to know auto_ptr in
            short.
          </p>
        </span>
      ),
      discription: "Learn the importance of semantics through the case study of deprecated auto_ptr.",
      image: "/images/fall-of-auto-ptr.png",
      color: "bg-orange-100",
      tags: ["Case Study", "C++", "Pointers", "Interop"],
      url: "https://takeabyte18.wordpress.com/2022/08/02/fall-of-the-mighty-auto_ptr/",
    },
    {
      title: "Mystery of size of structs in C++",
      shortContent: (
        <div>
          <p>
            <b className="text-md">HINT: Probably it's not what you think!</b>
          </p>
          <br />
          <p>
            <b className="text-2xl">Structure Padding</b>
            <br />
            Processor doesn't read 1 byte at a time from memory. It reads 1 word at a time. This means in a 32-bit
            processor, it will access 4 bytes whereas, in a 64-bit processor, it will access 8 bytes at a time.
            <br />
            <br />
            Thus to save the number of CPU cycles required to access a structure, the compiler uses a concept called
            structure padding. This means that the members of a structure are stored left-aligned on the word boundary
            in the order they are defined.
          </p>
        </div>
      ),
      discription: "Discover the factors affecting struct sizes in C++, from padding to compiler optimizations.",
      image: "/images/structures-in-cpp.png",
      color: "bg-yellow-100",
      tags: ["Compiler optimization", "C++", "Structures", "Padding"],
      url: "https://takeabyte18.wordpress.com/2022/07/28/mystery-of-size-of-structs-in-cpp/",
    },
    {
      title: "How to be Responsive…?",
      shortContent: (
        <div>
          <p>
            In early 2010s, designers had to address a historic phenomenon – varied screen sizes and since then the
            device sizes that we use have spread even more over the size chart.
          </p>
          <br />
          <p>
            There are two main solutions to this –
            <br />
            1. ADAPTIVE design: Craft several versions of one design and make each have fixed dimensions.
            <br />
            2. RESPONSIVE design: Craft single flexible design that would shrink or fit the screen.
          </p>
          <br />
          <p>In this article, we will focus on responsive design.</p>
        </div>
      ),
      discription: "Learn key tips for building responsive apps with best practices and techniques.",
      image: "/images/responsive-blog.png",
      color: "bg-lime-100",
      tags: ["UI/UX", "Responsive Design", "User Interface", "User Experience"],
      url: "https://takeabyte18.wordpress.com/2021/04/07/differed-execution-can-hurt-us/",
    },
    {
      title: "Differed execution can Hurt Us!",
      shortContent: (
        <div>
          <p>Let's dive into the dark alleys of differed execution and see how it can hurt us!</p>
          <br />
          <p>
            We, C# developers have always loved LINQ; especially the fact that they offer differed execution! I mean,
            which programmer doesn't like laziness 😀 Linus rightly said –
            <br />
            <br />
            <i>"Intelligence is the ability of avoiding work, yet getting the work done.." </i>
            <br />- Linus Torwalds
          </p>
          <br />
          <p>
            Well, accounting all the advantages that differed execution provides, we should still be aware of the
            monstrous disadvantages that lurks in the small, dark alleys of LINQ.{" "}
          </p>
        </div>
      ),
      discription: "Explore how deferred execution in programming can lead to unexpected issues and pitfalls.",
      image: "/images/differed-execution.png",
      color: "bg-green-100",
      tags: ["Optimization", "C#", "LINQ"],
      url: "https://takeabyte18.wordpress.com/2021/07/17/how-to-be-responsive/",
    },
    {
      title: "Which to use? : Processes vs Threads",
      shortContent: (
        <div>
          <p>Having a dilemma of whether to use a thread or a process? Let's take a look.</p>
          <br />
          <p>
            <b>What is Process?</b>
            <br />A process, in the simplest terms, is an executing program. One or more threads run in the context of
            the process. Each process provides the resources needed to execute a program. The OS helps you to create,
            schedule, and terminates the processes which is used by CPU. The other processes created by the main process
            are called child process.
          </p>
          <br />
          <p>
            <b>What is Thread?</b>
            <br />A thread is the basic unit to which the operating system allocates processor time. A thread can
            execute any part of the process code, including parts currently being executed by another thread. All
            threads of a process share its virtual address space and system resources. Thread can also be called as
            lightweight process.
          </p>
        </div>
      ),
      discription: "Understand the differences between processes and threads, and when to use each.",
      image: "/images/process-vs-thread.png",
      color: "bg-cyan-100",
      tags: ["Optimization", "Process", "Threads"],
      url: "https://takeabyte18.wordpress.com/2020/11/30/which-to-use-processes-vs-threads/",
    },
  ]

  // Set a featured blog on component mount
  useEffect(() => {
    // Choose the first blog as featured, or you could implement logic to select a specific one
    setFeaturedBlog(cards[0])
  }, [])

  // Extract all unique tags
  const allTags = Array.from(new Set(cards.flatMap((card) => card.tags))).sort()

  // Filter cards based on selected tag
  const filteredCards = selectedTag ? cards.filter((card) => card.tags.includes(selectedTag)) : cards

  // Remove featured blog from the list if it exists and a tag isn't selected
  const remainingCards = selectedTag
    ? filteredCards
    : featuredBlog
      ? filteredCards.filter((card) => card.title !== featuredBlog.title)
      : filteredCards

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
                  Technical <span className="text-secondary">Insights</span>
                </h1>
                <p className="max-w-[700px] text-primary-foreground/80 md:text-xl/relaxed">
                  Exploring software development, optimization techniques, and technology trends.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 w-full border-b bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Filter by Topic:</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedTag === null ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(null)}
                  className="rounded-full"
                >
                  All Topics
                </Button>
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                    className="rounded-full"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article Section - Only show if not filtering */}
        {!selectedTag && featuredBlog && (
          <section className="py-12 w-full bg-primary/5">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-bold">Featured Article</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <Image
                    src={featuredBlog.image || "/placeholder.svg"}
                    alt={featuredBlog.title}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-500"
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
                      <span>2023</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>5 min read</span>
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
                {selectedTag ? `Articles tagged with "${selectedTag}"` : "All Articles"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {remainingCards.map((card, index) => (
                <article key={index} className="group flex flex-col h-full">
                  <Link
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-lg mb-4 aspect-[4/3] relative"
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
                      {card.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="bg-muted/50">
                          {tag}
                        </Badge>
                      ))}
                      {card.tags.length > 3 && (
                        <Badge variant="outline" className="bg-muted/50">
                          +{card.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      <Link href={card.url} target="_blank" rel="noopener noreferrer">
                        {card.title}
                      </Link>
                    </h3>

                    <p className="text-muted-foreground mb-4 line-clamp-2">{card.discription}</p>

                    <div className="mt-auto">
                      <Link
                        href={card.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary font-medium hover:underline"
                      >
                        Read More <ExternalLink className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* No results message */}
            {filteredCards.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No blogs found for this topic</h3>
                <p className="text-muted-foreground">Try selecting a different topic or view all blogs.</p>
                <Button variant="secondary" className="mt-4" onClick={() => setSelectedTag(null)}>
                  View All Blogs
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
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
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
