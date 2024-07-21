'use client'

import SocialMediaConnect from '@app/social-media-connect/page'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation'
import { SampleIllustration } from './components/icons/illustrations/sample'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <SocialMediaConnect />
      </div>

      <div className='w-full mt-16 ml-8'>
        <h1 className='text-4xl text-align-left'>What do I do?</h1>
      </div>

      <div className='flex flex-row justify-between w-full m-10'>
        <div className='flex flex-col w-1/2 items-center'>
          <SampleIllustration />  
        </div>
        <div className="flex flex-col justify-center">
          <h2 className='text-2xl text-center'>Forntend</h2>
          <p className='text-lg text-center my-6'>I develop scalable and secure APIs using .NET Core, Node.js, and MongoDB.</p>
          </div>
      </div>

      <div className='flex flex-row justify-between w-full m-10'>
        <div className="flex flex-col justify-center">
          <h2 className='text-2xl text-center'>Backend</h2>
          <p className='text-lg text-center my-6'>I develop scalable and secure APIs using .NET Core, Node.js, and MongoDB.</p>
          </div>
        <div className='flex flex-col w-1/2 items-center'>
          <SampleIllustration />
        </div>
      </div>

      <div className='flex flex-row justify-between w-full m-10'>
        <div className='flex flex-col w-1/2 items-center'>
          <SampleIllustration />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className='text-2xl text-center'>Backend</h2>
          <p className='text-lg text-center my-6'>I develop scalable and secure APIs using .NET Core, Node.js, and MongoDB.</p>
          </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
