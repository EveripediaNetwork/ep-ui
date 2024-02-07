import { getReadableDate } from '@/utils/DataTransform/getFormattedDate'
import { useTranslation } from 'next-i18next'

export const useTranslatedTimetamps = (
  activity: 'New' | 'Edited',
  locale: 'en' | 'ko',
  timeStamp: string,
) => {
  const isCreated = activity === 'New'
  const { t } = useTranslation('activity')
  const readAbleTimeStamp = getReadableDate(timeStamp)

  const handleEditedCase = (unit: string, duration: string) => {
    if (unit.includes('second')) return `${duration}${t('editedSecs')}`
    if (unit.includes('minute')) return `${duration}${t('editedMins')}`
    if (unit.includes('hour')) return `${duration}${t('editedHours')}`
    if (unit.includes('day')) return `${duration}${t('editedDays')}`
  }

  const handleCreatedCase = (unit: string, duration: string) => {
    if (unit.includes('minute')) return `${duration}${t('createdMins')}`
    if (unit.includes('hour')) return `${duration}${t('createdHours')}`
    if (unit.includes('day')) return `${duration}${t('createdDays')}`
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
        return 'nothing'
    }
  }

  const handleLocale = () => {
    switch (locale) {
      case 'en':
        return `${t(isCreated ? 'Created' : 'Edited')} ${readAbleTimeStamp} ${t(
          'ago',
        )}`
      case 'ko':
        const timeStampRegex = /(\d)\s(\w+)/
        const match = readAbleTimeStamp.match(timeStampRegex)
        if (!match) return
        const [_, duration, unit] = match
        return handleActivity(unit, duration, activity)
      default:
        return ''
    }
  }

  return handleLocale()
}
