import { Box, MenuItem, Icon } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { RiAccountCircleFill } from 'react-icons/ri'
import { useAccount } from 'wagmi'

export const ProfileLink = () => {
  const { data } = useAccount()
  const router = useRouter()
  const [link, setLink] = useState(
    data?.address ? `/account/${data?.address}` : '/login',
  )

  useEffect(() => {
    setLink(data?.address ? `/account/${data?.address}` : '/login')
  }, [data?.address])

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
