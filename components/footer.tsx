import CurrentYear from "./CurrentYear";
import Link from "next/link"
import { buildLocalizedHref } from "@/lib/i18n/navigation"
import { DEFAULT_LOCALE } from "@/lib/i18n/locale"

export default function Footer() {
    return(
        <footer className="border-t">
        <div className="container max-w-7xl mx-auto flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © <CurrentYear /> Mkg Consultancy Ltd. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href={buildLocalizedHref("/legal/termsAndConditions", DEFAULT_LOCALE)}>
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href={buildLocalizedHref("/legal/privacyPolicy", DEFAULT_LOCALE)}>
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    )
}