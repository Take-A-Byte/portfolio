/**
 * Localization service for wedding invitation
 * Provides different text based on whether the viewer is from Kerala
 */

export interface LocalizedStrings {
  celebrationMessage: string
}

/**
 * Get localized strings based on location
 * @param isFromKerala - Whether the user is from Kerala
 * @returns Localized strings object
 */
export function getLocalizedStrings(isFromKerala: boolean | null): LocalizedStrings {
  // While loading (null), show default message
  if (isFromKerala === null) {
    return {
      celebrationMessage: "At our wedding celebration in God's Own Country"
    }
  }

  // For Kerala residents - Malayalam text
  if (isFromKerala) {
    return {
      celebrationMessage: "ഞങ്ങളുടെ കുടുംബത്തിലെ ആദ്യ ആഘോഷത്തിൽ"
    }
  }

  // For non-Kerala visitors - English text
  return {
    celebrationMessage: "At our wedding celebration in God's Own Country"
  }
}

/**
 * Alternative: Get celebration message directly
 * @param isFromKerala - Whether the user is from Kerala
 * @returns Celebration message string
 */
export function getCelebrationMessage(isFromKerala: boolean | null): string {
  return getLocalizedStrings(isFromKerala).celebrationMessage
}
