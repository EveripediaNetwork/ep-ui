import { NextResponse, NextRequest } from 'next/server'
import { isValidLocale, revertToKr } from './utils/checkValidLocale'
import {
  getPreferredLanguage,
  shouldNotRedirect,
} from './utils/localeHelperFunctions'

export function middleware(req: NextRequest) {
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true'
  const defaultLocale = 'en'

  if (
    isMaintenanceMode &&
    req.nextUrl.pathname !== '/maintenance' &&
    !req.nextUrl.pathname.includes('.')
  ) {
    // Set default locale

    // Check for maintenance mode first
    const url = req.nextUrl.clone()
    url.pathname = '/maintenance'
    return NextResponse.redirect(url.toString(), { status: 302 })
  }

  if (shouldNotRedirect(req.nextUrl.pathname)) {
    // Skip redirection for static assets and API routes
    return NextResponse.next()
  }

  // Extract locale from URL
  const pathnameParts = req.nextUrl.pathname.split('/')
  let urlLocale = pathnameParts[1]

  if (urlLocale && isValidLocale(urlLocale)) {
    urlLocale = revertToKr(urlLocale)
    const response = NextResponse.next()

    if (req.cookies.get('NEXT_LOCALE')?.value !== urlLocale) {
      response.cookies.set('NEXT_LOCALE', urlLocale)
    }

    return response
  }

  // Get preferred locale from cookie or headers
  const preferredLocale = getPreferredLanguage(req)

  if (
    preferredLocale &&
    isValidLocale(preferredLocale) &&
    preferredLocale !== urlLocale
  ) {
    // Redirect to preferred locale if it's valid and different from URL locale
    const url = req.nextUrl.clone()
    url.pathname = `/${revertToKr(preferredLocale)}${url.pathname.substring(
      urlLocale ? urlLocale.length + 1 : 0,
    )}`
    return NextResponse.redirect(url.toString(), { status: 302 })
  }

  if (!urlLocale || !isValidLocale(urlLocale)) {
    // Redirect to default locale if no valid locale in URL
    // Avoid redirecting if already at default locale
    if (urlLocale !== defaultLocale) {
      const url = req.nextUrl.clone()
      url.pathname = `/${defaultLocale}${req.nextUrl.pathname.substring(
        urlLocale ? urlLocale.length + 1 : 0,
      )}`
      return NextResponse.redirect(url.toString(), { status: 302 })
    }
  }

  return NextResponse.next()
}
