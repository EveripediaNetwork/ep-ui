import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'
import { Wiki } from '@everipedia/iq-utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {
  RiTwitterFill,
  RiFacebookBoxFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
} from 'react-icons/ri'

const EventSummary = ({ event }: { event: Wiki }) => {
  const selected_profiles = [
    'facebook_profile',
    'twitter_profile',
    'linkedln_profile',
    'instagram_profile',
  ]

  const metadata = event.metadata

  const social_profiles = metadata.filter(item =>
    selected_profiles.includes(item.id),
  )

  const referenceElement = metadata.find(element => element.id === 'references')
  let url
  if (referenceElement) url = JSON.parse(referenceElement.value)[0].url

  return (
    <div className="flex flex-col gap-4 border text-gray600 dark:text-alpha-900 border-gray200 dark:border-alpha-300 rounded-lg py-4 px-[14px] md:px-5 md:py-9 lg:py-[9px] lg:px-[7px] xl:py-4 xl:px-3">
      <div className="relative w-full h-[220px] md:h-[377px] lg:h-[173px] xl:h-[305px]">
        <Image
          src={getWikiImageUrl(event.images)}
          fill
          alt="details"
          sizes="(max-width: 540px) 100vw, (max-width: 1040px) 60vw, 20vw"
        />
      </div>
      {url && (
        <Link
          href={`${url}`}
          target="_blank"
          className="bg-brand-500 dark:bg-brand-800 font-semibold text-xs rounded-md text-white flex justify-center py-[14px] lg:py-2 xl:py-[10px] w-full"
        >
          Register/Get Tickets
        </Link>
      )}
      <span className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 text-xs lg:text-[10px] xl:text-xs font-medium rounded-lg bg-gray100 dark:bg-gray700 items-center px-4 lg:px-2 xl:px-4 py-3">
        <span className="col-span-1">Location</span>
        <span className="max-w-[163px] md:max-w-full lg:max-w-[119px] xl:max-w-full">
          Le Carrousel du Louvre (Paris, France)
        </span>
      </span>
      <span className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 text-xs lg:text-[10px] xl:text-xs font-medium rounded-lg bg-gray100 dark:bg-gray700 items-center px-4 lg:px-2 xl:px-4 py-3">
        <span className="col-span-1">Date</span>
        <span>
          {event.events && new Date(event.events?.[0].date).toDateString()}
        </span>
      </span>
      {social_profiles.length > 0 && (
        <span className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 text-xs lg:text-[10px] xl:text-xs font-medium rounded-lg bg-gray100 dark:bg-gray700 items-center px-4 lg:px-2 xl:px-4 py-3">
          <span className="col-span-1">Social profiles</span>
          <span className="flex text-2xl md:text-xl xl:text-2xl items-center gap-1">
            {social_profiles.map(socials => (
              <Link key={socials.id} href={`${socials.value}`} target="_blank">
                {socials.id === 'twitter_profile' ? (
                  <RiTwitterFill className="hover:text-brand-500 dark:hover:text-brand-800 cursor-pointer" />
                ) : socials.id === 'facebook_profile' ? (
                  <RiFacebookBoxFill className="hover:text-brand-500 dark:hover:text-brand-800 cursor-pointer" />
                ) : socials.id === 'instagram_profile' ? (
                  <RiInstagramFill className="hover:text-brand-500 dark:hover:text-brand-800 cursor-pointer" />
                ) : (
                  <RiLinkedinBoxFill className="hover:text-brand-500 dark:hover:text-brand-800 cursor-pointer" />
                )}
              </Link>
            ))}
          </span>
        </span>
      )}
      <span className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 text-xs lg:text-[8px] xl:text-xs font-medium rounded-lg bg-gray100 dark:bg-gray700 items-center px-4 lg:px-2 xl:px-4 py-3">
        <span className="col-span-1">Tags</span>
        <span className="flex flex-1 max-w-[209px] md:col-span-2 lg:col-span-1 md:max-w-full lg:max-w-[150px] xl:max-w-[219px] gap-1 xl:gap-2 flex-wrap">
          {event.tags.map(tag => (
            <span
              key={tag.id}
              className="rounded-full px-2 py-1 border border-gray300 dark:border-alpha-300"
            >
              {tag.id}
            </span>
          ))}
        </span>
      </span>
    </div>
  )
}

export default EventSummary
