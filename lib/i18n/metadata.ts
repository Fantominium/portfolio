import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { buildLocalizedPath, type Locale } from "./locale"

export async function buildLocalizedMetadata({
  locale,
  namespace,
  canonicalPath,
}: Readonly<{
  locale: Locale
  namespace: string
  canonicalPath: string
}>): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace })

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: buildLocalizedPath(canonicalPath, locale),
    },
  }
}