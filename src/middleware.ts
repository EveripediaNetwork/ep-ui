import { NextRequest, NextResponse } from 'next/server'
import { isValidLocale } from './utils/checkValidLocale'
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

  const pathname = req.nextUrl.pathname
  const segments = pathname.split('/').filter(Boolean)
  const potentialLocale = segments[0]

  const isLocaleValid = isValidLocale(potentialLocale)

  if (isLocaleValid) {
    const isLocaleSupported = languageData.find(
      (language) => language.locale === potentialLocale,
    )

    if (!isLocaleSupported) {
      const defaultLocale =
        languageData.find((lang) => lang.default)?.locale || 'en'

      const updatedPathname = pathname.replace(
        `/${potentialLocale}`,
        `/${defaultLocale}`,
      )

      const urlWithLocale = req.nextUrl.clone()
      urlWithLocale.pathname = updatedPathname

      return NextResponse.redirect(urlWithLocale.toString(), { status: 302 })
    }
  }

  return NextResponse.next()
}
