import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export default function AboutSection () {
    return (
        <section id="about" className="w-full py-8 md:py-12 lg:py-24 xl:py-32">
          <div className="container max-w-[1400px] mx-auto px-4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                  Full Stack Developer
                </h1>
                <p className="mx-auto max-w-[800px] text-base text-gray-500 md:text-xl lg:text-2xl dark:text-gray-400">
                  Building digital experiences with modern technologies. Focused on creating elegant solutions to
                  complex problems, in an accessible way.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link href="https://github.com/Fantominium/" target="_blank">
                  <Button variant="outline" size="icon" className="h-12 w-12">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/malcolm-garner-12a20065/" target="_blank">
                  <Button variant="outline" size="icon" className="h-12 w-12">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button variant="outline" size="icon" className="h-12 w-12">
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
    );
}