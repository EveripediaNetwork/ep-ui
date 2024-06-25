import React, { useEffect, useState } from 'react'
import { Box, Heading, Flex, Center, Spinner, Text } from '@chakra-ui/react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import ActivityCard from '@/components/Activity/ActivityCard'
import { activitiesApi, getLatestActivities } from '@/services/activities'
import { GetStaticProps } from 'next'
import { store } from '@/store/store'
import { FETCH_DELAY_TIME, ITEM_PER_PAGE } from '@/data/Constants'
import { Activity as ActivityType } from '@/types/ActivityDataType'
import { useTranslation } from 'next-i18next'
import ActivityHeader from '@/components/SEO/Activity'
import { getWikiSummary } from '@/utils/WikiUtils/getWikiSummary'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Activity = ({ activities }: { activities: ActivityType[] }) => {
  const [latestActivityData, setLatestActivityData] = useState<
    ActivityType[] | []
  >(activities)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [offset, setOffset] = useState<number>(0)

  const getUpdatedActivities = (data: ActivityType[]) => {
    const position: { [key: string]: number } = {}
    data.map(item => {
      if (!position[item.wikiId]) {
        position[item.wikiId] = 1
        item.ipfs = undefined
      }
      return null
    })
    return data
  }

  useEffect(() => {
    getUpdatedActivities(latestActivityData)
  }, [latestActivityData])

  const fetchMoreActivities = () => {
    const updatedOffset = offset + ITEM_PER_PAGE
    setTimeout(() => {
      const fetchNewActivities = async () => {
        const result = await store.dispatch(
          getLatestActivities.initiate({
            limit: ITEM_PER_PAGE,
            offset: updatedOffset,
          }),
        )
        if (result.data && result.data?.length > 0) {
          // posthog.
          const data = result.data.map(item => ({
            content: item.content,
            datetime: item.datetime,
            id: item.id,
            ipfs: item.ipfs,
            type: item.type,
            wikiId: item.wikiId,
          }))
          const updatedActivities = getUpdatedActivities([
            ...latestActivityData,
            ...data,
          ])
          setLatestActivityData(updatedActivities)
          setOffset(updatedOffset)
        } else {
          setHasMore(false)
          setLoading(false)
        }
      }
      fetchNewActivities()
    }, FETCH_DELAY_TIME)
  }

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasMore,
    onLoadMore: fetchMoreActivities,
    rootMargin: '0px 0px 400px 0px',
  })

  const renderActivityCard = (activity: ActivityType) => (
    <ActivityCard
      key={activity.id}
      title={activity.content[0].title}
      summary={getWikiSummary(activity?.content[0])}
      editor={activity.content[0].user}
      lastModTimeStamp={activity.datetime}
      activityId={activity.id}
      type={activity.type}
      wikiId={activity.wikiId}
      ipfs={activity.ipfs}
      wikiImgObj={activity.content[0].images}
      categories={activity.content[0].categories}
      tags={activity.content[0].tags}
    />
  )

  const { t } = useTranslation('common')

  return (
    <>
      <ActivityHeader />
      <Box bgColor="pageBg" my={-8} py={4}>
        <Flex direction={'column'} w="min(90%, 1100px)" mx="auto">
          <Box my={{ base: 8, md: 12 }}>
            <Heading
              as="h1"
              fontSize={{ md: '20px', xl: '24px' }}
              letterSpacing="wide"
            >
              {t('recentActivity')}
            </Heading>
            <Text
              mt={{ base: 1 }}
              fontSize={{ base: 'xs', md: 'sm', xl: 'md' }}
            >
              {t('recentActivityDescription')}
            </Text>
          </Box>
          <Box>
            <Box>
              <Flex flexDirection="column" overflow="" gap={4}>
                {latestActivityData?.map(activity =>
                  renderActivityCard(activity),
                )}
              </Flex>
            </Box>
            {loading || hasMore ? (
              <Center ref={sentryRef} my="10" w="full" h="16">
                <Spinner size="xl" />
              </Center>
            ) : (
              <Center my="10">
                <Text fontWeight="semibold">{t('seenItAll')}</Text>
              </Center>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { data: activities, error: activitiesError } = await store.dispatch(
    getLatestActivities.initiate({ offset: 0, limit: ITEM_PER_PAGE }),
  )

  await Promise.all(store.dispatch(activitiesApi.util.getRunningQueriesThunk()))

  if (activitiesError) {
    throw new Error(`Error fetching activities: ${activitiesError}`)
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'history'])),
      activities: activities || [],
    },
  }
}

export default Activity
