export interface TimelineEvent {
  id: string
  title: string
  time: string
  date: string
  location: string
  description?: string
  mapsUrl?: string
}

export interface Venue {
  name: string
  address: string
  city: string
  street: string
  coordinates?: {
    latitude: number
    longitude: number
  }
  imageUrl?: string
  mapsUrl?: string
}

export interface WeddingDetails {
  brideName: string
  groomName: string
  weddingDate: string
  venue: Venue
  timeline: TimelineEvent[]
  importantDates: Date[]
}
