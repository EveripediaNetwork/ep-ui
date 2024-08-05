import React from 'react'
import { LinkButton } from '../Elements'
import { useTranslation } from 'next-i18next'
import { useGetEventsQuery } from '@/services/event'
import { TrendingEventsCard } from '../Event/TrendingEvent'

const EventOverview = () => {
  const { data = [] } = useGetEventsQuery({
    offset: 0,
    limit: 4,
  })
  const { t } = useTranslation('event')

  return (
    <>
      {data && data.length > 2 && (
        <div className="container mx-auto py-14 md:py-20 xl:py-24 px-4 lg:px-8 xl:px-0">
          <div className="flex flex-col md:flex-row gap-10 lg:gap-24 mt-10">
            <div className="flex items-center flex-1 max-w-lg">
              <div className="flex flex-col gap-6">
                <h2 className="text-base lg:text-2xl font-semibold dark:text-alpha-900">
                  {t('homePageHeading')}
                </h2>
                <p className="text-sm md:text-base">{t('eventDescription')}</p>
                <LinkButton
                  href="/events"
                  h="50px"
                  display={{ base: 'none', md: 'flex' }}
                  w={{ base: 32, lg: 40 }}
                  variant="outline"
                  bgColor="btnBgColor"
                  prefetch={false}
                >
                  {t('homePageAction')}
                </LinkButton>
              </div>
            </div>
            <div className="flex-1">
              <TrendingEventsCard events={data} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EventOverview
