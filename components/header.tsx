"use client"
import Link from 'next/link'
import MobileNav from './mobile-nav'
import { ThemeToggle } from '@/components/theme-toggle'
import { HeaderLinkList } from '../app/data/headerData'
import { buildLocalizedHref } from '@/lib/i18n/navigation'
import { DEFAULT_LOCALE } from '@/lib/i18n/locale'
import LanguageSwitcher from './language-switcher'
import { useTranslations } from "next-intl"

interface HeaderProps extends HeaderLinkList {
  brandName?: string;
  brandHref?: string;
}

export default function Header({ headerLinks = [], brandName = "Malcolm Garner", brandHref = "/" }: Readonly<HeaderProps>) {
  const t = useTranslations("common.navigation")

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex h-14 items-center px-4">
        <MobileNav headerLinks={headerLinks ?? []} brandName={brandName} brandHref={brandHref} />
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href={buildLocalizedHref(brandHref, DEFAULT_LOCALE)}>
            <span className="font-bold">{brandName}</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {headerLinks?.map((link) => (
              <Link
                key={link.href}
                href={buildLocalizedHref(link.href, DEFAULT_LOCALE)}
                className="transition-colors hover:text-foreground/80"
              >
                  {t(link.label)}
              </Link>
            ))}
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
