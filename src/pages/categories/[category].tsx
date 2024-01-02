import React from 'react'
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
import { CategoryDataType } from '@/types/CategoryDataTypes'
import WikiPreviewCard from '@/components/Wiki/WikiPreviewCard/WikiPreviewCard'
import {
  getTrendingCategoryWikis,
  getWikiActivityByCategory,
  getWikisByCategory,
} from '@/services/wikis'
import { Wiki } from '@everipedia/iq-utils'
import { useRouter } from 'next/router'
import { ITEM_PER_PAGE } from '@/data/Constants'
import { useTranslation } from 'next-i18next'
import { useInfiniteData } from '@/hooks/useInfiniteData'
import CategoryHero from '@/components/Categories/CategoryHero'
import TrendingCategoriesWiki from '@/components/Categories/TrendingCategoriesWiki'
import { getDateRange } from '@/utils/HomepageUtils/getDate'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const CATEGORY_DATE_RANGE = 3
const CATEGORY_AMOUNT = 5

type CategoryPageProps = NextPage & {
  categoryData: CategoryDataType
  wikis: Wiki[]
  trending: Wiki[]
  newWikis: Wiki[]
}

// TODO: load page 4 or 5 times. probably useInfiniteData doing rerenderings bcs of state changing. review
// TODO: i added a new param to allow inject directly data, instead of using an effect. it can be fixed in all places
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
    fetcher: fetchMoreWikis,
    loading,
    hasMore,
  } = useInfiniteData<Wiki>(
    {
      initiator: getWikisByCategory,
      arg: { category },
    },
    wikis,
  )

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasMore,
    onLoadMore: fetchMoreWikis,
  })
  const { t } = useTranslation('category')
  return (
    <>
      {categoryData && (
        <NextSeo
          title={t(`category${categoryData.id}Title`)}
          description={t(`category${categoryData.id}Description`)}
          openGraph={{
            title: t(`category${categoryData.id}Title`),
            description: t(`category${categoryData.id}Description`),
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
          description={t(`category${categoryData.id}Description`)}
          title={t(`category${categoryData.id}Title`)}
        />
        {(trending.length > 0 || newWikis.length > 0) && (
          <TrendingCategoriesWiki
            categoryType={t(`category${categoryData.id}Title`)}
            trending={trending}
            newWikis={newWikis}
          />
        )}
        <Divider
          opacity="1"
          borderColor="gray.200"
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

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}) => {
  const categoryId: string = params?.category as string
  const { startDay, endDay } = getDateRange({ dayRange: CATEGORY_DATE_RANGE })

  const [
    categoryData,
    wikisByCategory,
    trendingWikisInCategory,
    activitiesByCategory,
  ] = await Promise.all([
    store.dispatch(getCategoriesById.initiate(categoryId)),
    store.dispatch(
      getWikisByCategory.initiate({
        category: categoryId,
        limit: ITEM_PER_PAGE,
        offset: 0,
      }),
    ),
    store.dispatch(
      getTrendingCategoryWikis.initiate({
        amount: CATEGORY_AMOUNT,
        startDay,
        endDay,
        category: categoryId,
      }),
    ),
    store.dispatch(
      getWikiActivityByCategory.initiate({
        limit: CATEGORY_AMOUNT,
        category: categoryId,
        type: 'CREATED',
        offset: 0,
      }),
    ),
  ])

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['category', 'common'])),
      categoryData: categoryData.data || [],
      wikis: wikisByCategory.data || [],
      trending: trendingWikisInCategory.data?.wikisPerVisits || [],
      newWikis: activitiesByCategory.data || [],
    },
  }
}

export default CategoryPage
