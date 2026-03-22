"use client"

import { useState, useEffect, useRef } from "react"

const ERASE_SCROLL_RANGE = 400
const ZIGZAG_CYCLES      = 8
const ZIGZAG_AMPLITUDE   = 20
const BASE_ANGLE         = 45
const WOBBLE_AMP         = 3
const DUSTER_W           = 72
const DUSTER_H           = 32
const STRIP_H            = 160

const DUST_SIZES = [5, 4, 6, 3]

export function SectionEraser() {
  const outerRef = useRef<HTMLDivElement>(null)

  const [drawn, setDrawn]     = useState(false)
  const [progress, setProgress] = useState(0)
  const [clipLeft, setClipLeft] = useState(0)
  const [duster, setDuster]   = useState({ x: -DUSTER_W, y: 0, angle: BASE_ANGLE })
  const [dust, setDust]       = useState<{ x: number; y: number; op: number }[]>([])
  const [faded, setFaded]     = useState(false)
  const fadeTimer             = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const outer = outerRef.current
      if (!outer) return

      const rect = outer.getBoundingClientRect()
      const vh   = window.innerHeight

      if (rect.top < vh * 0.95) setDrawn(true)

      const traveled = vh * 0.9 - rect.top
      const p = Math.max(0, Math.min(1, traveled / ERASE_SCROLL_RANGE))
      setProgress(p)
      document.documentElement.style.setProperty("--eraser-progress", String(p))

      if (p >= 1) {
        if (!fadeTimer.current) {
          fadeTimer.current = setTimeout(() => setFaded(true), 600)
        }
      } else {
        if (fadeTimer.current) { clearTimeout(fadeTimer.current); fadeTimer.current = null }
        setFaded(false)
      }

      const W = outer.offsetWidth
      const x       = -DUSTER_W + (W + DUSTER_W * 2) * p
      const yPhase  = Math.sin(p * Math.PI * 2 * ZIGZAG_CYCLES)
      const y       = STRIP_H * 0.46 + yPhase * ZIGZAG_AMPLITUDE
      const wobble  = Math.cos(p * Math.PI * 2 * ZIGZAG_CYCLES) * WOBBLE_AMP
      setDuster({ x, y, angle: BASE_ANGLE + wobble })

      // Clip SVG: hide everything to the left of the duster's left edge
      setClipLeft(Math.max(0, x))

      setDust([0, 1, 2, 3].map(i => {
        const phase = (p * 1.4 + i * 0.28) % 1
        const op    = phase < 0.3 ? phase / 0.3 : 1 - (phase - 0.3) / 0.7
        return {
          x: x + DUSTER_W * 0.2 + (i - 1.5) * 14,
          y: y - phase * 30,
          op: Math.max(0, op * 0.75),
        }
      }))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.documentElement.style.removeProperty("--eraser-progress")
      if (fadeTimer.current) clearTimeout(fadeTimer.current)
    }
  }, [])

  return (
    <div ref={outerRef} className="relative w-full py-4 overflow-hidden" style={{ zIndex: 20, position: "relative" }}>
      <div className="relative w-full h-40">

        {/* "AI" hollow background letters */}
        <span
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontWeight: 900,
            fontSize: "clamp(5rem, 18vw, 10rem)",
            letterSpacing: "-0.02em",
            color: "transparent",
            WebkitTextStroke: faded ? "1.5px rgba(255,255,255,0.07)" : "1.5px rgba(255,255,255,0.3)",
            lineHeight: 1,
            transition: "webkit-text-stroke 0.8s ease, opacity 0.8s ease",
          }}
        >
          AI
        </span>

        {/* SVG lines — clipped to show only the portion right of the duster */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 680 160"
          preserveAspectRatio="none"
          style={{ clipPath: `inset(0 0 0 ${clipLeft}px)` }}
        >
          <defs>
            <filter id="se-p1" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04 0.07" numOctaves="4" seed="42" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="2.8" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id="se-p2" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.05 0.08" numOctaves="4" seed="17" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id="se-p4" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.05 0.07" numOctaves="4" seed="91" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>

          {/* line 1 */}
          <path
            filter="url(#se-p1)"
            fill="none"
            stroke="rgba(255,255,255,0.82)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.1"
            d="M 0 78 C 48 67, 58 66, 80 78 C 102 90, 114 91, 152 78 C 170 67, 178 66, 204 78 C 218 88, 224 90, 242 80 C 256 70, 264 67, 326 78 C 358 88, 368 90, 374 80 C 384 71, 394 68, 436 78 C 452 88, 460 90, 474 80 C 484 70, 490 68, 512 78 C 536 89, 548 91, 588 79 C 606 69, 616 67, 638 78 C 650 83, 665 82, 680 78"
          />

          {/* line 2 */}
          <path
            filter="url(#se-p2)"
            fill="none"
            stroke="rgba(255,255,255,0.44)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M 0 84 C 56 74, 74 73, 126 85 C 152 94, 162 96, 170 86 C 182 77, 190 75, 214 85 C 232 94, 242 96, 280 86 C 292 78, 300 75, 318 84 C 330 93, 338 94, 356 86 C 368 77, 376 75, 452 85 C 476 94, 486 96, 504 86 C 516 77, 524 75, 544 84 C 560 93, 570 94, 584 86 C 600 78, 614 75, 644 84 C 658 90, 670 89, 680 84"
          />

          {/* line 4 */}
          <path
            filter="url(#se-p4)"
            fill="none"
            stroke="rgba(255,255,255,0.33)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
            d="M 0 90 C 52 80, 64 78, 94 91 C 112 100, 122 102, 134 92 C 146 83, 154 80, 174 90 C 194 100, 206 102, 260 91 C 278 82, 288 79, 304 90 C 320 99, 330 101, 380 91 C 394 82, 402 79, 418 90 C 432 99, 440 100, 510 91 C 528 82, 538 79, 556 90 C 572 99, 582 101, 602 91 C 618 83, 630 80, 644 90 C 658 97, 670 96, 680 90"
          />
        </svg>

        {/* Text — revealed left→right as lines are erased */}
        <p
          className="absolute inset-0 flex items-center justify-center uppercase pointer-events-none whitespace-nowrap"
          style={{
            clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)`,
            letterSpacing: "0.15em",
            fontFamily: "var(--font-plus-jakarta)",
            fontWeight: faded ? 400 : 800,
            fontStyle: faded ? "italic" : "normal",
            fontSize: "clamp(0.55rem, 2.5vw, 1.5rem)",
            color: faded ? "rgba(255,255,255,0.25)" : "hsl(var(--secondary))",
            transition: "color 0.8s ease, font-weight 0.8s ease, opacity 0.8s ease",
            opacity: faded ? 0.6 : 1,
          }}
        >
          erasing the gap between your App and AI
        </p>

        {/* Dust particles */}
        {drawn && dust.map((d, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: DUST_SIZES[i],
              height: DUST_SIZES[i],
              background: "rgba(255,255,255,0.55)",
              left: d.x,
              top: d.y,
              opacity: d.op,
            }}
          />
        ))}

        {/* Duster */}
        {drawn && (
          <div
            className="absolute pointer-events-none z-30"
            style={{
              left: duster.x,
              top: duster.y,
              width: DUSTER_W,
              height: DUSTER_H,
              background: "#e8d5b0",
              borderRadius: 4,
              border: "1.5px solid #c4a97a",
              transform: `translate(-50%, -50%) rotate(${duster.angle}deg)`,
              transformOrigin: "center center",
            }}
          >
            <div style={{
              position: "absolute",
              inset: 4,
              borderRadius: 2,
              background: "repeating-linear-gradient(90deg, rgba(180,140,80,0.35) 0px, rgba(180,140,80,0.35) 2px, transparent 2px, transparent 6px)",
            }} />
          </div>
        )}
      </div>
    </div>
  )
}
