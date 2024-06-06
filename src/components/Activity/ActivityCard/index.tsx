import React from 'react'
import { VStack, Flex, chakra, Link } from '@chakra-ui/react'
import ActivityCardTop from './ActivityCardTop'
import ActivityCardBody from './ActivityCardBody'
import ActivityCardBottom from './ActivityCardBottom'
import ActivityCardImage from './ActivityCardImage'
import { ActivityBodyCardProps } from '@/types/ActivityDataType'
import NextLink from "next/link"
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
    <Link href={link} as={NextLink} style={{ textDecoration: 'none' }}>
      <chakra.div
      minWidth="90%"
      bg="cardBg"
      py={3}
      px={4}
      borderRadius={8}
      borderColor="borderColor"
      borderWidth="0.5px"
      borderStyle="solid"
      cursor={'pointer'}
      transition="all 0.3s"
      role="group"
      _hover={{
        boxShadow: '3xl',
        transform: 'scale(1.02)',
        _dark: {
          boxShadow: '0px 25px 50px -12px rgba(16, 16, 17, 0.25)',
        },
      }}
    >
      <Flex flexGrow={1} mx="auto">
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
    </Link>
    
  )
}

export default ActivityCard
