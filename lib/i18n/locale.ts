export const LOCALES = ["en"] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = "en"
export const LOCALE_COOKIE_NAME = "NEXT_LOCALE"

export function normalizeLocale(value?: string | null): Locale {
  return value && LOCALES.includes(value as Locale) ? (value as Locale) : DEFAULT_LOCALE
}

export async function getLocaleFromCookies() {
  const { cookies } = await import("next/headers")
  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(LOCALE_COOKIE_NAME)?.value
  return normalizeLocale(cookieValue)
}

export function buildLocalizedPath(pathname: string, locale: Locale = DEFAULT_LOCALE) {
  if (!pathname || pathname === "/") {
    return locale === DEFAULT_LOCALE ? "/en" : `/${locale}`
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return pathname
  }

  if (pathname.startsWith("/")) {
    return locale === DEFAULT_LOCALE ? `/en${pathname}` : `/${locale}${pathname}`
  }

  return locale === DEFAULT_LOCALE ? `/en/${pathname}` : `/${locale}/${pathname}`
}
