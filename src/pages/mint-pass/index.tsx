import NetworkConnectionInfo from '@/components/Layout/Network/NetworkConnectionInfo'
import MintNotification from '@/components/Layout/Nft/MintNotification'
import { env } from '@/env.mjs'
import useBrainPass from '@/hooks/useBrainPass'
import { shortenAccount } from '@/utils/textUtils'
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
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spacer,
  Text,
  VStack,
  SimpleGrid,
  Center,
  Link,
  useToast,
} from '@chakra-ui/react'
import React, { useState, useEffect, ReactElement } from 'react'
import {
  RiHeartLine,
  RiMailLine,
  RiMore2Fill,
  RiQuestionLine,
  RiRobotLine,
  RiSearchEyeLine,
  RiShareBoxLine,
} from 'react-icons/ri'
import { useAccount } from 'wagmi'

interface FeatureProps {
  title: string
  text: string
  icon: ReactElement
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <VStack align="center" textAlign="center">
      <Flex
        w={14}
        h={14}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg="tagActiveBgColor"
      >
        <Center rounded={'full'} bg="iconBg" w={10} h={10}>
          {icon}
        </Center>
      </Flex>
      <Text fontWeight="semibold">{title}</Text>
      <Text fontSize="sm" color="eventTextColor">
        {text}
      </Text>
    </VStack>
  )
}

const Mint = () => {
  const [showNetworkModal, setShowNetworkModal] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const { passEndDate, passDetails } = useBrainPass()
  const [subscriptionPeriod, setSubscriptionPeriod] = useState(1)
  const [maxPeriod] = useState(365)
  const [endDate, setEndDate] = useState<Date>()
  const toast = useToast()
  const { isConnected } = useAccount()

  const showToast = (msg: string, status: 'error' | 'success') => {
    toast({
      title: msg,
      position: 'top-right',
      isClosable: true,
      status,
    })
  }

  useEffect(() => {
    if (passEndDate) {
      const endDate = new Date(passEndDate)
      endDate.setDate(endDate.getDate() + subscriptionPeriod)
      setEndDate(endDate)
    } else {
      const today = new Date()
      today.setDate(today.getDate() + subscriptionPeriod)
      setEndDate(today)
    }
  }, [passEndDate, subscriptionPeriod])

  const checkPassStatus = () => {
    if (!passEndDate) {
      return false
    }
    const todayToTimestamp = new Date().getTime()
    if (passEndDate < todayToTimestamp) {
      return true
    }
    return false
  }

  const updateSubscriptionPeriod = (period: number) => {
    setSubscriptionPeriod(period || 1)
  }

  const mintHandler = () => {
    if (subscriptionPeriod < 28) {
      showToast("Subscription period cannot be less than 28 days", "error")
      return
    }
    if (subscriptionPeriod > maxPeriod) {
      showToast(
        `Subscription period cannot be more than ${maxPeriod} days`,
        'error',
      )
      return
    }
    if (!isConnected) {
      setShowNetworkModal(true)
      return
    }
  }

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
            bgColor="creamCardBg"
          >
            <Image src="/images/nft-pass/rotated-pass.png" alt="your-image" />
          </Box>
        </GridItem>
        <GridItem w="100%">
          {checkPassStatus() && (
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
          )}
          <Text
            color="wikiSummaryLabel"
            mb={3}
            fontSize="3xl"
            fontWeight="bold"
            mt={-2}
          >
            BrainPass Mint
          </Text>
          <Text
            mb={3}
            color="wikiSummaryLabel"
            fontSize="2xl"
            fontWeight="bold"
          >
            {passDetails?.name} Pass
          </Text>
          <VStack align="start" gap={4}>
            <HStack w="full">
              <InputGroup>
                <Input
                  placeholder="0X03D3...1766"
                  size="lg"
                  _placeholder={{ fontSize: 'sm' }}
                  w="full"
                  disabled={true}
                  value={shortenAccount(env.NEXT_PUBLIC_BRAINPASS_ADDRESS)}
                  fontSize="sm"
                />
                <InputRightElement p={6}>
                  <Icon as={RiMore2Fill} />
                </InputRightElement>
              </InputGroup>
              <Link
                href={`https://mumbai.polygonscan.com/address/${env.NEXT_PUBLIC_BRAINPASS_ADDRESS}`}
                isExternal
                display="flex"
                gap={1}
                fontSize="sm"
              >
                <IconButton
                  aria-label="view contract"
                  icon={<RiShareBoxLine />}
                  size="lg"
                  variant="outline"
                />
              </Link>
            </HStack>
            <Text fontSize="sm">
              The BrainPass acts as a unique opportunity for individuals to
              obtain exclusive access to the IQ Wiki platform as esteemed
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
              <Text>{passDetails?.isPaused ? 'Close' : 'Open'}</Text>
            </Flex>
            <Flex
              w="full"
              fontSize="sm"
              justifyContent="space-between"
              alignContent="center"
            >
              <Text>Supply</Text>
              <Text>n/{passDetails?.supply}</Text>
            </Flex>
            <Flex
              w="full"
              fontSize="sm"
              justifyContent="space-between"
              alignContent="center"
            >
              <Text>Sale Price</Text>
              <Text>{(passDetails?.price || 0) * subscriptionPeriod} IQ</Text>
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
              <Text fontSize="xs">Subscription Duration (Days)</Text>
              <Flex mt={1} direction="row" gap={6}>
                <Box w="full">
                  <Slider
                    aria-label="slider-ex-2"
                    colorScheme="pink"
                    defaultValue={subscriptionPeriod}
                    max={maxPeriod}
                    onChange={(value) => updateSubscriptionPeriod(value)}
                    value={subscriptionPeriod}
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
                      onClick={() =>
                        updateSubscriptionPeriod(subscriptionPeriod - 1)
                      }
                    >
                      <Text>-</Text>
                    </InputLeftAddon>
                    <Input
                      value={subscriptionPeriod}
                      w={{ base: 'full', md: '10' }}
                      color="grayText4"
                      bg="lightCard"
                      textAlign="center"
                      onChange={(e) =>
                        updateSubscriptionPeriod(Number(e.target.value))
                      }
                    />
                    <InputRightAddon
                      cursor="pointer"
                      color="grayText4"
                      bg="lightCard"
                      onClick={() =>
                        updateSubscriptionPeriod(subscriptionPeriod + 1)
                      }
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
                  {endDate?.toDateString()}
                </Text>
              </Flex>
            </Box>
            <Button onClick={() => mintHandler()} w="full">
              MINT
            </Button>
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
        py={14}
        rounded="lg"
        mx="auto"
      >
        <VStack align="center">
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
            BRAINPASS PERKS PERKS
          </Text>
          <Text fontSize="sm" fontWeight="light" textAlign="center" px={6}>
            Some benefits associated with owning an BrainPass on IQ Wiki
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} pt={10}>
            <Feature
              icon={
                <Icon
                  as={RiHeartLine}
                  w={6}
                  h={6}
                  color="brandAssetDownloadBttnColor"
                />
              }
              title="Exclusive support from the engineering team."
              text="Benefit from dedicated and exclusive support from our highly skilled engineering team. Our team is committed to providing unparalleled assistance, ensuring prompt resolution of any technical issues or challenges you may encounter."
            />
            <Feature
              icon={
                <Icon
                  as={RiRobotLine}
                  w={6}
                  h={6}
                  color="brandAssetDownloadBttnColor"
                />
              }
              title="AI Insight for creating wikis."
              text="Leverage the power of AI Insight to enhance your wiki creation process. Our AI-powered tool provides valuable insights and suggestions, helping you craft comprehensive and informative wikis."
            />
            <Feature
              icon={
                <Icon
                  as={RiMailLine}
                  w={6}
                  h={6}
                  color="brandAssetDownloadBttnColor"
                />
              }
              title="Market Updates via Email."
              text="Stay informed with our market updates delivered directly to your inbox. Receive timely and relevant information about the latest market trends, news, and insights, conveniently curated and sent to you via email."
            />
            <Feature
              icon={
                <Icon
                  color="brandAssetDownloadBttnColor"
                  as={RiSearchEyeLine}
                  w={6}
                  h={6}
                />
              }
              title="Exclusive access to IQ GPT."
              text="Gain exclusive access to IQ GPT, our advanced language model powered by cutting-edge artificial intelligence technology. With this exclusive access, you can leverage the full capabilities of IQ GPT for a wide range of applications."
            />
          </SimpleGrid>
        </VStack>
      </Box>
      <NetworkConnectionInfo
        modalState={showNetworkModal}
        setModalState={setShowNetworkModal}
      />
      <MintNotification
        modalState={showNotification}
        setModalState={setShowNotification}
      />
    </Container>
  )
}

export default Mint
