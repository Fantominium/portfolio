import ContactSection from "./contactSection/page"
import TechStackSection from "./techStackSection/page"
import ProjectSection  from "./projectsSection/page"
import AboutSection from "./aboutSection/page"
import Header from "../components/header"
import { headerData } from "./data/headerData"
import Footer from "../components/footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-8 px-4">
      <Header headerLinks={headerData.headerLinks} />
      <main className="flex flex-col items-center">
        <AboutSection />
        <ProjectSection />
        <TechStackSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  )
}

