"use client"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { HeaderLinkList } from "../app/data/headerData"

export default function MobileNav({headerLinks = []}: Readonly<HeaderLinkList>) {
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
        <span className="mb-6 flex items-center space-x-2 font-bold">Malcolm Garner</span>
        <nav className="flex flex-col space-y-4">
          {
            headerLinks ?
            headerLinks.map(
                (link) => 
                    <Link 
                        key= {link.href} 
                        href={link.href} 
                        className="text-lg font-medium hover:text-primary" 
                        onClick={() => setOpen(false)}
                        >
                        {link.content}
                    </Link>) : null
                }
        </nav>
      </SheetContent>
    </Sheet>
  )
}

