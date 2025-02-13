"use client"
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export const CareerHistory = () => {
  const [openCompany, setOpenCompany] = useState<string | null>(null);
  const [openProjects, setOpenProjects] = useState<{ [key: string]: string | null }>({});

  const handleCompanyChange = (company: string | null) => {
    setOpenCompany(company);
    if (company === null) {
      setOpenProjects({});
    }
  };

  const handleProjectChange = (company: string, project: string | null) => {
    setOpenProjects((prev) => ({
      ...prev,
      [company]: project,
    }));
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Career History</h2>
      <Accordion type="single" collapsible value={openCompany ?? undefined} onValueChange={handleCompanyChange}>
        
        {/* Company 1 */}
        <AccordionItem value="company1">
          <AccordionTrigger>NTT DATA UK&I</AccordionTrigger>
          <AccordionContent>
            <h3 className="text-lg font-medium">Senior Software Application Developer</h3>
            <p className="text-sm sm:text-base mb-2">Sep 2021 - June 2024</p>
            <Accordion type="single" collapsible value={openProjects['company1'] ?? undefined} onValueChange={(value) => handleProjectChange('company1', value)}>
              <AccordionItem value="project1">
                <AccordionTrigger>Project with Avon Cosmetics</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm sm:text-base">
                    Scope of work - Task breakdown of customer requirements, into actionable tickets for the
                    Python API & React Web teams to develop. Recruited additional resources, and grew the team from one
                    to eight, comprising both of backend and frontend web teams. Managed expectations, highlighted risks,
                    and kept to strict timelines through frequent communication with the Leadership Team.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="project2">
                <AccordionTrigger>Project with XYZ Corp</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm sm:text-base">
                    Led the development of a new microservices architecture, improving system scalability and performance.
                    Coordinated with cross-functional teams to ensure seamless integration and deployment.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        {/* Company 2 */}
        <AccordionItem value="company2">
          <AccordionTrigger>Company B</AccordionTrigger>
          <AccordionContent>
            <h3 className="text-lg font-medium">Full Stack Developer</h3>
            <p className="text-sm sm:text-base mb-2">June 2017 - December 2019</p>
            <Accordion type="single" collapsible value={openProjects['company2'] ?? undefined} onValueChange={(value) => handleProjectChange('company2', value)}>
              <AccordionItem value="project1">
                <AccordionTrigger>Project with ABC Corp</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm sm:text-base">
                    Developed and maintained e-commerce platforms using Django and React, optimized database performance with PostgreSQL, and integrated third-party APIs to enhance functionality.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="project2">
                <AccordionTrigger>Project with DEF Corp</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm sm:text-base">
                    Implemented a new CI/CD pipeline using Jenkins and Docker, reducing deployment times by 50%.
                    Collaborated with the QA team to automate testing processes, improving software quality.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </Card>
  );
};
