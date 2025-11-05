import { WeddingDetails } from "./types"

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
  timeline: [
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
      time: "10:00",
      date: "13th Dec",
      location: "Thodupuzha"
    },
    {
      id: "meetup-dinner",
      title: "Meetup Dinner",
      time: "19:00",
      date: "13th Dec",
      location: "Thodupuzha"
    },
    {
      id: "party-dinner",
      title: "Party Dinner",
      time: "19:00",
      date: "15th Dec",
      location: "Thiruvananthapuram"
    },
    {
      id: "party-lunch",
      title: "Party Lunch",
      time: "13:00",
      date: "21st Dec",
      location: "Pune"
    }
  ],
  importantDates: [
    new Date(2025, 11, 12),
    new Date(2025, 11, 13),
    new Date(2025, 11, 15),
    new Date(2025, 11, 21)
  ]
}
