"use client"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { HeaderLinkList } from "../app/data/headerData"
import { buildLocalizedHref } from "@/lib/i18n/navigation"
import { DEFAULT_LOCALE } from "@/lib/i18n/locale"

interface MobileNavProps extends HeaderLinkList {
  brandName?: string;
  brandHref?: string;
}

export default function MobileNav({ headerLinks = [], brandName = "Malcolm Garner", brandHref = "/" }: Readonly<MobileNavProps>) {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <Link className="mb-6 flex items-center space-x-2 font-bold" href={buildLocalizedHref(brandHref, DEFAULT_LOCALE)} onClick={() => setOpen(false)}>
          {brandName}
        </Link>
        <nav className="flex flex-col space-y-4">
          {headerLinks?.map((link) => (
            <Link
              key={link.href}
              href={buildLocalizedHref(link.href, DEFAULT_LOCALE)}
              className="text-lg font-medium hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {link.content}
            </Link>
          ))}
        </nav>
        <div className="mt-6 rounded-md border p-3 text-sm text-muted-foreground" aria-label="English is currently the only supported language">
          English is currently the only supported language.
        </div>
      </SheetContent>
    </Sheet>
  )
}

