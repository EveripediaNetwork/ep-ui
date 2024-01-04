import { NextRequest, NextResponse } from 'next/server'
import { languageData } from './data/LanguageData'

export function middleware(req: NextRequest) {
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true'

  // Check for maintenance mode first
  if (
    isMaintenanceMode &&
    req.nextUrl.pathname !== '/maintenance' &&
    !req.nextUrl.pathname.includes('.')
  ) {
    const url = req.nextUrl.clone()
    url.pathname = '/maintenance'
    return NextResponse.redirect(url.toString(), { status: 302 })
  }

  const userLocale = req.headers
    .get('accept-language')
    ?.split(',')[0]
    .split('-')[0]

  const hasLanguagePart = languageData.some((lang) =>
    req.nextUrl.pathname.startsWith(`/${lang.locale}`),
  )

  if (!hasLanguagePart) {
    const isLocaleSupported = languageData.some(
      (lang) => lang.locale === userLocale,
    )

    if (!isLocaleSupported) {
      const defaultLocale =
        languageData.find((lang) => lang.default)?.locale ?? 'en'
      const url = req.nextUrl.clone()
      url.pathname = `/${defaultLocale}${req.nextUrl.pathname}`
      return NextResponse.redirect(url.toString(), { status: 302 })
    }
  }

  return NextResponse.next()
}
