import { Box, MenuItem, Icon } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { RiAccountCircleFill } from 'react-icons/ri'
import { useTranslation } from 'next-i18next'
import { useAddress } from '@/hooks/useAddress'

export const ProfileLink = () => {
  const { address: userAddress } = useAddress()
  const router = useRouter()
  const [link, setLink] = useState(
    userAddress ? `/account/${userAddress}` : '/login',
  )
  const { t } = useTranslation('common')

  useEffect(() => {
    setLink(userAddress ? `/account/${userAddress}` : '/login')
  }, [userAddress])

  return (
    <MenuItem
      order={-1}
      onClick={() => router.push(link)}
      minH="48px"
      bg="subMenuBg"
    >
      <Icon
        cursor="pointer"
        fontSize="4xl"
        fontWeight={600}
        as={RiAccountCircleFill}
        color="linkColor"
        pr={3}
      />
      <Box fontSize="md" fontWeight={600} color="linkColor">
        {t('Profile')}
      </Box>
    </MenuItem>
  )
}
