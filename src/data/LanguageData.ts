export const languageData = [
  {
    name: 'English',
    locale: 'en',
    default: true,
    currency: 'usd',
    icon: '/US.svg',
  },
  {
    name: 'Korean',
    locale: 'ko',
    currency: 'krw',
    icon: '/KR.svg',
  },
  {
    name: 'Chinese',
    locale: 'zh',
    currency: 'cny',
    icon: '/ZH.svg',
  },
] as const

const supportedLanguages = languageData.map((lang) => lang.locale)
export type SupportedLanguages = typeof supportedLanguages[number]
