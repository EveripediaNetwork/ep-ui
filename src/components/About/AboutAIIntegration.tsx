import React from 'react'
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { Image } from '../Elements/Image/Image'

const AboutAiIntegration = () => {
  return (
    <Box
      maxW={{ base: '100%', lg: '80%', '2xl': '65%' }}
      bgColor="aboutFeaturesCardBg"
      border="1px solid"
      borderColor="aboutFeaturesCardBorder"
      p={8}
      borderRadius="20px"
      mt="20 !important"
      mx="auto"
    >
      <SimpleGrid templateColumns="2fr 0.5fr">
        <Box alignSelf="center">
          <Heading fontSize={{ lg: '36px' }} maxW="90%" color="brandLinkColor">
            Integration of Artificial Intelligence
          </Heading>
          <Text mt="4" maxW="3xl">
            IQ.wiki integrates artificial intelligence to scale our knowledge
            base. AI allows us to simplify routine tasks including summarizing
            wikis.
          </Text>
        </Box>
        <Box>
          <Image
            imgBoxSize={300}
            alt="Animated Robot"
            src="/images/GIFs/Aboutrobot.gif"
          />
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default AboutAiIntegration
