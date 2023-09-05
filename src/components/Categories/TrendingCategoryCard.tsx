import React from 'react'
import { Box, Flex, Icon, Text, chakra } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { Wiki } from '@everipedia/iq-utils'
import TrendingCategoryItem from './TrendingCategoryItem'
import Autoplay from 'embla-carousel-autoplay'
import { WikiCarousel } from '../Elements/Carousel/Carousel'

const TrendingCategoryCard = ({
  title,
  icon,
  wikis,
}: {
  icon: IconType
  title: string
  wikis: Wiki[]
}) => {
  return (
    <Box
      bgColor="cardBg"
      border={'1px'}
      borderColor={'cardBorderColor'}
      p={{ base: '2.5', md: '5' }}
      borderRadius="12px"
      overflowX="hidden"
    >
      <Flex mb={{ base: '1', md: '2' }} alignItems="center">
        <Icon
          cursor="pointer"
          fontSize="2xl"
          fontWeight={600}
          color="brandLinkColor"
          as={icon}
        />
        <Text fontSize={{ base: '14px', lg: '20px' }} pl={2} fontWeight="600">
          {title}
        </Text>
      </Flex>
      <WikiCarousel
        data={wikis}
        item={wiki => (
          <chakra.div
            key={`wiki-${wiki.id}`}
            px={{ base: '1', md: '4' }}
            py="10px"
          >
            <TrendingCategoryItem
              title={wiki.title}
              WikiImgObj={wiki.images}
              brief={wiki.summary}
              editor={wiki.user}
              lastModTimeStamp={wiki.updated}
              wikiId={wiki.id}
            />
          </chakra.div>
        )}
        plugins={[Autoplay()]}
      />
    </Box>
  )
}

export default TrendingCategoryCard
