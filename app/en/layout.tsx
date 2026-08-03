import type { ReactNode } from "react"
import RootLayout from "../layout"

export default function EnLayout({ children }: { children: ReactNode }) {
  return <RootLayout>{children}</RootLayout>
}
