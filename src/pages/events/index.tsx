import { MainEventHeader } from '@/components/SEO/Event'
import TrendingEvent from '@/components/Event/TrendingEvent'
import EventBanner from '@/components/Event/EventBanner'
import EventInterest from '@/components/Event/EventInterest'
import EventSearchBar from '@/components/Event/EventSearchBar'
import NearbyEventFilter from '@/components/Event/NearbyEventFilter'
import PopularEventFilter from '@/components/Event/PopularEventFilter'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
import EventList from '@/components/Event/EventList'
import { TEvents, getEvents, getPopularEvents } from '@/services/event'
import { store } from '@/store/store'
import { EVENT_TEST_ITEM_PER_PAGE } from '@/data/Constants'
import EventFilter from '@/components/Event/EventFilter'
import { DateRange } from 'react-day-picker'
import { dateFormater } from '@/lib/utils'
import { useRouter } from 'next/router'

const EventPage = ({
  events,
  popularEvents,
  countryName,
}: {
  events: TEvents[]
  popularEvents: TEvents[]
  countryName: string
}) => {
  const [eventData, setEventData] = useState<TEvents[]>(events)
  const [searchActive, setSearchActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchDate, setSearchDate] = useState<DateRange>()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const router = useRouter()

  const clearSearchState = () => {
    setEventData(events)
    setSearchActive(false)
    setSearchDate(undefined)
    setSearchQuery('')
    router.push({ pathname: router.pathname }, undefined, {
      shallow: true,
    })
  }

  return (
    <div>
      <MainEventHeader />
      <EventBanner />
      <div className="mb-[120px] px-4 md:px-10 pt-4 dark:bg-gray800">
        <EventSearchBar
          setSearchActive={setSearchActive}
          setEventData={setEventData}
          setIsLoading={setIsLoading}
          searchDate={searchDate}
          setSearchDate={setSearchDate}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {!searchActive && (
          <>
            <TrendingEvent events={events.slice(0, 6)} />
            <EventInterest
              setIsLoading={setIsLoading}
              eventData={events}
              setEventData={setEventData}
            />
          </>
        )}
        <div className="mt-6 md:mt-[30px] xl:hidden">
          <EventFilter
            fetchedData={events}
            setIsLoading={setIsLoading}
            setEventData={setEventData}
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-10 xl:gap-8 max-w-[1296px] mx-auto mt-6 md:mt-[30px]">
          <EventList
            fetchedData={events}
            isLoading={isLoading}
            searchActive={searchActive}
            eventData={eventData}
            setEventData={setEventData}
            clearState={clearSearchState}
          />
          <div className="flex-1 flex flex-col gap-10 xl:max-w-[419px]">
            <div className="hidden xl:block">
              <EventFilter
                setIsLoading={setIsLoading}
                fetchedData={events}
                setEventData={setEventData}
              />
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-1 gap-10 md:gap-4 lg:gap-10">
              <NearbyEventFilter countryName={countryName} />
              <PopularEventFilter popularEvents={popularEvents} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventPage

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { data: events } = await store.dispatch(
    getEvents.initiate({
      offset: 0,
      limit: EVENT_TEST_ITEM_PER_PAGE,
    }),
  )

  let country_name = ''
  try {
    const response = await fetch('https://ipapi.co/json/')
    if (response.ok) {
      const jsonData = await response.json()
      country_name = jsonData.country_name
    } else {
      console.error('Failed to fetch country name:', response.status)
    }
  } catch (error) {
    console.error('Error fetching the country name:', error)
  }

  const { data: popularEvents } = await store.dispatch(
    getPopularEvents.initiate({
      startDate: dateFormater(new Date()),
    }),
  )
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['event', 'common'])),
      events: events ?? [],
      popularEvents: popularEvents?.slice(0, 5) || [],
      countryName: country_name,
    },
  }
}
