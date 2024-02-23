import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getWiki, getWikiCreatorAndEditor } from '@/services/wikis'
import { store } from '@/store/store'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Box, useBreakpointValue } from '@chakra-ui/react'
import { WikiHeader } from '@/components/SEO/Wiki'
import { WikiMarkup } from '@/components/Wiki/WikiPage/WikiMarkup'
import { Wiki as WikiType } from '@everipedia/iq-utils'
import { incrementWikiViewCount } from '@/services/wikis/utils'
import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { averageRating } from '@/services/admin'

interface WikiProps {
  wiki: WikiType
  average?: number
  totalRatings?: number
}

const Wiki = ({ wiki, average, totalRatings }: WikiProps) => {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { slug } = router.query as { slug: string }
  const breakpoint = useBreakpointValue(
    { base: 'base', md: 'md', xl: 'xl', '2xl': '2xl' },
    { fallback: '2xl' },
  )
  useEffect(() => {
    if (scrollRef.current && breakpoint === 'base') {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [breakpoint])

  useEffect(() => {
    const fetchUserDataAndIncView = async () => {
      if (slug) {
        incrementWikiViewCount(slug)
      }
    }
    fetchUserDataAndIncView()
  }, [slug])

  return (
    <>
      {wiki && (
        <WikiHeader
          slug={slug}
          author={wiki.author.profile?.username ?? wiki.author.id ?? ''}
          dateModified={wiki.updated}
          datePublished={wiki.created}
          title={`${wiki.title} - ${wiki?.categories[0]?.title}`}
          description={wiki.summary}
          mainImage={getWikiImageUrl(wiki.images)}
          avgRating={average}
          totalRatings={totalRatings}
        />
      )}
      <Box as="main" mt={-2} ref={scrollRef}>
        <WikiMarkup wiki={wiki} />
      </Box>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const props = {
    ...(await serverSideTranslations(context.locale ?? 'en', [
      'revision',
      'wiki',
      'common',
    ])),
  }

  const slug = context.params?.slug
  if (typeof slug !== 'string') return { props: {} }

  const { data: wiki, error: wikiError } = await store.dispatch(
    getWiki.initiate(slug),
  )

  if (wikiError)
    throw new Error(
      `There was an error fetching the wiki: ${wikiError.message}`,
    )

  if (wiki?.hidden) {
    return {
      redirect: {
        destination: `/404/?wiki=${wiki.title}`,
        permanent: false,
      },
      props,
    }
  }

  const { data: ratingData } = await store.dispatch(
    averageRating.initiate(slug),
  )
  const average = ratingData?.average ?? null
  const totalRatings = ratingData?.votes ?? null

  // TODO: probably can be async in the components
  const { data } = await store.dispatch(getWikiCreatorAndEditor.initiate(slug))

  if (!wiki) {
    return {
      redirect: {
        destination: `/NotFound/?wiki=${slug}`,
        permanent: false,
      },
      props,
    }
  }
  return {
    props: {
      wiki: { ...wiki, ...data },
      average,
      totalRatings,
      ...props,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

export default Wiki
