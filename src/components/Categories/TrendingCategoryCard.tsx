import React from 'react'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { carouselSettings } from '@/utils/Settings/carouselSettings'
import { Carousel } from '../Elements'
import TrendingCategoryItem from './TrendingCategoryItem'

const TrendingCategoryCard = ({
  title,
  icon,
}: {
  icon: IconType
  title: string
}) => {
  return (
    <Box
      bgColor="cardBg"
      boxShadow="md"
      p="5"
      pb="10"
      borderRadius="12px"
      overflowX="hidden"
    >
      <Flex mb="2">
        <Icon
          cursor="pointer"
          fontSize="2xl"
          fontWeight={600}
          color="brandLinkColor"
          as={icon}
        />
        <Text fontSize={{ base: 'md', lg: '18px' }} pl={2} fontWeight="600">
          {title}
        </Text>
      </Flex>
      <Carousel topArrow="25%" settings={carouselSettings}>
        <Box px="2" pt="3" pb="3">
          <TrendingCategoryItem />
        </Box>
        <Box px="2" pt="3" pb="3">
          <TrendingCategoryItem />
        </Box>
        <Box px="2" pt="3" pb="3">
          <TrendingCategoryItem />
        </Box>
      </Carousel>
    </Box>
  )
}

export default TrendingCategoryCard
