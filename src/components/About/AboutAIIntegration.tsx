import React from 'react'
import { AspectRatio, Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import { Image } from '../Elements/Image/Image'

const AboutAiIntegration = () => {
  const { t } = useTranslation('about')

  return (
    <Box
      maxW={{ base: '100%', lg: '80%', '2xl': '90%' }}
      bgColor="aboutFeaturesCardBg"
      border="1px solid"
      borderColor="aboutFeaturesCardBorder"
      p={{ base: 3, md: 8 }}
      borderRadius="20px"
      mt={{ base: '12', lg: '20 !important' }}
      mb={{ base: '10', md: '15', lg: 'initial' }}
      mx="auto"
      className="relative"
    >
      <Box
        className="absolute top-0 right-0 z-0"
        w="100%"
        height="100%"
        opacity={0.7}
        background="linear-gradient(to bottom, rgba(255, 0, 122, 0.1), rgba(251, 0, 120, 0.4))"
        borderRadius="19px"
      />
      <SimpleGrid templateColumns="2fr 0.5fr" className="relative z-0">
        <Box alignSelf="center">
          <Heading
            fontSize={{ base: '16px', md: '24px', lg: '48px' }}
            maxW={{ base: 'full', md: '90%' }}
            color="brandLinkColor"
          >
            {t('aboutAiHeading')}
          </Heading>
          <Text mt="5" fontSize={{ base: '14px', lg: '19px' }}>
            {t('aboutAiParagraph')}
          </Text>
        </Box>
        <Box alignSelf={{ base: 'center', md: 'initial' }}>
          <AspectRatio
            ratio={WIKI_IMAGE_ASPECT_RATIO}
            w={{ base: '100px', md: '153px', lg: '300px' }}
            h={{ base: '100px', md: '153px', lg: '300px' }}
          >
            <Image
              imgBoxSize={300}
              alt="Animated Robot"
              src="/images/GIFs/Aboutrobot.gif"
            />
          </AspectRatio>
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default AboutAiIntegration
