import CurrentYear from "./CurrentYear"
import Link from "next/link"
import { buildLocalizedHref } from "@/lib/i18n/navigation"
import { DEFAULT_LOCALE } from "@/lib/i18n/locale"
import { useTranslations } from "next-intl"

export default function Footer() {
  const t = useTranslations("common.footer")

  return (
    <footer className="border-t">
      <div className="container mx-auto flex w-full shrink-0 flex-col items-center gap-2 px-4 py-6 sm:flex-row max-w-7xl">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © <CurrentYear /> Mkg Consultancy Ltd. {t("copyright")}
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href={buildLocalizedHref("/legal/termsAndConditions", DEFAULT_LOCALE)}>
            {t("terms")}
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href={buildLocalizedHref("/legal/privacyPolicy", DEFAULT_LOCALE)}>
            {t("privacy")}
          </Link>
        </nav>
      </div>
    </footer>
  )
}