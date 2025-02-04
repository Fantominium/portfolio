import { Card } from "@/components/ui/card"

const technologies = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "Shadcn", "Storybook", "Styled Components", "Jotai", "React Query"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "Python", "Django", "PostgreSQL", "MongoDB", "DynamoDB", "GraphQL", "Lambda"],
  },
  {
    category: "Pipeline & CI/CD",
    skills: ["Docker", "Github Actions", "TeamCity", "Jenkins", "CodeDeploy", "CodePipeline", "CodeBuild", "CodeCommit"],
  },
  {
    category: "Tools & Methods",
    skills: ["VS Code", "Postman", "Figma", "Jest", "GitHub", "Agile", "Adobe Experience Manager"],
  },
]

export default function TechStack() {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
      {technologies.map((tech) => (
        <Card key={tech.category} className="p-4 sm:p-6">
          <h3 className="text-lg font-semibold mb-3 sm:mb-4">{tech.category}</h3>
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

