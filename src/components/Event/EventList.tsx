import React from 'react'
import EventCard from './EventCard'
import { groupEventsByMonth } from '@/lib/utils'
import EventEmptyState from './EventEmptyState'
import { Dialog, DialogTrigger } from '../ui/dialog'
import SuggestEventModal from './SuggestEventModal'
import { TEvents } from '@/services/event'

const EventList = ({
  eventData,
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  setEventData,
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  setSearchActive,
}: {
  eventData?: TEvents[]
  setEventData: Function
  setSearchActive: Function
}) => {
  const eventsByMonth = eventData ? groupEventsByMonth(eventData) : []

  console.log({ eventsByMonth })
  // const eventsByMonth = groupEventsByMonth(eventData)

  return (
    <div className="flex flex-col flex-1 gap-5">
      {/* {eventData?.length !== eventMockData.length && (
        <span className="flex flex-col items-start">
          <h1 className="font-semibold">Search Results</h1>
          <button
            type="button"
            onClick={() => {
              setEventData(eventMockData)
              setSearchActive(false)
            }}
            className="text-sm text-brand-500 flex gap-3 hover:underline items-center cursor-pointer dark:text-brand-800 md:text-base"
          >
            <span>
              <RiArrowLeftLine />
            </span>
            Go Back
          </button>
        </span>
      )} */}
      <div className="flex flex-col flex-1 gap-10 xl:gap-20">
        {eventData && eventData.length > 0 ? (
          Object.entries(eventsByMonth).map(([monthYear, events]) => (
            <div key={monthYear} className="flex flex-col gap-10">
              <div className="">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-4">
                    <span className="flex flex-col">
                      <h1 className="font-semibold md:text-xl">{monthYear}</h1>
                    </span>
                  </div>
                  {events[0] && (
                    <span className="text-[10px] md:text-xs max-w-[149px] md:max-w-full">
                      know any events not listed?{' '}
                      <Dialog>
                        <DialogTrigger asChild>
                          <span className="text-brand-500 dark:text-brand-800 cursor-pointer hover:underline">
                            Suggest events
                          </span>
                        </DialogTrigger>
                        <SuggestEventModal />
                      </Dialog>
                    </span>
                  )}
                </div>
                <div className="grid gap-5 mt-3 md:mt-6 h-fit relative">
                  <div className="w-[2px] top-2 left-[10px] absolute h-full bg-brand-500 dark:bg-brand-800" />
                  {events.map((event) => (
                    <EventCard
                      id={event.id}
                      key={event.id}
                      title={event.title}
                      excerpt={event.summary}
                      location={'St. Moritz, Switzerland'}
                      date={event.events[0].date}
                      tags={event.tags}
                      speakers={event.linkedWikis.speakers}
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
      {eventData && eventData.length > 20 && (
        <button
          className="px-10 py-2 mt-10 rounded-md border hover:bg-gray100 dark:hover:bg-alpha-50 cursor-pointer border-gray200 dark:border-alpha-400"
          type="button"
        >
          View more
        </button>
      )}
    </div>
  )
}

export default EventList
