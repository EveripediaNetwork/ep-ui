import { Image } from '@/components/Elements/Image/Image'
import { CheckIcon } from '@chakra-ui/icons'
import {
  Flex,
  chakra,
  IconButton,
  Button,
  Text,
  useClipboard,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import React from 'react'
import { FaEthereum, FaShareAlt } from 'react-icons/fa'

const Profile: NextPage = () => {
  const ethAddress = '0x9feab70f3c4a944b97b7565bac4991df5b7a69ff'

  const { hasCopied, onCopy } = useClipboard(ethAddress)

  return (
    <Flex direction="column" align="center">
      <Image
        width="full"
        height="56"
        objectFit="cover"
        src="https://lh3.googleusercontent.com/1xS2CAb5FcEtqJKjgPQNhbNwRgbB9_ypoD9TEgV02rTC06x_TaVxczHBrbEmjLtdoSfoY8Uc1bo-tTv48GsV0rTcOwdgYWGLd7ZHkj4=h600"
      />
      <Flex align="center" justify="space-between" flex="auto" w="full" px="6">
        <br />
        <Flex direction="column" align="center" gap="3" mb="6">
          <Image
            mt="-64px"
            boxSize="32"
            rounded="full"
            overflow="hidden"
            borderWidth={2}
            borderColor="white"
            justifySelf="center"
            src="https://lh3.googleusercontent.com/T95Oaa_1nYxdiPhxsmMAOfiYHfPTM7hygE3TOOUquN3m99cOooZrLrUcqDlJyY7Ox8OO6L-1AuIHsl5ZrENa1h0engxw7ab2kPiwaKc=s0"
          />
          <chakra.span
            fontSize="3xl"
            fontWeight="semibold"
            letterSpacing="tighter"
          >
            kesarito
          </chakra.span>
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
    </Flex>
  )
}
export default Profile
