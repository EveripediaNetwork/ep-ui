import { setStateToDefault } from '@/store/slices/user-slice'
import { Flex, Icon, MenuItem } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { RiLogoutBoxRFill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { useDisconnect, useAccount } from 'wagmi'

export const LogOutBtn = ({ isInMobileMenu }: { isInMobileMenu: boolean }) => {
  const { isConnected: isUserConnected } = useAccount()
  const dispatch = useDispatch()
  const { disconnect } = useDisconnect()
  const router = useRouter()
  const handleLogOut = () => {
    disconnect()
    dispatch(setStateToDefault())
    window.localStorage.removeItem('USER_TOKEN')
    router.push(router.asPath)
  }
  return (
    <>
      <Flex>
        <MenuItem
          minH="48px"
          borderTopWidth={isInMobileMenu ? 0 : '1px'}
          px={isInMobileMenu ? 0 : 3}
          bgColor={!isInMobileMenu ? 'subMenuBg' : 'transparent'}
          sx={{ '&:hover, &:focus, &:active': { bgColor: 'subMenuHoverBg' } }}
          onClick={isUserConnected ? handleLogOut : undefined}
          cursor={isUserConnected ? 'pointer' : 'not-allowed'}
          display={isUserConnected ? 'flex' : 'none'}
        >
          <Icon
            fontSize="4xl"
            color="linkColor"
            fontWeight={600}
            as={RiLogoutBoxRFill}
            pr={3}
          />
          <Flex
            ml={isInMobileMenu ? 2 : 'unset'}
            fontSize="md"
            fontWeight="semibold"
            color="linkColor"
            flex="auto"
          >
            <span style={isInMobileMenu ? { fontSize: 18 } : {}}>Log out</span>
          </Flex>
        </MenuItem>
      </Flex>
    </>
  )
}
