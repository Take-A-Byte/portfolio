import Link from "next/link"
import { ArrowRight, Users, Calendar } from "lucide-react"
import { DropdownMegaMenu } from "./dropdown-mega-menu"
import { featuredBlog } from "@/lib/data/blogs"

export function AboutMegaMenu() {
  return (
    <DropdownMegaMenu title="About Us" href="/life-at-isquare">
      <div className="bg-white p-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Life at I² Section */}
          <div className="flex flex-col gap-2">
            <Link href="/life-at-isquare" className="group flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-base font-medium text-gray-900 group-hover:text-primary transition-colors">
                Life at I²
              </h3>
            </Link>
            <Link href="/life-at-isquare" className="text-sm text-gray-500 pl-[52px] hover:text-primary transition-colors">
              Our values and principles that guide how we work, learn, and grow together.
            </Link>
            <div className="mt-auto pl-[52px]">
              <Link href="/life-at-isquare" className="block rounded-md border border-gray-200 bg-gray-50 p-3 hover:border-primary hover:bg-gray-100 transition-colors">
                <p className="text-sm font-medium text-gray-900">The Integrated Code</p>
                <ul className="mt-1 list-disc pl-4 text-xs text-gray-500">
                  <li>Ask, Learn, and Grow</li>
                  <li>Communication & Collaboration</li>
                  <li>Work Smart, Not Just Hard</li>
                </ul>
                <span className="mt-2 inline-flex items-center text-xs font-medium text-primary">
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </Link>
            </div>
          </div>

          {/* Blog Section */}
          <div className="flex flex-col gap-2">
            <Link href="/blog" className="group flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="text-base font-medium text-gray-900 group-hover:text-primary transition-colors">
                Blog
              </h3>
            </Link>
            <Link href="/blog" className="text-sm text-gray-500 pl-[52px] hover:text-primary transition-colors">
              Technical insights, development tips, and industry trends.
            </Link>
            <div className="mt-auto pl-[52px]">
              <Link
                href={featuredBlog.url}
                className="block rounded-md border border-gray-200 bg-gray-50 p-3 hover:border-primary hover:bg-gray-100 transition-colors"
              >
                <p className="text-sm font-medium text-gray-900">Latest Post</p>
                <p className="text-xs text-gray-500 mb-2 line-clamp-1">{featuredBlog.title}</p>
                <p className="text-xs text-gray-500 line-clamp-2">{featuredBlog.discription}</p>
                <span className="mt-2 inline-flex items-center text-xs font-medium text-primary">
                  Read more <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DropdownMegaMenu>
  )
}
