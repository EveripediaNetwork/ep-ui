import React, { useEffect } from 'react'
import { Modal } from '@/components/Elements'
import { useWeb3Token } from '@/hooks/useWeb3Token'
import { useAccount } from 'wagmi'
import { useToast } from '@chakra-ui/toast'
import { profileApiClient } from '@/services/profile'
import {
  RemoveWikiSubscriptionHandler,
  SubscribeWikiHandler,
} from '@/components/Notification/NotificationCard'
import { Wiki } from '@everipedia/iq-utils'
import {
  UserProfileFetchOptions,
  useUserProfileData,
} from '@/services/profile/utils'
import { Button, Text } from '@chakra-ui/react'
import { store } from '@/store/store'
import { getAllWikiSubscription } from '@/services/notification'

interface SubscribeModalProps {
  isOpen: boolean
  onClose: () => void
  wiki: Wiki
}

const SIGN_TOKEN_MESSAGE =
  'To get notifications on changes to this wiki, authenticate your wallet to continue.'
const SUBSCRIBE_MESSAGE =
  'Subscribe to this wiki to get notifications on changes to this wiki.'
const UNSUBSCRIBE_MESSAGE =
  'You subscribed to this wiki already ! Click on the button below to stop getting notifications on changes to this wiki.'

const SubscribeModal = ({ isOpen, onClose, wiki }: SubscribeModalProps) => {
  const { token } = useWeb3Token()
  const { address: userAddress } = useAccount()
  const { profileData, setAccount, loading } = useUserProfileData(
    UserProfileFetchOptions.ONLY_EMAIL,
  )
  const [isSubscribed, setIsSubscribed] = React.useState<null | boolean>(null)

  const toast = useToast()

  const handleSubscriptionMutation = async () => {
    if (!userAddress) return

    const email = profileData?.email

    if (isSubscribed) {
      RemoveWikiSubscriptionHandler(email, wiki?.id, userAddress, toast)
    } else if (wiki) {
      SubscribeWikiHandler(email, wiki, userAddress, toast)
    }

    setIsSubscribed(p => !p)
  }

  useEffect(() => {
    if (userAddress && token) {
      profileApiClient.setHeader('authorization', token)
      setAccount(userAddress)

      const checkInitialSubscription = async () => {
        const { data } = await store.dispatch(
          getAllWikiSubscription.initiate(userAddress),
        )
        const isWikiSubscribed = data
          ? data.some(w => w.auxiliaryId === wiki.id)
          : false
        setIsSubscribed(isWikiSubscribed)
      }
      checkInitialSubscription()
    }
  }, [token, userAddress, wiki, toast, setAccount])

  const isLoading = token && (loading || isSubscribed === null)

  return (
    <Modal
      enableBottomCloseButton={false}
      isOpen={isOpen}
      title={isSubscribed ? 'Subscribed !' : 'Subscribe to wiki'}
      onClose={onClose}
      isCentered
      SecondaryButton={
        token && (
          <Button
            variant={isSubscribed ? 'outline' : 'solid'}
            onClick={handleSubscriptionMutation}
          >
            {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
          </Button>
        )
      }
    >
      {isLoading && (
        <Text color="gray.500">Checking Subscription Status...</Text>
      )}
      {!isLoading && !token && SIGN_TOKEN_MESSAGE}
      {!isLoading &&
        token &&
        (isSubscribed ? UNSUBSCRIBE_MESSAGE : SUBSCRIBE_MESSAGE)}
    </Modal>
  )
}

export default SubscribeModal
