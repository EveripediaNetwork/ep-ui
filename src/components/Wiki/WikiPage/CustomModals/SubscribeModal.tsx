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
import { useIsWikiSubscribed } from '@/services/notification/utils'

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
  'You subscribed to this wiki already !. Click on the button below to stop getting notifications on changes to this wiki.'

const SubscribeModal = ({ isOpen, onClose, wiki }: SubscribeModalProps) => {
  const { token } = useWeb3Token()
  const { address: userAddress } = useAccount()
  const { profileData, setAccount, loading } = useUserProfileData(
    UserProfileFetchOptions.ONLY_EMAIL_AND_SUBSCRIPTIONS,
  )
  const isWikiSubscribed = useIsWikiSubscribed(wiki?.id, userAddress || '')
  const [isSubscribeClicked, setIsSubscribeClicked] = React.useState(false)
  const toast = useToast()

  const handleSubscriptionMutation = async () => {
    if (!userAddress) return

    const email = profileData?.email

    if (isWikiSubscribed) {
      RemoveWikiSubscriptionHandler(email, wiki?.id, userAddress, toast)
      setIsSubscribeClicked(false)
    } else if (wiki) {
      SubscribeWikiHandler(email, wiki, userAddress, toast)
      setIsSubscribeClicked(true)
    }
  }

  useEffect(() => {
    if (userAddress && token) {
      profileApiClient.setHeader('authorization', token)
      setAccount(userAddress)
    }
  }, [token, userAddress, wiki, toast, setAccount])

  return (
    <Modal
      enableBottomCloseButton={false}
      isOpen={isOpen}
      title="Subscribe to wiki"
      onClose={onClose}
      isCentered
      SecondaryButton={
        token && (
          <Button onClick={handleSubscriptionMutation}>
            {isWikiSubscribed ? 'Unsubscribe' : 'Subscribe'}
          </Button>
        )
      }
    >
      {loading && <Text>Loading...</Text>}
      {!loading && !token && SIGN_TOKEN_MESSAGE}
      {!loading &&
        token &&
        (isWikiSubscribed || isSubscribeClicked
          ? UNSUBSCRIBE_MESSAGE
          : SUBSCRIBE_MESSAGE)}
    </Modal>
  )
}

export default SubscribeModal
