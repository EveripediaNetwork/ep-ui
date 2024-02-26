import { nearByEventData } from '@/components/Event/event.data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  RiCalendar2Line,
  RiEmotionSadLine,
  RiMapPinRangeLine,
} from 'react-icons/ri'

const NearbyEventFilter = () => {
  return (
    <div className="">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold md:text-2xl lg:text-base xl:text-xl leading-none">
          Nearby Events
        </h2>
        <span
          style={{ lineHeight: '14px' }}
          className="text-sm md:text-base lg:text-[10px] xl:text-xs"
        >
          Noteworthy events that are coming up soon near you.
        </span>
      </div>
      <div className="border flex flex-col gap-8 border-gray200 dark:border-alpha-300 bg-white dark:bg-gray700 px-[14px] py-[10px] md:px-5 md:py-[18px] lg:px-2 xl:px-3 lg:py-3 xl:py-5 mt-6 rounded-xl">
        {nearByEventData.length > 0 && false ? (
          nearByEventData.map((event) => (
            <div
              key={event.title}
              className="flex gap-2 md:gap-4 lg:gap-1 xl:gap-2"
            >
              <span className="relative shrink-0 w-[84px] h-[58px] md:w-[113px] md:h-[79px] lg:w-[52px] lg:h-[40px] xl:w-[93px] xl:h-[69px]">
                <Image src={'/images/event-1.png'} alt="event image" fill />
              </span>
              <div className="flex flex-col gap-2 lg:gap-0 xl:gap-2">
                <Link
                  href={`/event/${event.title
                    .toLowerCase()
                    .replace(/ /g, '-')}`}
                  className="font-semibold hover:underline text-gray800 dark:text-alpha-900 text-sm lg:text-[9px] leading-none xl:text-sm"
                >
                  {event.title}
                </Link>
                <div className="flex text-xs lg:text-[8px] xl:text-xs my-2 text-alpha-900 divide-x divide-alpha-700 items-center">
                  <span className="pr-1 xl:pr-2 flex gap-[2px] xl:gap-1 items-center">
                    <span className="text-brand-800 lg:text-[9px] xl:text-base">
                      <RiCalendar2Line />
                    </span>
                    <span className="text-gray800 dark:text-alpha-900">
                      7th Jan - 7th Apr, 2024
                    </span>
                  </span>
                  <span className="pl-1 xl:pl-2 flex gap-[2px] xl:gap-1 items-center">
                    <span className="text-brand-800 lg:text-[9px] xl:text-base">
                      <RiMapPinRangeLine />
                    </span>
                    <span className="text-gray800 dark:text-alpha-900">
                      Shangai, china
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex justify-center py-11 items-center">
            <div className="flex flex-col items-center gap-1">
              <RiEmotionSadLine size={24} />
              <p className="font-medium text-xs text-center text-gray600 dark:text-alpha-900 max-w-[240px]">
                No nearby events available at the moment. Check back at a later
                time
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NearbyEventFilter
