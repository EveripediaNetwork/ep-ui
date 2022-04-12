import React from 'react'
import {
  HStack,
  Heading,
  Text,
  Box,
  Link,
  Tag,
  useBreakpointValue,
  Flex,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import shortenAccount from '@/utils/shortenAccount'
import { WikiImage } from '@/components/WikiImage'
import { WikiTitle } from '@/services/nav-search'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import VoteTimeRemaining from './VoteTimeRemaining'
import DisplayAvatar from '../Elements/Avatar/Avatar'

interface ActivityCardProps {
  id: string
  title: string
  brief: string
  editor: string
  lastModTimeStamp: string
  wiki: WikiTitle
}

const ActivityCard = ({
  id,
  title,
  brief,
  editor,
  lastModTimeStamp,
  wiki,
}: ActivityCardProps) => {
  const editDetails = useBreakpointValue({
    base: (
      <Box>
        <HStack>
          <DisplayAvatar size="xl" mt={1} />
          <Text fontSize="14px" color="linkColor">
            <NextLink href={`/account/${editor}`} passHref>
              <Link href="passRef" color="brand.500" fontWeight="bold">
                {shortenAccount(editor || '')}
              </Link>
            </NextLink>
          </Text>
        </HStack>
        <VoteTimeRemaining lastModTimeStamp={lastModTimeStamp} />
      </Box>
    ),
    md: (
      <Flex justifyContent="space-between" w="full">
        <Box>
          <HStack flex="1">
            <DisplayAvatar size="xl" mt={1} />
            <Text fontSize="14px" color="linkColor">
              <NextLink href={`/account/${editor}`} passHref>
                <Link href="passRef" color="brand.500" fontWeight="bold">
                  {shortenAccount(editor || '')}
                </Link>
              </NextLink>
            </Text>
          </HStack>
        </Box>
        <Box>
          <VoteTimeRemaining lastModTimeStamp={lastModTimeStamp} />
        </Box>
      </Flex>
    ),
    lg: (
      <Flex justifyContent="space-between" w="full">
        <Box>
          <HStack flex="1">
            <DisplayAvatar size="xl" mt={1} />
            <Text fontSize="14px" color="linkColor">
              <NextLink href={`/account/${editor}`} passHref>
                <Link href="passRef" color="brand.500" fontWeight="bold">
                  {shortenAccount(editor || '')}
                </Link>
              </NextLink>
            </Text>
            <HStack spacing={2}>
              {['red', 'green', 'yellow', 'purple', 'teal'].map(color => (
                <Tag
                  key={color}
                  borderRadius={6}
                  variant="solid"
                  colorScheme={color}
                >
                  <Text px={4} color="textColor">
                    {' '}
                    NFT
                  </Text>
                </Tag>
              ))}
            </HStack>
          </HStack>
        </Box>
        <Box>
          <VoteTimeRemaining lastModTimeStamp={lastModTimeStamp} />
        </Box>
      </Flex>
    ),
  })

  return (
    <HStack
      bgColor="cardBg"
      justifyContent="flex-start"
      borderWidth="1px"
      borderColor="cardBorder"
      borderRadius="lg"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.10)"
      px={{ base: 3, lg: 5 }}
      py={{ base: 3, lg: 3 }}
      w="full"
    >
      <NextLink href={`/wiki/${id}`} passHref>
        <WikiImage
          cursor="pointer"
          flexShrink={0}
          imageURL={getWikiImageUrl(wiki)}
          h={{ base: 70, lg: 100 }}
          w={{ base: 70, lg: 100 }}
          borderRadius="lg"
          overflow="hidden"
        />
      </NextLink>
      <Box w="100%" px={4} p={{ base: 1, lg: 4 }} mx="auto">
        <Flex mb={{ base: 0, md: 2 }} justifyContent="space-between">
          <NextLink href={`/wiki/${id}`} passHref>
            <Heading
              cursor="pointer"
              as="h2"
              fontSize={{ base: '16px', md: '20px' }}
              letterSpacing="wide"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              w={{ base: '50%', md: '100%' }}
            >
              {title}
            </Heading>
          </NextLink>
          <Text color="brand.500" fontWeight="bold">
            NFTs
          </Text>
        </Flex>
        <Box mb="2" maxW="80%" overflow="hidden">
          <Text display={{ base: 'none', md: 'flex' }}>{brief}</Text>
        </Box>
        {editDetails}
      </Box>
    </HStack>
  )
}

export default ActivityCard
