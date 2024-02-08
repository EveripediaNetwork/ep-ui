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
import { eventMockData } from '@/components/Event/event.data'
import { RiMapPinRangeLine } from 'react-icons/ri'

const TrendingEvent = () => {
  return (
    <div className="mt-20 max-w-[1296px] mx-auto px-10 xl:px-0">
      <h4 className="font-semibold text-xl">Trending Events</h4>
      <div className="mt-8">
        <Carousel>
          <CarouselContent className="">
            {eventMockData.map((event) => (
              <CarouselItem
                className="h-[350px] basis-1/2 xl:basis-1/4 rounded-xl relative w-full ml-4"
                key={event.id}
              >
                <Image src={event.src} alt="blockchain-expo" fill />
                <div className="absolute left-0 h-full w-full flex flex-col justify-end px-2 py-5">
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
                    className="px-2 py-[10px] mt-5 text-alpha-900 rounded-[6px] font-semibold backdrop-blur-[30px] bg-alpha-300 w-fit"
                  >
                    View event details
                  </button>
                </div>
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
