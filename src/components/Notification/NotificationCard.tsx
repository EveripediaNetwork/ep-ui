import React, { useEffect } from 'react'
import { HStack, Button } from '@chakra-ui/react'
import { User, Wiki } from '@/types/Wiki'
import ActivityCard from '@/components/Activity/ActivityCard'
import { useUserProfileData } from '@/services/profile/utils'
import { useAddSubscriptionMutation } from '@/services/notification'
import { getUserAddressFromCache } from '@/utils/getUserAddressFromCache'

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
  const userAddress = getUserAddressFromCache()
  const { setAccount, profileData } = useUserProfileData('', {
    withAllSettings: true,
  })
  const [addSubscription] = useAddSubscriptionMutation()

  const SubscribeWikiHandler = async () => {
    const data = await addSubscription({
      userId: userAddress,
      notificationType: 'wiki',
      auxiliaryId: wikiId,
      email: profileData?.email,
    })

    console.log(data)
  }

  useEffect(() => {
    if (userAddress) {
      setAccount(userAddress)
    }
  }, [userAddress, setAccount])

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
