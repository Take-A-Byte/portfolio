import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Users, Calendar } from "lucide-react"
import { DropdownMegaMenu } from "./dropdown-mega-menu"

export function AboutMegaMenu() {
  return (
    <DropdownMegaMenu title="About Us">
      <div className="bg-white p-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Life at I² Section */}
          <div className="group relative flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-base font-medium text-gray-900">
                <Link href="/life-at-isquare" className="hover:text-primary transition-colors">
                  Life at I²
                </Link>
              </h3>
            </div>
            <p className="text-sm text-gray-500 pl-[52px]">
              Our values and principles that guide how we work, learn, and grow together.
            </p>
            <div className="mt-2 pl-[52px]">
              <div className="rounded-md bg-gray-50 p-3">
                <p className="text-sm font-medium text-gray-900">The Integrated Code</p>
                <ul className="mt-1 list-disc pl-4 text-xs text-gray-500">
                  <li>Ask, Learn, and Grow</li>
                  <li>Communication & Collaboration</li>
                  <li>Work Smart, Not Just Hard</li>
                </ul>
                <Link
                  href="/life-at-isquare"
                  className="mt-2 inline-flex items-center text-xs font-medium text-primary"
                >
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Blog Section */}
          <div className="group relative flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="text-base font-medium text-gray-900">
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </h3>
            </div>
            <p className="text-sm text-gray-500 pl-[52px]">
              Technical insights, development tips, and industry trends.
            </p>
            <div className="mt-2 pl-[52px]">
              <div className="flex items-center gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-md">
                  <Image src="/images/shared-buffer-from-uwp.png" alt="Blog post" fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-900">Latest Post</p>
                  <p className="text-xs text-gray-500 line-clamp-1">Sharing Buffers from UWP to WebView2</p>
                  <Link href="/blog" className="mt-1 inline-flex items-center text-xs font-medium text-primary">
                    Read our blog <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DropdownMegaMenu>
  )
}
