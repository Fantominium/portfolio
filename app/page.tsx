import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"
import ContactForm from "./components/contact-form"
import ProjectCard from "./components/project-card"
import TechStack from "./components/tech-stack"
import { MobileNav } from "./components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import CurrentYear from "./components/ui/CurrentYear"

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-8 px-4">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto flex h-14 items-center px-4">
          <MobileNav />
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="font-bold">Mkg Consultancy Ltd</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="#about" className="transition-colors hover:text-foreground/80">
                About
              </Link>
              <Link href="#projects" className="transition-colors hover:text-foreground/80">
                Projects
              </Link>
              <Link href="#contact" className="transition-colors hover:text-foreground/80">
                Contact
              </Link>
            </nav>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline" className="hidden sm:inline-flex">
              <Link href="/resume">Resume</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center">
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
                <Link href="https://linkedin.comhttps://www.linkedin.com/in/malcolm-garner-12a20065/" target="_blank">
                  <Button variant="outline" size="icon" className="h-12 w-12">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="mailto:mkg.consultancy.uk@gmail.com">
                  <Button variant="outline" size="icon" className="h-12 w-12">
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container max-w-[1400px] mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-12 text-center">
              Projects
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-8xl mx-auto">
              <ProjectCard
                title="Multinational Cosmetics Firm"
                description="A greenfield onboarding web app using Typescript, React Query, Python Django, Lambdas and more."
                image="/images/cosmetic.jpg"
                tags={["Typescript", "React Query", "Python", "Django", "AWS"]}
              />
              <ProjectCard
                title="Association of Chartered Certified Accountants"
                description="A prompt examination feedback experience using Typescript, NodeJs, GraphQL, Module Federation and more."
                image="/images/accountants.jpg"
                tags={["React", "Node.js", "GraphQL", "Webpack", "Module Federation"]}
              />
              <ProjectCard
                title="Dance AI"
                description="An AI-powered internally promoted dance app that transposes professional dance moves to your own."
                image="/images/danceai.jpg"
                tags={["Python", "Flask", "OpenCV", "TensorFlow", "Nvidia CUDA", "Machine Learning"]}
              />
              <ProjectCard
                title="Out Of Home Web Experiences FMCG"
                description="The creation of various promotional experiences for brands under a ubiquitous FMCG conglomerate using Next.js, Apollo Client and Styled Components, hosted on AWS S3 & EC2."
                image="/images/coke.jpg"
                tags={["Next.js", "Apollo Client", "Styled Components", "AWS"]}
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container max-w-[1400px] mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-12 text-center">
              Tech Stack
            </h2>
            <div className="max-w-6xl mx-auto">
              <TechStack />
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container max-w-[1400px] mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-12 text-center">
                Get in Touch
              </h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

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
    </div>
  )
}

