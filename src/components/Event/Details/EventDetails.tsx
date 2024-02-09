import React from 'react'
import { eventDetailsData } from '../event.data'
import Link from 'next/link'
import { RiArrowRightLine } from 'react-icons/ri'

const EventDetails = () => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-xl md:text-2xl xl:text-4xl">
        Event Details
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 xl:gap-4">
        {eventDetailsData.map((details) => (
          <div
            key={details.title}
            className="bg-white dark:bg-gray700 py-2 px-1 xl:p-2 rounded-lg border border-gray200 dark:border-alpha-300 flex flex-col gap-3"
          >
            <h4 className="text-xs xl:text-sm uppercase font-medium">
              {details.title}
            </h4>
            <p className="text-[10px] xl:text-xs">{details.content}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Link
          href={'/event/event-details'}
          className="flex items-center text-sm md:text-base text-brand-500 dark:text-brand-800 gap-2"
        >
          <span>See Agenda</span>
          <RiArrowRightLine />
        </Link>
      </div>
    </div>
  )
}

export default EventDetails
