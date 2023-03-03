import React from 'react'
import { Box, Flex, Heading, Icon, SimpleGrid, Text } from '@chakra-ui/react'
import EventCard from '@/components/Wiki/Event/EventCard'
import { RiCheckLine } from 'react-icons/ri'

const Events = () => {
  return (
    <Box bgColor="pageBg" mt={-3} pt={8}>
      <Box w="min(90%, 1100px)" mx="auto" mt={{ base: '10', lg: '16' }}>
        <Heading textAlign="center">Timeline of Events</Heading>
        <Text textAlign="center" pt={4} pb={8} color="linkColor">
          A timeline of events for this wiki
        </Text>
        <SimpleGrid gap="10" pos="relative" pb={{ base: '18', lg: '24' }}>
          <Box
            transform="translateY(11px)"
            pos="absolute"
            h="100%"
            w="2px"
            bgColor="brandLinkColor"
            left="11px"
            top="0px"
            zIndex="1"
          />
          <Flex alignItems="center" gap="6" pos="relative" zIndex="2">
            <Flex
              w="24px"
              h="24px"
              borderRadius="50%"
              bgColor="brandLinkColor"
              alignItems="center"
              justifyContent="center"
            >
              <Icon color="white" as={RiCheckLine} />
            </Flex>
            <Heading color="brandLinkColor" fontSize="36px">
              Bitcoin
            </Heading>
          </Flex>
          <SimpleGrid gap="16">
            <EventCard
              link="https://lope.cell.vercel.app"
              title="The invention of Bitcoin"
              eventDate="2019-06-24T15:30:45.123Z"
              description="Bitcoin is a decentralized digital currency that operates without a central bank or administrator. It was created in 2009 by an unknown individual or group using the pseudonym Satoshi Nakamoto. Bitcoin is based on a technology called blockchain, which is a public ledger that records all transactions. This ledger is maintained by a network of computers around the world that work together to verify and record transactions."
            />
            <EventCard
              link="https://lope.cell.vercel.app"
              title="Bitcoin Dominance: Ordinals are taking the NFT space and the Crypto world by Storm."
              eventDate="2019-06-24T15:30:45.123Z"
              description="Bitcoin is a decentralized digital currency that operates without a central bank or administrator. It was created in 2009 by an unknown individual or group using the pseudonym Satoshi Nakamoto. Bitcoin is based on a technology called blockchain, which is a public ledger that records all transactions. This ledger is maintained by a network of computers around the world that work together to verify and record transactions."
            />
          </SimpleGrid>
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export default Events
