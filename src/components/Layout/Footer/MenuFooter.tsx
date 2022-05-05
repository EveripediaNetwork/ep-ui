import React from 'react'
import {
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react'
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
            <Link href="/">What&apos;s IQ?</Link>
            <Stack direction="row" align="center" spacing={2}>
              <Link href="/">Bridges</Link>
            </Stack>
            <Link href="/">Staking</Link>
            <Link href="/">Bonds</Link>
          </Stack>
        </GridItem>
        <GridItem colSpan={1}>
          <Stack align={{ base: 'center', md: 'flex-start' }}>
            <Heading size="sm">Everipedia</Heading>
            <Link href="/static/about">Press</Link>
            <Link href="/">About Us</Link>
            <Link href="/">Careers</Link>
            <Link href="/">Brainies</Link>
          </Stack>
        </GridItem>
        <GridItem colSpan={1}>
          <Stack align={{ base: 'center', md: 'flex-start' }}>
            <Heading size="sm">Resources</Heading>
            <Link href="/">Help</Link>
            <Link href="/">Blog</Link>
            <Link href="/">FAQ</Link>
            <Link href="/">Feedback</Link>
          </Stack>
        </GridItem>
        <GridItem colSpan={1}>
          <Stack align={{ base: 'center', md: 'flex-start' }}>
            <Heading size="sm">Policies</Heading>
            <Link href="/">Cookies Policy</Link>
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Terms of Service</Link>
          </Stack>
        </GridItem>
      </SimpleGrid>
    </GridItem>
  </SimpleGrid>
)

export default MenuFooter
