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
        bgColor="bodyBg"
        _dark={{ border: 'none' }}
        textAlign="center"
        justifyContent="center"
      >
        <chakra.div w="full" alignItems="center" display="flex" px="4" pb={3}>
          <Icon
            cursor="pointer"
            color="brandLinkColor"
            fontSize="2xl"
            fontWeight={600}
            as={RiStarFill}
          />
          <Text
            color={'wikiFlagTextColor'}
            fontSize={{ base: 'md', lg: '18px' }}
            pl={2}
            fontWeight="600"
          >
            Featured wikis
          </Text>
        </chakra.div>
        {featuredWikis ? (
          <chakra.div px={5}>
            <WikiCarousel
              data={featuredWikis}
              item={(wiki) => (
                <Box key={`wiki-${wiki.id}`}>
                  <FeaturedWikiCard wiki={wiki} />
                </Box>
              )}
              plugins={[Autoplay()]}
              options={OPTIONS}
            />
          </chakra.div>
        ) : (
          <LoadingFeaturedWikiCard />
        )}
      </Box>
    </Flex>
  )
}
