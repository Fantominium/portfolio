import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ConsultancyAbout() {
  return (
    <section id="about" className="w-full py-8 md:py-12 lg:py-24 xl:py-32">
      <div className="container max-w-[1400px] mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-4 max-w-5xl mx-auto">
            <h1 className="text-4xl tracking-wide sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin">
              Full Stack Developer
            </h1>
            <div className="mx-auto max-w-[900px] space-y-4 text-base text-gray-500 md:text-xl lg:text-2xl dark:text-gray-400">
              <p>
                My story starts long before my first professional role. I grew up with a strong sense of curiosity and
                a practical mindset, always interested in how things worked and how they could be improved.
              </p>
              <p>
                My upbringing taught me resilience, accountability, and the value of doing things properly. Those
                values shaped a people-first approach that still guides how I listen, communicate, and deliver.
              </p>
              <p>
                Through consultancy, I combine hands-on engineering depth with strategic thinking to build products
                that are reliable, maintainable, and useful from day one.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="https://github.com/Fantominium/" target="_blank">
              <Button variant="outline" size="icon" className="h-12 w-12">
                <span className="text-xs font-semibold leading-none">GH</span>
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/malcolm-garner-12a20065/" target="_blank">
              <Button variant="outline" size="icon" className="h-12 w-12">
                <span className="text-sm font-semibold leading-none">in</span>
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href="#contact">
              <Button variant="outline" size="icon" className="h-12 w-12">
                <span className="text-xs font-semibold leading-none">@</span>
                <span className="sr-only">Email</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
