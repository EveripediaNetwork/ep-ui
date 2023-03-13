import React, { useEffect } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import {
  Divider,
  Box,
  SimpleGrid,
  Text,
  Button,
  Center,
  Spinner,
} from '@chakra-ui/react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { getCategoriesById } from '@/services/categories'
import { store } from '@/store/store'
import { Category } from '@/types/CategoryDataTypes'
import WikiPreviewCard from '@/components/Wiki/WikiPreviewCard/WikiPreviewCard'
import {
  getTrendingCategoryWikis,
  getWikiActivityByCategory,
  getWikisByCategory,
  wikiApi,
} from '@/services/wikis'
import { Wiki } from '@everipedia/iq-utils'
import { useRouter } from 'next/router'
import { ITEM_PER_PAGE } from '@/data/Constants'
import { useTranslation } from 'react-i18next'
import { useInfiniteData } from '@/hooks/useInfiniteData'
import CategoryHero from '@/components/Categories/CategoryHero'
import TrendingCategoriesWiki from '@/components/Categories/TrendingCategoriesWiki'
import { getDateRange } from '@/utils/HomepageUtils/getDate'

const CATEGORY_DATE_RANGE = 3
const CATEGORY_AMOUNT = 5

type CategoryPageProps = NextPage & {
  categoryData: Category
  wikis: Wiki[]
  trending: Wiki[]
  newWikis: Wiki[]
}

const CategoryPage = ({
  categoryData,
  wikis,
  trending,
  newWikis,
}: CategoryPageProps) => {
  const router = useRouter()
  const category = router.query.category as string
  const {
    data: wikisInCategory,
    setData: setWikisInCategory,
    setHasMore,
    fetcher: fetchMoreWikis,
    loading,
    hasMore,
    setOffset,
  } = useInfiniteData<Wiki>({
    initiator: getWikisByCategory,
    arg: { category },
  })

  useEffect(() => {
    setHasMore(true)
    setOffset(0)
    setWikisInCategory(wikis)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, wikis])

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasMore,
    onLoadMore: fetchMoreWikis,
  })
  const { t } = useTranslation()
  return (
    <>
      {categoryData && (
        <NextSeo
          title={categoryData.title}
          description={categoryData.description}
          openGraph={{
            title: categoryData.title,
            description: categoryData.description,
            images: [
              {
                url: `/images/categories/${categoryData.id}.jpg`,
              },
            ],
          }}
        />
      )}
      <Box mt="-3" bgColor="pageBg" pb={12}>
        <CategoryHero
          id={categoryData?.id}
          description={categoryData?.description}
          title={categoryData?.title}
        />
        {(trending.length > 0 || newWikis.length > 0) && (
          <TrendingCategoriesWiki
            categoryType={categoryData?.title}
            trending={trending}
            newWikis={newWikis}
          />
        )}
        <Divider
          opacity="1"
          borderColor="gray.300"
          _dark={{ borderColor: 'whiteAlpha.200' }}
        />
        <Box mt={10}>
          {wikisInCategory.length > 0 ? (
            <>
              <SimpleGrid
                columns={{ base: 1, sm: 2, lg: 3 }}
                width={{ base: '90%', lg: 'min(80%, 1300px)' }}
                mx="auto"
                my={10}
                gap={8}
              >
                {wikisInCategory.map((wiki, i) => (
                  <Box key={i}>
                    <WikiPreviewCard wiki={wiki} showLatestEditor />
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
            </>
          ) : (
            <Box textAlign="center" py={10} px={6}>
              <Text fontSize="lg" mt={3} mb={3}>
                Oops, No Wiki Found in This Category
              </Text>
              <Button
                colorScheme="primary"
                color="white"
                variant="solid"
                onClick={() => router.back()}
              >
                Go Back
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const categoryId: string = context.params?.category as string
  const result = await store.dispatch(getCategoriesById.initiate(categoryId))
  const { startDay, endDay } = getDateRange({ dayRange: CATEGORY_DATE_RANGE })
  const wikisByCategory = await store.dispatch(
    getWikisByCategory.initiate({
      category: categoryId,
      limit: ITEM_PER_PAGE,
      offset: 0,
    }),
  )

  const { data: trendingWikisInCategory } = await store.dispatch(
    getTrendingCategoryWikis.initiate({
      amount: CATEGORY_AMOUNT,
      startDay,
      endDay,
      category: categoryId,
    }),
  )

  const { data: activitiesByCategory } = await store.dispatch(
    getWikiActivityByCategory.initiate({
      limit: CATEGORY_AMOUNT,
      category: categoryId,
      type: 'CREATED',
      offset: 0,
    }),
  )

  await Promise.all([
    store.dispatch(wikiApi.util.getRunningQueriesThunk()),
    store.dispatch(wikiApi.util.getRunningQueriesThunk()),
  ])

  const popularCategoryWikis = trendingWikisInCategory?.wikisPerVisits
  const newCategoryWikis = activitiesByCategory

  return {
    props: {
      categoryData: result.data || [],
      wikis: wikisByCategory.data || [],
      trending: popularCategoryWikis || [],
      newWikis: newCategoryWikis || [],
    },
  }
}

export default CategoryPage
