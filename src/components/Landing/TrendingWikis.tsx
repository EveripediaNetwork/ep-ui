import {
  Text,
  chakra,
  Heading,
  Box,
  AspectRatio,
  Flex,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
import React from 'react'
import { Wiki } from '@everipedia/iq-utils'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { RiBarChartFill, RiTimeFill, RiStarFill } from 'react-icons/ri'
import { useENSData } from '@/hooks/useENSData'
import { getReadableDate } from '@/utils/getFormattedDate'
import { getUsername } from '@/utils/getUsername'
import { WikiSummarySize, getWikiSummary } from '@/utils/getWikiSummary'
import { Carousel, Link } from '../Elements'
import TrendingCard from './TrendingCard'
import DisplayAvatar from '../Elements/Avatar/DisplayAvatar'
import { LoadingTrendingWikiCard } from './LoadingTrendingWikis'
import { WikiImage } from '../WikiImage'

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
          <AspectRatio ratio={7 / 4}>
            <WikiImage
              imageURL={getWikiImageUrl(wiki.images)}
              alt={wiki.title}
              borderTopRadius="md"
              overflow="hidden"
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

const TrendingWikis = ({
  drops = [],
  recent = [],
  featuredWikis = [],
}: {
  drops?: Wiki[]
  recent?: Wiki[]
  featuredWikis?: Wiki[]
}) => {
  return (
    <Box
      mt={10}
      px={{ base: 3, md: 8 }}
      pb={{ base: 5, md: 20 }}
      pt={0}
      textAlign="center"
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        maxW={{ base: '403px', md: 'fit-content' }}
        mx="auto"
        flexWrap="wrap"
        gap={4}
      >
        <TrendingCard
          title="Trending Wikis"
          icon={RiBarChartFill}
          wikis={drops}
        />
        <TrendingCard title="Recent Edits" icon={RiTimeFill} wikis={recent} />
        <Flex pt="1" minH={{ base: '418px', lg: '425px', xl: '440px' }}>
          <Box
            maxW={{ base: 'min(90vw, 400px)', md: '96', lg: '392' }}
            w="full"
            shadow="lg"
            rounded="lg"
            py={3}
            bg="white"
            _dark={{ bgColor: 'gray.700', color: 'white' }}
            color="black"
            textAlign="center"
            justifyContent="center"
          >
            <chakra.div w="full" alignItems="center" display="flex" pl="2">
              <Icon
                cursor="pointer"
                color="brandLinkColor"
                fontSize="2xl"
                fontWeight={600}
                as={RiStarFill}
              />
              <Text
                fontSize={{ base: 'md', lg: '18px' }}
                pl={2}
                fontWeight="600"
              >
                Featured wikis
              </Text>
            </chakra.div>
            {featuredWikis ? (
              <Carousel
                topArrow="25%"
                settings={{
                  dots: true,
                  autoplay: true,
                  infinite: true,
                  arrows: false,
                  speed: 500,
                  slidesToShow: 1,
                  slidesToScroll: 1,

                  responsive: [
                    {
                      breakpoint: 1000,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 1,
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
                {featuredWikis.map(wiki => (
                  <Box px="3" pt="3" pb={{ md: '0', xl: '3' }}>
                    <TrendingWikiCard key={`wiki-${wiki.id}`} wiki={wiki} />
                  </Box>
                ))}
              </Carousel>
            ) : (
              <LoadingTrendingWikiCard />
            )}
          </Box>
        </Flex>
        <Flex
          minH="1px"
          w={{ base: 'min(90vw, 400px)', md: '96', lg: '392' }}
          display={{ base: 'block', xl: 'none' }}
        />
      </Flex>
    </Box>
  )
}

export default TrendingWikis
