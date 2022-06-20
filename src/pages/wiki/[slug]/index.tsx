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
import { HStack, Flex, Spinner, Box, Heading } from '@chakra-ui/react'
import WikiActionBar from '@/components/Wiki/WikiPage/WikiActionBar'
import WikiMainContent from '@/components/Wiki/WikiPage/WikiMainContent'
import WikiInsights from '@/components/Wiki/WikiPage/WikiInsights'
import WikiTableOfContents from '@/components/Wiki/WikiPage/WikiTableOfContents'
import WikiNotFound from '@/components/Wiki/WIkiNotFound/WikiNotFound'
import WikiReferences from '@/components/Wiki/WikiPage/WikiReferences'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import { BaseCategory, CommonMetaIds, Media } from '@/types/Wiki'
import { useAppSelector } from '@/store/hook'
import { WikiHeader } from '@/components/SEO/Wiki'
import { getWikiSummary } from '@/utils/getWikiSummary'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import RelatedMediaGrid from '@/components/Wiki/WikiPage/InsightComponents/RelatedMedia'
import { RelatedWikis } from '@/components/Wiki/WikiPage/InsightComponents/RelatedWikis'
import TwitterTimeline from '@/components/Wiki/WikiPage/InsightComponents/TwitterTimeline'

const MobileMeta = (wiki: {
  metadata: { id: string; value: string }[]
  categories: BaseCategory[]
  media?: Media[]
}) => {
  const { metadata, categories, media } = wiki
  const twitterLink = metadata.find(
    meta => meta.id === CommonMetaIds.TWITTER_PROFILE,
  )?.value

  return (
    <Flex
      p={4}
      mx={{ base: 'auto', md: 0 }}
      w={{ base: '100%', md: '50%', lg: '40%', '2xl': '50%' }}
      display={{ base: 'block', lg: 'none' }}
      flexDirection="row"
    >
      {!!twitterLink && <TwitterTimeline url={twitterLink} />}
      {categories?.length !== 0 && <RelatedWikis categories={categories} />}
      {media && media.length > 0 && <RelatedMediaGrid media={media} />}
    </Flex>
  )
}

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
          <HStack mt={-2} align="stretch" justify="stretch">
            <Flex
              w="100%"
              justify="space-between"
              direction={{ base: 'column', md: 'row' }}
            >
              <WikiActionBar wiki={wiki} />
              {wiki ? (
                <Box w="100%">
                  <Flex
                    w="100%"
                    justify="space-between"
                    direction={{ base: 'column-reverse', md: 'row' }}
                  >
                    <WikiMainContent wiki={wiki} />
                    <WikiInsights wiki={wiki} />
                    <Heading
                      mt={8}
                      mb={-4}
                      display={{ base: 'block', md: 'none' }}
                      textAlign="center"
                      px={4}
                    >
                      {wiki?.title}
                    </Heading>
                  </Flex>
                  <RelatedMediaGrid media={wiki.media} />
                  <Flex display={{ base: 'block', md: 'none' }}>
                    <MobileMeta
                      metadata={wiki.metadata}
                      categories={wiki.categories}
                      media={wiki.media}
                    />
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
