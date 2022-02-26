import React from 'react'
import {
  Box,
  Container,
  Divider,
  Flex,
  GridItem,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import {
  MenuFooter,
  Newsletter,
  SocialFooter,
} from '@/components/Layout/Footer'

import Link from '@/components/Elements/Link/Link'

const Footer = () => {
  const spacing = useBreakpointValue({ base: 8, lg: 24 })
  return (
    <Box bg="brandBackground" color="default">
      <Container
        as={Stack}
        maxW={{ base: '7xl', xl: '7xl', '2xl': '80%' }}
        py={5}
      >
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={spacing} py={10}>
          <GridItem mr={{ lg: 24 }}>
            <Newsletter />
          </GridItem>
          <GridItem>
            <SocialFooter />
          </GridItem>
        </SimpleGrid>
        <Divider orientation="horizontal" />
        <MenuFooter />
        <Divider orientation="horizontal" />
        <SimpleGrid fontSize="xs" columns={{ base: 1, lg: 2 }}>
          <Stack align={{ base: 'center', lg: 'flex-start' }} flex="1">
            <Text fontSize="sm" fontWeight="bold" py={3}>
              © 2022 Everipedia. All rights reserved
            </Text>
          </Stack>
          <Stack mt={[4, 0]} align={{ base: 'center', lg: 'flex-end' }}>
            <Flex>
              <Link href="/static/privacy" py={3} px={5}>
                Privacy Policy
              </Link>
              <Link href="/static/terms" py={3}>
                Terms of Service
              </Link>
            </Flex>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Footer
