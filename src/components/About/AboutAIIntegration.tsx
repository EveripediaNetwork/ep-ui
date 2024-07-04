import React from 'react'
import {
  AspectRatio,
  Box,
  Heading,
  Link,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import { Image } from '../Elements/Image/Image'

const AboutAiIntegration = () => {
  const { t } = useTranslation('about')

  // regex to process links within a paragragh
  const processText = (inputText: string): React.ReactNode[] => {
    const linkRegex = /<Link href='([^']*)'>(.*?)<\/Link>/g
    const elements: React.ReactNode[] = []
    let lastIndex = 0

    inputText.replace(linkRegex, (match, href, linkText, index) => {
      elements.push(inputText.substring(lastIndex, index))
      lastIndex = index + match.length

      elements.push(
        <Link
          color="brandLinkColor"
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkText}
        </Link>,
      )

      return match
    })

    elements.push(inputText.substring(lastIndex))

    return elements
  }

  return (
    <Box px={{ base: 6, lg: 16 }} py={{ base: '10', lg: 15 }}>
      <Box
        maxW={{ base: '100%', '2xl': '1280px' }}
        p={{ base: 3, md: 8 }}
        borderRadius="20px"
        mt={{ base: '12', lg: '20 !important' }}
        mb={{ base: '10', md: '15', lg: 'initial' }}
        mx="auto"
        className="relative"
        bgColor="white"
      >
        <Box
          className="absolute top-0 right-0 z-0"
          w="100%"
          height="100%"
          opacity={0.7}
          background="linear-gradient(to bottom, rgba(255, 0, 122, 0.1), rgba(251, 0, 120, 0.4))"
          borderRadius="19px"
        />
        <SimpleGrid
          templateColumns={{ base: '1fr', xl: '2fr 0.5fr' }}
          className="relative z-0"
          gap={6}
        >
          <Box alignSelf="center">
            <Heading
              fontSize={{ base: '20px', md: '24px', lg: '48px' }}
              maxW={{ base: '80%', md: '90%' }}
              color="brandLinkColor"
            >
              {t('aboutAiHeading')}
            </Heading>
            <Text
              mt="5"
              fontSize={{ base: '14px', lg: '19px' }}
              color="gray.800"
            >
              {processText(t('aboutAiParagraph'))}
            </Text>
          </Box>

          <Box order={{ base: 1, md: 2 }} alignSelf="center" mx="auto">
            <AspectRatio
              ratio={WIKI_IMAGE_ASPECT_RATIO}
              w={{ base: '200px', md: '153px', lg: '300px' }}
              h={{ base: '200px', md: '153px', lg: '300px' }}
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
    </Box>
  )
}

export default AboutAiIntegration
