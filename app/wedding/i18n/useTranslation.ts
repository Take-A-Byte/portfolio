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
        const region = await detectUserRegion()

        // Map region to locale
        let detectedLocale: Locale = 'en'
        if (region === 'kerala') {
          detectedLocale = 'ml'
        } else if (region === 'maharashtra') {
          detectedLocale = 'mr'
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
