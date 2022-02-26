import React from 'react'

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
import { useProfileContext } from '@/components/Profile/utils'

export type UserDetailsProps = { hide?: boolean }

const ethAddress = '0x9feab70f3c4a944b97b7565bac4991df5b7a69ff'

export const UserDetails = (props: UserDetailsProps) => {
  const { hide } = props
  const { headerIsSticky } = useProfileContext()
  const { hasCopied, onCopy } = useClipboard(ethAddress)
  const isSticky = headerIsSticky && hide
  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        w="full"
        px="6"
      >
        <chakra.span flex="1" />

        <Flex
          direction={isSticky ? 'row' : 'column'}
          align="center"
          gap="3"
          flex="1"
          justifyContent="center"
        >
          <Image
            mt="-64px"
            boxSize="32"
            rounded="full"
            overflow="hidden"
            borderWidth={2}
            borderColor="white"
            justifySelf="center"
            src="https://lh3.googleusercontent.com/T95Oaa_1nYxdiPhxsmMAOfiYHfPTM7hygE3TOOUquN3m99cOooZrLrUcqDlJyY7Ox8OO6L-1AuIHsl5ZrENa1h0engxw7ab2kPiwaKc=s0"
            {...(isSticky && { mt: 0, boxSize: 12 })}
          />
          <chakra.span
            fontSize={isSticky ? '2xl' : '3xl'}
            fontWeight="semibold"
            letterSpacing="tighter"
          >
            kesarito
          </chakra.span>
        </Flex>
        <chakra.span display="flex" flex="1">
          <IconButton
            ml="auto"
            boxSize="12"
            aria-label="Share"
            my="6"
            icon={<FaShareAlt />}
            variant="outline"
            rounded="xl"
            _hover={{ shadow: 'xl' }}
          />
        </chakra.span>
      </Flex>

      {!isSticky && (
        <Flex
          gap="3"
          direction="column"
          px="6"
          w="full"
          align="center"
        >
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
        </Flex>
      )}
    </>
  )
}
