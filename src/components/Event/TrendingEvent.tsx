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
import { trendingEventData } from '@/components/Event/event.data'
import { RiMapPinRangeLine } from 'react-icons/ri'
import Link from 'next/link'
import Autoplay from 'embla-carousel-autoplay'

const TrendingEvent = () => {
  return (
    <div className="mt-10 md:mt-20 max-w-[1296px] mx-auto ">
      <h4 className="font-semibold text-xl">Trending Events</h4>
      <div className="mt-8">
        <Carousel
          plugins={[Autoplay()]}
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent className="">
            {trendingEventData.map((event) => (
              <CarouselItem
                className="h-[350px] basis-[80%] md:basis-1/2 xl:basis-[309px] rounded-xl relative ml-4"
                key={event.id}
              >
                <Image
                  src={event.src || ''}
                  alt="blockchain-expo"
                  fill
                  priority={
                    event.src === '/images/blockchain-2.png' ? true : false
                  }
                  sizes="80%, (min-width: 768px) 50%, 309px"
                />
                <Link
                  href={`/event/${event.title
                    .toLowerCase()
                    .replace(/ /g, '-')}`}
                  className="absolute left-0 h-full w-full flex flex-col justify-end px-2 py-5"
                >
                  <div className="text-alpha-900">
                    <span className="flex items-center gap-1">
                      <RiMapPinRangeLine />
                      <h5 className="text-sm">{event.location}</h5>
                    </span>
                    <h5 className="text-xl font-semibold">{event.title}</h5>
                    <h5 className="">{event.date}</h5>
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
    </div>
  )
}

export default TrendingEvent
