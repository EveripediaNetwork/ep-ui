import { LinkButton } from '@/components/Elements'
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const NoEventView = () => {
  return (
    <Flex
      w="100%"
      align="center"
      justify="center"
      direction="column"
      py={{ base: '12', lg: '20' }}
    >
      <Box textAlign="center" pb={8}>
        <Text
          fontWeight={500}
          fontSize={{ base: '20px', md: '24px', xl: '30px' }}
          color="linkColor"
        >
          There are no records of events created for this wiki yet.
        </Text>
        <LinkButton href="/create-wiki" mt={{ lg: '7', base: '6' }}>
          Add Event
        </LinkButton>
      </Box>
    </Flex>
  )
}

export default NoEventView
