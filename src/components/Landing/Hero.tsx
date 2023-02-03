import React from 'react'
import { Box, Heading, Text, chakra } from '@chakra-ui/react'

export const Hero = () => {
  return (
    <Box>
      <Heading w="full" textAlign="center" fontSize={{ base: '35', md: '40' }}>
        The World&apos;s Largest
        <chakra.span color="brandLinkColor"> Blockchain & Crypto </chakra.span>
        Encyclopedia
      </Heading>
      <Text textAlign="center" mt="5" fontSize={{ base: 'md', lg: '2xl' }}>
        Start your crypto journey with IQ Wiki! The compass for exploring your
        web3 curiosities.
      </Text>
    </Box>
  )
}
