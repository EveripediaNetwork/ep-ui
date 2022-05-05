import React from 'react'
import { GridItem, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Logo, Link } from '@/components/Elements'

const MenuFooter = () => (
  <SimpleGrid columns={{ base: 1, lg: 12 }} py={10} spacing={12}>
    <GridItem colSpan={{ base: 8, lg: 4 }}>
      <Stack align={{ base: 'center', lg: 'flex-start' }} spacing="1">
        <Logo />
        <Text fontSize="xl" fontWeight="bold">
          Everipedia
        </Text>
        <Text
          align={{ base: 'center', lg: 'start' }}
          fontWeight="medium"
          px={{ base: 3, lg: 0 }}
        >
          Everipedia&apos;s vision is to bring blockchain knowledge to the world
          and knowledge onto the blockchain.
        </Text>
      </Stack>
    </GridItem>
    <GridItem colSpan={8}>
      <SimpleGrid columns={{ base: 2, sm: 2, md: 4 }} spacing={12}>
        <GridItem colSpan={1}>
          <Stack align={{ base: 'center', md: 'flex-start' }}>
            <Heading size="sm">IQ</Heading>
            <Link target="_blank" href="https://learn.everipedia.org/iq/">What&apos;s IQ?</Link>
            <Stack direction="row" align="center" spacing={2}>
              <Link target="_blank" href="https://learn.everipedia.org/iq/iq/bridges">Bridges</Link>
            </Stack>
            <Link target="_blank" href="https://learn.everipedia.org/iq/iq/hiiq-staking-via-tokenpocket">Staking</Link>
            <Link target="_blank" href="https://learn.everipedia.org/iq/iq/iq-bonds-guide-polygon">Bonds</Link>
          </Stack>
        </GridItem>
        <GridItem colSpan={1}>
          <Stack align={{ base: 'center', md: 'flex-start' }}>
            <Heading size="sm">Everipedia</Heading>
            <Link href="/static/about">About Us</Link>
            <Link href="/static/careers">Careers</Link>
            <Link href="/">Brainies</Link>
          </Stack>
        </GridItem>
        <GridItem colSpan={1}>
          <Stack align={{ base: 'center', md: 'flex-start' }}>
            <Heading size="sm">Resources</Heading>
            <Link target="_blank"  href="https://learn.everipedia.org/iq/">Help</Link>
            <Link target="_blank" href="https://everipedia.org/blog">Blog</Link>
            <Link href="/static/faq">FAQ</Link>
          </Stack>
        </GridItem>
        <GridItem colSpan={1}>
          <Stack align={{ base: 'center', md: 'flex-start' }}>
            <Heading size="sm">Policies</Heading>
            <Link href="/static/guidelines">Guidelines</Link>
            <Link href="/static/privacy">Privacy Policy</Link>
            <Link href="/static/terms">Terms of Service</Link>
          </Stack>
        </GridItem>
      </SimpleGrid>
    </GridItem>
  </SimpleGrid>
)

export default MenuFooter
