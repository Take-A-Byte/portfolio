export interface TimelineEvent {
  id: string
  title: string
  time: string
  endTime?: string
  date: Date
  description?: string
}

export interface VenueEvents {
  events: TimelineEvent[]
  venue: VenueInfo
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

export interface VenueInfo {
  name: string
  address: string
  image: string
  mapsUrl: string
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

export interface CabinCrewMember {
  name: string
  role: string
}

export interface WeddingDetails {
  brideName: string
  groomName: string
  cabinCrew?: CabinCrewMember[]
}
