import { useState, useEffect } from 'react'
import { translations, defaultLocale, type Locale, type Translations } from './config'
import { detectUserRegion, type UserRegion } from '../locationService'

/**
 * Hook to get translations based on user's location
 * Returns Malayalam (ml) for Kerala, Marathi (mr) for Maharashtra, English (en) for others
 */
export function useTranslation() {
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const detectLocale = async () => {
      try {
        // Check UTM parameter first
        const params = new URLSearchParams(window.location.search)
        const utmSource = params.get('utm_source')?.toLowerCase()

        let detectedLocale: Locale = 'en'

        // If UTM parameter is provided, use it to determine locale
        if (utmSource) {
          if (utmSource === 'kerala') {
            detectedLocale = 'ml'
          } else if (utmSource === 'privilegeduser') {
            // For privilegeduser, detect user's actual location for localization
            const region = await detectUserRegion()
            if (region === 'kerala') {
              detectedLocale = 'ml'
            } else if (region === 'maharashtra') {
              detectedLocale = 'mr'
            } else {
              detectedLocale = 'en'
            }
          } else if (utmSource === 'trivandrum' || utmSource === 'thiruvananthapuram') {
            detectedLocale = 'ml'
          } else if (utmSource === 'pune' || utmSource === 'maharashtra') {
            detectedLocale = 'mr'
          }
        } else {
          // No UTM, detect based on user's location
          const region = await detectUserRegion()

          if (region === 'kerala') {
            detectedLocale = 'ml'
          } else if (region === 'maharashtra') {
            detectedLocale = 'mr'
          }
        }

        setLocale(detectedLocale)
      } catch (error) {
        console.error('Failed to detect locale:', error)
        setLocale(defaultLocale)
      } finally {
        setIsLoading(false)
      }
    }

    detectLocale()
  }, [])

  const t = translations[locale]

  return {
    t,
    locale,
    isLoading,
    setLocale, // Allow manual locale switching if needed
  }
}
