"use client"

import { Heart, Plane, Bus, Car, Backpack, Sparkles, Palmtree, Waves, Castle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Bodoni_Moda, DM_Serif_Display } from "next/font/google"
import { weddingData } from "./data"
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

export default function WeddingInvitation() {
  const { brideName, groomName, weddingDate, venue, timeline, importantDates } = weddingData

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: `linear-gradient(to bottom, var(--gradient-start), var(--gradient-end))` }}>
      <div className="max-w-md mx-auto space-y-10 bg-primary p-6 rounded-3xl">
        {/* Boarding Pass / Ticket */}
        <Card className="relative bg-secondary shadow-2xl overflow-visible border-0 rounded-xl">
          <div className="flex flex-col">
          {/* Perforated top edge with semicircle cutouts */}
          <div className="h-8">
            <img src="/perforated-top.svg" alt="" />
          </div>

        {/* Wedding Ticket */}
            <div className={`text-center py-4 ${dmSerifDisplay.className}`}>
              <p className="text-md font-medium text-slate-600 tracking-widest">
                WEDDING TICKET
              </p>
            </div>

          {/* Perforation */}
          <div className="flex items-center w-full">
            {/* Left semicircle */}
            <div className="w-6 h-12 overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-primary -ml-6"></div>
            </div>

            {/* Dashed line that fills remaining width */}
            <div className="flex-1 border-t-4 border-dashed border-primary"></div>

            {/* Right semicircle */}
            <div className="w-6 h-12 overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-primary -mr-6"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="pt-8 pb-6 px-8">
            

            {/* Globe illustration */}
            <div className="flex justify-center mb-6">
              <div className="relative w-48 h-48">
                <img src="/globe.svg" alt="Globe" className="w-full h-full text-slate-900" />
              </div>
            </div>

            {/* Names */}
            <div className={`flex flex-col items-center justify-center mb-8 ${dmSerifDisplay.className}`}>
              <h1 className="text-3xl sm:text-4xl font-serif text-slate-800 mb-1 text-center">
                {brideName}
              </h1>
              <div className="text-3xl font-light text-slate-600 mb-1">&</div>
              <h1 className="text-3xl sm:text-4xl font-serif text-slate-800 text-center">
                {groomName}
              </h1>
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
                      <p className={`text-xs font-semibold text-slate-900`}>{weddingDate}</p>
                    </div>

                    {/* Class */}
                    <div className="border-b border-slate-800 px-3 py-2">
                      <p className="text-[9px] text-slate-500 mb-0.5 tracking-wide uppercase">Class</p>
                      <p className="text-xs font-semibold text-slate-900">FIRST CLASS</p>
                    </div>

                    {/* Destination */}
                    <div className="px-3 py-2">
                      <p className="text-[9px] text-slate-500 mb-0.5 tracking-wide uppercase">To / Destination</p>
                      <p className="text-xs font-semibold text-slate-900">TICKET TO HAPPINESS</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stamp Overlay */}
              <div className={`absolute -right-4 top-[85%] -translate-y-1/2 ${dmSerifDisplay.className}`}>
                <div className="w-24 h-24 rounded-full border-[3px] border-primary flex items-center justify-center bg-transparent transform rotate-12 relative shadow-lg">
                  <div className="absolute inset-0 rounded-full border-[1.5px] border-primary" style={{ margin: '3px' }}></div>
                  <div className="text-center flex flex-col items-center gap-0">
                    <Plane className="w-3.5 h-3.5 mb-0.5" style={{ color: 'var(--text-primary)' }} />
                    <p className={`text-[7px] font-bold leading-none ${bodoniModa.className}`} style={{ color: 'var(--text-primary)' }}>
                      21.06
                    </p>
                    <div className="border-t border-primary w-8 my-0.5"></div>
                    <p className="text-[8px] font-bold leading-none tracking-tight" style={{ color: 'var(--text-primary)' }}>
                      WEDDING
                    </p>
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
          <div className="flex items-center w-full h-8">
            {/* Left semicircle */}
            <div className="w-6 h-12 overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-primary -ml-6"></div>
            </div>

            {/* Dashed line that fills remaining width */}
            <div className="flex-1 border-t-4 border-dashed border-primary"></div>

            {/* Right semicircle */}
            <div className="w-6 h-12 overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-primary -mr-6"></div>
            </div>
          </div>

        {/* Wedding Ticket */}
            <div className={`text-center py-4 ${dmSerifDisplay.className}`}>
              <p className="text-md font-medium text-slate-600 tracking-widest">
                WEDDING TICKET
              </p>
            </div>

          {/* Perforated edge bottom */}
          <div className="relative left-[2px]">
            <img src="/perforated-bottom.svg" alt="" />
          </div>
          </div>
        </Card>

        {/* Dear Friends & Calendar Section - Combined */}
        <Card className="bg-primary text-primary p-8 rounded-xl shadow-xl border-[1px] border-secondary">
          {/* Dear Friends Section */}
          <h2 className="text-3xl font-serif text-center mb-6 leading-tight">
            DEAR OUR<br />FRIENDS AND FAMILY!
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed text-center mb-8">
            This is an official invitation to our wedding! You received it because we really want to see you on this day by our side!
          </p>

          {/* Couple photo placeholder */}
          <div className="relative w-full h-64 bg-slate-800 rounded-2xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="w-16 h-16 text-slate-700" />
            </div>
          </div>

          {/* Dotted line with plane */}
          <div className="relative">
            <img
              src="/flight-path-1.svg"
              alt="Decorative line"
              className="w-full"
            />
            <div className="absolute top-1/2 left-[2rem] -translate-y-[calc(50%-4px)] bg-primary px-2">
              <Plane className="w-8 h-8 text-primary fill-transparent rotate-[45deg]" strokeWidth={1} />
            </div>
          </div>

          {/* Waiting text */}
          <h3 className="text-2xl font-serif text-center mb-6">
            WE ARE WAITING FOR YOU
          </h3>
          <p className="text-sm text-center mb-8" style={{ color: 'var(--text-muted)' }}>
            At the first celebration of our family
          </p>

          {/* Calendar Section */}
          <div className="text-center mb-4">
            <h3 className="text-2xl font-serif text-white mb-1">CELEBRATION DATES</h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>December 2025</p>
          </div>

          <div className={`flex justify-center`}>
            <div className="bg-white rounded-2xl p-6">
              <Calendar
                mode="multiple"
                selected={importantDates}
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

          <div className={`text-center mt-8 pt-6 ${bodoniModa.className}`} style={{ borderTop: '1px solid var(--text-muted)' }}>
            <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Main Event</p>
            <h4 className="text-3xl font-serif text-primary mb-2">{weddingDate}</h4>
          </div>
        </Card>

        {/* Venue Section */}
        <Card className="bg-secondary shadow-xl overflow-visible border-0 relative rounded-2xl">
          {/* Perforated top edge with semicircle cutouts */}
          <div className="h-8">
            <img src="/perforated-top.svg" alt="" />
          </div>

          <div className="pt-10 pb-8 px-8">
            <h3 className="text-2xl font-serif text-slate-800 mb-2 text-center tracking-wider">
              ARRIVAL GATE
            </h3>
            <p className="text-xs text-slate-500 text-center mb-6">Primary Celebration Destination</p>

            <div className="text-center text-slate-600 mb-6">
              <p className="text-sm mb-1 font-medium">{venue.name}</p>
              <p className="text-xs text-slate-500">{venue.address}</p>
            </div>

            {/* Venue image placeholder */}
            <div className="relative w-full h-80 bg-slate-200 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-slate-400 text-sm">Venue Image</div>
              </div>
            </div>
          </div>

            {/* Dashed separator */}
            <div className="flex items-center w-full my-8">
              {/* Left semicircle */}
              <div className="w-6 h-12 overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-primary -ml-6"></div>
              </div>

              {/* Dashed line that fills remaining width */}
              <div className="flex-1 border-t-4 border-dashed border-primary"></div>

              {/* Right semicircle */}
              <div className="w-6 h-12 overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-primary -mr-6"></div>
              </div>
            </div>

            {/* How to get there instructions */}
            <div className="px-8">
              <h4 className="text-lg font-serif text-slate-800 mb-2 text-center tracking-wider">
                YOUR JOURNEY TO HAPPINESS
              </h4>
              <p className="text-xs text-slate-500 text-center mb-6 italic">Boarding Pass Instructions</p>

              <div className="space-y-4 mb-6">
                {/* Step 1 */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center">
                    <Plane className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 pt-0.5">
                    <p className="text-sm font-medium text-slate-800 mb-1">First Stop: Gateway to God's Own Country</p>
                    <p className="text-xs text-slate-600">
                      Board your flight to Kochi International Airport, Kerala - where palm trees sway and love is in the air!
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center">
                    <Bus className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 pt-0.5">
                    <p className="text-sm font-medium text-slate-800 mb-2">Next Stop: Where the Party Begins!</p>
                    <p className="text-xs text-slate-600 mb-3">Choose your adventure from Kochi to our venue:</p>

                    <div className="space-y-3 ml-2">
                      <div className="bg-gradient-to-r from-slate-50 to-transparent border-l-2 border-slate-900 pl-3 py-2">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Sparkles className="w-3 h-3 text-slate-900" />
                          <p className="text-xs font-semibold text-slate-800">VIP Love Express (Recommended!)</p>
                        </div>
                        <p className="text-xs text-slate-600">
                          Early birds arriving by 7:00 AM on 12th Dec get the royal treatment! Our special wedding bus will whisk you directly to the venue. No stops, just love and laughter!
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-slate-50 to-transparent border-l-2 border-slate-400 pl-3 py-2">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Car className="w-3 h-3 text-slate-700" />
                          <p className="text-xs font-semibold text-slate-800">Private Chariot</p>
                        </div>
                        <p className="text-xs text-slate-600">
                          Book your own cab and cruise through Kerala's scenic routes at your own pace. Perfect for families or those who love a road trip!
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-slate-50 to-transparent border-l-2 border-slate-300 pl-3 py-2">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Backpack className="w-3 h-3 text-slate-600" />
                          <p className="text-xs font-semibold text-slate-800">The Adventurer's Route</p>
                        </div>
                        <p className="text-xs text-slate-600">
                          Take a public bus to Thodupuzha town, then hop into a local cab. Experience Kerala like a local explorer!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashed separator */}
            <div className="flex items-center w-full">
              {/* Left semicircle */}
              <div className="w-6 h-12 overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-primary -ml-6"></div>
              </div>

              {/* Dashed line that fills remaining width */}
              <div className="flex-1 border-t-4 border-dashed border-primary"></div>

              {/* Right semicircle */}
              <div className="w-6 h-12 overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-primary -mr-6"></div>
              </div>
            </div>

              {/* Transport note */}
              <div className="mx-8 mb-8 text-center">
                <div className="inline-block mb-3">
                  <Heart className="w-10 h-10 text-red-400 fill-red-400 heart-pump" />
                </div>
                <h5 className="text-base font-serif text-slate-900 mb-2 tracking-wide">
                  Special Wedding Transit Service
                </h5>
                <p className="text-sm text-slate-700 max-w-sm mx-auto leading-relaxed">
                  Complimentary transport departing Kochi Airport at <span className="font-semibold text-slate-900">7:00 AM on December 12th</span>
                </p>
                <p className="text-xs text-slate-500 mt-2 italic">
                  RSVP to secure your seat on the Love Express!
                </p>
              </div>
              
          {/* Perforated edge bottom */}
          <div className="relative left-[2px]">
            <img src="/perforated-bottom.svg" alt="" />
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
          <div className="p-8">
            <h3 className="text-3xl font-serif text-center mb-2 tracking-wider">
              FLIGHT SCHEDULE
            </h3>
            <p className="text-xs text-center mb-8" style={{ color: 'var(--text-muted)' }}>All celebrations boarding times</p>

            {/* Timeline items */}
            <div className={`relative mb-8 ${bodoniModa.className}`}>
              {/* Vertical line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ backgroundColor: 'var(--text-secondary)' }}></div>

              <div className="space-y-12">
                {timeline.map((event) => {
                  // Check for both " at " and "\n" splits
                  const hasNewline = event.title.includes('\n')
                  const hasAtSplit = event.title.includes(' at ')
                  const titleLines = hasNewline
                    ? event.title.split('\n')
                    : hasAtSplit
                      ? event.title.split(' at ')
                      : [event.title]
                  const hasLineBreak = titleLines.length > 1

                  // Get dot color based on date
                  const getDotColor = () => {
                    if (event.date.includes('12th')) return '#dbeafe' // blue-100
                    if (event.date.includes('13th')) return '#fef3c7' // amber-100
                    if (event.date.includes('15th')) return '#ede9fe' // violet-100
                    if (event.date.includes('21st')) return '#fce7f3' // pink-100
                    return '#64748b' // slate-500
                  }

                  // Get icon based on location
                  const getLocationIcon = () => {
                    if (event.location.includes('Thodupuzha')) {
                      return <Palmtree className="w-3 h-3 text-slate-900" />
                    } else if (event.location.includes('Thiruvananthapuram')) {
                      return <Waves className="w-3 h-3 text-slate-900" />
                    } else if (event.location.includes('Pune')) {
                      return <Castle className="w-3 h-3 text-slate-900" />
                    }
                    return <Palmtree className="w-3 h-3 text-slate-900" />
                  }

                  return (
                    <div key={event.id} className="grid grid-cols-2 gap-12 relative">
                      {/* Timeline dot */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <div
                          className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center"
                          style={{ backgroundColor: getDotColor() }}
                        >
                          {getLocationIcon()}
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-center pr-6">
                        <div className={`text-base text-right ${hasLineBreak ? 'leading-tight' : ''}`} style={{ color: 'var(--text-muted)' }}>
                          {hasLineBreak ? (
                            <>
                              {titleLines[0]}{hasAtSplit ? ' at' : ''}<br />{titleLines[1]}
                            </>
                          ) : (
                            event.title
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-center pl-6">
                        <div className="text-xs mb-1" style={{ color: 'var(--text-light)' }}>
                          {event.date}
                        </div>
                        <div className="text-5xl font-normal text-primary tracking-tight leading-tight">{event.time}</div>
                        <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                          {event.location}
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
      </div>
    </div>
  )
}
