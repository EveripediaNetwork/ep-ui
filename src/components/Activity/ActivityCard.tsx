import React, { useEffect, useState } from 'react'
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
import { Image } from '../Elements/Image/Image'

interface ActivityCardProps {
  id: string
  wikiImg: string
  title: string
  brief: string
  editor: string
  wordsChanged: number
  isFirstEdit: boolean
  percentChanged: number
  lastModTimeStamp: string
}

function timeSince(timeStamp: string) {
  const seconds = Math.floor(
    (new Date().valueOf() - new Date(timeStamp).valueOf()) / 1000,
  )
  let interval = seconds / 31536000
  if (interval > 1) {
    return `${Math.floor(interval)} years`
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return `${Math.floor(interval)} months`
  }
  interval = seconds / 86400
  if (interval > 1) {
    return `${Math.floor(interval)} days`
  }
  interval = seconds / 3600
  if (interval > 1) {
    return `${Math.floor(interval)} hours`
  }
  interval = seconds / 60
  if (interval > 1) {
    return `${Math.floor(interval)} minutes`
  }
  return `${Math.floor(seconds)} seconds`
}

function timeReminding(timeStamp: string) {
  const seconds = Math.floor(
    (new Date().valueOf() - new Date(timeStamp).valueOf()) / 1000,
  )
  const timeRemaining = 12 * 3600 - seconds
  const hours = Math.floor(timeRemaining / 3600)
  const minutes = Math.floor((timeRemaining - hours * 3600) / 60)
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

const ActivityCard = ({
  id,
  wikiImg,
  title,
  brief,
  editor,
  wordsChanged,
  percentChanged,
  isFirstEdit,
  lastModTimeStamp,
}: ActivityCardProps) => {
  const [timeModified, setTimeModified] = useState<string | null>()
  const [voteTimeReminding, setVoteTimeReminding] = useState<string | null>()
  const editDetails = useBreakpointValue({
    base: (
      <Text fontSize="14px" opacity={0.6}>
        {timeModified} ago
      </Text>
    ),
    md: (
      <Text fontSize="14px" color="linkColor">
        <NextLink href="#" passHref>
          <Link href="passRef" color="brand.500" fontWeight="bold">
            {editor}
          </Link>
        </NextLink>{' '}
        edited <b>{timeModified} ago</b> |{' '}
        {isFirstEdit ? 'First Edit ' : `${percentChanged * 100}% Changed `}
      </Text>
    ),
    lg: (
      <Text fontSize="14px" color="linkColor">
        <NextLink href="#" passHref>
          <Link href="passRef" color="brand.500" fontWeight="bold">
            {editor}
          </Link>
        </NextLink>{' '}
        edited <b>{timeModified} ago</b> |{' '}
        {isFirstEdit ? 'First Edit ' : `${percentChanged * 100}% Changed `}(
        {wordsChanged} words)
      </Text>
    ),
  })

  useEffect(() => {
    // set last modified time on first render
    setTimeModified(timeSince(lastModTimeStamp))

    // update last modified time every 5 seconds
    const intervalId = setInterval(() => {
      setTimeModified(timeSince(lastModTimeStamp))
      setVoteTimeReminding(timeReminding(lastModTimeStamp))
    }, 5000)

    // clean up setInterval
    return () => clearInterval(intervalId)
  }, [lastModTimeStamp])

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
          <Link href="passRef">
            <Image
              cursor="pointer"
              flexShrink={0}
              src={wikiImg}
              alt="wikiImg"
              h={{ base: 65, lg: 100 }}
              w={{ base: 65, lg: 100 }}
              borderRadius="lg"
              overflow="hidden"
            />
          </Link>
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
            <Link href="passRef">
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
            </Link>
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
          <Text fontSize="14px" opacity={0.6} whiteSpace="nowrap">
            {voteTimeReminding} remaining
          </Text>
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
