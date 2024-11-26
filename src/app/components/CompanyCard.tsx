import { CompanyCardProps } from '@/types/company-card-props'

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(date)
}

export default function CompanyCard({
  companyWebsite,
  knowMoreUrl,
  title,
  description,
  image,
  team,
  location,
  startDate,
  endDate = undefined,
}: CompanyCardProps) {
  return (
    <div className="max-w-sm overflow-hidden rounded bg-white shadow-lg">
      <a href={knowMoreUrl}>{image}</a>
      <div className="h-72 px-6 py-4">
        <a href={companyWebsite} target="_blank" rel="noopener noreferrer" className="mb-2 text-xl font-bold">
          {title}
        </a>

        <a href={knowMoreUrl}>
          <p className="h-28 text-base text-gray-600">{description}</p>
          <div className="mt-8 text-sm text-gray-500">
            <p className="my-1">
              <b>Location:</b> {location}
            </p>
            <p className="my-1">
              <b>Duration:</b> {formatDate(startDate)} - {endDate ? formatDate(endDate) : 'Present'}
            </p>
            <p className="my-1">
              <b>Teams:</b> {team}
            </p>
          </div>
        </a>
      </div>
    </div>
  )
}
