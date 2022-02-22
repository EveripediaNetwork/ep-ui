import React, { useEffect, useRef, useState } from 'react'

import { CheckIcon } from '@chakra-ui/icons'
import {
  Flex,
  chakra,
  IconButton,
  Button,
  Text,
  useClipboard,
} from '@chakra-ui/react'
import { FaEthereum, FaShareAlt } from 'react-icons/fa'
import { Image } from '@/components/Elements/Image/Image'

const UserInfo = () => {
  const ethAddress = '0x9feab70f3c4a944b97b7565bac4991df5b7a69ff'
  const { hasCopied, onCopy } = useClipboard(ethAddress)

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
    <Flex
      align="center"
      justify="space-between"
      flex="auto"
      w="full"
      px="6"
      ref={headerRef}
      {...(stickyHeader && {
        pos: 'fixed',
        top: '70px',
        bg: 'white',
        zIndex: 'sticky',
        shadow: 'lg',
      })}
    >
      <br />
      <Flex direction={stickyHeader ? 'row' : 'column'} align="center" gap="3">
        <Image
          mt="-64px"
          boxSize="32"
          rounded="full"
          overflow="hidden"
          borderWidth={2}
          borderColor="white"
          justifySelf="center"
          src="https://lh3.googleusercontent.com/T95Oaa_1nYxdiPhxsmMAOfiYHfPTM7hygE3TOOUquN3m99cOooZrLrUcqDlJyY7Ox8OO6L-1AuIHsl5ZrENa1h0engxw7ab2kPiwaKc=s0"
          {...(stickyHeader && { mt: 0, boxSize: 12 })}
        />
        <chakra.span
          fontSize={stickyHeader ? '2xl' : '3xl'}
          fontWeight="semibold"
          letterSpacing="tighter"
        >
          kesarito
        </chakra.span>
        {!stickyHeader && (
          <>
            <Flex align="center" gap="2" color="gray.500">
              <chakra.span fontWeight="medium">kesar.eth</chakra.span>
              <Button
                variant="outline"
                rounded="full"
                color="gray.500"
                h="fit-content"
                leftIcon={<FaEthereum />}
                p="2"
                onClick={onCopy}
                rightIcon={hasCopied ? <CheckIcon color="green" /> : undefined}
              >
                <Text w="24" isTruncated>
                  {ethAddress}
                </Text>
              </Button>
            </Flex>
            <chakra.span color="gray.500">Joined November 2020</chakra.span>
          </>
        )}
      </Flex>
      <IconButton
        boxSize="12"
        aria-label="Share"
        my="6"
        icon={<FaShareAlt />}
        variant="outline"
        rounded="xl"
        _hover={{ shadow: 'xl' }}
      />
    </Flex>
  )
}

export default UserInfo
