"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function MobileNav() {
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
        <nav className="flex flex-col space-y-4">
          <Link href="#about" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="#projects" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
            Projects
          </Link>
          <Link href="#contact" className="text-lg font-medium hover:text-primary" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

