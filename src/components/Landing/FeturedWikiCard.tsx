import React from 'react'
import {
  AspectRatio,
  Flex,
  Heading,
  HStack,
  Link,
  LinkBox,
  LinkOverlay,
  Text,
  chakra,
} from '@chakra-ui/react'
import { useENSData } from '@/hooks/useENSData'
import { getReadableDate } from '@/utils/getFormattedDate'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { IMAGE_BOX_SIZE, WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import { getUsername } from '@/utils/getUsername'
import { WikiSummarySize, getWikiSummary } from '@/utils/getWikiSummary'
import { Wiki } from '@everipedia/iq-utils'
import DisplayAvatar from '../Elements/Avatar/DisplayAvatar'
import { Image } from '../Elements/Image/Image'

export const FeaturedWikiCard = ({ wiki }: { wiki: Wiki }) => {
  const [, ensName] = useENSData(wiki.user.id)
  const getLatestEdited = () => {
    let lastEditedTime = null
    if (wiki.updated) {
      lastEditedTime = getReadableDate(wiki.updated)
    } else if (wiki.created) {
      lastEditedTime = getReadableDate(wiki.created)
    }
    return lastEditedTime
  }

  return (
    <LinkBox flex="none">
      <chakra.div px={2} mx="auto">
        <Flex
          alignSelf="center"
          direction="column"
          textAlign="left"
          bg="white"
          color="black"
          _dark={{ bgColor: 'gray.700', color: 'white' }}
          cursor="pointer"
          rounded="lg"
          shadow="md"
          mx="auto"
        >
          <AspectRatio
            ratio={WIKI_IMAGE_ASPECT_RATIO}
            h={{ base: '250px', md: '250px' }}
          >
            <Image
              src={getWikiImageUrl(wiki.images)}
              alt={wiki.title}
              borderTopRadius="md"
              overflow="hidden"
              objectFit="cover"
              imgW={IMAGE_BOX_SIZE * WIKI_IMAGE_ASPECT_RATIO}
              imgH={IMAGE_BOX_SIZE}
            />
          </AspectRatio>
          <Flex
            direction="column"
            justify="space-between"
            fontWeight="semibold"
            p={4}
          >
            <LinkOverlay href={`/wiki/${wiki?.id}`}>
              <Heading
                width="90%"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                fontSize={{
                  base: '14px',
                  md: '18px',
                }}
              >
                {wiki?.title}
              </Heading>
            </LinkOverlay>
            <Text
              fontSize="12px"
              maxW="90%"
              minH={12}
              color="homeDescriptionColor"
              my={2}
            >
              {wiki && getWikiSummary(wiki, WikiSummarySize.Small)}
            </Text>
            <HStack justify="space-between">
              <Flex alignItems="center" gap={3} width="50%">
                <Link href={`/account/${wiki?.user?.id}`}>
                  <DisplayAvatar
                    alt={getUsername(wiki?.user, ensName)}
                    size={20}
                    address={wiki?.user.id}
                    avatarIPFS={wiki?.user.profile?.avatar}
                  />
                </Link>
                <Link
                  href={`/account/${wiki?.user?.id}`}
                  color="brand.500 !important"
                  fontSize="sm"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {getUsername(wiki?.user, ensName)}
                </Link>
              </Flex>
              <Text
                width="50%"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                color="gray.400"
                _dark={{
                  color: 'whiteAlpha.900',
                }}
                fontWeight="400"
                fontSize="sm"
                textAlign="right"
              >
                Last Edited {getLatestEdited()}
              </Text>
            </HStack>
          </Flex>
        </Flex>
      </chakra.div>
    </LinkBox>
  )
}
