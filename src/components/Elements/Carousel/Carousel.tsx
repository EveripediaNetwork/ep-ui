import React from 'react'
import SliderClass, { Settings } from 'react-slick'
import { Icon, Box } from '@chakra-ui/react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { IconType } from 'react-icons/lib'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Slider = SliderClass as unknown as (props: {
  children: React.ReactNode
  nextArrow: JSX.Element
  prevArrow: JSX.Element
}) => JSX.Element
interface ArrowProps {
  ArrowIcon?: IconType
  isNext?: boolean
  onClick?: () => void
}

const ArrowBtn = ({ ArrowIcon, onClick, isNext }: ArrowProps) => (
  <Box
    top="50%"
    position="absolute"
    transform="translate(0, -50%)"
    display="grid"
    placeItems="center"
    onClick={onClick}
    cursor="pointer"
    borderWidth="1px"
    borderColor="carouselArrowBorderColor"
    zIndex={99}
    bgColor="carouselArrowBg"
    borderRadius="50%"
    w="40px"
    h="40px"
    right={isNext ? '-20px' : 'unset'}
    left={isNext ? 'unset' : '-20px'}
  >
    <Icon as={ArrowIcon} color="grey" />
  </Box>
)

interface CarouselProps {
  settings: Settings
  children: React.ReactNode
}

const Carousel = ({ settings, children }: CarouselProps) => (
  <Slider
    {...settings}
    nextArrow={<ArrowBtn ArrowIcon={FaChevronRight} isNext />}
    prevArrow={<ArrowBtn ArrowIcon={FaChevronLeft} />}
  >
    {children}
  </Slider>
)

export default Carousel
