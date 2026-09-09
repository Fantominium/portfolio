import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { buildLocalizedHref } from "@/lib/i18n/navigation"
import { type Locale } from "@/lib/i18n/locale"
import { getLocale, getTranslations } from "next-intl/server"

export default async function TermsAndConditions() {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations("legal.termsAndConditions")

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-background px-4 py-8 text-foreground">
      <Button
        asChild
        variant="outline"
        size="lg"
        className="fixed top-4 left-4 z-50 flex items-center gap-2"
      >
        <Link href={buildLocalizedHref("/", locale)} aria-label={t("backToHome")}> 
          {t("back")}
        </Link>
      </Button>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <h1 className="mb-6 text-4xl font-bold">{t("title")}</h1>

      <Card className="p-6 max-w-3xl w-full space-y-6">
        <h2 className="mb-4 text-2xl font-semibold">{t("heading")}</h2>
        <p className="text-sm sm:text-base">
          {t("intro")}
        </p>

        <h3 className="text-lg font-medium">{t("acceptance.heading")}</h3>
        <p className="text-sm sm:text-base">
          {t("acceptance.body")}
        </p>

        <h3 className="text-lg font-medium">{t("changes.heading")}</h3>
        <p className="text-sm sm:text-base">
          {t("changes.body")}
        </p>

        <h3 className="text-lg font-medium">{t("useOfServices.heading")}</h3>
        <p className="text-sm sm:text-base">
          {t("useOfServices.body")}
        </p>

        <h3 className="text-lg font-medium">{t("intellectualProperty.heading")}</h3>
        <p className="text-sm sm:text-base">
          {t("intellectualProperty.body")}
        </p>

        <h3 className="text-lg font-medium">{t("limitationOfLiability.heading")}</h3>
        <p className="text-sm sm:text-base">
          {t("limitationOfLiability.body")}
        </p>

        <h3 className="text-lg font-medium">{t("governingLaw.heading")}</h3>
        <p className="text-sm sm:text-base">
          {t("governingLaw.body")}
        </p>

        <h3 className="text-lg font-medium">{t("contact.heading")}</h3>
        <p className="text-sm sm:text-base">
          {t("contact.body")}
        </p>
      </Card>
    </div>
  )
}