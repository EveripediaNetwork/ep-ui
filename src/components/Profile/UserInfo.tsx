import React, { useEffect, useRef, useState } from 'react'

import { Flex } from '@chakra-ui/react'
import { UserDetails } from '@/components/Profile/UserDetails'

const UserInfo = () => {
  const [stickyHeader, setStickyHeader] = useState<boolean>(false)

  const headerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (!headerRef?.current) return
      const headerIsSticky = window.pageYOffset > headerRef?.current?.offsetTop
      setStickyHeader(headerIsSticky)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    // clean up code
    return () => window.removeEventListener('scroll', onScroll)
  }, [stickyHeader])

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
        // display={stickyHeader ? 'flex' : 'none'}
        opacity={stickyHeader ? 1 : 0}
        transition="all .03s ease"
      >
        <UserDetails stickyHeader={stickyHeader} hide />
      </Flex>
      <Flex
        align="center"
        justify="space-between"
        flex="auto"
        w="full"
        px="6"
        ref={headerRef}
      >
        <UserDetails stickyHeader={stickyHeader} />
      </Flex>
    </>
  )
}

export default UserInfo
