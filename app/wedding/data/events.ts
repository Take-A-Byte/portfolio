import { VenueEvents } from "./../types"
import { keralaTravelInstructions, simpleTravelInstructions } from "./travel"
import { thodupuzhaVenue, trivandrumVenue, puneVenue, weddingVenue } from "./venue"

// Main events (main wedding celebration)
export const mainEventGroup: VenueEvents = {
    events: [
        {
            id: "haldi",
            title: "Haldi",
            time: "16:00",
            date: new Date(2025, 11, 12)
        },
        {
            id: "sangeet",
            title: "Sangeet",
            time: "18:00",
            date: new Date(2025, 11, 12)
        },
        {
            id: "vidhi",
            title: "Vidhi",
            time: "11:46",
            endTime: "12:34",
            date: new Date(2025, 11, 13)
        }
    ],
    venue: weddingVenue
}

export const thodupuzhaEventGroup: VenueEvents = {
    events: [
        {
            id: "meetup-dinner",
            title: "Meetup Dinner",
            time: "17:00",
            date: new Date(2025, 11, 13)
        }
    ],
    venue: thodupuzhaVenue
}

// Wedding events (all Thodupuzha events combined)
export const weddingEventGroup: VenueEvents = {
    events: [
        ...mainEventGroup.events,
        ...thodupuzhaEventGroup.events
    ],
    venue: thodupuzhaVenue
}

// Trivandrum event
export const trivandrumEventGroup: VenueEvents = {
    events: [
        {
            id: "party-dinner",
            title: "Party Dinner",
            time: "19:00",
            date: new Date(2025, 11, 15),
        }
    ],
    venue: trivandrumVenue
}

// Pune event
export const puneEventGroup: VenueEvents = {
    events: [
        {
            id: "party-lunch",
            title: "Party Lunch",
            time: "11:00",
            endTime: "16:00",
            date: new Date(2025, 11, 21),
        }
    ],
    venue: puneVenue
}

// Event configuration by location
export const eventsByLocation = {
    kerala: {
        eventGroups: [mainEventGroup, thodupuzhaEventGroup, trivandrumEventGroup, puneEventGroup],
        primaryDate: new Date(2025, 11, 13), // Main wedding date (13th Dec)
        eventType: "Wedding",
        travelInstructions: keralaTravelInstructions,
        invitationMessage: "This is an official invitation to our wedding! You received it because we really want to see you at all our celebrations by our side!",
        celebrationMessage: "At our wedding celebration in God's Own Country"
    },
    thodupuzha: {
        eventGroups: [thodupuzhaEventGroup],
        primaryDate: new Date(2025, 11, 13), // Wedding date (13th Dec)
        eventType: "Wedding Dinner",
        invitationMessage: "This is an official invitation to our wedding! You received it because we really want to see you at all our celebrations by our side!",
        celebrationMessage: "At our wedding celebration in God's Own Country",
        regards: "NIVED Son of Late P G Muraleedharan Nair and PS RAJAMMA"
    },
    familyforeverpass: {
        eventGroups: [weddingEventGroup, puneEventGroup],
        primaryDate: new Date(2025, 11, 13), // Wedding date (13th Dec)
        eventType: "Wedding",
        travelInstructions: keralaTravelInstructions,
        invitationMessage: "This is an official invitation to our wedding! You received it because we really want to see you at all our celebrations by our side!",
        celebrationMessage: "At our wedding celebration in God's Own Country",
        regards: "Methikar (Chaturmuttha) family"
    },
    trivandrum: {
        eventGroups: [trivandrumEventGroup],
        primaryDate: new Date(2025, 11, 15), // Dinner date (15th Dec)
        eventType: "Wedding Dinner",
        invitationMessage: "This is an official invitation to our wedding dinner! You received it because we really want to celebrate with you on this special evening!",
        celebrationMessage: "At our wedding celebration in God's Own Country",
        regards: "Saritha G D/o GOPALAKRISHNAN N and KRISHNAKUMARI B",
        travelInstructions: simpleTravelInstructions
    },
    pune: {
        eventGroups: [puneEventGroup],
        primaryDate: new Date(2025, 11, 21), // Lunch date (21st Dec)
        eventType: "Wedding Lunch",
        invitationMessage: "This is an official invitation to our wedding lunch! You received it because we really want to celebrate with you on this joyful day!",
        celebrationMessage: "At our wedding celebration in the Oxford of the East",
        travelInstructions: simpleTravelInstructions,
        regards: "Methikar (Chaturmuttha) family"
    }
}

