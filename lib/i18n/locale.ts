export const LOCALES = ["en"] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = "en"
export const LOCALE_COOKIE_NAME = "NEXT_LOCALE"

export function normalizeLocale(value?: string | null): Locale {
  return value && LOCALES.includes(value as Locale) ? (value as Locale) : DEFAULT_LOCALE
}

export async function getLocaleFromCookies() {
  const { cookies } = await import("next/headers")
  const cookieStore = cookies()
  const cookieValue = cookieStore.get(LOCALE_COOKIE_NAME)?.value
  return normalizeLocale(cookieValue)
}

export function buildLocalizedPath(pathname: string, locale: Locale = DEFAULT_LOCALE) {
  if (!pathname || pathname === "/") {
    return locale === DEFAULT_LOCALE ? "/en" : `/${locale}`
  }

  if (pathname.startsWith("#") || pathname.startsWith("?")) {
    return pathname
  }

  const suffixIndex = [pathname.indexOf("?"), pathname.indexOf("#")].filter((index) => index >= 0).sort((a, b) => a - b)[0]
  const suffix = suffixIndex !== undefined ? pathname.slice(suffixIndex) : ""
  const basePath = suffixIndex !== undefined ? pathname.slice(0, suffixIndex) : pathname
  const localePrefix = locale === DEFAULT_LOCALE ? "/en" : `/${locale}`

  if (basePath === "/en" || basePath.startsWith("/en/")) {
    return `${basePath}${suffix}`
  }

  if (basePath.startsWith("/")) {
    return `${localePrefix}${basePath}${suffix}`
  }

  return `${localePrefix}/${basePath}${suffix}`
}
