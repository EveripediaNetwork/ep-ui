import React, { useState, useEffect } from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import {
  Divider,
  Box,
  Heading,
  SimpleGrid,
  Text,
  Button,
  Center,
  Spinner,
} from '@chakra-ui/react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { getRunningOperationPromises } from '@/services/categories'
import { store } from '@/store/store'
import WikiPreviewCard from '@/components/Wiki/WikiPreviewCard/WikiPreviewCard'
import { getTagWikis } from '@/services/wikis'
import { Wiki } from '@/types/Wiki'
import { useRouter } from 'next/router'
import { ITEM_PER_PAGE, FETCH_DELAY_TIME } from '@/data/Constants'
import { useTranslation } from 'react-i18next'

interface TagPageProps {
  tagId: string
  wikis: Wiki[]
}
const TagPage: NextPage<TagPageProps> = ({ tagId, wikis }: TagPageProps) => {
  const [wikisByTag, setWikisByTag] = useState<Wiki[] | []>([])
  const router = useRouter()
  const tag = router.query.tag as string
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [offset, setOffset] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setHasMore(true)
    setOffset(0)
    setWikisByTag(wikis)
    if(wikis.length < ITEM_PER_PAGE){
      setHasMore(false)
      setLoading(false)
    }
  }, [tag])

  const fetchMoreWikis = () => {
    const updatedOffset = offset + ITEM_PER_PAGE
    setTimeout(() => {
      const fetchNewWikis = async () => {
        const result = await store.dispatch(
          getTagWikis.initiate({
            id: tag,
            limit: ITEM_PER_PAGE,
            offset: updatedOffset,
          }),
        )
        if (result.data && result.data?.length > 0) {
          const { data } = result
          const updatedWiki = [...wikisByTag, ...data]
          setWikisByTag(updatedWiki)
          setOffset(updatedOffset)
          if(data.length < ITEM_PER_PAGE){
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
      <NextSeo
        title={`result for ${tagId}`}
        openGraph={{
          title: `result for ${tagId}`,
          description: `Wikis with ${tagId} tag`,
        }}
      />
      <Box bgColor="pageBg" border="solid 1px transparent" pb={12}>
        <Heading fontSize={40} textAlign="center" mt={4}>
          {tagId}
        </Heading>

        <Divider />
        <Box mt={16}>
          <Heading fontSize={25} textAlign="center">
            Wikis with this tag
          </Heading>
          {wikis.length > 0 ? (
            <>
              <SimpleGrid
                columns={{ base: 1, sm: 2, lg: 3 }}
                width="min(90%, 1200px)"
                mx="auto"
                my={12}
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
            </>
          ) : (
            <Box textAlign="center" py={10} px={6}>
              <Text fontSize="lg" mt={3} mb={3}>
                Oops, No Wiki Found with this Tag
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
  const tagId: string = context.params?.tag as string
  const tagWikis = await store.dispatch(
    getTagWikis.initiate({ id: tagId, offset: 0, limit: ITEM_PER_PAGE }),
  )

  await Promise.all(getRunningOperationPromises())
  return {
    props: {
      tagId,
      wikis: tagWikis.data || [],
    },
  }
}
export default TagPage
