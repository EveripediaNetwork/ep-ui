import { NextResponse, NextRequest } from 'next/server'
import { URLS } from '@/data/UrlData'
import appConfig from '@/config'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.includes('/lang_en')) {
    const oldWikiName = pathname.replace('/wiki/lang_en/', '')
    if (oldWikiName in URLS) {
      return NextResponse.rewrite(
        new URL(`/wiki/${URLS[oldWikiName]}`, request.url),
      )
    }
    return NextResponse.redirect(`${appConfig.baseArchiveUrl}${pathname}`, 301)
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/wiki/lang_en/:path*',
}
