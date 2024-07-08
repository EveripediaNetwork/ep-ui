import React from 'react'
import { Box, Heading, Flex } from '@chakra-ui/react'
import CNNLogo from './logos/cnn.svg'
import ForbesLogo from './logos/forbes.svg'
import ReutersLogo from './logos/reuters.svg'
import WiredLogo from './logos/wired.svg'
import CoinDeskLogo from './logos/coindesk.svg'
import FortuneLogo from './logos/fortune.svg'
import { useTranslation } from 'next-i18next'

const AboutAsSeenIn = () => {
  const { t } = useTranslation('about')

  return (
    <Flex
      flexDirection="column"
      gap={10}
      mt={{ base: 10, md: '20' }}
      px={{ base: 6, lg: 16, '2xl': 0 }}
      py={{ base: '5', lg: 15 }}
      maxW={{ base: '100%', xl: '90%', '2xl': '1440px' }}
      mx="auto"
    >
      <Box w="full" textAlign="center">
        <Heading size="md">{t('aboutAsSeenInTitle')}</Heading>
      </Box>

      <Flex
        gap={8}
        flexWrap={{ base: 'wrap', lg: 'nowrap' }}
        justifyContent="center"
        alignItems="center"
      >
        <CNNLogo height="37" fill="#8a939b" />
        <ReutersLogo height="37" fill="#8a939b" />
        <WiredLogo height="37" fill="#8a939b" />
        <FortuneLogo height="37" fill="#8a939b" />
        <CoinDeskLogo height="37" fill="#8a939b" />
        <ForbesLogo height="37" fill="#8a939b" />
      </Flex>
    </Flex>
  )
}

export default AboutAsSeenIn
