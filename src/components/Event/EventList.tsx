import React, { useState } from 'react'
import EventCard from './EventCard'
import { groupEventsByMonth } from '@/lib/utils'
import EventEmptyState from './EventEmptyState'
import SuggestEventModal from './SuggestEventModal'
import { TEvents, getEvents } from '@/services/event'
import { RiArrowLeftLine } from 'react-icons/ri'
import { LoadingState } from './LoadingState'
import { store } from '@/store/store'
import { EVENT_TEST_ITEM_PER_PAGE } from '@/data/Constants'
import { useRouter } from 'next/router'

const EventList = ({
  fetchedData,
  eventData,
  setEventData,
  searchActive,
  isLoading,
  clearState,
}: {
  isLoading: boolean
  searchActive: boolean
  fetchedData: TEvents[]
  eventData: TEvents[]
  setEventData: Function
  clearState: Function
}) => {
  const router = useRouter()
  const hasQueryParams = Object.keys(router.query).length > 0
  const limit = EVENT_TEST_ITEM_PER_PAGE
  const [offset, setOffset] = useState(eventData?.length || 0)
  const [isFetching, setIsFetching] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const handleViewMore = async () => {
    setIsFetching(true)
    setOffset((prevOffset) => prevOffset + limit) // Increase offset to fetch next set of events
    store
      .dispatch(getEvents.initiate({ offset: offset, limit }))
      .then(({ data }) => {
        if (data) {
          if (data.length > 0) {
            setHasMore(true)
            setEventData((prevEvents: TEvents[]) => [...prevEvents, ...data])
          } else {
            setHasMore(false)
          }
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsFetching(false)
      })
  }

  const eventsByMonth =
    eventData && eventData.length > 0 ? groupEventsByMonth(eventData) : []

  return (
    <div className="flex flex-col flex-1 gap-5">
      {searchActive && (
        <span className="flex flex-col items-start">
          <h1 className="font-semibold">Search Results</h1>
          <button
            type="button"
            onClick={() => {
              setOffset(fetchedData.length)
              setHasMore(true)
              clearState()
            }}
            className="text-sm text-brand-500 flex gap-3 hover:underline items-center cursor-pointer dark:text-brand-800 md:text-base"
          >
            <span>
              <RiArrowLeftLine />
            </span>
            Go Back
          </button>
        </span>
      )}
      <div className="flex flex-col gap-10 xl:gap-20">
        {eventData && eventData.length > 0 ? (
          Object.entries(eventsByMonth).map(([monthYear, events], index) => (
            <div key={monthYear} className="flex flex-col gap-10">
              <div className="">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-4">
                    <span className="flex flex-col">
                      {isLoading ? (
                        <LoadingState />
                      ) : (
                        <h1 className="font-semibold md:text-xl">
                          {monthYear}
                        </h1>
                      )}
                    </span>
                  </div>
                  {index === 0 && (
                    <>
                      {isLoading ? (
                        <LoadingState classNames="w-[285px] h-4" />
                      ) : (
                        <div className="text-[10px] md:text-xs max-w-[149px] md:max-w-full">
                          <span>know any events not listed?</span>{' '}
                          <SuggestEventModal />
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="grid gap-5 mt-3 md:mt-6 xl:mt-10 h-fit relative">
                  <div className="w-[2px] top-2 left-[10px] absolute h-full bg-brand-500 dark:bg-brand-800" />
                  {events.map((event) => (
                    <EventCard
                      isLoading={isLoading}
                      id={event.id}
                      key={event.id}
                      title={event.title}
                      excerpt={event.summary || ''}
                      location={event.metadata}
                      date={event.events[0]}
                      tags={event.tags.filter((tag) => tag.id !== 'Events')}
                      speakers={event?.speakerWikis || []}
                      images={event.images}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <EventEmptyState />
        )}
      </div>
      {!hasQueryParams &&
        !searchActive &&
        eventData.length > 0 &&
        (hasMore ? (
          <button
            type="button"
            onClick={handleViewMore}
            disabled={isFetching}
            className="px-10 py-2 w-fit mx-auto rounded-md border hover:bg-gray100 dark:hover:bg-alpha-50 cursor-pointer border-gray200 dark:border-alpha-400 disabled:cursor-not-allowed"
          >
            {isFetching ? 'Loading more...' : 'View more'}
          </button>
        ) : (
          <span className="text-center">No More Data</span>
        ))}
    </div>
  )
}

export default EventList
