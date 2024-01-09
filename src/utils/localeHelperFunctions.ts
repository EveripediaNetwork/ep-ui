import { languageData } from '@/data/LanguageData'
import { NextRequest, NextResponse } from 'next/server'

export const redirectStaticFiles = (req: NextRequest) => {
  if (
    req.nextUrl.pathname.startsWith('/api/') ||
    req.nextUrl.pathname.startsWith('/_next/') ||
    req.nextUrl.pathname.startsWith('/images/') ||
    req.nextUrl.pathname.endsWith('.json')
  ) {
    return NextResponse.next()
  }
}

export const redirectToDefaultLocale = (req: NextRequest) => {
  const defaultLocale =
    languageData.find((lang) => lang.default)?.locale ?? 'en'
  const pathname = req.nextUrl.pathname.replace(/^\/[^/]+/, `/${defaultLocale}`)
  const urlWithLocale = req.nextUrl.clone()
  urlWithLocale.pathname = pathname
  return NextResponse.redirect(urlWithLocale.toString(), { status: 302 })
}

export const getPreferredLanguage = (req: NextRequest) => {
  const acceptLanguageHeader = req.headers.get('accept-language')
  if (!acceptLanguageHeader) {
    return null
  }
  const languages = acceptLanguageHeader.split(',').map((lang) => {
    const [locale, priority] = lang.trim().split(';q=')
    return {
      locale: locale.split('-')[0],
      priority: priority ? parseFloat(priority) : 1,
    }
  })
  languages.sort((a, b) => b.priority - a.priority)
  return languages.length > 0 ? languages[0].locale : null
}

export const isLocaleSupported = (locale: string) =>
  languageData.find((language) => language.locale === locale)
