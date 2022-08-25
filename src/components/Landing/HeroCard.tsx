import { useENSData } from '@/hooks/useENSData'
import React from 'react'
import { Flex, Text, chakra, LinkBox, AspectRatio } from '@chakra-ui/react'
import { getWikiSummary } from '@/utils/getWikiSummary'
import { Wiki } from '@/types/Wiki'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { getUsername } from '@/utils/getUsername'
import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import { WikiImage } from '../WikiImage'
import DisplayAvatar from '../Elements/Avatar/Avatar'
import { Link } from '../Elements'
import LinkOverlay from '../Elements/LinkOverlay/LinkOverlay'

const CARD_DETAILS_LENGTH = 50

export const HeroCard = ({ wiki }: { wiki: Wiki | undefined }) => {
  const [, username] = useENSData(wiki?.user?.id)

  return (
    <LinkBox display="grid" placeItems="center">
      <Flex
        alignSelf="center"
        direction="column"
        bgColor="red"
        _dark={{ bgColor: 'gray.700', color: 'white' }}
        shadow="lg"
        rounded="lg"
        bg="white"
        color="black"
        cursor="pointer"
        _hover={{ shadow: '2xl' }}
        maxW={{ base: 'min(90vw, 400px)', md: '96', lg: '418' }}
        w="900px"
      >
        <AspectRatio ratio={WIKI_IMAGE_ASPECT_RATIO}>
          <WikiImage
            cursor="pointer"
            flexShrink={0}
            imageURL={getWikiImageUrl(wiki)}
            borderRadius="none"
            roundedTop="lg"
          />
        </AspectRatio>
        <Flex
          direction="column"
          justify="space-between"
          fontWeight="semibold"
          p={4}
        >
          <LinkOverlay href={`/wiki/${wiki?.id}`}>
            <chakra.span>{wiki?.title}</chakra.span>
          </LinkOverlay>
          <Text fontSize="xs" fontWeight="light" my={2}>
            {wiki && getWikiSummary(wiki, CARD_DETAILS_LENGTH)}
          </Text>

          <Flex gap={3}>
            <Link href={`/account/${wiki?.user?.id}`}>
              <DisplayAvatar
                size="20"
                address={wiki?.user.id}
                avatarIPFS={wiki?.user.profile?.avatar}
              />
            </Link>
            <Text fontSize="14px" color="linkColor">
              <Link
                href={`/account/${wiki?.user?.id}`}
                color="brandLinkColor"
                fontWeight="bold"
              >
                {getUsername(wiki?.user, username)}
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </LinkBox>
  )
}
