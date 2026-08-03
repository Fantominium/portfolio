export const legalContentConfig = {
  locale2Ready: true,
  currentLocale: "en",
  deferredLocales: ["fr", "de"],
  status: "deferred-to-locale-2",
} as const

export function getLegalContentStatus() {
  return legalContentConfig.status
}
