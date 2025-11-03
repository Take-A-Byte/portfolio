import { WeddingDetails } from "./types"

export const weddingData: WeddingDetails = {
  brideName: "MURALEEMAYOORA",
  groomName: "SHANTANU",
  weddingDate: "13.12.2025",
  venue: {
    name: "Palace of Marriages No. 2",
    address: "St. Petersburg, Furshtatskaya St. 52",
    city: "St. Petersburg",
    street: "Furshtatskaya St. 52"
  },
  timeline: [
    {
      id: "guest-gathering",
      title: "Guest gathering",
      time: "12:00"
    },
    {
      id: "registration-ceremony",
      title: "Registration\nceremony",
      time: "12:30"
    },
    {
      id: "banquet",
      title: "Banquet at Putilov Mansion",
      time: "13:30",
      description: "Banquet at"
    },
    {
      id: "end-of-evening",
      title: "End of evening",
      time: "23:00"
    }
  ],
  importantDates: [
    new Date(2025, 11, 12),
    new Date(2025, 11, 13),
    new Date(2025, 11, 15),
    new Date(2025, 11, 21)
  ]
}
