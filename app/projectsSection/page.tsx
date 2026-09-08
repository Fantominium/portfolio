import { getTranslations } from "next-intl/server"
import ProjectCard from "../../components/project-card";
import { projects } from "../data/projectsData";

export default async function ProjectSection () {
    const t = await getTranslations("home.sections")
  const p = await getTranslations("home.projects")

    return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
    <div className="container max-w-[1400px] mx-auto px-4">
      <h2 className="text-3xl tracking-wide font-thin sm:text-4xl md:text-5xl lg:text-6xl mb-12 text-center">
        {t("projects")}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-8xl mx-auto">
        {projects.map((project) => (
            <ProjectCard
            key={project.titleKey}
            title={p(`${project.titleKey}.title`)}
            description={p(`${project.titleKey}.description`)}
                image={project.image ?? ''}
                tags={project.tags ?? []}
            />
        ))}
        </div>
    </div>
    </section>
)}