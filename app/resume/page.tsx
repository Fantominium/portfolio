import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Download, ArrowLeft } from "lucide-react"
import { Suspense } from "react"
import Link from "next/link"

export const metadata = {
  title: "Mkg Consultancy/Resume",
  description: "Resume",
}

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-8 px-4 relative">
      
      {/* Sticky Back Button */}
      <Button
        asChild
        variant="outline"
        size="lg"
        className="fixed top-4 left-4 z-50 flex items-center gap-2"
      >
        <Link href="/" aria-label="Back to Home">
          Back
        </Link>
      </Button>

      <h1 className="text-4xl font-bold mb-6">Resume</h1>
      
      <div className="mb-6">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="flex items-center gap-2"
        >
          <a href="/resume.pdf" download aria-label="Download Resume">
            <Download className="h-5 w-5 inline" />
            Download Resume
          </a>
        </Button>
      </div>

      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <ResumeContent />
      </Suspense>
    </div>
  )
}

function ResumeContent() {
  return (
    <div className="max-w-3xl w-full space-y-6">
      
      {/* Summary Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Summary</h2>
        <p className="text-sm sm:text-base">
          Experienced Full Stack Developer with a passion for building scalable web applications and working across the full stack. Adept at collaborating with cross-functional teams to deliver high-quality software solutions.
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
                <li>AWS (S3, EC2, Lambda)</li>
                <li>Azure</li>
                <li>Google Cloud Platform</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          {/* Programming Skills */}
          <AccordionItem value="programming">
            <AccordionTrigger>Programming</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-1">
                <li>JavaScript & TypeScript</li>
                <li>React & Next.js</li>
                <li>Node.js & Express</li>
                <li>Python & Django</li>
                <li>GraphQL</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Education Skills */}
          <AccordionItem value="education">
            <AccordionTrigger>Education</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Bachelor of Science in Computer Science, University XYZ</li>
                <li>Certified AWS Solutions Architect</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </Card>

      {/* Career History Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Career History</h2>
        <Accordion type="single" collapsible>
          
          {/* Company 1 */}
          <AccordionItem value="company1">
            <AccordionTrigger>Company A</AccordionTrigger>
            <AccordionContent>
              <h3 className="text-lg font-medium">Senior Full Stack Developer</h3>
              <p className="text-sm sm:text-base mb-2">January 2020 - Present</p>
              <p className="text-sm sm:text-base">
                Lead the development of web applications using React and Node.js, collaborated with UX designers to create seamless user experiences, and implemented scalable backend systems with AWS.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          {/* Company 2 */}
          <AccordionItem value="company2">
            <AccordionTrigger>Company B</AccordionTrigger>
            <AccordionContent>
              <h3 className="text-lg font-medium">Full Stack Developer</h3>
              <p className="text-sm sm:text-base mb-2">June 2017 - December 2019</p>
              <p className="text-sm sm:text-base">
                Developed and maintained e-commerce platforms using Django and React, optimized database performance with PostgreSQL, and integrated third-party APIs to enhance functionality.
              </p>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </Card>

    </div>
  )
}
