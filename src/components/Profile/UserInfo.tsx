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
        zIndex="sticky"
        shadow="lg"
        opacity={headerIsSticky ? 1 : 0}
        transition="all .03s ease"
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
