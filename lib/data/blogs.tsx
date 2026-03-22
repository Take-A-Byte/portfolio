import type { ReactNode } from "react"

export interface BlogCard {
  title: string
  shortContent: ReactNode
  discription: string
  image: string
  color: string
  tags: string[]
  categories: string[]
  url: string
  date: string
  readTime: string
}

export const blogs: BlogCard[] = [
  {
    title: "From curiosity to PLG (and AI): My journey to understanding product-led growth",
    shortContent: (
      <div>
        <p>
          Product-led growth (PLG) has quietly reshaped how software companies acquire and retain users — but what
          does it actually mean, and how is AI accelerating it? In this article, I trace the evolution of PLG from
          the 1990s to today, contrasting it with traditional sales-led approaches.
        </p>
        <br />
        <p>
          Using Nutrient as a case study, I explore how AI-powered features — contextual help, proactive onboarding
          nudges, and intelligent defaults — can dramatically cut time-to-value and reduce friction in the user
          journey, making PLG strategies more effective than ever.
        </p>
      </div>
    ),
    discription: "How AI is supercharging product-led growth strategies and reshaping the way software acquires users.",
    image: "/images/plg-and-ai.gif",
    color: "bg-purple-100",
    tags: ["AI", "PLG", "SaaS", "Product Strategy"],
    categories: ["AI", "Product"],
    url: "https://www.nutrient.io/blog/plg-and-ai/",
    date: "Dec 2025",
    readTime: "5 min read",
  },
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
    categories: ["Windows"],
    url: "https://www.nutrient.io/blog/sharing-buffers-from-uwp-to-webview2/",
    date: "Jun 2023",
    readTime: "6 min read",
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
    categories: ["Windows"],
    url: "https://www.nutrient.io/blog/how-to-access-native-code-from-webview2-with-winui3/",
    date: "Mar 2023",
    readTime: "7 min read",
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
    categories: ["C++", "Systems"],
    url: "https://takeabyte18.wordpress.com/2022/08/02/fall-of-the-mighty-auto_ptr/",
    date: "Aug 2022",
    readTime: "4 min read",
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
    categories: ["C++"],
    url: "https://takeabyte18.wordpress.com/2022/07/28/mystery-of-size-of-structs-in-cpp/",
    date: "Jul 2022",
    readTime: "4 min read",
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
    categories: ["UI/UX"],
    url: "https://takeabyte18.wordpress.com/2021/04/07/differed-execution-can-hurt-us/",
    date: "Apr 2021",
    readTime: "4 min read",
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
    categories: ["C#"],
    url: "https://takeabyte18.wordpress.com/2021/07/17/how-to-be-responsive/",
    date: "Jul 2021",
    readTime: "5 min read",
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
    categories: ["Systems"],
    url: "https://takeabyte18.wordpress.com/2020/11/30/which-to-use-processes-vs-threads/",
    date: "Nov 2020",
    readTime: "4 min read",
  },
]

export const featuredBlog = blogs[0]
