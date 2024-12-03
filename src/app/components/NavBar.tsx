'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { IntegratedIdentitiesIcon } from './icons/integrated-identities'
import Image from 'next/image'

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 mb-2 flex w-[100vw] justify-between bg-[#ffffff] px-4 shadow-md dark:bg-black">
      <div className="flex w-full items-center justify-between gap-x-4 md:justify-start">
        <div className="md:hidden">
          <Menu>
            <MenuButton onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </MenuButton>
            {isOpen && (
              <MenuItems className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <MenuItem
                    as="a"
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-[#FBDB5A] data-[focus]:text-[#0A264B]"
                  >
                    Home
                  </MenuItem>
                  <MenuItem
                    as="a"
                    href="/about"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-[#FBDB5A] data-[focus]:text-[#0A264B]"
                  >
                    About
                  </MenuItem>
                  <MenuItem
                    as="a"
                    href="/contact"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-[#FBDB5A] data-[focus]:text-[#0A264B]"
                  >
                    Contact
                  </MenuItem>
                </div>
              </MenuItems>
            )}
          </Menu>
        </div>
        <div className="flex-grow text-center md:hidden">
          <Link href="/">
            <div className="m-1 inline-block rounded-lg">
              <IntegratedIdentitiesIcon size={30} />
            </div>
          </Link>
        </div>
        <div className="hidden items-center gap-x-4 md:flex">
          <Link href="/">
            <div className="m-1 rounded-lg">
              <IntegratedIdentitiesIcon size={30} />
            </div>
          </Link>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        <button
          type="button"
          className="my-2 rounded-lg border-2 border-[#0A264B] bg-[#FBDB5A] px-3 py-1 text-sm font-medium text-[#0A264B] hover:bg-[#fdcf1d] focus:outline-none"
        >
          <span className="block md:hidden">
            <Image src="/hiring.svg" alt="Hire Me" width={24} height={24} />
          </span>
          <span className="hidden w-max md:block">Hire Me</span>
        </button>
      </div>
    </nav>
  )
}
