import Link from 'next/link'

import { IntegratedIdentitiesIcon } from './icons/integrated-identities'

export default function NavBar() {
  return (
    <nav className="fixed sticky top-0 mb-2 flex w-full justify-between bg-[#ffffff] px-4 shadow-md dark:bg-black">
      <div className="flex items-center gap-x-4">
        <Link href="/">
          <div className="m-1 rounded-lg">
            <IntegratedIdentitiesIcon size={30} />
          </div>
        </Link>
        <div className="flex gap-x-4">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
      <div className="flex items-end items-center gap-x-4">
        <button
          type="button"
          className="my-2 rounded-lg border-2 border-[#0A264B] bg-[#FBDB5A] px-5 py-1 font-medium text-[#0A264B] hover:bg-[#fdcf1d] focus:outline-none"
        >
          Hire Me
        </button>
      </div>
    </nav>
  )
}
