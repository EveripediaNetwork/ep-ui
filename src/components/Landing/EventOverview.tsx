import React from 'react'
import { LinkButton } from '../Elements'
import { useTranslation } from 'react-i18next'
import { useGetEventsQuery } from '@/services/event'
import { dateFormater } from '@/lib/utils'
import { TrendingEventsCard } from '../Event/TrendingEvent'

const EventOverview = () => {
  const { data } = useGetEventsQuery({
    offset: 0,
    limit: 4,
    startDate: dateFormater(new Date()),
  })
  const { t } = useTranslation('event')

  return (
    <>
      {data && data.length > 0 && (
        <div className="max-w-[1296px] mx-auto py-14 md:py-20 xl:py-24 px-4">
          <h2 className="text-2xl max-w-[350px] mx-auto md:max-w-full md:text-4xl font-semibold text-center">
            {t('homePageHeading')}
          </h2>
          <div className="grid md:grid-cols-2 gap-14 mt-10">
            <div className="flex items-center">
              <div className="flex flex-col gap-10">
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
            <div>
              <TrendingEventsCard events={data || []} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EventOverview
