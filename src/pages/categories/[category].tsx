import React, { useEffect } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import {
  Divider,
  Box,
  Heading,
  SimpleGrid,
  Flex,
  Text,
  Button,
  Center,
  Spinner,
} from '@chakra-ui/react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { Image } from '@/components/Elements/Image/Image'
import {
  getCategoriesById,
  getRunningOperationPromises,
} from '@/services/categories'
import { store } from '@/store/store'
import { Category } from '@/types/CategoryDataTypes'
import WikiPreviewCard from '@/components/Wiki/WikiPreviewCard/WikiPreviewCard'
import { getWikisByCategory } from '@/services/wikis'
import { Wiki } from '@/types/Wiki'
import { useRouter } from 'next/router'
import { ITEM_PER_PAGE } from '@/data/Constants'
import { useTranslation } from 'react-i18next'
import { useInfiniteData } from '@/utils/useInfiniteData'

type CategoryPageProps = NextPage & {
  categoryData: Category
  wikis: Wiki[]
}

const CategoryPage = ({ categoryData, wikis }: CategoryPageProps) => {
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
        <Image
          priority
          src={`/images/categories/${categoryData.id}.jpg`}
          height="250px"
        />
        <Heading
          fontSize={{ base: 25, lg: 36 }}
          maxW="80%"
          mx="auto"
          textAlign="center"
          mt={8}
        >
          {categoryData?.title}
        </Heading>
        <Flex
          textAlign="center"
          justifyContent="center"
          fontWeight="400"
          maxW="70%"
          mx="auto"
          px={5}
        >
          <Text my={8} mx={14}>
            {categoryData?.description || ''}
          </Text>
        </Flex>
        <Divider />
        <Box mt={10}>
          <Heading fontSize={25} textAlign="center">
            {t('wikiInCategory')}
          </Heading>
          {wikisInCategory.length > 0 ? (
            <>
              <SimpleGrid
                columns={{ base: 1, sm: 2, lg: 3 }}
                width="min(80%, 1300px)"
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
  const wikisByCategory = await store.dispatch(
    getWikisByCategory.initiate({
      category: categoryId,
      limit: ITEM_PER_PAGE,
      offset: 0,
    }),
  )
  await Promise.all(getRunningOperationPromises())
  return {
    props: {
      categoryData: result.data || [],
      wikis: wikisByCategory.data || [],
    },
  }
}

export default CategoryPage
