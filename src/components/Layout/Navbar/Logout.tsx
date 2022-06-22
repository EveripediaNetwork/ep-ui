import { setStateToDefault } from '@/store/slices/user-slice'
import { Divider, Flex, Icon, MenuItem } from '@chakra-ui/react'
import React from 'react'
import { RiLogoutBoxRFill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { useDisconnect, useAccount } from 'wagmi'

export const LogOutBttn = ({ isInMobileMenu }: { isInMobileMenu: boolean }) => {
  const userAccount = useAccount()
  const dispatch = useDispatch()
  const { disconnect } = useDisconnect()
  const handleLogOut = () => {
    disconnect()
    dispatch(setStateToDefault())
  }
  return (
    <>
      {!isInMobileMenu && <Divider />}
      <Flex>
        <MenuItem
          minH="48px"
          px={isInMobileMenu ? 0 : 3}
          bgColor={!isInMobileMenu ? 'subMenuBg' : 'transparent'}
          _hover={{ bgColor: 'transparent' }}
          _active={{ bgColor: 'transparent' }}
          _focus={{ bgColor: 'transparent' }}
          onClick={userAccount?.data && handleLogOut}
          cursor={userAccount?.data ? 'pointer' : 'not-allowed'}
          display={userAccount?.data ? '1' : 'none'}
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
            <span style={isInMobileMenu ? { fontSize: 18 } : {}}>Logout</span>
          </Flex>
        </MenuItem>
      </Flex>
    </>
  )
}
