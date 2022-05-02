import React from 'react'
import { VStack, Heading, Flex } from '@chakra-ui/react'
import CNNLogo from './logos/cnn.svg'
import ForbesLogo from './logos/forbes.svg'
import ReutersLogo from './logos/reuters.svg'
import WiredLogo from './logos/wired.svg'
import CoinDeskLogo from './logos/coindesk.svg'
import FortuneLogo from './logos/fortune.svg'

const AboutAsSeenIn = () => (
  <VStack mt="20">
    <Flex gap={8} flexWrap="wrap" justifyContent="center" alignItems="center">
      <Heading size="md">AS SEEN IN:</Heading>
      <CNNLogo height="min(30px, 6vw)" fill="#8a939b" />
      <ForbesLogo height="min(30px, 6vw)" fill="#8a939b" />
      <ReutersLogo height="min(30px, 6vw)" fill="#8a939b" />
      <WiredLogo height="min(30px, 6vw)" fill="#8a939b" />
      <CoinDeskLogo height="min(30px, 6vw)" fill="#8a939b" />
      <FortuneLogo height="min(30px, 6vw)" fill="#8a939b" />
    </Flex>
  </VStack>
)

export default AboutAsSeenIn
