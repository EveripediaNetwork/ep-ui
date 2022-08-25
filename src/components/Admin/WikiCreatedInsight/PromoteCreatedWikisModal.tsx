import React from 'react'
import {
  ModalProps,
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
} from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import { RiCloseLine } from 'react-icons/ri'

export const PromoteCreatedWikisModal = ({
  onClose = () => {},
  isOpen = false,
  ...rest
}: Partial<ModalProps>) => {
  const steps = [
    { label: 'Step 1', description: 'Select Promotion Type' },
    { label: 'Step 2', description: 'Promote to Homepage' },
    { label: 'Step 3', description: 'Promotion confirmation' },
  ]

  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  })
  if (!isOpen) return null
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
          {/* <HStack px="5" py="3">
            <Icon
              fontSize="20px"
              cursor="pointer"
              color="#718096"
              as={RiQuestionLine}
            />
            <Text fontSize="xl">Promotion Details</Text>
          </HStack>
          <Box pb={7} px={2}>
            <Text textAlign="center">
              The promotion of this wiki is in progress and will end on the 12th
              of August 2022 at 12:00am prompt.
            </Text>
            <HStack spacing={3} pt={5} px="10%">
              <Progress
                value={80}
                size="sm"
                colorScheme="brand"
                w="full"
                rounded="md"
              />
              <Text> 80% </Text>
            </HStack> */}
          {/* </Box> */}

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
              >
                {steps.map(({ label, description }, index) => (
                  <Step label={label} key={label} description={description}>
                    <Box py="10">
                      <Text textAlign="center"> {index} </Text>
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
                <Flex width="100%" justify="center" pt={8} pb={10}>
                  <HStack gap={3}>
                    <Button
                      p={4}
                      onClick={prevStep}
                      size="sm"
                      variant="ghost"
                      borderWidth="1px"
                    >
                      Promote to Hero section
                    </Button>
                    <Button size="sm" onClick={nextStep}>
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
