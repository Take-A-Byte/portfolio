import { WeddingDetails, TimelineEvent, TravelInstructions } from "./types"

// Thodupuzha events (main wedding celebration)
export const thodupuzhaEvents: TimelineEvent[] = [
  {
    id: "haldi",
    title: "Haldi",
    time: "18:00",
    date: "12th Dec",
    location: "Thodupuzha"
  },
  {
    id: "sangeet",
    title: "Sangeet",
    time: "18:00",
    date: "12th Dec",
    location: "Thodupuzha"
  },
  {
    id: "vidhi",
    title: "Vidhi",
    time: "12:00",
    date: "13th Dec",
    location: "Thodupuzha"
  },
  {
    id: "meetup-dinner",
    title: "Meetup Dinner",
    time: "19:00",
    date: "13th Dec",
    location: "Thodupuzha"
  }
]

// Trivandrum event
export const trivandrumEvents: TimelineEvent[] = [
  {
    id: "party-dinner",
    title: "Party Dinner",
    time: "19:00",
    date: "15th Dec",
    location: "Thiruvananthapuram",
    mapsUrl: "https://maps.app.goo.gl/B72t37bh76qRt4uE7"
  }
]

// Pune event
export const puneEvents: TimelineEvent[] = [
  {
    id: "party-lunch",
    title: "Party Lunch",
    time: "13:00",
    date: "21st Dec",
    location: "Pune",
    mapsUrl: "https://maps.app.goo.gl/ugBD2AaM2QZQSjGbA"
  }
]

// Helper function to format date as DD.MM.YYYY
function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

// Travel instructions for Kerala events (with full transport details)
export const keralaTravelInstructions: TravelInstructions = {
  enabled: true,
  steps: [
    {
      id: "flight",
      icon: "plane",
      title: "First Stop: Gateway to God's Own Country",
      description: "Board your flight to Kochi International Airport, Kerala - where palm trees sway and love is in the air!"
    },
    {
      id: "transport",
      icon: "bus",
      title: "Next Stop: Where the Party Begins!",
      description: "Choose your adventure from Kochi to our venue:",
      transportOptions: [
        {
          id: "vip-bus",
          icon: "sparkles",
          title: "VIP Love Express (Recommended!)",
          description: "Early birds arriving by 7:00 AM on 12th Dec get the royal treatment! Our special wedding bus will whisk you directly to the venue. No stops, just love and laughter!",
          borderColor: "border-slate-900",
          iconColor: "text-slate-900",
          recommended: true
        },
        {
          id: "private-cab",
          icon: "car",
          title: "Private Chariot",
          description: "Book your own cab and cruise through Kerala's scenic routes at your own pace. Perfect for families or those who love a road trip!",
          borderColor: "border-slate-400",
          iconColor: "text-slate-700"
        },
        {
          id: "public-transport",
          icon: "backpack",
          title: "The Adventurer's Route",
          description: "Take a KSRTC bus to Angamaly (~20 mins), then another to Muvattupuzha (~35 mins), followed by a short cab ride to the venue. Experience Kerala like a local!",
          borderColor: "border-slate-300",
          iconColor: "text-slate-600"
        }
      ]
    }
  ],
  specialNote: {
    title: "Special Wedding Transit Service",
    description: "Complimentary transport departing Kochi Airport at 7:00 AM on December 12th",
    details: "RSVP to secure your seat on the Love Express!"
  }
}

// Simple travel instructions for other venues
export const simpleTravelInstructions: TravelInstructions = {
  enabled: false,
  steps: [
    {
      id: "simple-transport",
      icon: "bus",
      title: "Getting to the Venue",
      description: "Use the Google Maps link above to navigate to the venue. Cab services and public transport are readily available."
    }
  ]
}

// Event configuration by location
export const eventsByLocation = {
  kerala: {
    events: [...thodupuzhaEvents, ...trivandrumEvents, ...puneEvents],
    dates: [
      new Date(2025, 11, 12),
      new Date(2025, 11, 13),
      new Date(2025, 11, 15),
      new Date(2025, 11, 21)
    ],
    primaryDate: new Date(2025, 11, 13), // Main wedding date (13th Dec)
    eventType: "Wedding",
    venueImage: "/images/wedding-venue.webp",
    venueName: "Wedding Venue",
    venueAddress: "Nutmeg County, Muvattupuzha, Kerala",
    venueMapsUrl: "https://maps.app.goo.gl/K2VY6MDLL7wM3vWs8?g_st=aw",
    showTransportInstructions: true,
    travelInstructions: keralaTravelInstructions,
    invitationMessage: "This is an official invitation to our wedding! You received it because we really want to see you at all our celebrations by our side!"
  },
  trivandrum: {
    events: trivandrumEvents,
    dates: [new Date(2025, 11, 15)],
    primaryDate: new Date(2025, 11, 15), // Dinner date (15th Dec)
    eventType: "Wedding Dinner",
    venueImage: "/images/trivandrum-venue.jpg",
    venueName: "Party Dinner Venue",
    venueAddress: "Sri Sri Ravishankar Vidya Mandir (SSRVM), New Maruthankuzhy Bridge, Kanjirampara, Thiruvananthapuram",
    venueMapsUrl: "https://maps.app.goo.gl/B72t37bh76qRt4uE7",
    showTransportInstructions: false,
    travelInstructions: simpleTravelInstructions,
    invitationMessage: "This is an official invitation to our wedding dinner! You received it because we really want to celebrate with you on this special evening!"
  },
  pune: {
    events: puneEvents,
    dates: [new Date(2025, 11, 21)],
    primaryDate: new Date(2025, 11, 21), // Lunch date (21st Dec)
    eventType: "Wedding Lunch",
    venueImage: "/images/pune-venue.jpg",
    venueName: "Party Lunch Venue",
    venueAddress: "Ambience Hotel, Kalewadi Chauk, Vishnu Dev Nagar, Wakad, Pune",
    venueMapsUrl: "https://maps.app.goo.gl/ugBD2AaM2QZQSjGbA",
    showTransportInstructions: false,
    travelInstructions: simpleTravelInstructions,
    invitationMessage: "This is an official invitation to our wedding lunch! You received it because we really want to celebrate with you on this joyful day!"
  }
}

// Add computed displayDate to each location
export const getLocationConfig = (location: keyof typeof eventsByLocation) => {
  const config = eventsByLocation[location]
  return {
    ...config,
    displayDate: formatDate(config.primaryDate)
  }
}

export const weddingData: WeddingDetails = {
  brideName: "MURALEEMAYOORA",
  groomName: "SHANTANU",
  weddingDate: "13.12.2025",
  venue: {
    name: "Wedding Venue",
    address: "Nutmeg County, Muvattupuzha, Kerala",
    city: "Thodupuzha",
    street: "Kerala"
  },
  timeline: [...thodupuzhaEvents, ...trivandrumEvents, ...puneEvents],
  importantDates: [
    new Date(2025, 11, 12),
    new Date(2025, 11, 13),
    new Date(2025, 11, 15),
    new Date(2025, 11, 21)
  ]
}
