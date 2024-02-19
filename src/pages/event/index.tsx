import EventHeader from '@/components/SEO/Event'
import TrendingEvent from '@/components/Event/TrendingEvent'
import EventBanner from '@/components/Event/EventBanner'
import EventInterest from '@/components/Event/EventInterest'
import EventSearchBar from '@/components/Event/EventSearchBar'
import EventFilter from '@/components/Event/EventFilter'
import NearbyEventFilter from '@/components/Event/NearbyEventFilter'
import PopularEventFilter from '@/components/Event/PopularEventFilter'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
import { IEventData, eventMockData } from '@/components/Event/event.data'
import EventList from '@/components/Event/EventList'

const EventPage = () => {
  const [eventData, setEventData] = useState<IEventData[]>(eventMockData)
  const [searchActive, setSearchActive] = useState(false)

  return (
    <div>
      <EventHeader />
      <EventBanner />
      <div className="mb-[120px] px-4 md:px-10 dark:bg-gray800 border-t border-gray200 dark:border-alpha-300">
        <EventSearchBar
          eventData={eventMockData}
          setSearchActive={setSearchActive}
          setEventData={setEventData}
        />
        {!searchActive && (
          <>
            <TrendingEvent />
            <EventInterest
              eventData={eventMockData}
              setEventData={setEventData}
            />
          </>
        )}
        <div className="mt-10 xl:hidden">
          <EventFilter setEventData={setEventData} />
        </div>
        <div className="flex flex-col xl:flex-row gap-10 xl:gap-8 max-w-[1296px] mx-auto mt-10 md:mt-24">
          <EventList
            setSearchActive={setSearchActive}
            eventData={eventData}
            setEventData={setEventData}
          />
          <div className="flex-1 flex flex-col gap-10 xl:max-w-[419px]">
            <div className="hidden xl:block">
              <EventFilter setEventData={setEventData} />
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-1 gap-10 md:gap-4 lg:gap-10">
              <NearbyEventFilter />
              <PopularEventFilter />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'en', [
        'event',
        'common',
      ])),
    },
  }
}