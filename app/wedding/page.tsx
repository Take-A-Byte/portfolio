"use client"

import React, { useEffect, useState } from "react"
import { Heart, Plane, Bus, Car, Backpack, Sparkles, Minimize2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { Bodoni_Moda, DM_Serif_Display } from "next/font/google"
import { eventsByLocation } from "./data/events"
import { weddingData } from "./data/wedding"
import { formatDate } from "./utils/date"
import { useTranslation } from "./i18n/useTranslation"
import { detectUserRegion } from "./locationService"
import AirplaneAnimation from "./AirplaneAnimation"
import { TravelInstructions, VenueEvents } from "./types"
import { cn } from "@/lib/utils"
import { PerforationDivider } from "./components/PerforationDivider"
import "./page.css"

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"]
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"]
})

// Helper function to extract unique dates from venue events
const getUniqueDatesFromVenueEvents = (venueEvents: VenueEvents[]): Date[] => {
  const uniqueDates = new Map<string, Date>()
  venueEvents.forEach(venueEvent => {
    venueEvent.events.forEach(event => {
      const dateKey = event.date.toISOString()
      if (!uniqueDates.has(dateKey)) {
        uniqueDates.set(dateKey, event.date)
      }
    })
  })
  return Array.from(uniqueDates.values()).sort((a, b) => a.getTime() - b.getTime())
}

// Add computed displayDate and dates to each location
const getLocationConfig = (location: keyof typeof eventsByLocation) => {
  const config = eventsByLocation[location]
  return {
    ...config,
    displayDate: formatDate(config.primaryDate),
    dates: getUniqueDatesFromVenueEvents(config.eventGroups)
  }
}

// Helper function to get icon component
const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, any> = {
    plane: Plane,
    bus: Bus,
    car: Car,
    backpack: Backpack,
    sparkles: Sparkles
  }
  return iconMap[iconName] || Bus
}

export default function WeddingInvitation() {
  const { t, isLoading } = useTranslation()
  const defaultConfig = getLocationConfig('pune')
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [venueEvents, setVenueEvents] = useState<VenueEvents[]>(defaultConfig.eventGroups)
  const [filteredDates, setFilteredDates] = useState(defaultConfig.dates)
  const [eventType, setEventType] = useState(defaultConfig.eventType)
  const [displayDate, setDisplayDate] = useState(defaultConfig.displayDate)
  const [travelInstructions, setTravelInstructions] = useState<TravelInstructions | undefined>(defaultConfig.travelInstructions)
  const [invitationMessage, setInvitationMessage] = useState(defaultConfig.invitationMessage)
  const [celebrationMessage, setCelebrationMessage] = useState(defaultConfig.celebrationMessage)
  const [regards, setRegards] = useState<string | undefined>(defaultConfig.regards)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [currentVenueIndex, setCurrentVenueIndex] = useState(0)
  const [utmSource, setUtmSource] = useState<string | null>(null)

  // Filter timeline and calendar dates based on utm_source parameter or user location
  // Priority: utm_source parameter > user location > default (Pune)
  // Default by location: Maharashtra -> Pune, Kerala -> Trivandrum
  // With ?utm_source=kerala: Show all events (12th, 13th, 15th, 21st Dec)
  // With ?utm_source=familyforeverpass: Show all Thodupuzha wedding events (Haldi, Sangeet, Vidhi, Meetup Dinner)
  // With ?utm_source=thodupuzha or ?utm_source=idukki: Show only Thodupuzha Meetup Dinner (13th Dec)
  // With ?utm_source=trivandrum or ?utm_source=thiruvananthapuram: Show only Trivandrum dinner (15th Dec)
  // With ?utm_source=pune: Show only Pune lunch (21st Dec)
  // With ?utm_source=privilegeduser: Show everything with full transport, localization based on detected region
  useEffect(() => {
    const loadEventConfig = async () => {
      const params = new URLSearchParams(window.location.search)
      const utmParam = params.get('utm_source')?.toLowerCase()

      setUtmSource(utmParam || null)

      let locationKey: 'kerala' | 'thodupuzha' | 'familyforeverpass' | 'trivandrum' | 'pune' = 'pune' // default

      // If utm_source is provided, it takes priority
      if (utmParam) {
        if (utmParam === 'kerala') {
          locationKey = 'kerala'
        } else if (utmParam === 'privilegeduser') {
          // For privilegeduser, always show all events (kerala config)
          // Localization language will be handled by the i18n system based on detected region
          locationKey = 'kerala'
        } else if (utmParam === 'familyforeverpass') {
          locationKey = 'familyforeverpass'
        } else if (utmParam === 'thodupuzha' || utmParam === 'idukki') {
          locationKey = 'thodupuzha'
        } else if (utmParam === 'trivandrum' || utmParam === 'thiruvananthapuram') {
          locationKey = 'trivandrum'
        } else if (utmParam === 'pune' || utmParam === 'maharashtra') {
          locationKey = 'pune'
        }
      } else {
        // No utm_source, use location detection
        const userRegion = await detectUserRegion()

        if (userRegion === 'kerala') {
          locationKey = 'trivandrum'
        } else if (userRegion === 'maharashtra') {
          locationKey = 'pune'
        }
        // 'other' regions default to pune
      }

      const config = getLocationConfig(locationKey)

      setVenueEvents(config.eventGroups)
      setFilteredDates(config.dates)
      setEventType(config.eventType)
      setDisplayDate(config.displayDate)
      setTravelInstructions(config.travelInstructions)
      setInvitationMessage(config.invitationMessage)
      setCelebrationMessage(config.celebrationMessage)
      setRegards(config.regards)
    }

    loadEventConfig()
  }, [])

  // Update current venue index when carousel changes
  useEffect(() => {
    if (!carouselApi) {
      return
    }

    carouselApi.on("select", () => {
      setCurrentVenueIndex(carouselApi.selectedScrollSnap())
    })
  }, [carouselApi])

  // Track fullscreen state changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      )
      setIsFullscreen(isCurrentlyFullscreen)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('msfullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
      document.removeEventListener('msfullscreenchange', handleFullscreenChange)
    }
  }, [])

  // Request fullscreen on first user interaction
  useEffect(() => {
    let isSkipped = false

    const enterFullscreen = async () => {
      try {
        const elem = document.documentElement as any

        // Check if already in fullscreen
        if (document.fullscreenElement || (document as any).webkitFullscreenElement) {
          return
        }

        // Try different fullscreen APIs for mobile compatibility
        if (elem.requestFullscreen) {
          await elem.requestFullscreen()
        } else if (elem.webkitRequestFullscreen) {
          // Safari/iOS
          await elem.webkitRequestFullscreen()
        } else if (elem.mozRequestFullScreen) {
          // Firefox
          await elem.mozRequestFullScreen()
        } else if (elem.msRequestFullscreen) {
          // IE/Edge
          await elem.msRequestFullscreen()
        }
      } catch (err) {
        console.log('Fullscreen request failed:', err)
      }
    }

    const handleInteraction = () => {
      if (!isSkipped) {
        setShowFullscreenPrompt(false)
        enterFullscreen()
      }
    }

    // Try to enter fullscreen on first click or touch
    document.addEventListener('click', handleInteraction)
    document.addEventListener('touchstart', handleInteraction)

    // Expose a function to skip fullscreen
    ;(window as any).__skipFullscreen = () => {
      isSkipped = true
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }

    return () => {
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
      delete (window as any).__skipFullscreen
    }
  }, [])

  // Function to exit fullscreen
  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen()
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen()
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen()
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen()
      }
    } catch (err) {
      console.log('Exit fullscreen failed:', err)
    }
  }

  // Show loading state while detecting location
  if (isLoading) {
    return (
      <div className="min-h-screen overflow-x-hidden flex items-center justify-center" style={{ background: `linear-gradient(to bottom, var(--gradient-start), var(--gradient-end))` }}>
        <div className="text-center">
          <div className="relative">
            <Heart className="w-12 h-12 mx-auto text-red-400 fill-red-400 heart-pump" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden wedding-content" style={{ background: `linear-gradient(to bottom, var(--gradient-start), var(--gradient-end))` }}>
      <AirplaneAnimation />

      {/* Exit Fullscreen Button */}
      {isFullscreen && (
        <button
          onClick={exitFullscreen}
          className="fixed top-4 right-4 z-[9998] bg-white/90 hover:bg-white text-slate-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          aria-label="Exit fullscreen"
          title="Exit fullscreen"
        >
          <Minimize2 className="w-5 h-5" />
        </button>
      )}

      {/* Fullscreen Prompt Overlay */}
      {showFullscreenPrompt && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl p-6 mx-4 max-w-sm text-center transform animate-in zoom-in duration-300">
            <div className="mb-4">
              <Heart className="w-12 h-12 mx-auto text-red-400 fill-red-400 heart-pump" />
            </div>
            <h3 className={cn("text-xl font-serif text-slate-800 mb-2", dmSerifDisplay.className)}>
              Welcome!
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Tap anywhere to go fullscreen for a better experience
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Enjoy the celebration</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                if ((window as any).__skipFullscreen) {
                  (window as any).__skipFullscreen()
                }
                setShowFullscreenPrompt(false)
              }}
              className="text-xs text-slate-400 hover:text-slate-600 underline transition-colors px-6 py-3 -mx-6 -mb-2"
            >
              Skip fullscreen
            </button>
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto space-y-4 xxs:space-y-5 xs:space-y-6 sm:space-y-10 bg-primary p-2 xxs:p-2.5 xs:p-3 sm:p-6 sm:rounded-3xl">
        {/* Boarding Pass / Ticket */}
        <Card className="relative bg-secondary shadow-2xl overflow-visible border-0 rounded-xl z-50">
          <div className="flex flex-col">
          {/* Perforated top edge with semicircle cutouts */}
          <div className="flex justify-center w-[97%]">
            <img src="/perforated-top.svg" alt="" className="w-[97%]" />
          </div>

        {/* Wedding Ticket */}
            <div className={cn("text-center py-3 xxs:py-3 xs:py-4", dmSerifDisplay.className)}>
              <p className="text-sm xxs:text-sm xs:text-md font-medium text-slate-600 tracking-widest">
                {eventType.toUpperCase()} TICKET
              </p>
            </div>

          {/* Perforation */}
          <PerforationDivider />

          {/* Main Content */}
          <div className="pt-4 xxs:pt-5 xs:pt-6 sm:pt-8 pb-3 xxs:pb-3 xs:pb-4 sm:pb-6 px-3 xxs:px-3 xs:px-4 sm:px-8">


            {/* Globe illustration */}
            <div className="flex justify-center mb-6">
              <div className="relative w-32 xxs:w-36 xs:w-40 sm:w-48 h-32 xxs:h-36 xs:h-40 sm:h-48">
                <img src="/globe.svg" alt="Globe" className="w-full h-full text-slate-900" />
              </div>
            </div>

            {/* Names */}
            <div className={cn("flex flex-col items-center justify-center mb-8", dmSerifDisplay.className)}>
              <div className="flex flex-col items-center mb-1">
                <h1 className="text-2xl xxs:text-2xl xs:text-3xl sm:text-4xl font-serif text-slate-800 text-center">
                  {t.brideName}
                </h1>
                {(t.brideNameLocal || t.brideFamily) && (
                  <p className="text-sm xxs:text-sm xs:text-base text-slate-400 italic text-center">
                    {t.brideNameLocal}
                    {t.brideFamily && (
                      <span className="text-xs text-slate-500 ml-1">
                        ({t.brideFamily})
                      </span>
                    )}
                  </p>
                )}
              </div>
              <div className="text-2xl xxs:text-2xl xs:text-3xl font-light text-slate-600 mb-1">&</div>
              <div className="flex flex-col items-center">
                <h1 className="text-2xl xxs:text-2xl xs:text-3xl sm:text-4xl font-serif text-slate-800  text-center">
                  {t.groomName}
                </h1>
                {(t.groomNameLocal || t.groomFamily) && (
                  <p className="text-sm xxs:text-sm xs:text-base text-slate-400 italic text-center">
                    {t.groomNameLocal}
                    {t.groomFamily && (
                      <span className="text-xs text-slate-500 ml-1">
                        ({t.groomFamily})
                      </span>
                    )}
                  </p>
                )}
              </div>
            </div>

            {/* Flight details table */}
            <div className={`relative mb-6`}>
              <div className="border border-slate-800">
                <div className="flex">
                  {/* Left column with vertical label */}
                  <div className="border-r border-slate-800 bg-slate-900 text-white flex items-center justify-center" style={{ width: '32px' }}>
                    <p className="text-[10px] tracking-[0.2em] font-medium transform -rotate-180 whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>
                      JOURNEY
                    </p>
                  </div>

                  {/* Right column with details */}
                  <div className="flex-1">
                    {/* Flight & Date */}
                    <div className="border-b border-slate-800 px-3 py-2">
                      <p className="text-[9px] text-slate-500 mb-0.5 tracking-wide uppercase">Flight & Date</p>
                      <p className={`text-xs font-semibold text-slate-900`}>{displayDate}</p>
                    </div>

                    {/* Class */}
                    <div className="border-b border-slate-800 px-3 py-2">
                      <p className="text-[9px] text-slate-500 mb-0.5 tracking-wide uppercase">Class</p>
                      <p className="text-xs font-semibold text-slate-900">FIRST CLASS</p>
                    </div>

                    {/* Destination */}
                    <div className="px-3 py-2">
                      <p className="text-[9px] text-slate-500 mb-0.5 tracking-wide uppercase">To / Destination</p>
                      <p className="text-xs font-semibold text-slate-900">
                        {eventType === 'Wedding' ? 'TICKET TO HAPPINESS' :
                         eventType === 'Wedding Dinner' ? 'CELEBRATION DINNER' :
                         eventType === 'Wedding Lunch' ? 'CELEBRATION LUNCH' :
                         'TICKET TO HAPPINESS'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stamp Overlay */}
              <div className={cn("absolute -right-4 top-[85%] -translate-y-1/2", dmSerifDisplay.className)}>
                <div className="w-24 h-24 rounded-full border-[3px] border-primary flex items-center justify-center bg-transparent transform rotate-12 relative shadow-lg">
                  <div className="absolute inset-0 rounded-full border-[1.5px] border-primary" style={{ margin: '3px' }}></div>
                  <div className="text-center flex flex-col items-center gap-0">
                    <Plane className="w-3.5 h-3.5 mb-0.5" style={{ color: 'var(--text-primary)' }} />
                    <p className={cn("text-[7px] font-bold leading-none", bodoniModa.className)} style={{ color: 'var(--text-primary)' }}>
                      {displayDate.split('.').slice(0, 2).join('.')}
                    </p>
                    <div className="border-t border-primary w-8 my-0.5"></div>
                    {eventType.split(' ').map((word, idx) => (
                      <React.Fragment key={idx}>
                        <p className="text-[8px] font-bold leading-none tracking-tight" style={{ color: 'var(--text-primary)' }}>
                          {word.toUpperCase()}
                        </p>
                        {idx < eventType.split(' ').length - 1 && <div className="border-t border-primary w-8 my-0.5"></div>}
                      </React.Fragment>
                    ))}
                    <div className="border-t border-primary w-8 my-0.5"></div>
                    <p className="text-[8px] font-bold leading-none tracking-tight" style={{ color: 'var(--text-primary)' }}>
                      TICKET
                    </p>
                    <div className="border-t border-primary w-8 my-0.5"></div>
                    <Heart className="w-2.5 h-2.5 mt-0.5" style={{ fill: 'var(--accent-background)', color: 'var(--text-primary)' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Perforation */}
          <PerforationDivider className="h-8" />

        {/* Wedding Ticket */}
            <div className={cn("text-center py-3 xxs:py-3 xs:py-4", dmSerifDisplay.className)}>
              <p className="text-sm xxs:text-sm xs:text-md font-medium text-slate-600 tracking-widest">
                {eventType.toUpperCase()} TICKET
              </p>
            </div>

          {/* Perforated edge bottom */}
          <div className="flex justify-center w-[97%]">
            <img src="/perforated-bottom.svg" alt="" className="w-[97%]" />
          </div>
          </div>
        </Card>

        {/* Dear Friends & Calendar Section - Combined */}
        <Card className="bg-primary text-primary p-3 xxs:p-3 xs:p-4 sm:p-8 rounded-xl shadow-xl border-[1px] border-secondary">
          {/* Dear Friends Section */}
          <h2 className="text-xl xxs:text-xl xs:text-2xl sm:text-3xl font-serif text-center mb-4 sm:mb-6 leading-tight">
            DEAR<br />FRIENDS AND FAMILY!
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed text-center mb-6 sm:mb-8">
            {invitationMessage}
          </p>

          {/* Couple photo */}
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden sm:mb-8 border-2 bg-[#f0ede6] border-slate-700">
            <img
              src="/images/couple-sketch.png"
              alt="Couple Photo"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/10 to-transparent"></div>
          </div>

          {/* Dotted line with plane */}
          <div className="relative">
            <img
              src="/flight-path-1.svg"
              alt="Decorative line"
              className="w-full"
            />
            <div className="absolute top-1/2 left-[2rem] -translate-y-[calc(50%-4px)] px-2">
              <Plane className="w-8 h-8 text-primary fill-primary  rotate-[45deg]" strokeWidth={1} />
            </div>
          </div>

          {/* Waiting text */}
          <h3 className="text-lg xxs:text-lg xs:text-xl sm:text-2xl font-serif text-center mb-4 sm:mb-6">
            WE ARE WAITING FOR YOU
          </h3>
          <p className="text-xs xxs:text-xs xs:text-sm sm:text-sm text-center mb-6 sm:mb-8" style={{ color: 'var(--text-muted)' }}>
            {celebrationMessage}
          </p>

          {/* Calendar Section */}
          <div className="text-center mb-4">
            <h3 className="text-lg xxs:text-lg xs:text-xl sm:text-2xl font-serif text-white mb-1">
              {t.celebrationDateTitle(filteredDates.length)}
            </h3>
          </div>

          <div className={`flex justify-center`}>
            <div className="bg-white rounded-2xl p-3 sm:p-6">
              <Calendar
                mode="multiple"
                selected={filteredDates}
                defaultMonth={new Date(2025, 11, 21)}
                disableNavigation
                disabled={true}
                className="wedding-calendar rounded-lg pointer-events-none"
                classNames={{
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium text-slate-800",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "w-9 font-normal text-[0.8rem] text-slate-500",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-0",
                  day_selected: "bg-slate-900 text-white",
                  day_outside: "hidden",
                  day_hidden: "invisible",
                  day: "h-9 w-9 p-0 font-normal text-slate-800 aria-selected:opacity-100 rounded-md",
                }}
              />
            </div>
          </div>

          <div className={cn("text-center mt-8 pt-6", bodoniModa.className)} style={{ borderTop: '1px solid var(--text-muted)' }}>
            <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{eventType}</p>
            <h4 className="text-3xl font-serif text-primary mb-2">{displayDate}</h4>
          </div>
        </Card>

        {/* Venue Section */}
        <Card className="bg-secondary shadow-xl overflow-visible border-0 relative rounded-2xl">
          {/* Perforated top edge with semicircle cutouts */}
          <div className="flex justify-center w-[97%]">
            <img src="/perforated-top.svg" alt="" className="w-[97%]" />
          </div>

          <div className="pt-4 xxs:pt-5 xs:pt-6 sm:pt-10 pb-4 xxs:pb-5 xs:pb-6 sm:pb-8 px-3 xxs:px-3 xs:px-4 sm:px-8">
            <h3 className="text-lg xxs:text-lg xs:text-xl sm:text-2xl font-serif text-slate-800 mb-2 text-center tracking-wider">
              ARRIVAL GATE
            </h3>
            <p className="text-xs text-slate-500 text-center mb-4 sm:mb-6">{t.primaryDestinationLabel(venueEvents.flatMap(v => v.events).length)}</p>

            {/* Venue Carousel for multiple venues, or single venue display */}
            {venueEvents.length > 1 ? (
              <div className="relative">
                <Carousel setApi={setCarouselApi} className="w-full mx-auto">
                  <CarouselContent>
                    {venueEvents.map((venueEvent, index) => (
                      <CarouselItem key={index}>
                        <div className="space-y-4">
                          {/* Venue info - reduced width */}
                          <div className="text-center text-slate-600 mx-auto max-w-md px-12">
                            <p className="text-sm mb-1 font-medium">{venueEvent.venue.name}</p>
                            <p className="text-xs text-slate-500 mb-2">{venueEvent.venue.address}</p>
                            <a
                              href={venueEvent.venue.mapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 underline decoration-slate-400 hover:decoration-slate-900 transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              View on Google Maps
                            </a>
                          </div>

                          {/* Venue image - fixed size container */}
                          <div className="relative w-full aspect-[4/3] max-h-80 bg-slate-200 rounded-2xl overflow-hidden border-4 border-slate-300">
                            <img
                              src={venueEvent.venue.image}
                              alt={venueEvent.venue.name}
                              className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-slate-900/5 to-transparent"></div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {/* Overlay buttons beside text address area */}
                  <div className="absolute top-10 left-14 right-14 pointer-events-none">
                    <div className="flex items-center justify-between pointer-events-auto">
                      <CarouselPrevious className="h-9 w-9 rounded-full border-[2px] bg-slate-900 text-accent hover:bg-secondary hover:border-slate-900 shadow-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed" />
                      <CarouselNext className="h-9 w-9 rounded-full border-[2px] bg-slate-900 text-accent hover:bg-secondary hover:border-slate-900 shadow-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed" />
                    </div>
                  </div>
                </Carousel>
              </div>
            ) : venueEvents.length === 1 ? (
              <div className="space-y-4">
                <div className="text-center text-slate-600">
                  <p className="text-sm mb-1 font-medium">{venueEvents[0].venue.name}</p>
                  <p className="text-xs text-slate-500 mb-2">{venueEvents[0].venue.address}</p>
                  <a
                    href={venueEvents[0].venue.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 underline decoration-slate-400 hover:decoration-slate-900 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    View on Google Maps
                  </a>
                </div>

                {/* Venue image - fixed size container */}
                <div className="relative w-full aspect-[4/3] max-h-80 bg-slate-200 rounded-2xl overflow-hidden border-4 border-slate-300">
                  <img
                    src={venueEvents[0].venue.image}
                    alt={venueEvents[0].venue.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-slate-900/5 to-transparent"></div>
                </div>
              </div>
            ) : null}
          </div>

            {/* Transport Instructions */}
            {travelInstructions && (
              <>
            {/* Dashed separator */}
            <PerforationDivider className="my-8" />

            {/* How to get there instructions */}
            <div className="px-3 xxs:px-5 xs:px-7 sm:px-8">
              <h4 className="text-sm xxs:text-sm xs:text-base sm:text-lg font-serif text-slate-800 mb-2 text-center tracking-wider">
                YOUR JOURNEY TO HAPPINESS
              </h4>
              <p className="text-xs text-slate-500 text-center mb-4 sm:mb-6 italic">Boarding Pass Instructions</p>

              <div className="space-y-3 sm:space-y-4 mb-6">
                {travelInstructions.steps.map((step) => {
                  const StepIcon = getIconComponent(step.icon)

                  return (
                    <div key={step.id} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center">
                        <StepIcon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 pt-0.5">
                        <p className="text-sm font-medium text-slate-800 mb-1">{step.title}</p>
                        <p className="text-xs text-slate-600 mb-3">{step.description}</p>

                        {/* Render transport options if available */}
                        {step.transportOptions && step.transportOptions.length > 0 && (
                          <div className="space-y-3 ml-2">
                            {step.transportOptions.map((option) => {
                              const OptionIcon = getIconComponent(option.icon)

                              return (
                                <div
                                  key={option.id}
                                  className={cn("bg-gradient-to-r from-slate-50 to-transparent border-l-2 pl-3 py-2", option.borderColor)}
                                >
                                  <div className="flex items-center gap-1.5 mb-1">
                                    <OptionIcon className={cn("w-3 h-3", option.iconColor)} />
                                    <p className="text-xs font-semibold text-slate-800">
                                      {option.title}
                                      {option.recommended && ''}
                                    </p>
                                  </div>
                                  <p className="text-xs text-slate-600">{option.description}</p>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Dashed separator and Transport note - Only for Kerala events */}
            {travelInstructions.enabled && travelInstructions.specialNote && (
              <>
                <PerforationDivider />

                {/* Transport note */}
                <div className="mx-3 xxs:mx-3 xs:mx-4 sm:mx-8 mb-6 sm:mb-8 text-center">
                  <div className="inline-block mb-2 sm:mb-3">
                    <Heart className="w-8 sm:w-10 h-8 sm:h-10 text-red-400 fill-red-400 heart-pump" />
                  </div>
                  <h5 className="text-xs xxs:text-xs xs:text-sm sm:text-base font-serif text-slate-900 mb-2 tracking-wide">
                    {travelInstructions.specialNote.title}
                  </h5>
                  <p className="text-xs xxs:text-xs xs:text-xs sm:text-sm text-slate-700 max-w-sm mx-auto leading-relaxed">
                    {travelInstructions.specialNote.description}
                  </p>
                  <p className="text-xs text-slate-500 mt-2 italic">
                    {travelInstructions.specialNote.details}
                  </p>
                </div>
              </>
            )}
              </>
            )}

          {/* Perforated edge bottom */}
          <div className="flex justify-center w-[97%]">
            <img src="/perforated-bottom.svg" alt="" className="w-[97%]" />
          </div>

        {/* Semi-circular path overlay */}
        <div className="absolute bottom-32 -right-4 z-20 pointer-events-none">
          <div className="absolute -right-8 top-6 rotate-[200deg]">
            <svg width="150" height="240" viewBox="0 0 120 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 0 0 Q 120 0, 120 120"
                stroke="#fff"
                strokeWidth="3"
                strokeDasharray="8 8"
                fill="none"
              />
              <path
                d="M 120 120 Q 120 240, 0 290"
                stroke="#000"
                strokeWidth="3"
                strokeDasharray="8 8"
                fill="none"
              />
            </svg>
            {/* Plane at midpoint of black path */}
            <div className="absolute" style={{ left: '100px', top: '188px' }}>
              <Plane className="w-8 h-8 text-black fill-white -rotate-[20deg]" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        </Card>

        {/* Timeline Section */}
        <Card className="bg-primary text-primary shadow-xl border-[1px] border-secondary rounded-2xl">
          <div className="p-3 xxs:p-3 xs:p-4 sm:p-8">
            <h3 className="text-xl xxs:text-xl xs:text-2xl sm:text-3xl font-serif text-center mb-2 tracking-wider">
              FLIGHT SCHEDULE
            </h3>
            <p className="text-xs text-center mb-6 sm:mb-8" style={{ color: 'var(--text-muted)' }}>{t.celebrationsBoardingTimes(venueEvents.flatMap(v => v.events).length)}</p>

            {/* Timeline items */}
            <div className={cn("relative mb-8", bodoniModa.className)}>
              {/* Vertical line - thicker */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2" style={{ backgroundColor: 'var(--text-secondary)' }}></div>

              <div className="space-y-8 sm:space-y-12">
                {venueEvents.flatMap(venueEvent =>
                  venueEvent.events.map(event => ({ ...event, venue: venueEvent.venue }))
                ).map((event) => {
                  // Check for both " at " and "\n" splits
                  const hasNewline = event.title.includes('\n')
                  const hasAtSplit = event.title.includes(' at ')
                  const titleLines = hasNewline
                    ? event.title.split('\n')
                    : hasAtSplit
                      ? event.title.split(' at ')
                      : [event.title]
                  const hasLineBreak = titleLines.length > 1

                  // Determine location for conditional classes from venue address
                  const venueAddress = event.venue?.address || ''
                  const isThodupuzha = venueAddress.includes('Thodupuzha')
                  const isThiruvananthapuram = venueAddress.includes('Thiruvananthapuram')
                  const isPune = venueAddress.includes('Pune')

                  return (
                    <div
                      key={event.id}
                      className={cn(
                        "grid grid-cols-2 gap-4 xxs:gap-5 xs:gap-6 sm:gap-12 relative",
                        {
                          'location-thodupuzha': isThodupuzha,
                          'location-thiruvananthapuram': isThiruvananthapuram,
                          'location-pune': isPune,
                          'location-default': !isThodupuzha && !isThiruvananthapuram && !isPune
                        }
                      )}
                    >
                      <div className="flex flex-col items-end justify-center pr-2 xxs:pr-2 xs:pr-3 sm:pr-6">
                        <div
                          className={cn(
                            "text-xs xxs:text-xs xs:text-sm sm:text-base text-right",
                            { 'leading-tight': hasLineBreak }
                          )}
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {hasLineBreak ? (
                            <>
                              {titleLines[0]}{hasAtSplit ? ' at' : ''}<br />{titleLines[1]}
                            </>
                          ) : (
                            event.title
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-center pl-2 xxs:pl-2 xs:pl-3 sm:pl-6">
                        <div className="event-date">
                          {event.date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                        </div>
{event.endTime ? (
                          <div className="flex flex-col items-start">
                            <div className="text-2xl xxs:text-3xl xs:text-4xl sm:text-5xl font-normal text-primary tracking-tight leading-tight">
                              {event.time}
                            </div>
                            <div className="flex items-center gap-1 -mt-1 self-end mr-1">
                              <div className="text-sm xxs:text-sm xs:text-sm sm:text-2xl" style={{ color: 'var(--text-muted)' }}>
                                to
                              </div>
                              <div className="text-lg xxs:text-xl xs:text-2xl sm:text-3xl font-normal text-primary tracking-tight leading-tight">
                                {event.endTime}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-2xl xxs:text-3xl xs:text-4xl sm:text-5xl font-normal text-primary tracking-tight leading-tight">
                            {event.time}
                          </div>
                        )}
                        <div className="event-location">
                          {event.venue?.address.split(',').pop()?.trim() || ''}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Decorative flight path */}
            <div className="mt-8 pt-6 relative" style={{ borderTop: '1px solid var(--text-muted)' }}>
              <img src="/flight-path-2.svg" alt="" className="w-full h-16" />
              {/* Plane icon */}
              <div className="absolute right-2 top-[calc(50%+0.5rem)] -translate-y-1/2">
                <Plane className="w-6 h-6 rotate-[20deg] text-black fill-white" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </Card>

        {/* Final Boarding Pass - Get Ready Section */}
        <div className="flex flex-col">
        <Card className="relative bg-secondary shadow-2xl overflow-visible border-0 rounded-xl z-0 mb-16">
          <div className="flex flex-col">
            {/* Perforated top edge */}
            <div className="flex justify-center w-[97%] -z-20">
              <img src="/perforated-top.svg" alt="" className="w-[97%]" />
            </div>

            {/* Boarding Pass Header */}
            <div className={cn("text-center py-3 xxs:py-3 xs:py-4", dmSerifDisplay.className)}>
              <p className="text-sm xxs:text-sm xs:text-md font-medium text-slate-600 tracking-widest">
                FINAL BOARDING CALL
              </p>
            </div>

            {/* Perforation */}
            <PerforationDivider />

            {/* Main Content */}
            <div className="pt-4 xxs:pt-5 xs:pt-6 sm:pt-8 pb-6 xxs:pb-7 xs:pb-8 sm:pb-10 px-3 xxs:px-3 xs:px-4 sm:px-8">

              {/* Plane Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Plane className="w-20 h-20 text-slate-900" strokeWidth={1.5} />
                </div>
              </div>

              {/* Get Ready Message */}
              <div className={cn("text-center mb-6", dmSerifDisplay.className)}>
                <h2 className="text-2xl xxs:text-2xl xs:text-3xl sm:text-4xl font-serif text-slate-800 mb-3">
                  Get Ready to Onboard!
                </h2>
                <p className="text-sm xxs:text-sm xs:text-base text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Your journey to happiness is about to begin. Pack your bags, bring your smiles, and prepare for the celebration of a lifetime!
                </p>
              </div>

              {/* Decorative Hearts */}
              <div className="flex justify-center gap-3 mb-6">
                <Heart className="w-5 h-5 text-red-400 fill-red-400 heart-pump" />
                <Heart className="w-6 h-6 text-red-400 fill-red-400 heart-pump" style={{ animationDelay: '0.2s' }} />
                <Heart className="w-5 h-5 text-red-400 fill-red-400 heart-pump" style={{ animationDelay: '0.4s' }} />
              </div>

              {/* See You There */}
              <div className={cn("text-center", bodoniModa.className)}>
                <p className="text-xl xxs:text-xl xs:text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                  See You There!
                </p>
                <p className="text-xs xxs:text-xs xs:text-sm text-slate-500 italic">
                  With love and anticipation
                </p>
              </div>

              {/* Stamp */}
              <div className="flex justify-center mt-8">
                <div className={cn("w-28 h-28 rounded-full border-[3px] border-slate-900 flex items-center justify-center transform -rotate-12", dmSerifDisplay.className)}>
                  <div className="absolute inset-0 rounded-full border-[1.5px] border-slate-900" style={{ margin: '3px' }}></div>
                  <div className="text-center flex flex-col items-center gap-1">
                    <Heart className="w-5 h-5 mb-1 text-slate-900 fill-red-400" />
                    <p className="text-xs font-bold leading-none text-slate-900">
                      CONFIRMED
                    </p>
                    <div className="border-t border-slate-900 w-10 my-1"></div>
                    <p className="text-[10px] font-bold leading-none tracking-tight text-slate-900">
                      DECEMBER
                    </p>
                    <p className="text-lg font-bold leading-none text-slate-900">
                      2025
                    </p>
                  </div>
                </div>
              </div>
          </div>


              <PerforationDivider />

              {/* Cabin Crew Section */}
              
              {weddingData.cabinCrew && weddingData.cabinCrew.length > 0 && (
                <div className={cn("text-center my-6", bodoniModa.className)}>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">
                      Family Crew Roster
                  </p>
                  <p className="text-[10px] text-slate-400 mb-3">
                    SERVING SMILES AT 35,000 FEET OF HAPPINESS
                  </p>
                  <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto mb-3">
                    {weddingData.cabinCrew.map((crew, index) => (
                      <div key={index} className={`border border-slate-300 rounded-lg p-2 ${weddingData.cabinCrew && weddingData.cabinCrew.length === 3 && index === 2 ? 'col-span-2 max-w-[calc(50%-0.375rem)] mx-auto' : ''}`}>
                        <div className="text-[9px] text-slate-400 uppercase tracking-wider mb-1">{crew.role}</div>
                        <div className="text-sm text-slate-700 font-medium">{crew.name}</div>
                        {crew.relation && (
                          <div className="text-[10px] text-slate-500 italic">{crew.relation}</div>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 italic">
                    Flying high on love and celebration
                  </p>
                </div>
              )}
            </div>

            {/* Perforated bottom edge */}
            <div className="flex justify-center w-[97%]">
              <img src="/perforated-bottom.svg" alt="" className="w-[97%]" />
            </div>
        </Card>
        <div className="mb-12 text-center">
          <p className="text-xs text-slate-300 italic flex-1 items-center justify-center mb-1">
            Here's to love, laughter, and happily ever after!
          </p>
          {regards && (
            <p className="text-[10px] text-slate-400 italic opacity-60">
              Regards,<br />
              {regards}
            </p>
          )}
        </div>
        </div>
      </div>
    </div>
  )
}
