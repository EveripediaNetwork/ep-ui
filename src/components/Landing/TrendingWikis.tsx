import {
  Text,
  LinkBox,
  chakra,
  Heading,
  Box,
  AspectRatio,
  Flex,
} from '@chakra-ui/react'
import React from 'react'
import { Wiki } from '@/types/Wiki'
import { WikiImage } from '@/components/WikiImage'
import { getWikiSummary } from '@/utils/getWikiSummary'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { useTranslation } from 'react-i18next'
import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import { getUsername } from '@/utils/getUsername'
import { Carousel, Link } from '../Elements'
import LinkOverlay from '../Elements/LinkOverlay/LinkOverlay'
import DisplayAvatar from '../Elements/Avatar/Avatar'

const TrendingWikiCard = ({ wiki }: { wiki: Wiki }) => {
  return (
    <LinkBox flex="none" overflow="hidden" padding={2}>
      <chakra.div
        shadow="md"
        rounded="lg"
        overflow="hidden"
        maxW="400px"
        mx="auto"
      >
        <Flex
          alignSelf="center"
          direction="column"
          bgColor="red"
          _dark={{ bgColor: 'gray.700', color: 'white' }}
          textAlign="left"
          bg="white"
          color="black"
          cursor="pointer"
          maxW={{ base: 'min(90vw, 400px)', md: '96', lg: '388' }}
          w="900px"
          h="430px"
          shadow="lg"
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
              <Heading fontSize={24}>{wiki?.title}</Heading>
            </LinkOverlay>
            <Text fontSize="sm" maxW="90%" fontWeight="light" my={2}>
              {wiki && getWikiSummary(wiki, 80)}
            </Text>

            <Flex gap={3}>
              <Link href={`/account/${wiki?.user?.id}`}>
                <DisplayAvatar
                  size="20"
                  address={wiki?.user.id}
                  avatarIPFS={wiki?.user.profile?.avatar}
                />
              </Link>
              <Link
                href={`/account/${wiki?.user?.id}`}
                color="brand.500 !important"
                fontSize="sm"
              >
                {getUsername(wiki?.user)}
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </chakra.div>
    </LinkBox>
  )
}

const TrendingWikis = ({ drops = [] }: { drops?: Wiki[] }) => {
  const { t } = useTranslation()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

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
        color="gray.500"
        fontSize={{ base: 'lg', lg: 22 }}
        mx="auto"
        mb={9}
        maxW="750"
      >{`${t('trendingWikisDescription')}`}</Text>
      <Box maxW="1160px" mx="auto">
        <Carousel
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
