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
} from '@chakra-ui/react'
import { WikiImage } from '@/components/WikiImage'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { User, Wiki } from '@/types/Wiki'
import { getReadableDate } from '@/utils/getFormattedDate'
import { useRouter } from 'next/router'
import { getUsername } from '@/utils/getUsername'
import NextLink from 'next/link'
import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import DisplayAvatar from '../Elements/Avatar/DisplayAvatar'
import { Link } from '../Elements'

interface ActivityCardProps {
  title: string
  brief: string
  editor: User
  isNotifSubCard?: boolean
  lastModTimeStamp?: string
  wiki: Omit<
    Wiki,
    'metadata' | 'version' | 'language' | 'author' | 'content' | 'promoted'
  >
  activityId?: string
  wikiId?: string
  type?: string
}

const ActivityCard = ({
  isNotifSubCard,
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
      px={{ base: isNotifSubCard ? 2 : 3, lg: 5 }}
      py={{ base: isNotifSubCard ? 2 : 3, lg: 3 }}
      w="full"
      align="normal"
    >
      <Link href={activityCardLinkRoute} passHref>
        <AspectRatio
          ratio={WIKI_IMAGE_ASPECT_RATIO}
          w={{
            base: isNotifSubCard ? '80px' : '100px',
            md: '140px',
            lg: '156px',
          }}
        >
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
        px={{ base: isNotifSubCard ? 0 : 4, sm: 4 }}
        overflowX="hidden"
      >
        <Flex justifyContent="space-between" mb={{ base: 0, md: 2 }}>
          <HStack w={{ base: '83%', md: '70%' }}>
            <Heading
              cursor="pointer"
              as="h2"
              fontSize={{
                base: isNotifSubCard ? '14px' : '16px',
                md: '18px',
              }}
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
                    display={{ base: 'none', md: 'block' }}
                    color="brandLinkColor"
                    fontWeight="bold"
                    cursor="pointer"
                    fontSize={{ base: '12px', lg: '14px' }}
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
            mt="1"
            display={{ base: 'none', md: '-webkit-box' }}
            noOfLines={2}
            textOverflow="ellipsis"
            overflow="hidden"
            fontSize={{
              base: isNotifSubCard ? '10px' : '14px',
              md: isNotifSubCard ? '14px' : '16px',
            }}
          >
            {brief}
          </Text>
        </Box>
        <Stack
          mt={{ base: isNotifSubCard ? 0 : '2', md: '0' }}
          direction={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
          w="full"
        >
          <Box>
            <HStack flex="1">
              <DisplayAvatar
                address={editor.id}
                avatarIPFS={editor.profile?.avatar}
                size={isNotifSubCard ? '15' : '20'}
                alt={editor.profile?.username}
              />
              <Text
                fontSize={{
                  base: isNotifSubCard ? '12px' : '12px',
                  md: isNotifSubCard ? '12px' : '14px',
                }}
                color="linkColor"
              >
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
                      <Text px={4}>{tag.id}</Text>
                    </Tag>
                  </NextLink>
                ))}
              </HStack>
            </HStack>
          </Box>
          {lastModTimeStamp && (
            <Text
              mt="3px !important"
              fontSize={{
                base: isNotifSubCard ? '12px' : '12px',
                md: isNotifSubCard ? '12px' : '14px',
              }}
              opacity={0.6}
              whiteSpace="nowrap"
            >
              {getReadableDate(lastModTimeStamp)}
            </Text>
          )}
        </Stack>
      </Flex>
    </HStack>
  )
}

export default ActivityCard
