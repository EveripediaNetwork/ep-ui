import React from 'react'
import {
  HStack,
  Heading,
  Text,
  Box,
  Tag,
  Flex,
  Stack,
  AspectRatio,
  Button,
} from '@chakra-ui/react'
import { WikiImage } from '@/components/WikiImage'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { User, Wiki } from '@/types/Wiki'
import { getReadableDate } from '@/utils/getFormattedDate'
import { useRouter } from 'next/router'
import { getUsername } from '@/utils/getUsername'
import NextLink from 'next/link'
import DisplayAvatar from '../Elements/Avatar/DisplayAvatar'
import { Link } from '../Elements'

interface NotificationCardProps {
  title: string
  brief: string
  editor: User
  lastModTimeStamp?: string
  wiki: Omit<
    Wiki,
    'metadata' | 'version' | 'language' | 'author' | 'content' | 'promoted'
  >
  activityId?: string
  wikiId?: string
  type?: string
}

const CreatedTime = ({ date }: { date: string }) => {
  return (
    <Text mt="1" fontSize="xs" opacity={0.6} whiteSpace="nowrap">
      {getReadableDate(date)}
    </Text>
  )
}

const NotificationCard = ({
  title,
  brief,
  editor,
  lastModTimeStamp,
  wiki,
  activityId,
  wikiId,
  type,
}: NotificationCardProps) => {
  const activityCardLinkRoute = activityId
    ? `/revision/${activityId}`
    : `/wiki/${wikiId}`
  const router = useRouter()

  return (
    <HStack justifyContent="space-between" gap="4">
      <HStack
        maxW="4xl"
        bgColor="cardBg"
        justifyContent="flex-start"
        borderWidth="1px"
        borderColor="cardBorder"
        borderRadius="lg"
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.10)"
        px={{ base: 3, lg: 5 }}
        py={{ base: 3, lg: 3 }}
        w="full"
        align="normal"
      >
        <Link href={activityCardLinkRoute} passHref>
          <AspectRatio w={{ base: '49px', md: '74px', lg: '106px' }} h="100%">
            <WikiImage
              cursor="pointer"
              flexShrink={0}
              imageURL={getWikiImageUrl(wiki)}
              borderRadius="lg"
              overflow="hidden"
              alt={wiki.title}
            />
          </AspectRatio>
        </Link>
        <Flex
          w="90%"
          flex-grow="1"
          flexDir="column"
          justify="space-between"
          mx="auto"
          px={4}
          overflowX="hidden"
        >
          <Flex justifyContent="space-between" mb={{ base: 0, md: 2 }}>
            <HStack w={{ base: '83%', md: '70%' }}>
              <Heading
                cursor="pointer"
                as="h2"
                fontSize={{ base: '8px', md: '12px', lg: '16px' }}
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
                  fontSize={{ base: '6px', md: '8px', lg: '12px' }}
                  color="brandLinkColor"
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
                  <Link key={i} href={`/categories/${category.id}`} passHref>
                    <Text
                      as="a"
                      display={{ base: 'none', lg: 'block' }}
                      color="brandLinkColor"
                      fontWeight="bold"
                      cursor="pointer"
                      fontSize={{ base: '12px' }}
                    >
                      {category.title ? category.title : category.id}
                    </Text>
                  </Link>
                ))}
              </HStack>
            )}
          </Flex>
          <Box
            mb="2"
            mt="-2%"
            maxW={{ base: '70%', lg: '80%' }}
            overflow="hidden"
            display={{ base: 'none', md: 'flex' }}
          >
            <Text
              mt="3"
              fontSize={{ base: '6px', md: '8px', lg: '13px' }}
              lineHeight={4}
              display={{ base: '-webkit-box' }}
              noOfLines={2}
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {brief}
            </Text>
          </Box>
          <Stack
            mt={{ base: '2', md: '0' }}
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
                  alt={editor.profile?.username}
                />
                <Text fontSize="12px" color="linkColor">
                  <Link
                    href={`/account/${editor.id}`}
                    color="brandLinkColor"
                    fontWeight="bold"
                  >
                    {getUsername(editor)}
                  </Link>
                </Text>
                <HStack spacing={2} display={{ base: 'none', lg: 'block' }}>
                  {wiki.tags.map((tag, index) => (
                    <NextLink href={`/tags/${tag.id}`} key={index} passHref>
                      <Tag as="a" whiteSpace="nowrap" key={index}>
                        <Text fontSize="xs" px={4}>
                          {tag.id}
                        </Text>
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
        </Flex>
      </HStack>
      <Box>
        <Button>Add</Button>
      </Box>
    </HStack>
  )
}

export default NotificationCard
