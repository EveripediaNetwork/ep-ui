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
} from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import { RiCloseLine } from 'react-icons/ri'
import { useGetSearchedWikisByTitleQuery } from '@/services/admin'
import DisplayAvatar from '@/components/Elements/Avatar/Avatar'
import { WikiImage } from '@/components/WikiImage'
import config from '@/config'
import shortenAccount from '@/utils/shortenAccount'
import { getReadableDate } from '@/utils/getFormattedDate'

export const PromoteCreatedWikisModal = ({
  onClose = () => {},
  isOpen = false,
  wikiChosenTitle,
  wikiChosenId,
  ...rest
}: {
  isOpen: boolean
  onClose: () => void
  wikiChosenTitle: string
  wikiChosenId: string
}) => {
  const [step2Titles, setStep2Titles] = useState('Promote to Homepage')
  const [buttonOne, setbuttonOne] = useState('Promote to Hero section')
  const [buttonTwo, setbuttonTwo] = useState('Promote to Trending wikis')
  const { data: wiki } = useGetSearchedWikisByTitleQuery(wikiChosenTitle)

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

  // const [promoteWiki, { error: postHideWikiError }] =
  //   usePostPromotedWikiMutation()

  const Close = () => {
    setStep2Titles('Promote to Homepage')
    setbuttonOne('Promote to Hero section')
    setbuttonTwo('Promote to Trending wikis')
    reset()
    onClose()
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
              imageURL={`${config.pinataBaseUrl}${
                Data.images ? Data.images[0].id : ''
              }  `}
              borderRadius="lg"
              overflow="hidden"
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
              {Data.categories.length && (
                <HStack>
                  {Data.categories?.map((category, i) => (
                    <Link key={i} href={`/categories/${category.id}`}>
                      <Text
                        as="a"
                        display={{ base: 'none', md: 'block' }}
                        color="brand.500"
                        fontWeight="bold"
                        cursor="pointer"
                        fontSize={{ base: '10px', lg: '12px' }}
                      >
                        {category.title ? category.title : category.id}
                      </Text>
                    </Link>
                  ))}
                </HStack>
              )}
            </Flex>
            <Box
              mb="2"
              mt="-2%"
              maxW={{ base: '70%', lg: '80%' }}
              overflow="hidden"
            >
              <Text fontSize="sm" display={{ base: 'none', md: 'flex' }}>
                {Data.summary}
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
                    size="20"
                  />
                  <Text fontSize="14px" color="linkColor">
                    <Link
                      href={`/account/${Data.author?.id}`}
                      color="brand.500"
                      fontWeight="bold"
                    >
                      {Data.author?.profile?.username
                        ? Data.author.profile.username
                        : shortenAccount(
                            Data.author?.id ? Data.author.id : '0x0',
                          )}
                    </Link>
                  </Text>
                </HStack>
              </Box>
              <Box>
                {Data.updated && (
                  <Text
                    mt="1"
                    fontSize="sm"
                    fontWeight="light"
                    opacity={0.6}
                    whiteSpace="nowrap"
                  >
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
      nextStep()
      setbuttonOne('cancel')
      setbuttonTwo('Apply')
    } else if (activeStep === 1) {
      nextStep()
      setbuttonOne('cancel')
      setbuttonTwo('Promote')
    } else if (activeStep === 2) {
      if (step2Titles === 'Promote to Trending wiki') {
        // promoteWiki(promoteWiki, 4)
        // promote to homepage
      } else {
        // await promoteWiki(promoteWiki, 4)
        // Close()
        // let toastTitle = 'Wiki Successfully Archived'
        // let toastMessage =
        //   'The selected wiki has been archived. Refresh the page to see the changes.'
        // let toastType: 'success' | 'error' = 'success'
        // if (postHideWikiError) {
        //   toastTitle = 'Wiki Archive Failed'
        //   toastMessage =
        //     "We couldn't save your wiki changes. Refresh the page and try again."
        //   toastType = 'error'
        // }
        // toast({
        //   title: toastTitle,
        //   description: toastMessage,
        //   status: toastType,
        //   duration: 5000,
        //   isClosable: true,
        // })
      }
    }
  }

  const HompageSelected = () => {
    if (activeStep === 0) {
      nextStep()
      setbuttonOne('cancel')
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
          Select the appropraite action you would like to take for this wiki
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
                <Select cursor="pointer" w="20%">
                  <option> SORT 1 </option>
                  <option> SORT 2</option>
                  <option> SORT 3 </option>
                  <option> SORT 4 </option>
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
              You are about to promote a wiki to the trending wiki. Do you wish
              to continue this action?
            </Text>
          ) : (
            <Text textAlign="center">
              You are about to promote a wiki to the Homepage. Do you wish to
              continue this action?
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
      size={{ lg: '3xl', base: 'sm' }}
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
                    fontSize="xs"
                  >
                    {buttonOne}
                  </Button>
                  <Button
                    size="sm"
                    fontSize="xs"
                    variant="ghost"
                    borderWidth="1px"
                    onClick={TrendingwikiSelected}
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
