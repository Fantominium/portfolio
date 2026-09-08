import { getTranslations } from "next-intl/server"
import ContactForm from "./contact-form"

interface ContactSectionProps {
  showEmploymentType?: boolean;
}

export default async function ContactSection({ showEmploymentType = true }: Readonly<ContactSectionProps>) {
    const t = await getTranslations("home.sections")

    return (
      <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container max-w-[1400px] mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl tracking-wide font-thin sm:text-4xl md:text-5xl lg:text-6xl mb-12 text-center">
              {t("contact")}
            </h2>
            <ContactForm showEmploymentType={showEmploymentType} />
          </div>
        </div>
      </section>
    )
}
