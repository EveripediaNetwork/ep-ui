import { TEvents } from '@/services/event'
import { CommonMetaIds } from '@everipedia/iq-utils'
import React from 'react'
import { RiEmotionSadLine } from 'react-icons/ri'
import EventItem from './EventItem'
import { useTranslation } from 'next-i18next'

const PopularEventFilter = ({
  popularEvents,
}: {
  popularEvents: TEvents[]
}) => {
  const { t } = useTranslation('event')
  return (
    <div className="">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold md:text-xl lg:text-base xl:text-xl leading-none">
          {t('popularEvents')}
        </h2>
        <p
          style={{ lineHeight: '14px' }}
          className="text-sm lg:text-[10px] xl:text-xs"
        >
          {t('popularEventsDescription')}
        </p>
      </div>
      <div className="border flex flex-col gap-8 bg-white border-gray200 dark:border-alpha-300 dark:bg-gray700 px-[14px] py-[10px] md:px-5 md:py-[18px] lg:px-2 xl:px-3 lg:py-3 xl:py-5 mt-6 rounded-xl">
        {popularEvents.length > 0 ? (
          popularEvents.map((event) => {
            const locationMeta = event.metadata?.find(
              (m) => m.id === CommonMetaIds.LOCATION,
            )
            const eventLocation = locationMeta
              ? JSON.parse(locationMeta.value)
              : ''
            return (
              <EventItem
                key={event.id}
                event={event}
                eventLocation={eventLocation}
              />
            )
          })
        ) : (
          <div className="w-full flex justify-center py-11 items-center">
            <div className="flex flex-col items-center gap-1">
              <RiEmotionSadLine size={24} />
              <p className="font-medium text-xs text-center text-gray600 dark:text-alpha-900 max-w-[240px]">
                {t('noPopularEvents')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PopularEventFilter
