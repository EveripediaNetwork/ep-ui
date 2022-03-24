import React from 'react'
import {
  Box,
  ButtonGroup,
  Heading,
  HStack,
  Image,
  Text,
} from '@chakra-ui/react'
import { LinkButton } from '@/components/Elements'

const AboutHero = () => (
  <HStack spacing={8} flexDirection={{ base: 'column-reverse', lg: 'row' }}>
    <Box flex={1} p={{ base: 8, lg: 12 }}>
      <Heading mb={4}>Bringing knowledge to the blockchain.</Heading>
      <Text opacity={0.6}>
        Everipedia&apos;s mission is to bring the world&apos;s knowledge
        on-chain through the IQ token.
      </Text>
      <ButtonGroup size="lg" mt={4} spacing={{ base: 4, lg: 8 }}>
        <LinkButton href="/user/profile" w={{ base: 32, lg: 40 }}>
          Sign Up
        </LinkButton>
        <LinkButton href="/iq" w={{ base: 32, lg: 40 }} variant="outline">
          Go to IQ Site
        </LinkButton>
      </ButtonGroup>
    </Box>
    <Image
      flex={1}
      marginInlineStart="0 !important"
      src="/images/about-everipedia.svg"
      w={{ base: '100%', sm: '80%', md: '60%', lg: '50%' }}
    />
  </HStack>
)

export default AboutHero
