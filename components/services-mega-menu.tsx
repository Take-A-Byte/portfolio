import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code, Coffee } from "lucide-react"
import { DropdownMegaMenu } from "./dropdown-mega-menu"
import { featuredProject } from "@/lib/data/projects"

export function ServicesMegaMenu() {
  return (
    <DropdownMegaMenu title="Services" href="/projects">
      <div className="bg-white p-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Projects Section */}
          <div className="flex flex-col gap-2">
            <Link href="/projects" className="group flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                <Code className="h-5 w-5" />
              </div>
              <h3 className="text-base font-medium text-gray-900 group-hover:text-primary transition-colors">
                Projects
              </h3>
            </Link>
            <Link href="/projects" className="text-sm text-gray-500 pl-[52px] hover:text-primary transition-colors">
              Explore our portfolio of innovative solutions across various industries.
            </Link>
            <div className="mt-2 pl-[52px]">
              <Link
                href={featuredProject.links![0].link}
                className="block rounded-md border border-gray-200 p-3 hover:border-primary hover:bg-gray-50 transition-colors"
              >
                <p className="text-sm font-medium text-gray-900">Featured Project</p>
                <p className="text-xs text-gray-500 mb-2">{featuredProject.title}</p>
                <p className="text-xs text-gray-500 line-clamp-2">{featuredProject.description}</p>
                <span className="mt-2 inline-flex items-center text-xs font-medium text-primary">
                  View project <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </Link>
            </div>
          </div>

          {/* Co-working Section */}
          <div className="flex flex-col gap-2">
            <Link href="/coworking" className="group flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                <Coffee className="h-5 w-5" />
              </div>
              <h3 className="text-base font-medium text-gray-900 group-hover:text-primary transition-colors">
                Co-working
              </h3>
            </Link>
            <Link href="/coworking" className="text-sm text-gray-500 pl-[52px] hover:text-primary transition-colors">
              A productive environment designed for innovation and collaboration.
            </Link>
            <div className="mt-2 pl-[52px]">
              <Link href="/coworking" className="relative block h-32 w-full overflow-hidden rounded-md">
                <Image
                  src="/images/office-1.jpeg"
                  alt="Co-working space"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white text-sm font-medium">Starting at</p>
                      <p className="text-white text-lg font-bold">₹400/day</p>
                    </div>
                    <span className="text-xs font-medium text-white bg-primary/80 px-3 py-1.5 rounded-md">
                      View plans
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DropdownMegaMenu>
  )
}
