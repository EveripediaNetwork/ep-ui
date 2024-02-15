import EventDetails from '@/components/Event/Details/EventDetails'
import EventDetailsBanner from '@/components/Event/Details/EventDetailsBanner'
import EventMedia from '@/components/Event/Details/EventMedia'
import EventSummary from '@/components/Event/Details/EventSummary'
import SpeakerDetails from '@/components/Event/Details/SpeakerDetails'
import SponsorDetails from '@/components/Event/Details/SponsorDetails'
import NearbyEventFilter from '@/components/Event/NearbyEventFilter'
import PopularEventFilter from '@/components/Event/PopularEventFilter'
import EventHeader from '@/components/SEO/Event'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

const EventDetailsPage = ({ event }: { event: string }) => {
  return (
    <>
      <EventHeader />
      <div className="mt-10 md:mt-16 mb-48 px-4 md:px-10 max-w-[1296px] mx-auto ">
        <h1 className="font-semibold capitalize text-2xl xl:text-4xl text-gray900 dark:text-alpha-900">
          {event.replace(/-/g, ' ')}
        </h1>
        <div className="flex flex-col lg:flex-row max-w-[1296px] gap-10 md:gap-6 mx-auto mt-5">
          <div className="flex-1 flex flex-col gap-10 md:gap-5 xl:gap-10">
            <EventDetailsBanner />
            <div className="xl:hidden flex flex-col gap-6 mt-10 xl:gap-10">
              <EventSummary />
              <EventMedia />
            </div>
            <EventDetails />
            <SpeakerDetails />
            <SponsorDetails />
          </div>
          <div className="flex-1 flex flex-col gap-10 md:gap-6 xl:gap-10 lg:max-w-[240px] xl:max-w-[422px]">
            <div className="hidden xl:flex flex-col gap-6 xl:gap-10">
              <EventSummary />
              <EventMedia />
            </div>
            <NearbyEventFilter />
            <PopularEventFilter />
          </div>
        </div>
      </div>
    </>
  )
}

export default EventDetailsPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { event } = ctx.query as {
    event: string
  }
  return {
    props: {
      event,
      ...(await serverSideTranslations(ctx.locale ?? 'en', [
        'event',
        'common',
      ])),
    },
  }
}
