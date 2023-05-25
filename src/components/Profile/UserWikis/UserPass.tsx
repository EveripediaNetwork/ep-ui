import {
  Text,
  Box,
  Container,
  Image,
  Divider,
  HStack,
  Center,
  chakra,
  Icon,
  List,
  ListItem,
  ListIcon,
  Grid,
  GridItem,
  Flex,
} from '@chakra-ui/react'
import React from 'react'
// import { useRouter } from 'next/router'
import { RiTicket2Line } from 'react-icons/ri'
import { FaCheckCircle } from 'react-icons/fa'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { LinkButton } from '@/components/Elements'
import { MintEmptyState } from '@/components/Elements/icons/MintEmptyState'

const UserPass = () => {
  //   const router = useRouter()
  //   const address = router.query.profile as string

  return (
    <Container
      w="min(90%, 1200px)"
      maxW={{ base: '7xl', xl: '6xl', '2xl': '80%' }}
      my={{ base: '10', lg: '16' }}
    >
      <Center py={20}>
        <Flex flexDir="column" textAlign="center" align="center" gap={6}>
          <MintEmptyState maxBlockSize="20vw" />
          <Text color="fadedText2" maxW="350px">
            No NFT editor pass yet. You can mint one and become an editor on iq
            wiki.
          </Text>
          <LinkButton href="/create-wiki" px="16" w="fit-content">
            Mint
          </LinkButton>
        </Flex>
      </Center>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={8}
      >
        <GridItem>
          <Box
            rounded="lg"
            border="1px solid"
            borderColor="walletDrawerBorderColor"
          >
            <Box p={4}>
              <Image src="/images/nft-pass/pass.png" />
            </Box>
            <Divider orientation="horizontal" />
            <HStack px={4} py={2} columnGap={4}>
              <Text>Subscription Status:</Text>
              <Center
                px={4}
                py={1}
                rounded="md"
                bgColor="green.50"
                _dark={{ bgColor: 'green.200', color: 'green.800' }}
                color="green.500"
              >
                <Text fontWeight="semibold">Active</Text>
              </Center>
            </HStack>
          </Box>
        </GridItem>
        <GridItem>
          <Box>
            <Text
              color="wikiSummaryLabel"
              fontSize="3xl"
              fontWeight="bold"
              mt={-2}
            >
              NFT EDITOR PASS
            </Text>
            <Text
              mt={2}
              color="wikiSummaryLabel"
              fontSize="2xl"
              fontWeight="bold"
            >
              #OO1
            </Text>
            <Text mt={3} fontSize="lg">
              Owned by:
              <chakra.span color="paginationButtonActive" fontSize="sm">
                {' '}
                0X03D3...1766 <ExternalLinkIcon mx="2px" mt={-3} />
              </chakra.span>
            </Text>
            <Box
              bgColor="brand.50"
              _dark={{ bgColor: 'rgba(49, 4, 25, 0.7);' }}
              p={2}
              maxW="418px"
              my={5}
            >
              <HStack gap={2}>
                <Icon
                  as={RiTicket2Line}
                  boxSize={6}
                  color="paginationButtonActive"
                />
                <Text fontSize="xs" fontWeight="semibold">
                  Subscription expires in 30days (14. 05. 2023)
                </Text>
              </HStack>
            </Box>
            <List mt={4} spacing={4} textAlign="start">
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Exclusive support from the engineering team.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                AI Insight for creating wikis.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Market Updates via Email.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Exclusive access to IQ GPT.
              </ListItem>
            </List>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  )
}

export default UserPass
