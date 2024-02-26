import { parseDateRange } from '@/lib/utils'
import { TEvents } from '@/services/event'
import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { RiCalendar2Line, RiMapPinRangeLine } from 'react-icons/ri'

const PopularEventFilter = ({
  popularEvents,
}: {
  popularEvents: TEvents[]
}) => {
  return (
    <div className="">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold md:text-2xl lg:text-base xl:text-xl leading-none">
          Popular Events
        </h2>
        <p
          style={{ lineHeight: '14px' }}
          className="text-sm md:text-base lg:text-[10px] xl:text-xs"
        >
          The most popular crypto events around the world.
        </p>
      </div>
      <div className="border flex flex-col gap-8 bg-white border-gray200 dark:border-alpha-300 dark:bg-gray700 px-[14px] py-[10px] md:px-5 md:py-[18px] lg:px-2 xl:px-3 lg:py-3 xl:py-5 mt-6 rounded-xl">
        {popularEvents.map((event) => (
          <div key={event.id} className="flex gap-2">
            <span className="relative shrink-0 rounded w-[84px] h-[58px] md:w-[113px] md:h-[79px] lg:w-[52px] lg:h-[40px] xl:w-[93px] xl:h-[69px]">
              <Image
                src={getWikiImageUrl(event.images)}
                alt="event image"
                fill
              />
            </span>
            <div className="flex flex-col gap-2 lg:gap-0 xl:gap-2">
              <Link
                href={`/event/${event.id}`}
                className="font-semibold hover:underline text-gray800 dark:text-alpha-900 text-sm lg:text-[9px] leading-none xl:text-sm"
              >
                {event.title}
              </Link>
              <div className="flex text-xs lg:text-[8px] xl:text-xs my-2 text-alpha-900 divide-x divide-alpha-700 items-center">
                <span className="pr-1 xl:pr-2 flex gap-1 items-center">
                  <span className="text-brand-800 lg:text-[9px] xl:text-base">
                    <RiCalendar2Line />
                  </span>
                  <span className="text-gray800 dark:text-alpha-900">
                    {parseDateRange(event.events[0].date)}
                  </span>
                </span>
                <span className="pl-1 xl:pr-2 flex gap-1 items-center">
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
        ))}
      </div>
    </div>
  )
}

export default PopularEventFilter
