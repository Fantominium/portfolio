"use client"
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Download } from "lucide-react";
import { Suspense } from "react";
import { CareerHistory } from "./careerHistory";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { resumeHeaderData } from "../data/resumeHeaderData";
import { SessionProvider } from "next-auth/react";
import { awsSkillGroups, azureSkillGroups, arrayProgrammingSkills, arrayAccessoryTools } from "../data/resumeData";
import { useTranslations } from "next-intl";

export default function ResumePage() {
  const t = useTranslations("resume")

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-8 px-4 relative">
      <Header headerLinks={resumeHeaderData.headerLinks} />
      <h1 className="text-3xl tracking-wide font-thin sm:text-4xl md:text-5xl lg:text-6xl mb-6 mt-6">{t("title")}</h1>
      
      <ResumeDownloadSection />

      <Suspense fallback={<div className="text-center">{t("loading")}</div>}>
        <ResumeContent />
      </Suspense>

      <Footer />
    </div>
  );
}

function ResumeDownloadSection() {
  const t = useTranslations("resume")

  return (
    <SessionProvider>
    <div className="mb-6">
     {/* <AuthGuard> */}
      <Button
        asChild
        variant="outline"
        size="lg"
        className="flex items-center gap-2"
      >
        <a href="/mkg_resume.pdf" download aria-label={t("downloadResume")}>
          <Download className="h-5 w-5 inline" />
          {t("downloadResume")}
        </a>
      </Button>
      {/* </AuthGuard> */}
    </div>
    </SessionProvider>
  );
}

function ResumeContent() {
  const t = useTranslations("resume")

  return (
    <div className="max-w-3xl w-full space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">{t("summary")}</h2>
        <p className="text-sm sm:text-base">
          {t("summaryBody")}
        </p>
      </Card>

      {/* Skills Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">{t("skills")}</h2>
        <Accordion type="multiple">
          
          {/* Cloud Skills */}
          <AccordionItem value="cloud">
            <AccordionTrigger>{t("cloud")}</AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="aws">
                  <AccordionTrigger>AWS</AccordionTrigger>
                  <AccordionContent>
                    <Accordion type="multiple">
                      {awsSkillGroups.map((group) => (
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
          
          {/* Programming Skills */}
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
          
          {/* Accessories and tools */}
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

          {/* Education Skills */}
          <AccordionItem value="education">
            <AccordionTrigger>{t("education")}</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Bachelor of Science – Computer Science (Hons) (2013), 
                  University of the West Indies</li>
                <li>Certified AWS Cloud Practitioner</li>
                <li>Certified Microsoft Azure Fundamentals</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </Card>

      <CareerHistory title={t("careerHistory")} />

    </div>
  );
}
