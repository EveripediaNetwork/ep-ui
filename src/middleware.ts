import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true'

  if (
    isMaintenanceMode &&
    request.nextUrl.pathname !== '/maintenance' &&
    !request.nextUrl.pathname.includes('.')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/maintenance'
    return NextResponse.redirect(url.toString(), { status: 302 })
  }

  // List of accepted locales
  const defaultAcceptedLocale = 'en'
  const acceptedLocales = ['en', 'ko']
  const userAcceptedLocales =
    request.headers
      .get('Accept-Language')
      ?.split(',')
      .map((lang) => lang.split(';')[0].trim()) ?? []

  // Find the first locale that matches the user's accepted locales
  const matchedLocale = userAcceptedLocales.find((lang) =>
    acceptedLocales.includes(lang),
  )

  // Detect if the current path already has a locale prefix
  const currentUrl = new URL(request.url)
  const currentPath = currentUrl.pathname
  const currentPathHasLocale = acceptedLocales.some((locale) =>
    currentPath.startsWith(`/${locale}`),
  )

  // Detect if the current path is an asset since they are not dependent on locale.
  const isAsset =
    currentPath.startsWith('/_next') ||
    currentPath.startsWith('/images') ||
    currentPath.startsWith('/api') ||
    currentPath.endsWith('.json')

  // Detect if the userAcceptedLocale is already defaultAcceptedLocale
  const userPreferDefault = matchedLocale === defaultAcceptedLocale

  // Redirect
  if (
    matchedLocale &&
    !currentPathHasLocale &&
    !isAsset &&
    !userPreferDefault
  ) {
    const url = new URL(request.nextUrl.href)
    url.pathname = `/${matchedLocale}${url.pathname}`
    return NextResponse.redirect(url)
  }

  // Continue if no redirect
  return NextResponse.next()
}
