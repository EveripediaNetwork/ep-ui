import {
  Text,
  TextProps,
  Box,
  Flex,
  Image,
  HStack,
  Button,
  LinkBox,
  LinkOverlay,
  DarkMode,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import isMobile from 'ismobilejs'
import NextLink from 'next/link'
import { exampleNotableDrops } from '@/data/NotableDropsData'

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

export const NotableDrops = () => {
  const [slideColumns, setSlideColumns] = useState(3)
  const slides = exampleNotableDrops
  useEffect(() => {
    const isOnMobile = isMobile(window?.navigator)
    if (isOnMobile.any) setSlideColumns(isOnMobile.phone ? 1 : 2)
  }, [])

  const [currentSlide, setCurrentSlide] = useState(0)

  const slidesCount = slides.length

  const firstSlideInGroupOfLastSlide = slidesCount - slideColumns

  const lastSlideInSight = currentSlide === firstSlideInGroupOfLastSlide

  const prevSlide = () => {
    setCurrentSlide(s => (s === 0 ? firstSlideInGroupOfLastSlide : s - 1))
  }
  const nextSlide = () => {
    setCurrentSlide(s => (lastSlideInSight ? 0 : s + 1))
  }
  const setSlide = (slide: number) => {
    setCurrentSlide(
      slide > firstSlideInGroupOfLastSlide
        ? firstSlideInGroupOfLastSlide
        : slide,
    )
  }
  const carouselStyle = {
    transition: 'all .5s',
    ml: `-${(currentSlide * 100) / slideColumns}%`,
  }

  const containerWidth = `${24 * slideColumns}rem`

  const carouselDots = (
    <HStack justify="center" w="full">
      {Array.from({ length: slidesCount }).map((_, slide) => (
        <Box
          key={`dots-${slides[slide].label}`}
          cursor="pointer"
          boxSize={3}
          m="0 2px"
          bg={currentSlide === slide ? 'brand.500' : 'brand.200'}
          rounded="50%"
          display="inline-block"
          transition="background-color 0.6s ease"
          _hover={{ bg: 'brand.500' }}
          onClick={() => setSlide(slide)}
        />
      ))}
    </HStack>
  )
  return (
    <Flex direction="column" mt="20" gap={10} align="center">
      <Text align="center" fontWeight="bold" fontSize="2xl">
        Notable Wikis
      </Text>

      <Flex
        w={{ base: '85vw', md: containerWidth }}
        maxW="90vw"
        overflow="hidden"
        pos="relative"
      >
        <Flex sx={{ w: `calc(100%/${slideColumns})` }} {...carouselStyle}>
          {slides.map((slide, sid) => (
            <LinkBox
              pos="relative"
              key={`slide-${slide.label}`}
              boxSize="full"
              flex="none"
              overflow="hidden"
              pr={
                sid === currentSlide + (slideColumns - 1) || slideColumns === 1
                  ? 0
                  : 4
              }
            >
              <Flex
                direction="column"
                justifyContent="space-between"
                rounded="lg"
                shadow="xl"
                h="100%"
                bg="grey"
                overflow="hidden"
              >
                <Box>
                  <Image
                    src={slide.img}
                    boxSize="full"
                    objectFit="cover"
                    h="96"
                  />
                  <Box color="white" pt={4} px={8} gap={4} textAlign="center">
                    <NextLink href="#" passHref>
                      <LinkOverlay>
                        <Text fontSize="xl" fontWeight="bold">
                          {slide.label}
                        </Text>
                      </LinkOverlay>
                    </NextLink>
                    <Text fontSize="md">{slide.description}</Text>
                  </Box>
                </Box>
                <Flex justifyContent="center" p={4}>
                  <DarkMode>
                    <Button
                      color="white"
                      variant="outline"
                      size="sm"
                      w="fit-content"
                      fontWeight="medium"
                    >
                      Live
                    </Button>
                  </DarkMode>
                </Flex>
              </Flex>
            </LinkBox>
          ))}
        </Flex>
        <Text {...arrowStyles} left="0" onClick={prevSlide}>
          &#10094;
        </Text>
        <Text {...arrowStyles} right="0" onClick={nextSlide}>
          &#10095;
        </Text>
      </Flex>
      {carouselDots}
    </Flex>
  )
}
