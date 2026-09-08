import { NextIntlClientProvider } from "next-intl"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { getLocale, getMessages } from "next-intl/server"
import "./globals.css"
import type React from "react"
import { DEFAULT_LOCALE } from "@/lib/i18n/locale"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Malcolm Garner - Full Stack Developer",
  description: "Full stack developer portfolio showcasing some of my projects and skills",
  alternates: {
    canonical: "/en",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale ?? DEFAULT_LOCALE} suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <NextIntlClientProvider locale={locale ?? DEFAULT_LOCALE} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

