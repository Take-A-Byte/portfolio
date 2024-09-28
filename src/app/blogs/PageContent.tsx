'use client'
import React, { useState } from 'react'
import Image from 'next/image'

type BlogCard = {
  title: string
  shortContent: React.ReactNode
  discription: string
  image: string
  color: string
  tags: string[]
  url?: string
}

export default function PageContent() {
  const [hoveredCard, setHoveredCard] = useState<number>(0)

  const cards: BlogCard[] = [
    {
      title: 'Sharing Buffers from UWP to WebView2',
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
      discription: 'Effectively communicating between WebView2 and UWP using shared buffers.',
      image: '/shared-buffer-from-uwp.png',
      color: 'bg-violet-100',
      tags: ['UWP', 'WebView2', 'Shared Buffer', 'How To'],
      url: 'https://pspdfkit.com/blog/2023/sharing-buffers-from-uwp-to-webview2/',
    },

    {
      title: 'How to Access Native Code from WebView2 with WinUI 3?',
      shortContent: (
        <span>
          <p>
            At PSPDFKit, we continuously strive to add support for the latest technologies on the market. As part of
            this effort, we’ve been researching the Windows App SDK (WinAppSDK), which includes WinUI 3. WinAppSDK is
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
      discription: 'Make best use of native Windows functions in your web app.',
      image: '/access-native-code-from-webView2.png',
      color: 'bg-blue-100',
      tags: ['WinUI3', 'WinAppSDK', 'WebView2', 'Interop', 'How To'],
      url: 'https://pspdfkit.com/blog/2023/how-to-access-native-code-from-webview2-with-winui3/',
    },

    {
      title: 'Fall of the mighty: auto_ptr',
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
      discription: 'Learn the importance of semantics through the case study of deprecated auto_ptr.',
      image: '/fall-of-auto-ptr.png',
      color: 'bg-orange-100',
      tags: ['Case Study', 'C++', 'Pointers', 'Interop'],
      url: 'https://takeabyte18.wordpress.com/2022/08/02/fall-of-the-mighty-auto_ptr/',
    },

    {
      title: 'Mystery of size of structs in C++',
      shortContent: (
        <div>
          <p>
            <b className="text-md">HINT: Probably it’s not what you think!</b>
          </p>
          <br />
          <p>
            <b className="text-2xl">Structure Padding</b>
            <br />
            Processor doesn’t read 1 byte at a time from memory. It reads 1 word at a time. This means in a 32-bit
            processor, it will access 4 bytes whereas, in a 64-bit processor, it will access 8 bytes at a time.
            <br />
            <br />
            Thus to save the number of CPU cycles required to access a structure, the compiler uses a concept called
            structure padding. This means that the members of a structure are stored left-aligned on the word boundary
            in the order they are defined.
          </p>
        </div>
      ),
      discription: 'Discover the factors affecting struct sizes in C++, from padding to compiler optimizations.',
      image: '/structures-in-cpp.png',
      color: 'bg-yellow-100',
      tags: ['Compiler optimization', 'C++', 'Structures', 'Padding'],
      url: 'https://takeabyte18.wordpress.com/2022/07/28/mystery-of-size-of-structs-in-cpp/',
    },

    {
      title: 'How to be Responsive…?',
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
      discription: 'Learn key tips for building responsive apps with best practices and techniques.',
      image: '/responsive-blog.png',
      color: 'bg-lime-100',
      tags: ['UI/UX', 'Responsive Design', 'User Interface', 'User Experience'],
      url: 'https://takeabyte18.wordpress.com/2021/04/07/differed-execution-can-hurt-us/',
    },

    {
      title: 'Differed execution can Hurt Us!',
      shortContent: (
        <div>
          <p>Let’s dive into the dark alleys of differed execution and see how it can hurt us!</p>
          <br />
          <p>
            We, C# developers have always loved LINQ; especially the fact that they offer differed execution! I mean,
            which programmer doesn’t like laziness 😀 Linus rightly said –
            <br />
            <br />
            <i>“Intelligence is the ability of avoiding work, yet getting the work done..” </i>
            <br />- Linus Torwalds
          </p>
          <br />
          <p>
            Well, accounting all the advantages that differed execution provides, we should still be aware of the
            monstrous disadvantages that lurks in the small, dark alleys of LINQ.{' '}
          </p>
        </div>
      ),
      discription: 'Explore how deferred execution in programming can lead to unexpected issues and pitfalls.',
      image: '/differed-execution.png',
      color: 'bg-green-100',
      tags: ['Optimization', 'C#', 'LINQ'],
      url: 'https://takeabyte18.wordpress.com/2021/07/17/how-to-be-responsive/',
    },

    {
      title: 'Which to use? : Processes vs Threads',
      shortContent: (
        <div>
          <p>Having a dilemma of whether to use a thread or a process? Let’s take a look.</p>
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
      discription: 'Understand the differences between processes and threads, and when to use each.',
      image: '/process-vs-thread.png',
      color: 'bg-cyan-100',
      tags: ['Optimization', 'Process', 'Threads'],
      url: 'https://takeabyte18.wordpress.com/2020/11/30/which-to-use-processes-vs-threads/',
    },
  ]

  function blogHovered(index: number) {
    setHoveredCard(index)
  }

  return (
    <div className="flex h-screen flex-row pt-16">
      <div className="flex w-80 flex-col overflow-y-auto p-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`mb-4 ${card.color} aspect-square h-56 w-56 rounded-lg border-4 p-4 shadow-md ${hoveredCard === index ? 'scale-110 border-yellow-400' : 'border-white'}`}
            onMouseOver={() => blogHovered(index)}
          >
            <h2 className="text-xl font-bold">{card.title}</h2>
            <p className="pt-4 text-sm text-gray-500">{card.discription}</p>
          </div>
        ))}
      </div>
      <div className="w-full items-center justify-center p-12">
        {hoveredCard !== null && (
          <div className="relative h-full overflow-hidden rounded-xl border-8 border-blue-900 bg-red-100">
            <Image
              src={cards[hoveredCard].image}
              alt={cards[hoveredCard].title}
              width={2000}
              height={2000}
              className="h-full rounded-lg object-cover blur-md"
            />
            <div className="absolute top-0 flex h-full w-full flex-row">
              <div className={`z-10 h-full w-1/2 rounded-lg px-12 py-20`}>
                <h1 className="mb-6 w-min rounded-lg bg-white p-4 text-5xl font-bold">{cards[hoveredCard].title}</h1>
                {cards[hoveredCard].tags.map((tag, index) => (
                  <span key={index} className="m-1 rounded-full border-2 bg-blue-900 px-2 py-1 text-xs text-white">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="z-10 my-8 mr-8 flex max-h-full w-1/2 flex-col rounded-lg bg-[#ffffffdd] shadow-lg">
                <div className="h-[90%] truncate text-balance p-8 text-justify text-lg">
                  {cards[hoveredCard].shortContent}
                </div>
                <a
                  href={`${cards[hoveredCard].url}`}
                  target="_blank"
                  className="z-10 mx-8 my-4 max-w-fit self-end rounded-full border-2 border-blue-900 bg-white px-2 hover:bg-yellow-400 hover:text-blue-900"
                >
                  Read more..
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
