import React from 'react'
import {
  Box,
  Heading,
  VStack,
  TabPanel,
  TabPanels,
  Tab,
  Tabs,
  TabList,
  Center,
} from '@chakra-ui/react'
import ActivityCard from '@/components/Activity/ActivityCard'
import { ActivityData } from '@/data/ActivityData'
import {
  getLatestActivities,
  useGetLatestActivitiesQuery,
  getRunningOperationPromises,
  ActivityType,
} from '@/services/activities'
import { GetServerSideProps } from 'next'
import { store } from '@/store/store'
import { ActivityEmptyState } from '@/components/Activity/EmptyState'
import { getWikiSummary } from '@/utils/getWikiSummary'

const Activity = () => {
  const { data: LatestActivityData, isLoading } = useGetLatestActivitiesQuery({
    offset: 0,
  })

  const renderActivityCard = (activity: ActivityType, i: number) => (
    <ActivityCard
      id={activity.id}
      key={activity.id}
      title={activity.content[0].title}
      brief={getWikiSummary(activity?.content[0])}
      editor={activity.content[0].user?.id}
      lastModTimeStamp={ActivityData[i].lastModTimeStamp}
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
        <Tabs>
          <TabList>
            <Tab>New Wikis</Tab>
            <Tab>Updated Wikis</Tab>
          </TabList>
          {isLoading ? (
            <Center w="full" h="16">
              Loading Wikis
            </Center>
          ) : (
            <TabPanels>
              {!LatestActivityData?.length && (
                <Center>
                  <ActivityEmptyState />
                </Center>
              )}
              {/* Most Recent Activity Section */}
              <TabPanel px={0}>
                <VStack spacing={4}>
                  {LatestActivityData?.map((activity, i) =>
                    renderActivityCard(activity, i),
                  )}
                </VStack>
              </TabPanel>
              {/* Expiring Soon Activity Section */}
              <TabPanel px={0}>
                <VStack spacing={4}>
                  {LatestActivityData?.slice()
                    .reverse()
                    .map((activity, i) =>
                      renderActivityCard(
                        activity,
                        LatestActivityData.length - i,
                      ),
                    )}
                </VStack>
              </TabPanel>
            </TabPanels>
          )}
        </Tabs>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // TODO: Modify this for infinite scroll logic
  store.dispatch(getLatestActivities.initiate({ offset: 0 }))
  await Promise.all(getRunningOperationPromises())
  return {
    props: {},
  }
}

export default Activity
