import React from 'react'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { carouselSettings } from '@/utils/Settings/carouselSettings'
import { Wiki } from '@everipedia/iq-utils'
import { Carousel } from '../Elements'
import TrendingCategoryItem from './TrendingCategoryItem'

const TrendingCategoryCard = ({
  title,
  icon,
  wikis,
  type = 'popular',
}: {
  icon: IconType
  title: string
  wikis:
    | Wiki[]
    | {
        content: Wiki[]
      }
  type?: string
}) => {
  return (
    <Box
      bgColor="cardBg"
      boxShadow="md"
      p={{ base: '2.5', md: '5' }}
      pb={{ base: '8', md: '10' }}
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
        <Text fontSize={{ base: '14px', lg: '18px' }} pl={2} fontWeight="600">
          {title}
        </Text>
      </Flex>
      <Carousel topArrow="25%" settings={carouselSettings}>
        {type === 'new'
          ? wikis.map(wiki => (
              <Box
                key={`wiki-${wiki.id}`}
                px={{ base: '1', md: '2' }}
                pt="3"
                pb="3"
              >
                <TrendingCategoryItem
                  title={wiki.content[0].title}
                  WikiImgObj={wiki.content[0].images}
                  brief={wiki.content[0].summary}
                  editor={wiki.content[0].user}
                  lastModTimeStamp={wiki.content[0].updated}
                  wikiId={wiki.content[0].id}
                />
              </Box>
            ))
          : wikis.map(wiki => (
              <Box
                key={`wiki-${wiki.id}`}
                px={{ base: '1', md: '2' }}
                pt="3"
                pb="3"
              >
                <TrendingCategoryItem
                  title={wiki.title}
                  WikiImgObj={wiki.images}
                  brief={wiki.summary}
                  editor={wiki.user}
                  lastModTimeStamp={wiki.updated}
                  wikiId={wiki.id}
                />
              </Box>
            ))}
      </Carousel>
    </Box>
  )
}

export default TrendingCategoryCard
