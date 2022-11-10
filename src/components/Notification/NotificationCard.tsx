import React from 'react'
import { HStack, Button } from '@chakra-ui/react'
import { User, Wiki } from '@/types/Wiki'
import ActivityCard from '../Activity/ActivityCard'

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
  return (
    <HStack gap={{ base: 2, lg: 10 }} justifyContent="space-between">
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
      <Button>Add</Button>
    </HStack>
  )
}

export default NotificationCard
