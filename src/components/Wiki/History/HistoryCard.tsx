import React from 'react'
import {
  Box,
  Flex,
  HStack,
  Icon,
  Link,
  Tag,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { TriangleUpIcon } from '@chakra-ui/icons'
import { useENSData } from '@/hooks/useENSData'
import shortenAccount from '@/utils/shortenAccount'
import DisplayAvatar from '@/components/Elements/Avatar/Avatar'
import { format } from 'date-fns'
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
  transactionAddress?: string
  commitMessage?: string
  wordsChanged?: string
  percentChanged?: string
  blocksChanged?: string
}

export const HistoryCard = ({
  isRightAligned,
  isFullWidth,
  lastEditor = '',
  lastEditedTime,
  transactionAddress = '',
  commitMessage,
  wordsChanged = '0',
  percentChanged = '0',
  blocksChanged = '',
}: HistoryCardProps) => {
  const [, username] = useENSData(lastEditor)
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

      <HStack justify="space-between">
        {/* Username and Avatar of the last editor */}
        <HStack>
          <DisplayAvatar address={lastEditor} />
          <Link href={`/account/${lastEditor}`} color="brand.500">
            {username || shortenAccount(lastEditor)}
          </Link>
        </HStack>

        {/* Date of the last edit */}
        {lastEditedTime && (
          <Text fontSize="sm" color="gray.500" mt={2}>
            {format(new Date(lastEditedTime), 'MMMM d, yyyy')} at{' '}
            {format(new Date(lastEditedTime), 'h:mm a')}
          </Text>
        )}
      </HStack>

      {/* Commit message */}
      {commitMessage && (
        <Box
          pos="relative"
          py={2}
          px={4}
          my={4}
          bgColor="historyCommentBg"
          boxShadow="0px 0px 4px rgba(0, 0, 0, 0.25);"
          borderRadius={4}
        >
          <Box
            w="70px"
            pos="absolute"
            top={0}
            left={6}
            transform="translateY(-100%)"
          >
            <Box
              width="30%"
              position="relative"
              overflow="hidden"
              paddingBottom="21.27%"
              _before={{
                content: "''",
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
                backgroundColor: 'historyCommentBg',
                transformOrigin: '0 100%',
                transform: 'rotate(45deg)',
              }}
            />
          </Box>
          <Text fontSize="sm" color="text.500" my={2}>
            {shortenText(commitMessage, 90)}
          </Text>
        </Box>
      )}

      {/* What Changed tags */}
      {blocksChanged !== '' && (
        <Flex flexWrap="wrap" mt={2} justify="start" gap={2}>
          {blocksChanged.split(',').map((changed, i) => (
            <Tag
              mx="0 !important"
              variant="outline"
              boxShadow="0 0 0 1px rgba(226, 232, 240, 1)"
              borderRadius={2}
              _dark={{ boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.16)' }}
              color={{ light: 'black', _dark: 'white' }}
              size="sm"
              key={i}
              gap={1}
            >
              <Text>{changed}</Text>

              {changed === 'content' && (
                <Tooltip label={`${wordsChanged} words changed`}>
                  <Text cursor="pointer">{` ${percentChanged}`}%</Text>
                </Tooltip>
              )}
            </Tag>
          ))}
        </Flex>
      )}

      {/* Transaction address and restore button */}
      <HStack
        borderTopWidth={1}
        m={-4}
        p={2}
        px={4}
        mt={3}
        justify="space-between"
      >
        <Text fontSize="sm" color="text.500">
          Transaction Address:
        </Text>
        <Link
          href={`https://etherscan.io/tx/${transactionAddress}`}
          color="brand.500"
          ml={2}
          isExternal
        >
          {shortenAccount(transactionAddress)}
        </Link>
      </HStack>
    </Box>
  )
}
