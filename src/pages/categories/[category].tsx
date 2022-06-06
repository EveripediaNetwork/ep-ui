import React, { useState, useEffect } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import {
  Divider,
  Box,
  Heading,
  SimpleGrid,
  Icon,
  Flex,
  Text,
  Button,
  Center,
  Spinner,
} from '@chakra-ui/react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { Image } from '@/components/Elements/Image/Image'
import ToggleText from '@/components/Elements/ToggleText/ToggleText'
import {
  getCategoriesById,
  getRunningOperationPromises,
} from '@/services/categories'
import { store } from '@/store/store'
import { Category } from '@/types/CategoryDataTypes'
import { getBootStrapIcon } from '@/utils/getBootStrapIcon'
import WikiPreviewCard from '@/components/Wiki/WikiPreviewCard/WikiPreviewCard'
import { getWikisByCategory } from '@/services/wikis'
import { Wiki } from '@/types/Wiki'
import { useRouter } from 'next/router'
import { FETCH_DELAY_TIME, ITEM_PER_PAGE } from '@/data/Constants'
import { useTranslation } from 'react-i18next'

type CategoryPageProps = NextPage & {
  categoryData: Category
  wikis: Wiki[]
}

const CategoryPage = ({ categoryData, wikis }: CategoryPageProps) => {
  const categoryIcon = getBootStrapIcon(categoryData.icon)
  const [wikisInCategory, setWikisInCategory] = useState<Wiki[] | []>([])
  const router = useRouter()
  const category = router.query.category as string
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [offset, setOffset] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  console.log(categoryData)

  useEffect(() => {
    setHasMore(true)
    setOffset(0)
    setWikisInCategory(wikis)
  }, [category, wikis])

  const fetchMoreWikis = () => {
    const updatedOffset = offset + ITEM_PER_PAGE
    setTimeout(() => {
      const fetchNewWikis = async () => {
        const result = await store.dispatch(
          getWikisByCategory.initiate({
            category,
            limit: ITEM_PER_PAGE,
            offset: updatedOffset,
          }),
        )
        if (result.data && result.data?.length > 0) {
          const { data } = result
          const updatedWiki = [...wikisInCategory, ...data]
          setWikisInCategory(updatedWiki)
          setOffset(updatedOffset)
          if (data.length < ITEM_PER_PAGE) {
            setHasMore(false)
            setLoading(false)
          }
        } else {
          setHasMore(false)
          setLoading(false)
        }
      }
      fetchNewWikis()
    }, FETCH_DELAY_TIME)
  }

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
        <Flex mx="auto" justifyContent="center" mt={12}>
          <Icon
            as={categoryIcon}
            borderRadius="100px"
            overflow="hidden"
            borderWidth="5px"
            bgColor={`hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`}
            color="#0000002f"
            width="60px"
            height="60px"
            padding={2}
          />
        </Flex>
        <Heading fontSize={40} maxW="80%" mx="auto" textAlign="center" mt={4}>
          {categoryData?.title}
        </Heading>

        <ToggleText my={8} text={categoryData?.description || ''} />
        <Divider />
        <Box mt={16}>
          <Heading fontSize={25} textAlign="center">
            {t('wikiInCategory')}
          </Heading>
          {wikisInCategory.length > 0 ? (
            <>
              <SimpleGrid
                columns={{ base: 1, sm: 2, lg: 3 }}
                width="min(90%, 1300px)"
                mx="auto"
                my={12}
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
