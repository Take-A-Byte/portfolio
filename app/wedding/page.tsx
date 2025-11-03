"use client"

import { Heart, Plane } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Bodoni_Moda, DM_Serif_Display } from "next/font/google"

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

const brideName = "MURALEEMAYOORA"
const groomName = "SHANTANU"
const weddingDate = "13.12.2025"

export default function WeddingInvitation() {
  const date = [
    new Date(2025, 11, 12),
    new Date(2025, 11, 13),
    new Date(2025, 11, 15),
    new Date(2025, 11, 21)
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-md mx-auto space-y-10 bg-slate-900 p-6 rounded-3xl">
        {/* Boarding Pass / Ticket */}
        <Card className="relative bg-white shadow-2xl overflow-visible border-0 rounded-xl">
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
              <div className="w-12 h-12 rounded-full bg-slate-900 -ml-6"></div>
            </div>

            {/* Dashed line that fills remaining width */}
            <div className="flex-1 border-t-4 border-dashed border-slate-900"></div>

            {/* Right semicircle */}
            <div className="w-6 h-12 overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-slate-900 -mr-6"></div>
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
                <div className="w-24 h-24 rounded-full border-[3px] border-slate-900 flex items-center justify-center bg-transparent transform rotate-12 relative shadow-lg">
                  <div className="absolute inset-0 rounded-full border-[1.5px] border-slate-900" style={{ margin: '3px' }}></div>
                  <div className="text-center flex flex-col items-center gap-0">
                    <Plane className="w-3.5 h-3.5 text-slate-900 mb-0.5" />
                    <p className={`text-[7px] font-bold text-slate-900 leading-none ${bodoniModa.className}`}>
                      21.06
                    </p>
                    <div className="border-t border-slate-900 w-8 my-0.5"></div>
                    <p className="text-[8px] font-bold text-slate-900 leading-none tracking-tight">
                      WEDDING
                    </p>
                    <div className="border-t border-slate-900 w-8 my-0.5"></div>
                    <p className="text-[8px] font-bold text-slate-900 leading-none tracking-tight">
                      TICKET
                    </p>
                    <div className="border-t border-slate-900 w-8 my-0.5"></div>
                    <Heart className="w-2.5 h-2.5 fill-red-400 text-slate-900 mt-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Perforation */}
          <div className="flex items-center w-full h-8">
            {/* Left semicircle */}
            <div className="w-6 h-12 overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-slate-900 -ml-6"></div>
            </div>

            {/* Dashed line that fills remaining width */}
            <div className="flex-1 border-t-4 border-dashed border-slate-900"></div>

            {/* Right semicircle */}
            <div className="w-6 h-12 overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-slate-900 -mr-6"></div>
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
        <Card className="bg-slate-900 text-white p-8 rounded-xl shadow-xl border-[1px] border-white">
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
            <div className="absolute top-1/2 left-[2rem] -translate-y-[calc(50%-4px)] bg-slate-900 px-2">
              <Plane className="w-8 h-8 text-white fill-transparent rotate-[45deg]" strokeWidth={1} />
            </div>
          </div>

          {/* Waiting text */}
          <h3 className="text-2xl font-serif text-center mb-6">
            WE ARE WAITING FOR YOU
          </h3>
          <p className="text-sm text-slate-400 text-center mb-8">
            At the first celebration of our family
          </p>

          {/* Calendar Section */}
          <div className={`text-center mb-4 ${bodoniModa.className}`}>
            <h3 className="text-2xl font-serif text-white mb-2">DECEMBER</h3>
          </div>

          <div className={`flex justify-center`}>
            <div className="bg-white rounded-2xl p-6">
              <Calendar
                mode="multiple"
                selected={date}
                defaultMonth={new Date(2025, 11, 21)}
                disableNavigation
                disabled={true}
                className="rounded-lg pointer-events-none"
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium text-slate-800",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-slate-500 rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal text-slate-800 aria-selected:opacity-100 rounded-md",
                  day_selected: "bg-slate-900 text-white hover:bg-slate-900 hover:text-white focus:bg-slate-900 focus:text-white",
                  day_today: "bg-slate-100 text-slate-900",
                  day_outside: "text-slate-400 opacity-50",
                  day_disabled: "text-slate-600 opacity-50",
                  day_range_middle: "aria-selected:bg-slate-100 aria-selected:text-slate-900",
                  day_hidden: "invisible",
                }}
              />
            </div>
          </div>

          <div className={`text-center mt-8 pt-6 border-t border-slate-700 ${bodoniModa.className}`}>
            <h4 className="text-3xl font-serif text-white mb-2">21.12.2025</h4>
          </div>
        </Card>

        {/* Venue Section */}
        <Card className="bg-white shadow-xl overflow-visible border-0 relative rounded-2xl">
          {/* Perforated top edge with semicircle cutouts */}
          <div className="h-8">
            <img src="/perforated-top.svg" alt="" />
          </div>

          <div className="pt-10 pb-8 px-8">
            <h3 className="text-2xl font-serif text-slate-800 mb-4 text-center tracking-wider">
              VENUE
            </h3>

            <div className="text-center text-slate-600 mb-4">
              <p className="text-sm mb-1">Palace of Marriages No. 2</p>
              <p className="text-xs text-slate-500">St. Petersburg, Furshtatskaya St. 52</p>
            </div>

            {/* How to get there button */}
            <div className="flex justify-center mb-6">
              <button className="bg-slate-900 text-white px-8 py-3 rounded-lg text-sm font-medium tracking-wider hover:bg-slate-800 transition-colors">
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
        <Card className="bg-slate-900 text-white shadow-xl border-[1px] border-white rounded-2xl">
          <div className="p-8">
            <h3 className="text-3xl font-serif text-center mb-8 tracking-wider">
              TIMELINE
            </h3>

            {/* Timeline items */}
            <div className={`relative mb-8 ${bodoniModa.className}`}>
              {/* Vertical line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-600 -translate-x-1/2"></div>

              <div className="space-y-12">
                {/* Guest gathering */}
                <div className="grid grid-cols-2 gap-12">
                  <div className="flex items-center justify-end pr-6">
                    <div className="text-base text-slate-400 text-right">Guest gathering</div>
                  </div>
                  <div className="flex items-center pl-6">
                    <div className="text-5xl font-normal text-white tracking-tight">12:00</div>
                  </div>
                </div>

                {/* Registration ceremony */}
                <div className="grid grid-cols-2 gap-12">
                  <div className="flex items-center justify-end pr-6">
                    <div className="text-base text-slate-400 text-right leading-tight">Registration<br />ceremony</div>
                  </div>
                  <div className="flex items-center pl-6">
                    <div className="text-5xl font-normal text-white tracking-tight">12:30</div>
                  </div>
                </div>

                {/* Banquet */}
                <div className="grid grid-cols-2 gap-12">
                  <div className="flex items-center justify-end pr-6">
                    <div className="text-base text-slate-400 text-right leading-tight">Banquet at<br />Putilov Mansion</div>
                  </div>
                  <div className="flex items-center pl-6">
                    <div className="text-5xl font-normal text-white tracking-tight">13:30</div>
                  </div>
                </div>

                {/* End of evening */}
                <div className="grid grid-cols-2 gap-12">
                  <div className="flex items-center justify-end pr-6">
                    <div className="text-base text-slate-400 text-right">End of evening</div>
                  </div>
                  <div className="flex items-center pl-6">
                    <div className="text-5xl font-normal text-white tracking-tight">23:00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative flight path */}
            <div className="mt-8 pt-6 border-t border-slate-700 relative">
              <img src="/flight-path-2.svg" alt="" className="w-full h-16" />
              {/* Plane icon */}
              <div className="absolute right-2 top-[calc(50%+0.5rem)] -translate-y-1/2">
                <Plane className="w-6 h-6 text-slate-400 fill-slate-400 rotate-[20deg]" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
