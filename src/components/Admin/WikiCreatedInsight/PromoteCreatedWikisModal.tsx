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
  VStack,
  useToast,
} from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import { RiCloseLine } from 'react-icons/ri'
import {
  useGetSearchedWikisByTitleQuery,
  usePostPromotedWikiMutation,
  useGetAllPromotedWikiCountQuery,
} from '@/services/admin'
import { PromoteCreatedWikisModalProps } from '@/types/admin'
import { Content } from './PromotedWikiContent'

export const PromoteCreatedWikisModal = (
  props: PromoteCreatedWikisModalProps,
) => {
  const {
    onClose = () => {},
    isOpen = false,
    wikiChosenTitle,
    wikiChosenId,
    hideFunc,
    ...rest
  } = props
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
                      <Content
                        activeStep={activeStep}
                        step2Titles={step2Titles}
                        promotedWikis={promotedWikis}
                        Data={Data}
                        setValue={setValue}
                      />
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
