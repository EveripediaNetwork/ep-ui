import { NextResponse, NextRequest } from 'next/server'

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

// List of accepted locales
	const acceptedLocales = ["en", "ko"];
	const userAcceptedLocales =
		request.headers
			.get("Accept-Language")
			?.split(",")
			.map((lang) => lang.split(";")[0].trim()) ?? [];

	// Find the first locale that matches the user's accepted locales
	const matchedLocale = userAcceptedLocales.find((lang) =>
		acceptedLocales.includes(lang),
	);

	// Detect if the current path already has a locale prefix
	const currentUrl = new URL(request.url);
	const currentPath = currentUrl.pathname;
	const currentPathHasLocale = acceptedLocales.some((locale) =>
		currentPath.startsWith(`/${locale}`),
	);

	// Detect if the current path is an asset since they are not dependent on locale.
	const isAsset = currentPath.startsWith("/_next");

	// Redirect
	if (matchedLocale && !currentPathHasLocale && !isAsset) {
		const url = new URL(request.nextUrl.href);
		url.pathname = `/${matchedLocale}${url.pathname}`;
		return NextResponse.redirect(url);
	}

	// Continue if no redirect
	return NextResponse.next();
}
