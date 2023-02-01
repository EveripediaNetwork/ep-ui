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
import { Button } from '@chakra-ui/react'

interface SubscribeModalProps {
  isOpen: boolean
  onClose: () => void
  wiki: Wiki
}

const SubscribeModal = ({ isOpen, onClose, wiki }: SubscribeModalProps) => {
  const { token } = useWeb3Token()
  const { address: userAddress } = useAccount()
  const { profileData } = useUserProfileData(
    userAddress,
    UserProfileFetchOptions.ONLY_EMAIL_AND_SUBSCRIPTIONS,
  )
  const toast = useToast()

  const handleSubscriptionMutation = async () => {
    if (!userAddress) return

    const email = profileData?.email
    const isWikiSubscribed = profileData?.subscriptions?.includes(wiki?.id)

    if (isWikiSubscribed) {
      RemoveWikiSubscriptionHandler(email, wiki?.id, userAddress, toast)
    } else if (wiki) {
      SubscribeWikiHandler(email, wiki, userAddress, toast)
    }
  }

  useEffect(() => {
    if (userAddress && token) {
      profileApiClient.setHeader('authorization', token)
    }
  }, [token, userAddress, wiki, toast])

  return (
    <Modal
      enableBottomCloseButton
      isOpen={isOpen}
      title="Subscribe to wiki"
      onClose={onClose}
      SecondaryButton={
        <Button onClick={handleSubscriptionMutation}>Subscribe</Button>
      }
    >
      <p>Subscribe to wiki</p>
    </Modal>
  )
}

export default SubscribeModal
