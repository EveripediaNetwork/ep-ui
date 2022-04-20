import React from 'react'
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Link,
  Tag,
  Text,
} from '@chakra-ui/react'
import { TriangleUpIcon } from '@chakra-ui/icons'
import { useENSData } from '@/hooks/useENSData'
import shortenAccount from '@/utils/shortenAccount'
import DisplayAvatar from '@/components/Elements/Avatar/Avatar'
import { format } from 'date-fns'
import { RiHistoryLine } from 'react-icons/ri'
import { shortenText } from '@/utils/shortenText'

interface HistoryCardArrowProps {
  isRightAligned?: boolean
  isFullWidth?: boolean
}

const HistoryCardArrow = ({
  isRightAligned,
  isFullWidth,
}: HistoryCardArrowProps) => {
  return (
    <HStack
      flexDir={isRightAligned ? 'row-reverse' : 'row'}
      justify="space-between"
      pos="absolute"
      top="50%"
      w={isFullWidth ? '15px' : '30px'}
      transform={
        isRightAligned ? 'translate(-100%, -50%)' : 'translate(100%, -50%)'
      }
      right={isRightAligned ? 'unset' : '0'}
      left={isRightAligned ? '0' : 'unset'}
    >
      <Icon
        transform={
          isRightAligned
            ? 'rotate(-90deg) translateY(4px)'
            : 'rotate(90deg) translateY(4px)'
        }
        as={TriangleUpIcon}
        p={0}
        m={0}
        color="cardBg"
      />
      <Box
        flexShrink={0}
        m="0 !important"
        transform={isRightAligned ? 'translateX(-50%)' : 'translateX(50%)'}
        w={2}
        h={2}
        borderRadius="100%"
        bgColor="brand.500"
      />
    </HStack>
  )
}

interface HistoryCardProps {
  isRightAligned?: boolean
  isFullWidth?: boolean
  lastEditor?: string
  lastEditedTime?: string
}

export const HistoryCard = ({
  isRightAligned,
  isFullWidth,
  lastEditor,
  lastEditedTime,
}: HistoryCardProps) => {
  const [, username] = useENSData(lastEditor || '')
  return (
    <Box
      pos="relative"
      w={
        isFullWidth
          ? `calc(100% - ${isFullWidth ? '17px' : '15px'})`
          : `calc(50% - 30px)`
      }
      bgColor="cardBg"
      borderRadius={4}
      p={4}
      ml={isRightAligned ? 'auto' : 'unset'}
      mr={isRightAligned ? '0' : 'unset'}
    >
      <HistoryCardArrow
        isRightAligned={isRightAligned}
        isFullWidth={isFullWidth}
      />

      {/* Username and Avatar of the last editor */}
      <HStack>
        <DisplayAvatar address={lastEditor} />
        <Link href={`/account/${lastEditor}`} color="brand.500">
          {username || shortenAccount(lastEditor || '')}
        </Link>
      </HStack>

      {/* Date of the last edit */}
      {lastEditedTime && (
        <Text fontSize="sm" color="gray.500" mt={2}>
          {format(new Date(lastEditedTime), 'MMMM d, yyyy')} at{' '}
          {format(new Date(lastEditedTime), 'h:mm a')}
        </Text>
      )}

      {/* Content change value */}
      <HStack mt={2}>
        <Icon as={RiHistoryLine} />
        <Text fontSize="md" color="text.500" mt={2}>
          20% content change (250 words)
        </Text>
      </HStack>

      {/* Commit message */}
      <Text fontSize="sm" color="text.500" my={2}>
        {shortenText(
          'ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisleget consectetur tempor',
          90,
        )}
      </Text>

      {/* What Changed tags */}
      <Flex flexWrap="wrap" justify="start" gap={2}>
        {['Content', 'Media', 'Info Box', 'Categories'].map((changed, i) => (
          <Tag
            mx="0 !important"
            variant="outline"
            boxShadow="0 0 0 1px rgba(226, 232, 240, 1)"
            _dark={{ boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.16)' }}
            color={{ light: 'black', _dark: 'white' }}
            size="sm"
            key={i}
          >
            {changed}
          </Tag>
        ))}
      </Flex>

      {/* Transaction address and restore button */}
      <HStack mt={3} justify="space-between">
        <HStack>
          <Text fontSize="sm" color="text.500">
            Tx Address:
          </Text>
          <Link
            href="https://etherscan.io/tx/0x1234567890"
            color="brand.500"
            ml={2}
            isExternal
          >
            {shortenAccount('0x1234567890')}
          </Link>
        </HStack>
        <Button size="xs" p={2} fontSize="sm">
          Restore
        </Button>
      </HStack>
    </Box>
  )
}
