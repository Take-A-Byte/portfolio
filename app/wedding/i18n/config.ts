import { en } from './locales/en'
import { ml } from './locales/ml'
import { mr } from './locales/mr'

export type Locale = 'en' | 'ml' | 'mr'

export const locales: Locale[] = ['en', 'ml', 'mr']

export const defaultLocale: Locale = 'en'

export const translations = {
  en,
  ml,
  mr,
} as const

export type Translations = typeof en
