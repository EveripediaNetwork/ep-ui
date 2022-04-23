import ActivityCard from '@/components/Activity/ActivityCard'
import { HistoryCard } from '@/components/Wiki/History/HistoryCard'
import {
  getActivityByWiki,
  useGetActivityByWikiQuery,
} from '@/services/activities'
import { getRunningOperationPromises, useGetWikiQuery } from '@/services/wikis'
import { store } from '@/store/store'
import { getActivityMetadataById } from '@/utils/getWikiFields'
import { getWikiSummary } from '@/utils/getWikiSummary'
import { Box, Flex, Heading, Text, useBreakpointValue } from '@chakra-ui/react'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

const History = () => {
  const router = useRouter()
  const { slug } = router.query
  const { data: wiki } = useGetWikiQuery(
    typeof slug === 'string' ? slug : skipToken,
    {
      skip: router.isFallback,
    },
  )
  const { data: wikiHistory } = useGetActivityByWikiQuery(
    typeof slug === 'string' ? slug : skipToken,
    {
      skip: router.isFallback,
    },
  )

  const isHistoryFullWidth = useBreakpointValue({ base: true, lg: false })

  return (
    <Box bgColor="pageBg" my={-8} py={8}>
      <Box w="min(90%, 1100px)" mx="auto" my={{ base: '10', lg: '16' }}>
        <Heading textAlign="center">Wiki History</Heading>
        <Text textAlign="center" mt={4} mb={8} color="linkColor">
          A timeline of changes for this wiki
        </Text>
        {wiki && (
          <ActivityCard
            id={wiki.id}
            title={wiki.title}
            brief={getWikiSummary(wiki)}
            editor={wiki.user.id}
            lastModTimeStamp={wiki.updated}
            wiki={wiki}
            wikiId={wiki.id}
          />
        )}
        <Flex
          maxW="4xl"
          mx="auto"
          flexDir="column"
          gap={8}
          pos="relative"
          w="100%"
          p={isHistoryFullWidth ? 0 : 4}
          pl={isHistoryFullWidth ? 2 : 4}
          pt={18}
        >
          {/* Border line */}
          <Box
            pos="absolute"
            top="0"
            left="0"
            w={isHistoryFullWidth ? '1px' : 'calc(50% + 1px)'}
            h="100%"
            borderRightWidth={2}
            borderColor="brand.500"
          />
          {wikiHistory?.map((activity, index) => {
            return (
              <HistoryCard
                key={activity.id}
                isRightAligned={isHistoryFullWidth ? true : index % 2 === 0}
                isFullWidth={isHistoryFullWidth}
                lastEditor={activity.content[0].user.id}
                lastEditedTime={activity.datetime}
                transactionAddress={activity.content[0].transactionHash}
                commitMessage={
                  getActivityMetadataById(activity, 'commit-message')?.value
                }
                wordsChanged={
                  getActivityMetadataById(activity, 'words-changed')?.value
                }
                percentChanged={
                  getActivityMetadataById(activity, 'percent-changed')?.value
                }
                blocksChanged={
                  getActivityMetadataById(activity, 'blocks-changed')?.value
                }
              />
            )
          })}
        </Flex>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const slug = context.params?.slug
  if (typeof slug === 'string') {
    store.dispatch(getActivityByWiki.initiate(slug))
  }
  await Promise.all(getRunningOperationPromises())
  return {
    props: {},
  }
}

export default History
