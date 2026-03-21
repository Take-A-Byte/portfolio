export type JobLocation = "Remote" | "Hybrid" | "On-site"
export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship"

export type Job = {
  id: string
  title: string
  department: string
  location: JobLocation
  type: JobType
  description: string
  responsibilities: string[]
  requirements: string[]
  postedAt: string // ISO date string e.g. "2026-03-21"
}
