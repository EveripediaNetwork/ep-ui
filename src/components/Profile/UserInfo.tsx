import React from 'react'

import { Flex } from '@chakra-ui/react'
import { UserDetails } from '@/components/Profile/UserDetails'
import { useProfileContext } from '@/components/Profile/utils'

const UserInfo = () => {
  const { headerIsSticky, headerRef } = useProfileContext()

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        flex="auto"
        w="full"
        px="6"
        pos="fixed"
        top="70px"
        bg="white"
        _dark={{ bg: 'gray.800' }}
        zIndex={headerIsSticky ? 1300 : -1}
        borderTopWidth={headerIsSticky ? '1px' : '0px'}
        shadow="md"
        opacity={headerIsSticky ? 1 : 0}
      >
        <UserDetails hide />
      </Flex>
      <Flex flex="auto" w="full" direction="column" ref={headerRef}>
        <UserDetails />
      </Flex>
    </>
  )
}

export default UserInfo
