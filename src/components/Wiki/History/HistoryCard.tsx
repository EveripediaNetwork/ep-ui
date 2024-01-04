import React from 'react'
import {
  Box,
  Flex,
  HStack,
  Icon,
  Link,
  LinkBox,
  Stack,
  Tag,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { TriangleUpIcon } from '@chakra-ui/icons'
import { useENSData } from '@/hooks/useENSData'
import { shortenAccount, shortenText } from '@/utils/textUtils'
import DisplayAvatar from '@/components/Elements/Avatar/DisplayAvatar'
import { format } from 'date-fns'
import { MdFormatQuote } from 'react-icons/md'
import config from '@/config'
import { User } from '@everipedia/iq-utils'
import LinkOverlay from '@/components/Elements/LinkElements/LinkOverlay'
import { LinkButton } from '@/components/Elements'
import { RiHistoryLine } from 'react-icons/ri'
import { getUsername } from '@/utils/DataTransform/getUsername'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { enIN, ko } from 'date-fns/locale'

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
        bgColor="brandLinkColor"
      />
    </HStack>
  )
}

interface HistoryCardProps {
  isUserLoggedIn: boolean
  activityId: string
  isRightAligned?: boolean
  isFullWidth?: boolean
  lastEditor?: User
  lastEditedTime?: string
  transactionAddress?: string
  IPFS?: string
  commitMessage?: string
  wordsChanged?: string
  percentChanged?: string
  blocksChanged?: string
}

export const HistoryCard = ({
  isUserLoggedIn,
  activityId,
  isRightAligned,
  isFullWidth,
  lastEditor = { id: '' },
  lastEditedTime,
  transactionAddress = '',
  IPFS = '',
  commitMessage,
  wordsChanged,
  percentChanged,
  blocksChanged = '',
}: HistoryCardProps) => {
  const [, userENSDomain] = useENSData(lastEditor.id)
  const { t } = useTranslation('history')
  const router = useRouter()
  const locale = router.locale ?? 'en'

  // validate wordsChanged, percentChanged
  let checkedWordsChanged = '0'
  if (wordsChanged) {
    checkedWordsChanged = Number.isNaN(Number(wordsChanged))
      ? '0'
      : wordsChanged
  }
  let checkedPercentChanged = '0'
  if (percentChanged) {
    checkedPercentChanged = Number.isNaN(Number(percentChanged))
      ? '0'
      : percentChanged
  }

  return (
    <LinkBox
      pos="relative"
      w={
        isFullWidth
          ? `calc(100% - ${isFullWidth ? '17px' : '15px'})`
          : 'calc(50% - 30px)'
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
          <DisplayAvatar
            alt={lastEditor.profile?.username}
            address={lastEditor.id}
            avatarIPFS={lastEditor.profile?.avatar}
          />
          <Link href={`/account/${lastEditor.id}`} color="brandLinkColor">
            {getUsername(lastEditor, userENSDomain)}
          </Link>
        </HStack>

        {/* Date of the last edit */}
        <LinkOverlay href={`/revision/${activityId}`}>
          {lastEditedTime && (
            <Text fontSize={{ base: 'xs', md: 'sm' }} color="fadedText2">
              {format(new Date(lastEditedTime), 'MMMM d, yyyy', {
                locale: String(locale) === 'en' ? enIN : ko,
              })}{' '}
              {format(new Date(lastEditedTime), 'h:mm a', {
                locale: String(locale) === 'en' ? enIN : ko,
              })}
            </Text>
          )}
        </LinkOverlay>
      </HStack>

      {/* Commit message */}
      {commitMessage && (
        <Box
          pos="relative"
          py={1}
          px={4}
          my={4}
          ml={2.5}
          borderLeftWidth="2px"
          borderLeftColor="brand.400"
        >
          <Icon
            pos="absolute"
            left={0}
            top="50%"
            transform="translate(-50%, -50%)"
            as={MdFormatQuote}
            fontSize="20px"
            bgColor="cardBg"
            color="brandLinkColor"
          />
          <Text fontSize="sm" color="text.500" my={2}>
            <i>{shortenText(commitMessage, 90)}</i>
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
                <Tooltip label={`${checkedWordsChanged} words changed`}>
                  <Text cursor="pointer">{` ${checkedPercentChanged}`}%</Text>
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
        px={4}
        py={isUserLoggedIn ? 4 : 2}
        mt={4}
        justify="space-between"
        align="end"
      >
        <Stack
          direction={isUserLoggedIn ? 'column' : 'row'}
          justifyContent="space-between"
          w="full"
        >
          <HStack>
            <Text fontSize="sm" color="text.500">
              {isUserLoggedIn ? 'TX Address:' : 'TX:'}
            </Text>
            <Link
              href={`${config.blockExplorerUrl}/tx/${transactionAddress}`}
              color="brandLinkColor"
              ml={2}
              isExternal
              fontSize="sm"
            >
              {shortenAccount(transactionAddress)}
            </Link>
          </HStack>
          <HStack>
            <Text fontSize="sm" color="text.500">
              {isUserLoggedIn ? 'IPFS Hash:' : 'IPFS:'}
            </Text>
            <Link
              href={`${config.pinataBaseUrl}${IPFS}`}
              color="brandLinkColor"
              ml={2}
              isExternal
              rel="noopener nofollow"
              fontSize="sm"
            >
              {shortenAccount(IPFS)}
            </Link>
          </HStack>
        </Stack>
        {isUserLoggedIn && (
          <LinkButton
            leftIcon={<RiHistoryLine />}
            mt={4}
            size="sm"
            variant="outline"
            px={6}
            color="linkColor"
            href={`/create-wiki?revision=${activityId}`}
          >
            {t('restore')}
          </LinkButton>
        )}
      </HStack>
    </LinkBox>
  )
}
