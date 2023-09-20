import { Box, Button, Flex, Icon, chakra } from '@chakra-ui/react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { RiCheckboxBlankCircleFill } from 'react-icons/ri'
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md'
import React from 'react'
import { default as Slider, Settings } from 'react-slick'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { IconType } from 'react-icons/lib'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

type WikiCarouselProps = {
  options?: EmblaOptionsType
  plugins?: any[]
  Buttons?: false
  children: React.ReactNode
}

interface ArrowProps {
  ArrowIcon?: IconType
  isNext?: boolean
  onClick?: () => void
  top?: string
}

interface CarouselProps {
  settings: Settings
  children: React.ReactNode
  topArrow: string
}

export const WikiCarousel = ({
  options,
  plugins,
  Buttons,
  children,
}: WikiCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...options }, plugins)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  )
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi, setSelectedIndex])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])

  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, setScrollSnaps, onSelect])

  type PrevNextButtonPropType = {
    enabled: boolean
    onClick: () => void
  }

  const PrevButton: React.FC<PrevNextButtonPropType> = (props) => {
    const { enabled, onClick } = props
    return (
      <Button
        className="embla__button embla__button--prev"
        onClick={onClick}
        disabled={!enabled}
      >
        <Icon as={MdOutlineArrowBackIos} />
      </Button>
    )
  }

  const NextButton: React.FC<PrevNextButtonPropType> = (props) => {
    const { enabled, onClick } = props
    return (
      <Button
        className="embla__button embla__button--next"
        onClick={onClick}
        disabled={!enabled}
      >
        <Icon as={MdOutlineArrowForwardIos} />
      </Button>
    )
  }

  return (
    <>
      <chakra.div
        ref={emblaRef}
        rounded={'12px'}
        boxShadow="3xl"
        _dark={{
          shadow: '0px 25px 50px -12px rgba(16, 16, 17, 0.25)',
        }}
        overflow="hidden"
        w="full"
      >
        <Flex w="full">{children}</Flex>
      </chakra.div>
      <Flex w="full" alignItems="center" gap="3" pt="6" justifyContent="center">
        {scrollSnaps.map((_, index) => (
          <Icon
            key={index}
            as={RiCheckboxBlankCircleFill}
            fontSize="8px"
            color={index !== selectedIndex ? 'brand.200' : 'brand.500'}
            cursor="pointer"
            onClick={() => scrollTo(index)}
          />
        ))}
      </Flex>
      {Buttons && (
        <>
          <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </>
      )}
    </>
  )
}

const ArrowBtn = ({ ArrowIcon, onClick, top, isNext }: ArrowProps) => (
  <Box
    top={top}
    position="absolute"
    transform="translate(0, 150%)"
    display="grid"
    placeItems="center"
    onClick={onClick}
    cursor="pointer"
    borderWidth="1px"
    borderColor="carouselArrowBorderColor"
    zIndex={99}
    bgColor="carouselArrowBg"
    borderRadius="50%"
    w={{ base: '35px', md: '40px' }}
    h={{ base: '35px', md: '40px' }}
    right={isNext ? '0px' : 'unset'}
    left={isNext ? 'unset' : '0px'}
  >
    <Icon as={ArrowIcon} color="grey" />
  </Box>
)

export const Carousel = ({ settings, children, topArrow }: CarouselProps) => (
  <Slider
    {...settings}
    nextArrow={<ArrowBtn top={topArrow} ArrowIcon={FaChevronRight} isNext />}
    prevArrow={<ArrowBtn top={topArrow} ArrowIcon={FaChevronLeft} />}
  >
    {children}
  </Slider>
)
