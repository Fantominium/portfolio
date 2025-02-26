
import Link from 'next/link'
import MobileNav from '../components/mobile-nav'
import {ThemeToggle} from '@/components/theme-toggle'
import {Button} from '@/components/ui/button'
import {HeaderLinkList} from '../data/headerData'

export default function Header({headerLinks = []}: Readonly<HeaderLinkList>) {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto flex h-14 items-center px-4">
          <MobileNav headerLinks={headerLinks ?? []} />
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="font-bold">Mkg Consultancy Ltd</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
                {
                    headerLinks ?
                    headerLinks.map(
                        (link) => 
                            <Link 
                                key= {link.href} 
                                href={link.href} 
                                className="transition-colors hover:text-foreground/80"
                                >
                                {link.content}
                            </Link>) : null
                }
            </nav>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
    )
}