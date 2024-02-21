import { EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import { trendingEventData } from '../Event/event.data'
import Image from 'next/image'
import { RiMapPinRangeLine } from 'react-icons/ri'
import Autoplay from 'embla-carousel-autoplay'

const EventOverview = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay()],
  )
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])
  return (
    <div className="max-w-[1296px] mx-auto py-24 px-4">
      <h2 className="text-2xl max-w-[350px] mx-auto md:max-w-full md:text-4xl font-semibold text-center">
        Blockchain and Cryptocurrency Events
      </h2>
      <div className="grid md:grid-cols-2 gap-14 mt-10">
        <div className="flex items-center">
          <div className="flex flex-col gap-10">
            <p className="text-center md:text-start text-sm md:text-base">
              Learn from the industry experts on crypto trends, explore
              investment opportunities, network with potential partners, connect
              with like-minded individuals, and cultivate relationships for
              future collaborations at global blockchain and crypto events and
              conferences.
            </p>
            <Link
              href={'/event'}
              className="border hidden md:block border-gray300 w-fit text-xs font-semibold rounded-md py-3 px-5"
            >
              View Events
            </Link>
          </div>
        </div>
        <div>
          <div className="overflow-hidden px-4 md:px-0" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {trendingEventData.map((event) => (
                <div
                  key={event.id}
                  className="h-[350px] flex-[0_0_100%] xl:flex-[0_0_60%] rounded-xl relative ml-4"
                >
                  <Image src={event.src || ''} alt="blockchain-expo" fill />
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
                </div>
              ))}
            </div>
            <div className="flex justify-center p-4">
              {scrollSnaps.map((_, index) => (
                <button
                  type="button"
                  key={index}
                  className={`h-[6px] w-[6px] mx-1 rounded-full ${
                    selectedIndex === index
                      ? 'bg-[#FF5CAA] dark:bg-[#FF1A88]'
                      : 'bg-brand-100'
                  }`}
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <Link
              href={'/event'}
              className="border md:hidden block mt-8 border-gray300 w-fit mx-auto text-xs font-semibold rounded-md py-3 px-5"
            >
              View Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventOverview
