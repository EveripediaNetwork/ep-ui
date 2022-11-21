import {
  Text,
  LinkBox,
  chakra,
  Heading,
  Box,
  AspectRatio,
  Flex,
  HStack,
} from '@chakra-ui/react'
import React from 'react'
import { Wiki } from '@/types/Wiki'
import { WikiImage } from '@/components/WikiImage'
import { getWikiSummary } from '@/utils/getWikiSummary'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { useTranslation } from 'react-i18next'
import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import { getUsername } from '@/utils/getUsername'
import { getReadableDate } from '@/utils/getFormattedDate'
import { useENSData } from '@/hooks/useENSData'
import { Carousel, Link } from '../Elements'
import LinkOverlay from '../Elements/LinkElements/LinkOverlay'
import DisplayAvatar from '../Elements/Avatar/DisplayAvatar'

const TRENDING_WIKI_IMG_WIDTH = 300
const TrendingWikiCard = ({ wiki }: { wiki: Wiki }) => {
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
      <chakra.div p={2} mx="auto">
        <Flex
          alignSelf="center"
          direction="column"
          textAlign="left"
          bg="white"
          color="black"
          _dark={{ bgColor: 'gray.700', color: 'white' }}
          maxW={{ base: 'min(90vw, 400px)', md: '96', lg: '388' }}
          cursor="pointer"
          rounded="lg"
          shadow="md"
          mx="auto"
        >
          <AspectRatio ratio={WIKI_IMAGE_ASPECT_RATIO}>
            <WikiImage
              cursor="pointer"
              flexShrink={0}
              imageURL={getWikiImageUrl(wiki)}
              borderRadius="none"
              roundedTop="lg"
              alt={wiki.title}
              imgH={TRENDING_WIKI_IMG_WIDTH}
              imgW={WIKI_IMAGE_ASPECT_RATIO * TRENDING_WIKI_IMG_WIDTH}
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
                fontSize={24}
              >
                {wiki?.title}
              </Heading>
            </LinkOverlay>
            <Text
              fontSize="sm"
              maxW="90%"
              minH={12}
              color="homeDescriptionColor"
              my={2}
            >
              {wiki && getWikiSummary(wiki, 60)}
            </Text>

            <HStack justify="space-between">
              <Flex gap={3} width="50%">
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

const TrendingWikis = ({ drops = [] }: { drops?: Wiki[] }) => {
  const { t } = useTranslation()

  return (
    <Box
      mt={10}
      px={{ base: 3, md: 8 }}
      py={{ base: 5, md: 20 }}
      textAlign="center"
    >
      <Heading
        textAlign="center"
        mb={4}
        fontWeight="700"
        fontSize={{ base: '3xl', lg: 46 }}
      >
        {`${t('trendingWikis')}`}
      </Heading>
      <Text
        color="homeDescriptionColor"
        fontSize={{ base: 'lg', lg: 22 }}
        mx="auto"
        mb={9}
        px={4}
        maxW="750"
      >{`${t('trendingWikisDescription')}`}</Text>
      <Box maxW="1160px" mx="auto">
        <Carousel
          topArrow="25%"
          settings={{
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,

            responsive: [
              {
                breakpoint: 1000,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 2,
                  infinite: true,
                  dots: true,
                },
              },
              {
                breakpoint: 680,
                settings: {
                  arrows: false,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true,
                },
              },
            ],
          }}
        >
          {drops.map(wiki => (
            <TrendingWikiCard key={`wiki-${wiki.id}`} wiki={wiki} />
          ))}
        </Carousel>
      </Box>
    </Box>
  )
}

export default TrendingWikis
