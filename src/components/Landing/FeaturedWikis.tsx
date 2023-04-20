import { Box, Flex, Icon, Text, chakra } from '@chakra-ui/react'
import React from 'react'
import { RiStarFill } from 'react-icons/ri'
import { Wiki } from '@everipedia/iq-utils'
import { carouselSettings } from '@/utils/Settings/carouselSettings'
import { Carousel } from '../Elements'
import { FeaturedWikiCard } from './FeaturedWikiCard'
import { LoadingFeaturedWikiCard } from './LoadingFeaturedWikiCard'

export const FeaturedWikis = ({ featuredWikis }: { featuredWikis: Wiki[] }) => (
  <Flex pt="1" minH="500px">
    <Box
      maxW={{ base: 'min(90vw, 400px)', md: '96', lg: '392' }}
      w="full"
      shadow="lg"
      rounded="lg"
      py={3}
      bg="white"
      _dark={{ bgColor: 'gray.700', color: 'white' }}
      color="black"
      textAlign="center"
      justifyContent="center"
    >
      <chakra.div w="full" alignItems="center" display="flex" pl="2">
        <Icon
          cursor="pointer"
          color="brandLinkColor"
          fontSize="2xl"
          fontWeight={600}
          as={RiStarFill}
        />
        <Text fontSize={{ base: 'md', lg: '18px' }} pl={2} fontWeight="600">
          Featured wikis
        </Text>
      </chakra.div>
      {featuredWikis ? (
        <Carousel topArrow="25%" settings={carouselSettings}>
          {featuredWikis.map((wiki) => (
            <Box
              px="3"
              pt={{ base: '1', md: '3' }}
              pb={{ base: '6', md: '3' }}
              key={`wiki-${wiki.id}`}
            >
              <FeaturedWikiCard wiki={wiki} />
            </Box>
          ))}
        </Carousel>
      ) : (
        <LoadingFeaturedWikiCard />
      )}
    </Box>
  </Flex>
)
