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
          <AccordionTrigger>Freelance Fullstack Developer</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm sm:text-base mb-2">July 2024 - Present</p>
            <Accordion type="single" collapsible value={openProjects['company1'] ?? undefined} onValueChange={(value) => handleProjectChange('company1', value)}>
              <AccordionItem value="project1">
                <AccordionTrigger>Various Freelance Projects</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm sm:text-base">
                    Scope of work included - Conducting accessibility audits and implementing fixes for small scale
                    applications, ensuring site availability for users who suffer from hard of hearing, blindness, or motor
                    disabilities. Crafting NextJs applications for greenfield projects utilising the latest in App Routing, Server
                    Side Rendering, SEO optimisations, and leveraging Backend for Frontend functionalities. Updating legacy
                    state management systems into more modern Reactive alternatives, reducing cognitive complexity and
                    simplifying application data flow. Implementing and updating website hosting, while leveraging Content
                    Delivery Networks optimising Largest Contentful Paint through caching. Utilising headless CMS solutions
                    such as Strapi and AEM (Adobe Experience Manager). Consulting on and aiding in the implementation of
                    architectural decisions around the Micro-Front-Ends, specifically with Webpack Module Federation.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        {/* Company 2 */}
        <AccordionItem value="company2">
          <AccordionTrigger>NTT DATA UK&I</AccordionTrigger>
          <AccordionContent>
            <h3 className="text-lg font-medium">Senior Software Application Developer</h3>
            <p className="text-sm sm:text-base mb-2">Sep 2021 - June 2024</p>
            <Accordion type="single" collapsible value={openProjects['company2'] ?? undefined} onValueChange={(value) => handleProjectChange('company2', value)}>
              <AccordionItem value="project1">
                <AccordionTrigger>Project with Avon Cosmetics</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm sm:text-base">
                    Scope of work included - Task breakdown of customer requirements, into actionable tickets for the
                    Python API & React Web teams to develop. Recruited additional resources, and grew the team from one
                    to eight, comprising both of backend and frontend web teams. Managed expectations, highlighted risks,
                    and kept to strict timelines through frequent communication with the Leadership Team.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="project2">
                <AccordionTrigger>Project with ACCA</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm sm:text-base">
                    Scope of work included - Lead the Web development team to deliver the Personalized Exam
                    Feedback product. Broke down the initial scope of work, through frequent meetings with key stakeholders
                    and my team. Verified that client needs were understood, agreed upon and actioned by both designers
                    and developers. Ensured that the creation of UI designs accounted for and was within WCAG guidelines,
                    enabling the accessibility and usability of the application by persons with disabilities.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        {/* Company 3 */}
        <AccordionItem value="company3">
          <AccordionTrigger>Movement Digital</AccordionTrigger>
          <AccordionContent>
            <h3 className="text-lg font-medium">Full Stack Developer</h3>
            <p className="text-sm sm:text-base mb-2">March 2018 - August 2021</p>
            <Accordion type="single" collapsible value={openProjects['company3'] ?? undefined} onValueChange={(value) => handleProjectChange('company3', value)}>
              <AccordionItem value="project1">
                <AccordionTrigger>Project with The Coca-Cola Company</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm sm:text-base">
                    Scope of work included - 
                    Responsible for the development of a B2B menu generator tool 
                    for a multinational rollout. Worked closely with the client to understand their needs and
                    provided technical solutions to meet their requirements. Coordinated with cross-functional teams
                    to ensure seamless integration and delivery of the tool across different regions. The project
                    resulted in a significant increase in operational efficiency and customer satisfaction for the
                    company.
                    Developed experiential digital marketing content prototypes, using AI and AR 
                    technologies to create immersive and interactive user experiences. 
                    Collaborated with designers and engineers to integrate cutting-edge technologies into marketing campaigns, 
                    resulting in increased engagement and brand awareness.
                   </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="project2">
                <AccordionTrigger>Project with Clarins</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm sm:text-base">
                    Scope of work included - Enhanced application reliability by 
                    leading the integration and testing 
                    of bug fixes, achieving {'>'} 90%
                    code test coverage, for thier in-store customer profile and product
                    recommendation tool used across the UK. </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="project3">
                <AccordionTrigger>Project with IHG Group</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm sm:text-base">
                    Scope of work included - Optimized the booking confirmation process for an international hotel group,
                    Managed the cloud infrastructure, as well as being responsible for 
                    adding web features and content to the company website.
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
