import { OurHistoryData } from '@/data/OurHistory'
import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import OurHistoryCard from './OurHistoryCard'

const OurHistory = () => {
  return (
    <Box
      mt="24 !important"
      maxW={{ base: '100%', lg: '80%', '2xl': '65%' }}
      mx="auto"
    >
      <Heading size="lg" textAlign="center">
        A little about our History
      </Heading>
      <Text textAlign="center" mt="4" fontSize={{ base: '12px', lg: '18px' }}>
        The world’s largest blockchain encyclopedia wasn’t born overnight.
        IQ.wiki began as Everipedia, the “encyclopedia of everything”, in 2014
        and became the world’s first blockchain encyclopedia in 2018 after
        launching the IQ token. In 2022, Everipedia expanded to the Polygon
        blockchain and rebranded as IQ.wiki.
      </Text>
      <Box mt="10">
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
