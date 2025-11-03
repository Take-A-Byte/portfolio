"use client"

import { Heart, Plane } from "lucide-react"
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
            <h4 className="text-3xl font-serif text-primary mb-2">21.12.2025</h4>
          </div>
        </Card>

        {/* Venue Section */}
        <Card className="bg-secondary shadow-xl overflow-visible border-0 relative rounded-2xl">
          {/* Perforated top edge with semicircle cutouts */}
          <div className="h-8">
            <img src="/perforated-top.svg" alt="" />
          </div>

          <div className="pt-10 pb-8 px-8">
            <h3 className="text-2xl font-serif text-slate-800 mb-4 text-center tracking-wider">
              VENUE
            </h3>

            <div className="text-center text-slate-600 mb-4">
              <p className="text-sm mb-1">{venue.name}</p>
              <p className="text-xs text-slate-500">{venue.address}</p>
            </div>

            {/* How to get there button */}
            <div className="flex justify-center mb-6">
              <button className="bg-primary text-primary px-8 py-3 rounded-lg text-sm font-medium tracking-wider transition-colors" style={{ backgroundColor: 'var(--primary-background)', color: 'var(--primary-foreground)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-background)'}>
                HOW TO GET THERE
              </button>
            </div>

            {/* Venue image placeholder */}
            <div className="relative w-full h-80 bg-slate-200 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-slate-400 text-sm">Venue Image</div>
              </div>
            </div>
          </div>

          {/* Perforated edge bottom */}
          <div className="relative left-[2px]">
            <img src="/perforated-bottom.svg" alt="" />
          </div>

        {/* Semi-circular path overlay */}
        <div className="absolute bottom-32 -right-4 z-20 pointer-events-none">
          <div className="absolute -right-4 rotate-[180deg]">
            <svg width="150" height="240" viewBox="0 0 120 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 0 0 Q 120 0, 120 120"
                stroke="#fff"
                strokeWidth="3"
                strokeDasharray="8 8"
                fill="none"
              />
              <path
                d="M 120 120 Q 120 240, 0 240"
                stroke="#000"
                strokeWidth="3"
                strokeDasharray="8 8"
                fill="none"
              />
            </svg>
            {/* Plane at midpoint of black path */}
            <div className="absolute" style={{ left: '100px', top: '180px' }}>
              <Plane className="w-8 h-8 text-black fill-white -rotate-12" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        </Card>

        {/* Timeline Section */}
        <Card className="bg-primary text-primary shadow-xl border-[1px] border-secondary rounded-2xl">
          <div className="p-8">
            <h3 className="text-3xl font-serif text-center mb-8 tracking-wider">
              TIMELINE
            </h3>

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

                  return (
                    <div key={event.id} className="grid grid-cols-2 gap-12">
                      <div className="flex items-center justify-end pr-6">
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
                      <div className="flex items-center pl-6">
                        <div className="text-5xl font-normal text-primary tracking-tight">{event.time}</div>
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
                <Plane className="w-6 h-6 rotate-[20deg]" style={{ color: 'var(--text-muted)', fill: 'var(--text-muted)' }} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
