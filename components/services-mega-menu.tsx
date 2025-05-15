import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code, Coffee } from "lucide-react"
import { DropdownMegaMenu } from "./dropdown-mega-menu"

export function ServicesMegaMenu() {
  return (
    <DropdownMegaMenu title="Services">
      <div className="bg-white p-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Projects Section */}
          <div className="group relative flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                <Code className="h-5 w-5" />
              </div>
              <h3 className="text-base font-medium text-gray-900">
                <Link href="/projects" className="hover:text-primary transition-colors">
                  Projects
                </Link>
              </h3>
            </div>
            <p className="text-sm text-gray-500 pl-[52px]">
              Explore our portfolio of innovative solutions across various industries.
            </p>
            <div className="mt-2 pl-[52px]">
              <div className="grid grid-cols-1 gap-3">
                <div className="rounded-md border border-gray-200 p-3">
                  <p className="text-sm font-medium text-gray-900">Featured Project</p>
                  <p className="text-xs text-gray-500 mb-2">PSPDFKit for Windows</p>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    SDK offering developers powerful APIs for quickly adding document functionalities to a windows
                    application.
                  </p>
                  <Link href="/projects" className="mt-2 inline-flex items-center text-xs font-medium text-primary">
                    View all projects <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Co-working Section */}
          <div className="group relative flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                <Coffee className="h-5 w-5" />
              </div>
              <h3 className="text-base font-medium text-gray-900">
                <Link href="/coworking" className="hover:text-primary transition-colors">
                  Co-working
                </Link>
              </h3>
            </div>
            <p className="text-sm text-gray-500 pl-[52px]">
              A productive environment designed for innovation and collaboration.
            </p>
            <div className="mt-2 pl-[52px]">
              <div className="relative h-32 w-full overflow-hidden rounded-md">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Co-working space"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white text-sm font-medium">Starting at</p>
                      <p className="text-white text-lg font-bold">₹400/day</p>
                    </div>
                    <Link
                      href="/coworking"
                      className="text-xs font-medium text-white bg-primary/80 hover:bg-primary px-3 py-1.5 rounded-md"
                    >
                      View plans
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DropdownMegaMenu>
  )
}
