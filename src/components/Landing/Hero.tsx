import React from 'react'
import { Box, Heading, Text, chakra } from '@chakra-ui/react'

export const Hero = () => {
  return (
    <Box>
      <Heading
        w="full"
        textAlign="center"
        px={{ base: '5', md: '0' }}
        fontSize={{ base: '24', md: '36' }}
      >
        The World&apos;s Largest
        <chakra.span color="brandLinkColor"> Blockchain & Crypto </chakra.span>
        Encyclopedia
      </Heading>
      <Text
        px={{ base: '5', md: '0' }}
        textAlign="center"
        mt="3"
        mx={'auto'}
        maxW={'590px'}
        color={'eventTextColor'}
        fontSize={{ base: 'md', lg: '20px' }}
      >
        Start your crypto journey with IQ.wiki! The compass for exploring your
        web3 curiosities.
      </Text>
    </Box>
  )
}
