import {
  Text,
  TextProps,
  Box,
  Flex,
  HStack,
  LinkBox,
  LinkOverlay,
  chakra,
} from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import isMobile from 'ismobilejs'
import NextLink from 'next/link'
import { Wiki } from '@/types/Wiki'
import { WikiImage } from '@/components/WikiImage'
import { getWikiSummary, WikiSummarySize } from '@/utils/getWikiSummary'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { useTranslation } from 'react-i18next'

const arrowStyles: TextProps = {
  cursor: 'pointer',
  pos: 'absolute',
  top: '50%',
  w: 'auto',
  mt: '-22px',
  p: '16px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '18px',
  transition: '0.6s ease',
  borderRadius: '0 3px 3px 0',
  userSelect: 'none',
  _hover: {
    opacity: 0.8,
    bg: 'black',
  },
}

const useCarousel = (drops: Wiki[]) => {
  const [slideColumns, setSlideColumns] = useState(3)
  const [currentSlide, setCurrentSlide] = useState(0)

  const dropsCount = drops.length

  const firstSlideInGroupOfLastSlide = dropsCount - slideColumns

  const lastSlideInSight = currentSlide === firstSlideInGroupOfLastSlide

  const prevSlide = () => {
    setCurrentSlide(s => (s === 0 ? firstSlideInGroupOfLastSlide : s - 1))
  }
  const nextSlide = () => {
    setCurrentSlide(s => (lastSlideInSight ? 0 : s + 1))
  }
  const setSlide = (wiki: number) => {
    setCurrentSlide(
      wiki > firstSlideInGroupOfLastSlide ? firstSlideInGroupOfLastSlide : wiki,
    )
  }

  return {
    slideColumns,
    setSlideColumns,
    currentSlide,
    prevSlide,
    nextSlide,
    setSlide,
  }
}

export const NotableDrops = ({ drops = [] }: NotableDropsProps) => {
  const { t } = useTranslation()

  const {
    slideColumns,
    setSlideColumns,
    currentSlide,
    setSlide,
    prevSlide,
    nextSlide,
  } = useCarousel(drops)

  const mountSlideColumns = useCallback(() => {
    const isOnMobile = isMobile(window?.navigator)
    if (isOnMobile.any) setSlideColumns(isOnMobile.phone ? 1 : 2)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    mountSlideColumns()
  }, [mountSlideColumns])

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const carouselStyle = {
    transition: 'all .5s',
    ml: `-${(currentSlide * 100) / slideColumns}%`,
  }

  const containerWidth = `${24 * slideColumns}rem`

  const carouselDots = (
    <HStack justify="center" w="full">
      {Array.from({ length: drops.length }).map((_, wiki) => (
        <Box
          key={`dots-${drops[wiki].id}`}
          cursor="pointer"
          boxSize={3}
          m="0 2px"
          bg={currentSlide === wiki ? 'brand.500' : 'brand.200'}
          rounded="50%"
          display="inline-block"
          transition="background-color 0.6s ease"
          _hover={{ bg: 'brand.500' }}
          onClick={() => setSlide(wiki)}
        />
      ))}
    </HStack>
  )

  return (
    <Flex
      direction="column"
      mt={{ base: '10', lg: '20' }}
      gap={10}
      px={{ base: 6, lg: 20 }}
      align="center"
      _dark={{
        bgImage: '/images/homepage-bg-dark.png',
      }}
      bgImage="/images/homepage-bg-white.png"
    >
      <Text align="center" fontWeight="bold" fontSize="2xl">
        {`${t('trendingWIkis')}`}
      </Text>

      <Flex
        w={{ base: '85vw', md: containerWidth }}
        maxW="90vw"
        overflow="hidden"
        pos="relative"
      >
        <Flex sx={{ w: `calc(100%/${slideColumns})` }} {...carouselStyle}>
          {drops.map((wiki, sid) => (
            <LinkBox
              pos="relative"
              key={`wiki-${wiki.id}`}
              boxSize="full"
              flex="none"
              overflow="hidden"
              pr={
                sid === currentSlide + (slideColumns - 1) || slideColumns === 1
                  ? 0
                  : 4
              }
            >
              <chakra.div
                rounded="lg"
                shadow="xl"
                h="100%"
                bg="grey"
                overflow="hidden"
              >
                <WikiImage
                  imageURL={getWikiImageUrl(wiki)}
                  boxSize="full"
                  objectFit="cover"
                  h="96"
                />
                <chakra.div
                  color="white"
                  pt={4}
                  px={8}
                  gap={4}
                  textAlign="center"
                >
                  <Text fontSize="xl" fontWeight="bold">
                    <NextLink href={`/wiki/${wiki.id}`} passHref>
                      <LinkOverlay>{wiki.title}</LinkOverlay>
                    </NextLink>
                  </Text>
                  <Text mb="6" fontSize="md" noOfLines={2}>
                    {getWikiSummary(wiki, WikiSummarySize.Medium)}
                  </Text>
                </chakra.div>
              </chakra.div>
            </LinkBox>
          ))}
        </Flex>
        <Text {...arrowStyles} left="0" onClick={prevSlide} zIndex="popover">
          &#10094;
        </Text>
        <Text {...arrowStyles} right="0" onClick={nextSlide} zIndex="popover">
          &#10095;
        </Text>
      </Flex>
      {carouselDots}
    </Flex>
  )
}

interface NotableDropsProps {
  drops: Wiki[] | undefined
}
