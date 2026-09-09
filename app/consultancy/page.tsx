import type { Metadata } from "next"
import { getLocale } from "next-intl/server"

import ContactSection from "@/components/contact-section"
import { consultancyHeaderData } from "../data/consultancyHeaderData"
import ProjectSection from "../projectsSection/page"
import TechStackSection from "../techStackSection/page"
import ConsultancyAbout from "@/components/consultancy-about"
import Footer from "@/components/footer"
import Header from "@/components/header"
import BackgroundPaths from "@/components/kokonutui/background-paths"
import { buildLocalizedMetadata } from "@/lib/i18n/metadata"
import { type Locale } from "@/lib/i18n/locale"

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale

  return buildLocalizedMetadata({
    locale,
    namespace: "metadata.consultancy",
    canonicalPath: "/consultancy",
  })
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
        <ContactSection showEmploymentType={false} />
        <Footer />
      </main>
    </div>
  )
}
