import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { skipToken } from '@reduxjs/toolkit/query'
import { NextSeo } from 'next-seo'
import {
  getRunningOperationPromises,
  getWiki,
  getWikisByCategory,
  useGetWikiQuery,
} from '@/services/wikis'
import { store } from '@/store/store'
import { GetServerSideProps } from 'next'
import { HStack, Flex, Spinner, Box } from '@chakra-ui/react'
import WikiActionBar from '@/components/Wiki/WikiPage/WikiActionBar'
import WikiMainContent from '@/components/Wiki/WikiPage/WikiMainContent'
import WikiInsights from '@/components/Wiki/WikiPage/WikiInsights'
import WikiTableOfContents from '@/components/Wiki/WikiPage/WikiTableOfContents'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { getWikiSummary } from '@/utils/getWikiSummary'
import WikiNotFound from '@/components/Wiki/WIkiNotFound/WikiNotFound'
import WikiReferences from '@/components/Wiki/WikiPage/WikiReferences'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import { CommonMetaIds } from '@/types/Wiki'
import { useAppSelector } from '@/store/hook'

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

  // here toc is not state variable since there seems to be some issue
  // with in react-markdown that is causing infinite loop if toc is state variable
  // (so using useEffect to update toc length for now)
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const toc = useAppSelector(state => state.toc)

  React.useEffect(() => {
    setIsTocEmpty(toc.length === 0)
  }, [toc])

  return (
    <>
      {wiki && (
        <NextSeo
          title={wiki.title}
          openGraph={{
            title: wiki.title,
            description: getWikiSummary(wiki),
            images: [
              {
                url: getWikiImageUrl(wiki),
              },
            ],
          }}
        />
      )}

      <main>
        {!error && (router.isFallback || isLoading) ? (
          <Flex justify="center" align="center" h="50vh">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <HStack mt={-2} align="stretch" justify="stretch">
            <Flex
              w="100%"
              justify="space-between"
              direction={{ base: 'column', md: 'row' }}
            >
              <WikiActionBar wiki={wiki} />
              {wiki ? (
                <Box>
                  <Flex
                    w="100%"
                    justify="space-between"
                    direction={{ base: 'column', md: 'row' }}
                  >
                    <WikiMainContent wiki={wiki} />
                    <WikiInsights wiki={wiki} />
                  </Flex>
                  <WikiReferences
                    references={JSON.parse(
                      getWikiMetadataById(wiki, CommonMetaIds.REFERENCES)
                        ?.value || '[]',
                    )}
                  />
                </Box>
              ) : (
                <WikiNotFound />
              )}
            </Flex>
            {!isTocEmpty && <WikiTableOfContents />}
          </HStack>
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
