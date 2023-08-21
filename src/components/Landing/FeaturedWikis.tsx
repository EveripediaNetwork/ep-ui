import { Box, Flex, Icon, Text, chakra } from '@chakra-ui/react'
import React from 'react'
import { RiStarFill } from 'react-icons/ri'
import { Wiki } from '@everipedia/iq-utils'
import { FeaturedWikiCard } from './FeaturedWikiCard'
import { LoadingFeaturedWikiCard } from './LoadingFeaturedWikiCard'
import Autoplay from 'embla-carousel-autoplay'
import { WikiCarousel } from '../Elements/Carousel/Carousel'
import { EmblaOptionsType } from 'embla-carousel-react'

export const FeaturedWikis = ({ featuredWikis }: { featuredWikis: Wiki[] }) => {
  const OPTIONS: EmblaOptionsType = { loop: true }
  return (
    <Flex pt="1" minH="500px">
      <Box
        maxW={{ base: 'min(90vw, 400px)', md: '96', lg: '392' }}
        w="full"
        border="1px solid"
        borderColor={'gray.100'}
        rounded="lg"
        py={3}
        bg="white"
        _dark={{ bgColor: 'gray.700', color: 'white', border: 'none' }}
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
          <>
            <WikiCarousel
              data={featuredWikis}
              item={(wiki) => (
                <Box
                  px="3"
                  pt={{ base: '1', md: '3' }}
                  pb={{ base: '6', md: '3' }}
                  key={`wiki-${wiki.id}`}
                >
                  <FeaturedWikiCard wiki={wiki} />
                </Box>
              )}
              plugins={[Autoplay()]}
              options={OPTIONS}
            />
          </>
        ) : (
          <LoadingFeaturedWikiCard />
        )}
      </Box>
    </Flex>
  )
}
