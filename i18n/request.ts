import { DEFAULT_LOCALE, LOCALES, normalizeLocale, type Locale } from "@/lib/i18n/locale"
import { getRequestConfig } from "next-intl/server"

const messageLoaders: Record<Locale, () => Promise<{ default: Record<string, unknown> }>> = {
  en: () => import("../messages/en.json"),
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = normalizeLocale(await requestLocale)
  const locale = LOCALES.includes(requestedLocale) ? requestedLocale : DEFAULT_LOCALE

  return {
    locale,
    messages: (await messageLoaders[locale]()).default,
  }
})