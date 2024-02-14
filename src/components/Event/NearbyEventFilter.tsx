import { nearByEventData } from '@/components/Event/event.data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { RiCalendar2Line, RiMapPinRangeLine } from 'react-icons/ri'

const NearbyEventFilter = () => {
  return (
    <div className="">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-xl leading-none">Nearby Events</h2>
        <span className="text-xs">
          Noteworthy events that are coming up soon near you.
        </span>
      </div>
      <div className="border flex flex-col gap-8 border-gray200 dark:border-alpha-300 bg-white dark:bg-gray700 px-3 py-5 mt-6 rounded-xl">
        {nearByEventData.map((event) => (
          <div key={event.title} className="flex gap-2">
            <span>
              <Image
                src={'/images/event-1.png'}
                alt="event image"
                width={93}
                height={69}
              />
            </span>
            <div className="flex-1">
              <Link
                href={`/event/${event.title.toLowerCase().replace(/ /g, '-')}`}
                className="font-semibold hover:underline text-gray800 dark:text-alpha-900 text-sm"
              >
                {event.title}
              </Link>
              <div className="flex text-xs my-2 text-alpha-900 divide-x divide-alpha-700 items-center">
                <span className="pr-2 flex gap-1 items-center">
                  <span className="text-brand-800 text-base">
                    <RiCalendar2Line />
                  </span>
                  <span className="text-gray800 dark:text-alpha-900">
                    7th Jan - 7th Apr, 2024
                  </span>
                </span>
                <span className="pl-2 flex gap-1 items-center">
                  <span className="text-brand-800 text-base">
                    <RiMapPinRangeLine />
                  </span>
                  <span className="text-gray800 dark:text-alpha-900">
                    Shangai, china
                  </span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NearbyEventFilter
