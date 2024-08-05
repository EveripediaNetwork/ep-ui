import React from 'react'
import { useTranslation } from 'next-i18next'
import { useGetEventsQuery } from '@/services/event'
import { TrendingEventsCard } from '../Event/TrendingEvent'
import Link from 'next/link'

const EventOverview = () => {
  const { data = [] } = useGetEventsQuery({
    offset: 0,
    limit: 4,
  })
  const { t } = useTranslation('event')

  return (
    <>
      {data && data.length > 2 && (
        <div className="container mx-auto pb-10 pt-5 md:py-20 xl:py-24 px-4 lg:px-8 xl:px-0 relative flex flex-col gap-10">
          <div className="absolute -z-10 -top-16 lg:-top-[400px] -left-10 w-[400px] lg:w-[600px] h-[650px] lg:h-[1000px] rotate-6 lg:-rotate-45 rounded-[100%] bg-gradient-to-b from-pink-500/10 to-sky-500/10 blur-3xl" />

          <div className="flex flex-col md:flex-row gap-10 lg:gap-24 mt-10">
            <div className="flex items-center flex-1 max-w-lg">
              <div className="flex flex-col gap-6">
                <h2 className="text-base lg:text-2xl font-semibold dark:text-alpha-900">
                  {t('homePageHeading')}
                </h2>
                <p className="text-sm md:text-base">{t('eventDescription')}</p>
                <Link
                  href="/categories"
                  prefetch={false}
                  className="px-5 py-3 rounded-lg border dark:border-gray-700 border-gray-300 self-start dark:text-alpha-800 text-gray-600 text-xs lg:text-sm hidden md:block mt-6"
                >
                  {t('homePageAction')}
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <TrendingEventsCard events={data} />
            </div>
          </div>
          <Link
            href="/categories"
            prefetch={false}
            className="px-5 py-3 rounded-lg border dark:border-gray-700 border-gray-300 self-center dark:text-alpha-800 text-gray-600 text-xs lg:text-sm block md:hidden"
          >
            {t('homePageAction')}
          </Link>
        </div>
      )}
    </>
  )
}

export default EventOverview
