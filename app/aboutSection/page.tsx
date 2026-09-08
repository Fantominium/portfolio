import { getTranslations } from "next-intl/server"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Link from "next/link"

export default async function AboutSection () {
    const t = await getTranslations("home.hero")

    return (
        <section id="about" className="w-full py-8 md:py-12 lg:py-24 xl:py-32">
          <div className="container max-w-[1400px] mx-auto px-4">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-5xl mx-auto">
                <h1 className="text-4xl tracking-wide sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin">
                  {t("title")}
                </h1>
                <p className="mx-auto max-w-[800px] text-base text-gray-500 md:text-xl lg:text-2xl dark:text-gray-400">
                  {t("description")}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link href="https://github.com/Fantominium/" target="_blank">
                  <Button variant="outline" size="icon" className="h-12 w-12">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.54 2.87 8.39 6.84 9.75.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.38-3.37-1.38-.46-1.2-1.12-1.52-1.12-1.52-.92-.65.07-.64.07-.64 1.02.07 1.56 1.08 1.56 1.08.9 1.58 2.36 1.12 2.93.86.09-.67.35-1.12.64-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.38-2.03 1.01-2.75-.1-.26-.44-1.31.1-2.73 0 0 .84-.27 2.75 1.05A9.2 9.2 0 0 1 12 7.84c.85 0 1.71.12 2.51.35 1.91-1.32 2.75-1.05 2.75-1.05.54 1.42.2 2.47.1 2.73.63.72 1.01 1.63 1.01 2.75 0 3.94-2.33 4.81-4.56 5.07.36.32.68.96.68 1.94 0 1.4-.01 2.53-.01 2.88 0 .27.18.59.69.49A10.06 10.06 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
                    </svg>
                    <span className="sr-only">{t("githubLabel")}</span>
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/malcolm-garner-12a20065/" target="_blank">
                  <Button variant="outline" size="icon" className="h-12 w-12">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="currentColor">
                      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.3 23.5h4.4V7.98H.3V23.5ZM8.24 7.98h4.22v2.12h.06c.59-1.12 2.04-2.3 4.2-2.3 4.49 0 5.32 2.96 5.32 6.82v8.88h-4.4v-7.88c0-1.88-.03-4.29-2.6-4.29-2.6 0-2.99 2.03-2.99 4.14v8.03h-4.4V7.98Z" />
                    </svg>
                    <span className="sr-only">{t("linkedinLabel")}</span>
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button variant="outline" size="icon" className="h-12 w-12">
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">{t("emailLabel")}</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
    );
}