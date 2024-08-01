import { useTranslation } from 'next-i18next'
import React from 'react'

const EventBanner = () => {
  const { t } = useTranslation('event')
  return (
    <div className="w-full px-4 md:px-10 dark:bg-gray800">
      <div className="flex max-w-[1296px] mx-auto flex-col py-4 md:py-6">
        <h1 className="md:text-xl lg:text-2xl mb-1 font-semibold text-gray800 dark:text-alpha-900">
          {t('eventHeading')}
        </h1>
        <p className="text-xs md:text-sm lg:text-base text-gray600 dark:text-alpha-800 max-w-[1126px]">
          {t('eventDescription')}
        </p>
      </div>
    </div>
  )
}

export default EventBanner
