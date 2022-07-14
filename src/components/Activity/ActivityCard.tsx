import React from 'react'
import {
  HStack,
  Heading,
  Text,
  Box,
  Link,
  Tag,
  Flex,
  Stack,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { WikiImage } from '@/components/WikiImage'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { User, Wiki } from '@/types/Wiki'
import { getReadableDate } from '@/utils/getFormattedDate'
import { useRouter } from 'next/router'
import { getUsername } from '@/utils/getUsername'
import DisplayAvatar from '../Elements/Avatar/Avatar'

interface ActivityCardProps {
  title: string
  brief: string
  editor: User
  lastModTimeStamp?: string
  wiki: Omit<Wiki, 'metadata' | 'version' | 'language' | 'author'>
  activityId?: string
  wikiId?: string
  type?: string
}

const CreatedTime = ({ date }: { date: string }) => {
  return (
    <Text
      mt="1"
      fontSize="sm"
      fontWeight="light"
      opacity={0.6}
      whiteSpace="nowrap"
    >
      {getReadableDate(date)}
    </Text>
  )
}

const ActivityCard = ({
  title,
  brief,
  editor,
  lastModTimeStamp,
  wiki,
  activityId,
  wikiId,
  type,
}: ActivityCardProps) => {
  const activityCardLinkRoute = activityId
    ? `/revision/${activityId}`
    : `/wiki/${wikiId}`
  const router = useRouter()

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
      <NextLink href={activityCardLinkRoute} passHref>
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
      <Box w="90%" px={4} p={{ base: 1, lg: 4 }} mx="auto">
        <Flex mb={{ base: 0, md: 2 }} justifyContent="space-between">
          <HStack w={{ base: '83%', md: '70%' }}>
            <Heading
              cursor="pointer"
              as="h2"
              fontSize={{ base: '16px', md: '20px' }}
              letterSpacing="wide"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              onClick={() => router.push(activityCardLinkRoute)}
              tabIndex={0}
              role="link"
            >
              {title}
            </Heading>

            {type && (
              <Text
                fontSize="sm"
                color="brand.500"
                fontWeight="medium"
                mb="8px !important"
              >
                {type === 'CREATED' ? 'New' : 'Edited'}
              </Text>
            )}
          </HStack>
          {wiki.categories.length && (
            <HStack>
              {wiki.categories?.map((category, i) => (
                <NextLink key={i} href={`/categories/${category.id}`} passHref>
                  <Text
                    as="a"
                    display={{ base: 'none', md: 'block' }}
                    color="brand.500"
                    fontWeight="bold"
                    cursor="pointer"
                  >
                    {category.title ? category.title : category.id}
                  </Text>
                </NextLink>
              ))}
            </HStack>
          )}
        </Flex>
        <Box mb="2" maxW={{ base: '70%', lg: '80%' }} overflow="hidden">
          <Text display={{ base: 'none', md: 'flex' }}>{brief}</Text>
        </Box>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
          w="full"
        >
          <Box>
            <HStack flex="1">
              <DisplayAvatar
                address={editor.id}
                avatarIPFS={editor.profile?.avatar}
                size="20"
              />
              <Text fontSize="14px" color="linkColor">
                <NextLink href={`/account/${editor.id}`} passHref>
                  <Link href="passRef" color="brand.500" fontWeight="bold">
                    {getUsername(editor)}
                  </Link>
                </NextLink>
              </Text>
              <HStack spacing={2} display={{ base: 'none', lg: 'block' }}>
                {wiki.tags.map((tag, index) => (
                  <NextLink href={`/tags/${tag.id}`} key={index} passHref>
                    <Tag as="a" whiteSpace="nowrap" key={index}>
                      <Text px={4}>{tag.id}</Text>
                    </Tag>
                  </NextLink>
                ))}
              </HStack>
            </HStack>
          </Box>
          <Box>
            {lastModTimeStamp && <CreatedTime date={lastModTimeStamp} />}
          </Box>
        </Stack>
      </Box>
    </HStack>
  )
}

export default ActivityCard
