import { DEFAULT_LOCALE, type Locale, buildLocalizedPath } from "./locale"

export const legalContentConfig = {
  locale2Ready: true,
  currentLocale: DEFAULT_LOCALE,
  deferredLocales: ["fr", "de"],
  status: "deferred-to-locale-2",
} as const

export const LEGAL_PAGES = {
  privacyPolicy: {
    slug: "privacyPolicy",
    messageNamespace: "legal.privacyPolicy",
  },
  termsAndConditions: {
    slug: "termsAndConditions",
    messageNamespace: "legal.termsAndConditions",
  },
} as const

export type LegalPageKey = keyof typeof LEGAL_PAGES

export function buildLegalPath(page: LegalPageKey, locale: Locale = DEFAULT_LOCALE) {
  return buildLocalizedPath(`/legal/${LEGAL_PAGES[page].slug}`, locale)
}

export function getLegalContentStatus() {
  return legalContentConfig.status
}
