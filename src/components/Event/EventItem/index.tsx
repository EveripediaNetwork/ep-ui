import { parseDateRange } from '@/lib/utils'
import { TEvents } from '@/services/event'
import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { RiCalendar2Line, RiMapPinRangeLine } from 'react-icons/ri'

type TEventItemProps = {
  event: TEvents
  eventLocation: any
}

const EventItem = (props: TEventItemProps) => {
  const { event, eventLocation } = props
  return (
    <div key={event.id} className="flex group gap-2">
      <Link
        href={`/events/${event.id}`}
        className="relative overflow-hidden cursor-pointer shrink-0 rounded w-[84px] h-[58px] md:w-[113px] md:h-[79px] lg:w-[52px] lg:h-[40px] xl:w-[93px] xl:h-[69px]"
      >
        <Image
          src={getWikiImageUrl(event.images)}
          alt="event image"
          fill
          sizes="(max-width: 760px) 84px, (max-width: 1020px) 113px, (max-width: 1280px) 52px, 93px"
        />
      </Link>
      <div className="flex flex-col gap-2 lg:gap-0 xl:gap-2">
        <Link
          href={`/events/${event.id}`}
          className="font-semibold group-hover:underline text-gray800 dark:text-alpha-900 text-sm lg:text-[9px] leading-none xl:text-sm"
        >
          {event.title}
        </Link>
        <div className="flex text-xs lg:text-[8px] xl:text-xs my-2 text-alpha-900 divide-x divide-alpha-700 items-center">
          <span className="pr-1 xl:pr-2 flex gap-1 items-center">
            <span className="text-brand-800 lg:text-[9px] xl:text-base">
              <RiCalendar2Line />
            </span>
            <span className="text-gray800 dark:text-alpha-900">
              {event.events?.[0].date
                ? parseDateRange(event.events?.[0].date)
                : event.events?.[0].multiDateStart &&
                  event.events?.[0].multiDateEnd
                ? parseDateRange(
                    `${event.events?.[0].multiDateStart}/${event.events?.[0].multiDateEnd}`,
                  )
                : ''}
            </span>
          </span>
          {eventLocation && (
            <span className="pl-1 xl:pr-2 flex gap-1 items-center">
              <span className="text-brand-800 lg:text-[9px] xl:text-base">
                <RiMapPinRangeLine />
              </span>
              <span className="text-gray800 dark:text-alpha-900">
                {eventLocation?.country}
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventItem
