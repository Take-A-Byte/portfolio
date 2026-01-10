"use client"

import { useEffect, useRef } from "react"

export function AudioVisualizerBackground() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const hasTriggered = useRef(false)

  useEffect(() => {
    const triggerAudio = () => {
      if (hasTriggered.current) return
      hasTriggered.current = true

      // Send message to iframe to unmute audio
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage({ type: 'unmute-audio' }, '*')
      }

      // Remove audio trigger listeners (but keep scroll for parallax)
      window.removeEventListener('click', triggerAudio)
      window.removeEventListener('mousemove', triggerAudio)
      window.removeEventListener('touchstart', triggerAudio)
      window.removeEventListener('keydown', triggerAudio)
    }

    // Parallax scroll effect
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Send scroll position to iframe for camera parallax
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: 'scroll-update',
          scrollY: currentScrollY
        }, '*')
      }

      // Also trigger audio unmute on first scroll
      triggerAudio()
    }

    // Listen for user interaction on parent page
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('click', triggerAudio)
    window.addEventListener('mousemove', triggerAudio)
    window.addEventListener('touchstart', triggerAudio)
    window.addEventListener('keydown', triggerAudio)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('click', triggerAudio)
      window.removeEventListener('mousemove', triggerAudio)
      window.removeEventListener('touchstart', triggerAudio)
      window.removeEventListener('keydown', triggerAudio)
    }
  }, [])

  return (
    <div className="w-full h-full">
      <iframe
        ref={iframeRef}
        src="/audio-visualizer/background.html"
        className="w-full h-full border-0"
        title="Audio Visualizer Background"
        allow="autoplay; fullscreen"
      />
      {/* Dark tint overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
    </div>
  )
}
