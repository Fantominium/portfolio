"use client"
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Download } from "lucide-react";
import { Suspense } from "react";
import { CareerHistory } from "./careerHistory";
import Header from "../../components/header";
import { resumeHeaderData } from "../data/resumeHeaderData";
import AuthGuard from "@/components/authGuard";
import { SessionProvider } from "next-auth/react";
import { cloudSkills, arrayProgrammingSkills, arrayAccessoryTools } from "../data/resumeData";

export default function ResumePage() {
  return (
    // Optionally wrap with SessionProvider or AuthGuard if required
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-8 px-4 relative">
      <Header headerLinks={resumeHeaderData.headerLinks} />
      <h1 className="text-3xl tracking-wide font-thin sm:text-4xl md:text-5xl lg:text-6xl mb-6 mt-6">Resume</h1>
      
      <ResumeDownloadSection />

      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <ResumeContent />
      </Suspense>
    </div>
  );
}

function ResumeDownloadSection() {

  return (
    <SessionProvider>
    <div className="mb-6">
     <AuthGuard>
      <Button
        asChild
        variant="outline"
        size="lg"
        className="flex items-center gap-2"
      >
        <a href="/mkg_resume.pdf" download aria-label="Download Resume">
          <Download className="h-5 w-5 inline" />
          Download Resume
        </a>
      </Button>
      </AuthGuard>
    </div>
    </SessionProvider>
  );
}

function ResumeContent() {
  return (
    <div className="max-w-3xl w-full space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Summary</h2>
        <p className="text-sm sm:text-base">
          I’m a dynamic Senior Software Application Developer with over 10 years of extensive experience in
          front-end and back-end technologies across multiple cloud environments. With a proven ability to lead
          development projects from inception to deployment, that enhances user experience and operational
          efficiency across multiple languages. I have deployed a portfolio of solutions for multinational corporations,
          across different industries including professional services, fintech, FMCG and telecoms. I always manage to
          establish a strong relationship with a wide range of internal and global stakeholders as well as third party
          suppliers. I also leverage my technical experience and knowledge of multiple design patterns and
          frameworks, to bridge the gap between Developer, Designer, and Product Owner.
        </p>
      </Card>

      {/* Skills Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <Accordion type="multiple">
          
          {/* Cloud Skills */}
          <AccordionItem value="cloud">
            <AccordionTrigger>Cloud</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-1">
                {cloudSkills.map((cloudSkill) => (
                  <li key={cloudSkill}>{cloudSkill}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          {/* Programming Skills */}
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
          
          {/* Accessories and tools */}
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

          {/* Education Skills */}
          <AccordionItem value="education">
            <AccordionTrigger>Education</AccordionTrigger>
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

      <CareerHistory />

    </div>
  );
}
