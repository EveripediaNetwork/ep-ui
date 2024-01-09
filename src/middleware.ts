import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true'

  if (
    isMaintenanceMode &&
    req.nextUrl.pathname !== '/maintenance' &&
    !req.nextUrl.pathname.includes('.')
  ) {
    const url = req.nextUrl.clone()
    url.pathname = '/maintenance'
    return NextResponse.redirect(url.toString(), { status: 302 })
  }

  return NextResponse.next()
}
