/**
 * Service to detect user's location (Kerala or Maharashtra)
 * Tries geolocation first, falls back to IP-based detection
 */

export type UserRegion = 'kerala' | 'maharashtra' | 'other'

interface LocationResult {
  region: UserRegion
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

          // Check if the state is Kerala or Maharashtra
          const state = data.address?.state?.toLowerCase() || ''
          let region: UserRegion = 'other'

          if (state.includes('kerala')) {
            region = 'kerala'
          } else if (state.includes('maharashtra')) {
            region = 'maharashtra'
          }

          resolve({
            region,
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

    // Check if the region/state is Kerala or Maharashtra
    const regionName = data.region?.toLowerCase() || ''
    const regionCode = data.region_code || ''

    let region: UserRegion = 'other'

    if (regionName.includes('kerala') || regionCode === 'KL') {
      region = 'kerala'
    } else if (regionName.includes('maharashtra') || regionCode === 'MH') {
      region = 'maharashtra'
    }

    return {
      region,
      method: 'ip'
    }
  } catch (error) {
    console.error('IP-based location detection failed:', error)
    return {
      region: 'other',
      method: 'error'
    }
  }
}

/**
 * Main function to detect user's region
 * Tries geolocation first, falls back to IP-based detection
 */
export async function detectUserRegion(): Promise<UserRegion> {
  // Try geolocation first
  const geoResult = await detectLocationViaGeolocation()

  if (geoResult !== null) {
    console.log('Location detected via:', geoResult.method, '- Region:', geoResult.region)
    return geoResult.region
  }

  // Fallback to IP-based detection
  console.log('Geolocation unavailable, falling back to IP detection')
  const ipResult = await detectLocationViaIP()
  console.log('Location detected via:', ipResult.method, '- Region:', ipResult.region)

  return ipResult.region
}

/**
 * @deprecated Use detectUserRegion() instead
 * Legacy function for backward compatibility
 */
export async function detectIfFromKerala(): Promise<boolean> {
  const region = await detectUserRegion()
  return region === 'kerala'
}
