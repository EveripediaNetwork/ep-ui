import React, { useEffect } from 'react'
import {
  HStack,
  Button,
  useToast,
  UseToastOptions,
  Text,
  Icon,
} from '@chakra-ui/react'
import {
  ActivityCardDetails,
  BaseCategory,
  BaseTag,
  Image,
  User,
} from '@everipedia/iq-utils'
import ActivityCard from '@/components/Activity/ActivityCard'
import {
  useUserProfileData,
  UserProfileFetchOptions,
} from '@/services/profile/utils'
import { addSubscription, removeSubscription } from '@/services/notification'
import { store } from '@/store/store'
import { useIsWikiSubscribed } from '@/services/notification/utils'
import { RiAddLine, RiSubtractLine } from 'react-icons/ri'
import { getUserAddressFromCache } from '@/utils/DataFetching/getUserAddressFromCache'

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
  const { setAccount, profileData } = useUserProfileData(
    UserProfileFetchOptions.WITH_ALL_SETTINGS,
  )
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
          w={{ base: 8, md: 'initial' }}
          h={{ base: 10 }}
          display={{ base: 'flex', md: 'inline-flex' }}
          alignItems={{ base: 'center' }}
          justifyContent={{ base: 'center' }}
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
          <Text display={{ base: 'none', md: 'block' }}>Remove</Text>
          <Icon
            as={RiSubtractLine}
            w={6}
            h={6}
            display={{ base: 'block', md: 'none' }}
            fill="NotificationRemoveIcon"
          />
        </Button>
      ) : (
        <Button
          w={{ base: 8, md: 'initial' }}
          h={{ base: 10 }}
          display={{ base: 'flex', md: 'inline-flex' }}
          alignItems={{ base: 'center' }}
          justifyContent={{ base: 'center' }}
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
          <Text display={{ base: 'none', md: 'block' }}>Add</Text>
          <Icon
            as={RiAddLine}
            w={6}
            h={6}
            display={{ base: 'block', md: 'none' }}
            fill="NotificationAddIcon"
          />
        </Button>
      )}
    </HStack>
  )
}

export default NotificationCard
