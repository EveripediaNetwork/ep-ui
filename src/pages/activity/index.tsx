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

const Activity = () => (
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
              {ActivityData.map((activity, i) => (
                <ActivityCard
                  key={i}
                  wikiImg={activity.wikiImg}
                  title={activity.title}
                  brief={activity.brief}
                  editor={activity.editor}
                  wordsChanged={activity.wordsChanged}
                  percentChanged={activity.percentChanged}
                  isFirstEdit={activity.isFirstEdit}
                  lastModTimeStamp={activity.lastModTimeStamp}
                />
              ))}
            </VStack>
          </TabPanel>
          {/* Expiring Soon Activity Section */}
          <TabPanel px={0}>
            <VStack spacing={4}>
              {ActivityData.reverse().map((activity, i) => (
                <ActivityCard
                  key={i}
                  wikiImg={activity.wikiImg}
                  title={activity.title}
                  brief={activity.brief}
                  editor={activity.editor}
                  wordsChanged={activity.wordsChanged}
                  percentChanged={activity.percentChanged}
                  isFirstEdit={activity.isFirstEdit}
                  lastModTimeStamp={activity.lastModTimeStamp}
                />
              ))}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  </Box>
)

export default Activity
