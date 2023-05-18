import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { RiMore2Fill, RiShareBoxLine } from 'react-icons/ri'

const Mint = () => {
  return (
    <Container
      w="min(90%, 1200px)"
      maxW={{ base: '7xl', xl: '6xl', '2xl': '80%' }}
      my={{ base: '10', lg: '16' }}
    >
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
        gap={14}
      >
        <GridItem>
          <Box position="relative" bgColor="creamCardBg" p={10}>
            <Image src="/images/nft-pass/rotated-pass.png" alt="your-image" />
          </Box>
        </GridItem>
        <GridItem w="100%">
          <Text color="#1A202C" mb={3} fontSize="3xl" fontWeight="bold">
            NFT EDITOR PASS
          </Text>
          <Text mb={3} color="#1A202C" fontSize="2xl" fontWeight="bold">
            #OO1
          </Text>
          <VStack align="start" gap={4}>
            <HStack w="full">
              <InputGroup>
                <Input
                  placeholder="0X03D3...1766"
                  size="lg"
                  _placeholder={{ fontSize: 'sm' }}
                  w="full"
                />
                <InputRightElement p={6}>
                  <Icon as={RiMore2Fill} />
                </InputRightElement>
              </InputGroup>
              <IconButton
                aria-label="view contract"
                icon={<RiShareBoxLine />}
                size="lg"
                variant="outline"
              />
            </HStack>
            <Text fontSize="sm">
              The NFT Editor Pass acts as a unique opportunity for individuals
              to obtain exclusive access to the IQ Wiki platform as esteemed
              editors. With this pass, holders are empowered to contribute,
              modify, and create captivating content, thereby augmenting the
              platform's wealth of knowledge and enhancing its appeal to those
              deeply invested in the crypto space. By harnessing the power of
              this pass, editors have the ability to shape and enrich the
              collective understanding of cryptocurrencies, fostering an
              inclusive and collaborative environment for the benefit of all
              users seeking comprehensive insights and valuable information.
            </Text>
            <Flex
              w="full"
              fontSize="sm"
              justifyContent="space-between"
              alignContent="center"
            >
              <Text>Sale Status</Text>
              <Text>Open</Text>
            </Flex>
            <Flex
              w="full"
              fontSize="sm"
              justifyContent="space-between"
              alignContent="center"
            >
              <Text>Last Sale Price</Text>
              <Text>1000IQ</Text>
            </Flex>
            <Flex
              w="full"
              fontSize="sm"
              justifyContent="space-between"
              alignContent="center"
            >
              <Text>Floor Price</Text>
              <Text>1000IQ</Text>
            </Flex>
            <Select placeholder="Select pass type" size="lg" fontSize="sm">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <Button w="full">MINT</Button>
          </VStack>
        </GridItem>
      </Grid>
      <Box
        mt={10}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={4}
      >
        <Text color="brandLinkColor">Pricing</Text>
        <Text fontWeight="semibold" color="#101828" fontSize="4xl">
          Compare our plans and find yours
        </Text>
        <Text color="#101828" fontSize="lg">
          Simple, transparent pricing that grows with you.
        </Text>
        <Box
          bgColor="creamCardBg"
          rounded="lg"
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={2}
          my={4}
        >
          <Box rounded="lg" p={3} shadow="md" bg="white">
            <Text fontWeight="medium">Monthly Billing</Text>
          </Box>
          <Box p={3}>
            <Text>Annual Billing</Text>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Mint
