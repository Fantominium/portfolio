import CurrentYear from "./CurrentYear";
import Link from "next/link"

export default function Footer() {
    return(
        <footer className="border-t">
        <div className="container max-w-7xl mx-auto flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © <CurrentYear /> Mkg Consultancy Ltd. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="/legal/termsAndConditions">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="/legal/privacyPolicy">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    )
}