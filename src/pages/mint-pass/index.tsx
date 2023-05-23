import { CheckCircleIcon } from '@chakra-ui/icons'
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
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
  List,
  ListIcon,
  ListItem,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spacer,
  Text,
  VStack,
  chakra,
} from '@chakra-ui/react'
import React from 'react'
import { RiMore2Fill, RiQuestionLine, RiShareBoxLine } from 'react-icons/ri'

const Mint = () => {
  return (
    <Container
      w="min(90%, 1200px)"
      maxW={{ base: '7xl', xl: '6xl', '2xl': '80%' }}
      my={{ base: '10', lg: '16' }}
    >
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
        gap={8}
      >
        <GridItem>
          <Box
            position="relative"
            border="1px solid"
            borderColor="divider"
            rounded="lg"
            p={10}
          >
            <Image src="/images/nft-pass/rotated-pass.png" alt="your-image" />
          </Box>
        </GridItem>
        <GridItem w="100%">
          <Box
            py={1}
            rounded="full"
            bgColor="rgba(255, 229, 241, 0.8)"
            _dark={{ bgColor: 'brand.200', color: 'gray.800' }}
            maxW="238px"
            mb={4}
          >
            <Text fontSize="md" fontWeight="semibold" textAlign="center">
              Renew pass Subscription
            </Text>
          </Box>
          <Text
            color="wikiSummaryLabel"
            mb={3}
            fontSize="3xl"
            fontWeight="bold"
            mt={-2}
          >
            NFT EDITOR PASS
          </Text>
          <Text
            mb={3}
            color="wikiSummaryLabel"
            fontSize="2xl"
            fontWeight="bold"
          >
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
          </VStack>
          <VStack gap={4} my={8}>
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
              <Text>Supply</Text>
              <Text>n/1000</Text>
            </Flex>
            <Flex
              w="full"
              fontSize="sm"
              justifyContent="space-between"
              alignContent="center"
            >
              <Text>Sale Price</Text>
              <Text>0.2ETH</Text>
            </Flex>
          </VStack>
          <VStack align="start" gap={3} w="100%">
            <Box
              border="1px solid"
              rounded="md"
              borderColor="creamCardBg"
              py={3}
              px={4}
              w="full"
            >
              <Text fontSize="xs">Subscription Duration (Months)</Text>
              <Flex mt={1} direction="row" gap={6}>
                <Box w="full">
                  <Slider
                    aria-label="slider-ex-2"
                    colorScheme="pink"
                    defaultValue={30}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Box>
                <Spacer />
                <Box>
                  <InputGroup bg="lightCard" size="xs">
                    <InputLeftAddon
                      cursor="pointer"
                      bg="lightCard"
                      color="grayText4"
                    >
                      <Text>-</Text>
                    </InputLeftAddon>
                    <Input
                      value={3}
                      w={{ base: 'full', md: '10' }}
                      color="grayText4"
                      bg="lightCard"
                      textAlign="center"
                    />
                    <InputRightAddon
                      cursor="pointer"
                      color="grayText4"
                      bg="lightCard"
                    >
                      <Text>+</Text>
                    </InputRightAddon>
                  </InputGroup>
                </Box>
              </Flex>
            </Box>
            <Flex align="center" w="full">
              <Icon color="brandLinkColor" as={RiQuestionLine} mr={1} />
              <Text
                color="brandLinkColor"
                fontSize={{ base: 'xx-small', md: 'xs' }}
              >
                Min of 1 month / Max of 12 months (1 year)
              </Text>
            </Flex>
            <Box p={3} w="full" rounded="md" bgColor="aboutFeaturesCardBg">
              <Flex
                w="full"
                fontSize="sm"
                justifyContent="space-between"
                alignContent="center"
              >
                <Text fontSize="xs">Expiration date:</Text>
                <Text fontSize="xs" color="brandLinkColor">
                  Thur, 06 Dec 2024, 01:00 GMT+1
                </Text>
              </Flex>
            </Box>
            <Button w="full">MINT</Button>
          </VStack>
        </GridItem>
      </Grid>

      <Box
        mt={14}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={4}
        bgColor="creamCardBg"
        py={14}
        rounded="lg"
        maxW="858px"
        mx="auto"
      >
        <VStack align="center" gap={4}>
          <Box
            py={1}
            px={2}
            rounded="full"
            bgColor="rgba(255, 229, 241, 0.8)"
            _dark={{ bgColor: 'brand.200', color: 'gray.800' }}
          >
            <Text fontSize="sm" fontWeight="light">
              General Pass
            </Text>
          </Box>
          <Text fontSize="xl" fontWeight="bold">
            NFT EDITOR PASS PERKS
          </Text>
          <Text fontSize="sm" fontWeight="light" textAlign="center" px={6}>
            Some benefits associated with owning an NFT editor pass on IQ Wiki
          </Text>
          <List spacing={6} textAlign="start" px={8}>
            <ListItem>
              <ListIcon
                rounded="full"
                bg="#12B76A"
                color="#D1FADF"
                as={CheckCircleIcon}
              />
              <chakra.span
                color="#667085"
                _dark={{ color: 'whiteAlpha.900' }}
                fontSize="md"
                fontWeight="light"
              >
                Exclusive support from the engineering team.
              </chakra.span>
            </ListItem>
            <ListItem>
              <ListIcon
                rounded="full"
                bg="#12B76A"
                color="#D1FADF"
                as={CheckCircleIcon}
              />
              <chakra.span
                color="#667085"
                _dark={{ color: 'whiteAlpha.900' }}
                fontSize="md"
                fontWeight="light"
              >
                Exclusive support from the engineering team.
              </chakra.span>
            </ListItem>
            <ListItem>
              <ListIcon
                rounded="full"
                bg="#12B76A"
                color="#D1FADF"
                as={CheckCircleIcon}
              />
              <chakra.span
                color="#667085"
                _dark={{ color: 'whiteAlpha.900' }}
                fontSize="md"
                fontWeight="light"
              >
                Exclusive support from the engineering team.
              </chakra.span>
            </ListItem>
            <ListItem>
              <ListIcon
                rounded="full"
                bg="#12B76A"
                color="#D1FADF"
                as={CheckCircleIcon}
              />
              <chakra.span
                color="#667085"
                _dark={{ color: 'whiteAlpha.900' }}
                fontSize="md"
                fontWeight="light"
              >
                Exclusive support from the engineering team.
              </chakra.span>
            </ListItem>
          </List>
        </VStack>
      </Box>
    </Container>
  )
}

export default Mint
