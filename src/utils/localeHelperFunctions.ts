import { NextRequest } from 'next/server'

export const shouldNotRedirect = (pathname: string) => {
  return (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/images/') ||
    pathname.endsWith('.json')
  )
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
