import { WeddingDetails, TimelineEvent } from "./types"

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
    showTransportInstructions: true
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
    showTransportInstructions: false
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
    showTransportInstructions: false
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
