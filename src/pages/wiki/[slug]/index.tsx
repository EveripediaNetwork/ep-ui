import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getWiki, getWikiCreatorAndEditor } from '@/services/wikis'
import { store } from '@/store/store'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Box } from '@chakra-ui/react'
import { WikiHeader } from '@/components/SEO/Wiki'
import { WikiMarkup } from '@/components/Wiki/WikiPage/WikiMarkup'
import { Wiki as WikiType } from '@everipedia/iq-utils'
import { incrementWikiViewCount } from '@/services/wikis/utils'
import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'

interface WikiProps {
  wiki: WikiType
}

const Wiki = ({ wiki }: WikiProps) => {
  const router = useRouter()
  const { slug } = router.query as { slug: string }

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
          slug={slug as string}
          author={wiki.author.profile?.username || wiki.author.id || ''}
          dateModified={wiki.updated}
          datePublished={wiki.created}
          title={`${wiki.title} - ${wiki?.categories[0]?.title}`}
          description={wiki.summary}
          mainImage={getWikiImageUrl(wiki.images)}
        />
      )}
      <Box as="main" mt={-2}>
        <WikiMarkup wiki={wiki} />
      </Box>
    </>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const slug = context.params?.slug
  if (typeof slug !== 'string') return { props: {} }

  const { data: wiki, error: wikiError } = await store.dispatch(
    getWiki.initiate(slug),
  )

  if (wikiError)
    throw new Error(`There was an error fetching the wiki: ${wikiError}`)

  if (wiki?.hidden) {
    return {
      redirect: {
        destination: `/404/?wiki=${wiki.title}`,
        permanent: false,
      },
    }
  }

  // TODO: probably can be async in the components
  const { data } = await store.dispatch(getWikiCreatorAndEditor.initiate(slug))
  if (!wiki) {
    return {
      redirect: {
        destination: `/NotFound/?wiki=${slug}`,
        permanent: false,
      },
    }
  }
  return {
    props: { wiki: { ...wiki, ...data } },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

export default Wiki
