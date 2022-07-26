import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  getRunningOperationPromises,
  getWiki,
  getWikisByCategory,
} from '@/services/wikis'
import { store } from '@/store/store'
import { GetServerSideProps } from 'next'
import { Box } from '@chakra-ui/react'
import { useAppSelector } from '@/store/hook'
import { WikiHeader } from '@/components/SEO/Wiki'
import { getWikiSummary } from '@/utils/getWikiSummary'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { WikiMarkup } from '@/components/Wiki/WikiPage/WikiMarkup'
import { Wiki as WikiType } from '@/types/Wiki'

interface WikiProps {
  wiki: WikiType
}

const Wiki = ({ wiki }: WikiProps) => {
  const router = useRouter()

  const { slug } = router.query

  const [isTocEmpty, setIsTocEmpty] = React.useState<boolean>(true)

  // get the link id if available to scroll to the correct position
  useEffect(() => {
    if (!isTocEmpty) {
      const linkId = window.location.hash
      if (linkId) router.push(`/wiki/${slug}${linkId}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTocEmpty])

  const toc = useAppSelector(state => state.toc)

  useEffect(() => {
    setIsTocEmpty(toc.length === 0)
  }, [toc])
  return (
    <>
      {wiki && (
        <WikiHeader
          title={`${wiki.title} - ${wiki?.categories[0]?.title}`}
          description={getWikiSummary(wiki)}
          mainImage={getWikiImageUrl(wiki)}
        />
      )}
      <main>
        <Box mt={-2}>
          <WikiMarkup wiki={wiki} isTocEmpty={isTocEmpty} />
        </Box>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
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

export default Wiki
