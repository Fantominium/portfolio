import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  readonly title: string
  readonly description: string
  readonly image: string
  readonly link?: string
  readonly tags: readonly string[]
}

export default function ProjectCard({ title, description, image, link, tags }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full group">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105 duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1400px) 33vw, 25vw"
        />
      </div>
      <CardContent className="p-4 sm:p-6 flex-grow">
        <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 sm:p-6 pt-0">
        {link && (
          <Link
            href={link}
            target="_blank"
            className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors"
        >
          <Github className="h-4 w-4" />
            View on GitHub
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}

