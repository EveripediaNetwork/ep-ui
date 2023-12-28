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

  // Extract the locale from the URL
  const pathSegments = req.nextUrl.pathname.split('/')
  const urlLocale = pathSegments[1] // Assuming locale is the first segment after the first slash

  // Check if the URL locale is supported
  const isLocaleSupported = languageData.some(
    (lang) => lang.locale === urlLocale,
  )

  // Redirect to default locale if URL locale is not supported
  if (!isLocaleSupported) {
    const defaultLocale =
      languageData.find((lang) => lang.default)?.locale || 'en'
    const url = req.nextUrl.clone()
    // Remove the unsupported locale and prepend the default locale
    pathSegments[1] = defaultLocale
    url.pathname = pathSegments.join('/')
    return NextResponse.redirect(url.toString(), { status: 302 })
  }

  return NextResponse.next()
}
