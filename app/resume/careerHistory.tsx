"use client"
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useTranslations } from "next-intl"

interface CareerHistoryProps {
  title?: string;
}

export const CareerHistory = ({ title = "Career History" }: Readonly<CareerHistoryProps>) => {
  const t = useTranslations("resume.timeline")
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
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <Accordion type="single" collapsible value={openCompany ?? undefined} onValueChange={handleCompanyChange}>
        {/* Company 1 */}
        <AccordionItem value="company1">
          <AccordionTrigger>{t("freelanceTitle")}</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm sm:text-base mb-2">{t("freelancePeriod")}</p>
            <Accordion type="single" collapsible value={openProjects['company1'] ?? undefined} onValueChange={(value) => handleProjectChange('company1', value)}>
              <AccordionItem value="project1">
                <AccordionTrigger>{t("freelanceProjectTitle")}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm sm:text-base">{t("freelanceProjectBody")}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        {/* Company 2 */}
        <AccordionItem value="company2">
          <AccordionTrigger>{t("accentureTitle")}</AccordionTrigger>
          <AccordionContent>
            <h3 className="text-lg font-medium">{t("accentureRole")}</h3>
            <p className="text-sm sm:text-base mb-2">{t("accenturePeriod")}</p>
            <Accordion type="single" collapsible value={openProjects['company2'] ?? undefined} onValueChange={(value) => handleProjectChange('company2', value)}>
              <AccordionItem value="project1">
                <AccordionTrigger>{t("modTitle")}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm sm:text-base">{t("modBody")}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="project2">
                <AccordionTrigger>{t("homeOfficeTitle")}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm sm:text-base">{t("homeOfficeBody")}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        {/* Company 3 */}
        <AccordionItem value="company3">
          <AccordionTrigger>{t("nttTitle")}</AccordionTrigger>
          <AccordionContent>
            <h3 className="text-lg font-medium">{t("nttRole")}</h3>
            <p className="text-sm sm:text-base mb-2">{t("nttPeriod")}</p>
            <Accordion type="single" collapsible value={openProjects['company3'] ?? undefined} onValueChange={(value) => handleProjectChange('company3', value)}>
              <AccordionItem value="project1">
                <AccordionTrigger>{t("avonTitle")}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm sm:text-base">{t("avonBody")}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="project2">
                <AccordionTrigger>{t("accaTitle")}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm sm:text-base">{t("accaBody")}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>

        {/* Company 4 */}
        <AccordionItem value="company4">
          <AccordionTrigger>{t("movementTitle")}</AccordionTrigger>
          <AccordionContent>
            <h3 className="text-lg font-medium">{t("movementRole")}</h3>
            <p className="text-sm sm:text-base mb-2">{t("movementPeriod")}</p>
            <Accordion type="single" collapsible value={openProjects['company4'] ?? undefined} onValueChange={(value) => handleProjectChange('company4', value)}>
              <AccordionItem value="project1">
                <AccordionTrigger>{t("cokeTitle")}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm sm:text-base">{t("cokeBody")}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="project2">
                <AccordionTrigger>{t("clarinsTitle")}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm sm:text-base">{t("clarinsBody")}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="project3">
                <AccordionTrigger>{t("ihgTitle")}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm sm:text-base">{t("ihgBody")}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
