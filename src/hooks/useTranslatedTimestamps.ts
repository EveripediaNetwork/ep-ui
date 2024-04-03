import { getReadableDate } from '@/utils/DataTransform/getFormattedDate'
import { useTranslation } from 'next-i18next'
import { SupportedLanguages } from '@/data/LanguageData'

export const useTranslatedTimestamps = (
  activity: 'New' | 'Edited',
  locale: SupportedLanguages,
  timeStamp: string,
) => {
  const isCreated = activity === 'New'
  const { t } = useTranslation('common')
  const readAbleTimeStamp = getReadableDate(timeStamp)

  const handleEditedCase = (unit: string, duration: string) => {
    if (unit.includes('second'))
      return `${t('edited')} ${duration} ${t('secsAgo')}`
    if (unit.includes('minute'))
      return `${t('edited')} ${duration} ${t('minsAgo')}`
    if (unit.includes('hour'))
      return `${t('edited')} ${duration} ${t('hoursAgo')}`
    if (unit.includes('day'))
      return `${t('edited')} ${duration} ${t('daysAgo')}`
    if (unit.includes('month'))
      return `${t('edited')} ${duration} ${t('monthsAgo')}`
    if (unit.includes('year'))
      return `${t('edited')} ${duration} ${t('yearsAgo')}`
  }

  const handleCreatedCase = (unit: string, duration: string) => {
    if (unit.includes('second'))
      return `${t('created')} ${duration} ${t('secsAgo')}`
    if (unit.includes('minute'))
      return `${t('created')} ${duration} ${t('minsAgo')}`
    if (unit.includes('hour'))
      return `${t('created')} ${duration} ${t('hoursAgo')}`
    if (unit.includes('day'))
      return `${t('created')} ${duration} ${t('daysAgo')}`
    if (unit.includes('month'))
      return `${t('created')} ${duration} ${t('monthsAgo')}`
    if (unit.includes('year'))
      return `${t('created')} ${duration} ${t('yearsAgo')}`
  }

  const handleActivity = (
    unit: string,
    duration: string,
    activity: 'Edited' | 'New',
  ) => {
    switch (activity) {
      case 'New':
        return handleCreatedCase(unit, duration)
      case 'Edited':
        return handleEditedCase(unit, duration)
      default:
        return ''
    }
  }

  const handleLocale = () => {
    switch (locale) {
      case 'en':
        return `${t(isCreated ? 'Created' : 'Edited')} ${readAbleTimeStamp} ${t(
          'ago',
        )}`
      default:
        const timeStampRegex = /(\d+)\s(\w+)/
        const match = readAbleTimeStamp.match(timeStampRegex)
        if (!match) return
        const [_, duration, unit] = match
        return handleActivity(unit, duration, activity)
    }
  }

  return handleLocale()
}
