import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Text,
  HStack,
  Icon,
  Button,
  Flex,
  Heading,
  VStack,
  AspectRatio,
  Link,
  Stack,
  Select,
  useToast,
} from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import { RiCloseLine } from 'react-icons/ri'
import {
  useGetSearchedWikisByTitleQuery,
  usePostPromotedWikiMutation,
  useGetAllPromotedWikiCountQuery,
} from '@/services/admin'
import DisplayAvatar from '@/components/Elements/Avatar/DisplayAvatar'
import { WikiImage } from '@/components/WikiImage'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import shortenAccount from '@/utils/shortenAccount'
import { getReadableDate } from '@/utils/getFormattedDate'
import { Image } from '@everipedia/iq-utils'

export const PromoteCreatedWikisModal = ({
  onClose = () => {},
  isOpen = false,
  wikiChosenTitle,
  wikiChosenId,
  hideFunc,
  ...rest
}: {
  isOpen: boolean
  onClose: () => void
  wikiChosenTitle: string
  wikiChosenId: string
  hideFunc: () => void
}) => {
  const [step2Titles, setStep2Titles] = useState('Promote to Homepage')
  const [buttonOne, setbuttonOne] = useState('Promote to Hero section')
  const [buttonTwo, setbuttonTwo] = useState('Promote to Trending wikis')
  const [initGetSearchedWikis, setInitGetSearchedWikis] =
    useState<boolean>(true)
  const { data: promotedWikis } = useGetAllPromotedWikiCountQuery(0)

  const getWikiIdUsingLevel = (level: number) => {
    const wiki = promotedWikis?.filter(item => {
      return item.promoted === level
    })[0]

    return wiki?.id
  }

  const arrs = () => {
    const arr = []
    const data = promotedWikis || []
    for (let index = 1; index < data?.length; index += 1) {
      arr.push(data[index].promoted)
    }
  }

  const { data: wiki } = useGetSearchedWikisByTitleQuery(wikiChosenTitle, {
    skip: initGetSearchedWikis,
  })
  const [value, setValue] = useState('2')

  const toast = useToast()
  const ModalData = wiki?.filter(
    item => item.id === wikiChosenId && item.title === wikiChosenTitle,
  )
  const Data = ModalData && ModalData[0]
  const { nextStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })

  const steps = [
    { label: 'Step 1', description: 'Select Promotion Type' },
    { label: 'Step 2', description: step2Titles },
    { label: 'Step 3', description: 'Promotion confirmation' },
  ]

  const [promoteWiki, { error: posTPromoteWikiError }] =
    usePostPromotedWikiMutation()

  const Close = () => {
    setStep2Titles('Promote to Homepage')
    setbuttonOne('Promote to Hero section')
    setbuttonTwo('Promote to Trending wikis')
    reset()
    onClose()
  }
  const handlePromoteWiki = async ({
    id,
    level,
  }: {
    id: string
    level: number
  }) => {
    await promoteWiki({
      id,
      level,
    })
    let toastTitle = 'Wiki Successfully Promoted to Trending wikis'
    let toastMessage =
      'The selected wiki has been promoted to the trending wikis.'
    let toastType: 'success' | 'error' = 'success'
    if (posTPromoteWikiError) {
      toastTitle = 'Wiki Archive Failed'
      toastMessage = "We couldn't save your wiki changes."
      toastType = 'error'
    }
    toast({
      title: toastTitle,
      description: toastMessage,
      status: toastType,
      duration: 5000,
      isClosable: true,
    })
  }
  const getWiki = (
    <>
      {Data && (
        <HStack
          bgColor="cardBg"
          justifyContent="flex-start"
          borderWidth="2px"
          borderColor="cardBorder"
          borderRadius="lg"
          borderStyle="dotted"
          px={{ base: 3, lg: 5 }}
          py={{ base: 3, lg: 3 }}
          w="full"
          align="normal"
        >
          <AspectRatio w={{ base: '100px', md: '140px', lg: '156px' }}>
            <WikiImage
              cursor="pointer"
              flexShrink={0}
              imageURL={getWikiImageUrl(Data.images as Image[])}
              borderRadius="lg"
              overflow="hidden"
              alt="wiki"
            />
          </AspectRatio>
          <Flex
            w="90%"
            flexDir="column"
            justify="space-between"
            mx="auto"
            px={4}
          >
            <Flex justifyContent="space-between" mb={{ base: 0, md: 2 }}>
              <HStack w={{ base: '83%', md: '70%' }}>
                <Heading
                  cursor="pointer"
                  as="h2"
                  fontSize={{ base: '16px', md: '20px' }}
                  letterSpacing="wide"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  tabIndex={0}
                  role="link"
                >
                  {Data.title}
                </Heading>
              </HStack>
              {Data.categories.length ? (
                <HStack>
                  {Data.categories?.map((category, i) => (
                    <Link
                      key={i}
                      href={`/categories/${category.id}`}
                      display={{ base: 'none', md: 'block' }}
                      color="brand.500"
                      fontWeight="bold"
                      cursor="pointer"
                      fontSize={{ base: '10px', lg: '12px' }}
                    >
                      {category.title ? category.title : ''}
                    </Link>
                  ))}
                </HStack>
              ) : (
                <Text> </Text>
              )}
            </Flex>
            <Box
              mb="2"
              mt="-2%"
              maxW={{ base: '70%', lg: '80%' }}
              overflow="hidden"
            >
              <Text fontSize="sm" display={{ base: 'none', md: 'flex' }}>
                {Data.summary ? Data.summary : 'No Summary'}
              </Text>
            </Box>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              justifyContent="space-between"
              w="full"
            >
              <Box>
                <HStack flex="1">
                  <DisplayAvatar
                    address={Data.author?.id}
                    avatarIPFS={Data.author.profile?.avatar}
                    size={20}
                    alt="unknown"
                  />
                  <Text fontSize="14px" color="linkColor">
                    <Link
                      href={`/account/${Data.author?.id}`}
                      color="brand.500"
                      fontWeight="bold"
                    >
                      {/* eslint-disable no-nested-ternary */}
                      {Data.author?.profile?.username
                        ? Data.author.profile.username
                        : Data.author?.id
                        ? shortenAccount(Data.author.id)
                        : 'Unknown'}
                    </Link>
                  </Text>
                </HStack>
              </Box>
              <Box>
                {Data.updated && (
                  <Text mt="1" fontSize="sm" opacity={0.6} whiteSpace="nowrap">
                    {getReadableDate(Data.updated)}
                  </Text>
                )}
              </Box>
            </Stack>
          </Flex>
        </HStack>
      )}
    </>
  )

  const TrendingwikiSelected = async () => {
    if (activeStep === 0) {
      setStep2Titles('Promote to Trending wiki')
      arrs()
      nextStep()
      setInitGetSearchedWikis(false)
      setbuttonOne('Cancel')
      setbuttonTwo('Apply')
    } else if (activeStep === 1) {
      nextStep()
      setbuttonOne('Cancel')
      setbuttonTwo('Promote')
    } else if (activeStep === 2) {
      if (step2Titles === 'Promote to Trending wiki') {
        await promoteWiki({
          id: wikiChosenId,
          level: Number(value),
        })
        handlePromoteWiki({ id: wikiChosenId, level: Number(value) })

        const id = getWikiIdUsingLevel(+value)
        if (id) {
          handlePromoteWiki({ id, level: 0 })
        }
        hideFunc()
        Close()
      } else {
        handlePromoteWiki({ id: wikiChosenId, level: 1 })
        const id = getWikiIdUsingLevel(1)
        if (id) {
          handlePromoteWiki({ id, level: 0 })
        }
        hideFunc()
        Close()
      }
    }
  }

  const HompageSelected = () => {
    if (activeStep === 0) {
      setStep2Titles('Promote to Hero Section')
      arrs()
      nextStep()
      setInitGetSearchedWikis(false)
      setbuttonOne('Cancel')
      setbuttonTwo('Apply')
    } else if (activeStep === 1) {
      Close()
    } else if (activeStep === 2) {
      Close()
    }
  }
  if (!isOpen) return null

  const content = (
    <>
      {activeStep === 0 && (
        <Text textAlign="center">
          Select the appropriate action you would like to take for this wiki
        </Text>
      )}
      {activeStep === 1 && (
        <>
          <VStack gap={4}>
            {step2Titles === 'Promote to Trending wiki' && (
              <Box w="full">
                <Text fontWeight="bold" py="1">
                  Select slot
                </Text>
                <Select
                  cursor="pointer"
                  onChange={e => setValue(e.target.value)}
                  defaultValue={promotedWikis?.length}
                >
                  {promotedWikis &&
                    [...promotedWikis]
                      ?.sort((a, b) => a.promoted - b.promoted)
                      ?.slice(1)
                      ?.map(item => (
                        <option value={item.promoted}>
                          SLOT {item.promoted - 1} - {item.title}
                        </option>
                      ))}
                  {promotedWikis && (
                    <option value={promotedWikis && +promotedWikis.length + 1}>
                      New Slot
                    </option>
                  )}
                </Select>
              </Box>
            )}
            {getWiki}
          </VStack>
        </>
      )}
      {activeStep === 2 && (
        <>
          {step2Titles === 'Promote to Trending wiki' ? (
            <Text textAlign="center">
              You are about to promote a wiki to the Trending wiki section of
              the homepage. Do you wish to continue this action?
            </Text>
          ) : (
            <Text textAlign="center">
              You are about to promote a wiki to the hero section of the
              homepage. Do you wish to continue this action?
            </Text>
          )}
        </>
      )}
    </>
  )

  return (
    <Modal
      onClose={Close}
      isOpen={isOpen}
      isCentered
      size={{ lg: '3xl', base: 'xl' }}
      {...rest}
    >
      <ModalOverlay />
      <ModalContent
        _dark={{
          bg: 'gray.800',
        }}
      >
        <ModalBody>
          <Flex w="full" justify="flex-end" m={0} pt="2">
            <Icon
              cursor="pointer"
              fontSize="2xl"
              fontWeight={600}
              as={RiCloseLine}
              onClick={Close}
              alignSelf="center"
            />
          </Flex>

          <VStack px="5" py="3" gap={4}>
            <Text fontSize="xl" textAlign="start" w="100%" fontWeight="bold">
              Promote
            </Text>
            <Flex flexDir="column" width="100%">
              <Steps
                labelOrientation="vertical"
                colorScheme="brand"
                activeStep={activeStep}
                size="sm"
              >
                {steps.map(({ label, description }) => (
                  <Step
                    textAlign="left"
                    label={label}
                    key={label}
                    description={description}
                  >
                    <Box pt="10" pb="10">
                      {content}
                    </Box>
                  </Step>
                ))}
              </Steps>
              <Flex width="100%" justify="center" pt={4} pb={5}>
                <HStack gap={3}>
                  <Button
                    p={4}
                    onClick={HompageSelected}
                    size="sm"
                    variant="ghost"
                    fontSize="xs"
                  >
                    {buttonOne}
                  </Button>
                  <Button
                    size="sm"
                    fontSize="xs"
                    borderWidth="1px"
                    onClick={TrendingwikiSelected}
                    disabled={
                      !promotedWikis?.length &&
                      buttonTwo === 'Promote to Trending wikis'
                    }
                  >
                    {buttonTwo}
                  </Button>
                </HStack>
              </Flex>
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
