import { Text, LinkBox, chakra, Heading, Box } from '@chakra-ui/react'
import React from 'react'
import { Wiki } from '@/types/Wiki'
import { WikiImage } from '@/components/WikiImage'
import { getWikiSummary, WikiSummarySize } from '@/utils/getWikiSummary'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { useTranslation } from 'react-i18next'
import { Carousel } from '../Elements'
import LinkOverlay from '../Elements/LinkOverlay/LinkOverlay'

interface NotableWikiCardProps {
  wiki: Wiki
}

const NotableWikiCard = ({ wiki }: NotableWikiCardProps) => {
  return (
    <LinkBox flex="none" overflow="hidden" padding={2}>
      <chakra.div
        rounded="lg"
        bg="grey"
        overflow="hidden"
        h="520px"
        maxW="400px"
        mx="auto"
      >
        <WikiImage imageURL={getWikiImageUrl(wiki)} imgH="380" imgW="400" />
        <chakra.div color="white" pt={4} px={8} gap={4} textAlign="center">
          <Text fontSize="xl" fontWeight="bold">
            <LinkOverlay href={`/wiki/${wiki.id}`}>{wiki.title}</LinkOverlay>
          </Text>
          <Text mb="6" fontSize="md" noOfLines={2}>
            {getWikiSummary(wiki, WikiSummarySize.Medium)}
          </Text>
        </chakra.div>
      </chakra.div>
    </LinkBox>
  )
}

const NotableDrops = ({ drops = [] }: NotableDropsProps) => {
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
      _dark={{
        bgImage: '/images/homepage-bg-dark.png',
      }}
      bgImage="/images/homepage-bg-white.png"
    >
      <Heading textAlign="center" mb={4} fontWeight="bold" fontSize="2xl">
        {`${t('trendingWIkis')}`}
      </Heading>
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
            <NotableWikiCard key={`wiki-${wiki.id}`} wiki={wiki} />
          ))}
        </Carousel>
      </Box>
    </Box>
  )
}

export default NotableDrops
interface NotableDropsProps {
  drops: Wiki[] | undefined
}
