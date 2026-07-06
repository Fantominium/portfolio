"use client"

import { Suspense } from "react"
import { Download } from "lucide-react"
import { SessionProvider } from "next-auth/react"

import { CareerHistory } from "../../resume/careerHistory"
import { arrayAccessoryTools, arrayProgrammingSkills, awsSkillGroups, azureSkillGroups } from "../../data/resumeData"
import { consultancyServicesHeaderData } from "../../data/consultancyServicesHeaderData"
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

export default function ConsultancyServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-8 px-4 relative">
      <Header headerLinks={consultancyServicesHeaderData.headerLinks} brandName="Mkg Consultancy" />
      <h1 className="text-3xl tracking-wide font-thin sm:text-4xl md:text-5xl lg:text-6xl mb-6 mt-6">Services</h1>

      <ServicesDownloadSection />

      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <ServicesContent />
      </Suspense>
    </div>
  )
}

function ServicesDownloadSection() {
  return (
    <SessionProvider>
      <div className="mb-6">
        <Button asChild variant="outline" size="lg" className="flex items-center gap-2">
          <a href="/mkg_resume.pdf" download aria-label="Download Resume">
            <Download className="h-5 w-5 inline" />
            Download Resume
          </a>
        </Button>
      </div>
    </SessionProvider>
  )
}

function ServicesContent() {
  return (
    <div className="max-w-3xl w-full space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Summary</h2>
        <p className="text-sm sm:text-base">
          I’m a dynamic Senior Software Application Developer with over 10 years of extensive experience in Full Stack
          JavaScript technologies across multiple cloud environments. With a proven ability to lead development
          projects from inception to deployment, that enhances user experience and operational efficiency across
          multiple languages. I have deployed a portfolio of solutions for multinational corporations, across different
          industries including professional services, fintech, FMCG, telecoms, and the UK public and defence sector. I
          always manage to establish a strong relationship with a wide range of internal and global stakeholders as well
          as third party suppliers. I also leverage my technical experience and knowledge of multiple design patterns and
          architectural frameworks, including agentic AI best practices and MCP server patterns, to bridge the gap
          between the Architect, Developer, Designer, and Product Owner.
        </p>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Core Competencies</h2>
        <Accordion type="multiple">
          <AccordionItem value="cloud">
            <AccordionTrigger>Cloud</AccordionTrigger>
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
            <AccordionTrigger>Programming</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-1">
                {arrayProgrammingSkills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="accessory tools">
            <AccordionTrigger>Accessories</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-1">
                {arrayAccessoryTools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="education">
            <AccordionTrigger>Education</AccordionTrigger>
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

      <CareerHistory title="Experience" />
    </div>
  )
}
