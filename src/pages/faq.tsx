import { Download } from '@/components/Elements/icons/Download'
import { Flag } from '@/components/Elements/icons/Flag'
import { Gear } from '@/components/Elements/icons/Gear'
import { Box, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import React from 'react'

export const Faq = () => {
  return (
    <Box
      layerStyle="page"
      pt="16"
      pb="32"
      px={{ base: '10', md: '20', lg: '30' }}
    >
      <Text fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight="bold">
        Frequently Asked Questions
      </Text>
      <Text fontSize="lg" color="fadedText" mt="4">
        Have questions? We are here to help you.
      </Text>
      <Stack
        mt="14"
        spacing="20"
        sx={{
          '[data-faq-title]': {
            display: 'flex',
            alignItems: 'center',
            gap: '5',
            fontWeight: 'semibold',
            fontSize: '2xl',
          },
          '[data-faq-content]': {
            mt: { base: '5', md: '6' },
          },
        }}
      >
        <div>
          <div data-faq-title>
            <Flag /> Getting Started
          </div>
          <SimpleGrid data-faq-content>
            <Stack>
              <Text>DeFi</Text>
            </Stack>
          </SimpleGrid>
        </div>
        <div>
          <div data-faq-title>
            <Download /> Using Everipedia
          </div>
        </div>
        <div>
          <div data-faq-title>
            <Gear /> Advanced
          </div>
        </div>
      </Stack>
    </Box>
  )
}

export default Faq
