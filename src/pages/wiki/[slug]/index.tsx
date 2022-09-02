import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  getRunningOperationPromises,
  getWiki,
  getWikisByCategory,
} from '@/services/wikis'
import { store } from '@/store/store'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Box } from '@chakra-ui/react'
import { useAppSelector } from '@/store/hook'
import { WikiHeader } from '@/components/SEO/Wiki'
import { getWikiSummary } from '@/utils/getWikiSummary'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { WikiMarkup } from '@/components/Wiki/WikiPage/WikiMarkup'
import { Wiki as WikiType } from '@/types/Wiki'
import { incrementWikiViewCount } from '@/services/wikis/utils'

interface WikiProps {
  wiki: WikiType
}

const Wiki = ({ wiki }: WikiProps) => {
  const router = useRouter()

  const { slug } = router.query

  const toc = useAppSelector(state => state.toc)

  // get the link id if available to scroll to the correct position
  useEffect(() => {
    if (!(toc.length === 0)) {
      const linkId = window.location.hash
      if (linkId) router.push(`/wiki/${slug}${linkId}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toc])

  useEffect(() => {
    if (slug && typeof slug === 'string') {
      incrementWikiViewCount(slug)
    }
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
          description={getWikiSummary(wiki)}
          mainImage={getWikiImageUrl(wiki)}
        />
      )}
      <main>
        <Box mt={-2}>
          <WikiMarkup wiki={wiki} />
        </Box>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const slug = context.params?.slug
  if (typeof slug !== 'string') return { props: {} }
  const { data: wiki } = await store.dispatch(getWiki.initiate(slug))

  wiki?.categories.map(category =>
    getWikisByCategory.initiate({ category: category.id }),
  )

  await Promise.all(getRunningOperationPromises())
  return {
    props: { wiki },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true }
}

export default Wiki
