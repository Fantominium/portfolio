import ConsultancyServicesPage from "../../../consultancy/services/page"
import { buildLocalizedMetadata } from "@/lib/i18n/metadata"
import { type Locale } from "@/lib/i18n/locale"

export default function LocaleConsultancyServicesPage() {
  return <ConsultancyServicesPage />
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return buildLocalizedMetadata({
    locale: params.locale as Locale,
    namespace: "metadata.consultancyServices",
    canonicalPath: "/consultancy/services",
  })
}