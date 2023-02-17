import { OurHistoryData } from '@/data/OurHistory'
import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import OurHistoryCard from './OurHistoryCard'

const OurHistory = () => {
  return (
    <Box
      mt={{ base: 18, md: '24 !important' }}
      maxW={{ base: '100%', lg: '80%', '2xl': '75%' }}
      mx="auto"
    >
      <Heading size="lg" textAlign="center">
        A little about our History
      </Heading>
      <Text
        textAlign="center"
        mt="4"
        fontSize={{ base: '14px', md: '18px', lg: '24px' }}
        lineHeight={{ base: '20px', md: '24px', lg: '36px' }}
      >
        The world’s largest blockchain encyclopedia wasn’t born overnight.
        IQ.wiki began as Everipedia, the “encyclopedia of everything”, in 2014
        and became the world’s first blockchain encyclopedia in 2018 after
        launching the IQ token. In 2022, Everipedia expanded to the Polygon
        blockchain and rebranded as IQ.wiki.
      </Text>
      <Box mt="15">
        {OurHistoryData.map((history, i) => (
          <OurHistoryCard
            key={i}
            year={history.year}
            content={history.content}
          />
        ))}
      </Box>
    </Box>
  )
}

export default OurHistory
