import { NextRequest, NextResponse } from 'next/server'
import { isValidLocale, revertToKr } from './utils/checkValidLocale'
import {
  getPreferredLanguage,
  isLocaleSupported,
  redirectStaticFiles,
  redirectToDefaultLocale,
} from './utils/localeHelperFunctions'

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

  // redirect for static files
  redirectStaticFiles(req)

  //TODO - checks
  /**
   * 1) Check if a locale exists in the url, if the locale is not valid redirect to default (en) language
   * 2) If locale is valid and supported, do nothing return the next response without redirecting
   * 3) If there's no locale in url, get preferred locale, if there's none redirect to default locale
   * 4) If there's a preferred locale and it's not supported in language file, redirect to default
   * 5) If there's a preferred locale and it's supported, redirect to it ensure to update NEXT_LOCALE cookie with the preferred cookie
   * 6) if there's no preferred and locale in url, redirect to default
   */

  const pathname = req.nextUrl.pathname.split('/').filter(Boolean)
  const potentialLocale = pathname[0]

  if (potentialLocale) {
    const isLocaleValid = isValidLocale(potentialLocale)
    if (isLocaleValid && !isLocaleSupported(potentialLocale)) {
      redirectToDefaultLocale(req)
      return
    }
  } else {
    const preferredLanguage = getPreferredLanguage(req)

    if (!preferredLanguage) {
      redirectToDefaultLocale(req)
      return
    }

    const isValidPreferedLocale = isValidLocale(preferredLanguage)
    const transformedLocale = revertToKr(preferredLanguage)

    if (isValidPreferedLocale && !isLocaleSupported(transformedLocale)) {
      redirectToDefaultLocale(req)
      return
    } else {
      const updatedPathname = `/${transformedLocale}`
      const urlWithLocale = req.nextUrl.clone()
      urlWithLocale.pathname = updatedPathname

      return NextResponse.redirect(urlWithLocale.toString(), { status: 302 })
    }
  }

  return NextResponse.next()
}
