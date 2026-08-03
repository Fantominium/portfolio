import { DEFAULT_LOCALE, type Locale, buildLocalizedPath } from "./locale"

export function buildLocalizedHref(pathname: string, locale: Locale = DEFAULT_LOCALE) {
  if (!pathname || pathname.startsWith("#")) {
    return pathname
  }

  return buildLocalizedPath(pathname, locale)
}
