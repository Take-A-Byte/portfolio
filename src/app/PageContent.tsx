'use client'

import SocialMediaConnect from '@app/social-media-connect/page'
import { TypeAnimation } from 'react-type-animation'
import Image from 'next/image'

import { SampleIllustration } from './components/icons/illustrations/sample'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex h-screen flex-col items-center p-24 pt-48">
        <div className="type-writter-container">
          <TypeAnimation
            sequence={[
              "I'm a Fullstack Software Engineer",
              1000,
              "I'm a .NET Developer",
              1000,
              "I'm a React Developer",
              1000,
            ]}
            repeat={Number.POSITIVE_INFINITY}
          />
        </div>

        <div className="relative flex place-items-center">
          <SocialMediaConnect />
        </div>

        <div className="absolute bottom-6 text-center text-3xl">
          <p>Hey, I&apos;m Shantanu Methikar</p>
          <p>But you can call me Shan</p>
          <button className="mt-4 rounded-full bg-[var(--logo-bg-color)] p-1 ring-white ring-offset-2 ring-offset-gray-700/80 focus:outline-none focus:ring-2 sm:p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 bg-transparent fill-[var(--logo-fg-color)] stroke-[var(--logo-fg-color)] sm:h-6 sm:w-6"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className='w-screen bg-white px-40 py-8 shadow-inner drop-shadow-md'>
        <div className="w-full mb-16 select-none">
          <h1 className="text-center text-6xl font-black hollow-text text-blue-50" style={{ fontFamily: 'Roboto' }}>WHAT  DO  I  DO ...?</h1>
        </div>

        <div className="flex w-full flex-row justify-between">
          <div className="flex w-1/2 flex-col items-center" >
            <Image src="/frontend.jpg" alt='frontend developer' width={2000} height={2000} className="w-5/6 h-auto" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-center text-2xl text-black">Forntend</h2>
            <p className="my-6 text-center text-lg text-slate-500">
              Leveraging modern frontend frameworks and libraries to create efficient and scalable web applications.
            </p>
          </div>
        </div>

        <div className="-mt-20 flex w-full flex-row justify-between">
          <div className="flex flex-col justify-center">
            <h2 className="text-center text-2xl text-black">Backend</h2>
            <p className="my-6 text-center text-lg text-slate-500">
              Crafting backend architectures that are both maintainable and adaptable to evolving business needs.
            </p>
          </div>
          <div className="flex w-1/2 flex-col items-center">
            <Image src="/backend.jpg" alt='frontend developer' width={2000} height={2000} className="w-5/6 h-auto" />
          </div>
        </div>

        <div className="-mt-20 flex w-full flex-row justify-between">
          <div className="flex w-1/2 flex-col items-center">
            <Image src="/ui-ux.jpg" alt='frontend developer' width={2000} height={2000} className="w-5/6 h-auto" />
          </div>
          <div className="flex flex-col justify-center text-black">
            <h2 className="text-center text-2xl">User Interface and Experience (UI / UX)</h2>
            <p className="my-6 text-center text-lg text-slate-500">
              Leveraging data-driven insights to optimize user experiences and drive business outcomes.
            </p>
          </div>
        </div>

        <div className="-mt-20 flex w-full flex-row justify-between">
          <div className="flex flex-col justify-center">
            <h2 className="text-center text-2xl text-black">Testing</h2>
            <p className="my-6 text-center text-lg text-slate-500">
              Implementing continuous testing practices to maintain high-quality software throughout the development process.
            </p>
          </div>
          <div className="flex w-1/2 flex-col items-center">
            <Image src="/testing.jpg" alt='frontend developer' width={2000} height={2000} className="w-5/6 h-auto" />
          </div>
        </div>

      </div>

      <div className="mt-16 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Projects{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            From concept to completion.<br />A showcase of innovation, creativity, and dedication...
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Blogs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Thoughts, ideas, and stories.<br />Straight from the source. Let&apos;s pass on the knowledge!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Collaboration{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">A team player&apos;s journey.<br />From startups to giants,
            I've seen it all...</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Skills{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            The skills behind the scenes.<br />A toolbox filled with creativity and problem-solving...
          </p>
        </a>
      </div>
    </main>
  )
}
