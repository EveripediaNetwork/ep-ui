import { Button, Flex, Icon } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { RiAccountCircleFill } from 'react-icons/ri'
import { getUserAddressFromCache } from '@/utils/WalletUtils/getUserAddressFromCache'
import { useTranslation } from 'next-i18next'

export const ProfileLink = () => {
  const userAddress = getUserAddressFromCache()
  const router = useRouter()
  const [link, setLink] = useState(
    userAddress ? `/account/${userAddress}` : '/login',
  )
  const { t } = useTranslation('common')

  useEffect(() => {
    setLink(userAddress ? `/account/${userAddress}` : '/login')
  }, [userAddress])

  return (
    <>
      <Button
        minH="48px"
        px={3}
        bgColor={'transparent'}
        sx={{ '&:hover, &:focus, &:active': { bgColor: 'subMenuHoverBg' } }}
        onClick={() => router.push(link)}
        w="full"
      >
        <Icon
          fontSize="4xl"
          color="linkColor"
          fontWeight={600}
          as={RiAccountCircleFill}
          pr={3}
        />
        <Flex
          // ml={isInMobileMenu ? 2 : 'unset'}
          fontSize="md"
          fontWeight="semibold"
          color="linkColor"
          flex="auto"
        >
          <span>{t('Profile')}</span>
        </Flex>
      </Button>
    </>
  )
}
