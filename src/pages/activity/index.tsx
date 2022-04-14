import React, { useState } from 'react'
import { Box, Heading, VStack, Center, Spinner, Text } from '@chakra-ui/react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import ActivityCard from '@/components/Activity/ActivityCard'
import {
  getLatestActivities,
  getRunningOperationPromises,
  ActivityType,
} from '@/services/activities'
import { GetServerSideProps } from 'next'
import { store } from '@/store/store'
import { ActivityEmptyState } from '@/components/Activity/EmptyState'
import { getWikiSummary } from '@/utils/getWikiSummary'
import { FETCH_DELAY_TIME, ITEM_PER_PAGE } from '@/data/Constants'

const Activity = ({ activities }: { activities: ActivityType[] }) => {
  const [LatestActivityData, setLatestActivityData] = useState<
    ActivityType[] | []
  >(activities)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [offset, setOffset] = useState<number>(0)
  const fetchMoreActivities = () => {
    const updatedOffset = offset + ITEM_PER_PAGE
    setTimeout(() => {
      const fetchNewActivites = async () => {
        const result = await store.dispatch(
          getLatestActivities.initiate({
            limit: ITEM_PER_PAGE,
            offset: updatedOffset,
          }),
        )
        if (result.data && result.data?.length > 0) {
          const data = result.data || []
          const updatedActivities = [...LatestActivityData, ...data]
          setLatestActivityData(updatedActivities)
          setOffset(updatedOffset)
        } else {
          setHasMore(false)
          setLoading(false)
        }
      }
      fetchNewActivites()
    }, FETCH_DELAY_TIME)
  }

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasMore,
    onLoadMore: fetchMoreActivities,
  })

  const renderActivityCard = (activity: ActivityType) => (
    <ActivityCard
      id={activity.id}
      key={activity.id}
      title={activity.content[0].title}
      brief={getWikiSummary(activity?.content[0])}
      editor={activity.content[0].user.id}
      lastModTimeStamp={activity.datetime}
      wiki={activity.content[0]}
      wikiId={activity.wikiId}
    />
  )

  return (
    <Box bgColor="pageBg" my={-8} py={8}>
      <Box w="min(90%, 1100px)" mx="auto" my={{ base: '10', lg: '16' }}>
        <Heading mt={8} mb={4} as="h1" size="2xl" letterSpacing="wide">
          Recent Activity
        </Heading>
        <Box>
          <Box mt="10">
            {!LatestActivityData?.length && (
              <Center>
                <ActivityEmptyState />
              </Center>
            )}
            <VStack spacing={4}>
              {LatestActivityData?.map(activity =>
                renderActivityCard(activity),
              )}
            </VStack>
          </Box>
          {loading || hasMore ? (
            <Center ref={sentryRef} mt="10" w="full" h="16">
              <Spinner size="xl" />
            </Center>
          ) : (
            <Center mt="10">
              <Text fontWeight="semibold">Yay! You have seen it all 🥳 </Text>
            </Center>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const activities = await store.dispatch(
    getLatestActivities.initiate({ offset: 0, limit: ITEM_PER_PAGE }),
  )
  await Promise.all(getRunningOperationPromises())
  return {
    props: { activities: activities.data },
  }
}

export default Activity
