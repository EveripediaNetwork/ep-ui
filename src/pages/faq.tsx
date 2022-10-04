import { Download } from '@/components/Elements/icons/Download'
import { Flag } from '@/components/Elements/icons/Flag'
import { Gear } from '@/components/Elements/icons/Gear'
import { Box, Divider, SimpleGrid, Stack, Text } from '@chakra-ui/react'
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
            '.content-wrapper': {
              p: '3.5',
              rounded: '6px',
              bg: 'cardBg',
              h: 'fit-content',
            },
            '.content-title': { fontWeight: 'semibold' },
          },
        }}
      >
        <div>
          <div data-faq-title>
            <Flag /> Getting Started
          </div>
          <SimpleGrid data-faq-content spacing="6" columns={{ md: 2, lg: 3 }}>
            <Stack spacing="5">
              <Stack className="content-wrapper" spacing="3">
                <Text className="content-title">DeFi</Text>
                <Divider borderColor="divider" />
                <Text>How to Swap IQ from EOS to Ethereum</Text>
              </Stack>
              <Stack className="content-wrapper" spacing="3">
                <Text className="content-title">What is IQ.Wiki?</Text>
                <Divider borderColor="divider" />
                <Text>What is IQ.Wiki and how is it different?</Text>
                <Text>What is IQ?</Text>
                <Text>How do I Earn IQ?</Text>
                <Text>IQ.Wiki Glossary</Text>
              </Stack>
            </Stack>
            <Stack className="content-wrapper" spacing="3">
              <Text className="content-title">Getting Started</Text>
              <Divider borderColor="divider" />
              <Text>Signing up</Text>
              <Text>Setting Up an EOS Account</Text>
              <Text>Login with Scatter</Text>
              <Text>Troubleshooting Scatter</Text>
              <Text>Profiles</Text>
              <Text>How Do I Earn IQ?</Text>
              <Text>Withdrawing IQ from your EPID account</Text>
              <Text>Depositing IQ into your EPID account</Text>
            </Stack>
            <Stack className="content-wrapper" spacing="3">
              <Text className="content-title">How to browse IQ.Wiki</Text>
              <Divider borderColor="divider" />
              <Text>Homepage</Text>
              <Text>How to view an article&apos;s edit history</Text>
              <Text>Search</Text>
              <Text>Activy</Text>
            </Stack>
          </SimpleGrid>
        </div>
        <div>
          <div data-faq-title>
            <Download /> Using IQ.Wiki
          </div>
          <SimpleGrid data-faq-content spacing="6" columns={{ md: 2, lg: 3 }}>
            <Stack className="content-wrapper" spacing="3">
              <Text className="content-title">How to use chat</Text>
              <Divider borderColor="divider" />
              <Text>Using IQ.Wiki Chat</Text>
            </Stack>
            <Stack className="content-wrapper" spacing="3">
              <Text className="content-title">
                How to create or edit an article
              </Text>
              <Divider borderColor="divider" />
              <Text>Creating an Article</Text>
              <Text>Editing an Article</Text>
              <Text>How to view an article&apos;s edit history</Text>
              <Text>Advanced Editor Guide</Text>
              <Text>IQ.Wiki Guidelines</Text>
            </Stack>
            <Stack className="content-wrapper" spacing="3">
              <Text className="content-title">How to vote on an article</Text>
              <Divider borderColor="divider" />
              <Text>How do I vote?</Text>
            </Stack>
          </SimpleGrid>
        </div>
        <div>
          <div data-faq-title>
            <Gear /> Advanced
          </div>
          <SimpleGrid data-faq-content spacing="6" columns={{ md: 2, lg: 3 }}>
            <Stack className="content-wrapper" spacing="3">
              <Text className="content-title">Other</Text>
              <Divider borderColor="divider" />
              <Text>Having Trouble Logging In?</Text>
              <Text>Getting in Touch</Text>
              <Text>IQ.Wiki Glossary</Text>
            </Stack>
            <Stack className="content-wrapper" spacing="3">
              <Text className="content-title">Terms & Policies</Text>
              <Divider borderColor="divider" />
              <Text>Terms of Service</Text>
              <Text>Privacy Policy</Text>
              <Text>IQ.Wiki Guidelines</Text>
              <Text>Your California Privacy Rights</Text>
            </Stack>
            <Stack className="content-wrapper" spacing="3">
              <Text className="content-title">Blockhain</Text>
              <Divider borderColor="divider" />
              <Text>How to Swap IQ from EOS to Ethereum</Text>
              <Text>Setting Up an EOS Account</Text>
            </Stack>
          </SimpleGrid>
        </div>
      </Stack>
    </Box>
  )
}

export default Faq
