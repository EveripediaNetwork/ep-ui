import { NextRequest, NextResponse } from 'next/server'
import { isValidLocale, revertToKr } from './utils/checkValidLocale'
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

  const preferredLanguage = req.headers
    .get('accept-language')
    ?.split(',')[0]
    .split('-')[0]

  const pathname = req.nextUrl.pathname
  const segments = pathname.split('/').filter(Boolean)
  const potentialLocale = segments[0]
  const isLocaleValid = isValidLocale(potentialLocale)

  if (!potentialLocale) {
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
  } else {
    const transformedLocale = revertToKr(preferredLanguage as string)

    const isLocaleSupported = languageData.find(
      (language) => language.locale === transformedLocale,
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
    } else {
      const updatedPathname = `/${transformedLocale}`
      const urlWithLocale = req.nextUrl.clone()
      urlWithLocale.pathname = updatedPathname

      return NextResponse.redirect(urlWithLocale.toString(), { status: 302 })
    }
  }

  return NextResponse.next()
}
