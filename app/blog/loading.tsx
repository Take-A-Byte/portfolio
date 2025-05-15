import { Skeleton } from "@/components/ui/skeleton"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <MainNav />

      <main className="flex-1 w-full">
        {/* Hero Section Skeleton */}
        <section className="py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Skeleton className="h-12 w-[300px] mx-auto bg-primary-foreground/20" />
                <Skeleton className="h-6 w-[500px] mx-auto bg-primary-foreground/20" />
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section Skeleton */}
        <section className="py-8 w-full border-b bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col space-y-4">
              <Skeleton className="h-6 w-32 bg-muted" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-8 w-24 rounded-full bg-muted" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article Skeleton */}
        <section className="py-12 w-full bg-primary/5">
          <div className="container px-4 md:px-6 mx-auto">
            <Skeleton className="h-8 w-48 mb-8 bg-muted" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <Skeleton className="aspect-video w-full rounded-xl bg-muted" />
              <div className="space-y-4">
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-6 w-16 rounded-full bg-muted" />
                  ))}
                </div>
                <Skeleton className="h-10 w-full bg-muted" />
                <Skeleton className="h-6 w-full bg-muted" />
                <Skeleton className="h-6 w-3/4 bg-muted" />
                <div className="flex gap-4">
                  <Skeleton className="h-6 w-20 bg-muted" />
                  <Skeleton className="h-6 w-24 bg-muted" />
                </div>
                <Skeleton className="h-12 w-40 bg-muted" />
              </div>
            </div>
          </div>
        </section>

        {/* Blog Articles Skeleton */}
        <section className="py-12 md:py-16 w-full">
          <div className="container px-4 md:px-6 mx-auto">
            <Skeleton className="h-8 w-48 mb-8 bg-muted" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col h-full">
                  <Skeleton className="aspect-[4/3] w-full rounded-lg mb-4 bg-muted" />
                  <div className="flex gap-2 mb-3">
                    {[1, 2].map((j) => (
                      <Skeleton key={j} className="h-6 w-16 rounded-full bg-muted" />
                    ))}
                  </div>
                  <Skeleton className="h-8 w-full mb-2 bg-muted" />
                  <Skeleton className="h-4 w-full mb-1 bg-muted" />
                  <Skeleton className="h-4 w-3/4 mb-4 bg-muted" />
                  <Skeleton className="h-6 w-24 mt-auto bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
