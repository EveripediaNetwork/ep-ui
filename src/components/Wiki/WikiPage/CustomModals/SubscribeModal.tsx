import React, { useEffect } from 'react'
import { Modal } from '@/components/Elements'
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
import { RootState, store } from '@/store/store'
import { getAllWikiSubscription } from '@/services/notification'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import { useAddress } from '@/hooks/useAddress'

interface SubscribeModalProps {
  isOpen: boolean
  onClose: () => void
  wiki: Wiki
}

const SubscribeModal = ({ isOpen, onClose, wiki }: SubscribeModalProps) => {
  const { t } = useTranslation('common')
  const SIGN_TOKEN_MESSAGE = t('signTokenMessage')
  const SUBSCRIBE_MESSAGE = t('subscribeMessage')
  const UNSUBSCRIBE_MESSAGE = t('unsubscribeMessage')
  const token = useSelector((state: RootState) => state.user.token)
  const { address: userAddress } = useAddress()
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

    setIsSubscribed((p) => !p)
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
          ? data.some((w) => w.auxiliaryId === wiki.id)
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
      title={isSubscribed ? t('subscribed') : t('subscribeWiki')}
      onClose={onClose}
      isCentered
      SecondaryButton={
        token &&
        !isLoading && (
          <Button
            variant={isSubscribed ? 'outline' : 'solid'}
            onClick={handleSubscriptionMutation}
          >
            {isSubscribed ? t('unsubscribe') : t('subscribe')}
          </Button>
        )
      }
    >
      {isLoading && <Text color="gray.500">{t('checkingStatus')}</Text>}
      {!isLoading && !token && SIGN_TOKEN_MESSAGE}
      {!isLoading &&
        token &&
        (isSubscribed ? UNSUBSCRIBE_MESSAGE : SUBSCRIBE_MESSAGE)}
    </Modal>
  )
}

export default SubscribeModal
