import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"

interface ProjectCardProps {
  readonly title: string
  readonly description: string
  readonly image: string
  readonly link?: string
  readonly tags: readonly string[]
}

export default function ProjectCard({ title, description, image, link, tags }: ProjectCardProps) {
  const t = useTranslations("common.projectCard")

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
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.54 2.87 8.39 6.84 9.75.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.38-3.37-1.38-.46-1.2-1.12-1.52-1.12-1.52-.92-.65.07-.64.07-.64 1.02.07 1.56 1.08 1.56 1.08.9 1.58 2.36 1.12 2.93.86.09-.67.35-1.12.64-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.38-2.03 1.01-2.75-.1-.26-.44-1.31.1-2.73 0 0 .84-.27 2.75 1.05A9.2 9.2 0 0 1 12 7.84c.85 0 1.71.12 2.51.35 1.91-1.32 2.75-1.05 2.75-1.05.54 1.42.2 2.47.1 2.73.63.72 1.01 1.63 1.01 2.75 0 3.94-2.33 4.81-4.56 5.07.36.32.68.96.68 1.94 0 1.4-.01 2.53-.01 2.88 0 .27.18.59.69.49A10.06 10.06 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
          </svg>
            {t("viewOnGitHub")}
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}

