import React from 'react'
import { HStack, Button } from '@chakra-ui/react'
import { User, Wiki } from '@/types/Wiki'
import ActivityCard from '@/components/Activity/ActivityCard'

interface NotificationCardProps {
  title: string
  brief: string
  editor: User
  lastModTimeStamp?: string
  wiki: Omit<
    Wiki,
    'metadata' | 'version' | 'language' | 'author' | 'content' | 'promoted'
  >
  activityId?: string
  wikiId?: string
  type?: string
}

const NotificationCard = ({
  title,
  brief,
  editor,
  lastModTimeStamp,
  wiki,
  activityId,
  wikiId,
  type,
}: NotificationCardProps) => {
  const SubscribeWikiHandler = () => {
    console.log(`wiki ${title} with ${wikiId} was added ${type}`)
  }

  return (
    <HStack gap={{ base: 2, lg: 10 }} w="full" justifyContent="space-between">
      <ActivityCard
        isNotifSubCard
        title={title}
        brief={brief}
        editor={editor}
        lastModTimeStamp={lastModTimeStamp}
        wiki={wiki}
        type={type}
        activityId={activityId}
        wikiId={wikiId}
      />
      <Button
        px={{ base: 0, md: 10 }}
        fontSize={{ base: 'xs', md: 'md' }}
        onClick={() => {
          SubscribeWikiHandler()
        }}
      >
        Add
      </Button>
    </HStack>
  )
}

export default NotificationCard
