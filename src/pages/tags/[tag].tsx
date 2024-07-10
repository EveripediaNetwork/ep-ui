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
  HStack,
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
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { RiOrganizationChart } from 'react-icons/ri'

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

  const { t } = useTranslation('tag')
  return (
    <>
      <NextSeo
        title={t('seoTitle') + tagId}
        description={t('seoTitle') + tagId}
        openGraph={{
          title: t('seoTitle') + tagId,
          description: t('seoTitle') + tagId,
        }}
      />
      <Box bgColor="pageBg" mt={-2} border="solid 1px transparent" pb={12}>
        <Heading fontSize={40} width="min(90%, 1200px)" mx="auto" mt={12}>
          {t('title')}
        </Heading>
        <Divider />
        <Box mt={7}>
          <Text fontSize={17} width="min(90%, 1200px)" mx="auto">
            {t('description')}
            <Link mx={1} href={`/tags/${tagId}`} color="brandLinkColor">
              {tagId}
            </Link>
            .{t('description2')}
          </Text>
          <Box fontSize={20} width="min(90%, 1200px)" mx="auto" mt={6}>
            <Link
              href={`/rank/${(tagId)}`}
              as={HStack}
              rounded="md"
              border="solid 1px"
              borderColor="gray.300"
              bgColor="cardBg"
              w='fit-content'
              p={2}
              _hover={{ textDecoration: "none", bgColor: "gray.100" }}
            >
              <RiOrganizationChart />
              <Text fontSize="sm">View on Rank Table</Text>
            </Link>
          </Box>

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
  const locale = context.locale
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
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'tag'])),
      tagId,
      wikis: tagWikis.data || [],
    },
  }
}
export default TagPage
