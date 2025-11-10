import { TravelInstructions } from "./../types"

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
                    description: "Take a KSRTC bus to Angamaly, then another to North Palakuzha via Muvattupuzha (MC Road), followed by a short cab ride (2km) to the venue. Experience Kerala like a local!",
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
