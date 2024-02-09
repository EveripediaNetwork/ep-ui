import React from 'react'
import { eventDetailsData } from '../event.data'
import Link from 'next/link'
import { RiArrowRightLine } from 'react-icons/ri'

const EventDetails = () => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-4xl">Event Details</h3>
      <div className="grid grid-cols-3 gap-4">
        {eventDetailsData.map((details) => (
          <div
            key={details.title}
            className="bg-white p-2 rounded-lg border border-gray200 flex flex-col gap-3"
          >
            <h4 className="text-sm uppercase font-medium">{details.title}</h4>
            <p className="text-xs">{details.content}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Link
          href={'/event/event-details'}
          className="flex items-center text-brand-500 gap-2"
        >
          <span>See Agenda</span>
          <RiArrowRightLine />
        </Link>
      </div>
    </div>
  )
}

export default EventDetails
