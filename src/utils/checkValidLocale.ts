export const isValidLocale = (locale?: string) => {
  if (!locale) return false

  // Create a new Intl.DateTimeFormat object with the given locale
  const formatter = new Intl.DateTimeFormat(locale)

  // Get the resolved locale from the formatter
  const resolvedLocale = formatter.resolvedOptions().locale

  // Compare the resolved locale with the input
  // This check handles cases where the API defaults to a fallback locale
  return resolvedLocale === locale || resolvedLocale.startsWith(`${locale}-`)
}

export const revertToKr = (locale: string) => {
  return locale === 'ko' ? 'kr' : locale
}

export const revertToKo = (locale: string) => {
  return locale === 'kr' ? 'ko' : locale
}
