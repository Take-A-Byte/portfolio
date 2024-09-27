import { CardProps } from '@/types/card-props'

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(date)
}

export default function Card({
  url,
  title,
  description,
  image,
  team,
  location,
  startDate,
  endDate = undefined,
}: CardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="max-w-sm overflow-hidden rounded bg-white shadow-lg"
    >
      <div>
        {image}
        <div className="h-72 px-6 py-4">
          <h2 className="mb-2 text-xl font-bold">{title}</h2>
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
        </div>
      </div>
    </a>
  )
}
