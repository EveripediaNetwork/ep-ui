import React from 'react'
import EventCard from './EventCard'
import { IEventData, eventMockData } from './event.data'
import { groupEventsByMonth } from '@/lib/utils'

const EventList = ({
  eventData,
  setEventData,
}: {
  eventData: IEventData[]
  setEventData: Function
}) => {
  console.log({ eventList: eventData })
  const eventsByMonth = groupEventsByMonth(eventData)

  return (
    <div className="flex flex-col flex-1 items-start gap-5">
      {eventData !== eventMockData && (
        <span className="flex flex-col items-start">
          <h1 className="font-semibold">Search Results</h1>
          <button
            type="button"
            onClick={() => setEventData(eventMockData)}
            className="text-sm text-brand-500 cursor-pointer dark:text-brand-800 md:text-base"
          >
            Go Back
          </button>
        </span>
      )}
      <div className="flex flex-col flex-1 gap-10 xl:gap-20">
        {eventData.length > 1 ? (
          Object.entries(eventsByMonth).map(([monthYear, events]) => (
            <div key={monthYear} className="flex flex-col gap-10">
              <div className="">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-4">
                    <span className="flex flex-col">
                      <h1 className="font-semibold md:text-xl">{monthYear}</h1>
                    </span>
                  </div>
                  {events[0].id === 1 && (
                    <span className="text-[10px] md:text-xs max-w-[149px] md:max-w-full">
                      know any events not listed?{' '}
                      <span className="text-brand-500 dark:text-brand-800 cursor-pointer hover:underline">
                        Suggest events
                      </span>
                    </span>
                  )}
                </div>
                <div className="grid gap-5 mt-3 md:mt-6 h-fit relative">
                  <div className="w-[2px] top-2 left-[10px] absolute h-full bg-brand-500 dark:bg-brand-800" />
                  {events.map((event) => (
                    <EventCard
                      key={event.id}
                      title={event.title}
                      excerpt={event.excerpt}
                      location={event.location}
                      date={event.date}
                      tags={event.tags}
                      speakers={event.speakers}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <span>No Available Data For this search</span>
        )}
      </div>
      {/* <button
              className="px-10 py-2 mt-10 rounded-md border hover:bg-gray100 dark:hover:bg-alpha-50 cursor-pointer border-gray200 dark:border-alpha-400"
              type="button"
            >
              View more
            </button> */}
    </div>
  )
}

export default EventList
