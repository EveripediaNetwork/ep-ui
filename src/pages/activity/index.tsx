import React, { useState } from 'react'
import { Box, Heading, VStack, Center, Spinner, Text } from '@chakra-ui/react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import ActivityCard from '@/components/Activity/ActivityCard'
import {
  getLatestActivities,
  getRunningOperationPromises,
} from '@/services/activities'
import { GetStaticProps } from 'next'
import { store } from '@/store/store'
import { getWikiSummary } from '@/utils/getWikiSummary'
import { FETCH_DELAY_TIME, ITEM_PER_PAGE } from '@/data/Constants'
import { Activity as ActivityType } from '@/types/ActivityDataType'
import { useTranslation } from 'react-i18next'
import { pageView } from '@/utils/googleAnalytics'
import { useRouter } from 'next/router'
import ActivityHeader from '@/components/SEO/Activity'

const Activity = ({ activities }: { activities: ActivityType[] }) => {
  const [LatestActivityData, setLatestActivityData] = useState<
    ActivityType[] | []
  >(activities)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [offset, setOffset] = useState<number>(0)
  const router = useRouter()
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
          pageView(`${router.asPath}?page=${updatedOffset}`)
          const data = result.data || []
          const updatedActivities = [...LatestActivityData, ...data]
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
      brief={getWikiSummary(activity?.content[0])}
      editor={activity.content[0].user}
      lastModTimeStamp={activity.datetime}
      wiki={activity.content[0]}
      activityId={activity.id}
      type={activity.type}
    />
  )
  const { t } = useTranslation()

  return (
    <>
      <ActivityHeader />
      <Box bgColor="pageBg" my={-8} py={4}>
        <Box w="min(90%, 1100px)" mx="auto">
          <Heading
            my={{ base: 8, md: 12 }}
            as="h1"
            size={{ base: 'lg', md: '2xl' }}
            letterSpacing="wide"
          >
            Recent Activities
          </Heading>
          <Box>
            <Box>
              <VStack overflow="hidden" spacing={4}>
                {LatestActivityData?.map(activity =>
                  renderActivityCard(activity),
                )}
              </VStack>
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
        </Box>
      </Box>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: activities, error: activitiesError } = await store.dispatch(
    getLatestActivities.initiate({ offset: 0, limit: ITEM_PER_PAGE }),
  )
  await Promise.all(getRunningOperationPromises())

  if (activitiesError) {
    throw new Error(`Error fetching activities: ${activitiesError}`)
  }

  return {
    props: {
      activities: activities || [],
    },
  }
}

export default Activity
