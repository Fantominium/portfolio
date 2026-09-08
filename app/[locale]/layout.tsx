import { LOCALES, type Locale } from "@/lib/i18n/locale"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import type { ReactNode } from "react"

export const dynamicParams = false

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export default function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode
  params: { locale: string }
}>) {
  if (!LOCALES.includes(params.locale as Locale)) {
    notFound()
  }

  setRequestLocale(params.locale as Locale)

  return children
}