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

  const { data: wiki } = useGetSearchedWikisByTitleQuery(wikiChosenTitle)

  const ModalData = wiki?.filter(
    item => item.id === wikiChosenId && item.title === wikiChosenTitle,
  )
  const Data = ModalData && ModalData[0]

  const steps = [
    { label: 'Step 1', description: 'Select Promotion Type' },
    { label: 'Step 2', description: step2Titles },
    { label: 'Step 3', description: 'Promotion confirmation' },
  ]

  const getWiki = (
    <>
      {Data && (
        <HStack
          bgColor="cardBg"
          justifyContent="flex-start"
          borderWidth="1px"
          borderColor="cardBorder"
          borderRadius="lg"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.10)"
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

  const { nextStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })

  const TrendingwikiSelected = () => {
    setStep2Titles('Promote to Trending wiki')
    nextStep()
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
    </>
  )

  return (
    <Modal
      onClose={onClose}
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
              onClick={onClose}
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
              {activeStep === steps.length ? (
                <Flex px={4} py={4} width="100%" flexDirection="column">
                  <Heading fontSize="xl" textAlign="center">
                    Woohoo! All steps completed!
                  </Heading>
                  <Button mx="auto" mt={6} size="sm" onClick={reset}>
                    Reset
                  </Button>
                </Flex>
              ) : (
                <Flex width="100%" justify="center" pt={4} pb={5}>
                  <HStack gap={3}>
                    <Button
                      p={4}
                      onClick={TrendingwikiSelected}
                      size="sm"
                      fontSize="xs"
                    >
                      Promote to Hero section
                    </Button>
                    <Button
                      size="sm"
                      fontSize="xs"
                      variant="ghost"
                      borderWidth="1px"
                      onClick={TrendingwikiSelected}
                    >
                      {activeStep === steps.length - 1
                        ? 'Finish'
                        : 'Promote to Trending wikis'}
                    </Button>
                  </HStack>
                </Flex>
              )}
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
