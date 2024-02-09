import EventDetails from '@/components/Event/Details/EventDetails'
import EventDetailsBanner from '@/components/Event/Details/EventDetailsBanner'
import EventMedia from '@/components/Event/Details/EventMedia'
import SpeakerDetails from '@/components/Event/Details/SpeakerDetails'
import SponsorDetails from '@/components/Event/Details/SponsorDetails'
import NearbyEventFilter from '@/components/Event/NearbyEventFilter'
import PopularEventFilter from '@/components/Event/PopularEventFilter'
import Image from 'next/image'
import React from 'react'
import {
  RiFacebookBoxFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiTwitterFill,
} from 'react-icons/ri'

const EventDetailsPage = () => {
  const eventType = ['Conference', 'Paid']
  const tags = ['Crypto', 'BTC', 'Ethereun', 'NTFs', 'Blockchain', 'Finance']
  return (
    <div className="mt-10 md:mt-16 mb-48 max-w-[1296px] mx-auto ">
      <h1 className="font-semibold text-4xl text-gray900 dark:text-alpha-900">
        Paris Blockchain Week, 5th Edition
      </h1>
      <div className="flex max-w-[1296px] gap-6 mx-auto mt-5">
        <div className="flex-1 flex flex-col gap-10">
          <EventDetailsBanner />
          <EventDetails />
          <SpeakerDetails />
          <SponsorDetails />
        </div>
        <div className="flex-1 flex flex-col gap-10 xl:max-w-[422px]">
          <div className="flex flex-col gap-4 border text-gray600 border-gray200 rounded-xl py-4 px-3">
            <div className="relative w-full h-[305px]">
              <Image src={'/images/details-2.png'} fill alt="details" />
            </div>
            <button
              type="button"
              className="bg-brand-500 font-semibold text-xs rounded-md text-white flex justify-center py-2 w-full"
            >
              Register/Get Tickets
            </button>
            <span className="flex justify-between text-xs font-medium rounded-lg bg-gray100 items-center px-4 py-3">
              <span>Location</span>
              <span>Le Carrousel du Louvre (Paris, France)</span>
            </span>
            <span className="flex justify-between text-xs font-medium rounded-lg bg-gray100 items-center px-4 py-3">
              <span>Date</span>
              <span>April 8-12, 2024</span>
            </span>
            <span className="flex justify-between text-xs font-medium rounded-lg bg-gray100 items-center px-4 py-3">
              <span>Time</span>
              <span>12:00PM - 7:00PM GMT</span>
            </span>
            <span className="flex justify-between text-xs font-medium rounded-lg bg-gray100 items-center px-4 py-3">
              <span>Social profiles</span>
              <span className="flex text-2xl items-center gap-1">
                <RiTwitterFill />
                <RiFacebookBoxFill />
                <RiInstagramFill />
                <RiLinkedinBoxFill />
              </span>
            </span>
            <span className="flex justify-between text-xs font-medium rounded-lg bg-gray100 items-center px-4 py-3">
              <span>Event type</span>
              <span className="flex gap-2 flex-wrap">
                {eventType.map((type) => (
                  <span
                    key={type}
                    className="rounded-full px-2 py-1 border border-gray300"
                  >
                    {type}
                  </span>
                ))}
              </span>
            </span>
            <span className="flex justify-between text-[10px] font-medium rounded-lg bg-gray100 items-center px-4 py-3">
              <span>Tags</span>
              <span className="flex flex-1 max-w-[199px] gap-2 flex-wrap">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-2 py-1 border border-gray300"
                  >
                    {tag}
                  </span>
                ))}
              </span>
            </span>
          </div>
          <EventMedia />
          <NearbyEventFilter />
          <PopularEventFilter />
        </div>
      </div>
    </div>
  )
}

export default EventDetailsPage
