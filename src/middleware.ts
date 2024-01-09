import { NextResponse, NextRequest } from 'next/server'
import { isValidLocale, revertToKr } from './utils/checkValidLocale'
import {
  getPreferredLanguage,
  shouldNotRedirect,
} from './utils/localeHelperFunctions'

export function middleware(req: NextRequest) {
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true'
  const defaultLocale = 'en' // Set default locale

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

  // Skip redirection for static assets and API routes
  if (shouldNotRedirect(req.nextUrl.pathname)) {
    return NextResponse.next()
  }

  // Extract locale from URL
  const pathnameParts = req.nextUrl.pathname.split('/')
  let urlLocale = pathnameParts[1]

  // Check if locale is in URL and valid
  if (urlLocale && isValidLocale(urlLocale)) {
    // If 'ko', revert to 'kr'
    urlLocale = revertToKr(urlLocale)
    // Set NEXT_LOCALE cookie and return next response
    const response = NextResponse.next()
    response.cookies.set('NEXT_LOCALE', urlLocale)
    return response
  }

  // Get preferred locale from cookie or headers
  const preferredLocale = getPreferredLanguage(req)

  // Check if preferred locale is valid and different from current URL locale
  if (
    preferredLocale &&
    isValidLocale(preferredLocale) &&
    preferredLocale !== urlLocale
  ) {
    const url = req.nextUrl.clone()
    url.pathname = `/${revertToKr(preferredLocale)}${url.pathname.substring(
      urlLocale ? urlLocale.length + 1 : 0,
    )}`
    return NextResponse.redirect(url.toString(), { status: 302 })
  }

  // Redirect to default locale if no valid locale in URL
  if (!urlLocale || !isValidLocale(urlLocale)) {
    const url = req.nextUrl.clone()
    url.pathname = `/${defaultLocale}${req.nextUrl.pathname}`
    return NextResponse.redirect(url.toString(), { status: 302 })
  }

  return NextResponse.next()
}
