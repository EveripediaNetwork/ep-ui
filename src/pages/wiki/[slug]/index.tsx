import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { skipToken } from '@reduxjs/toolkit/query'
import {
  getRunningOperationPromises,
  getWiki,
  getWikisByCategory,
  useGetWikiQuery,
} from '@/services/wikis'
import { store } from '@/store/store'
import { GetServerSideProps } from 'next'
import { Box, Flex, Spinner } from '@chakra-ui/react'
import { useAppSelector } from '@/store/hook'
import { WikiHeader } from '@/components/SEO/Wiki'
import { getWikiSummary } from '@/utils/getWikiSummary'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { WikiMarkup } from '@/components/Wiki/WikiPage/WikiMarkup'

const Wiki = () => {
  const router = useRouter()

  const { slug } = router.query

  const result = useGetWikiQuery(typeof slug === 'string' ? slug : skipToken, {
    skip: router.isFallback,
  })
  const { isLoading, error, data: wiki } = result
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

  const [mounted, setMounted] = useState(false)

  useEffect(function mountApp() {
    setMounted(true)
  }, [])

  if (!mounted)
    return (
      wiki && (
        <WikiHeader
          title={wiki.title}
          description={getWikiSummary(wiki)}
          mainImage={getWikiImageUrl(wiki)}
        />
      )
    )

  return (
    <>
      {wiki && (
        <WikiHeader
          title={wiki.title}
          description={getWikiSummary(wiki)}
          mainImage={getWikiImageUrl(wiki)}
        />
      )}
      <main>
        {!error && (router.isFallback || isLoading) ? (
          <Flex justify="center" align="center" h="50vh">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <Box mt={-2}>
            <WikiMarkup wiki={wiki} isTocEmpty={isTocEmpty} />
          </Box>
        )}
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const slug = context.params?.slug
  if (typeof slug === 'string') {
    store.dispatch(getWiki.initiate(slug)).then(res => {
      res?.data?.categories.map(category =>
        getWikisByCategory.initiate({ category: category.id }),
      )
    })
  }
  await Promise.all(getRunningOperationPromises())
  return {
    props: {},
  }
}

export default Wiki
