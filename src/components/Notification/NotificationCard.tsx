import React, { useEffect } from 'react'
import { HStack, Button, useToast, UseToastOptions } from '@chakra-ui/react'
import {
  ActivityCardDetails,
  BaseCategory,
  BaseTag,
  Image,
  User,
} from '@/types/Wiki'
import ActivityCard from '@/components/Activity/ActivityCard'
import { useUserProfileData } from '@/services/profile/utils'
import { addSubscription, removeSubscription } from '@/services/notification'
import { getUserAddressFromCache } from '@/utils/getUserAddressFromCache'
import { store } from '@/store/store'
import { useIsWikiSubscribed } from '@/services/notification/utils'

interface NotificationCardProps {
  title: string
  brief: string
  editor: User
  lastModTimeStamp?: string
  wikiId: string
  type?: string
  categories: BaseCategory[]
  tags: BaseTag[]
  WikiImgObj?: Image[]
  defaultSubscribed?: boolean
}

export const SubscribeWikiHandler = async (
  email: string | null | undefined,
  wiki: ActivityCardDetails | undefined,
  userAddress: string,
  toast: (arg0: UseToastOptions) => void,
) => {
  if (!email) {
    toast({
      title: 'Subscription Failed',
      description: 'Please add email to your profile settings.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
    return
  }

  if (wiki) {
    await store.dispatch(
      addSubscription.initiate({
        userId: userAddress,
        subscriptionType: 'wiki',
        auxiliaryId: wiki.id,
        wiki,
        email,
      }),
    )
  }
}

export const RemoveWikiSubscriptionHandler = async (
  email: string | null | undefined,
  wikiId: string | undefined,
  userAddress: string,
  toast: (arg0: UseToastOptions) => void,
) => {
  if (!email) {
    toast({
      title: 'Remove Subscription Failed',
      description: 'Please add email to your profile settings.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
    return
  }
  if (wikiId) {
    await store.dispatch(
      removeSubscription.initiate({
        userId: userAddress,
        subscriptionType: 'wiki',
        auxiliaryId: wikiId,
        email,
      }),
    )
  }
}

const NotificationCard = ({
  title,
  brief,
  editor,
  categories,
  tags,
  lastModTimeStamp,
  WikiImgObj,
  wikiId,
  type,
  defaultSubscribed,
}: NotificationCardProps) => {
  const userAddress = getUserAddressFromCache() as string
  const { setAccount, profileData } = useUserProfileData('', {
    withAllSettings: true,
  })
  const isWikiSubscribed = useIsWikiSubscribed(wikiId, userAddress)

  const toast = useToast()

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
        type={type}
        wikiId={wikiId}
        categories={categories}
        tags={tags}
        WikiImgObj={WikiImgObj}
      />
      {defaultSubscribed || isWikiSubscribed ? (
        <Button
          variant="outline"
          px={{ base: 0, md: 7 }}
          fontSize={{ base: 'xs', md: 'sm' }}
          onClick={() =>
            RemoveWikiSubscriptionHandler(
              profileData?.email,
              wikiId,
              userAddress,
              toast,
            )
          }
        >
          Remove
        </Button>
      ) : (
        <Button
          px={{ base: 0, md: 10 }}
          fontSize={{ base: 'xs', md: 'md' }}
          onClick={() =>
            SubscribeWikiHandler(
              profileData?.email,
              {
                title,
                summary: brief,
                user: editor,
                categories,
                tags,
                updated: lastModTimeStamp,
                images: WikiImgObj,
                id: wikiId,
              },
              userAddress,
              toast,
            )
          }
        >
          Add
        </Button>
      )}
    </HStack>
  )
}

export default NotificationCard
