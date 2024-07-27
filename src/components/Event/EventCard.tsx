import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  RiArrowRightUpLine,
  RiCalendar2Line,
  RiMapPinRangeLine,
} from 'react-icons/ri'
import { parseDateRange } from '@/lib/utils'
import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'
import { LoadingEventState } from './LoadingState'
import { CommonMetaIds, Image as ImageType, MData } from '@everipedia/iq-utils'
import { useRouter } from 'next/router'

type TSpeaker = {
  id: string
  images: ImageType[]
}

type TEventsDate = {
  type: string
  date: string | null
  multiDateStart: string | null
  multiDateEnd: string | null
}

type TEventDetails = {
  id: string
  title: string
  location?: MData[]
  date: TEventsDate
  tags: { id: string }[]
  excerpt: string
  speakers: TSpeaker[]
  images: { id: string; type: string }[]
  isLoading: boolean
}

const EventCard = ({
  id,
  title,
  location,
  date,
  tags,
  excerpt,
  speakers,
  images,
  isLoading,
}: TEventDetails) => {
  const router = useRouter()
  const locationMeta = location?.find((m) => m.id === CommonMetaIds.LOCATION)
  const parsedLocation = locationMeta ? JSON.parse(locationMeta.value) : ''
  const eventLocation = Array.isArray(parsedLocation)
    ? parsedLocation.find(
        (item) =>
          new Date(item?.year).getFullYear() === new Date().getFullYear(),
      )
    : parsedLocation
  return (
    <div className="flex gap-2 md:gap-6">
      <span className="rounded-full z-10 w-6 h-6 text-white bg-brand-500 dark:bg-brand-800 flex justify-center items-center">
        <RiArrowRightUpLine />
      </span>
      {isLoading ? (
        <LoadingEventState />
      ) : (
        <Link
          href={`/events/${id}`}
          className="border border-gray200 group cursor-pointer dark:border-alpha-300 bg-white dark:bg-gray700 rounded-xl px-3 md:px-5 h-fit py-[14px] w-full flex flex-col-reverse md:flex-row gap-2 md:gap-9"
        >
          <div className="flex flex-col flex-1">
            <div className="flex flex-col">
              <h3 className="font-semibold text-sm group-hover:underline dark:text-alpha-900 w-fit hover:underline text-gray800">
                {title}
              </h3>
              <p className="text-xs text-gray600 dark:text-alpha-800 mt-1">
                {excerpt}
              </p>
              <div className="flex text-xs md:text-xs my-2 divide-x items-center">
                <span className="pr-2 flex gap-1 items-center">
                  <span className="text-brand-800 ">
                    <RiCalendar2Line />
                  </span>
                  <span>
                    {date.date
                      ? parseDateRange(date.date)
                      : date.multiDateStart && date.multiDateEnd
                      ? parseDateRange(
                          `${date.multiDateStart}/${date.multiDateEnd}`,
                        )
                      : ''}
                  </span>
                </span>
                {eventLocation && (
                  <span className="pl-2 flex gap-1 items-center">
                    <span className="text-brand-800 ">
                      <RiMapPinRangeLine />
                    </span>
                    <span>{eventLocation?.country}</span>
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2 mb-2 items-center leading-none">
              <div className="flex">
                {speakers?.map((speaker) => (
                  <div
                    key={speaker.id}
                    className="relative w-5 h-5 shrink-0 overflow-hidden -mx-[2px] rounded-full border border-white dark:border-gray700"
                  >
                    <Image
                      src={getWikiImageUrl(speaker.images)}
                      alt="user-icon"
                      fill
                    />
                  </div>
                ))}
              </div>
              <span className="text-brand-500 dark:text-brand-800 flex gap-1 flex-wrap text-[10px] md:text-xs">
                {speakers?.map((speaker, index) => (
                  <Link
                    href={`/wiki/${speaker.id}`}
                    key={speaker.id}
                    className="hover:underline capitalize"
                  >
                    {speaker.id}
                    {speakers.length !== index + 1 && ','}
                  </Link>
                ))}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1 md:gap-3">
              {tags?.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    router.push(`?tags=${tag.id}`)
                  }}
                  className="px-[6px] md:px-3 text-xs md:text-xs py-1 hover:bg-gray200 dark:hover:bg-alpha-300 border dark:border-alpha-300 border-gray300 rounded-[100px]"
                >
                  {tag.id}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full md:w-[140px] xl:h-[117px] h-full">
            <div className="relative rounded-lg overflow-hidden w-full md:w-[140px] h-[153px] md:h-[97px]">
              <Image
                src={getWikiImageUrl(images)}
                alt=""
                fill
                sizes="100%, (min-width: 768px) 140px"
                className=" object-cover"
              />
            </div>
          </div>
        </Link>
      )}
    </div>
  )
}

export default EventCard
