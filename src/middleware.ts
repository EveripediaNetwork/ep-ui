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

  // Check user locale
  const userLocale = req.headers
    .get('accept-language')
    ?.split(',')[0]
    .split('-')[0]
  const isLocaleSupported = languageData.some(
    (lang) => lang.locale === userLocale,
  )

  // Redirect to default locale if user locale is not supported
  if (!isLocaleSupported) {
    const defaultLocale =
      languageData.find((lang) => lang.default)?.locale || 'en'
    const url = req.nextUrl.clone()
    url.pathname = `/${defaultLocale}${req.nextUrl.pathname}`
    return NextResponse.redirect(url.toString(), { status: 302 })
  }

  return NextResponse.next()
}
