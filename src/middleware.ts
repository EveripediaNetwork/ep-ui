import { NextRequest, NextResponse } from 'next/server'
import { isValidLocale, revertToKr, revertToKo } from './utils/checkValidLocale'
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

  if (
    req.nextUrl.pathname.startsWith('/api/') ||
    req.nextUrl.pathname.startsWith('/_next/') ||
    req.nextUrl.pathname.startsWith('/images/') ||
    req.nextUrl.pathname.endsWith('.json')
  ) {
    return NextResponse.next()
  }

  const preferredLocale = req.headers
    .get('accept-language')
    ?.split(',')[0]
    .split('-')[0] as string

  const localeRegex = /\/(\w{2})\/|\/(\w{2})$/
  const match = req.nextUrl.href.match(localeRegex)
  console.log('match: ', match)
  const potentialLocale = match ? match[1] ?? match[2] : undefined
  console.log('Potential locale: ', potentialLocale)
  const currentLocale = req.nextUrl.locale
  console.log('Locale: ', currentLocale)

  if (
    !isValidLocale(revertToKo(potentialLocale ?? '')) &&
    currentLocale !== preferredLocale
  ) {
    const updatedPathname =
      `/${revertToKr(preferredLocale)}` + req.nextUrl.pathname
    const newUrl = req.nextUrl.clone()

    newUrl.pathname = updatedPathname
    console.log('New url: ', newUrl)
    return NextResponse.redirect(newUrl.toString(), { status: 302 })
  } else {
    const isLocaleSupported = languageData.find(
      (language) => language.locale === potentialLocale,
    )

    if (!isLocaleSupported) {
      const defaultLocalePathname = req.nextUrl.pathname.replace(
        potentialLocale ?? '',
        '',
      )
      const urlWithDefaultLocale = req.nextUrl.clone()

      urlWithDefaultLocale.pathname = defaultLocalePathname
      console.log('New url: ', urlWithDefaultLocale)
      return NextResponse.redirect(urlWithDefaultLocale.toString(), {
        status: 302,
      })
    }
  }

  return NextResponse.next()
}
