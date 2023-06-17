import Feature from '@/components/BrainPass/Feature'
import NetworkConnectionInfo from '@/components/Layout/Network/NetworkConnectionInfo'
import NetworkErrorNotification from '@/components/Layout/Network/NetworkErrorNotification'
import MintNotification from '@/components/Layout/Nft/MintNotification'
import { env } from '@/env.mjs'
import useBrainPass from '@/hooks/useBrainPass'
import useNetworkProvider from '@/hooks/useNetworkProvider'
import { padNumber } from '@/utils/ProfileUtils/padNumber'
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spacer,
  Text,
  VStack,
  SimpleGrid,
  Link,
  useToast,
  Divider,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import {
  RiHeartLine,
  RiMailLine,
  RiQuestionLine,
  RiRobotLine,
  RiSearchEyeLine,
  RiShareBoxLine,
} from 'react-icons/ri'
import { useAccount } from 'wagmi'

const Mint = () => {
  const [showNetworkModal, setShowNetworkModal] = useState(false)
  const [showInvalidNetworkModal, setShowInvalidNetworkModal] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const { passDetails, userPass, mintNftPass, extendEndTime } = useBrainPass()
  const [subscriptionPeriod, setSubscriptionPeriod] = useState(28)
  const [maxPeriod, setMaxPeriod] = useState(365)
  const [endDate, setEndDate] = useState<Date>()
  const toast = useToast()
  const { isConnected } = useAccount()
  const [isMinting, setIsMinting] = useState(false)
  const [notificationDetails, setNotificationDetails] = useState({
    header: '',
    body: '',
  })
  const { address } = useAccount()
  const { chainId, connectedChainId } = useNetworkProvider()

  const showToast = (msg: string, status: 'error' | 'success') => {
    toast({
      title: msg,
      position: 'top-right',
      isClosable: true,
      status,
    })
  }

  useEffect(() => {
    if (userPass && userPass?.endTimeStamp > 0) {
      const startTimestamp = new Date(userPass.startTimeStamp * 1000).getTime()
      const endTimestamp = new Date(userPass.endTimeStamp * 1000).getTime()
      const oneDay = 24 * 60 * 60 * 1000
      const difference = Math.round(
        Math.abs(endTimestamp - startTimestamp) / oneDay,
      )
      const daysLeft = maxPeriod - difference
      setMaxPeriod(daysLeft)
    }
  }, [userPass?.endTimeStamp, userPass?.startTimeStamp])

  useEffect(() => {
    if (userPass && userPass?.endTimeStamp > 0) {
      const endDate = new Date(userPass.endTimeStamp * 1000)
      endDate.setDate(endDate.getDate() + subscriptionPeriod)
      setEndDate(endDate)
    } else {
      const today = new Date()
      today.setDate(today.getDate() + subscriptionPeriod)
      setEndDate(today)
    }
  }, [subscriptionPeriod])

  const checkPassStatus = () => {
    if (userPass?.endTimeStamp === 0 || undefined) {
      return false
    }
    const todayToTimestamp = new Date().getTime()
    if (userPass && userPass?.endTimeStamp < todayToTimestamp) {
      return true
    }
    return false
  }

  const updateSubscriptionPeriod = (period: number) => {
    setSubscriptionPeriod(period < 28 ? 28 : period)
  }

  const finalizeMint = async (
    isError: boolean,
    msg: string,
    notificationDetails: { body: string; header: string },
  ) => {
    if (!isError) {
      setNotificationDetails(notificationDetails)
      setShowNotification(true)
    } else {
      showToast(msg, 'error')
    }
    setMaxPeriod(maxPeriod - subscriptionPeriod)
    setSubscriptionPeriod(28)
    setIsMinting(false)
  }

  const extendEndTimeHandler = async () => {
    if (!endDate) return
    const newEndDate = endDate?.getTime() / 1000
    const { msg, isError } = await extendEndTime(
      userPass?.tokenId || 0,
      Math.floor(newEndDate),
      subscriptionPeriod * (passDetails?.price || 0),
    )
    finalizeMint(isError, msg, {
      header: 'BrainPass subscription renewed!',
      body: "Your Brainpass subscription has been successfully Renewed.  You can continue to create and edit wikis and contribute to the platform's wealth of knowledge.",
    })
  }

  const mintPass = async () => {
    const currentDate = new Date()
    const endTimestamp =
      (currentDate.getTime() + subscriptionPeriod * 24 * 60 * 60 * 1000) / 1000 // convert to seconds
    const startTimestamp = currentDate.getTime() / 1000
    const { msg, isError } = await mintNftPass(
      1,
      Math.floor(startTimestamp),
      Math.floor(endTimestamp),
      subscriptionPeriod * (passDetails?.price || 0),
    )
    finalizeMint(isError, msg, {
      header: 'BrainPass successfully Minted!',
      body: "Your Brainpass has been successfully Minted and you are now an editor on IQ Wiki. You can now create wikis and also edit wikis and contribute to the platform's wealth of knowledge.",
    })
  }

  const mintOrExtendHandler = async () => {
    if (subscriptionPeriod < 28) {
      showToast('Subscription period cannot be less than 28 days', 'error')
      return
    }
    if (subscriptionPeriod > maxPeriod) {
      showToast('Subscription period cannot be more than 365 days', 'error')
      return
    }
    if (!isConnected) {
      setShowNetworkModal(true)
      return
    }
    if (connectedChainId !== chainId) {
      setShowInvalidNetworkModal(true)
      return
    }
    setIsMinting(true)
    if (userPass && userPass?.endTimeStamp > 0) {
      extendEndTimeHandler()
    } else {
      mintPass()
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
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={5}
            bgColor="creamCardBg"
          >
            <Image
              src="/images/nft-pass/rotated-brainpass.png"
              alt="your-image"
            />
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
            {checkPassStatus() ? 'BrainPass Renewal' : 'BrainPass Mint'}
          </Text>
          <Text
            mb={3}
            color="wikiSummaryLabel"
            fontSize="2xl"
            fontWeight="bold"
          >
            <span>
              {' '}
              {userPass?.tokenId !== 0 &&
                address &&
                `#${padNumber(userPass?.tokenId)}`}
            </span>
          </Text>
          <Link
            href={`https://mumbai.polygonscan.com/address/${env.NEXT_PUBLIC_BRAINPASS_ADDRESS}`}
            isExternal
            display="flex"
            gap={1}
            fontSize="sm"
            color="brandLinkColor"
          >
            <HStack mb={4}>
              <Text color="brandLinkColor" fontSize="sm">
                View on polygonscan
              </Text>
              <RiShareBoxLine fontSize={20} />
            </HStack>
          </Link>
          <Text fontSize="sm">
            The BrainPass acts as a unique opportunity for individuals to obtain
            exclusive access to the IQ Wiki platform as esteemed editors. With
            this pass, holders are empowered to contribute, modify, and create
            captivating content, thereby augmenting the platform's wealth of
            knowledge and enhancing its appeal to those deeply invested in the
            crypto space. By harnessing the power of this pass, editors have the
            ability to shape and enrich the collective understanding of
            cryptocurrencies, fostering an inclusive and collaborative
            environment for the benefit of all users seeking comprehensive
            insights and valuable information.
          </Text>
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
              <Text>Sale Price</Text>
              <Text>{passDetails?.price} IQ</Text>
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
                    min={28}
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
                p={3}
              >
                <Text fontSize="xs">Total Price:</Text>
                <Text fontSize="xs" color="brandLinkColor">
                  {(passDetails?.price || 0) * subscriptionPeriod} IQ
                </Text>
              </Flex>
              <Divider orientation="horizontal" />
              <Flex
                w="full"
                fontSize="sm"
                justifyContent="space-between"
                alignContent="center"
                p={3}
              >
                <Text fontSize="xs">Expiration date:</Text>
                <Text fontSize="xs" color="brandLinkColor">
                  {endDate?.toDateString()}
                </Text>
              </Flex>
            </Box>
            <Button
              isDisabled={isMinting}
              isLoading={isMinting}
              _hover={{ bg: isMinting && 'brand.400' }}
              loadingText="Loading..."
              onClick={() => mintOrExtendHandler()}
              w="full"
            >
              {checkPassStatus() ? 'Subscribe' : 'Mint'}
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
            BRAINPASS PERKS
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
        header={notificationDetails.header}
        body={notificationDetails.body}
      />
      <NetworkErrorNotification
        modalState={showInvalidNetworkModal}
        setModalState={(state: boolean) => setShowInvalidNetworkModal(state)}
      />
    </Container>
  )
}

export default Mint
