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
} from '@chakra-ui/react'
import ActivityCard from '@/components/Activity/ActivityCard'
import { ActivityData } from '@/data/ActivityData'
import {
  getLatestActivities,
  useGetLatestActivitiesQuery,
  getRunningOperationPromises,
  TempWikiActivity,
} from '@/services/activities'
import { GetServerSideProps } from 'next'
import { store } from '@/store/store'
import shortenAccount from '@/utils/shortenAccount'

const Activity = () => {
  const { data: LatestActivityData } = useGetLatestActivitiesQuery()

  const renderActivityCard = (activity: TempWikiActivity, i: number) => (
    <ActivityCard
      id={activity.id}
      key={activity.id}
      wikiImg={ActivityData[i].wikiImg}
      title={activity.title || ActivityData[i].title}
      brief={activity.content || ActivityData[i].brief}
      editor={shortenAccount(activity.user.id) || ActivityData[i].editor}
      wordsChanged={ActivityData[i].wordsChanged}
      percentChanged={ActivityData[i].percentChanged}
      isFirstEdit={ActivityData[i].isFirstEdit}
      lastModTimeStamp={ActivityData[i].lastModTimeStamp}
    />
  )

  return (
    <Box bgColor="pageBg" mt={-8} mb={-8} pt={8} pb={8}>
      <Box w="min(90%, 1100px)" mx="auto" my={{ base: '10', lg: '16' }}>
        <Heading mt={8} mb={4} as="h1" size="2xl" letterSpacing="wide">
          Recent Activity
        </Heading>
        <Tabs>
          <TabList>
            <Tab>Most Recent</Tab>
            <Tab>Expiring Soon</Tab>
          </TabList>
          <TabPanels>
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
                    renderActivityCard(activity, LatestActivityData.length - i),
                  )}
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // TODO: Modify this for infinite scroll logic
  store.dispatch(getLatestActivities.initiate())
  await Promise.all(getRunningOperationPromises())
  return {
    props: {},
  }
}

export default Activity
