import TechStack from "../../components/tech-stack"

export default function TechStackSection () {
    return (
        <section id="techStack" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container max-w-[1400px] mx-auto px-4">
            <h2 className="text-3xl tracking-wide font-thin sm:text-4xl md:text-5xl lg:text-6xl mb-12 text-center">
                Tech Stack
            </h2>
            <div className="max-w-6xl mx-auto">
                <TechStack />
            </div>
            </div>
        </section>
    )
}