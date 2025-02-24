import ProjectCard from "../../project-card"
const projects = [{ 
    title: "Multinational Cosmetics Firm", 
    description: "A greenfield onboarding web app using Typescript, React Query, Python Django, Lambdas and more.", 
    image: "/images/cosmetic.jpg", 
    tags: ["Typescript", "React Query", "Python", "Django", "AWS"] 
}, 
{
    title: "Association of Chartered Certified Accountants",
    description: "A prompt examination feedback experience using Typescript, NodeJs, GraphQL, Module Federation and more.",
    image: "/images/accountants.jpg",
    tags: ["React", "Node.js", "GraphQL", "Webpack", "Module Federation"]
},
{
    title: "Dance AI",
    description: "An AI-powered internally promoted dance app that transposes professional dance moves to your own.",
    image: "/images/danceai.jpg",
    tags: ["Python", "Flask", "OpenCV", "TensorFlow", "Nvidia CUDA", "Machine Learning"]
},
{
    title: "Out Of Home Web Experiences FMCG",
    description: "The creation of various promotional experiences for brands under a ubiquitous FMCG conglomerate using Next.js, Apollo Client and Styled Components, hosted on AWS S3 & EC2.",
    image: "/images/coke.jpg",
    tags: ["Next.js", "Apollo Client", "Styled Components", "AWS"]
}]
export const ProjectSection = () => {

    return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
    <div className="container max-w-[1400px] mx-auto px-4">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-12 text-center">
        Projects
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-8xl mx-auto">
        {projects.map((project) => (
            <ProjectCard
                key={project.title}
                title={project.title ?? ''}
                description={project.description ?? ''}
                image={project.image ?? ''}
                tags={project.tags ?? []}
            />
        ))}
        </div>
    </div>
    </section>
)}