import React from 'react'
import { Box, VStack, Heading, Flex } from '@chakra-ui/react'
import CNNLogo from './logos/cnn.svg'
import ForbesLogo from './logos/forbes.svg'
import ReutersLogo from './logos/reuters.svg'
import WiredLogo from './logos/wired.svg'
import CoinDeskLogo from './logos/coindesk.svg'
import FortuneLogo from './logos/fortune.svg'

const AboutAsSeenIn = () => (
  <Box px={{ base: 6, lg: 16 }} py={{ base: '10', lg: 15 }}>
    <VStack
      mt={{ base: 20, md: '24 !important' }}
      maxW={{ base: '100%', lg: '90%', '2xl': '65%' }}
      mx="auto"
    >
      <Box w="full" textAlign="center" marginY={10}>
        <Heading size="md">AS SEEN IN:</Heading>
      </Box>

      <Flex gap={8} flexWrap="wrap" justifyContent="center" alignItems="center">
        <CNNLogo height="min(30px, 6vw)" fill="#8a939b" />
        <ReutersLogo height="min(30px, 6vw)" fill="#8a939b" />
        <WiredLogo height="min(30px, 6vw)" fill="#8a939b" />
        <FortuneLogo height="min(30px, 6vw)" fill="#8a939b" />
        <CoinDeskLogo height="min(30px, 6vw)" fill="#8a939b" />
        <ForbesLogo height="min(30px, 6vw)" fill="#8a939b" />
      </Flex>
    </VStack>
  </Box>
)

export default AboutAsSeenIn
