import type { Metadata } from "next"

import ConsultancyContactSection from "./contact-section"
import { consultancyHeaderData } from "../data/consultancyHeaderData"
import ProjectSection from "../projectsSection/page"
import TechStackSection from "../techStackSection/page"
import ConsultancyAbout from "@/components/consultancy-about"
import Footer from "@/components/footer"
import Header from "@/components/header"
import BackgroundPaths from "@/components/kokonutui/background-paths"

export const metadata: Metadata = {
  title: "Consultancy | Mkg Consultancy",
  description: "Consultancy-focused portfolio page outlining background, approach, and project delivery experience.",
}

export default function ConsultancyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-8 px-4">
      <Header headerLinks={consultancyHeaderData.headerLinks} brandName="Mkg Consultancy" brandHref="/consultancy" />
      <main className="flex flex-col items-center">
        <BackgroundPaths />
        <ConsultancyAbout />
        <ProjectSection />
        <TechStackSection />
        <ConsultancyContactSection />
        <Footer />
      </main>
    </div>
  )
}
