import React from 'react'
import { VStack, Flex, chakra } from '@chakra-ui/react'
import ActivityCardTop from './ActivityCardTop'
import ActivityCardBody from './ActivityCardBody'
import ActivityCardBottom from './ActivityCardBottom'
import ActivityCardImage from './ActivityCardImage'
import { ActivityBodyCardProps } from '@/types/ActivityDataType'

const ActivityCard = (props: ActivityBodyCardProps) => {
  const {
    isNotifSubCard = false,
    title,
    summary,
    editor,
    categories,
    tags,
    lastModTimeStamp,
    activityId,
    wikiImgObj,
    wikiId,
    type,
    ipfs,
  } = props

  const link =
    ipfs !== undefined ? `/revision/${activityId}` : `/wiki/${wikiId}`
  const activity = type === 'CREATED' ? 'New' : 'Edited'

  return (
    <chakra.div
      bg="cardBg"
      py={3}
      px={2}
      borderRadius={8}
      borderColor="borderColor"
      borderWidth="0.5px"
      borderStyle="solid"
    >
      <Flex>
        <ActivityCardImage
          title={title}
          link={link}
          isNotifSubCard={isNotifSubCard}
          wikiImgObj={wikiImgObj}
        />
        <VStack spacing={2} alignItems="flex-start" width="100%">
          <ActivityCardTop
            title={title}
            link={link}
            activity={activity}
            category={categories?.[0]}
          />
          <ActivityCardBody
            link={link}
            summary={summary}
            isNotifSubCard={isNotifSubCard}
            tags={tags}
          />
          <ActivityCardBottom
            activity={activity}
            editor={editor}
            lastModTimeStamp={lastModTimeStamp}
            isNotifSubCard={isNotifSubCard}
            tags={tags}
          />
        </VStack>
      </Flex>
    </chakra.div>
  )
}

export default ActivityCard
