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
  Wrap,
} from '@chakra-ui/react'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { BaseCategory, BaseTag, Image, User } from '@everipedia/iq-utils'
import { getReadableDate } from '@/utils/getFormattedDate'
import { useRouter } from 'next/router'
import { getUsername } from '@/utils/getUsername'
import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import DisplayAvatar from '../Elements/Avatar/DisplayAvatar'
import { Link } from '../Elements'
import { LinkWrapper } from '../Elements/LinkElements/LinkWrapper'
import { Image as ActivityImage } from '../Elements/Image/Image'

const ACTIVITY_IMAGE_BOX_SIZE = 156

interface ActivityCardProps {
  title: string
  brief: string
  editor: User
  isNotifSubCard?: boolean
  lastModTimeStamp?: string
  activityId?: string
  wikiId?: string
  type?: string
  categories?: BaseCategory[]
  tags?: BaseTag[]
  WikiImgObj?: Image[]
}

const ActivityCard = ({
  isNotifSubCard,
  title,
  brief,
  editor,
  categories,
  tags,
  lastModTimeStamp,
  activityId,
  WikiImgObj,
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
      minW="0"
      borderRadius="lg"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.10)"
      px={{ base: isNotifSubCard ? 2 : 3, lg: 5 }}
      py={{ base: isNotifSubCard ? 2 : 3, lg: 3 }}
      w="full"
      align="normal"
    >
      <Link href={activityCardLinkRoute}>
        <AspectRatio
          ratio={WIKI_IMAGE_ASPECT_RATIO}
          w={{
            base: isNotifSubCard ? '80px' : '100px',
            md: '140px',
            lg: '156px',
          }}
        >
          <ActivityImage
            boxSize="100%"
            cursor="pointer"
            flexShrink={0}
            src={getWikiImageUrl(WikiImgObj)}
            borderRadius="lg"
            overflow="hidden"
            alt={title}
            imgW={ACTIVITY_IMAGE_BOX_SIZE}
            imgH={ACTIVITY_IMAGE_BOX_SIZE}
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
          <HStack
            w={{
              base: '83%',
              md: '70%',
            }}
          >
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
          {categories?.length && (
            <HStack>
              {categories?.map((category, i) => (
                <Link
                  key={i}
                  href={`/categories/${category.id}`}
                  display={{ base: 'none', md: 'block' }}
                  color="brandLinkColor"
                  fontWeight="bold"
                  cursor="pointer"
                  fontSize={{ base: '12px', lg: '14px' }}
                >
                  {category.title ? category.title : category.id}
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
                size={isNotifSubCard ? 15 : 20}
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
              <Wrap spacing={1} display={{ base: 'none', lg: 'flex' }}>
                {tags?.map((tag, index) => (
                  <LinkWrapper href={`/tags/${tag.id}`} key={index}>
                    <Tag as="a" whiteSpace="nowrap" key={index}>
                      <Text px={4}>{tag.id}</Text>
                    </Tag>
                  </LinkWrapper>
                ))}
              </Wrap>
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
