import type { TGraphQLError } from '@/components/CreateWiki/CreateWikiTopBar/WikiPublish/WikiPublishButton'
import EventDetailsContent from '@/components/Event/Details/EventDetailsContent'
import EventSummary from '@/components/Event/Details/EventSummary'
import NearbyEventFilter from '@/components/Event/NearbyEventFilter'
import PopularEventFilter from '@/components/Event/PopularEventFilter'
import { EventHeader } from '@/components/SEO/Event'
import RelatedMediaGrid from '@/components/Wiki/WikiPage/InsightComponents/RelatedMedia'
import WikiReferences from '@/components/Wiki/WikiPage/WikiReferences'
import { type TEvents, getPopularEvents } from '@/services/event'
import { useGetIpDetailsQuery } from '@/services/location'
import { getWiki } from '@/services/wikis'
import { store } from '@/store/store'
import { getWikiMetadataById } from '@/utils/WikiUtils/getWikiFields'
import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'
import { CommonMetaIds, type Wiki } from '@everipedia/iq-utils'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import type { CiteReference } from '@everipedia/iq-utils'

const EventDetailsPage = ({
  event,
  slug,
  popularEvents,
}: {
  event: Wiki
  slug: string
  popularEvents: TEvents[]
}) => {
  const { data: countryName } = useGetIpDetailsQuery()

  const referencesRaw =
    getWikiMetadataById(event, CommonMetaIds.REFERENCES)?.value ?? '[]'
  let references: CiteReference[]

  try {
    references = JSON.parse(referencesRaw)
  } catch (e) {
    console.error('Failed to parse JSON:', e)
    references = []
  }
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
        <div className="flex flex-col lg:flex-row max-w-[1296px] gap-10 md:gap-6 mx-auto my-5">
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
              <NearbyEventFilter countryName={countryName ?? ''} />
              <PopularEventFilter popularEvents={popularEvents} />
            </div>
          </div>
        </div>
        <WikiReferences references={references} />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const props = {
    ...(await serverSideTranslations(ctx.locale ?? 'en', [
      'event',
      'common',
      'wiki',
      'revision',
    ])),
  }

  const slug = ctx.params?.slug
  if (typeof slug !== 'string') return { props: {} }

  const { data: eventDetails, error: eventError } = (await store.dispatch(
    getWiki.initiate(slug),
  )) as { data: Wiki | undefined; error: TGraphQLError }
  const { data: popularEvents } = await store.dispatch(
    getPopularEvents.initiate({ offset: 0, limit: 4 }),
  )

  if (eventError)
    throw new Error(
      `There was an error fetching the wiki: ${eventError.error?.message}`,
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
      popularEvents: popularEvents || [],
      slug,
      ...props,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

export default EventDetailsPage
