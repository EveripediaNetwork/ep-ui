import React from 'react'
import {
  HStack,
  VStack,
  Heading,
  Text,
  Box,
  Link,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react'
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa'
import NextLink from 'next/link'
import shortenAccount from '@/utils/shortenAccount'
import { WikiImage } from '@/components/WikiImage'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { WikiPreview } from '@/types/Wiki'
import TimeModified from './TimeModified'
import VoteTimeRemaining from './VoteTimeRemaining'

interface ActivityCardProps {
  id: string
  title: string
  brief: string
  editor: string
  wordsChanged: number
  isFirstEdit: boolean
  percentChanged: number
  lastModTimeStamp: string
  wiki: WikiPreview
}

const ActivityCard = ({
  id,
  title,
  brief,
  editor,
  wordsChanged,
  percentChanged,
  isFirstEdit,
  lastModTimeStamp,
  wiki,
}: ActivityCardProps) => {
  const editDetails = useBreakpointValue({
    base: (
      <Text fontSize="14px" opacity={0.6}>
        <TimeModified lastModTimeStamp={lastModTimeStamp} />
      </Text>
    ),
    md: (
      <Text fontSize="14px" color="linkColor">
        <NextLink href={`/account/${editor}`} passHref>
          <Link href="passRef" color="brand.500" fontWeight="bold">
            {shortenAccount(editor || '')}
          </Link>
        </NextLink>{' '}
        edited <TimeModified lastModTimeStamp={lastModTimeStamp} /> |{' '}
        {isFirstEdit ? 'First Edit ' : `${percentChanged * 100}% Changed `}
      </Text>
    ),
    lg: (
      <Text fontSize="14px" color="linkColor">
        <NextLink href={`/account/${editor}`} passHref>
          <Link href="passRef" color="brand.500" fontWeight="bold">
            {shortenAccount(editor || '')}
          </Link>
        </NextLink>{' '}
        edited <TimeModified lastModTimeStamp={lastModTimeStamp} /> |{' '}
        {isFirstEdit ? 'First Edit ' : `${percentChanged * 100}% Changed `}(
        {wordsChanged} words)
      </Text>
    ),
  })

  return (
    <HStack
      bgColor="cardBg"
      justifyContent="space-between"
      borderWidth="1px"
      borderColor="cardBorder"
      borderRadius="lg"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.10)"
      px={{ base: 3, lg: 5 }}
      py={{ base: 3, lg: 1 }}
      w="100%"
    >
      <HStack maxW="70%">
        <NextLink href={`/wiki/${id}`} passHref>
          <WikiImage
            cursor="pointer"
            flexShrink={0}
            imageURL={getWikiImageUrl(wiki)}
            h={{ base: 65, lg: 100 }}
            w={{ base: 65, lg: 100 }}
            borderRadius="lg"
            overflow="hidden"
          />
        </NextLink>
        <VStack
          alignItems="start"
          px={4}
          spacing={{ base: 1, lg: 2 }}
          minW={0}
          p={{ base: 1, lg: 4 }}
          mx="auto"
        >
          <NextLink href={`/wiki/${id}`} passHref>
            <Heading
              cursor="pointer"
              as="h2"
              fontSize={{ base: '16px', md: '20px' }}
              maxW="100%"
              letterSpacing="wide"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {title}
            </Heading>
          </NextLink>
          <Box maxH="50px" overflow="hidden">
            <Text display={{ base: 'none', lg: 'flex' }}>{brief}</Text>
          </Box>
          <HStack>{editDetails}</HStack>
        </VStack>
      </HStack>
      <HStack gap={10} ml="0 !important">
        <VStack spacing={2} display={{ base: 'none', lg: 'flex' }}>
          <Button>Vote</Button>
          <VoteTimeRemaining lastModTimeStamp={lastModTimeStamp} />
        </VStack>
        <HStack
          marginInlineStart="0 !important"
          flexDirection={{ base: 'column', lg: 'row' }}
          gap={3}
          minW={0}
        >
          <Button
            aria-label="up-vote"
            leftIcon={<FaThumbsDown color="#e04c60" />}
            variant="outline"
            p={3}
            fontSize={{ base: '14px', lg: '16px' }}
            height={{ base: '30px', lg: '40px' }}
            color="linkColor"
          >
            0 IQ
          </Button>
          <Button
            aria-label="up-vote"
            leftIcon={<FaThumbsUp color="#318c48" />}
            variant="outline"
            p={3}
            fontSize={{ base: '14px', lg: '16px' }}
            height={{ base: '30px', lg: '40px' }}
            color="linkColor"
          >
            50 IQ
          </Button>
        </HStack>
      </HStack>
    </HStack>
  )
}

export default ActivityCard
