import { cn } from "@/lib/utils"

interface PerforationDividerProps {
  className?: string
}

export function PerforationDivider({ className }: PerforationDividerProps) {
  return (
    <div className={cn("flex items-center w-full", className)}>
      {/* Left semicircle */}
      <div className="w-6 h-12 overflow-hidden">
        <div className="w-12 h-12 rounded-full bg-primary -ml-6"></div>
      </div>
      {/* Dashed line that fills remaining width */}
      <div className="flex-1 border-t-4 border-dashed border-primary"></div>
      {/* Right semicircle */}
      <div className="w-6 h-12 overflow-hidden">
        <div className="w-12 h-12 rounded-full bg-primary -mr-6"></div>
      </div>
    </div>
  )
}
