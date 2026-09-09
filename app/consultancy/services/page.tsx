import { Suspense } from "react"
import { Download } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { CareerHistory } from "../../resume/careerHistory"
import { arrayAccessoryTools, arrayProgrammingSkills, awsSkillGroups, azureSkillGroups } from "../../data/resumeData"
import { consultancyServicesHeaderData } from "../../data/consultancyServicesHeaderData"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const consultancyAwsSkillGroups = awsSkillGroups.map((group) => {
  if (group.category !== "Security") {
    return group
  }

  return {
    ...group,
    skills: [...group.skills, "Amazon GuardDuty", "AWS Security Hub"],
  }
})

export default async function ConsultancyServicesPage() {
  const t = await getTranslations("consultancy.services")

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-8 px-4 relative">
      <Header headerLinks={consultancyServicesHeaderData.headerLinks} brandName="Mkg Consultancy" brandHref="/consultancy" />
      <h1 className="text-3xl tracking-wide font-thin sm:text-4xl md:text-5xl lg:text-6xl mb-6 mt-6">{t("title")}</h1>

      <ServicesDownloadSection />

      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <ServicesContent />
      </Suspense>

      <Footer />
    </div>
  )
}

async function ServicesDownloadSection() {
  const t = await getTranslations("consultancy.services")

  return (
    <div className="mb-6">
      <Button asChild variant="outline" size="lg" className="flex items-center gap-2">
        <a href="/mkg_resume.pdf" download aria-label={t("downloadResume")}>
          <Download className="h-5 w-5 inline" />
          {t("downloadResume")}
        </a>
      </Button>
    </div>
  )
}

async function ServicesContent() {
  const t = await getTranslations("consultancy.services")

  return (
    <div className="max-w-3xl w-full space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">{t("summaryHeading")}</h2>
        <p className="text-sm sm:text-base">{t("summary")}</p>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">{t("coreCompetencies")}</h2>
        <Accordion type="multiple">
          <AccordionItem value="cloud">
            <AccordionTrigger>{t("cloud")}</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="aws">
                  <AccordionTrigger>AWS</AccordionTrigger>
                  <AccordionContent>
                    <Accordion type="multiple">
                      {consultancyAwsSkillGroups.map((group) => (
                        <AccordionItem key={group.category} value={`aws-${group.category.toLowerCase()}`}>
                          <AccordionTrigger>{group.category}</AccordionTrigger>
                          <AccordionContent>
                            <ul className="list-disc list-inside space-y-1">
                              {group.skills.map((skill) => (
                                <li key={skill}>{skill}</li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="azure">
                  <AccordionTrigger>Azure</AccordionTrigger>
                  <AccordionContent>
                    <Accordion type="multiple">
                      {azureSkillGroups.map((group) => (
                        <AccordionItem key={group.category} value={`azure-${group.category.toLowerCase()}`}>
                          <AccordionTrigger>{group.category}</AccordionTrigger>
                          <AccordionContent>
                            <ul className="list-disc list-inside space-y-1">
                              {group.skills.map((skill) => (
                                <li key={skill}>{skill}</li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="programming">
            <AccordionTrigger>{t("programming")}</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-1">
                {arrayProgrammingSkills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="accessory tools">
            <AccordionTrigger>{t("accessories")}</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-1">
                {arrayAccessoryTools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="education">
            <AccordionTrigger>{t("education")}</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Bachelor of Science – Computer Science (Hons) (2013), University of the West Indies</li>
                <li>Certified AWS Cloud Practitioner</li>
                <li>Certified Microsoft Azure Fundamentals</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>

      <CareerHistory title={t("experience")} />
    </div>
  )
}

export async function generateMetadata() {
  const t = await getTranslations("metadata.consultancyServices")

  return {
    title: t("title"),
    description: t("description"),
  }
}
