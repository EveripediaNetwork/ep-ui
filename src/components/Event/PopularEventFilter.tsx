import { popularEventData } from '@/pages/event/event.data'
import Image from 'next/image'
import React from 'react'
import { RiCalendar2Line, RiMapPinRangeLine } from 'react-icons/ri'

const PopularEventFilter = () => {
  return (
    <div>
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-xl leading-none">Popular Events</h2>
        <span className="text-xs">
          The most popular crypto events around the world.
        </span>
      </div>
      <div className="border flex flex-col gap-8 border-alpha-300 bg-gray-700 px-3 py-5 mt-6 rounded-xl">
        {popularEventData.map(event => (
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
              <span className="font-semibold text-sm">{event.title}</span>
              <div className="flex text-xs my-2 text-alpha-900 divide-x divide-alpha-700 items-center">
                <span className="pr-2 flex gap-1 items-center">
                  <span className="text-brand-800 text-base">
                    <RiCalendar2Line />
                  </span>
                  <span>7th Jan - 7th Apr, 2024</span>
                </span>
                <span className="pl-2 flex gap-1 items-center">
                  <span className="text-brand-800 text-base">
                    <RiMapPinRangeLine />
                  </span>
                  <span>Shangai, china</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PopularEventFilter
