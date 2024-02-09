import EventDetails from '@/components/Event/Details/EventDetails'
import EventDetailsBanner from '@/components/Event/Details/EventDetailsBanner'
import EventMedia from '@/components/Event/Details/EventMedia'
import EventSummary from '@/components/Event/Details/EventSummary'
import SpeakerDetails from '@/components/Event/Details/SpeakerDetails'
import SponsorDetails from '@/components/Event/Details/SponsorDetails'
import NearbyEventFilter from '@/components/Event/NearbyEventFilter'
import PopularEventFilter from '@/components/Event/PopularEventFilter'
import React from 'react'

const EventDetailsPage = () => {
  return (
    <div className="mt-10 md:mt-16 mb-48 px-4 md:px-10 max-w-[1296px] mx-auto ">
      <h1 className="font-semibold text-2xl xl:text-4xl text-gray900 dark:text-alpha-900">
        Paris Blockchain Week, 5th Edition
      </h1>
      <div className="flex flex-col md:flex-row max-w-[1296px] gap-10 md:gap-6 mx-auto mt-5">
        <div className="flex-1 flex flex-col gap-10 md:gap-5 xl:gap-10">
          <EventDetailsBanner />
          <div className="md:hidden flex flex-col gap-6 xl:gap-10">
            <EventSummary />
            <EventMedia />
          </div>
          <EventDetails />
          <SpeakerDetails />
          <SponsorDetails />
        </div>
        <div className="flex-1 flex flex-col gap-10 md:gap-6 xl:gap-10 md:max-w-[240px] xl:max-w-[422px]">
          <div className="hidden md:flex flex-col gap-6 xl:gap-10">
            <EventSummary />
            <EventMedia />
          </div>
          <NearbyEventFilter />
          <PopularEventFilter />
        </div>
      </div>
    </div>
  )
}

export default EventDetailsPage
