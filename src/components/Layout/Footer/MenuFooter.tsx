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
      <Stack align={{ base: 'center', lg: 'flex-start' }}>
        <Logo />
        <Heading size="lg" py={2}>
          Everipedia
        </Heading>
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
              <Tag size="sm" bg="highlight" ml={2} color="black">
                New
              </Tag>
            </Stack>
            <Link href="/">Staking</Link>
            <Link href="/">Bonds</Link>
          </Stack>
        </GridItem>
        <GridItem colSpan={1}>
          <Stack align={{ base: 'center', md: 'flex-start' }}>
            <Heading size="sm">Everipedia</Heading>
            <Link href="/static/about">About Us</Link>
            <Link href="/">Press</Link>
            <Link href="/">Careers</Link>
            <Link href="/">Contact Us</Link>
          </Stack>
        </GridItem>
        <GridItem colSpan={1}>
          <Stack align={{ base: 'center', md: 'flex-start' }}>
            <Heading size="sm">Legal</Heading>
            <Link href="/">Cookies Policy</Link>
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Terms of Service</Link>
            <Link href="/">Status</Link>
          </Stack>
        </GridItem>
        <GridItem colSpan={1}>
          <Stack align={{ base: 'center', md: 'flex-start' }}>
            <Heading size="sm">Legal</Heading>
            <Link href="/">Facebook</Link>
            <Link href="/">Twitter</Link>
            <Link href="/">Instagram</Link>
            <Link href="/">LinkedIn</Link>
          </Stack>
        </GridItem>
      </SimpleGrid>
    </GridItem>
  </SimpleGrid>
)

export default MenuFooter
