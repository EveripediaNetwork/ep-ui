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
import { useRouter } from 'next/router'
import { LoadingEventState } from './LoadingState'
type TEventDetails = {
  id: string
  title: string
  location: string
  date: string
  tags: { id: string }[]
  excerpt: string
  speakers: string[]
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
  return (
    <div
      onKeyDown={() => router.push(`/event/${id}`)}
      className="flex gap-2 md:gap-6"
    >
      <span className="rounded-full z-10 w-6 h-6 text-white bg-brand-500 dark:bg-brand-800 flex justify-center items-center">
        <RiArrowRightUpLine />
      </span>
      {isLoading ? (
        <LoadingEventState />
      ) : (
        <div className="border border-gray200 dark:border-alpha-300 bg-white dark:bg-gray700 rounded-xl px-3 md:px-5 h-fit py-[14px] w-full flex flex-col-reverse md:flex-row gap-2 md:gap-9">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <Link
                href={`/event/${id}`}
                className="font-semibold text-sm dark:text-alpha-900 w-fit hover:underline text-gray800"
              >
                {title}
              </Link>
              <p className="text-xs text-gray600 dark:text-alpha-800 mt-1">
                {excerpt}
              </p>
              <div className="flex text-[10px] md:text-xs my-2 divide-x items-center">
                <span className="pr-2 flex gap-1 items-center">
                  <span className="text-brand-800 ">
                    <RiCalendar2Line />
                  </span>
                  <span>{parseDateRange(date)}</span>
                </span>
                <span className="pl-2 flex gap-1 items-center">
                  <span className="text-brand-800 ">
                    <RiMapPinRangeLine />
                  </span>
                  <span>{location}</span>
                </span>
              </div>
            </div>
            <div className="flex gap-3 mb-2 leading-none">
              <div className="flex">
                {/* {speakers?.map((speaker) => (
                <div
                  key={speaker}
                  className="relative w-5 h-5 shrink-0 -mx-[2px] rounded-full border border-white dark:border-gray700"
                >
                  <Image src={speaker.imageSrc} alt="user-icon" fill />
                </div>
              ))} */}
              </div>
              <span className="text-brand-500 dark:text-brand-800 flex gap-1 flex-wrap text-[10px] md:text-xs">
                {speakers?.map((speaker, index) => (
                  <Link
                    href={`/wiki/${speaker}`}
                    key={speaker}
                    className="hover:underline"
                  >
                    {speaker}
                    {speakers.length !== index + 1 && ','}
                  </Link>
                ))}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              {tags?.map(tag => (
                <div
                  key={tag.id}
                  className="px-2 md:px-3 text-[8px] md:text-xs py-1 border dark:border-alpha-300 border-gray300 rounded-[100px]"
                >
                  {tag.id}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-[140px] xl:h-[117px] h-full">
            <div className="relative rounded-lg overflow-hidden w-full md:w-[140px] h-[153px] md:h-[97px]">
              <Image src={getWikiImageUrl(images)} alt="" fill />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventCard
