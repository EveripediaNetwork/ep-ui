import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from '../ui/carousel'
import Image from 'next/image'
import { RiMapPinRangeLine } from 'react-icons/ri'
import Link from 'next/link'
import Autoplay from 'embla-carousel-autoplay'
import { TEvents } from '@/services/event'
import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'
import { parseDateRange } from '@/lib/utils'
import { useTranslation } from 'next-i18next'

export const TrendingEventsCard = ({ events }: { events: TEvents[] }) => {
  return (
    <div className="mt-2">
      <Carousel
        plugins={[Autoplay()]}
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent className="">
          {events?.map(event => (
            <CarouselItem
              className=" max-[375px]:h-[300px] h-[350px] xl:h-[300px] overflow-hidden basis-[80%] md:basis-[40%] xl:basis-[309px] rounded-xl relative ml-4"
              key={event.id}
            >
              <Image
                src={getWikiImageUrl(event.images)}
                alt="blockchain-expo"
                fill
                priority
                sizes="80%, (min-width: 768px) 50%, 309px"
                className=" object-cover"
              />
              <Link
                href={`/events/${event.title.toLowerCase().replace(/ /g, '-')}`}
                className="absolute left-0 h-full bg-black/30 w-full flex flex-col justify-end px-2 py-5"
              >
                <div className="text-alpha-900">
                  {event.location && (
                    <span className="flex items-center gap-1">
                      <RiMapPinRangeLine />
                      <h5 className="text-sm">{event.location}</h5>
                    </span>
                  )}
                  <h5 className="text-xl font-semibold">{event.title}</h5>
                  <h5 className="">
                    {event?.events?.[0].date
                      ? parseDateRange(event?.events?.[0].date)
                      : event?.events?.[0].multiDateStart &&
                        event?.events?.[0].multiDateEnd
                      ? parseDateRange(
                          `${event?.events?.[0].multiDateStart}/${event?.events?.[0].multiDateEnd}`,
                        )
                      : ''}
                  </h5>
                </div>
                <button
                  type="button"
                  className="px-2 py-[10px] mt-5 text-alpha-900 rounded-[6px] text-xs font-semibold backdrop-blur-[30px] bg-alpha-300 w-fit"
                >
                  View event details
                </button>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="backdrop-blur-[30px] bg-alpha-300" />
        <CarouselNext className="backdrop-blur-[30px] bg-alpha-300" />
        <CarouselDots />
      </Carousel>
    </div>
  )
}

const TrendingEvent = ({ events }: { events: TEvents[] }) => {
  const { t } = useTranslation('event')
  return (
    <div className="mt-6 md:mt-[30px] max-w-[1296px] mx-auto ">
      <h4 className="font-semibold text-xl 2xl:ml-4">
        {t('trendingEventsHeading')}
      </h4>
      {events.length > 4 && <TrendingEventsCard events={events} />}
    </div>
  )
}

export default TrendingEvent
