import ActivityCard from '@/components/Activity/ActivityCard'
import { HistoryCard } from '@/components/Wiki/History/HistoryCard'
import { NoHistoryView } from '@/components/Wiki/History/NoHistoryView'
import { getActivityByWiki } from '@/services/activities'
import { getWiki } from '@/services/wikis'
import { store } from '@/store/store'
import { Activity } from '@/types/ActivityDataType'
import { EditSpecificMetaIds, Wiki } from '@everipedia/iq-utils'
import { getUserAddressFromCache } from '@/utils/getUserAddressFromCache'
import { getActivityMetadataById } from '@/utils/getWikiFields'
import { Box, Flex, Heading, Text, useBreakpointValue } from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

interface HistoryPageProps {
  wikiHistory: Activity[]
  wiki: Wiki
}

const History = ({ wikiHistory, wiki }: HistoryPageProps) => {
  const isConnected = typeof getUserAddressFromCache() === 'string'

  const isHistoryFullWidth = useBreakpointValue({ base: true, lg: false })
  return (
    <Box bgColor="pageBg" mt={-3} pt={8}>
      <Box w="min(90%, 1100px)" mx="auto" mt={{ base: '10', lg: '16' }}>
        <Heading textAlign="center">Wiki History</Heading>
        <Text textAlign="center" mt={4} mb={8} color="linkColor">
          A timeline of changes for this wiki
        </Text>
        {wikiHistory && wikiHistory?.length <= 1 && (
          <NoHistoryView wiki={wiki} />
        )}
        {wiki && wikiHistory && wikiHistory?.length > 1 && (
          <ActivityCard
            title={wiki.title}
            brief={wiki.summary}
            editor={wiki.user}
            lastModTimeStamp={wiki.updated}
            wikiId={wiki.id}
            tags={wiki.tags}
            categories={wiki.categories}
            WikiImgObj={wiki.images}
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
          py={18}
        >
          {/* Border line */}
          {wikiHistory && wikiHistory?.length > 1 && (
            <Box
              pos="absolute"
              top="0"
              left="0"
              w={isHistoryFullWidth ? '1px' : 'calc(50% + 1px)'}
              h="100%"
              borderRightWidth={2}
              borderColor="brandLinkColor"
            />
          )}

          {wikiHistory &&
            wikiHistory?.length > 1 &&
            wikiHistory?.map((activity, index) => {
              return (
                <HistoryCard
                  isUserLoggedIn={isConnected}
                  key={activity.id}
                  activityId={activity.id}
                  isRightAligned={isHistoryFullWidth ? true : index % 2 === 0}
                  isFullWidth={isHistoryFullWidth}
                  lastEditor={activity.content[0].user}
                  lastEditedTime={activity.datetime}
                  transactionAddress={activity.content[0].transactionHash}
                  IPFS={activity.ipfs}
                  commitMessage={
                    getActivityMetadataById(
                      activity,
                      EditSpecificMetaIds.COMMIT_MESSAGE,
                    )?.value
                  }
                  wordsChanged={
                    getActivityMetadataById(
                      activity,
                      EditSpecificMetaIds.WORDS_CHANGED,
                    )?.value
                  }
                  percentChanged={
                    getActivityMetadataById(
                      activity,
                      EditSpecificMetaIds.PERCENT_CHANGED,
                    )?.value
                  }
                  blocksChanged={
                    getActivityMetadataById(
                      activity,
                      EditSpecificMetaIds.BLOCKS_CHANGED,
                    )?.value
                  }
                />
              )
            })}
        </Flex>
      </Box>
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const slug = context.params?.slug
  if (typeof slug !== 'string') return { notFound: true }
  const { data: wikiHistory, error: wikiHistoryError } = await store.dispatch(
    getActivityByWiki.initiate(slug),
  )

  if (wikiHistoryError)
    throw new Error(`Error fetching wiki history: ${wikiHistoryError}`)

  const { data: wiki, error: wikiError } = await store.dispatch(
    getWiki.initiate(slug),
  )

  if (wikiError)
    throw new Error(`Error fetching latest wiki for history: ${wikiError}`)

  return {
    props: {
      wikiHistory,
      wiki,
    },
  }
}
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true }
}

export default History
