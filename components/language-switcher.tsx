"use client"

import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

interface LanguageSwitcherProps {
  className?: string
}

export default function LanguageSwitcher({ className }: Readonly<LanguageSwitcherProps>) {
  const t = useTranslations("common.languageSwitcher")

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled
      aria-disabled="true"
      aria-label={t("disabledLabel")}
      title={t("disabledLabel")}
      className={className}
    >
      <span className="sr-only">{t("label")}</span>
      <span aria-hidden="true">EN</span>
    </Button>
  )
}