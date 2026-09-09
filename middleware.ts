import { NextRequest, NextResponse } from "next/server"
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, normalizeLocale } from "@/lib/i18n/locale"

const PUBLIC_PREFIXES = ["/en", "/api", "/_next", "/images", "/favicon.ico"]

export function middleware(request: NextRequest) {
  const { pathname, search, hash } = request.nextUrl

  if (PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    const response = NextResponse.next()
    response.cookies.set(LOCALE_COOKIE_NAME, DEFAULT_LOCALE, { path: "/" })
    return response
  }

  if (pathname === "/") {
    const url = request.nextUrl.clone()
    url.pathname = "/en"
    url.search = search
    url.hash = hash
    const response = NextResponse.redirect(url)
    response.cookies.set(LOCALE_COOKIE_NAME, DEFAULT_LOCALE, { path: "/" })
    return response
  }

  const locale = normalizeLocale(pathname.split("/")[1])
  const response = NextResponse.next()
  response.cookies.set(LOCALE_COOKIE_NAME, locale, { path: "/" })

  if (pathname === "/en") {
    return response
  }

  if (!pathname.startsWith(`/${locale}`) && !pathname.startsWith("/api")) {
    const url = request.nextUrl.clone()
    url.pathname = `/en${pathname}`
    url.search = search
    url.hash = hash
    const redirectResponse = NextResponse.redirect(url)
    redirectResponse.cookies.set(LOCALE_COOKIE_NAME, DEFAULT_LOCALE, { path: "/" })
    return redirectResponse
  }

  return response
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico).*)"],
}
