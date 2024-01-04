import React, { useEffect } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import {
  Divider,
  Box,
  Heading,
  SimpleGrid,
  Text,
  Center,
  Spinner,
} from '@chakra-ui/react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { store } from '@/store/store'
import WikiPreviewCard from '@/components/Wiki/WikiPreviewCard/WikiPreviewCard'
import { getTagWikis, wikiApi } from '@/services/wikis'
import Link from '@/components/Elements/LinkElements/Link'
import { Wiki } from '@everipedia/iq-utils'
import { useRouter } from 'next/router'
import { ITEM_PER_PAGE } from '@/data/Constants'
import { useTranslation } from 'next-i18next'
import { useInfiniteData } from '@/hooks/useInfiniteData'

interface TagPageProps {
  tagId: string
  wikis: Wiki[]
}
const TagPage: NextPage<TagPageProps> = ({ tagId, wikis }: TagPageProps) => {
  const router = useRouter()
  const tag = router.query.tag as string
  const {
    data: wikisByTag,
    setData: setWikisByTag,
    setHasMore,
    fetcher: fetchMoreWikis,
    loading,
    setLoading,
    hasMore,
    setOffset,
  } = useInfiniteData<Wiki>({
    initiator: getTagWikis,
    arg: { id: tag },
  })

  useEffect(() => {
    setHasMore(true)
    setOffset(0)
    setWikisByTag(wikis)
    if (wikis.length < ITEM_PER_PAGE) {
      setHasMore(false)
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag, wikis])

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasMore,
    onLoadMore: fetchMoreWikis,
  })
  const { t } = useTranslation()
  return (
    <>
      <NextSeo
        title={`result for ${tagId}`}
        description={`Wikis with ${tagId} tag`}
        openGraph={{
          title: `result for ${tagId}`,
          description: `Wikis with ${tagId} tag`,
        }}
      />
      <Box bgColor="pageBg" mt={-2} border="solid 1px transparent" pb={12}>
        <Heading fontSize={40} width="min(90%, 1200px)" mx="auto" mt={12}>
          Wikis with this tag
        </Heading>

        <Divider />
        <Box mt={7}>
          <Text fontSize={17} width="min(90%, 1200px)" mx="auto">
            You are seeing the wikis that are tagged with
            <Link mx={1} href={`/tags/${tagId}`} color="brandLinkColor">
              {tagId}
            </Link>
            . If you are interested in seeing other topics in common, you can
            click on other tags.
          </Text>

          <SimpleGrid
            columns={{ base: 1, sm: 2, lg: 3 }}
            width="min(90%, 1200px)"
            mt={17}
            mx="auto"
            mb={12}
            gap={8}
          >
            {wikisByTag.map((wiki, i) => (
              <Box key={i} w="100%">
                <WikiPreviewCard wiki={wiki} />
              </Box>
            ))}
          </SimpleGrid>
          {loading || hasMore ? (
            <Center ref={sentryRef} mt="10" w="full" h="16">
              <Spinner size="xl" />
            </Center>
          ) : (
            <Center mt="10">
              <Text fontWeight="semibold">{t('seenItAll')}</Text>
            </Center>
          )}
        </Box>
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tagId: string = context.params?.tag as string
  const tagWikis = await store.dispatch(
    getTagWikis.initiate({ id: tagId, offset: 0, limit: ITEM_PER_PAGE }),
  )
  await Promise.all(store.dispatch(wikiApi.util.getRunningQueriesThunk()))
  if (!tagWikis.data?.length) {
    return {
      redirect: {
        destination: `/NotFound/?tags=${tagId}`,
        permanent: false,
      },
    }
  }
  return {
    props: {
      tagId,
      wikis: tagWikis.data || [],
    },
  }
}
export default TagPage
