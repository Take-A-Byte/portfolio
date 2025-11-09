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

export interface TransportOption {
  id: string
  icon: 'sparkles' | 'car' | 'backpack' | 'bus' | 'plane'
  title: string
  description: string
  borderColor: string
  iconColor: string
  recommended?: boolean
}

export interface TravelStep {
  id: string
  icon: 'plane' | 'bus' | 'car'
  title: string
  description: string
  transportOptions?: TransportOption[]
}

export interface TravelInstructions {
  enabled: boolean
  steps: TravelStep[]
  specialNote?: {
    title: string
    description: string
    details: string
  }
}

export interface WeddingDetails {
  brideName: string
  groomName: string
  weddingDate: string
  venue: Venue
  timeline: TimelineEvent[]
  importantDates: Date[]
}
