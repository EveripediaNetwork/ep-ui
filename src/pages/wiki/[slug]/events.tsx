import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'

const Events = () => {
  return (
    <Box bgColor="pageBg" mt={-3} pt={8}>
      <Box w="min(90%, 1100px)" mx="auto" mt={{ base: '10', lg: '16' }}>
        <Heading textAlign="center">Timeline of Events</Heading>
        <Text textAlign="center" pt={4} pb={8} color="linkColor">
          A timeline of events for this wiki
        </Text>
      </Box>
    </Box>
  )
}

export default Events
