import React from 'react'
import { Button, Stack, Text } from '@chakra-ui/react'

const Newsletter = () => (
  <Stack align={{ base: 'center', lg: 'flex-start' }} spacing={4}>
    <Text fontSize="xl" fontWeight="bold" py={2}>
      Stay in the Loop
    </Text>
    <Text align={{ base: 'center', lg: 'start' }} maxW="600px">
      Join our mailing list to stay in the loop with our newest feature
      releases, NFT drops, and tips and tricks for navigating Everipedia
    </Text>
    <Button
      onClick={() =>
        window.open(
          'https://www.getdrip.com/forms/505929689/submissions/new',
          '_blank',
        )
      }
      size="lg"
      variant="solid"
    >
      Subscribe now
    </Button>
  </Stack>
)

export default Newsletter
