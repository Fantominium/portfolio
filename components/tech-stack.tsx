import { Card } from "@/components/ui/card"
import { getTranslations } from "next-intl/server"

const technologies = [
  {
    categoryKey: "frontend",
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "Shadcn", "Storybook", "Styled Components", "Jotai", "React Query"],
  },
  {
    categoryKey: "backend",
    skills: ["Node.js", "Express", "Python", "Django", "PostgreSQL", "MongoDB", "DynamoDB", "GraphQL", "Lambda"],
  },
  {
    categoryKey: "pipeline",
    skills: ["Docker", "Github Actions", "TeamCity", "Jenkins", "CodeDeploy", "CodePipeline", "CodeBuild", "CodeCommit"],
  },
  {
    categoryKey: "tools",
    skills: ["VS Code", "Postman", "Figma", "Jest", "GitHub", "Agile", "Adobe Experience Manager", "Spec Driven Development", "Tool Orchestration MCP Pattern", "Stateful Session Server MCP Pattern"],
  },
]

export default async function TechStack() {
  const t = await getTranslations("home.techStack")

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
      {technologies.map((tech) => (
        <Card key={tech.categoryKey} className="p-4 sm:p-6">
          <h3 className="text-lg font-semibold mb-3 sm:mb-4">{t(tech.categoryKey)}</h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {tech.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs sm:text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 hover:bg-primary/20 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}

