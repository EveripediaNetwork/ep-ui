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
        <div className="container mx-auto py-14 md:py-20 xl:py-24 px-4">
          <div className="flex flex-col lg:flex-row gap-10 mt-10">
            <div className="flex items-center flex-1">
              <div className="flex flex-col gap-10">
                <h2 className="text-2xl md:text-4xl font-semibold dark:text-alpha-900">
                  {t('homePageHeading')}
                </h2>
                <p className="text-center md:text-start text-sm md:text-base">
                  {t('eventDescription')}
                </p>
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
