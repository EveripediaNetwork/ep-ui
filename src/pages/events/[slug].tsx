import EventDetailsContent from '@/components/Event/Details/EventDetailsContent'
import EventSummary from '@/components/Event/Details/EventSummary'
import NearbyEventFilter from '@/components/Event/NearbyEventFilter'
import PopularEventFilter from '@/components/Event/PopularEventFilter'
import { EventHeader } from '@/components/SEO/Event'
import RelatedMediaGrid from '@/components/Wiki/WikiPage/InsightComponents/RelatedMedia'
import { dateFormater } from '@/lib/utils'
import { TEvents, getPopularEvents } from '@/services/event'
import { getWiki } from '@/services/wikis'
import { store } from '@/store/store'
import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'
import { Wiki } from '@everipedia/iq-utils'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

const EventDetailsPage = ({
  event,
  slug,
  popularEvents,
}: {
  event: Wiki
  slug: string
  popularEvents: TEvents[]
}) => {
  return (
    <>
      <EventHeader
        slug={slug}
        author={event.author.profile?.username ?? event.author.id ?? ''}
        dateModified={event.updated}
        datePublished={event.created}
        title={`${event.title} - ${event?.categories[0]?.title}`}
        description={event.summary}
        mainImage={getWikiImageUrl(event.images)}
      />
      <div className="mt-10 md:mt-16 mb-48 px-4 md:px-10 max-w-[1296px] mx-auto ">
        <h1 className="font-semibold capitalize text-2xl xl:text-4xl text-gray900 dark:text-alpha-900">
          {event?.title || 'Paris Blockchain Week, 5th Edition'}
        </h1>
        <div className="flex flex-col lg:flex-row max-w-[1296px] gap-10 md:gap-6 mx-auto mt-5">
          <div className="flex-1 flex flex-col gap-10 md:gap-5 xl:gap-10">
            <EventDetailsContent event={event} />
            <div className="xl:hidden flex flex-col gap-6 mt-10 xl:gap-10">
              <EventSummary event={event} />
              {event.media && event.media.length > 0 && (
                <RelatedMediaGrid media={event.media} />
              )}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-10 md:gap-6 xl:gap-10 lg:max-w-[240px] xl:max-w-[422px]">
            <div className="hidden xl:flex flex-col gap-6 xl:gap-10">
              <EventSummary event={event} />
              {event.media && event.media.length > 0 && (
                <RelatedMediaGrid media={event.media} />
              )}
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-1 gap-10 md:gap-4 lg:gap-10">
              <NearbyEventFilter />
              <PopularEventFilter popularEvents={popularEvents} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const props = {
    ...(await serverSideTranslations(ctx.locale ?? 'en', ['event', 'common'])),
  }

  const slug = ctx.params?.slug
  if (typeof slug !== 'string') return { props: {} }

  const { data: eventDetails, error: eventError } = await store.dispatch(
    getWiki.initiate(slug),
  )
  const { data: popularEvents } = await store.dispatch(
    getPopularEvents.initiate({ startDate: dateFormater(new Date()) }),
  )

  if (eventError)
    throw new Error(
      `There was an error fetching the wiki: ${eventError.message}`,
    )

  if (!eventDetails) {
    return {
      redirect: {
        destination: `/NotFound/?wiki=${slug}`,
        permanent: false,
      },
      props,
    }
  }
  if (eventDetails?.hidden) {
    return {
      redirect: {
        destination: `/404/?wiki=${eventDetails.title}`,
        permanent: false,
      },
      props,
    }
  }

  return {
    props: {
      event: eventDetails,
      popularEvents: popularEvents?.slice(0, 5) || [],
      slug,
      ...props,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

export default EventDetailsPage
