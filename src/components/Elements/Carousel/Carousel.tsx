import React, { useRef, useState } from 'react'
import SliderClass, { Settings } from 'react-slick'
import { Icon, Box, Circle, HStack } from '@chakra-ui/react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { IconType } from 'react-icons/lib'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// const Slider = SliderClass as unknown as (props: {
//   children: React.ReactNode
//   nextArrow: JSX.Element
//   prevArrow: JSX.Element
// }) => JSX.Element

const Slider = SliderClass as unknown as React.ForwardRefExoticComponent<
  {
    children: React.ReactNode
    nextArrow: JSX.Element
    prevArrow: JSX.Element
  } & React.RefAttributes<SliderClass>
>

interface ArrowProps {
  ArrowIcon?: IconType
  isNext?: boolean
  onClick?: () => void
  top?: string
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
  topArrow: string
}

const Carousel = ({ settings, children, topArrow }: CarouselProps) => {
  const [activeSlide, setActiveSlide] = useState(0)
  // rome-ignore lint/correctness/noUnusedVariables: <explanation>
  const [activeSlide2, setActiveSlide2] = useState(0)

  const fullSettings: Settings = {
    ...settings,
    // rome-ignore lint/correctness/noUnusedVariables: <explanation>
    beforeChange: (current, next) => setActiveSlide(next),
    afterChange: current => setActiveSlide2(current),
  }
  const sliderRef = useRef<SliderClass>(null)
  const circles = [0, 1, 2, 3, 4]
  const handleClick = (index: number) => {
    sliderRef?.current?.slickGoTo(
      activeSlide < 4
        ? index
        : 2 > index
        ? activeSlide - (2 - index)
        : activeSlide + (index - 2),
    )
  }

  return (
    <>
      <Slider
        ref={sliderRef}
        {...fullSettings}
        nextArrow={
          <ArrowBtn top={topArrow} ArrowIcon={FaChevronRight} isNext />
        }
        prevArrow={<ArrowBtn top={topArrow} ArrowIcon={FaChevronLeft} />}
      >
        {children}
      </Slider>
      <HStack gap="2" w="full" justifyContent="center" pt="3">
        {circles.map(index => {
          const isActive = activeSlide < 4 ? activeSlide === index : index === 2
          const bg = isActive ? 'brand.500' : 'brand.50'
          const darkBg = isActive ? 'brand.800' : 'brand.200'
          return (
            <Circle
              key={index}
              size="10px"
              bg={bg}
              _dark={{ bg: { darkBg }, _hover: { bg: 'brand.800' } }}
              _hover={{ cursor: 'pointer', bg: 'brand.500' }}
              onClick={() => handleClick(index)}
            />
          )
        })}
      </HStack>
    </>
  )
}

export default Carousel
