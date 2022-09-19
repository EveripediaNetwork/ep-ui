import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  getRunningOperationPromises,
  getWiki,
  getWikiCreatorAndEditor,
  getWikisByCategory,
} from '@/services/wikis'
import { store } from '@/store/store'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Box } from '@chakra-ui/react'
import { useAppSelector } from '@/store/hook'
import { WikiHeader } from '@/components/SEO/Wiki'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { WikiMarkup } from '@/components/Wiki/WikiPage/WikiMarkup'
import { Wiki as WikiType } from '@/types/Wiki'
import { incrementWikiViewCount } from '@/services/wikis/utils'

interface WikiProps {
  wiki: WikiType | null
}

const Wiki = ({ wiki }: WikiProps) => {
  const router = useRouter()

  const { slug } = router.query

  const toc = useAppSelector(state => state.toc)

  const [wikiData, setWikiData] = useState(wiki)

  // get the link id if available to scroll to the correct position
  useEffect(() => {
    if (!(toc.length === 0)) {
      const linkId = window.location.hash
      if (linkId) router.push(`/wiki/${slug}${linkId}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toc])

  useEffect(() => {
    const fetchUserDataAndIncView = async () => {
      if (slug && typeof slug === 'string') {
        const { data } = await store.dispatch(
          getWikiCreatorAndEditor.initiate(slug),
        )
        setWikiData(wiki ? { ...wiki, ...data } : null)
        incrementWikiViewCount(slug)
      }
    }
    fetchUserDataAndIncView()
  }, [slug, wiki])

  return (
    <>
      {wikiData && (
        <WikiHeader
          slug={slug as string}
          author={wikiData.author.profile?.username || wikiData.author.id || ''}
          dateModified={wikiData.updated}
          datePublished={wikiData.created}
          title={`${wikiData.title} - ${wikiData?.categories[0]?.title}`}
          description={wikiData.summary}
          mainImage={getWikiImageUrl(wikiData)}
        />
      )}
      <Box as="main" mt={-2}>
        <WikiMarkup wiki={wikiData} />
      </Box>
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

  if (wiki?.hidden) {
    return {
      redirect: {
        destination: `/404/?wiki=${wiki.title}`,
        permanent: false,
      },
    }
  }
  await Promise.all(getRunningOperationPromises())
  return {
    props: { wiki: wiki || null },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

export default Wiki
