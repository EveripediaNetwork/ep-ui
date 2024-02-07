import { getReadableDate } from '@/utils/DataTransform/getFormattedDate'
import { useTranslation } from 'next-i18next'

export const useTranslatedTimetamps = (
  activity: 'New' | 'Edited',
  locale: 'en' | 'ko',
  timeStamp: string,
) => {
  const isCreated = activity === 'New'
  const { t } = useTranslation('common')
  const readAbleTimeStamp = getReadableDate(timeStamp)
  console.log('Readable time: ', readAbleTimeStamp)

  const handleEditedCase = (unit: string, duration: string) => {
    if (unit.includes('second')) return `${duration}${t('editedSecs')}`
    if (unit.includes('minute')) return `${duration}${t('editedMins')}`
    if (unit.includes('hour')) return `${duration}${t('editedHours')}`
    if (unit.includes('day')) return `${duration}${t('editedDays')}`
    if (unit.includes('month')) return `${duration}${t('editedMonths')}`
    if (unit.includes('year')) return `${duration}${t('editedYears')}`
  }

  const handleCreatedCase = (unit: string, duration: string) => {
    if (unit.includes('second')) return `${duration}${t('createdSecs')}`
    if (unit.includes('minute')) return `${duration}${t('createdMins')}`
    if (unit.includes('hour')) return `${duration}${t('createdHours')}`
    if (unit.includes('day')) return `${duration}${t('createdDays')}`
    if (unit.includes('month')) return `${duration}${t('createdMonths')}`
    if (unit.includes('year')) return `${duration}${t('createdYears')}`
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

  const result = handleLocale()
  console.log(
    `Result: ${result}, ReadableTime: ${readAbleTimeStamp},  Activity: ${activity}, Loacle: ${locale}, timeStamp: ${timeStamp}`,
  )
  return result
}
