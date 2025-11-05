/**
 * Service to detect if the user is from Kerala
 * Tries geolocation first, falls back to IP-based detection
 */

interface LocationResult {
  isFromKerala: boolean
  method: 'geolocation' | 'ip' | 'error'
}

/**
 * Try to get location using browser's Geolocation API
 */
async function detectLocationViaGeolocation(): Promise<LocationResult | null> {
  if (!('geolocation' in navigator)) {
    return null
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords

          // Use reverse geocoding to get location details
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            {
              headers: {
                'User-Agent': 'WeddingInvitation/1.0'
              }
            }
          )
          const data = await response.json()

          // Check if the state is Kerala
          const state = data.address?.state?.toLowerCase() || ''
          const isFromKerala = state.includes('kerala')

          resolve({
            isFromKerala,
            method: 'geolocation'
          })
        } catch (error) {
          console.error('Reverse geocoding failed:', error)
          resolve(null)
        }
      },
      (error) => {
        // User denied permission or error occurred
        console.log('Geolocation permission denied or error:', error.message)
        resolve(null)
      },
      {
        timeout: 10000, // 10 second timeout
        maximumAge: 600000 // Cache for 10 minutes
      }
    )
  })
}

/**
 * Fallback: Detect location using IP address
 */
async function detectLocationViaIP(): Promise<LocationResult> {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()

    // Check if the region/state is Kerala or country code indicates India with Kerala region
    const isFromKerala = data.region?.toLowerCase().includes('kerala') ||
                        data.region_code === 'KL'

    return {
      isFromKerala,
      method: 'ip'
    }
  } catch (error) {
    console.error('IP-based location detection failed:', error)
    return {
      isFromKerala: false,
      method: 'error'
    }
  }
}

/**
 * Main function to detect if user is from Kerala
 * Tries geolocation first, falls back to IP-based detection
 */
export async function detectIfFromKerala(): Promise<boolean> {
  // Try geolocation first
  const geoResult = await detectLocationViaGeolocation()

  if (geoResult !== null) {
    console.log('Location detected via:', geoResult.method)
    return geoResult.isFromKerala
  }

  // Fallback to IP-based detection
  console.log('Geolocation unavailable, falling back to IP detection')
  const ipResult = await detectLocationViaIP()
  console.log('Location detected via:', ipResult.method)

  return ipResult.isFromKerala
}
