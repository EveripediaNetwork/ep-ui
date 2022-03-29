import { Box, MenuItem, Link, Icon } from '@chakra-ui/react'
import React from 'react'
import { RiAccountCircleFill } from 'react-icons/ri'
import { useAccount } from 'wagmi'

export const ProfileLink = () => {
  const [{ data }] = useAccount()
  return (
    <Link
      order={-1}
      href={data?.address ? `/account/${data?.address}` : '/login'}
      _hover={{
        textDecoration: 'none',
        color: 'linkHoverColor',
      }}
      color="linkColor"
    >
      <MenuItem minH="48px" bg="subMenuBg">
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
    </Link>
  )
}
