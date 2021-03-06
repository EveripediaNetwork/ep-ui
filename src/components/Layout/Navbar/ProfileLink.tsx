import { Box, MenuItem, Icon } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { RiAccountCircleFill } from 'react-icons/ri'
import { useAccount } from 'wagmi'

export const ProfileLink = () => {
  const { address: userAddress } = useAccount()
  const router = useRouter()
  const [link, setLink] = useState(
    userAddress ? `/account/${userAddress}` : '/login',
  )

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
        pr={3}
      />
      <Box fontSize="md" fontWeight={600} color="linkColor">
        Profile
      </Box>
    </MenuItem>
  )
}
